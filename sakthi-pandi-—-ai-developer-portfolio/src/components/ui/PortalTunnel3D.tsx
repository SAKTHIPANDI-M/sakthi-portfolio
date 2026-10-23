import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface PortalTunnel3DProps {
  scrollProgress: number; // 0 to 1
  stage: 'counter' | 'ready' | 'entering' | 'complete';
}

/**
 * Creates high-fidelity circular glow particle texture in memory
 */
function createParticleTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.2, 'rgba(255, 70, 50, 0.95)');
  gradient.addColorStop(0.5, 'rgba(225, 6, 0, 0.55)');
  gradient.addColorStop(0.8, 'rgba(139, 0, 0, 0.2)');
  gradient.addColorStop(1, 'rgba(139, 0, 0, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Creates soft streak glow texture for warp particles
 */
function createStreakTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;

  const gradient = ctx.createLinearGradient(16, 0, 16, 128);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
  gradient.addColorStop(0.3, 'rgba(255, 50, 40, 0.7)');
  gradient.addColorStop(0.5, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.7, 'rgba(225, 6, 0, 0.7)');
  gradient.addColorStop(1, 'rgba(139, 0, 0, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 32, 128);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export const PortalTunnel3D: React.FC<PortalTunnel3DProps> = ({
  scrollProgress,
  stage: _stage,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<number>(scrollProgress);
  const prevProgressRef = useRef<number>(scrollProgress);
  const velocityRef = useRef<number>(0);

  // Sync scroll progress and compute scroll velocity
  useEffect(() => {
    const delta = scrollProgress - prevProgressRef.current;
    velocityRef.current = Math.min(1.5, Math.abs(delta) * 12);
    prevProgressRef.current = scrollProgress;
    progressRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.0016);

    const baseFov = 64;
    const camera = new THREE.PerspectiveCamera(baseFov, width / height, 0.1, 2400);

    // 2. WebGL Renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x050505, 1);
      container.appendChild(renderer.domElement);
    } catch {
      return;
    }

    // 3. 3D Curved Spine for the Tunnel (Catmull-Rom Curve)
    // Curving through deep space with smooth bends matching reference screenshots
    const curvePoints = [
      new THREE.Vector3(0, 0, 160),
      new THREE.Vector3(22, -14, -80),
      new THREE.Vector3(-36, 26, -340),
      new THREE.Vector3(42, 18, -640),
      new THREE.Vector3(-28, -24, -980),
      new THREE.Vector3(16, 12, -1320),
      new THREE.Vector3(0, 0, -1680),
    ];
    const tunnelCurve = new THREE.CatmullRomCurve3(curvePoints, false, 'catmullrom', 0.5);

    // 4. Longitudinal Warp Streamlines (16 helical guide lines along tunnel wall)
    // As seen in reference screenshots 232328.png & 234100.png
    const streamlineCount = 14;
    const streamlineSegments = 100;
    const streamlineGroup = new THREE.Group();

    const streamlineMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color(0xe10600),
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      linewidth: 1.2,
    });

    const highlightStreamlineMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color(0xff4444),
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      linewidth: 1.8,
    });

    for (let s = 0; s < streamlineCount; s++) {
      const baseAngle = (s / streamlineCount) * Math.PI * 2;
      const streamPoints: THREE.Vector3[] = [];
      const isHighlight = s % 3 === 0;

      for (let seg = 0; seg <= streamlineSegments; seg++) {
        const t = seg / streamlineSegments;
        const center = tunnelCurve.getPointAt(t);
        const tangent = tunnelCurve.getTangentAt(t);

        let normal = new THREE.Vector3(-tangent.y, tangent.x, 0).normalize();
        if (normal.lengthSq() < 0.001) normal.set(1, 0, 0);
        const binormal = new THREE.Vector3().crossVectors(tangent, normal).normalize();

        // Subtle helical twist along length
        const angle = baseAngle + t * Math.PI * 1.5;
        const radius = 28 + Math.sin(t * Math.PI * 3) * 3;

        const pt = new THREE.Vector3(
          center.x + normal.x * (radius * Math.cos(angle)) + binormal.x * (radius * Math.sin(angle)),
          center.y + normal.y * (radius * Math.cos(angle)) + binormal.y * (radius * Math.sin(angle)),
          center.z + normal.z * (radius * Math.cos(angle)) + binormal.z * (radius * Math.sin(angle))
        );
        streamPoints.push(pt);
      }

      const streamGeom = new THREE.BufferGeometry().setFromPoints(streamPoints);
      const line = new THREE.Line(streamGeom, isHighlight ? highlightStreamlineMaterial : streamlineMaterial);
      streamlineGroup.add(line);
    }
    scene.add(streamlineGroup);

    // 5. Architectural Circular Conduit Rings with Node Points (20 rings along curve)
    // As seen in reference screenshots 234100.png & 234124.png
    const ringCount = 20;
    const ringGroup = new THREE.Group();
    const ringSegments = 48;

    interface ConduitRing {
      t: number;
      line: THREE.LineLoop;
      nodes: THREE.Points;
      baseColor: THREE.Color;
    }

    const conduitRings: ConduitRing[] = [];
    const ringNodeTexture = createParticleTexture();

    for (let r = 0; r < ringCount; r++) {
      const ringT = (r + 0.6) / ringCount;
      const ringRadius = 28 + (r % 2 === 0 ? 3 : 0);

      const circlePoints: THREE.Vector3[] = [];
      for (let seg = 0; seg < ringSegments; seg++) {
        const theta = (seg / ringSegments) * Math.PI * 2;
        circlePoints.push(
          new THREE.Vector3(
            Math.cos(theta) * ringRadius,
            Math.sin(theta) * ringRadius,
            0
          )
        );
      }

      const ringGeom = new THREE.BufferGeometry().setFromPoints(circlePoints);
      const isKeyRing = r % 3 === 0;
      const ringColor = isKeyRing ? new THREE.Color(0xe10600) : new THREE.Color(0x8b0000);

      const ringMat = new THREE.LineBasicMaterial({
        color: ringColor,
        transparent: true,
        opacity: isKeyRing ? 0.65 : 0.28,
        blending: THREE.AdditiveBlending,
      });

      const lineLoop = new THREE.LineLoop(ringGeom, ringMat);

      // Add nodes around ring perimeter (quantum sensors / markers)
      const nodeCount = 12;
      const nodePositions = new Float32Array(nodeCount * 3);
      for (let n = 0; n < nodeCount; n++) {
        const theta = (n / nodeCount) * Math.PI * 2;
        nodePositions[n * 3] = Math.cos(theta) * ringRadius;
        nodePositions[n * 3 + 1] = Math.sin(theta) * ringRadius;
        nodePositions[n * 3 + 2] = 0;
      }

      const nodeGeom = new THREE.BufferGeometry();
      nodeGeom.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
      const nodeMat = new THREE.PointsMaterial({
        size: isKeyRing ? 3.5 : 2.2,
        map: ringNodeTexture,
        color: isKeyRing ? 0xff4444 : 0xe10600,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.8,
        depthWrite: false,
      });
      const ringNodes = new THREE.Points(nodeGeom, nodeMat);

      // Position along curve
      const ringCenter = tunnelCurve.getPointAt(ringT);
      const ringTangent = tunnelCurve.getTangentAt(ringT);

      const ringSubgroup = new THREE.Group();
      ringSubgroup.position.copy(ringCenter);
      ringSubgroup.lookAt(ringCenter.clone().add(ringTangent));
      ringSubgroup.add(lineLoop);
      ringSubgroup.add(ringNodes);

      ringGroup.add(ringSubgroup);

      conduitRings.push({
        t: ringT,
        line: lineLoop,
        nodes: ringNodes,
        baseColor: ringColor,
      });
    }
    scene.add(ringGroup);

    // 6. 3D Radial Energy Beams from Portal Singularity (Screenshot 225207.png)
    const rayCount = 36;
    const rayGroup = new THREE.Group();
    const rayLength = 320;

    for (let i = 0; i < rayCount; i++) {
      const angle = (i / rayCount) * Math.PI * 2;
      const isMajorRay = i % 4 === 0;

      const p1 = new THREE.Vector3(
        Math.cos(angle) * 8,
        Math.sin(angle) * 8,
        0
      );
      const p2 = new THREE.Vector3(
        Math.cos(angle) * (rayLength * (0.6 + (i % 5) * 0.1)),
        Math.sin(angle) * (rayLength * (0.6 + (i % 5) * 0.1)),
        -180
      );

      const rayGeom = new THREE.BufferGeometry().setFromPoints([p1, p2]);
      const rayMat = new THREE.LineBasicMaterial({
        color: isMajorRay ? 0xff3333 : 0xe10600,
        transparent: true,
        opacity: isMajorRay ? 0.55 : 0.22,
        blending: THREE.AdditiveBlending,
      });

      const rayLine = new THREE.Line(rayGeom, rayMat);
      rayGroup.add(rayLine);
    }

    // Place ray group at front portal entrance
    const entrancePt = tunnelCurve.getPointAt(0.02);
    const entranceTangent = tunnelCurve.getTangentAt(0.02);
    rayGroup.position.copy(entrancePt);
    rayGroup.lookAt(entrancePt.clone().add(entranceTangent));
    scene.add(rayGroup);

    // 7. Multi-Layer 3D Swirling Particle Constellation
    const particleCount = window.innerWidth < 768 ? 3200 : 6400;
    const particleTexture = createParticleTexture();

    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const particleMetas: Array<{
      t: number;
      radius: number;
      angle: number;
      angularSpeed: number;
      layer: 'innerSparks' | 'tunnelWall' | 'outerDust';
    }> = [];

    const colorPalette = [
      new THREE.Color(0xe10600), // Pure red
      new THREE.Color(0xff1e1e), // High-energy crimson
      new THREE.Color(0x8b0000), // Deep crimson
      new THREE.Color(0xff6050), // Hot coral
      new THREE.Color(0xffffff), // White photon star
    ];

    for (let i = 0; i < particleCount; i++) {
      const t = Math.random();
      const rand = Math.random();

      let radius: number;
      let layer: 'innerSparks' | 'tunnelWall' | 'outerDust';
      let sizeVal: number;
      let chosenColor: THREE.Color;

      if (rand < 0.15) {
        // Layer 1: Foreground inner sparks rushing past camera lens
        layer = 'innerSparks';
        radius = 2.5 + Math.random() * 16;
        sizeVal = 2.8 + Math.random() * 3.8;
        chosenColor = Math.random() < 0.5 ? colorPalette[4] : colorPalette[1];
      } else if (rand < 0.82) {
        // Layer 2: Main swirling tunnel wall cylinder
        layer = 'tunnelWall';
        radius = 22 + Math.random() * 26;
        sizeVal = 1.8 + Math.random() * 2.8;
        const colIdx = Math.floor(Math.random() * colorPalette.length);
        chosenColor = colorPalette[colIdx];
      } else {
        // Layer 3: Distant ambient cosmos
        layer = 'outerDust';
        radius = 55 + Math.random() * 70;
        sizeVal = 1.2 + Math.random() * 2.0;
        chosenColor = colorPalette[2]; // Deep dark crimson
      }

      const angle = Math.random() * Math.PI * 2;
      const angularSpeed = (Math.random() - 0.5) * 0.02;

      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;
      sizes[i] = sizeVal;

      particleMetas.push({
        t,
        radius,
        angle,
        angularSpeed,
        layer,
      });

      // Initial coordinates
      const center = tunnelCurve.getPointAt(t);
      const tangent = tunnelCurve.getTangentAt(t);
      let normal = new THREE.Vector3(-tangent.y, tangent.x, 0).normalize();
      if (normal.lengthSq() < 0.001) normal.set(1, 0, 0);
      const binormal = new THREE.Vector3().crossVectors(tangent, normal).normalize();

      positions[i * 3] = center.x + normal.x * (radius * Math.cos(angle)) + binormal.x * (radius * Math.sin(angle));
      positions[i * 3 + 1] = center.y + normal.y * (radius * Math.cos(angle)) + binormal.y * (radius * Math.sin(angle));
      positions[i * 3 + 2] = center.z + normal.z * (radius * Math.cos(angle)) + binormal.z * (radius * Math.sin(angle));
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const particleMaterial = new THREE.PointsMaterial({
      size: 3.2,
      map: particleTexture,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
      opacity: 0.95,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // 8. Distant Singularity Core (Event Horizon at t = 1.0)
    const endPos = tunnelCurve.getPointAt(1.0);
    const endTangent = tunnelCurve.getTangentAt(1.0);

    const singularityGroup = new THREE.Group();
    singularityGroup.position.copy(endPos);
    singularityGroup.lookAt(endPos.clone().add(endTangent));

    // Dark black hole sphere core
    const coreGeom = new THREE.SphereGeometry(22, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const coreMesh = new THREE.Mesh(coreGeom, coreMat);
    singularityGroup.add(coreMesh);

    // Bright crimson accretion disk rings
    const diskGeom1 = new THREE.RingGeometry(22.5, 42, 64);
    const diskMat1 = new THREE.MeshBasicMaterial({
      color: 0xe10600,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    const diskMesh1 = new THREE.Mesh(diskGeom1, diskMat1);
    singularityGroup.add(diskMesh1);

    const diskGeom2 = new THREE.RingGeometry(44, 75, 64);
    const diskMat2 = new THREE.MeshBasicMaterial({
      color: 0x8b0000,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const diskMesh2 = new THREE.Mesh(diskGeom2, diskMat2);
    singularityGroup.add(diskMesh2);

    scene.add(singularityGroup);

    // 9. Render & Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const renderLoop = () => {
      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.getElapsedTime();

      const p = progressRef.current;
      velocityRef.current *= 0.91; // decay velocity

      // Camera position along curve: from t = 0 to t = 0.97
      const camT = Math.min(0.97, Math.max(0, p * 0.94));
      const lookAheadT = Math.min(1.0, camT + 0.07);

      const camPos = tunnelCurve.getPointAt(camT);
      const lookTarget = tunnelCurve.getPointAt(lookAheadT);

      // Subtle organic breathing drift when idle
      const idleFloatX = Math.sin(elapsed * 0.75) * 1.4 * (1 - p);
      const idleFloatY = Math.cos(elapsed * 0.6) * 1.1 * (1 - p);

      camera.position.set(
        camPos.x + idleFloatX,
        camPos.y + idleFloatY,
        camPos.z
      );
      camera.lookAt(lookTarget);

      // Organic camera banking / roll angle as it twists along the 3D curves
      const curveTangent = tunnelCurve.getTangentAt(camT);
      const bankingAngle = curveTangent.x * 0.45 + Math.sin(camT * Math.PI * 3.5) * 0.28;
      camera.rotation.z += bankingAngle;

      // Dynamic FOV stretching based on scroll velocity (hyperspace sensation)
      camera.fov = baseFov + velocityRef.current * 8 + p * 4;
      camera.updateProjectionMatrix();

      // Rotate accretion disks & radial rays
      diskMesh1.rotation.z += 0.04;
      diskMesh2.rotation.z -= 0.025;
      rayGroup.rotation.z = elapsed * 0.05 + p * 0.5;

      // Animate Particles: swirling around curve axis and forward translation
      const posAttr = particleGeometry.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      const swirlSpeed = 1.0 + p * 3.8 + velocityRef.current * 3.0;

      for (let i = 0; i < particleCount; i++) {
        const meta = particleMetas[i];

        // Angular rotation around tunnel spine
        meta.angle += meta.angularSpeed * swirlSpeed;

        // Forward particle movement makes space feel alive
        const speedZ = (meta.layer === 'innerSparks' ? 0.04 : 0.018) * (1 + p * 3.5);
        meta.t -= speedZ * delta;
        if (meta.t < 0) {
          meta.t += 1.0;
        }

        // Recalculate 3D position along curve
        const center = tunnelCurve.getPointAt(meta.t);
        const tangent = tunnelCurve.getTangentAt(meta.t);
        let normal = new THREE.Vector3(-tangent.y, tangent.x, 0).normalize();
        if (normal.lengthSq() < 0.001) normal.set(1, 0, 0);
        const binormal = new THREE.Vector3().crossVectors(tangent, normal).normalize();

        const cosA = Math.cos(meta.angle);
        const sinA = Math.sin(meta.angle);

        posArray[i * 3] = center.x + normal.x * (meta.radius * cosA) + binormal.x * (meta.radius * sinA);
        posArray[i * 3 + 1] = center.y + normal.y * (meta.radius * cosA) + binormal.y * (meta.radius * sinA);
        posArray[i * 3 + 2] = center.z + normal.z * (meta.radius * cosA) + binormal.z * (meta.radius * sinA);
      }
      posAttr.needsUpdate = true;

      // Particle size stretches with scroll velocity
      particleMaterial.size = 3.0 + p * 2.8 + velocityRef.current * 1.5;

      // Pulse conduit rings and streamlines
      conduitRings.forEach((ring, idx) => {
        const distFromCam = Math.abs(ring.t - camT);
        const lineMat = ring.line.material as THREE.LineBasicMaterial;
        const nodeMat = ring.nodes.material as THREE.PointsMaterial;

        const proximity = Math.max(0, 1 - distFromCam * 3.8);
        const pulse = Math.sin(elapsed * 2.5 + idx * 0.8) * 0.12;

        lineMat.opacity = Math.min(0.95, 0.25 + proximity * 0.7 + pulse);
        nodeMat.opacity = Math.min(1.0, 0.4 + proximity * 0.6);
      });

      // Streamline brightness reacts to velocity
      streamlineMaterial.opacity = 0.35 + p * 0.3 + velocityRef.current * 0.25;
      highlightStreamlineMaterial.opacity = 0.6 + p * 0.3 + velocityRef.current * 0.35;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    // 10. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      particleGeometry.dispose();
      particleMaterial.dispose();
      particleTexture.dispose();
      ringNodeTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-hidden"
    />
  );
};
