import type { ReactNode } from 'react';

type EditorTechniqueCardProps = {
  eligible: boolean;
  header: ReactNode;
  action: ReactNode;
  footer?: ReactNode;
};

export default function EditorTechniqueCard({ eligible, header, action, footer }: EditorTechniqueCardProps) {
  return (
    <div className={`editor-choice-card editor-technique-card ${eligible ? 'is-eligible' : 'is-ineligible'}`}>
      <div className="editor-flex-between" style={{ gap: '0.75rem', alignItems: 'center' }}>
        <div>{header}</div>
        {action}
      </div>
      {footer ? <div style={{ marginTop: '0.75rem' }}>{footer}</div> : null}
    </div>
  );
}
