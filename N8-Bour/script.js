function createPlanet(canvasId) {
    const canvas = document.getElementById(canvasId);
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
        -cameraSize * aspect,  // Left
        cameraSize * aspect,   // Right
        cameraSize,            // Top
        -cameraSize,           // Bottom
        0.1,                   // Near
        1000                   // Far
    );
    const renderer = new THREE.WebGLRenderer({ canvas });





    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    const geometry = new THREE.SphereGeometry(1, 32, 32); // Bentuk planet (bola)
    const texture = new THREE.TextureLoader().load("frame/img/proxima.png"); // Gambar tekstur planet (contoh: Bumi)
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    camera.position.z = 3;

    function animate() {
        requestAnimationFrame(animate);
        sphere.rotation.y += 0.01; // Memutar planet
        renderer.render(scene, camera);
    }

    animate();
}

// Render planet di tiap card
createPlanet('planet1');