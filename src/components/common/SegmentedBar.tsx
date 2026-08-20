type SegmentedBarProps = {
  current: number;
  max: number;
  color: string;
  onClick?: () => void;
  halfWidth?: boolean;
  pulseCount?: number;
  /** Largura fixa (px) de cada segmento. Quando definida, o bar não se expande para preencher o container. */
  segmentWidth?: number;
};

export default function SegmentedBar({ current, max, color, onClick, halfWidth, pulseCount = 0, segmentWidth }: SegmentedBarProps) {
  const segments = [];
  const maxSafe = Math.max(1, max);
  const isHighVolume = maxSafe > 20;
  const compact = segmentWidth !== undefined;

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
          height: '16px',
          minWidth: compact ? `${segmentWidth}px` : '2px',
          backgroundColor: isFilled ? color : 'transparent',
          border: isHighVolume ? 'none' : `1px solid ${isFilled ? color : 'var(--border-color)'}`,
          transform: 'skewX(-20deg)',
          boxShadow: isFilled && !isHighVolume ? `0 0 5px ${color}80` : 'none',
          transition: 'all 0.2s ease',
          opacity: isFilled ? 1 : 0.2,
          marginRight: '1px'
        }}
      />
    );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: compact ? 0 : '3px', cursor: onClick ? 'pointer' : 'default', width: compact ? 'fit-content' : halfWidth ? '50%' : '100%' }} onClick={onClick}>
      <div style={{ display: 'flex', flexWrap: 'nowrap', flex: compact ? undefined : 1 }}>
        {segments}
      </div>
    </div>
  );
}
