/* global React */
const TaskItem = ({ task, onToggle, onMove, draggable = true, compact = false, showChip = true }) => {
  const [hovered, setHovered] = React.useState(false);

  const onDragStart = (e) => {
    e.dataTransfer.setData('text/plain', task.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      draggable={draggable}
      onDragStart={onDragStart}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: compact ? '6px 10px' : '10px 12px',
        background: hovered ? 'var(--surface-2)' : 'var(--surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 8,
        fontFamily: 'Inter, system-ui, sans-serif',
        fontSize: 13,
        color: 'var(--fg)',
        cursor: draggable ? 'grab' : 'default',
        transition: 'background 120ms',
      }}
    >
      <button
        onClick={() => onToggle && onToggle(task.id)}
        aria-label={task.done ? 'Mark not done' : 'Mark done'}
        style={{
          width: 16, height: 16, borderRadius: 4,
          border: `1.5px solid ${task.done ? 'var(--green)' : 'var(--border-strong)'}`,
          background: task.done ? 'var(--green)' : 'transparent',
          padding: 0, cursor: 'pointer', position: 'relative', flexShrink: 0,
        }}
      >
        {task.done ? (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#FAF9F7"
               strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
               style={{ position: 'absolute', top: 1, left: 1 }}>
            <path d="M20 6 9 17l-5-5"/>
          </svg>
        ) : null}
      </button>

      <span style={{
        flex: 1,
        color: task.done ? 'var(--fg-muted)' : 'var(--fg)',
        textDecoration: task.done ? 'line-through' : 'none',
        textDecorationColor: 'var(--fg-muted)',
      }}>{task.title}</span>

      {showChip && task.q ? <QuadrantChip q={task.q} size="sm" /> : null}

      {task.due ? (
        <span style={{ fontSize: 11, color: 'var(--fg-muted)', minWidth: 36, textAlign: 'right' }}>
          {task.due}
        </span>
      ) : null}
    </div>
  );
};
window.TaskItem = TaskItem;
