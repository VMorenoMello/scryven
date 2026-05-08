/* global React */
const StreakBadge = ({ days = 0, history = [] }) => {
  // history: array of 7 booleans, oldest → newest
  const dots = history.length === 7 ? history : Array(7).fill(false);
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 14,
      padding: '10px 14px',
      background: 'var(--green-fill)',
      color: 'var(--green-text)',
      border: '1px solid var(--green)',
      borderRadius: 12,
      fontFamily: 'Inter, system-ui, sans-serif',
    }}>
      <div>
        <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontWeight: 400, fontSize: 32, lineHeight: 1 }}>
          {days}
        </div>
        <div style={{
          fontSize: 11, fontWeight: 500, marginTop: 2,
          textTransform: 'uppercase', letterSpacing: '0.08em',
        }}>Day streak</div>
      </div>
      <div style={{ display: 'flex', gap: 5 }}>
        {dots.map((on, i) => (
          <div key={i} style={{
            width: 9, height: 9, borderRadius: 999,
            background: on ? 'var(--green)' : 'transparent',
            border: on ? 'none' : '1px solid var(--border-strong)',
          }}/>
        ))}
      </div>
    </div>
  );
};
window.StreakBadge = StreakBadge;
