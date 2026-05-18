import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const ArrowLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/>
    <polyline points="12 19 5 12 12 5"/>
  </svg>
);

const Profile = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const currentUser = JSON.parse(localStorage.getItem('ujconnect_user') || '{}');
  const token = localStorage.getItem('ujconnect_token');
  const isOwner = !userId || userId === String(currentUser.id);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    full_name: '',
    preferred_name: '',
    department: '',
    course: '',
    bio: '',
    skills: ''
  });

  const departments = [
    'Accountancy', 'Applied Information Systems', 'Business Management',
    'Economics and Econometrics', 'Finance & Investment Management',
    'Information & Knowledge Management', 'Public Management & Governance',
    'Hospitality', 'Commercial Accountancy', 'Industrial Psychology',
    'Marketing', 'Transport & Supply Chain Management', 'Tourism'
  ];

  useEffect(() => {
    fetchProfile();
  }, [userId]);

  const fetchProfile = async () => {
    try {
      const id = isOwner ? currentUser.id : userId;
      const { data } = await axios.get(`${API_URL}/api/users/${id}`);
      setUser(data);
      setForm({
        full_name: data.full_name || '',
        preferred_name: data.preferred_name || '',
        department: data.department || '',
        course: data.course || '',
        bio: data.bio || '',
        skills: data.skills ? data.skills.join(', ') : ''
      });
    } catch (err) {
      setError('Could not load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      const skillsArray = form.skills.split(',').map(s => s.trim()).filter(s => s.length > 0);
      const { data } = await axios.put(
        `${API_URL}/api/users/${currentUser.id}`,
        { ...form, skills: skillsArray },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(data);
      localStorage.setItem('ujconnect_user', JSON.stringify(data));
      setEditing(false);
    } catch (err) {
      setError('Failed to save. Try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleMessage = () => {
    navigate('/messages', { state: { userId: user.id, name: user.preferred_name || user.full_name } });
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '30px', height: '30px', border: '3px solid #eee', borderTopColor: '#FF6B00', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      </div>
    );
  }

  const displayName = user?.preferred_name || user?.full_name || 'Student';
  const secondaryName = user?.preferred_name ? user.full_name : null;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'white',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      {/* Header */}
      <div style={{
        padding: '12px 20px',
        borderBottom: '1px solid #eee',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        position: 'sticky',
        top: 0,
        background: 'white',
        zIndex: 10
      }}>
        <button onClick={handleBack} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#333', padding: '4px' }}>
          <ArrowLeftIcon />
        </button>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>{displayName}</h2>
          {secondaryName && (
            <p style={{ fontSize: '13px', color: '#888', margin: 0 }}>{secondaryName}</p>
          )}
        </div>
        {isOwner && !editing && (
          <button
            onClick={() => setEditing(true)}
            style={{
              marginLeft: 'auto',
              background: 'none',
              border: '1.5px solid #e2e8f0',
              padding: '6px 16px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: 600,
              color: '#333',
              cursor: 'pointer',
              fontFamily: 'inherit'
            }}
          >
            Edit profile
          </button>
        )}
        {!isOwner && (
          <button
            onClick={handleMessage}
            style={{
              marginLeft: 'auto',
              background: '#FF6B00',
              color: 'white',
              border: 'none',
              padding: '8px 18px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'inherit'
            }}
          >
            Message
          </button>
        )}
      </div>

      {/* Profile Content */}
      <div style={{ padding: '24px 20px' }}>
        {error && (
          <div style={{ background: '#fff5f5', border: '1px solid #feb2b2', color: '#c53030', padding: '10px 14px', borderRadius: '10px', fontSize: '13px', marginBottom: '16px', textAlign: 'center' }}>
            {error}
          </div>
        )}

        {/* Avatar */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FF6B00, #FF8C42)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 700,
            fontSize: '32px'
          }}>
            {displayName.charAt(0)}
          </div>
        </div>

        {editing ? (
          /* EDIT MODE */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: '#4a5568', display: 'block', marginBottom: '4px' }}>Full Name</label>
              <input type="text" name="full_name" value={form.full_name} onChange={handleChange} style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', fontFamily: 'inherit', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: '#4a5568', display: 'block', marginBottom: '4px' }}>Preferred Name</label>
              <input type="text" name="preferred_name" value={form.preferred_name} onChange={handleChange} placeholder="What should we call you?" style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', fontFamily: 'inherit', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: '#4a5568', display: 'block', marginBottom: '4px' }}>Department</label>
              <select name="department" value={form.department} onChange={handleChange} style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', fontFamily: 'inherit', background: 'white', boxSizing: 'border-box' }}>
                <option value="">Select department</option>
                {departments.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: '#4a5568', display: 'block', marginBottom: '4px' }}>Course</label>
              <input type="text" name="course" value={form.course} onChange={handleChange} placeholder="e.g. BCom Information Management" style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', fontFamily: 'inherit', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: '#4a5568', display: 'block', marginBottom: '4px' }}>Bio</label>
              <textarea name="bio" value={form.bio} onChange={handleChange} rows={4} placeholder="Tell us about yourself..." style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', fontFamily: 'inherit', resize: 'none', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: '#4a5568', display: 'block', marginBottom: '4px' }}>Skills</label>
              <input type="text" name="skills" value={form.skills} onChange={handleChange} placeholder="HTML, CSS, React, Python" style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', fontFamily: 'inherit', boxSizing: 'border-box' }} />
              <p style={{ fontSize: '11px', color: '#aaa', marginTop: '4px' }}>Separate with commas</p>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
              <button onClick={() => { setEditing(false); setForm({ full_name: user.full_name || '', preferred_name: user.preferred_name || '', department: user.department || '', course: user.course || '', bio: user.bio || '', skills: user.skills ? user.skills.join(', ') : '' }); }} style={{ flex: 1, padding: '13px', background: '#f5f5f5', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', color: '#666' }}>
                Cancel
              </button>
              <button onClick={handleSave} disabled={saving} style={{ flex: 1, padding: '13px', background: '#FF6B00', color: 'white', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: 600, cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'inherit', opacity: saving ? 0.7 : 1 }}>
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        ) : (
          /* VIEW MODE */
          <>
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 700, margin: '0 0 4px' }}>{displayName}</h2>
              {secondaryName && (
                <p style={{ fontSize: '15px', color: '#888', margin: 0 }}>{secondaryName}</p>
              )}
              <p style={{ fontSize: '14px', color: '#666', margin: '4px 0 0' }}>@{user?.student_number || 'student'}</p>
            </div>

            {user?.bio && (
              <p style={{ fontSize: '15px', lineHeight: 1.5, color: '#333', marginBottom: '20px' }}>{user.bio}</p>
            )}

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
              {user?.department && (
                <span style={{ background: '#f5f5f5', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', color: '#555', fontWeight: 500 }}>
                  📚 {user.department}
                </span>
              )}
              {user?.course && (
                <span style={{ background: '#f5f5f5', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', color: '#555', fontWeight: 500 }}>
                  🎓 {user.course}
                </span>
              )}
            </div>

            {user?.skills && user.skills.length > 0 && (
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#333', marginBottom: '10px' }}>Skills</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {user.skills.map((skill, i) => (
                    <span key={i} style={{ background: '#FFF7ED', color: '#FF6B00', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 500 }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div style={{ borderTop: '1px solid #eee', paddingTop: '20px' }}>
              <div style={{ display: 'flex', gap: '24px', color: '#666', fontSize: '14px' }}>
                <span><strong style={{ color: '#333' }}>0</strong> Posts</span>
                <span><strong style={{ color: '#333' }}>0</strong> Projects</span>
                <span><strong style={{ color: '#333' }}>0</strong> Communities</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;