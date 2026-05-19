import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const { signUpWithEmail, user } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
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

    if (email && password && name) {
      setIsSubmitting(true);
      try {
        await signUpWithEmail(email, password, name);
      } catch (err) {
        setErrorMsg(err.message);
      } finally {
        setIsSubmitting(false);
      }
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
        padding: '56px 56px',
        position: 'relative',
        overflow: 'hidden',
        margin: '24px 0'
      }}>
        {/* Top accent line */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #0ea5e9 0%, #3b82f6 100%)' }} />
        
        <h2 style={{ marginBottom: 8, fontWeight: 800, fontSize: 32, letterSpacing: '-0.5px', color: '#0f172a' }}>Create Account</h2>
        <p style={{ marginBottom: 32, color: '#64748b', fontSize: 18 }}>Sign up to start organizing your workflow</p>

        {errorMsg && <div style={{ background: '#fef2f2', color: '#ef4444', padding: '12px', borderRadius: 8, marginBottom: 20, fontSize: 14, fontWeight: 500 }}>{errorMsg}</div>}

        <form autoComplete="off" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24, textAlign: 'left' }}>
          <div>
            <label style={{ display: 'block', fontSize: 16, fontWeight: 600, color: '#475569', marginBottom: 8 }}>Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              style={{ width: '100%', padding: '16px 20px', borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 18, outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box' }}
              onFocus={e => e.target.style.borderColor = '#3b82f6'}
              onBlur={e => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 16, fontWeight: 600, color: '#475569', marginBottom: 8 }}>Email ID</label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="off"
              style={{ width: '100%', padding: '16px 20px', borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 18, outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box' }}
              onFocus={e => e.target.style.borderColor = '#3b82f6'}
              onBlur={e => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 16, fontWeight: 600, color: '#475569', marginBottom: 8 }}>Phone Number</label>
            <input
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              style={{ width: '100%', padding: '16px 20px', borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 18, outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box' }}
              onFocus={e => e.target.style.borderColor = '#3b82f6'}
              onBlur={e => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 16, fontWeight: 600, color: '#475569', marginBottom: 8 }}>Password</label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              style={{ width: '100%', padding: '16px 20px', borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 18, outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box' }}
              onFocus={e => e.target.style.borderColor = '#3b82f6'}
              onBlur={e => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            style={{ width: '100%', padding: '18px 0', marginTop: 12, fontSize: 18, fontWeight: 600, borderRadius: 10, border: 'none', background: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)', color: '#ffffff', cursor: isSubmitting ? 'not-allowed' : 'pointer', boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)', transition: 'transform 0.1s' }}
            onMouseDown={e => { if(!isSubmitting) e.target.style.transform = 'scale(0.98)'; }}
            onMouseUp={e => e.target.style.transform = 'scale(1)'}
            onMouseLeave={e => e.target.style.transform = 'scale(1)'}
          >
            {isSubmitting ? 'Creating...' : 'Create Account'}
          </button>
        </form>

        <p style={{ fontSize: 15, color: '#64748b', margin: 0 }}>
          Already have an account? <Link to="/login" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 600 }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
