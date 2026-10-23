import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Volume2, VolumeX, FastForward, ArrowDown } from 'lucide-react';
import { audioFeedback } from '../../utils/audioFeedback';

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// TUNABLE CONSTANTS (DEEP SPACE RED THEME & CHOREOGRAPHY)
// ============================================================================
const CONFIG = {
  // Color Palette
  bgColor: '#050203',
  nebulaColors: ['#2a0508', '#3a0a0f', '#1a0306'],
  primaryAccent: '#ff2a2a',
  accentDark: '#c4161c',
  accentGlow: 'rgba(255, 42, 42, 0.6)',
  lineColor: '#ff3c3c',
  lineOpacity: 0.32,
  headingColor: '#fff4f4',
  highlightRose: '#ffd0d0',
  bodyTextColor: '#c9a9a9',
  monoLabelColor: '#8a6a6a',

  // Star Volume (6,000 to 10,000 in a 400-unit 3D space surrounding the camera)
  starVolumeSize: 420,
  starCountTiny: 6800,   // Tiny sharp stars (most)
  starCountMedium: 1800, // Medium soft dots
  starCountBokeh: 120,   // Large out-of-focus bokeh glows

  // Central Core (Dense dust sphere: ~15,000 particles in spherical shell)
  coreParticleCount: 15000,
  coreRadius: 18,
  coreShellThickness: 2.5,
  coreRingRadius: 28,
  coreOrbiterRadius: 28,

  // Neural Lines (30 to 40 radiating wiggly branching lines)
  neuralLineCount: 36,
  neuralSegments: 8,

  // Hero Edge-Lit Ring
  heroRingRadius: 75,
  heroRingZ: -10,

  // Camera Settings
  baseFov: 56,
  velocityFovBoost: 5,
};

// 6 Defined Sections with Content
export interface SectionBeat {
  id: string;
  index: number;
  label: string;
  headingLines: string[];
  highlightWord: string;
  bodyText: string;
  footnote: string;
  start: number;
  end: number;
  // Desired Core Screen Alignment for varied cinematic composition:
  // Camera offsets allow placing the core center-right, lower-left, upper-right, etc.
  coreScreenShift: { x: number; y: number; z: number };
}

export const SECTIONS: SectionBeat[] = [
  {
    id: 'hero',
    index: 0,
    label: '',
    headingLines: [],
    highlightWord: '',
    bodyText: '',
    footnote: '',
    start: 0.0,
    end: 0.12,
    coreScreenShift: { x: 0, y: 0, z: -140 }, // Far center, facing core
  },
  {
    id: 'today',
    index: 1,
    label: '01 · TODAY',
    headingLines: ["Hi, I'm Sakthi,"],
    highlightWord: 'AI Developer',
    bodyText:
      'Computer Science with Artificial Intelligence student based in Chennai, India. Specializing in machine learning models, autonomous reasoning pipelines, and modern web architectures.',
    footnote: 'LOCATION: CHENNAI, INDIA // B.SC CS & ARTIFICIAL INTELLIGENCE',
    start: 0.15,
    end: 0.32,
    coreScreenShift: { x: 18, y: -2, z: -110 }, // Core shifts Center-Right (avoids left text)
  },
  {
    id: 'autonomous-systems',
    index: 2,
    label: '02 · AUTONOMOUS SYSTEMS',
    headingLines: ['Intelligent'],
    highlightWord: 'Agents',
    bodyText:
      'Designing reasoning loops, Retrieval-Augmented Generation (RAG), and self-orchestrating multi-agent ecosystems tailored for real-world impact.',
    footnote: 'TERM: RAG, RETRIEVAL-AUGMENTED GENERATION // AGENTIC ARCHITECTURES',
    start: 0.35,
    end: 0.50,
    coreScreenShift: { x: -22, y: -14, z: -80 }, // Core shifts Lower-Left
  },
  {
    id: 'skills',
    index: 3,
    label: '03 · SKILLS & TOOLKIT',
    headingLines: ['Algorithms &'],
    highlightWord: 'Modern Stack',
    bodyText:
      'Engineered around Python, JavaScript, Prolog, Power BI, Scikit-learn, Vercel, Supabase, and intelligent data systems, backed by modern web technologies.',
    footnote: 'STACK: PYTHON, JAVASCRIPT, PROLOG, POWER BI, VERCEL, SUPABASE, STREAMLIT',
    start: 0.53,
    end: 0.68,
    coreScreenShift: { x: 24, y: 16, z: -55 }, // Core shifts Upper-Right
  },
  {
    id: 'projects',
    index: 4,
    label: '04 · SELECTED PROJECTS',
    headingLines: ['Intelligent Clinical'],
    highlightWord: 'Diagnostic Systems',
    bodyText:
      'Built end-to-end cardiovascular risk prediction models with real-time risk stratification and automated feature importance diagnostics deployed on the cloud.',
    footnote: 'CASE STUDY: HEART DISEASE PREDICTION ENGINE // 8.3 CGPA MERIT',
    start: 0.71,
    end: 0.85,
    coreScreenShift: { x: 14, y: -18, z: -30 }, // Fly-by close to core
  },
  {
    id: 'contact',
    index: 5,
    label: '05 · COLLABORATE',
    headingLines: ['Ready to Build &'],
    highlightWord: 'Collaborate',
    bodyText:
      'Available for artificial intelligence and machine learning internships, research collaborations, and production software initiatives.',
    footnote: 'CONTACT: SAKTHIPANDI.OFFICIAL@GMAIL.COM // AVAILABLE 2026',
    start: 0.88,
    end: 0.98,
    coreScreenShift: { x: 0, y: 0, z: -4 }, // Final dive directly into core center
  },
];

interface SinglePageTunnelPortfolioProps {
  onEnterPortfolio: () => void;
  soundEnabled?: boolean;
  onToggleSound?: () => void;
}

export const SinglePageTunnelPortfolio: React.FC<SinglePageTunnelPortfolioProps> = ({
  onEnterPortfolio,
  soundEnabled = false,
  onToggleSound,
}) => {
  // Navigation & Progress State
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeSectionIndex, setActiveSectionIndex] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [webGLSupported, setWebGLSupported] = useState<boolean>(true);

  // References
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollTrackRef = useRef<HTMLDivElement | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const hasTriggeredExitRef = useRef<boolean>(false);

  // Three.js Scene References
  const threeRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    coreGroup: THREE.Group;
    dustSpherePoints: THREE.Points;
    dustSphereRing: THREE.LineLoop;
    orbiterMesh: THREE.Mesh;
    edgeRingGroup: THREE.Group;
    edgeRingLine: THREE.LineLoop;
    edgeRingGlow: THREE.LineLoop;
    nebulaPlanes: THREE.Mesh[];
    neuralLinesGroup: THREE.Group;
    starsTiny: THREE.Points;
    starsMedium: THREE.Points;
    starsBokeh: THREE.Points;
    mouseTarget: { x: number; y: number };
    mouseCurrent: { x: number; y: number };
    scrollVelocity: number;
    scrollProgress: number;
  } | null>(null);

  // Exit trigger to reveal hero
  const triggerExitToHero = useCallback(() => {
    if (hasTriggeredExitRef.current) return;
    hasTriggeredExitRef.current = true;
    setIsCompleted(true);
    audioFeedback.playTransitionWhoosh();

    setTimeout(() => {
      onEnterPortfolio();
    }, 750);
  }, [onEnterPortfolio]);

  // Jump to specific section
  const jumpToSection = useCallback((sectionIdx: number) => {
    const targetSection = SECTIONS[sectionIdx];
    if (!targetSection || !lenisRef.current || !scrollTrackRef.current) return;

    const totalHeight = scrollTrackRef.current.scrollHeight - window.innerHeight;
    const targetY = (targetSection.start + 0.04) * totalHeight;
    lenisRef.current.scrollTo(targetY, { duration: 1.4 });
    audioFeedback.playClick();
  }, []);

  const handleNextClick = useCallback(() => {
    const nextIdx = Math.min(SECTIONS.length - 1, activeSectionIndex + 1);
    if (nextIdx === activeSectionIndex && nextIdx === SECTIONS.length - 1) {
      triggerExitToHero();
    } else {
      jumpToSection(nextIdx);
    }
  }, [activeSectionIndex, jumpToSection, triggerExitToHero]);

  // ESC shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        triggerExitToHero();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerExitToHero]);

  // ==========================================================================
  // THREE.JS DEEP SPACE SCENE INITIALIZATION
  // ==========================================================================
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Reduced motion preference
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Scene setup with soft depth fog
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050203, 0.0018);

    const camera = new THREE.PerspectiveCamera(CONFIG.baseFov, width / height, 0.1, 1600);
    camera.position.set(0, 0, 70);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x050203, 1);
      renderer.domElement.className = 'fixed inset-0 w-full h-full pointer-events-none z-0';
      container.insertBefore(renderer.domElement, container.firstChild);
    } catch {
      setWebGLSupported(false);
      return;
    }

    // Helper: Soft sprite texture generator
    const makeSpriteTex = (type: 'sharp' | 'soft' | 'bokeh') => {
      const c = document.createElement('canvas');
      const size = type === 'bokeh' ? 128 : 64;
      c.width = size;
      c.height = size;
      const ctx = c.getContext('2d')!;
      const half = size / 2;
      const grad = ctx.createRadialGradient(half, half, 0, half, half, half);

      if (type === 'sharp') {
        grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
        grad.addColorStop(0.25, 'rgba(255, 60, 60, 0.9)');
        grad.addColorStop(0.6, 'rgba(196, 22, 28, 0.25)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      } else if (type === 'soft') {
        grad.addColorStop(0, 'rgba(255, 240, 240, 0.95)');
        grad.addColorStop(0.3, 'rgba(255, 42, 42, 0.7)');
        grad.addColorStop(0.7, 'rgba(80, 10, 15, 0.18)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      } else {
        // Bokeh
        grad.addColorStop(0, 'rgba(255, 210, 210, 0.7)');
        grad.addColorStop(0.4, 'rgba(255, 42, 42, 0.35)');
        grad.addColorStop(0.8, 'rgba(58, 10, 15, 0.12)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      }

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);
      return new THREE.CanvasTexture(c);
    };

    const sharpStarTex = makeSpriteTex('sharp');
    const softStarTex = makeSpriteTex('soft');
    const bokehStarTex = makeSpriteTex('bokeh');

    // ------------------------------------------------------------------------
    // 1. STAR VOLUME: 6,000 to 10,000 particles distributed in large 3D volume
    // Surrounding the camera in ALL directions (360° volume), with 3 size classes
    // ------------------------------------------------------------------------
    const palette = [
      new THREE.Color(0xff2a2a), // Pure red
      new THREE.Color(0xc4161c), // Deep crimson
      new THREE.Color(0xff6633), // Warm orange
      new THREE.Color(0xffd0d0), // Pinkish-white
      new THREE.Color(0xffffff), // Bright white
    ];

    const generateStarField = (count: number, size: number, tex: THREE.Texture, opacity: number) => {
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const span = CONFIG.starVolumeSize;

      for (let i = 0; i < count; i++) {
        // Spherical/Box volume around camera
        positions[i * 3] = (Math.random() - 0.5) * span;
        positions[i * 3 + 1] = (Math.random() - 0.5) * span;
        positions[i * 3 + 2] = (Math.random() - 0.5) * span - 50;

        const col = palette[Math.floor(Math.random() * palette.length)];
        colors[i * 3] = col.r;
        colors[i * 3 + 1] = col.g;
        colors[i * 3 + 2] = col.b;
      }

      const geom = new THREE.BufferGeometry();
      geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geom.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const mat = new THREE.PointsMaterial({
        size,
        map: tex,
        vertexColors: true,
        transparent: true,
        opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true, // Near stars are larger and drift past camera for real parallax
      });

      return new THREE.Points(geom, mat);
    };

    const starsTiny = generateStarField(CONFIG.starCountTiny, 1.4, sharpStarTex, 0.9);
    const starsMedium = generateStarField(CONFIG.starCountMedium, 3.2, softStarTex, 0.75);
    const starsBokeh = generateStarField(CONFIG.starCountBokeh, 18.0, bokehStarTex, 0.45);

    scene.add(starsTiny);
    scene.add(starsMedium);
    scene.add(starsBokeh);

    // ------------------------------------------------------------------------
    // 2. CENTRAL CORE: Dense dust sphere (~15,000 tiny particles in spherical shell)
    // Reads as a distant planet with a faint thin ring and 1 orbiting glowing node
    // ------------------------------------------------------------------------
    const coreGroup = new THREE.Group();
    coreGroup.position.set(0, 0, -140); // Initial position

    const corePositions = new Float32Array(CONFIG.coreParticleCount * 3);
    const coreColors = new Float32Array(CONFIG.coreParticleCount * 3);

    for (let i = 0; i < CONFIG.coreParticleCount; i++) {
      // Uniform spherical surface distribution with subtle noise/thickness
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r =
        CONFIG.coreRadius + (Math.random() - 0.5) * CONFIG.coreShellThickness;

      const sinPhi = Math.sin(phi);
      corePositions[i * 3] = r * sinPhi * Math.cos(theta);
      corePositions[i * 3 + 1] = r * sinPhi * Math.sin(theta);
      corePositions[i * 3 + 2] = r * Math.cos(phi);

      // Core coloration: mostly red with warm sparkles
      const isSparkle = Math.random() < 0.12;
      const c = isSparkle ? new THREE.Color(0xffffff) : new THREE.Color(0xff2a2a);
      coreColors[i * 3] = c.r;
      coreColors[i * 3 + 1] = c.g;
      coreColors[i * 3 + 2] = c.b;
    }

    const coreGeom = new THREE.BufferGeometry();
    coreGeom.setAttribute('position', new THREE.BufferAttribute(corePositions, 3));
    coreGeom.setAttribute('color', new THREE.BufferAttribute(coreColors, 3));

    const coreMat = new THREE.PointsMaterial({
      size: 1.2,
      map: sharpStarTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const dustSpherePoints = new THREE.Points(coreGeom, coreMat);
    coreGroup.add(dustSpherePoints);

    // Faint thin ring around core
    const ringPts: THREE.Vector3[] = [];
    for (let i = 0; i <= 64; i++) {
      const theta = (i / 64) * Math.PI * 2;
      ringPts.push(
        new THREE.Vector3(
          Math.cos(theta) * CONFIG.coreRingRadius,
          Math.sin(theta) * (CONFIG.coreRingRadius * 0.38),
          0
        )
      );
    }
    const ringGeom = new THREE.BufferGeometry().setFromPoints(ringPts);
    const ringMat = new THREE.LineBasicMaterial({
      color: 0xff3c3c,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const dustSphereRing = new THREE.LineLoop(ringGeom, ringMat);
    coreGroup.add(dustSphereRing);

    // Orbiting glowing ring node
    const orbiterGeom = new THREE.SphereGeometry(1.3, 16, 16);
    const orbiterMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
    });
    const orbiterMesh = new THREE.Mesh(orbiterGeom, orbiterMat);
    coreGroup.add(orbiterMesh);

    scene.add(coreGroup);

    // ------------------------------------------------------------------------
    // 3. NEBULA DEPTH: 3-4 soft billboard planes drifting in deep crimson
    // (#2a0508, #3a0a0f, #1a0306)
    // ------------------------------------------------------------------------
    const makeNebulaTex = (c1: string, c2: string) => {
      const c = document.createElement('canvas');
      c.width = 256;
      c.height = 256;
      const ctx = c.getContext('2d')!;
      const grad = ctx.createRadialGradient(128, 128, 10, 128, 128, 128);
      grad.addColorStop(0, c1);
      grad.addColorStop(0.5, c2);
      grad.addColorStop(1, 'rgba(5, 2, 3, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 256, 256);
      return new THREE.CanvasTexture(c);
    };

    const nebulaPlanes: THREE.Mesh[] = [];
    const nebulaTex1 = makeNebulaTex('rgba(58, 10, 15, 0.45)', 'rgba(42, 5, 8, 0.25)');
    const nebulaTex2 = makeNebulaTex('rgba(42, 5, 8, 0.5)', 'rgba(26, 3, 6, 0.2)');

    const nebGeom = new THREE.PlaneGeometry(380, 380);
    const nebMat1 = new THREE.MeshBasicMaterial({
      map: nebulaTex1,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const nebMat2 = new THREE.MeshBasicMaterial({
      map: nebulaTex2,
      transparent: true,
      opacity: 0.38,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    const neb1 = new THREE.Mesh(nebGeom, nebMat1);
    neb1.position.set(-60, 40, -180);
    scene.add(neb1);
    nebulaPlanes.push(neb1);

    const neb2 = new THREE.Mesh(nebGeom, nebMat2);
    neb2.position.set(80, -30, -260);
    scene.add(neb2);
    nebulaPlanes.push(neb2);

    const neb3 = new THREE.Mesh(nebGeom, nebMat1);
    neb3.position.set(0, 0, -320);
    scene.add(neb3);
    nebulaPlanes.push(neb3);

    // ------------------------------------------------------------------------
    // 4. NEURAL LINES: 30 to 40 radiating lines from core outward through space
    // Wiggly branching polyline (6-10 segments, ±15° offsets, side branches)
    // ------------------------------------------------------------------------
    const neuralLinesGroup = new THREE.Group();
    const neuralLineMat = new THREE.LineBasicMaterial({
      color: 0xff3c3c,
      transparent: true,
      opacity: CONFIG.lineOpacity,
      blending: THREE.AdditiveBlending,
    });

    const nodeGlowGeom = new THREE.PlaneGeometry(4.5, 4.5);
    const nodeGlowMat = new THREE.MeshBasicMaterial({
      map: softStarTex,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    for (let l = 0; l < CONFIG.neuralLineCount; l++) {
      const baseAngle = (l / CONFIG.neuralLineCount) * Math.PI * 2;
      const pts: THREE.Vector3[] = [];
      let currentR = CONFIG.coreRadius + 2;
      let currentAngle = baseAngle;
      let currentZ = 0;

      pts.push(
        new THREE.Vector3(
          Math.cos(baseAngle) * currentR,
          Math.sin(baseAngle) * currentR,
          0
        )
      );

      for (let s = 1; s <= CONFIG.neuralSegments; s++) {
        currentR += 14 + Math.random() * 8;
        // Angular offset of ±15°
        currentAngle += (Math.random() - 0.5) * 0.26;
        currentZ += (Math.random() - 0.5) * 16;

        pts.push(
          new THREE.Vector3(
            Math.cos(currentAngle) * currentR,
            Math.sin(currentAngle) * currentR,
            currentZ
          )
        );

        // 20% chance of a side branch
        if (Math.random() < 0.2 && s < CONFIG.neuralSegments - 1) {
          const branchPts = [
            pts[pts.length - 1].clone(),
            pts[pts.length - 1].clone().add(
              new THREE.Vector3(
                (Math.random() - 0.5) * 16,
                (Math.random() - 0.5) * 16,
                (Math.random() - 0.5) * 12
              )
            ),
          ];
          const bGeom = new THREE.BufferGeometry().setFromPoints(branchPts);
          neuralLinesGroup.add(new THREE.Line(bGeom, neuralLineMat));
        }
      }

      const lGeom = new THREE.BufferGeometry().setFromPoints(pts);
      neuralLinesGroup.add(new THREE.Line(lGeom, neuralLineMat));

      // Put soft elliptical glow blob at tip of about half of them
      if (l % 2 === 0) {
        const lastPt = pts[pts.length - 1];
        const tipMesh = new THREE.Mesh(nodeGlowGeom, nodeGlowMat);
        tipMesh.position.copy(lastPt);
        neuralLinesGroup.add(tipMesh);
      }
    }
    coreGroup.add(neuralLinesGroup);

    // ------------------------------------------------------------------------
    // 5. HERO RING: At hero state only, large THICK soft edge-lit arc
    // Framing screen, brightest at upper left, scales outward & fades on scroll
    // ------------------------------------------------------------------------
    const edgeRingGroup = new THREE.Group();
    const edgeArcPts: THREE.Vector3[] = [];
    const edgeColors = new Float32Array(128 * 3);

    for (let i = 0; i < 128; i++) {
      const theta = (i / 128) * Math.PI * 2;
      edgeArcPts.push(
        new THREE.Vector3(
          Math.cos(theta) * CONFIG.heroRingRadius,
          Math.sin(theta) * CONFIG.heroRingRadius,
          CONFIG.heroRingZ
        )
      );

      // Brightest on upper-left quadrant
      const angleNorm = (theta + Math.PI) / (Math.PI * 2);
      const isUpperLeft = angleNorm > 0.4 && angleNorm < 0.75;
      const intensity = isUpperLeft ? 1.0 : 0.4;

      edgeColors[i * 3] = intensity;
      edgeColors[i * 3 + 1] = 0.16 * intensity;
      edgeColors[i * 3 + 2] = 0.16 * intensity;
    }

    const edgeRingGeom = new THREE.BufferGeometry().setFromPoints(edgeArcPts);
    edgeRingGeom.setAttribute('color', new THREE.BufferAttribute(edgeColors, 3));

    const edgeRingLineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const edgeRingLine = new THREE.LineLoop(edgeRingGeom, edgeRingLineMat);
    edgeRingGroup.add(edgeRingLine);

    // Soft outer glow rim
    const edgeRingGlowMat = new THREE.LineBasicMaterial({
      color: 0xff2a2a,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const edgeRingGlow = new THREE.LineLoop(edgeRingGeom, edgeRingGlowMat);
    edgeRingGlow.scale.set(1.025, 1.025, 1);
    edgeRingGroup.add(edgeRingGlow);

    scene.add(edgeRingGroup);

    // State cache
    threeRef.current = {
      scene,
      camera,
      renderer,
      coreGroup,
      dustSpherePoints,
      dustSphereRing,
      orbiterMesh,
      edgeRingGroup,
      edgeRingLine,
      edgeRingGlow,
      nebulaPlanes,
      neuralLinesGroup,
      starsTiny,
      starsMedium,
      starsBokeh,
      mouseTarget: { x: 0, y: 0 },
      mouseCurrent: { x: 0, y: 0 },
      scrollVelocity: 0,
      scrollProgress: 0,
    };

    // Mouse Parallax: Camera shifts about ±1.5 units opposite cursor
    const handleMouseMove = (e: MouseEvent) => {
      if (!threeRef.current) return;
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      threeRef.current.mouseTarget.x = -nx * 1.5;
      threeRef.current.mouseTarget.y = -ny * 1.5;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation & Render Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const state = threeRef.current;
      if (state) {
        const delta = Math.min(clock.getDelta(), 0.1);
        const elapsed = clock.getElapsedTime();

        if (!prefersReducedMotion) {
          // Smooth mouse parallax lerp
          state.mouseCurrent.x += (state.mouseTarget.x - state.mouseCurrent.x) * 0.05;
          state.mouseCurrent.y += (state.mouseTarget.y - state.mouseCurrent.y) * 0.05;

          const p = state.scrollProgress;

          // CAMERA CHOREOGRAPHY:
          // Smoothly interpolate along curved path around core
          // Each section shifts core in screen view (Center-Right, Lower-Left, Upper-Right, Fly-by, Dive)
          let targetShift = SECTIONS[0].coreScreenShift;
          for (let i = 0; i < SECTIONS.length - 1; i++) {
            const cur = SECTIONS[i];
            const next = SECTIONS[i + 1];
            if (p >= cur.start && p <= next.end) {
              const segT = Math.max(0, Math.min(1, (p - cur.start) / (next.start - cur.start)));
              targetShift = {
                x: THREE.MathUtils.lerp(cur.coreScreenShift.x, next.coreScreenShift.x, segT),
                y: THREE.MathUtils.lerp(cur.coreScreenShift.y, next.coreScreenShift.y, segT),
                z: THREE.MathUtils.lerp(cur.coreScreenShift.z, next.coreScreenShift.z, segT),
              };
              break;
            }
          }

          // Core positions along choreography path
          state.coreGroup.position.x += (targetShift.x - state.coreGroup.position.x) * 0.12;
          state.coreGroup.position.y += (targetShift.y - state.coreGroup.position.y) * 0.12;
          state.coreGroup.position.z += (targetShift.z - state.coreGroup.position.z) * 0.12;

          // Camera idle drift + mouse parallax
          const idleX = Math.sin(elapsed * 0.35) * 1.2;
          const idleY = Math.cos(elapsed * 0.28) * 0.9;
          state.camera.position.x = state.mouseCurrent.x + idleX;
          state.camera.position.y = state.mouseCurrent.y + idleY;

          // In final dive (p > 0.92), camera plunges forward towards core center
          if (p > 0.92) {
            const diveT = (p - 0.92) / 0.08;
            state.camera.position.z = THREE.MathUtils.lerp(70, targetShift.z + 5, diveT);
          } else {
            state.camera.position.z = 70;
          }

          // Camera always looks smoothly toward core
          state.camera.lookAt(state.coreGroup.position);

          // Scroll velocity widens FOV by about 5° and stretches star particles
          const vel = Math.abs(state.scrollVelocity);
          const targetFov = CONFIG.baseFov + Math.min(vel * 0.02, CONFIG.velocityFovBoost);
          state.camera.fov += (targetFov - state.camera.fov) * 0.1;
          state.camera.updateProjectionMatrix();

          // Star stretch / size under velocity
          (state.starsTiny.material as THREE.PointsMaterial).size = 1.4 + Math.min(vel * 0.005, 1.2);

          // 2. Core slow rotation
          state.dustSpherePoints.rotation.y = elapsed * 0.05;
          state.dustSphereRing.rotation.z = elapsed * 0.03;

          const orbAngle = elapsed * 0.5;
          state.orbiterMesh.position.set(
            Math.cos(orbAngle) * CONFIG.coreOrbiterRadius,
            Math.sin(orbAngle) * (CONFIG.coreOrbiterRadius * 0.38),
            0
          );

          // 3. Nebula planes slow drift at different speeds
          state.nebulaPlanes[0].rotation.z = elapsed * 0.015;
          state.nebulaPlanes[1].rotation.z = -elapsed * 0.01;
          state.nebulaPlanes[2].rotation.z = elapsed * 0.008;

          // 4. Hero Ring: Scales outward past screen and fades away on scroll
          const ringScale = 1 + p * 3.6;
          state.edgeRingGroup.scale.set(ringScale, ringScale, 1);
          const edgeAlpha = Math.max(0, 1 - p * 3.2);
          (edgeRingLineMat as THREE.LineBasicMaterial).opacity = edgeAlpha * 0.85;
          (edgeRingGlowMat as THREE.LineBasicMaterial).opacity = edgeAlpha * 0.35;

          // Ambient slow star volume drift
          state.starsTiny.rotation.y = elapsed * 0.006;
          state.starsMedium.rotation.y = -elapsed * 0.004;
          state.starsBokeh.rotation.x = elapsed * 0.003;

          // Decay velocity
          state.scrollVelocity *= 0.9;
        }

        state.renderer.render(state.scene, state.camera);
      }
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      sharpStarTex.dispose();
      softStarTex.dispose();
      bokehStarTex.dispose();
      nebulaTex1.dispose();
      nebulaTex2.dispose();
    };
  }, []);

  // ==========================================================================
  // LENIS SMOOTH SCROLL INTEGRATION
  // ==========================================================================
  useEffect(() => {
    const scrollContainer = scrollTrackRef.current;
    if (!scrollContainer) return;

    const lenis = new Lenis({
      wrapper: scrollContainer,
      content: scrollContainer.querySelector('.tunnel-scroll-content') as HTMLElement,
      lerp: 0.08,
      smoothWheel: true,
      syncTouch: true,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', (e: { scroll: number; limit: number; velocity: number }) => {
      ScrollTrigger.update();

      const progress = e.limit > 0 ? Math.min(1, Math.max(0, e.scroll / e.limit)) : 0;
      setScrollProgress(progress);

      if (threeRef.current) {
        threeRef.current.scrollProgress = progress;
        threeRef.current.scrollVelocity = e.velocity || 0;
      }

      // Determine active section
      let currentIdx = 0;
      SECTIONS.forEach((sec, idx) => {
        if (progress >= sec.start && progress <= sec.end) {
          currentIdx = idx;
        }
      });
      setActiveSectionIndex(currentIdx);

      // Dive into dust sphere at end (progress >= 0.96)
      if (progress >= 0.96 && !hasTriggeredExitRef.current) {
        triggerExitToHero();
      }
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [triggerExitToHero]);

  // Red-white flash as camera dives into core (Final section dive)
  const flashOpacity = scrollProgress > 0.92 ? Math.min(1, (scrollProgress - 0.92) * 12.5) : 0;

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[9999] bg-[#050203] text-white select-none overflow-hidden transition-all duration-700 ease-out ${
        isCompleted ? 'opacity-0 scale-[1.03] pointer-events-none' : 'opacity-100 scale-100 pointer-events-auto'
      }`}
    >
      {/* 1. DEEP SPACE NEBULA OVERLAY WITH EDGE VIGNETTE */}
      <div
        className="fixed inset-0 pointer-events-none z-1"
        style={{
          background: `
            radial-gradient(circle at 50% 50%, rgba(58, 10, 15, 0.35) 0%, transparent 65%),
            radial-gradient(circle at 25% 30%, rgba(42, 5, 8, 0.45) 0%, transparent 55%),
            radial-gradient(circle at 75% 70%, rgba(26, 3, 6, 0.4) 0%, transparent 50%),
            radial-gradient(circle at center, transparent 35%, rgba(5, 2, 3, 0.92) 100%)
          `,
        }}
      />

      {/* WebGL Fallback */}
      {!webGLSupported && (
        <div className="fixed inset-0 z-10 flex items-center justify-center p-6 text-center bg-[#050203]">
          <div className="max-w-md">
            <h2 className="text-xl font-bold font-editorial text-[#fff4f4] mb-3">
              WebGL Hardware Acceleration Recommended
            </h2>
            <p className="text-sm font-mono-tech text-[#c9a9a9] mb-4">
              Proceed directly into the portfolio.
            </p>
            <button
              type="button"
              onClick={triggerExitToHero}
              className="px-6 py-2 bg-[#ff2a2a] text-white font-mono-tech text-xs uppercase tracking-widest cursor-pointer"
            >
              ENTER PORTFOLIO
            </button>
          </div>
        </div>
      )}

      {/* ======================================================================
          2. UI CHROME (FIXED OVERLAY, MONOSPACE UPPERCASE, TINY, WIDE LETTER-SPACING)
      ====================================================================== */}
      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 p-4 sm:p-7 flex items-center justify-between text-[11px] font-mono-tech tracking-[0.25em] uppercase pointer-events-auto">
        {/* Top-Left: "NEXT" [1/6] */}
        <button
          type="button"
          onClick={handleNextClick}
          className="text-[#c9a9a9] hover:text-[#ff2a2a] transition-colors cursor-pointer flex items-center space-x-2 group"
          aria-label="Next scroll section"
        >
          <span className="w-1.5 h-1.5 bg-[#ff2a2a] inline-block shadow-[0_0_8px_#ff2a2a]" />
          <span>NEXT</span>
          <span className="text-[9px] text-[#8a6a6a] group-hover:text-white transition-colors">
            [{activeSectionIndex + 1}/6]
          </span>
        </button>

        {/* Top-Center: "SAKTHI PANDI" in Bold Sans */}
        <div className="font-editorial font-bold text-xs sm:text-sm tracking-[0.2em] text-[#fff4f4] uppercase">
          Sakthi Pandi
        </div>

        {/* Top-Right: "EN" and "AUDIO OFF", plus "SKIP (ESC)" */}
        <div className="flex items-center space-x-3 sm:space-x-5 text-[10px]">
          <span className="text-[#8a6a6a] hidden sm:inline">EN</span>

          {onToggleSound && (
            <button
              type="button"
              onClick={onToggleSound}
              className="flex items-center space-x-1.5 px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 text-[#c9a9a9] hover:text-white transition-colors cursor-pointer"
              aria-label={soundEnabled ? 'Audio on' : 'Audio off'}
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-3 h-3 text-[#ff2a2a]" />
                  <span>AUDIO ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3 h-3 text-[#8a6a6a]" />
                  <span>AUDIO OFF</span>
                </>
              )}
            </button>
          )}

          <button
            type="button"
            onClick={triggerExitToHero}
            className="flex items-center space-x-1 px-2.5 py-1 bg-[#1a0507] hover:bg-[#ff2a2a] border border-[#ff2a2a]/60 hover:border-[#ff2a2a] text-[#ffd0d0] hover:text-white transition-all cursor-pointer group"
            aria-label="Skip to main portfolio"
          >
            <FastForward className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
            <span className="font-bold">SKIP</span>
            <span className="text-[#8a6a6a] group-hover:text-white hidden sm:inline">(ESC)</span>
          </button>
        </div>
      </header>

      {/* Right Edge: Section Indicator (Column of 6 horizontal dashes) */}
      <div className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col items-end space-y-3 pointer-events-auto">
        {SECTIONS.map((sec, idx) => {
          const isActive = activeSectionIndex === idx;
          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => jumpToSection(idx)}
              className="p-1 cursor-pointer group flex items-center justify-end"
              aria-label={`Jump to ${sec.label || 'Hero'}`}
            >
              <div
                className={`transition-all duration-300 ${
                  isActive
                    ? 'w-7 h-[2px] bg-[#ff2a2a] shadow-[0_0_10px_#ff2a2a]'
                    : 'w-3 h-[1.5px] bg-white/20 group-hover:bg-white/50'
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Bottom Footer: Monospace Labels */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 p-4 sm:p-7 flex items-center justify-between text-[10px] font-mono-tech tracking-[0.25em] uppercase pointer-events-none text-[#8a6a6a]">
        <div>PORTFOLIO // CHENNAI, INDIA</div>
        <div>SAKTHI PANDI // AI DEV</div>
      </footer>

      {/* Hero SCROLL hint (Only at 00 Hero state) */}
      {activeSectionIndex === 0 && scrollProgress < 0.08 && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center space-y-2 pointer-events-auto animate-fade-in">
          <button
            type="button"
            onClick={() => jumpToSection(1)}
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#0a0204]/90 hover:bg-[#1a0507] border border-[#ff2a2a]/60 hover:border-[#ff2a2a] rounded-full shadow-[0_0_25px_rgba(255,42,42,0.4)] transition-all cursor-pointer group"
          >
            <span className="w-2 h-2 rounded-full bg-[#ff2a2a] animate-ping" />
            <span className="font-editorial font-bold text-xs tracking-[0.25em] text-[#fff4f4] group-hover:text-[#ffd0d0] transition-colors uppercase">
              SCROLL TO EXPLORE
            </span>
            <ArrowDown className="w-3.5 h-3.5 text-[#ff2a2a] group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      )}

      {/* ======================================================================
          3. TEXT SECTIONS (SHARP WHILE ACTIVE, TRANSITIONS ONLY ON ENTER/EXIT)
          Layout: Left giant heading (last line larger in light rose #ffd0d0),
          mono label above, paragraph in middle-right column (#c9a9a9), dim footnote below.
      ====================================================================== */}
      <div className="fixed inset-0 z-30 pointer-events-none flex items-center justify-center p-6 sm:p-12 lg:p-20">
        {SECTIONS.slice(1).map((sec) => {
          // Plateau calculation: active section stays 100% FULLY SHARP while current!
          // Smooth fade and blur apply ONLY during enter and exit edges (~0.04 progress window)
          const span = sec.end - sec.start;
          const edgeWindow = span * 0.22; // 22% transition zone at start & end
          let opacity = 0;
          let blurAmount = 8;
          let translateY = 18;

          if (scrollProgress >= sec.start && scrollProgress <= sec.end) {
            const fromStart = scrollProgress - sec.start;
            const fromEnd = sec.end - scrollProgress;

            if (fromStart < edgeWindow) {
              // Entering
              const t = fromStart / edgeWindow;
              opacity = t;
              blurAmount = (1 - t) * 6;
              translateY = (1 - t) * 16;
            } else if (fromEnd < edgeWindow) {
              // Exiting
              const t = fromEnd / edgeWindow;
              opacity = t;
              blurAmount = (1 - t) * 6;
              translateY = (1 - t) * -16;
            } else {
              // FULLY ACTIVE & SHARP
              opacity = 1.0;
              blurAmount = 0;
              translateY = 0;
            }
          }

          if (opacity <= 0.01) return null;

          return (
            <div
              key={sec.id}
              className="absolute inset-0 flex items-center justify-center p-6 sm:p-12 lg:p-20 transition-all duration-100 ease-out"
              style={{
                opacity,
                filter: blurAmount > 0.1 ? `blur(${blurAmount}px)` : 'none',
                transform: `translateY(${translateY}px)`,
              }}
            >
              <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
                {/* Left Column: Mono tag + Giant Heading */}
                <div className="lg:col-span-7 flex flex-col justify-start text-left">
                  <div className="text-[11px] sm:text-xs font-mono-tech text-[#8a6a6a] tracking-[0.3em] font-bold uppercase mb-4 sm:mb-6">
                    {sec.label}
                  </div>

                  <h2
                    className="font-editorial text-left leading-[0.96] tracking-[-0.03em] text-[#fff4f4] mb-8"
                    style={{
                      fontSize: 'clamp(52px, 7.5vw, 120px)',
                      fontWeight: 500,
                    }}
                  >
                    {sec.headingLines.map((line, i) => (
                      <span key={i} className="block">
                        {line}
                      </span>
                    ))}
                    {/* Highlighted larger word in light rose tint #ffd0d0 */}
                    <span
                      className="block text-[#ffd0d0] font-bold mt-1"
                      style={{
                        textShadow: '0 0 35px rgba(255, 42, 42, 0.45)',
                      }}
                    >
                      {sec.highlightWord}
                    </span>
                  </h2>

                  {/* Dim Footnote (~25-35% opacity) */}
                  {sec.footnote && (
                    <div className="text-[10px] sm:text-[11px] font-mono-tech tracking-[0.25em] text-[#8a6a6a] uppercase opacity-35 mt-2">
                      {sec.footnote}
                    </div>
                  )}
                </div>

                {/* Middle / Right Column: Paragraph in Space Grotesk (#c9a9a9, max-width 420px) */}
                <div className="lg:col-span-5 flex flex-col justify-start lg:pt-14 text-left">
                  <p
                    className="font-editorial text-[#c9a9a9] max-w-[420px] leading-[1.5]"
                    style={{
                      fontSize: 'clamp(18px, 1.6vw, 22px)',
                    }}
                  >
                    {sec.bodyText}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ======================================================================
          4. FINAL TRANSITION FLASH: Camera dives into core -> red-white flash
      ====================================================================== */}
      <div
        className="fixed inset-0 pointer-events-none z-50 transition-opacity duration-300 ease-out"
        style={{
          background: 'radial-gradient(circle at center, #ffffff 10%, #ff2a2a 60%, #050203 100%)',
          opacity: flashOpacity,
          mixBlendMode: 'screen',
        }}
      />

      {/* Virtual 500vh Scroll Track Managed by Lenis */}
      <div
        ref={scrollTrackRef}
        className="fixed inset-0 w-full h-full overflow-y-auto overflow-x-hidden z-20 pointer-events-auto"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="tunnel-scroll-content w-full h-[520vh]" />
      </div>
    </div>
  );
};
