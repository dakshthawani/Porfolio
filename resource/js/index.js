// Setup scene, camera, renderer for the hero section
const heroScene = new THREE.Scene();
const heroCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const heroRenderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
    alpha: true // Enable transparency for the background
});
heroRenderer.setPixelRatio(window.devicePixelRatio);
heroRenderer.setSize(window.innerWidth, window.innerHeight);
heroRenderer.setClearColor(new THREE.Color(0x1f1f2e), 1); // Dark gradient background color
heroCamera.position.setZ(30);

// Add lighting for the hero section
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // Softer ambient light
heroScene.add(pointLight, ambientLight);

// Add a 3D torus object for the hero section
const torusGeometry = new THREE.TorusGeometry(10, 3, 16, 100);
const torusMaterial = new THREE.MeshStandardMaterial({
    color: 0xAAB6F2, // Subtle blue color for the torus
    wireframe: true,
    opacity: 0.8,
    transparent: true
});
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
heroScene.add(torus);

// Variables to store mouse position for hero section
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

// Listen for mouse movement for hero section
document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Setup particle effect with adjusted count and size
const particleGeometry = new THREE.BufferGeometry();
const count = 1000; // Reduced particle count
const positions = new Float32Array(count * 3);
for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 100; // Spread particles randomly
}
particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

// Adjust size and color of particles for a soft white glow
const particleMaterial = new THREE.PointsMaterial({
    size: 0.2,
    color: 0x787893, // Subtle greyish-lavender color
    opacity: 0.8,
    transparent: true
});
const particles = new THREE.Points(particleGeometry, particleMaterial);
heroScene.add(particles);

// Animation loop for the hero section
function animateHero() {
    requestAnimationFrame(animateHero);

    // Update target positions for smoother motion
    targetX = mouseX * 10;
    targetY = mouseY * 10;

    // Rotate the torus
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;

    // Move the camera slightly based on mouse movement
    heroCamera.position.x += (targetX - heroCamera.position.x) * 0.05;
    heroCamera.position.y += (targetY - heroCamera.position.y) * 0.05;

    // Keep the camera focused on the torus
    heroCamera.lookAt(torus.position);

    heroRenderer.render(heroScene, heroCamera);
}
animateHero();


// Handle resizing for hero section
window.addEventListener('resize', () => {
    heroRenderer.setSize(window.innerWidth, window.innerHeight);
    heroCamera.aspect = window.innerWidth / window.innerHeight;
    heroCamera.updateProjectionMatrix();
});

// Wait for the document to fully load
document.addEventListener("DOMContentLoaded", () => {
    const nameElement = document.querySelector("h1");
    const menuItems = document.querySelectorAll('.menu li'); // Select menu items

    // Animate name
    gsap.to(nameElement, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power2.out",
        delay: 0.5, // Slight delay for better effect
    });

    // Ensure the menu items are hidden initially in CSS (if not already done)
    gsap.set(menuItems, { opacity: 0, y: 50 }); // Set opacity and position before animation

    // Animate menu items with GSAP
    menuItems.forEach((item, index) => {
        gsap.to(item, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            delay: 0.5 + index * 0.2 // Staggering effect for menu items
        });
    });

function toggleMenu() {
    const menuContent = document.querySelector('.menu-content');
    menuContent.classList.toggle('show');
    }

let lastScrollTop = 0;
const stickyMenu = document.getElementById('stickyMenu');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > 800) { // Adjust the value to when you want the menu to appear
        if (currentScroll > lastScrollTop) {
            // Scrolling down
            stickyMenu.style.display = 'flex'; // Show sticky menu
        } else {
            // Scrolling up
            stickyMenu.style.display = 'none'; // Hide sticky menu
        }
    } else {
        stickyMenu.style.display = 'none'; // Hide sticky menu if not scrolled past threshold
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
});

    
});

const projectCards = document.querySelectorAll('.project-card');
const filters = document.querySelectorAll('.filter');

filters.forEach((filter) => {
  filter.addEventListener('click', () => {
    const filterValue = filter.dataset.filter;
    projectCards.forEach((card) => {
      if (card.dataset.category === filterValue) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });
  });
});

// Smooth scrolling functionality
document.querySelectorAll('.menu-button').forEach(button => {
    button.addEventListener('click', function() {
        const targetID = button.getAttribute('data-target');
        const targetSection = document.querySelector(targetID);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start' // Align the top of the section to the top of the viewport
            });
        }
    });
});
document.querySelectorAll('.contact-button').forEach(button => {
    button.addEventListener('click', function() {
        const targetID = button.getAttribute('data-target');
        const targetSection = document.querySelector(targetID);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start' // Align the top of the section to the top of the viewport
            });
        }
    });
});

// Function to handle the reveal animation
function revealSection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;

            // Add class to start animation
            gsap.to(target, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out"
            });

            // Unobserve the section after it has been animated
            observer.unobserve(target);
        }
    });
}

let currentSlide = 0;

const slides = document.querySelectorAll(".project-slide");
const totalSlides = slides.length;
const slider = document.querySelector(".project-slider");

document.getElementById("nextBtn").addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlidePosition();
});

document.getElementById("prevBtn").addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlidePosition();
});

function updateSlidePosition() {
    const slideWidth = slides[0].clientWidth;
    slider.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
}


function downloadCert(event, path) {
    event.stopPropagation(); // Prevents the card click from triggering
    window.open(path, '_blank'); // Opens the certification in a new tab for viewing or downloading
}

  
// Create an intersection observer
const options = {
    root: null, // Use the viewport as the root
    threshold: 0.1 // Trigger when 10% of the section is in view
};

const observer = new IntersectionObserver(revealSection, options);

// Select the sections to observe
const aboutSection = document.getElementById('about');
const projectSection = document.getElementById('projects');

// Set initial styles (optional)
gsap.set(aboutSection, { opacity: 0, y: 50 });
gsap.set(projectSection, { opacity: 0, y: 50 });

// Start observing the sections
observer.observe(aboutSection);
observer.observe(projectSection);

// Function to toggle menu (if needed)
function toggleMenu() {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('open'); // Toggle 'open' class to show/hide menu
}
