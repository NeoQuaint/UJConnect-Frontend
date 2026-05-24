import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying');
  const [error, setError] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setStatus('error');
      setError('No verification token found.');
      return;
    }

    axios.get(`${API_URL}/api/auth/verify?token=${token}`)
      .then(({ data }) => {
        // Update localStorage with verified user
        localStorage.setItem('ujconnect_user', JSON.stringify(data.user));
        localStorage.setItem('ujconnect_token', data.token);
        setStatus('success');
        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 2000);
      })
      .catch(err => {
        setStatus('error');
        setError(err.response?.data?.error || 'Verification failed. The link may have expired.');
      });
  }, [searchParams, navigate]);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{ textAlign: 'center', maxWidth: '400px' }}>
        <div style={{ marginBottom: '20px' }}>
          {status === 'verifying' ? (
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: '#FFF7ED',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px'
            }}>
              <div style={{
                width: '24px',
                height: '24px',
                border: '3px solid #eee',
                borderTopColor: '#FF6B00',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite'
              }} />
            </div>
          ) : status === 'success' ? (
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: '#f0fdf4',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px'
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
          ) : (
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: '#fef2f2',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px'
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </div>
          )}
        </div>

        <h2 style={{
          fontSize: '22px',
          fontWeight: 700,
          marginBottom: '8px',
          color: '#1a1a1a'
        }}>
          {status === 'verifying'
            ? 'Verifying your email...'
            : status === 'success'
              ? 'Email Verified!'
              : 'Verification Failed'}
        </h2>

        <p style={{
          color: '#888',
          fontSize: '14px',
          lineHeight: 1.5,
          marginBottom: '24px'
        }}>
          {status === 'verifying'
            ? 'Please wait while we verify your account...'
            : status === 'success'
              ? 'Your account is ready. Taking you to UJ Connect...'
              : error}
        </p>

        {status === 'success' && (
          <div style={{
            width: '100%',
            height: '4px',
            background: '#eee',
            borderRadius: '2px',
            overflow: 'hidden',
            marginBottom: '20px'
          }}>
            <div style={{
              height: '100%',
              background: '#FF6B00',
              borderRadius: '2px',
              animation: 'progress 2s linear forwards'
            }} />
          </div>
        )}

        {status === 'error' && (
          <button
            onClick={() => navigate('/')}
            style={{
              padding: '14px 32px',
              background: '#FF6B00',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'inherit',
              boxShadow: '0 6px 20px rgba(255, 107, 0, 0.25)'
            }}
          >
            Back to Login
          </button>
        )}

        <p style={{
          marginTop: '32px',
          color: '#ccc',
          fontSize: '12px'
        }}>
          UJ Connect 2026
        </p>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default Verify;