import type { ReactNode } from 'react';

type EditorSectionProps = {
  title?: string;
  right?: ReactNode;
  children: ReactNode;
  visible?: boolean;
  minHeight?: string;
  titleMarginTop?: string;
};

export default function EditorSection({
  title,
  right,
  children,
  visible = true,
  minHeight,
  titleMarginTop,
}: EditorSectionProps) {
  return (
    <div className="editor-section" style={{ display: visible ? 'block' : 'none', minHeight }}>
      {title ? (
        <div className="editor-flex-between" style={{ marginBottom: '1rem' }}>
          <h2 className="panel-title" style={{ margin: 0, marginTop: titleMarginTop }}>{title}</h2>
          {right}
        </div>
      ) : null}
      {children}
    </div>
  );
}
