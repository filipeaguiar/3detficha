import type { ReactNode } from 'react';

type EditorMetaLineProps = {
  label: ReactNode;
  value: ReactNode;
  tone?: 'default' | 'warning';
  marginTop?: string;
};

export default function EditorMetaLine({ label, value, tone = 'default', marginTop = '0.25rem' }: EditorMetaLineProps) {
  return (
    <div className={tone === 'warning' ? 'editor-inline-warning' : 'editor-inline-muted'} style={{ marginTop }}>
      <strong style={{ color: tone === 'warning' ? '#ffd166' : 'var(--text-main)' }}>{label}</strong> {value}
    </div>
  );
}
