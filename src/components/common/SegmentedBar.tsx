type SegmentedBarProps = {
  current: number;
  max: number;
  color: string;
  onClick?: () => void;
  halfWidth?: boolean;
  pulseCount?: number;
  /** Largura fixa (px) de cada segmento. Quando definida, a barra não se expande para preencher o container. */
  segmentWidth?: number;
  offsetX?: number;
  style?: React.CSSProperties;
};

export default function SegmentedBar({ current, max, color, onClick, halfWidth, pulseCount = 0, segmentWidth, offsetX = 0, style }: SegmentedBarProps) {
  const maxSafe = Math.max(1, max);
  const compact = segmentWidth !== undefined;
  const gapSize = compact ? '2px' : maxSafe > 25 ? '1px' : '2px';

  const segments = [];

  for (let i = 0; i < maxSafe; i++) {
    const isFilled = i < current;
    const isPulsing = isFilled && i >= current - pulseCount;
    segments.push(
      <div
        key={i}
        className={isPulsing ? 'segment-pulse' : ''}
        style={{
          flex: compact ? undefined : 1,
          width: compact ? `${segmentWidth}px` : undefined,
          height: compact ? '12px' : '16px',
          minWidth: compact ? `${segmentWidth}px` : '2px',
          backgroundColor: isFilled
            ? color
            : `color-mix(in srgb, ${color} 18%, rgba(255, 255, 255, 0.06))`,
          transform: 'skewX(-10deg)',
          borderRadius: '1px',
          boxShadow: isFilled
            ? 'inset 0 1px 0 rgba(255, 255, 255, 0.4), inset 0 -1px 0 rgba(0, 0, 0, 0.2)'
            : 'inset 0 1px 2px rgba(0, 0, 0, 0.35)',
          transition: 'background-color 0.2s ease, transform 0.2s ease, opacity 0.2s ease',
        }}
      />
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: compact ? 0 : '3px',
        cursor: onClick ? 'pointer' : 'default',
        width: compact ? 'fit-content' : halfWidth ? '50%' : '100%',
        transform: offsetX ? `translateX(${offsetX}px)` : undefined,
        ...style,
      }}
      onClick={onClick}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'nowrap',
          flex: compact ? undefined : 1,
          gap: gapSize,
          width: '100%',
        }}
      >
        {segments}
      </div>
    </div>
  );
}
