import React from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, signOut } = useAuth();
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255, 255, 255, 0.8)', padding: '0 48px', height: 76, backdropFilter: 'blur(12px)', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ fontWeight: 800, fontSize: 22, letterSpacing: '-0.5px', display: 'flex', alignItems: 'center', gap: 12, color: '#0f172a' }}>
        <div style={{ width: 40, height: 40, background: 'linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(56, 189, 248, 0.15)' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
        </div>
        Task Manager
      </div>
      {user && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '6px 16px', background: '#f8fafc', borderRadius: 24, border: '1px solid #e2e8f0' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 14, boxShadow: '0 2px 4px rgba(59,130,246,0.3)' }}>
              {user.displayName?.[0] || 'U'}
            </div>
            <span style={{ fontSize: 15, fontWeight: 600, color: '#334155' }}>{user.displayName}</span>
          </div>
          <button onClick={signOut} style={{ padding: '8px 20px', borderRadius: 10, border: '1px solid #e2e8f0', background: '#ffffff', color: '#475569', cursor: 'pointer', fontSize: 14, fontWeight: 600, transition: 'all 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }} onMouseOver={e => { e.target.style.background = '#f1f5f9'; e.target.style.color = '#0f172a'; }} onMouseOut={e => { e.target.style.background = '#ffffff'; e.target.style.color = '#475569'; }}>Logout</button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
