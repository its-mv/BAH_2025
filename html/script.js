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

function toggleMenu() {
  const navLinks = document.getElementById("nav-links");
  navLinks.classList.toggle("show");
}
