import {
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderer,
} from 'three';
import { renderScale, ribbonScrollOffset } from '@/lib/decorative-motion';

const fragmentShader = `
  uniform vec2 uResolution;
  uniform vec2 uPointer;
  uniform float uTime;
  uniform float uScroll;
  varying vec2 vUv;
  void main() {
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    vec2 p = vec2(vUv.x * aspect, vUv.y);
    vec2 center = vec2(aspect * 0.69, 0.17);
    center += uPointer * 0.018 + vec2(sin(uTime * 0.12) * 0.018, uScroll);
    vec2 q = p - center;
    q.x *= 0.92;
    float radius = length(q);
    float angle = atan(q.y, q.x);
    vec3 color = vec3(0.0);
    float alpha = 0.0;
    for (int i = 0; i < 7; i++) {
      float r = 0.30 + float(i) * 0.073;
      float bend = sin(angle * 2.0 + uTime * 0.1) * 0.006;
      float d = abs(radius - r - bend);
      float aa = 1.7 / max(uResolution.y, 1.0);
      float band = 1.0 - smoothstep(0.008, 0.008 + aa, d);
      float bevel = pow(clamp(1.0 - d / 0.011, 0.0, 1.0), 3.0);
      float sweep = smoothstep(-0.4, 0.9, sin(angle + 0.55 + sin(uTime * 0.08) * 0.10));
      vec3 metal = mix(vec3(0.20, 0.015, 0.025), vec3(0.886, 0.106, 0.137), sweep * 0.65);
      metal = mix(metal, vec3(0.961, 0.949, 0.922), pow(sweep, 4.0) * (0.55 + bevel * 0.45));
      float glow = exp(-d * 105.0) * 0.07;
      color += metal * band + vec3(0.45, 0.015, 0.028) * glow;
      alpha = max(alpha, band * 0.96 + glow);
    }
    float edge = smoothstep(0.0, 0.08, vUv.x) * smoothstep(0.0, 0.06, vUv.y);
    gl_FragColor = vec4(color, min(alpha, 1.0) * edge);
  }
`;

export function createRibbonRenderer(
  canvas: HTMLCanvasElement,
  context: WebGL2RenderingContext,
  onFailure: () => void,
) {
  const renderer = new WebGLRenderer({
    canvas,
    context,
    alpha: true,
    antialias: false,
    powerPreference: 'low-power',
  });
  const geometry = new PlaneGeometry(2, 2);
  const uniforms = {
    uTime: { value: 0 },
    uScroll: { value: 0 },
    uPointer: { value: new Vector2() },
    uResolution: { value: new Vector2(1, 1) },
  };
  const material = new ShaderMaterial({
    uniforms,
    fragmentShader,
    vertexShader:
      'varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }',
    transparent: true,
    depthTest: false,
    depthWrite: false,
  });
  const scene = new Scene();
  const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
  scene.add(new Mesh(geometry, material));
  renderer.setClearColor(0x000000, 0);
  let frame = 0;
  let previous = 0;
  let running = false;
  let disposed = false;
  let failed = false;
  let initialized = false;
  let resizePending = false;
  const pointer = new Vector2();
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  renderer.debug.onShaderError = () => {
    failed = true;
  };

  function render(validate = false) {
    renderer.render(scene, camera);
    if (
      failed ||
      context.isContextLost() ||
      (validate && context.getError() !== context.NO_ERROR)
    )
      throw new Error('Ribbon renderer unavailable');
  }
  function draw(now: number) {
    frame = 0;
    if (!running || disposed || document.hidden) return;
    const dt = previous ? Math.min((now - previous) / 1000, 0.05) : 0;
    previous = now;
    uniforms.uTime.value += dt;
    uniforms.uPointer.value.lerp(pointer, 1 - Math.exp(-dt * 8));
    try {
      render();
    } catch {
      onFailure();
      return;
    }
    frame = requestAnimationFrame(draw);
  }
  function resize() {
    if (disposed) return;
    // Defer backing-store work while paused, offscreen or hidden.
    if (initialized && (!running || document.hidden)) {
      resizePending = true;
      return;
    }
    resizePending = false;
    const box = canvas.getBoundingClientRect();
    const scale = renderScale(innerWidth, devicePixelRatio);
    renderer.setPixelRatio(1);
    renderer.setSize(
      Math.max(1, Math.round(box.width * scale)),
      Math.max(1, Math.round(box.height * scale)),
      false,
    );
    uniforms.uResolution.value.set(canvas.width, canvas.height);
  }
  function move(event: PointerEvent) {
    if (!running || !finePointer.matches || event.pointerType !== 'mouse')
      return;
    pointer.set(
      (event.clientX / innerWidth - 0.5) * 2,
      (0.5 - event.clientY / innerHeight) * 2,
    );
  }
  function resetPointer() {
    pointer.set(0, 0);
  }
  function lost(event: Event) {
    event.preventDefault();
    onFailure();
  }
  const observer = new ResizeObserver(resize);
  function dispose() {
    if (disposed) return;
    disposed = true;
    running = false;
    cancelAnimationFrame(frame);
    observer.disconnect();
    window.removeEventListener('resize', resize);
    window.removeEventListener('pointermove', move);
    window.removeEventListener('blur', resetPointer);
    finePointer.removeEventListener('change', resetPointer);
    canvas.removeEventListener('webglcontextlost', lost);
    geometry.dispose();
    material.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
  }
  try {
    resize();
    render(true);
    initialized = true; // Caller reveals the canvas only after a verified first frame.
    observer.observe(canvas);
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('blur', resetPointer);
    finePointer.addEventListener('change', resetPointer);
    canvas.addEventListener('webglcontextlost', lost);
  } catch (error) {
    dispose();
    throw error;
  }
  return {
    setProgress(progress: number) {
      uniforms.uScroll.value = ribbonScrollOffset(progress);
    },
    setRunning(value: boolean) {
      if (disposed || running === value) return;
      running = value;
      previous = 0;
      if (value) {
        if (resizePending) resize();
        frame = requestAnimationFrame(draw);
      } else {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    },
    dispose,
  };
}
