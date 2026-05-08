/* global React */
const Input = ({ value, onChange, onEnter, placeholder = 'Capture a task', size = 'md', autoFocus, leadingIcon, trailingHint = 'Enter' }) => {
  const [focused, setFocused] = React.useState(false);
  const inputRef = React.useRef(null);
  React.useEffect(() => { if (autoFocus && inputRef.current) inputRef.current.focus(); }, [autoFocus]);

  const heights = { sm: 30, md: 38, lg: 44 };
  const wrap = {
    display: 'flex', alignItems: 'center', gap: 8,
    height: heights[size], padding: '0 12px',
    background: 'var(--surface)',
    border: `1px solid ${focused ? 'var(--green)' : 'var(--border-subtle)'}`,
    borderRadius: 8,
    boxShadow: focused ? '0 0 0 3px rgba(74,138,74,0.15)' : 'none',
    transition: 'border-color 150ms, box-shadow 150ms',
    fontFamily: 'Inter, system-ui, sans-serif',
  };

  const onKey = (e) => {
    if (e.key === 'Enter' && onEnter) {
      e.preventDefault();
      onEnter(value);
    }
  };

  return (
    <div style={wrap}>
      {leadingIcon ? <Icon name={leadingIcon} size={16} color="var(--fg-muted)" /> : null}
      <input
        ref={inputRef}
        value={value || ''}
        placeholder={placeholder}
        onChange={(e) => onChange && onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyDown={onKey}
        style={{
          flex: 1, border: 'none', outline: 'none', background: 'transparent',
          color: 'var(--fg)', fontSize: 14, fontFamily: 'inherit',
        }}
      />
      {trailingHint ? (
        <span style={{
          fontFamily: 'ui-monospace, monospace', fontSize: 10,
          color: 'var(--fg-muted)',
          border: '1px solid var(--border-subtle)',
          background: 'var(--surface-2)',
          borderRadius: 4, padding: '1px 6px',
        }}>{trailingHint}</span>
      ) : null}
    </div>
  );
};
window.Input = Input;
