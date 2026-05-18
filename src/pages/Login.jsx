import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Login = () => {
  const navigate = useNavigate();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [authError, setAuthError] = useState('');
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    full_name: '',
    preferred_name: '',
    student_number: '',
    email: '',
    department: '',
    course: '',
    password: '',
    confirmPassword: ''
  });

  const departments = [
    'Accountancy', 'Applied Information Systems', 'Business Management',
    'Economics and Econometrics', 'Finance & Investment Management',
    'Information & Knowledge Management', 'Public Management & Governance',
    'Hospitality', 'Commercial Accountancy', 'Industrial Psychology',
    'Marketing', 'Transport & Supply Chain Management', 'Tourism'
  ];

  useEffect(() => {
    const token = localStorage.getItem('ujconnect_token');
    if (token) {
      navigate('/dashboard', { replace: true });
    }
    setCheckingAuth(false);
  }, [navigate]);

  const handleGetStarted = () => {
    if (termsAccepted) {
      const token = localStorage.getItem('ujconnect_token');
      if (token) {
        navigate('/dashboard');
      } else {
        setShowAuth(true);
        setIsSignUp(true);
        setStep(1);
      }
    }
  };

  const handleAuthChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setAuthError('');
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsAuthLoading(true);
    setAuthError('');

    if (formData.password !== formData.confirmPassword) {
      setAuthError('Passwords do not match');
      setIsAuthLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setAuthError('Password must be at least 8 characters');
      setIsAuthLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(`${API_URL}/api/auth/register`, {
        full_name: formData.full_name,
        preferred_name: formData.preferred_name,
        student_number: formData.student_number,
        email: formData.email,
        department: formData.department,
        course: formData.course,
        password: formData.password
      });

      localStorage.setItem('ujconnect_user', JSON.stringify(data.user));
      localStorage.setItem('ujconnect_token', data.token);
      setShowAuth(false);
      window.location.href = '/dashboard';
    } catch (err) {
      setAuthError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsAuthLoading(true);
    setAuthError('');

    try {
      const { data } = await axios.post(`${API_URL}/api/auth/login`, {
        email: formData.email,
        password: formData.password
      });

      localStorage.setItem('ujconnect_user', JSON.stringify(data.user));
      localStorage.setItem('ujconnect_token', data.token);
      setShowAuth(false);
      window.location.href = '/dashboard';
    } catch (err) {
      setAuthError(err.response?.data?.error || 'Invalid email or password');
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleAuthSubmit = (e) => {
    if (isSignUp) {
      handleSignUp(e);
    } else {
      handleSignIn(e);
    }
  };

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    setAuthError('');
    setStep(1);
    setFormData(prev => ({
      ...prev,
      password: '',
      confirmPassword: ''
    }));
  };

  if (checkingAuth) return null;

  return (
    <div style={{
      minHeight: '100vh',
      background: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative'
    }}>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 30%, rgba(255,107,0,0.03) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,107,0,0.03) 0%, transparent 40%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div style={{
        maxWidth: '540px',
        width: '100%',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ marginBottom: '60px' }}>
          <div style={{
            width: '50px',
            height: '50px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #FF6B00, #FF8C42)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 800,
            fontSize: '22px'
          }}>UJ</div>
        </div>

        <h1 style={{
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          fontSize: '38px',
          fontWeight: 700,
          lineHeight: 1.2,
          marginBottom: '48px',
          letterSpacing: '-0.5px',
          color: '#1a1a1a',
          maxWidth: '400px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          Connect. Collaborate. Create.
        </h1>

        <button
          onClick={handleGetStarted}
          disabled={!termsAccepted}
          style={{
            background: termsAccepted
              ? 'linear-gradient(135deg, #FF6B00 0%, #FF8C42 100%)'
              : 'linear-gradient(135deg, #b3b3b3 0%, #999999 100%)',
            color: 'white',
            border: 'none',
            padding: '18px 48px',
            fontFamily: 'inherit',
            fontSize: '17px',
            fontWeight: 600,
            borderRadius: '12px',
            cursor: termsAccepted ? 'pointer' : 'not-allowed',
            transition: 'all 0.3s ease',
            minWidth: '200px',
            opacity: termsAccepted ? 1 : 0.7,
            pointerEvents: termsAccepted ? 'auto' : 'none',
            boxShadow: termsAccepted ? '0 8px 25px rgba(255, 107, 0, 0.25)' : 'none'
          }}
        >
          Get started
        </button>

        <div style={{ marginTop: '16px' }}>
          <label style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            fontFamily: 'inherit',
            fontSize: '13px',
            color: '#888',
            userSelect: 'none'
          }}>
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              style={{ width: '15px', height: '15px', cursor: 'pointer', accentColor: '#FF6B00', margin: 0 }}
            />
            <span>
              I agree to the{' '}
              <a href="/terms" style={{ color: '#FF6B00', textDecoration: 'none', fontWeight: 500 }}>Terms</a>
              {' '}&{' '}
              <a href="/privacy" style={{ color: '#FF6B00', textDecoration: 'none', fontWeight: 500 }}>Privacy Policy</a>
            </span>
          </label>
        </div>

        <div style={{ marginTop: '12px' }}>
          <button
            onClick={() => { setShowAuth(true); setIsSignUp(false); }}
            style={{
              background: 'none',
              border: 'none',
              color: '#1a1a1a',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
              fontFamily: 'inherit',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
              textDecorationThickness: '1px'
            }}
          >
            Already have an account? Sign In
          </button>
        </div>

        <p style={{
          marginTop: '48px',
          color: '#ccc',
          fontSize: '13px',
          fontFamily: 'inherit',
          letterSpacing: '0.5px'
        }}>
          UJ Connect 2026
        </p>
      </div>

      {/* AUTH MODAL */}
      {showAuth && (
        <div
          onClick={() => setShowAuth(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
            padding: '20px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'white',
              borderRadius: '20px',
              padding: '32px 28px 24px',
              width: '100%',
              maxWidth: '420px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              position: 'relative'
            }}
          >
            <button
              onClick={() => setShowAuth(false)}
              style={{
                position: 'absolute',
                top: '14px',
                right: '18px',
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#999',
                lineHeight: 1
              }}
            >×</button>

            <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#1a1a1a', marginBottom: '4px', textAlign: 'center' }}>
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h2>

            {isSignUp && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', margin: '16px 0 24px' }}>
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    style={{
                      width: s === step ? '24px' : '8px',
                      height: '8px',
                      borderRadius: '4px',
                      background: s <= step ? '#FF6B00' : '#e2e8f0',
                      transition: 'all 0.3s ease'
                    }}
                  />
                ))}
              </div>
            )}

            {!isSignUp && (
              <p style={{ fontSize: '13px', color: '#888', textAlign: 'center', marginBottom: '24px', marginTop: '8px' }}>
                Sign in to your account
              </p>
            )}

            {authError && (
              <div style={{ background: '#fff5f5', border: '1px solid #feb2b2', color: '#c53030', padding: '10px 14px', borderRadius: '10px', fontSize: '13px', marginBottom: '16px', textAlign: 'center' }}>
                {authError}
              </div>
            )}

            <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {!isSignUp && (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'left' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#4a5568' }}>Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleAuthChange} required placeholder="you@student.uj.ac.za" style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', boxSizing: 'border-box', fontFamily: 'inherit' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'left' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#4a5568' }}>Password</label>
                    <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleAuthChange} required placeholder="Your password" style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', boxSizing: 'border-box', fontFamily: 'inherit' }} />
                  </div>
                </>
              )}

              {isSignUp && step === 1 && (
                <>
                  <p style={{ fontSize: '12px', fontWeight: 600, color: '#aaa', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Personal Information</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'left' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#4a5568' }}>Full Name</label>
                    <input type="text" name="full_name" value={formData.full_name} onChange={handleAuthChange} required placeholder="Neo Mashigo" style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', boxSizing: 'border-box', fontFamily: 'inherit' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'left' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#4a5568' }}>Preferred Name <span style={{ color: '#aaa', fontWeight: 400 }}>(optional)</span></label>
                    <input type="text" name="preferred_name" value={formData.preferred_name} onChange={handleAuthChange} placeholder="What should we call you?" style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', boxSizing: 'border-box', fontFamily: 'inherit' }} />
                  </div>
                </>
              )}

              {isSignUp && step === 2 && (
                <>
                  <p style={{ fontSize: '12px', fontWeight: 600, color: '#aaa', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Student Details</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'left' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#4a5568' }}>Student Number</label>
                    <input type="text" name="student_number" value={formData.student_number} onChange={handleAuthChange} required placeholder="222067545" style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', boxSizing: 'border-box', fontFamily: 'inherit' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'left' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#4a5568' }}>Department</label>
                    <select name="department" value={formData.department} onChange={handleAuthChange} required style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', boxSizing: 'border-box', fontFamily: 'inherit', background: 'white', cursor: 'pointer' }}>
                      <option value="">Select your department</option>
                      {departments.map(dept => (<option key={dept} value={dept}>{dept}</option>))}
                    </select>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'left' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#4a5568' }}>Course <span style={{ color: '#aaa', fontWeight: 400 }}>(optional)</span></label>
                    <input type="text" name="course" value={formData.course} onChange={handleAuthChange} placeholder="e.g. BCom Information Management" style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', boxSizing: 'border-box', fontFamily: 'inherit' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'left' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#4a5568' }}>Student Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleAuthChange} required placeholder="222067545@student.uj.ac.za" style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', boxSizing: 'border-box', fontFamily: 'inherit' }} />
                  </div>
                </>
              )}

              {isSignUp && step === 3 && (
                <>
                  <p style={{ fontSize: '12px', fontWeight: 600, color: '#aaa', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Security</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'left' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#4a5568' }}>Password</label>
                    <div style={{ position: 'relative' }}>
                      <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleAuthChange} required placeholder="Min. 8 characters" style={{ width: '100%', padding: '12px 44px 12px 14px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', boxSizing: 'border-box', fontFamily: 'inherit' }} />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '4px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', padding: '6px 8px' }}>{showPassword ? '🙈' : '👁️'}</button>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'left' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#4a5568' }}>Confirm Password</label>
                    <div style={{ position: 'relative' }}>
                      <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" value={formData.confirmPassword} onChange={handleAuthChange} required placeholder="Re-enter your password" style={{ width: '100%', padding: '12px 44px 12px 14px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', boxSizing: 'border-box', fontFamily: 'inherit' }} />
                      <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{ position: 'absolute', right: '4px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', padding: '6px 8px' }}>{showConfirmPassword ? '🙈' : '👁️'}</button>
                    </div>
                  </div>
                </>
              )}

              {isSignUp ? (
                <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                  {step > 1 && (
                    <button type="button" onClick={prevStep} style={{ flex: 1, padding: '13px', background: '#f5f5f5', color: '#666', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Back</button>
                  )}
                  {step < 3 ? (
                    <button type="button" onClick={nextStep} style={{ flex: 1, padding: '13px', background: 'linear-gradient(135deg, #FF6B00, #FF8C42)', color: 'white', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 6px 18px rgba(255, 107, 0, 0.25)' }}>Next</button>
                  ) : (
                    <button type="submit" disabled={isAuthLoading} style={{ flex: 1, padding: '13px', background: 'linear-gradient(135deg, #FF6B00, #FF8C42)', color: 'white', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: 600, cursor: isAuthLoading ? 'not-allowed' : 'pointer', fontFamily: 'inherit', opacity: isAuthLoading ? 0.7 : 1, boxShadow: '0 6px 18px rgba(255, 107, 0, 0.25)' }}>{isAuthLoading ? 'Creating...' : 'Create Account'}</button>
                  )}
                </div>
              ) : (
                <button type="submit" disabled={isAuthLoading} style={{ width: '100%', padding: '13px', background: 'linear-gradient(135deg, #FF6B00, #FF8C42)', color: 'white', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: 600, cursor: isAuthLoading ? 'not-allowed' : 'pointer', marginTop: '6px', fontFamily: 'inherit', opacity: isAuthLoading ? 0.7 : 1, boxShadow: '0 6px 18px rgba(255, 107, 0, 0.25)' }}>{isAuthLoading ? 'Signing in...' : 'Sign In'}</button>
              )}
            </form>

            <div style={{ textAlign: 'center', marginTop: '14px', paddingTop: '14px', borderTop: '1px solid #eee' }}>
              <button onClick={toggleAuthMode} style={{ background: 'none', border: 'none', color: '#1a1a1a', fontSize: '13px', fontWeight: 500, cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: '3px', fontFamily: 'inherit' }}>
                {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;