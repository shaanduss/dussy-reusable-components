// Helper to clamp values
function clamp(value: number, min: number, max: number) {
  return Math.max(Math.min(value, Math.max(min, max)), Math.min(min, max));
}

export const CircularProgress = ({
  value = 0,
  size = 48,
  strokeWidth = 4,
  showText = true,
  className = "",
  color="text-cyan-600"
}) => {
  const normalizedValue = clamp(value, 0, 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (normalizedValue / 100) * circumference;

  return (
    <svg
      width={size}
      height={size}
      className={className}
      viewBox={`0 0 ${size} ${size}`}
      role="progressbar"
      aria-valuenow={normalizedValue}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        className="text-primary/20"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={circumference - progress}
        strokeLinecap="round"
        className={color}
        style={{
          transition: "stroke-dashoffset 0.4s",
          transform: `rotate(-90deg)`,
          transformOrigin: "50% 50%",
        }}
      />
      {
        showText &&
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy=".3em"
          className="fill-current text-xs"
        >
          {normalizedValue}%
        </text>
      }
    </svg>
  );
};
