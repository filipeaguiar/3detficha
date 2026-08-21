import type { ReactNode } from 'react';

type PlayTechniquesSectionProps = {
  children: ReactNode;
};

export default function PlayTechniquesSection({ children }: PlayTechniquesSectionProps) {
  return (
    <section className="form-group" style={{ padding: '0 0.5rem' }}>
      <h2 className="panel-title" style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Técnicas & Bônus</h2>
      <div className="bonus-toggles-grid">{children}</div>
    </section>
  );
}
