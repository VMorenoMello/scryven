/* global React */
const Sidebar = ({ active = 'matrix', streak = 23, onNav }) => {
  const items = [
    { id: 'inbox',   label: 'Inbox',     icon: 'inbox',    count: 7 },
    { id: 'matrix',  label: 'Matrix',    icon: 'grid',     count: null },
    { id: 'today',   label: 'Today',     icon: 'target',   count: 3 },
    { id: 'week',    label: 'This week', icon: 'calendar', count: null },
  ];
  return (
    <aside style={{
      width: 240, height: '100%',
      background: 'var(--surface-2)',
      borderRight: '1px solid var(--border-subtle)',
      padding: '20px 14px',
      display: 'flex', flexDirection: 'column', gap: 4,
      fontFamily: 'Inter, system-ui, sans-serif',
    }}>
      <div style={{ padding: '4px 6px 18px' }}>
        <img src="../../assets/logo-wordmark.svg" alt="scryven" style={{ height: 30 }} />
      </div>

      {items.map(it => {
        const isActive = active === it.id;
        return (
          <button key={it.id}
            onClick={() => onNav && onNav(it.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '8px 10px',
              background: isActive ? 'var(--surface)' : 'transparent',
              border: '1px solid',
              borderColor: isActive ? 'var(--border-subtle)' : 'transparent',
              borderRadius: 8,
              color: isActive ? 'var(--fg)' : 'var(--fg-2)',
              fontSize: 13, fontWeight: isActive ? 500 : 400,
              cursor: 'pointer', textAlign: 'left',
              transition: 'background 120ms',
            }}>
            <Icon name={it.icon} size={16} color={isActive ? 'var(--green)' : 'var(--fg-muted)'} />
            <span style={{ flex: 1 }}>{it.label}</span>
            {it.count !== null ? (
              <span style={{ fontSize: 11, color: 'var(--fg-muted)' }}>{it.count}</span>
            ) : null}
          </button>
        );
      })}

      <div style={{ flex: 1 }} />

      <div style={{
        padding: 12, borderRadius: 8,
        background: 'var(--green-fill)',
        border: '1px solid var(--green)',
        display: 'flex', alignItems: 'center', gap: 10,
        color: 'var(--green-text)',
      }}>
        <Icon name="flame" size={18} color="currentColor" />
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 22, lineHeight: 1 }}>{streak}</div>
          <div style={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 2 }}>Day streak</div>
        </div>
      </div>

      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, padding: '8px 6px',
        marginTop: 8,
      }}>
        <div style={{
          width: 26, height: 26, borderRadius: 999,
          background: 'var(--q2-fill)', color: 'var(--q2-text)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11, fontWeight: 500, border: '1px solid var(--q2-border)',
        }}>R</div>
        <div style={{ flex: 1, fontSize: 12, color: 'var(--fg-2)' }}>Rafael</div>
        <Icon name="settings" size={14} color="var(--fg-muted)" />
      </div>
    </aside>
  );
};
window.Sidebar = Sidebar;
