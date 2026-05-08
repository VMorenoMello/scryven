/* global React */
const DailyThree = ({ tasks = [], onToggle }) => {
  const slots = [0, 1, 2];
  return (
    <div style={{
      padding: 18,
      background: 'var(--surface)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 12,
      fontFamily: 'Inter, system-ui, sans-serif',
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        marginBottom: 12,
      }}>
        <div style={{
          fontFamily: "'Instrument Serif', Georgia, serif",
          fontSize: 22, fontWeight: 400, color: 'var(--fg)',
        }}>Today's three</div>
        <div style={{ fontSize: 11, color: 'var(--fg-muted)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          {tasks.filter(t => t.done).length} / 3
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {slots.map(i => {
          const t = tasks[i];
          if (!t) {
            return (
              <div key={i} style={{
                padding: '12px 14px',
                border: '1px dashed var(--border-subtle)',
                borderRadius: 8,
                fontSize: 13, color: 'var(--fg-muted)',
              }}>Pick a priority…</div>
            );
          }
          return <TaskItem key={t.id} task={t} onToggle={onToggle} />;
        })}
      </div>
    </div>
  );
};
window.DailyThree = DailyThree;
