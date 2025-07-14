// moonFacts
const facts = [
  "The Moon is drifting away from Earth at a rate of 3.8 cm per year.",
  "Only 12 people have ever walked on the Moon — all astronauts from the Apollo missions.",
  "The Moon has moonquakes, just like Earth has earthquakes!",
  "There’s no atmosphere on the Moon, which means no sound and no weather.",
  "The same side of the Moon always faces Earth — it’s tidally locked.",
  "The Moon is about 1/6th the gravity of Earth — you’d weigh much less there.",
  "The dark spots on the Moon are called ‘maria’ — ancient lava plains.",
  "The Moon is Earth's only natural satellite and it influences tides on Earth.",
  "It takes over 27 Earth days for the Moon to complete one rotation.",
  "Temperatures on the Moon can swing from +127°C in the day to -173°C at night!"
];

function showRandomFact() {
  const moonFactElement = document.getElementById("moon-fact");
  const randomIndex = Math.floor(Math.random() * facts.length);
  moonFactElement.classList.remove("fade");
  moonFactElement.offsetWidth;
  moonFactElement.textContent = facts[randomIndex];
  moonFactElement.classList.add("fade");
}

// Globals
let uploadedImageFile = null;
const defaultImagePath = "/static/Assets/uploadImg.png";

// DOMContentLoaded — One unified block
window.addEventListener("DOMContentLoaded", () => {
  showRandomFact();
  setInterval(showRandomFact, 5000);

  // Remove Spline logo
  setTimeout(() => {
    const logo = document.querySelector('spline-viewer')?.shadowRoot?.getElementById('logo');
    if (logo) logo.remove();
  }, 1000);

  // Scroll Top button logic
  const scrollBtn = document.getElementById("scrollTopBtn");
  window.addEventListener("scroll", () => {
    scrollBtn.style.display = (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) ? "block" : "none";
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Initial state check
  updateButtonsState();
});

// Toggle menu
function toggleMenu() {
  const navLinks = document.getElementById("nav-links");
  navLinks.classList.toggle("show");
}

// Update run/download button states
function updateButtonsState() {
  const currentImageSrc = document.getElementById("uploadedImage").src;
  const isDefaultImage = currentImageSrc.includes("uploadImg.png");

  const runBtn = document.getElementById("runDetectionBtn");
  const downloadBtn = document.getElementById("downloadBtn");

  runBtn.disabled = isDefaultImage;
  runBtn.style.cursor = isDefaultImage ? "not-allowed" : "pointer";

  downloadBtn.disabled = isDefaultImage;
  downloadBtn.style.display = isDefaultImage ? "disabled" : "inline-block";
}

// Image upload preview
function previewImage(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function () {
      document.getElementById("uploadedImage").src = reader.result;
      uploadedImageFile = file;

      // Reset output
      document.getElementById('detectedImage').src = "/static/Assets/genImg.png";
      // document.getElementById('detectionDetails').p = "No Details Yet";
      document.querySelector('#detectionDetails p').innerText = "No Details Yet";
      document.getElementById('zipDownloadBtn')?.remove();
      
      // Enable buttons
      updateButtonsState();
    };
    reader.readAsDataURL(file);
  } else {
    document.getElementById("uploadedImage").src = defaultImagePath;
    uploadedImageFile = null;
    updateButtonsState();
  }
}

// Run detection button click
document.getElementById('runDetectionBtn').addEventListener('click', async () => {
  if (!uploadedImageFile) {
    alert("Please upload an image first.");
    return;
  }

  const runBtn = document.getElementById('runDetectionBtn');
  const downloadBtn = document.getElementById('downloadBtn');
  // const detailBox = document.getElementById('detectionDetails');
  const detailBox = document.getElementById('detectionDetailsText');
  // const detailBox = document.querySelector('#detectionDetails p');

  const formData = new FormData();
  formData.append('image', uploadedImageFile);

  runBtn.innerText = "Processing...";
  runBtn.disabled = true;

  try {
    const res = await fetch('/process', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();

    if (data.error) {
      alert("Error: " + data.error);
      return;
    }

    // Show output
    document.getElementById('detectedImage').src = data.output_image + '?v=' + new Date().getTime();

    // Show details
    // detailBox.innerHTML = `<strong>Total Boulders Detected:</strong> ${data.boulder_data.length}<br>`;
    // data.boulder_data.forEach((b, i) => {
    //   detailBox.innerHTML += `#${i + 1} → Cluster: ${b.cluster}, Radius: ${b.radius}<br>`;
    // });
    const summary = data.summary;

    detailBox.innerHTML = `
      • Total Boulders Detected: ${summary.total_boulders}<br>
      • Average Boulder Radius: ${summary.avg_radius.toFixed(2)} pixels<br>
      • Total Landslide Zones: ${summary.landslide_zones}<br>
      • Estimated Landslide Area: ${summary.landslide_area_km2.toFixed(2)} km²<br>
      • Boulder Density: ${summary.boulder_density.toFixed(2)} per km²
    `;

    // Download button
    // downloadBtn.style.display = 'inline-block';
    downloadBtn.disabled = false; // ✅ keep this
    downloadBtn.onclick = () => {
      const link = document.createElement('a');
      link.href = data.output_image;
      link.download = "detected_output.jpg";
      link.click();
    };

    // ZIP download button
    const zipBtn = document.createElement("button");
    zipBtn.id = "zipDownloadBtn";
    zipBtn.textContent = "Download Full Report (.zip)";
    zipBtn.style.marginTop = "10px";
    zipBtn.onclick = () => {
      const link = document.createElement('a');
      link.href = data.zip_file;
      link.download = "report_bundle.zip";
      link.click();
    };
    document.querySelector('.output-section').appendChild(zipBtn);

  } catch (err) {
    alert("Error: " + err.message);
  } finally {
    runBtn.innerText = "Run Detection";
    runBtn.disabled = false;
  }
});

// Toggle overlay sections
function toggleOverlay(id) {
  const section = document.getElementById(id);
  if (section.style.display === "none" || section.style.display === "") {
    section.style.display = "block";
    section.scrollIntoView({ behavior: "smooth" });
  } else {
    section.style.display = "none";
  }
}
