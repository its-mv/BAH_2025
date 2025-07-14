// moonFacts.js

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

const moonFactElement = document.getElementById("moon-fact");

function showRandomFact() {
  const randomIndex = Math.floor(Math.random() * facts.length);
  moonFactElement.classList.remove("fade");  
  moonFactElement.offsetWidth;
  moonFactElement.textContent = facts[randomIndex];  
  moonFactElement.classList.add("fade");
}

document.addEventListener("DOMContentLoaded", () => {
  showRandomFact();
  setInterval(showRandomFact, 5000);
});

// Wait for the spline-viewer to load content
window.addEventListener('DOMContentLoaded', () => {
    // Delay to ensure inner content is rendered
    setTimeout(() => {
        const logo = document.querySelector('spline-viewer')?.shadowRoot?.getElementById('logo');
        if (logo) logo.remove();
    }, 1000); // Adjust delay if needed
});

// toggle menu 
function toggleMenu() {
  const navLinks = document.getElementById("nav-links");
  navLinks.classList.toggle("show");
}

// scroll to top
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


// run detection button
const uploadedImage = document.getElementById("uploadedImage");
const imageUpload = document.getElementById("imageUpload");
const runBtn = document.getElementById("runDetectionBtn");
const downloadBtn = document.getElementById("downloadBtn");
const defaultImagePath = "../Assets/uploadImg.png"; // Your default path
runBtn.disabled = true;
downloadBtn.disabled = true;
runBtn.style.cursor = "not-allowed";
function previewImage(event) {
  const file = event.target.files[0];
  if (file) {
    const imageURL = URL.createObjectURL(file);
    uploadedImage.src = imageURL;
    runBtn.style.cursor = "pointer";
    runBtn.disabled = false;
    downloadBtn.disabled = false;
  } else {
    uploadedImage.src = defaultImagePath;
    runBtn.disabled = true;
  }
}

// ContactUs, AboutUs
function toggleOverlay(id) {
  const section = document.getElementById(id);
  if (section.style.display === "none" || section.style.display === "") {
    section.style.display = "block";
    section.scrollIntoView({ behavior: "smooth" });
  } else {
    section.style.display = "none";
  }
}

// color
// const visibleSections = [];

// function toggleOverlay(sectionId) {
//   const section = document.getElementById(sectionId);
//   const container = document.querySelector(".container");
//   const footer = document.querySelector(".footer");

//   const isVisible = section.style.display === "block";

//   if (isVisible) {
//     section.style.display = "none";
//     const index = visibleSections.indexOf(sectionId);
//     if (index !== -1) visibleSections.splice(index, 1);
//     section.remove();
//   } else {
//     section.style.display = "block";

//     if (!visibleSections.includes(sectionId)) {
//       visibleSections.push(sectionId);
//     }

//     // Remove and Re-insert in correct order before footer
//     visibleSections.forEach(id => {
//       const sec = document.getElementById(id);
//       sec.remove();
//       container.insertBefore(sec, footer);
//     });
//   }

//   // Apply alternating background styles
//   visibleSections.forEach((id, index) => {
//     const sec = document.getElementById(id);
//     const isEven = (index + 1) % 2 === 0;
//     sec.style.backgroundColor = isEven ? "#e8eefc" : "#4A5568";
//     sec.style.color = isEven ? "#000" : "#fff";
//   });

//   // Scroll to visible one
//   if (!isVisible) {
//     section.scrollIntoView({ behavior: "smooth" });
//   }
// }
// const visibleSections = [];

// function toggleOverlay(sectionId) {
//   const section = document.getElementById(sectionId);
//   const container = document.querySelector(".container");
//   const footer = document.querySelector(".footer");

//   const isVisible = section.style.display === "block";

//   if (isVisible) {
//     section.style.display = "none";
//     const index = visibleSections.indexOf(sectionId);
//     if (index !== -1) visibleSections.splice(index, 1);
    
//     section.remove();
//   } else {
//     section.style.display = "block";
//     if (!visibleSections.includes(sectionId)) {
//       visibleSections.push(sectionId);
//     }

//     // Re-insert all visible sections in order before footer
//     visibleSections.forEach(id => {
//       const sec = document.getElementById(id);
//       sec.remove();
//       container.insertBefore(sec, footer);
//     });
//   }

//   // Apply alternating background and text/close-btn colors
//   visibleSections.forEach((id, index) => {
//     const sec = document.getElementById(id);
//     const isEven = (index + 1) % 2 === 0;

//     const bgColor = isEven ? "#e8eefc" : "#4A5568";
//     const textColor = isEven ? "#1a1a1a" : "#eeeeee";

//     sec.style.backgroundColor = bgColor;
//     sec.style.color = textColor;

//     // Update all text and button color inside section-box
//     const closeBtn = sec.querySelector(".close-btn");
//     if (closeBtn) {
//       closeBtn.style.color = textColor;
//     }

//     const links = sec.querySelectorAll("a");
//     links.forEach(link => {
//       link.style.color = textColor;
//     });
//   });

//   if (!isVisible) {
//     section.scrollIntoView({ behavior: "smooth" });
//   }
// }

// scrollbar
// // Show button when scrolled down
window.addEventListener("scroll", function () {
  const scrollBtn = document.getElementById("scrollTopBtn");
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
});

// Scroll to top on click
document.getElementById("scrollTopBtn").addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

    
// Optional: disable button again if default image is shown (e.g., reload or reset)
window.addEventListener("DOMContentLoaded", () => {
  if (uploadedImage.src.includes("uploadImg.png")) {
    runBtn.disabled = true;
  }
});
    

// image (temporary)
let uploadedImageFile = null;

function previewImage(event) {
    const reader = new FileReader();
    reader.onload = function () {
        const output = document.getElementById('uploadedImage');
        output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
    uploadedImageFile = event.target.files[0];

    // Reset UI
    document.getElementById('detectedImage').src = "../Assets/genImg.png";
    document.getElementById('detectionDetails').innerHTML = "No Details Yet";
    document.getElementById('downloadBtn').style.display = 'none';
    document.getElementById('zipDownloadBtn')?.remove(); // Remove previous button if exists
}

document.getElementById('runDetectionBtn').addEventListener('click', async () => {
    if (!uploadedImageFile) {
        alert("Please upload an image first.");
        return;
    }

    const formData = new FormData();
    formData.append('image', uploadedImageFile);

    const runBtn = document.getElementById('runDetectionBtn');
    runBtn.innerText = "Processing...";
    runBtn.disabled = true;

    const res = await fetch('/process', {
        method: 'POST',
        body: formData
    });

    const data = await res.json();

    if (data.error) {
        alert("Error: " + data.error);
        runBtn.innerText = "Run Detection";
        runBtn.disabled = false;
        return;
    }

    // Show output image
    document.getElementById('detectedImage').src = data.output_image + '?v=' + new Date().getTime();

    // Show details
    const detailBox = document.getElementById('detectionDetails');
    detailBox.innerHTML = `<strong>Total Boulders Detected:</strong> ${data.boulder_data.length}<br>`;
    data.boulder_data.forEach((b, i) => {
        detailBox.innerHTML += `#${i + 1} → Cluster: ${b.cluster}, Radius: ${b.radius}<br>`;
    });

    // Show download buttons
    const downloadBtn = document.getElementById('downloadBtn');
    downloadBtn.style.display = 'inline-block';
    downloadBtn.onclick = () => {
        const link = document.createElement('a');
        link.href = data.output_image;
        link.download = "detected_output.jpg";
        link.click();
    };

    // Add ZIP download button dynamically
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

    runBtn.innerText = "Run Detection";
    runBtn.disabled = false;
});


    
// image
function previewImage(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = function () {
    document.getElementById('uploadedImage').src = reader.result;
  };
  if (file) {
    reader.readAsDataURL(file);
  }
}

document.getElementById('runDetectionBtn').addEventListener('click', () => {
  // Trigger Python API call here
  // After response:
  // document.getElementById('detectedImage').src = 'path/to/generated_image.png';
  // document.getElementById('detectionDetails').innerText = 'Parsed details here...';
});

document.getElementById('downloadBtn').addEventListener('click', () => {
  const link = document.createElement('a');
  link.href = document.getElementById('detectedImage').src;
  link.download = 'input_image.png';
  link.click();
});