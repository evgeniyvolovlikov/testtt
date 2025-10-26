import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export const BrainAnimation: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create brain-like structure
    const brainGroup = new THREE.Group();

    // Main brain sphere with organic shape
    const sphereGeometry = new THREE.SphereGeometry(1.5, 32, 32);
    const sphereMaterial = new THREE.MeshPhongMaterial({
      color: 0x6366f1,
      emissive: 0x4f46e5,
      shininess: 100,
      transparent: true,
      opacity: 0.7,
    });
    const mainSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    brainGroup.add(mainSphere);

    // Add hemisphere separation
    const hemisphereGeometry = new THREE.SphereGeometry(1.52, 32, 32, 0, Math.PI);
    const hemisphereMaterial = new THREE.MeshPhongMaterial({
      color: 0x8b5cf6,
      emissive: 0x7c3aed,
      shininess: 100,
      transparent: true,
      opacity: 0.6,
    });
    const leftHemisphere = new THREE.Mesh(hemisphereGeometry, hemisphereMaterial);
    brainGroup.add(leftHemisphere);

    // Neural network connections
    const createNeuralConnection = (startPos: THREE.Vector3, endPos: THREE.Vector3) => {
      const points = [];
      const segments = 20;
      
      for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const x = startPos.x + (endPos.x - startPos.x) * t;
        const y = startPos.y + (endPos.y - startPos.y) * t + Math.sin(t * Math.PI) * 0.3;
        const z = startPos.z + (endPos.z - startPos.z) * t;
        points.push(new THREE.Vector3(x, y, z));
      }
      
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: 0x06b6d4,
        transparent: true,
        opacity: 0.4,
      });
      
      return new THREE.Line(geometry, material);
    };

    // Add neural connections
    for (let i = 0; i < 15; i++) {
      const theta1 = Math.random() * Math.PI * 2;
      const phi1 = Math.random() * Math.PI;
      const theta2 = Math.random() * Math.PI * 2;
      const phi2 = Math.random() * Math.PI;
      
      const start = new THREE.Vector3(
        1.5 * Math.sin(phi1) * Math.cos(theta1),
        1.5 * Math.sin(phi1) * Math.sin(theta1),
        1.5 * Math.cos(phi1)
      );
      
      const end = new THREE.Vector3(
        1.5 * Math.sin(phi2) * Math.cos(theta2),
        1.5 * Math.sin(phi2) * Math.sin(theta2),
        1.5 * Math.cos(phi2)
      );
      
      const connection = createNeuralConnection(start, end);
      brainGroup.add(connection);
    }

    // Add neuron nodes
    const nodeGeometry = new THREE.SphereGeometry(0.05, 16, 16);
    const nodeMaterial = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.8,
    });

    for (let i = 0; i < 30; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      node.position.set(
        1.5 * Math.sin(phi) * Math.cos(theta),
        1.5 * Math.sin(phi) * Math.sin(theta),
        1.5 * Math.cos(phi)
      );
      brainGroup.add(node);
    }

    // Outer glow sphere
    const glowGeometry = new THREE.SphereGeometry(1.8, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.1,
      side: THREE.BackSide,
    });
    const glowSphere = new THREE.Mesh(glowGeometry, glowMaterial);
    brainGroup.add(glowSphere);

    scene.add(brainGroup);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x6366f1, 1, 100);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x06b6d4, 1, 100);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    camera.position.z = 5;

    // Animation
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      brainGroup.rotation.y += 0.003;
      brainGroup.rotation.x = Math.sin(Date.now() * 0.0005) * 0.1;

      // Pulse effect
      const scale = 1 + Math.sin(Date.now() * 0.001) * 0.02;
      glowSphere.scale.set(scale, scale, scale);

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
};
