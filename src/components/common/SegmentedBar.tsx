type SegmentedBarProps = {
  current: number;
  max: number;
  color: string;
  onClick?: () => void;
  halfWidth?: boolean;
  pulseCount?: number;
};

export default function SegmentedBar({ current, max, color, onClick, halfWidth, pulseCount = 0 }: SegmentedBarProps) {
  const segments = [];
  const maxSafe = Math.max(1, max);
  const isHighVolume = maxSafe > 20;

  for (let i = 0; i < maxSafe; i++) {
    const isFilled = i < current;
    const isPulsing = isFilled && i >= current - pulseCount;
    segments.push(
      <div
        key={i}
        className={isPulsing ? 'segment-pulse' : ''}
        style={{
          flex: 1,
          height: '16px',
          minWidth: '2px',
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
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '3px', cursor: 'pointer', width: halfWidth ? '50%' : '100%' }} onClick={onClick}>
      <div style={{ display: 'flex', flexWrap: 'nowrap', flex: 1 }}>
        {segments}
      </div>
    </div>
  );
}
