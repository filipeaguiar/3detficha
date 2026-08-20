import type { ReactNode } from 'react';

type PillOption = {
  key: string;
  label: ReactNode;
  selected?: boolean;
  disabled?: boolean;
  onClick: () => void;
};

type EditorPillGroupProps = {
  title?: string;
  options: PillOption[];
};

export default function EditorPillGroup({ title, options }: EditorPillGroupProps) {
  return (
    <div className={title ? 'editor-subcard' : undefined}>
      {title ? <div style={{ fontWeight: 'bold', color: '#fff', marginBottom: '0.5rem' }}>{title}</div> : null}
      <div className="editor-pill-group">
        {options.map((option) => (
          <button
            key={option.key}
            className={`control-btn editor-pill-btn ${option.selected ? 'is-selected' : ''}`}
            disabled={option.disabled}
            style={option.disabled ? { opacity: 0.45 } : undefined}
            onClick={option.onClick}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
