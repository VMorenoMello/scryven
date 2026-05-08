/* global React */
const MatrixView = ({ tasks, onDrop, onToggle }) => {
  const byQ = (q) => tasks.filter(t => t.q === q);

  const cells = [
    { q: 'q1', title: 'Q1 · Do now',   subtitle: 'Urgent and important' },
    { q: 'q2', title: 'Q2 · Plan',     subtitle: 'Important, not urgent' },
    { q: 'q3', title: 'Q3 · Delegate', subtitle: 'Urgent, not important' },
    { q: 'q4', title: 'Q4 · Drop',     subtitle: 'Neither' },
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16,
      padding: 32,
    }}>
      {cells.map(c => (
        <QuadrantCard
          key={c.q}
          q={c.q}
          title={c.title}
          subtitle={c.subtitle}
          tasks={byQ(c.q)}
          onDrop={onDrop}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
};
window.MatrixView = MatrixView;
