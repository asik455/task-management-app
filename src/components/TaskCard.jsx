import React from 'react';

const statusOptions = ['Planned', 'In Progress', 'Complete'];

const getStatusColor = (status) => {
  switch(status) {
    case 'Planned': return '#ef4444';
    case 'In Progress': return '#3b82f6';
    case 'Complete': return '#10b981';
    default: return '#94a3b8';
  }
};

const TaskCard = ({ task, onStatusChange }) => {
  const statusColor = getStatusColor(task.status);
  return (
    <div style={{ background: '#ffffff', borderRadius: 16, border: '1px solid #e2e8f0', marginBottom: 16, padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.2s', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }} onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.08)'; e.currentTarget.style.borderColor = '#cbd5e1'; }} onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05)'; e.currentTarget.style.borderColor = '#e2e8f0'; }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <div style={{ width: 14, height: 14, borderRadius: '50%', background: statusColor, boxShadow: `0 0 10px ${statusColor}60` }} />
        <div style={{ fontSize: 18, fontWeight: 600, color: task.status === 'Complete' ? '#94a3b8' : '#1e293b', textDecoration: task.status === 'Complete' ? 'line-through' : 'none', transition: 'all 0.3s' }}>{task.title}</div>
      </div>
      <select
        value={task.status}
        onChange={e => onStatusChange(e.target.value)}
        style={{ padding: '10px 36px 10px 16px', borderRadius: 10, border: '1px solid #cbd5e1', fontSize: 15, fontWeight: 600, background: '#f8fafc', backgroundImage: 'url("data:image/svg+xml;utf8,<svg fill=\'%2364748b\' height=\'24\' viewBox=\'0 0 24 24\' width=\'24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/></svg>")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center', color: '#334155', outline: 'none', cursor: 'pointer', transition: 'all 0.2s', appearance: 'none', minWidth: 140 }}
        onFocus={e => { e.target.style.borderColor = '#3b82f6'; e.target.style.backgroundColor = '#ffffff'; e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'; }}
        onBlur={e => { e.target.style.borderColor = '#cbd5e1'; e.target.style.backgroundColor = '#f8fafc'; e.target.style.boxShadow = 'none'; }}
      >
        {statusOptions.map(option => (
          <option key={option} value={option} style={{ background: '#ffffff', color: '#1e293b' }}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default TaskCard;
