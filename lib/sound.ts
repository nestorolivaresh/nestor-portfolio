// Tennis ball bounce sound — synthesized via Web Audio (no asset needed)
export function playBounce() {
  try {
    const Ctx =
      (window as Window & typeof globalThis).AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!Ctx) return
    const w = window as unknown as { __audioCtx?: AudioContext }
    const ctx = w.__audioCtx || (w.__audioCtx = new Ctx())
    const t = ctx.currentTime
    // Thud body — low sine
    const osc1 = ctx.createOscillator()
    const g1 = ctx.createGain()
    osc1.type = 'sine'
    osc1.frequency.setValueAtTime(180, t)
    osc1.frequency.exponentialRampToValueAtTime(60, t + 0.12)
    g1.gain.setValueAtTime(0.35, t)
    g1.gain.exponentialRampToValueAtTime(0.001, t + 0.14)
    osc1.connect(g1).connect(ctx.destination)
    osc1.start(t); osc1.stop(t + 0.15)
    // Felt pluck — high blip
    const osc2 = ctx.createOscillator()
    const g2 = ctx.createGain()
    osc2.type = 'triangle'
    osc2.frequency.setValueAtTime(1600, t)
    osc2.frequency.exponentialRampToValueAtTime(800, t + 0.05)
    g2.gain.setValueAtTime(0.08, t)
    g2.gain.exponentialRampToValueAtTime(0.001, t + 0.06)
    osc2.connect(g2).connect(ctx.destination)
    osc2.start(t); osc2.stop(t + 0.07)
  } catch {}
}
