/* global React */
const CaptureBar = ({ onAdd }) => {
  const [val, setVal] = React.useState('');
  return (
    <div style={{
      display: 'flex', gap: 10, alignItems: 'center',
      padding: '14px 32px',
      borderTop: '1px solid var(--border-subtle)',
      background: 'var(--surface)',
    }}>
      <Icon name="plus" size={18} color="var(--fg-muted)" />
      <div style={{ flex: 1 }}>
        <Input
          value={val}
          onChange={setVal}
          placeholder="Capture a task — Enter to add to inbox"
          onEnter={(v) => { if (v && v.trim() && onAdd) { onAdd(v.trim()); setVal(''); } }}
          trailingHint="Enter"
        />
      </div>
    </div>
  );
};
window.CaptureBar = CaptureBar;
