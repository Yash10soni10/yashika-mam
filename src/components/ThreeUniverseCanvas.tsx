import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Heart, Compass, Sparkles } from 'lucide-react';

export const ThreeUniverseCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [activePreset, setActivePreset] = useState<'constellation' | 'galaxy'>('constellation');

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // White / Pearl Theme Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfcfaf9);
    scene.fog = new THREE.FogExp2(0xfcfaf9, 0.002);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 450;

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 48;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 1. Pearl & Rose Stardust Particles
    const starCount = 1400;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const palette = [
      new THREE.Color('#FB7185'), // Blush Rose
      new THREE.Color('#F59E0B'), // Champagne Gold
      new THREE.Color('#E11D48'), // Vibrant Rose
      new THREE.Color('#CBD5E1'), // Pearl Slate
      new THREE.Color('#F472B6'), // Soft Pink
    ];

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      starPositions[i3] = (Math.random() - 0.5) * 280;
      starPositions[i3 + 1] = (Math.random() - 0.5) * 190;
      starPositions[i3 + 2] = (Math.random() - 0.5) * 220;

      const color = palette[Math.floor(Math.random() * palette.length)];
      starColors[i3] = color.r;
      starColors[i3 + 1] = color.g;
      starColors[i3 + 2] = color.b;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 1.6,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    });

    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // 2. Heart Constellation Mesh
    const heartShapePoints: THREE.Vector3[] = [];
    const numHeartPoints = 64;
    for (let i = 0; i <= numHeartPoints; i++) {
      const t = (i / numHeartPoints) * Math.PI * 2;
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
      heartShapePoints.push(new THREE.Vector3(x * 0.7, y * 0.7, (Math.random() - 0.5) * 2));
    }

    const heartLineGeometry = new THREE.BufferGeometry().setFromPoints(heartShapePoints);
    const heartLineMaterial = new THREE.LineBasicMaterial({
      color: 0xe11d48,
      transparent: true,
      opacity: 0.75,
      linewidth: 2,
    });
    const heartLine = new THREE.Line(heartLineGeometry, heartLineMaterial);
    scene.add(heartLine);

    // Glowing Star Nodes
    const nodeGeometry = new THREE.SphereGeometry(0.5, 16, 16);
    const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
    const constellationGroup = new THREE.Group();

    heartShapePoints.filter((_, idx) => idx % 6 === 0).forEach((pt) => {
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      node.position.copy(pt);
      const glowMat = new THREE.MeshBasicMaterial({
        color: 0xfb7185,
        transparent: true,
        opacity: 0.4,
      });
      const glow = new THREE.Mesh(new THREE.SphereGeometry(1.2, 16, 16), glowMat);
      node.add(glow);
      constellationGroup.add(node);
    });

    scene.add(constellationGroup);

    // 3. Central Warm Core
    const coreGeo = new THREE.SphereGeometry(2.2, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xfda4af,
      transparent: true,
      opacity: 0.75,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);

    // Halo Ring
    const ringGeo = new THREE.RingGeometry(3.5, 4.3, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xfbbf24,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5,
    });
    const haloRing = new THREE.Mesh(ringGeo, ringMat);
    scene.add(haloRing);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 14;
      targetY = y * 9;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        targetX = (((touch.clientX - rect.left) / rect.width) * 2 - 1) * 14;
        targetY = -(((touch.clientY - rect.top) / rect.height) * 2 - 1) * 9;
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('touchmove', handleTouchMove, { passive: true });

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight || 450;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;
      camera.position.x = mouseX;
      camera.position.y = mouseY;
      camera.lookAt(0, 0, 0);

      starField.rotation.y = elapsedTime * 0.02;
      starField.rotation.x = Math.sin(elapsedTime * 0.01) * 0.05;

      const heartPulse = 1 + Math.sin(elapsedTime * 2.2) * 0.05;
      heartLine.scale.set(heartPulse, heartPulse, heartPulse);
      constellationGroup.scale.set(heartPulse, heartPulse, heartPulse);

      haloRing.rotation.z = elapsedTime * 0.3;
      haloRing.rotation.x = Math.PI / 3 + Math.sin(elapsedTime * 0.5) * 0.1;

      const corePulse = 1 + Math.sin(elapsedTime * 3) * 0.1;
      coreMesh.scale.set(corePulse, corePulse, corePulse);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('touchmove', handleTouchMove);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      starGeometry.dispose();
      starMaterial.dispose();
      heartLineGeometry.dispose();
      heartLineMaterial.dispose();
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
    };
  }, [activePreset]);

  return (
    <div className="relative w-full h-[460px] md:h-[520px] rounded-2xl overflow-hidden border border-rose-100 bg-gradient-to-b from-[#FFFDFD] via-[#FFF9FA] to-[#FFF5F6] shadow-pearl">
      <div ref={mountRef} className="absolute inset-0 cursor-grab active:cursor-grabbing" />

      {/* Top Floating Controls */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-rose-100 text-xs shadow-sm">
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
          <span className="text-slate-800 font-semibold">3D Pearl Constellation · Mamm & Yash</span>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-white/90 backdrop-blur-md rounded-xl border border-rose-100 text-xs shadow-sm">
          <button
            type="button"
            onClick={() => setActivePreset('constellation')}
            className={`px-3 py-1 rounded-lg transition-colors cursor-pointer font-medium ${
              activePreset === 'constellation'
                ? 'bg-rose-50 text-rose-700 font-semibold border border-rose-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Heart Stars
          </button>
          <button
            type="button"
            onClick={() => setActivePreset('galaxy')}
            className={`px-3 py-1 rounded-lg transition-colors cursor-pointer font-medium ${
              activePreset === 'galaxy'
                ? 'bg-rose-50 text-rose-700 font-semibold border border-rose-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Stardust Stream
          </button>
        </div>
      </div>

      {/* Sibling Caption at Bottom */}
      <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pointer-events-none">
        <div className="max-w-md bg-white/90 backdrop-blur-md p-4 rounded-xl border border-rose-100 shadow-md pointer-events-auto">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-rose-600 block mb-1">
            Interactive 3D Simulation
          </span>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans-main">
            Move your cursor or touch to rotate the celestial constellation. Har ek taara Yashika Mamm ke liye ek dua hai. ✨
          </p>
        </div>

        <div className="text-right text-xs text-slate-500 hidden sm:block bg-white/80 backdrop-blur-sm px-3.5 py-1.5 rounded-lg border border-rose-100 shadow-xs">
          <span>Move mouse to explore</span>
          <span aria-hidden="true" className="mx-2">·</span>
          <span className="text-rose-600 font-semibold">Yashika & Yash</span>
        </div>
      </div>
    </div>
  );
};
