

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('planet-canvas'), alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Create a sphere geometry for the planet
const geometry = new THREE.SphereGeometry(1, 64, 64);

// Create a texture loader
const textureLoader = new THREE.TextureLoader();

// Load your planet texture
const texture = textureLoader.load('../img/teegarden.png');  // Adjust the file extension if it's not a .jpg

// Create a material with the texture
const material = new THREE.MeshBasicMaterial({
    map: texture
});

// Create a mesh with the geometry and material
const planet = new THREE.Mesh(geometry, material);

// Add the planet to the scene
scene.add(planet);

// Position the camera
camera.position.z = 2.5;

// Variables for handling mouse interaction
let isMouseDown = false;
let previousMousePosition = {
    x: 0,
    y: 0
};

// Auto-spin variables
const autoRotationSpeed = 0.001;
let lastAutoRotationTime = Date.now();

// Event listeners for mouse interaction
document.addEventListener('mousedown', onMouseDown, false);
document.addEventListener('mouseup', onMouseUp, false);
document.addEventListener('mousemove', onMouseMove, false);

function onMouseDown(event) {
    isMouseDown = true;
}

function onMouseUp(event) {
    isMouseDown = false;
}

function onMouseMove(event) {
    if (isMouseDown) {
        const deltaMove = {
            x: event.clientX - previousMousePosition.x,
            y: event.clientY - previousMousePosition.y
        };

        planet.rotation.y += deltaMove.x * 0.01;
        planet.rotation.x += deltaMove.y * 0.01;

        lastAutoRotationTime = Date.now();
    }

    previousMousePosition = {
        x: event.clientX,
        y: event.clientY
    };
}

// Animation function
function animate() {
    requestAnimationFrame(animate);

    if (Date.now() - lastAutoRotationTime > 100) {
        planet.rotation.y += autoRotationSpeed;
    }

    renderer.render(scene, camera);
}

// Start the animation
animate();

// Handle window resizing
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}