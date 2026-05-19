import React, { useState } from 'react';
const TaskForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleAdd = async () => {
    setError('');
    setSuccess('');
    if (!title.trim()) {
      setError('Task title is required');
      return;
    }
    setLoading(true);
    try {
      await onAdd({ title, status: 'Planned' });
      setTitle('');
      setSuccess('Task created');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to add task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 36, background: '#ffffff', padding: 32, borderRadius: 20, border: '1px solid #e2e8f0', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)' }}>
      <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#0f172a' }}>Create New Task</h3>
      <div style={{ display: 'flex', gap: 16 }}>
        <input
          placeholder="What needs to be done?"
          value={title}
          onChange={e => setTitle(e.target.value)}
          style={{ flex: 1, padding: '14px 20px', borderRadius: 12, border: '1px solid #cbd5e1', background: '#f8fafc', color: '#0f172a', fontSize: 16, outline: 'none', transition: 'all 0.2s', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.02)' }}
          onFocus={e => { e.target.style.borderColor = '#3b82f6'; e.target.style.background = '#ffffff'; e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'; }}
          onBlur={e => { e.target.style.borderColor = '#cbd5e1'; e.target.style.background = '#f8fafc'; e.target.style.boxShadow = 'inset 0 1px 2px rgba(0,0,0,0.02)'; }}
          onKeyDown={e => { if (e.key === 'Enter') handleAdd(); }}
        />
        <button
          onClick={handleAdd}
          disabled={loading}
          style={{ padding: '14px 32px', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)', color: '#ffffff', fontWeight: 600, fontSize: 16, cursor: loading ? 'not-allowed' : 'pointer', boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)', transition: 'transform 0.1s' }}
          onMouseDown={e => { if(!loading) e.target.style.transform = 'scale(0.98)'; }}
          onMouseUp={e => e.target.style.transform = 'scale(1)'}
          onMouseLeave={e => e.target.style.transform = 'scale(1)'}
        >
          {loading ? 'Adding...' : 'Add Task'}
        </button>
      </div>
      <div style={{ minHeight: 20 }}>
        {error && <div style={{ color: '#ef4444', fontSize: 14, fontWeight: 500 }}>{error}</div>}
        {success && <div style={{ color: '#10b981', fontSize: 14, fontWeight: 500 }}>{success}</div>}
      </div>
    </div>
  );
};

export default TaskForm;
