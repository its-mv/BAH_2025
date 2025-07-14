
import os
import uuid
import shutil
import cv2
import numpy as np
import pandas as pd
import seaborn as sns
from flask import Flask, request, render_template, jsonify
from fpdf import FPDF
from zipfile import ZipFile
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

# app = Flask(
#     __name__,
#     static_folder='../static'
# )

STATIC_FOLDER = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'static'))
app = Flask(__name__, static_folder=STATIC_FOLDER)


# UPLOAD_FOLDER = os.path.join('static', 'uploads')
# PROCESSED_FOLDER = os.path.join('static', 'processed')
UPLOAD_FOLDER = os.path.join(STATIC_FOLDER, 'uploads')
PROCESSED_FOLDER = os.path.join(STATIC_FOLDER, 'processed')

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(PROCESSED_FOLDER, exist_ok=True)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/process', methods=['POST'])
def process():
    uploaded_file = request.files['image']
    # if not uploaded_file:
    #     return jsonify({'error': 'No file uploaded'})
    if not (uploaded_file and allowed_file(uploaded_file.filename)):
        return jsonify({'error': 'Invalid file format'})


    # Generate unique folder name
    session_id = str(uuid.uuid4())
    upload_path = os.path.join(UPLOAD_FOLDER, session_id)
    processed_path = os.path.join(PROCESSED_FOLDER, session_id)
    os.makedirs(upload_path, exist_ok=True)
    os.makedirs(processed_path, exist_ok=True)

    # Save uploaded image
    image_path = os.path.join(upload_path, 'input.jpg')
    uploaded_file.save(image_path)

    # Step 1: Detect Boulders
    image_gray = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    equalized = cv2.equalizeHist(image_gray)
    blurred = cv2.medianBlur(equalized, 5)
    circles = cv2.HoughCircles(blurred, cv2.HOUGH_GRADIENT, 1.2, 20, param1=50, param2=35, minRadius=7, maxRadius=30)
    image_color = cv2.cvtColor(image_gray, cv2.COLOR_GRAY2BGR)
    boulder_data = []

    if circles is not None:
        circles = np.uint16(np.around(circles))
        for i in circles[0, :]:
            x, y, r = int(i[0]), int(i[1]), int(i[2])
            boulder_data.append({'x': x, 'y': y, 'radius': r})
            cv2.circle(image_color, (x, y), r, (255, 0, 0), 2)

    boulder_df = pd.DataFrame(boulder_data)
    boulder_csv = os.path.join(processed_path, 'boulders.csv')
    boulder_df.to_csv(boulder_csv, index=False)
    cv2.imwrite(os.path.join(processed_path, 'output_boulder.jpg'), image_color)

    # Step 2: Landslide Zones
    image_orig = cv2.imread(image_path)
    overlay = image_orig.copy()
    landslide_data = []
    radius = 40

    for _, row in boulder_df.iterrows():
        x, y = int(row['x']), int(row['y'])
        cv2.circle(overlay, (x, y), radius, (0, 255, 0), -1)
        landslide_data.append({"x": x, "y": y, "radius": radius})

    landslide_image = cv2.addWeighted(overlay, 0.3, image_orig, 0.7, 0)
    cv2.imwrite(os.path.join(processed_path, 'landslide_only.jpg'), landslide_image)
    pd.DataFrame(landslide_data).to_csv(os.path.join(processed_path, 'landslides.csv'), index=False)

    # Step 3: Final Annotated Image
    final = landslide_image.copy()
    height, width = final.shape[:2]

    for _, row in boulder_df.iterrows():
        x, y, r = int(row['x']), int(row['y']), int(row['radius'])
        cv2.circle(final, (x, y), r, (200, 0, 0), 2)

    # North Arrow
    cv2.rectangle(final, (width - 70, 10), (width - 10, 90), (255, 255, 255), -1)
    cv2.rectangle(final, (width - 70, 10), (width - 10, 90), (0, 0, 0), 1)
    cv2.arrowedLine(final, (width - 40, 70), (width - 40, 30), (0, 0, 0), 2, tipLength=0.3)
    cv2.putText(final, "N", (width - 35, 85), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 0, 0), 2)

    # Scale Bar
    cv2.rectangle(final, (30, height - 70), (160, height - 35), (255, 255, 255), -1)
    cv2.line(final, (50, height - 50), (150, height - 50), (0, 0, 0), 2)
    cv2.putText(final, "10 km", (55, height - 55), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 1)

    # Legend
    cv2.rectangle(final, (20, 20), (220, 85), (0, 0, 0), -1)
    cv2.rectangle(final, (30, 35), (45, 50), (255, 0, 0), 2)
    cv2.putText(final, "Boulder", (55, 48), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1)
    cv2.rectangle(final, (30, 60), (45, 75), (0, 255, 0), -1)
    cv2.putText(final, "Landslide zone", (55, 73), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1)

    # Stats
    landslide_area_px = len(landslide_data) * (np.pi * radius**2)
    boulder_density = len(boulder_df) / ((width * height) * 0.01 * 0.01)
    landslide_area_km2 = landslide_area_px * 0.01 * 0.01
    stats_text = [
        f"Boulders Detected: {len(boulder_df)}",
        f"Landslide Area: {int(landslide_area_km2)} km2",
        f"Boulder Density: {boulder_density:.2f}/km2"
    ]

    cv2.rectangle(final, (width - 250, height - 100), (width - 20, height - 30), (0, 0, 0), -1)
    for i, line in enumerate(stats_text):
        cv2.putText(final, line, (width - 240, height - 75 + i * 20), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1)

    final_path = os.path.join(processed_path, 'output.jpg')
    cv2.imwrite(final_path, final)

    # Step 4: Report PDF and Charts
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    pdf.cell(200, 10, txt="Lunar Surface Analysis Report", ln=True, align='C')

    heatmap, _, _ = np.histogram2d(boulder_df['x'], boulder_df['y'], bins=[50, 50], range=[[0, width], [0, height]])
    plt.figure(figsize=(6, 5))
    sns.heatmap(heatmap.T, cmap="viridis")
    plt.title("Boulder Density Heatmap")
    heatmap_path = os.path.join(processed_path, 'heatmap.png')
    plt.savefig(heatmap_path)
    plt.close()
    pdf.image(heatmap_path, x=10, y=None, w=180)

    plt.figure(figsize=(6, 4))
    sns.histplot(boulder_df['radius'], bins=20, kde=True, color='skyblue')
    plt.title("Boulder Radius Distribution")
    radius_path = os.path.join(processed_path, 'radius_dist.png')
    plt.savefig(radius_path)
    plt.close()
    pdf.add_page()
    pdf.image(radius_path, x=10, y=None, w=180)

    plt.figure(figsize=(6, 4))
    sns.countplot(x=(boulder_df['radius'] // 5) * 5, palette="coolwarm")
    plt.title("Boulder Count by Size Group")
    size_path = os.path.join(processed_path, 'size_groups.png')
    plt.savefig(size_path)
    plt.close()
    pdf.add_page()
    pdf.image(size_path, x=10, y=None, w=180)

    pdf.add_page()
    avg_radius = boulder_df['radius'].mean()
    zone_area_km2 = np.pi * radius**2 * 0.01 * 0.01
    total_landslide_area = len(landslide_data) * zone_area_km2
    pdf.multi_cell(0, 10, txt=f"""
Summary Statistics:

- Total Boulders Detected: {len(boulder_df)}
- Average Boulder Radius: {avg_radius:.2f} pixels
- Total Landslide Zones: {len(landslide_data)}
- Approximate Landslide Area: {total_landslide_area:.2f} km²
- Boulder Density: {boulder_density:.2f} per km²
""")

    pdf_path = os.path.join(processed_path, 'Lunar_Surface_Analysis_Report.pdf')
    pdf.output(pdf_path)

    # Step 5: Create ZIP
    zip_path = os.path.join(processed_path, 'report_bundle.zip')
    with ZipFile(zip_path, 'w') as zipf:
        for file in os.listdir(processed_path):
            if file != 'report_bundle.zip':
                zipf.write(os.path.join(processed_path, file), arcname=file)

    # return jsonify({
    #     'output_image': '/' + final_path.replace('\\', '/'),
    #     'report_pdf': '/' + pdf_path.replace('\\', '/'),
    #     'zip_file': '/' + zip_path.replace('\\', '/'),
    #     'boulder_data': boulder_data
    # })

    return jsonify({
        'output_image': to_url_path(final_path),
        'report_pdf': to_url_path(pdf_path),
        'zip_file': to_url_path(zip_path),
        'boulder_data': boulder_data,
        'summary': {
            'total_boulders': len(boulder_df),
            'avg_radius': avg_radius,
            'landslide_zones': len(landslide_data),
            'landslide_area_km2': total_landslide_area,
            'boulder_density': boulder_density
        }
    })
    
def to_url_path(full_path):
    rel_path = os.path.relpath(full_path, start=STATIC_FOLDER)
    return '/static/' + rel_path.replace(os.sep, '/')

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


if __name__ == '__main__':
    app.run(debug=True)
