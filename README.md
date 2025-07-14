# The MOONITORS 🌙

**Discover the Wonders of the Moon with The MOONITORS**

A cutting-edge web application that brings lunar science to your fingertips through interactive 3D visualization, AI-powered boulder and landslide detection, and engaging educational content.

![Moon Explorer](html2/static/Assets/logo.png)

## 🚀 Features

### 🌑 Interactive 3D Moon Exploration
- **Immersive Experience**: Navigate the Moon's surface in stunning 3D using Spline technology
- **Lunar Landmarks**: Discover famous sites like Tranquility Base and Tycho Crater
- **Real-time Moon Phase**: View the current lunar phase live
- **Scientific Insights**: Learn about moonquakes, gravity, and lunar geology

### 🔬 AI-Powered Surface Analysis
- **Boulder Detection**: Advanced computer vision algorithms identify lunar boulders
- **Landslide Zone Mapping**: Automated detection of potential landslide areas
- **Detailed Analytics**: Comprehensive reports with heatmaps and statistical analysis
- **Visual Overlays**: Professional annotations with legends, scale bars, and directional indicators

### 📊 Comprehensive Reporting
- **PDF Reports**: Auto-generated detailed analysis reports
- **Data Visualization**: Heatmaps, histograms, and distribution charts
- **CSV Export**: Raw data available for further analysis
- **Bundle Downloads**: Complete analysis packages in ZIP format

### 🎓 Educational Content
- **Moon Facts**: Rotating collection of fascinating lunar trivia
- **Mission Archive**: Information about past and future lunar missions
- **Interactive Learning**: Engaging content suitable for all ages

## 🛠️ Technology Stack

### Frontend
- **HTML5/CSS3**: Modern, responsive design
- **JavaScript**: Interactive features and API integration
- **Spline 3D**: Advanced 3D lunar visualization
- **Responsive Design**: Mobile-friendly interface

### Backend
- **Flask**: Python web framework
- **OpenCV**: Computer vision for image processing
- **NumPy/Pandas**: Data analysis and manipulation
- **Matplotlib/Seaborn**: Data visualization
- **FPDF**: PDF report generation

### AI & Image Processing
- **Hough Circle Transform**: Boulder detection algorithm
- **Histogram Equalization**: Image enhancement
- **Median Filtering**: Noise reduction
- **Density Analysis**: Spatial distribution mapping

## 📁 Project Structure

```
BAH_2025/
├── html2/
│   ├── backend/
│   │   ├── main.py              # Flask application server
│   │   ├── templates/
│   │   │   └── index.html       # Main website template
│   │   └── static/              # Static asset links
│   └── static/
│       ├── script.js            # Frontend JavaScript
│       ├── style.css            # Styling and animations
│       ├── Assets/              # Images and media files
│       ├── uploads/             # User uploaded images
│       └── processed/           # Analysis results
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Python 3.7+
- pip (Python package manager)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/its-mv/BAH_2025.git
   cd BAH_2025
   ```

2. **Navigate to the project directory**
   ```bash
   cd html2/backend
   ```

3. **Install required packages**
   ```bash
   pip install flask opencv-python numpy pandas matplotlib seaborn fpdf2
   ```

4. **Run the application**
   ```bash
   python main.py
   ```

5. **Open your browser**
   ```
   http://localhost:5000
   ```

## 🖥️ Usage

### 3D Moon Exploration
1. Navigate to the **3D Moon** section
2. Interact with the 3D model using mouse controls
3. Explore different lunar features and landmarks
4. Read fascinating moon facts that rotate every 5 seconds

### Boulder & Landslide Detection
1. Go to the **Moon Scan** section
2. Upload a lunar surface image (PNG, JPG, JPEG)
3. Click **"Run Detection"** to analyze the image
4. View the annotated results with:
   - Boulder detection (blue circles)
   - Landslide zones (green overlays)
   - Statistical analysis
   - Professional annotations

### Download Results
- **Processed Image**: Annotated lunar surface analysis
- **PDF Report**: Comprehensive analysis with charts
- **Data Files**: CSV files with detection coordinates
- **Complete Bundle**: ZIP file with all results

## 🎯 Key Algorithms

### Landslide Zone Analysis
- **Proximity Analysis**: Creates buffer zones around detected boulders
- **Risk Assessment**: Evaluates potential landslide areas
- **Density Mapping**: Generates heatmaps of boulder distribution

### Statistical Analysis
- Boulder density per km²
- Average boulder radius
- Total landslide area estimation
- Spatial distribution analysis

## 👥 Team

### 👨‍💻 Meet Gajjar
- **Role**: Website & Backend Development
- **Email**: meetgajjar@example.com
- **Contribution**: Led complete frontend and backend development, ensuring seamless UI/UX and functional integration

### 👩‍🔬 Krishna Patel
- **Role**: Boulders & Landslide Detection
- **Email**: krishnapatel@example.com
- **Contribution**: Built Python-based detection systems and created comprehensive project documentation

### 🤖 Aditi Lakhataria
- **Role**: Artificial Intelligence
- **Email**: aditi.l@example.com
- **Contribution**: Implemented AI logic powering moon facts and intelligent insights across the platform

### 📝 Khushi Shah
- **Role**: Documentation
- **Email**: khushishah@example.com
- **Contribution**: Created clear, structured documentation explaining features, goals, and project mechanics

## 🔮 Future Enhancements

- **Machine Learning Integration**: Advanced AI models for better detection accuracy
- **Real-time Data**: Integration with NASA APIs for live lunar data
- **VR Support**: Virtual reality lunar exploration
- **Mobile App**: Native mobile application
- **Multi-language Support**: Internationalization for global accessibility
- **Advanced Analytics**: More sophisticated geological analysis tools

## 🌟 Key Features Highlight

- **🎨 Modern UI/UX**: Beautiful, intuitive interface design
- **⚡ Fast Processing**: Efficient image analysis algorithms
- **📱 Responsive Design**: Works seamlessly on all devices
- **🔒 Secure**: Safe file handling and processing
- **📊 Data Export**: Multiple export formats for analysis
- **🎓 Educational**: Perfect for students and space enthusiasts

## 🤝 Contributing

We welcome contributions! Please feel free to:
- Report bugs and issues
- Suggest new features
- Submit pull requests
- Improve documentation

## 📄 License

This project is part of the BAH 2025 Hackathon. All rights reserved by The MOONITORS team.

## 🙏 Acknowledgments

- **NASA**: For providing lunar surface imagery and scientific data
- **Spline**: For the incredible 3D visualization platform
- **OpenCV Community**: For powerful computer vision tools
- **Flask Team**: For the excellent web framework

---

**Made with ❤️ by The MOONITORS Team**

*Chart a journey beyond Earth with us. Dive into lunar landscapes, decode moon mysteries, and become a part of the next space frontier.*

---

## 📞 Contact

For questions, suggestions, or collaboration opportunities, feel free to reach out to any of our team members listed above.

**© 2025 The MOONITORS. All rights reserved.**
