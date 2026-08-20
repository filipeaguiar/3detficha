import type { ReactNode } from 'react';

type TabItem<T extends string> = {
  id: T;
  label: string;
  icon?: ReactNode;
  badge?: ReactNode;
};

type TabbedNavigationProps<T extends string> = {
  items: Array<TabItem<T>>;
  activeTab: T;
  onChange: (tab: T) => void;
  ariaLabel?: string;
  className?: string;
};

export default function TabbedNavigation<T extends string>({ items, activeTab, onChange, ariaLabel, className = '' }: TabbedNavigationProps<T>) {
  return (
    <nav className={`editor-tabs ${className}`.trim()} aria-label={ariaLabel}>
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`editor-tab-btn ${activeTab === item.id ? 'active' : ''}`}
          onClick={() => onChange(item.id)}
          aria-label={item.label}
          aria-current={activeTab === item.id ? 'page' : undefined}
          title={item.label}
        >
          <span className="editor-tab-content">
            {item.icon && <span className="editor-tab-icon" aria-hidden="true">{item.icon}</span>}
            <span className="editor-tab-label">{item.label}</span>
            {item.badge !== undefined && <span className="editor-tab-badge">{item.badge}</span>}
          </span>
        </button>
      ))}
    </nav>
  );
}
