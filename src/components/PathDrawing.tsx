"use client";
const points = [
  [45, 230],
  [135, 153],
  [220, 184],
  [310, 95],
  [410, 123],
  [510, 38],
];
export function PathDrawing({ active }: { active: number }) {
  return (
    <svg className="path-drawing" viewBox="0 0 560 275" aria-hidden="true">
      <defs>
        <linearGradient id="path-gradient">
          <stop stopColor="#14b8a6" />
          <stop offset="1" stopColor="#a9f1de" />
        </linearGradient>
      </defs>
      <path
        className="path-shadow"
        d="M45 230 C80 230 90 153 135 153 S180 184 220 184 S265 95 310 95 S365 123 410 123 S465 38 510 38"
      />
      <path
        className="path-base"
        d="M45 230 C80 230 90 153 135 153 S180 184 220 184 S265 95 310 95 S365 123 410 123 S465 38 510 38"
      />
      <path
        className="path-trace"
        pathLength="100"
        style={{ strokeDashoffset: 100 - active * 20 }}
        d="M45 230 C80 230 90 153 135 153 S180 184 220 184 S265 95 310 95 S365 123 410 123 S465 38 510 38"
      />
      {points.map(([x, y], i) => (
        <g
          key={i}
          className={i <= active ? "path-node is-reached" : "path-node"}
        >
          {i === active && (
            <circle className="path-halo" cx={x} cy={y} r="22" />
          )}
          <circle cx={x} cy={y} r="8" />
          <text x={x} y={y + 32} textAnchor="middle">
            0{i + 1}
          </text>
        </g>
      ))}
    </svg>
  );
}
