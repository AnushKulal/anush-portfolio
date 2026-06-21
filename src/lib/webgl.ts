// Detects whether the browser can actually create a WebGL context.
// Some environments (hardware acceleration disabled, sandboxed browsers,
// blocklisted GPUs) report no WebGL — mounting a Three.js <Canvas> there
// throws "Could not create a WebGL context". We use this to fall back to a
// pure-CSS starfield instead.
export function isWebGLAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl');
    return !!gl;
  } catch {
    return false;
  }
}
