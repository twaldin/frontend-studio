/** Pure-SVG trend charts for numeric series, colored from the theme. */
import { STACK_OPACITY } from "@/tokens/resolve";
export { STACK_OPACITY };

function scaleY(v: number, min: number, max: number, height: number, pad: number): number {
  const span = max - min || 1;
  return pad + (1 - (v - min) / span) * (height - pad * 2);
}

function points(series: number[], width: number, height: number, pad = 1, min?: number, max?: number): [number, number][] {
  const lo = min ?? Math.min(...series);
  const hi = max ?? Math.max(...series);
  const stepX = series.length > 1 ? (width - pad * 2) / (series.length - 1) : 0;
  return series.map((v, i) => [pad + i * stepX, scaleY(v, lo, hi, height, pad)]);
}

const path = (pts: [number, number][]) => pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");

/** A line only; sits beside a figure. */
export function Sparkline({ series, width = 64, height = 20, className = "" }: { series: number[]; width?: number; height?: number; className?: string }) {
  if (series.length < 2) return null;
  const pts = points(series, width, height);
  const last = pts[pts.length - 1]!;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className={className} aria-hidden="true">
      <path d={path(pts)} fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={last[0]} cy={last[1]} r="2" fill="var(--primary)" />
    </svg>
  );
}

/**
 * A filled area with a baseline; sits under a figure or stands alone as the
 * chart. `stacks` draws each entity's series stacked so the top edge is the
 * sum. `callout` draws a crosshair at that point index.
 */
export function AreaChart({
  series,
  stacks,
  width = 240,
  height = 48,
  className = "",
  axis = false,
  callout,
}: {
  series: number[];
  stacks?: number[][];
  width?: number;
  height?: number;
  className?: string;
  axis?: boolean;
  callout?: { index: number; label: string };
}) {
  if (series.length < 2) return null;
  const pad = 1.5;
  const baseline = (x0: number, x1: number) => `L${x1.toFixed(1)} ${height} L${x0.toFixed(1)} ${height} Z`;

  let layers: { d: string; opacity: number }[] = [];
  let top: [number, number][];
  if (stacks && stacks.length > 0) {
    // Cumulative tops, bottom layer first; the y scale runs from 0 to the sum's max.
    const n = series.length;
    const cumulative: number[][] = [];
    const running = new Array<number>(n).fill(0);
    for (const s of stacks) {
      for (let i = 0; i < n; i++) running[i] = (running[i] ?? 0) + (s[i] ?? 0);
      cumulative.push([...running]);
    }
    const max = Math.max(...(cumulative[cumulative.length - 1] ?? series));
    const tops = cumulative.map((c) => points(c, width, height, pad, 0, max));
    layers = tops.map((pts, layer) => {
      const below = layer === 0 ? null : tops[layer - 1]!;
      const back = below ? [...below].reverse().map(([x, y]) => `L${x.toFixed(1)} ${y.toFixed(1)}`).join(" ") + " Z" : baseline(pts[0]![0], pts[pts.length - 1]![0]);
      return { d: `${path(pts)} ${back}`, opacity: STACK_OPACITY[Math.min(layer, STACK_OPACITY.length - 1)]! };
    });
    top = tops[tops.length - 1]!;
  } else {
    top = points(series, width, height, pad);
    layers = [{ d: `${path(top)} ${baseline(top[0]![0], top[top.length - 1]![0])}`, opacity: 0 }];
  }

  const c = callout ? top[Math.min(Math.max(callout.index, 0), top.length - 1)] : null;
  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className={className} aria-hidden="true">
      {axis
        ? [0.25, 0.5, 0.75].map((f) => <line key={f} x1="0" x2={width} y1={height * f} y2={height * f} stroke="var(--border)" strokeWidth="1" />)
        : null}
      {layers.map((l, i) =>
        stacks ? (
          <path key={i} d={l.d} fill="var(--primary)" fillOpacity={l.opacity} stroke="var(--background)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        ) : (
          <path key={i} d={l.d} fill="var(--accent-soft)" />
        ),
      )}
      {!stacks ? <path d={path(top)} fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeLinejoin="round" vectorEffect="non-scaling-stroke" /> : null}
      {c && callout ? (
        <g>
          <line x1={c[0]} x2={c[0]} y1="0" y2={height} stroke="var(--muted-foreground)" strokeWidth="1" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
          <circle cx={c[0]} cy={c[1]} r="3" fill="var(--background)" stroke="var(--primary)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        </g>
      ) : null}
    </svg>
  );
}
