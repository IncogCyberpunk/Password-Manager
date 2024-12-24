import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Globe = () => {
    console.log(`I am here`)
    const globeRef = useRef();

    useEffect(() => {
        console.log(globeRef.current)
        if (!globeRef.current) return;

        // Scene, Camera, Renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            globeRef.current.clientWidth / globeRef.current.clientHeight,
            0.1,
            1000
        );
        camera.position.z = 3;

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(globeRef.current.clientWidth, globeRef.current.clientHeight);
        globeRef.current.appendChild(renderer.domElement);

        // Geometry and Material
        const geometry = new THREE.SphereGeometry(1.4, 32, 32);
        const textureLoader = new THREE.TextureLoader();
        const earthTexture = textureLoader.load('/earthMap.jpg'); // Place this in your public folder
        const material = new THREE.MeshStandardMaterial({ map: earthTexture });
        const globe = new THREE.Mesh(geometry, material);
        scene.add(globe);

        // Lighting
        const light = new THREE.PointLight(0xffffff, 5);
        light.position.set(0, 0,3);
        scene.add(light);

        // Animation
        const animate = () => {
            requestAnimationFrame(animate);
            globe.rotation.y += 0.004;
            renderer.render(scene, camera);
        };
        animate();

        // Handle resizing
        const handleResize = () => {
            renderer.setSize(globeRef.current.clientWidth, globeRef.current.clientHeight);
            camera.aspect = globeRef.current.clientWidth / globeRef.current.clientHeight;
            camera.updateProjectionMatrix();
        };
        window.addEventListener('resize', handleResize);

        return () => {
            // Cleanup
            window.removeEventListener('resize', handleResize);
            renderer.dispose();
            globeRef.current.removeChild(renderer.domElement);
        };
    }, []);

    return  <div ref={globeRef} style={{ width: '100%', height: '100%', zIndex: 500 }} className='fixed top-0 right-0 '  ></div>
};

export default Globe;
