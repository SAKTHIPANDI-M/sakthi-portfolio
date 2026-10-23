import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export interface ColorBendsProps {
  className?: string;
  style?: React.CSSProperties;
  rotation?: number;
  speed?: number;
  colors?: string[];
  transparent?: boolean;
  backgroundColor?: string;
  autoRotate?: number;
  scale?: number;
  frequency?: number;
  warpStrength?: number;
  mouseInfluence?: number;
  parallax?: number;
  noise?: number;
  iterations?: number;
  intensity?: number;
  bandWidth?: number;
}

const MAX_COLORS = 8 as const;

const frag = `
#define MAX_COLORS ${MAX_COLORS}
uniform vec2 uCanvas;
uniform float uTime;
uniform float uSpeed;
uniform vec2 uRot;
uniform int uColorCount;
uniform vec3 uColors[MAX_COLORS];
uniform int uTransparent;
uniform vec3 uBgColor;
uniform float uScale;
uniform float uFrequency;
uniform float uWarpStrength;
uniform vec2 uPointer; // in NDC [-1,1]
uniform float uMouseInfluence;
uniform float uParallax;
uniform float uNoise;
uniform int uIterations;
uniform float uIntensity;
uniform float uBandWidth;

varying vec2 vUv;

void main() {
  float t = uTime * uSpeed;
  vec2 p = vUv * 2.0 - 1.0;
  p += uPointer * (uParallax * 0.1);
  
  // Rotation
  vec2 rp = vec2(p.x * uRot.x - p.y * uRot.y, p.x * uRot.y + p.y * uRot.x);
  
  // Aspect ratio correction
  float aspect = max(uCanvas.x / max(uCanvas.y, 0.0001), 0.0001);
  vec2 q = vec2(rp.x * aspect, rp.y);
  
  // Scale & barrel warp
  q /= max(uScale, 0.0001);
  float d = 0.52 + 0.22 * dot(q, q);
  q /= d;
  
  // Pointer distortion reaction
  vec2 toward = (uPointer - rp);
  q += toward * (uMouseInfluence * 0.15);
  
  // Warp iterations
  for (int j = 0; j < 5; j++) {
    if (j >= uIterations - 1) break;
    vec2 rr = vec2(
      sin(1.5 * (q.y * uFrequency) + 2.0 * cos(q.x * uFrequency)),
      sin(1.5 * (q.x * uFrequency) + 2.0 * cos(q.y * uFrequency))
    );
    q += (rr - q) * 0.15;
  }
  
  // Center alignment for diagonal curved ribbons
  vec2 s = q + vec2(0.15, -0.1);
  vec3 sumCol = vec3(0.0);
  float cover = 0.0;
  
  if (uColorCount > 0) {
    for (int i = 0; i < MAX_COLORS; ++i) {
      if (i >= uColorCount) break;
      s -= vec2(0.045, 0.045);
      
      float wave1 = sin(s.y * (uFrequency * 1.6) + cos(s.x * (uFrequency * 1.05)) * 1.6);
      float wave2 = cos(s.x * (uFrequency * 1.15) - 1.2 * t + float(i) * 0.42);
      float waveDist = abs(wave1 * 0.82 + wave2 * (0.38 * uWarpStrength));
      
      // Smooth exponential ribbon falloff
      float w = 1.0 - exp(-uBandWidth / exp(uBandWidth * waveDist));
      sumCol += uColors[i] * w;
      cover = max(cover, w);
    }
  } else {
    // Default 3 color bands if no palette provided
    for (int k = 0; k < 3; ++k) {
      s -= vec2(0.045, 0.045);
      float wave1 = sin(s.y * (uFrequency * 1.6) + cos(s.x * (uFrequency * 1.05)) * 1.6);
      float wave2 = cos(s.x * (uFrequency * 1.15) - 1.2 * t + float(k) * 0.42);
      float waveDist = abs(wave1 * 0.82 + wave2 * (0.38 * uWarpStrength));
      float w = 1.0 - exp(-uBandWidth / exp(uBandWidth * waveDist));
      sumCol[k] += w;
      cover = max(cover, w);
    }
  }
  
  vec3 col = clamp(sumCol, 0.0, 1.0) * uIntensity;
  float cov = clamp(cover, 0.0, 1.0);
  
  vec3 rgb;
  float alpha;
  if (uTransparent > 0) {
    rgb = col;
    alpha = cov;
  } else {
    rgb = mix(uBgColor, col, cov);
    alpha = 1.0;
  }
  
  // Controlled film grain stipple along ribbon gradients
  if (uNoise > 0.001) {
    float n = fract(sin(dot(gl_FragCoord.xy + vec2(uTime * 10.0), vec2(12.9898, 78.233))) * 43758.5453123);
    float noiseFactor = mix(0.3, 1.0, step(0.03, cov));
    rgb += (n - 0.5) * (uNoise * noiseFactor);
    rgb = clamp(rgb, 0.0, 1.0);
  }
  
  gl_FragColor = vec4(rgb, alpha);
}
`;

const vert = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

const toVec3 = (hex: string) => {
  const h = hex.replace('#', '').trim();
  const v =
    h.length === 3
      ? [parseInt(h[0] + h[0], 16), parseInt(h[1] + h[1], 16), parseInt(h[2] + h[2], 16)]
      : [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  return new THREE.Vector3(v[0] / 255, v[1] / 255, v[2] / 255);
};

export default function ColorBends({
  className = '',
  style,
  rotation = 50,
  speed = 0.15,
  colors = [],
  transparent = true,
  backgroundColor = '#050507',
  autoRotate = 0,
  scale = 1.05,
  frequency = 0.85,
  warpStrength = 1.0,
  mouseInfluence = 0.25,
  parallax = 0.35,
  noise = 0.025,
  iterations = 1,
  intensity = 1.65,
  bandWidth = 4.8
}: ColorBendsProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const rafRef = useRef<number | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const rotationRef = useRef<number>(rotation);
  const autoRotateRef = useRef<number>(autoRotate);
  const pointerTargetRef = useRef<THREE.Vector2>(new THREE.Vector2(0, 0));
  const pointerCurrentRef = useRef<THREE.Vector2>(new THREE.Vector2(0, 0));
  const pointerSmoothRef = useRef<number>(8);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: false,
        powerPreference: 'high-performance',
        alpha: transparent
      });
    } catch (e) {
      console.warn('WebGL initialization failed for ColorBends:', e);
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new THREE.PlaneGeometry(2, 2);

    const initColorsArray = Array.from({ length: MAX_COLORS }, () => new THREE.Vector3(0, 0, 0));
    const parsedColors = (colors || []).filter(Boolean).slice(0, MAX_COLORS).map(toVec3);
    for (let i = 0; i < parsedColors.length; i++) {
      initColorsArray[i].copy(parsedColors[i]);
    }

    const bgVec3 = toVec3(backgroundColor || '#050507');

    const material = new THREE.ShaderMaterial({
      vertexShader: vert,
      fragmentShader: frag,
      uniforms: {
        uCanvas: { value: new THREE.Vector2(1, 1) },
        uTime: { value: 0 },
        uSpeed: { value: speed },
        uRot: { value: new THREE.Vector2(1, 0) },
        uColorCount: { value: parsedColors.length },
        uColors: { value: initColorsArray },
        uTransparent: { value: transparent ? 1 : 0 },
        uBgColor: { value: bgVec3 },
        uScale: { value: scale },
        uFrequency: { value: frequency },
        uWarpStrength: { value: warpStrength },
        uPointer: { value: new THREE.Vector2(0, 0) },
        uMouseInfluence: { value: mouseInfluence },
        uParallax: { value: parallax },
        uNoise: { value: noise },
        uIterations: { value: iterations },
        uIntensity: { value: intensity },
        uBandWidth: { value: bandWidth }
      },
      premultipliedAlpha: false,
      transparent: transparent
    });
    materialRef.current = material;

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    rendererRef.current = renderer;
    try {
      (renderer as any).outputColorSpace = (THREE as any).SRGBColorSpace;
    } catch {
      // Fallback
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    const clearColor = new THREE.Color(backgroundColor || '#050507');
    renderer.setClearColor(clearColor, transparent ? 0 : 1);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.pointerEvents = 'none';
    container.appendChild(renderer.domElement);

    const clock = new THREE.Clock();

    const handleResize = () => {
      if (!container || !rendererRef.current || !materialRef.current) return;
      const w = container.clientWidth || window.innerWidth || 1;
      const h = container.clientHeight || window.innerHeight || 1;
      renderer.setSize(w, h, false);
      (material.uniforms.uCanvas.value as THREE.Vector2).set(w, h);
    };
    handleResize();

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(handleResize);
      ro.observe(container);
      resizeObserverRef.current = ro;
    } else {
      window.addEventListener('resize', handleResize);
    }

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const loop = () => {
      const dt = clock.getDelta();
      const elapsed = clock.elapsedTime;
      material.uniforms.uTime.value = elapsed;

      const deg = (rotationRef.current % 360) + autoRotateRef.current * elapsed;
      const rad = (deg * Math.PI) / 180;
      const c = Math.cos(rad);
      const s = Math.sin(rad);
      (material.uniforms.uRot.value as THREE.Vector2).set(c, s);

      const cur = pointerCurrentRef.current;
      const tgt = pointerTargetRef.current;
      const amt = Math.min(1, dt * pointerSmoothRef.current);
      cur.lerp(tgt, amt);
      (material.uniforms.uPointer.value as THREE.Vector2).copy(cur);

      renderer.render(scene, camera);
      if (!prefersReducedMotion) {
        rafRef.current = requestAnimationFrame(loop);
      }
    };

    if (prefersReducedMotion) {
      renderer.render(scene, camera);
    } else {
      rafRef.current = requestAnimationFrame(loop);
    }

    const handlePointerMove = (e: MouseEvent | PointerEvent) => {
      const winW = window.innerWidth || 1;
      const winH = window.innerHeight || 1;
      const x = (e.clientX / winW) * 2 - 1;
      const y = -((e.clientY / winH) * 2 - 1);
      pointerTargetRef.current.set(
        Math.max(-1.5, Math.min(1.5, x)),
        Math.max(-1.5, Math.min(1.5, y))
      );
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      } else {
        window.removeEventListener('resize', handleResize);
      }
      window.removeEventListener('pointermove', handlePointerMove);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      if (renderer.domElement && renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  useEffect(() => {
    const material = materialRef.current;
    const renderer = rendererRef.current;
    if (!material) return;

    rotationRef.current = rotation;
    autoRotateRef.current = autoRotate;
    material.uniforms.uSpeed.value = speed;
    material.uniforms.uScale.value = scale;
    material.uniforms.uFrequency.value = frequency;
    material.uniforms.uWarpStrength.value = warpStrength;
    material.uniforms.uMouseInfluence.value = mouseInfluence;
    material.uniforms.uParallax.value = parallax;
    material.uniforms.uNoise.value = noise;
    material.uniforms.uIterations.value = iterations;
    material.uniforms.uIntensity.value = intensity;
    material.uniforms.uBandWidth.value = bandWidth;

    const arr = (colors || []).filter(Boolean).slice(0, MAX_COLORS).map(toVec3);
    for (let i = 0; i < MAX_COLORS; i++) {
      const vec = (material.uniforms.uColors.value as THREE.Vector3[])[i];
      if (i < arr.length) vec.copy(arr[i]);
      else vec.set(0, 0, 0);
    }
    material.uniforms.uColorCount.value = arr.length;
    material.uniforms.uTransparent.value = transparent ? 1 : 0;
    const bgVec = toVec3(backgroundColor || '#050507');
    (material.uniforms.uBgColor.value as THREE.Vector3).copy(bgVec);

    if (renderer) {
      const clearColor = new THREE.Color(backgroundColor || '#050507');
      renderer.setClearColor(clearColor, transparent ? 0 : 1);
    }
  }, [
    rotation,
    autoRotate,
    speed,
    scale,
    frequency,
    warpStrength,
    mouseInfluence,
    parallax,
    noise,
    iterations,
    intensity,
    bandWidth,
    colors,
    transparent,
    backgroundColor
  ]);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full relative overflow-hidden pointer-events-none select-none ${className}`}
      style={style}
    />
  );
}
