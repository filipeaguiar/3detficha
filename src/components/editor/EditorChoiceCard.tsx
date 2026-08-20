import type { ReactNode } from 'react';

type EditorChoiceCardProps = {
  title: ReactNode;
  meta?: ReactNode;
  description?: ReactNode;
  selected?: boolean;
  granted?: boolean;
  danger?: boolean;
  onClick?: () => void;
};

export default function EditorChoiceCard({ title, meta, description, selected = false, granted = false, danger = false, onClick }: EditorChoiceCardProps) {
  const stateClass = granted ? 'is-granted' : selected ? (danger ? 'is-danger-selected' : 'is-selected') : '';

  return (
    <div className={`editor-choice-card ${stateClass}`} onClick={onClick}>
      <div className="editor-choice-header">
        <strong className="editor-choice-title">{title}</strong>
        {meta ? <span className="editor-choice-meta">{meta}</span> : null}
      </div>
      {description ? <p className="editor-choice-description">{description}</p> : null}
    </div>
  );
}
