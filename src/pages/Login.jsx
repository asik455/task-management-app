import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const { signInWithGoogle, signInWithEmail, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.includes('@') || !email.includes('.')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    if (email && password) {
      setIsSubmitting(true);
      try {
        await signInWithEmail(email, password);
      } catch (err) {
        setErrorMsg('Invalid email or password. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMsg('');
    setIsSubmitting(true);
    try {
      await signInWithGoogle();
    } catch (err) {
      setErrorMsg('Failed to sign in with Google.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-transition" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f8fafc',
      backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(56, 189, 248, 0.15), transparent 50%), radial-gradient(circle at 100% 100%, rgba(59, 130, 246, 0.1), transparent 50%)',
      fontFamily: "'Inter', system-ui, sans-serif",
      color: '#0f172a',
      padding: 24
    }}>
      <div style={{
        width: '100%',
        maxWidth: 560,
        textAlign: 'center',
        background: '#ffffff',
        borderRadius: 24,
        boxShadow: '0 20px 40px -12px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(15, 23, 42, 0.05)',
        padding: '64px 56px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Top accent line */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #0ea5e9 0%, #3b82f6 100%)' }} />
        
        <div style={{ width: 64, height: 64, background: 'linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%)', borderRadius: 16, margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(56, 189, 248, 0.15)' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
        </div>
        
        <h2 style={{ marginBottom: 8, fontWeight: 800, fontSize: 32, letterSpacing: '-0.5px', color: '#0f172a' }}>Welcome Back</h2>
        <p style={{ marginBottom: 32, color: '#64748b', fontSize: 18 }}>Sign in to continue to Task Manager</p>

        {errorMsg && <div style={{ background: '#fef2f2', color: '#ef4444', padding: '12px', borderRadius: 8, marginBottom: 20, fontSize: 14, fontWeight: 500 }}>{errorMsg}</div>}

        <form autoComplete="off" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24, textAlign: 'left' }}>
          <div>
            <label style={{ display: 'block', fontSize: 16, fontWeight: 600, color: '#475569', marginBottom: 8 }}>Email ID</label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="off"
              style={{
                width: '100%',
                padding: '16px 20px',
                borderRadius: 10,
                border: '1px solid #e2e8f0',
                fontSize: 18,
                outline: 'none',
                transition: 'border-color 0.2s',
                boxSizing: 'border-box'
              }}
              onFocus={e => e.target.style.borderColor = '#3b82f6'}
              onBlur={e => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 16, fontWeight: 600, color: '#475569', marginBottom: 8 }}>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              style={{
                width: '100%',
                padding: '16px 20px',
                borderRadius: 10,
                border: '1px solid #e2e8f0',
                fontSize: 18,
                outline: 'none',
                transition: 'border-color 0.2s',
                boxSizing: 'border-box'
              }}
              onFocus={e => e.target.style.borderColor = '#3b82f6'}
              onBlur={e => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '18px 0',
              marginTop: 12,
              fontSize: 18,
              fontWeight: 600,
              borderRadius: 10,
              border: 'none',
              background: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)',
              color: '#ffffff',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
              transition: 'transform 0.1s'
            }}
            onMouseDown={e => { if(!isSubmitting) e.target.style.transform = 'scale(0.98)'; }}
            onMouseUp={e => e.target.style.transform = 'scale(1)'}
            onMouseLeave={e => e.target.style.transform = 'scale(1)'}
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <div style={{ flex: 1, height: 1, background: '#e2e8f0' }} />
          <span style={{ fontSize: 14, color: '#94a3b8', fontWeight: 500 }}>or continue with</span>
          <div style={{ flex: 1, height: 1, background: '#e2e8f0' }} />
        </div>
        
        <button
          onClick={handleGoogleSignIn}
          disabled={isSubmitting}
          style={{
            width: '100%',
            padding: '18px 0',
            fontSize: 18,
            fontWeight: 600,
            borderRadius: 12,
            border: '1px solid #e2e8f0',
            background: '#ffffff',
            color: '#334155',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            transition: 'all 0.2s ease',
            boxShadow: '0 2px 4px rgba(15, 23, 42, 0.04)',
            marginBottom: 24
          }}
          onMouseOver={e => {
            if(!isSubmitting) {
              e.target.style.background = '#f8fafc';
              e.target.style.borderColor = '#cbd5e1';
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.boxShadow = '0 4px 6px rgba(15, 23, 42, 0.06)';
            }
          }}
          onMouseOut={e => {
            if(!isSubmitting) {
              e.target.style.background = '#ffffff';
              e.target.style.borderColor = '#e2e8f0';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 2px 4px rgba(15, 23, 42, 0.04)';
            }
          }}
          onMouseDown={e => {
            if(!isSubmitting) {
              e.target.style.transform = 'translateY(1px)';
              e.target.style.boxShadow = 'none';
            }
          }}
        >
          <svg width="22" height="22" viewBox="0 0 48 48">
            <g>
              <path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.7 33.1 30.1 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c2.7 0 5.2.9 7.2 2.5l6.4-6.4C33.5 5.1 28.1 3 24 3 12.9 3 4 11.9 4 23s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.2-4z"/>
              <path fill="#34A853" d="M6.3 14.7l6.6 4.8C14.3 16.1 18.7 13 24 13c2.7 0 5.2.9 7.2 2.5l6.4-6.4C33.5 5.1 28.1 3 24 3c-7.7 0-14.3 4.4-17.7 10.7z"/>
              <path fill="#FBBC05" d="M24 43c6.1 0 10.7-2 14.2-5.5l-6.6-5.4C30.1 36 25.7 39 24 39c-5.3 0-9.7-3.1-11.7-7.5l-6.6 5.1C9.7 38.6 16.3 43 24 43z"/>
              <path fill="#EA4335" d="M44.5 20H24v8.5h11.7c-1.2 3.2-4.7 7.5-11.7 7.5-6.6 0-12-5.4-12-12s5.4-12 12-12c2.7 0 5.2.9 7.2 2.5l6.4-6.4C33.5 5.1 28.1 3 24 3c-7.7 0-14.3 4.4-17.7 10.7l6.6 4.8C14.3 16.1 18.7 13 24 13c2.7 0 5.2.9 7.2 2.5l6.4-6.4C33.5 5.1 28.1 3 24 3c-7.7 0-14.3 4.4-17.7 10.7z"/>
            </g>
          </svg>
          Google
        </button>

        <p style={{ fontSize: 15, color: '#64748b', margin: 0 }}>
          Don't have an account? <Link to="/signup" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 600 }}>Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
