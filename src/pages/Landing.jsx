import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="page-transition" style={{ display: 'flex', minHeight: '100vh', width: '100vw', fontFamily: "'Inter', system-ui, sans-serif", background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)', color: '#ffffff', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', maxWidth: 800, padding: '0 24px' }}>
        <h1 style={{ fontWeight: 800, fontSize: 56, marginBottom: 24, lineHeight: 1.1, letterSpacing: '-1px' }}>
          Task Management
        </h1>
        <p style={{ fontSize: 24, marginBottom: 48, color: '#e0f2fe', lineHeight: 1.5, fontWeight: 400 }}>
          Manage your tasks, track your progress, and collaborate seamlessly in one professional workspace.
        </p>
        <button
          onClick={() => navigate('/login')}
          style={{
            padding: '16px 48px',
            fontSize: 20,
            fontWeight: 600,
            borderRadius: 8,
            border: 'none',
            background: '#ffffff',
            color: '#1e40af',
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)',
          }}
          onMouseOver={e => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 15px 30px -5px rgba(0, 0, 0, 0.3)';
          }}
          onMouseOut={e => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.2)';
          }}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Landing;
