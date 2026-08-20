import type { ReactNode } from 'react';

type PlayAttacksSectionProps = {
  children: ReactNode;
  comboControls?: ReactNode;
};

export default function PlayAttacksSection({ children, comboControls }: PlayAttacksSectionProps) {
  return (
    <section className="form-group">
      <h2 className="panel-title" style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Ataques</h2>
      {comboControls}
      <div className="bonus-toggles-grid">{children}</div>
    </section>
  );
}
