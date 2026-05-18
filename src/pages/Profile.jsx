import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const ArrowLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/>
    <polyline points="12 19 5 12 12 5"/>
  </svg>
);

const HomeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

const ProjectsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
  </svg>
);

const CommunitiesIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const ForumsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

const MessagesIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="16"/>
    <line x1="8" y1="12" x2="16" y2="12"/>
  </svg>
);

const FaintPlusIcon = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.5">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const ShieldIcon = ({ year, size = 18, color = '#C0C0C0' }) => {
  const label = year === 'Post Grad' ? 'P' : year?.replace('st','').replace('nd','').replace('rd','').replace('th','');
  return (
    <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
      <span style={{ position: 'absolute', fontSize: size * 0.45, fontWeight: 700, color: color, fontFamily: 'inherit', lineHeight: 1, marginTop: '1px' }}>{label}</span>
    </span>
  );
};

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = useParams();
  const currentUser = JSON.parse(localStorage.getItem('ujconnect_user') || '{}');
  const token = localStorage.getItem('ujconnect_token');
  const isOwner = !userId || userId === String(currentUser.id);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(false);
  const [coverPreview, setCoverPreview] = useState(false);

  const [coverPosX, setCoverPosX] = useState(50);
  const [coverPosY, setCoverPosY] = useState(50);
  const [coverZoom, setCoverZoom] = useState(1);
  const [avatarPosX, setAvatarPosX] = useState(50);
  const [avatarPosY, setAvatarPosY] = useState(50);
  const [avatarZoom, setAvatarZoom] = useState(1);

  const [draggingCover, setDraggingCover] = useState(false);
  const [draggingAvatar, setDraggingAvatar] = useState(false);
  const coverRef = useRef(null);
  const avatarRef = useRef(null);
  const [showAvatarEditor, setShowAvatarEditor] = useState(false);

  const [form, setForm] = useState({
    full_name: '',
    preferred_name: '',
    department: '',
    course: '',
    year: '',
    bio: '',
    skills: '',
    cover_photo: '',
    profile_pic: '',
    cover_position_x: '50',
    cover_position_y: '50',
    cover_zoom: '1',
    profile_position_x: '50',
    profile_position_y: '50',
    profile_zoom: '1',
    dark_mode: 'false'
  });

  const departments = [
    'Accountancy', 'Applied Information Systems', 'Business Management',
    'Economics and Econometrics', 'Finance & Investment Management',
    'Information & Knowledge Management', 'Public Management & Governance',
    'Hospitality', 'Commercial Accountancy', 'Industrial Psychology',
    'Marketing', 'Transport & Supply Chain Management', 'Tourism'
  ];

  const years = ['1st', '2nd', '3rd', '4th', 'Post Grad'];

  useEffect(() => {
    fetchProfile();
  }, [userId]);

  const fetchProfile = async () => {
    try {
      const id = isOwner ? currentUser.id : userId;
      const { data } = await axios.get(`${API_URL}/api/users/${id}`);
      setUser(data);
      const isDark = data.dark_mode === 'true';
      setDarkMode(isDark);
      setForm({
        full_name: data.full_name || '',
        preferred_name: data.preferred_name || '',
        department: data.department || '',
        course: data.course || '',
        year: data.year || '',
        bio: data.bio || '',
        skills: data.skills ? data.skills.join(', ') : '',
        cover_photo: data.cover_photo || '',
        profile_pic: data.profile_pic || '',
        cover_position_x: data.cover_position_x || '50',
        cover_position_y: data.cover_position_y || '50',
        cover_zoom: data.cover_zoom || '1',
        profile_position_x: data.profile_position_x || '50',
        profile_position_y: data.profile_position_y || '50',
        profile_zoom: data.profile_zoom || '1',
        dark_mode: data.dark_mode || 'false'
      });
      if (data.cover_position_x) setCoverPosX(parseFloat(data.cover_position_x));
      if (data.cover_position_y) setCoverPosY(parseFloat(data.cover_position_y));
      if (data.cover_zoom) setCoverZoom(parseFloat(data.cover_zoom));
      if (data.profile_position_x) setAvatarPosX(parseFloat(data.profile_position_x));
      if (data.profile_position_y) setAvatarPosY(parseFloat(data.profile_position_y));
      if (data.profile_zoom) setAvatarZoom(parseFloat(data.profile_zoom));
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
      const saveData = {
        ...form,
        skills: skillsArray,
        cover_position_x: `${Math.round(coverPosX)}`,
        cover_position_y: `${Math.round(coverPosY)}`,
        cover_zoom: `${coverZoom}`,
        profile_position_x: `${Math.round(avatarPosX)}`,
        profile_position_y: `${Math.round(avatarPosY)}`,
        profile_zoom: `${avatarZoom}`,
        dark_mode: darkMode ? 'true' : 'false'
      };
      const { data } = await axios.put(
        `${API_URL}/api/users/${currentUser.id}`,
        saveData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(data);
      localStorage.setItem('ujconnect_user', JSON.stringify(data));
      setEditing(false);
      setShowAvatarEditor(false);
    } catch (err) {
      setError('Failed to save. Try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileUpload = async (file, field) => {
    if (!file) return;
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);
    try {
      const { data } = await axios.post(`${API_URL}/api/upload`, formDataUpload);
      setForm(prev => ({ ...prev, [field]: data.url }));
      if (field === 'profile_pic') {
        setAvatarPosX(50);
        setAvatarPosY(50);
        setAvatarZoom(1);
        setShowAvatarEditor(true);
      }
      if (field === 'cover_photo') {
        setCoverPosX(50);
        setCoverPosY(50);
        setCoverZoom(1);
      }
    } catch (err) {
      setError('Failed to upload image');
    }
  };

  const handleCoverDragStart = (e) => {
    e.preventDefault();
    setDraggingCover(true);
    const startX = e.clientX || e.touches?.[0]?.clientX;
    const startY = e.clientY || e.touches?.[0]?.clientY;
    const startPX = coverPosX;
    const startPY = coverPosY;
    const rect = coverRef.current?.getBoundingClientRect();

    const onMove = (ev) => {
      const currentX = ev.clientX || ev.touches?.[0]?.clientX;
      const currentY = ev.clientY || ev.touches?.[0]?.clientY;
      const deltaX = ((currentX - startX) / rect.width) * 100;
      const deltaY = ((currentY - startY) / rect.height) * 100;
      setCoverPosX(Math.max(0, Math.min(100, startPX + deltaX)));
      setCoverPosY(Math.max(0, Math.min(100, startPY + deltaY)));
    };

    const onEnd = () => {
      setDraggingCover(false);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onEnd);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('touchend', onEnd);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onEnd);
    document.addEventListener('touchmove', onMove);
    document.addEventListener('touchend', onEnd);
  };

  const handleAvatarDragStart = (e) => {
    e.preventDefault();
    setDraggingAvatar(true);
    const startX = e.clientX || e.touches?.[0]?.clientX;
    const startY = e.clientY || e.touches?.[0]?.clientY;
    const startPX = avatarPosX;
    const startPY = avatarPosY;
    const rect = avatarRef.current?.getBoundingClientRect();

    const onMove = (ev) => {
      const currentX = ev.clientX || ev.touches?.[0]?.clientX;
      const currentY = ev.clientY || ev.touches?.[0]?.clientY;
      const deltaX = ((currentX - startX) / rect.width) * 100;
      const deltaY = ((currentY - startY) / rect.height) * 100;
      setAvatarPosX(Math.max(0, Math.min(100, startPX + deltaX)));
      setAvatarPosY(Math.max(0, Math.min(100, startPY + deltaY)));
    };

    const onEnd = () => {
      setDraggingAvatar(false);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onEnd);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('touchend', onEnd);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onEnd);
    document.addEventListener('touchmove', onMove);
    document.addEventListener('touchend', onEnd);
  };

  const handleBack = () => navigate(-1);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/';
  };

  const handleMessage = () => {
    navigate('/messages', { state: { userId: user.id, name: user.preferred_name || user.full_name } });
  };

  const getShieldColor = (year) => {
    if (year === 'Post Grad') return '#D4AF37';
    return '#C0C0C0';
  };

  const tabs = [
    { id: 'home', icon: HomeIcon, label: 'Home' },
    { id: 'projects', icon: ProjectsIcon, label: 'Projects' },
    { id: 'communities', icon: CommunitiesIcon, label: 'Communities' },
    { id: 'forums', icon: ForumsIcon, label: 'Forums' },
    { id: 'messages', icon: MessagesIcon, label: 'Messages' },
  ];

  const handleTabClick = (tabId) => {
    if (tabId === 'home') navigate('/dashboard');
  };

  const theme = {
    bg: darkMode ? '#000' : '#fff',
    text: darkMode ? '#fff' : '#1a1a1a',
    textSecondary: darkMode ? '#aaa' : '#888',
    border: darkMode ? '#222' : '#eee',
    cardBg: darkMode ? '#111' : '#f5f5f5',
    inputBg: darkMode ? '#1a1a1a' : '#f5f5f5',
    inputBorder: darkMode ? '#333' : '#e2e8f0',
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: theme.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '30px', height: '30px', border: `3px solid ${darkMode ? '#333' : '#eee'}`, borderTopColor: '#FF6B00', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      </div>
    );
  }

  const displayName = user?.preferred_name || user?.full_name || 'Student';
  const currentCover = form.cover_photo || user?.cover_photo;
  const currentAvatar = form.profile_pic || user?.profile_pic;

  return (
    <div style={{
      minHeight: '100vh',
      background: theme.bg,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      maxWidth: '600px',
      margin: '0 auto',
      position: 'relative',
      paddingBottom: '80px'
    }}>
      {/* Cover Photo */}
      <div
        ref={coverRef}
        style={{
          width: '100%',
          height: '160px',
          background: currentCover ? `url(${currentCover})` : 'linear-gradient(135deg, #e8e8e8, #d5d5d5)',
          backgroundPosition: currentCover ? `${coverPosX}% ${coverPosY}%` : 'center',
          backgroundSize: currentCover ? `${coverZoom * 100}%` : 'cover',
          backgroundRepeat: 'no-repeat',
          position: 'relative',
          overflow: 'hidden',
          cursor: !editing && currentCover ? 'pointer' : editing && currentCover ? (draggingCover ? 'grabbing' : 'grab') : 'default'
        }}
        onMouseDown={editing && currentCover ? handleCoverDragStart : undefined}
        onTouchStart={editing && currentCover ? handleCoverDragStart : undefined}
        onClick={() => { if (!editing && currentCover) setCoverPreview(true); }}
      >
        {editing && currentCover && (
          <div style={{ position: 'absolute', bottom: '36px', left: '50%', transform: 'translateX(-50%)', zIndex: 5, display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0,0,0,0.6)', borderRadius: '20px', padding: '6px 14px' }}>
            <span style={{ color: 'white', fontSize: '11px', whiteSpace: 'nowrap' }}>Drag</span>
            <input type="range" min="1" max="3" step="0.1" value={coverZoom} onChange={(e) => setCoverZoom(parseFloat(e.target.value))} style={{ width: '60px', accentColor: 'white', cursor: 'pointer' }} />
            <span style={{ color: 'white', fontSize: '11px' }}>Zoom</span>
          </div>
        )}

        {editing && !currentCover && (
          <>
            <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e.target.files[0], 'cover_photo')} style={{ display: 'none' }} id="cover-upload" />
            <label htmlFor="cover-upload" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', cursor: 'pointer', color: 'rgba(255,255,255,0.8)', background: 'rgba(0,0,0,0.3)', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5 }}>
              <FaintPlusIcon size={40} />
            </label>
          </>
        )}

        {editing && currentCover && (
          <>
            <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e.target.files[0], 'cover_photo')} style={{ display: 'none' }} id="cover-replace" />
            <label htmlFor="cover-replace" style={{ position: 'absolute', top: '8px', right: '8px', cursor: 'pointer', color: 'white', background: 'rgba(0,0,0,0.5)', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5, fontSize: '14px' }}>+</label>
          </>
        )}

        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '16px', zIndex: 10 }}>
          <button onClick={handleBack} style={{ background: 'rgba(0,0,0,0.3)', border: 'none', cursor: 'pointer', color: 'white', padding: '8px', borderRadius: '50%', display: 'flex' }}>
            <ArrowLeftIcon />
          </button>
          <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: 'white', textShadow: '0 1px 3px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            {displayName}
            {user?.year && <ShieldIcon year={user.year} size={18} color={getShieldColor(user.year)} />}
          </h2>
          {isOwner && !editing && (
            <button onClick={handleLogout} style={{ marginLeft: 'auto', background: 'rgba(0,0,0,0.3)', border: 'none', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 600, color: 'white', cursor: 'pointer', fontFamily: 'inherit' }}>Logout</button>
          )}
          {!isOwner && (
            <button onClick={handleMessage} style={{ marginLeft: 'auto', background: '#FF6B00', color: 'white', border: 'none', padding: '8px 18px', borderRadius: '20px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Message</button>
          )}
        </div>
      </div>

      {/* Cover Preview Modal */}
      {coverPreview && currentCover && (
        <div onClick={() => setCoverPreview(false)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.95)', zIndex: 4000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <button onClick={() => setCoverPreview(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: 'white', cursor: 'pointer', zIndex: 5 }}><CloseIcon /></button>
          <img src={currentCover} alt="Cover" style={{ maxWidth: '100%', maxHeight: '80vh', borderRadius: '8px', objectFit: 'contain' }} />
        </div>
      )}

      {/* Avatar Preview Modal */}
      {avatarPreview && currentAvatar && (
        <div onClick={() => setAvatarPreview(false)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.95)', zIndex: 4000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <button onClick={() => setAvatarPreview(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: 'white', cursor: 'pointer', zIndex: 5 }}><CloseIcon /></button>
          <img src={currentAvatar} alt="Avatar" style={{ width: '300px', height: '300px', borderRadius: '50%', objectFit: 'cover', border: '4px solid rgba(255,255,255,0.2)' }} />
        </div>
      )}

      {/* Avatar Editor Modal */}
      {showAvatarEditor && editing && currentAvatar && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.9)', zIndex: 3000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ color: 'white', fontSize: '14px', marginBottom: '20px', textAlign: 'center' }}>Drag to position, use slider to zoom</div>
          <div
            ref={avatarRef}
            style={{ width: '280px', height: '280px', borderRadius: '50%', background: `url(${currentAvatar})`, backgroundPosition: `${avatarPosX}% ${avatarPosY}%`, backgroundSize: `${avatarZoom * 100}%`, backgroundRepeat: 'no-repeat', cursor: draggingAvatar ? 'grabbing' : 'grab', border: '2px solid rgba(255,255,255,0.3)', overflow: 'hidden' }}
            onMouseDown={handleAvatarDragStart}
            onTouchStart={handleAvatarDragStart}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '20px', color: 'white' }}>
            <span style={{ fontSize: '13px' }}>Zoom</span>
            <input type="range" min="1" max="4" step="0.1" value={avatarZoom} onChange={(e) => setAvatarZoom(parseFloat(e.target.value))} style={{ width: '150px', accentColor: '#FF6B00' }} />
          </div>
          <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
            <button onClick={() => setShowAvatarEditor(false)} style={{ padding: '12px 30px', background: 'rgba(255,255,255,0.15)', color: 'white', border: 'none', borderRadius: '24px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
            <button onClick={() => setShowAvatarEditor(false)} style={{ padding: '12px 30px', background: '#FF6B00', color: 'white', border: 'none', borderRadius: '24px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Done</button>
          </div>
        </div>
      )}

      {/* Profile Content */}
      <div style={{ padding: '0 20px', position: 'relative' }}>
        <div
          style={{
            width: '96px',
            height: '96px',
            borderRadius: '50%',
            background: currentAvatar ? `url(${currentAvatar})` : 'linear-gradient(135deg, #FF6B00, #FF8C42)',
            backgroundPosition: currentAvatar ? `${avatarPosX}% ${avatarPosY}%` : 'center',
            backgroundSize: currentAvatar ? `${avatarZoom * 100}%` : 'cover',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 700,
            fontSize: '38px',
            border: `4px solid ${theme.bg}`,
            marginTop: '-48px',
            position: 'relative',
            zIndex: 5,
            overflow: 'hidden',
            cursor: !editing && currentAvatar ? 'pointer' : 'default'
          }}
          onClick={() => { if (!editing && currentAvatar) setAvatarPreview(true); }}
        >
          {!currentAvatar && displayName.charAt(0)}

          {editing && !currentAvatar && (
            <>
              <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e.target.files[0], 'profile_pic')} style={{ display: 'none' }} id="avatar-upload" />
              <label htmlFor="avatar-upload" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.2)', color: 'rgba(255,255,255,0.8)' }}>
                <FaintPlusIcon size={36} />
              </label>
            </>
          )}

          {editing && currentAvatar && (
            <>
              <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e.target.files[0], 'profile_pic')} style={{ display: 'none' }} id="avatar-replace" />
              <label htmlFor="avatar-replace" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.15)', color: 'rgba(255,255,255,0.6)' }}>
                <FaintPlusIcon size={28} />
              </label>
              <button onClick={() => setShowAvatarEditor(true)} style={{ position: 'absolute', bottom: '0', left: 0, right: 0, background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', padding: '4px', fontSize: '10px', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'center' }}>Edit</button>
            </>
          )}
        </div>

        <div style={{ marginTop: '12px', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 2px', display: 'flex', alignItems: 'center', gap: '8px', color: theme.text }}>
            {displayName}
            {user?.year && <ShieldIcon year={user.year} size={22} color={getShieldColor(user.year)} />}
          </h2>
          {user?.preferred_name && user?.full_name && (
            <p style={{ fontSize: '14px', color: theme.textSecondary, margin: '0 0 8px' }}>{user.full_name}</p>
          )}
          {isOwner && !editing && (
            <button onClick={() => setEditing(true)} style={{ background: 'none', border: `1.5px solid ${theme.border}`, padding: '6px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: 600, color: theme.textSecondary, cursor: 'pointer', fontFamily: 'inherit' }}>Edit profile</button>
          )}
        </div>

        {user?.bio && !editing && (
          <p style={{ fontSize: '14px', lineHeight: 1.5, color: darkMode ? '#aaa' : '#555', marginBottom: '20px' }}>{user.bio}</p>
        )}

        {error && (
          <div style={{ background: '#fff5f5', border: '1px solid #feb2b2', color: '#c53030', padding: '10px 14px', borderRadius: '10px', fontSize: '13px', marginBottom: '16px', textAlign: 'center' }}>{error}</div>
        )}

        {editing ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Dark Mode Toggle */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: `1px solid ${theme.border}` }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: theme.text }}>Dark mode</span>
              <button
                onClick={() => setDarkMode(!darkMode)}
                style={{
                  width: '48px',
                  height: '26px',
                  borderRadius: '13px',
                  background: darkMode ? '#FF6B00' : '#d1d5db',
                  border: 'none',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'background 0.3s',
                  padding: 0
                }}
              >
                <span style={{
                  position: 'absolute',
                  top: '3px',
                  left: darkMode ? '25px' : '3px',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: 'white',
                  transition: 'left 0.3s',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                }} />
              </button>
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: theme.textSecondary, display: 'block', marginBottom: '4px' }}>Full Name (optional)</label>
              <input type="text" name="full_name" value={form.full_name} onChange={handleChange} placeholder="Your legal name" style={{ width: '100%', padding: '12px 14px', border: `1.5px solid ${theme.inputBorder}`, borderRadius: '10px', fontSize: '14px', fontFamily: 'inherit', boxSizing: 'border-box', background: theme.inputBg, color: theme.text }} />
            </div>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: theme.textSecondary, display: 'block', marginBottom: '4px' }}>Preferred Name</label>
              <input type="text" name="preferred_name" value={form.preferred_name} onChange={handleChange} placeholder="What should we call you?" style={{ width: '100%', padding: '12px 14px', border: `1.5px solid ${theme.inputBorder}`, borderRadius: '10px', fontSize: '14px', fontFamily: 'inherit', boxSizing: 'border-box', background: theme.inputBg, color: theme.text }} />
            </div>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: theme.textSecondary, display: 'block', marginBottom: '4px' }}>Year</label>
              <select name="year" value={form.year} onChange={handleChange} style={{ width: '100%', padding: '12px 14px', border: `1.5px solid ${theme.inputBorder}`, borderRadius: '10px', fontSize: '14px', fontFamily: 'inherit', background: theme.inputBg, color: theme.text, boxSizing: 'border-box' }}>
                <option value="">Select year</option>
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: theme.textSecondary, display: 'block', marginBottom: '4px' }}>Department</label>
              <select name="department" value={form.department} onChange={handleChange} style={{ width: '100%', padding: '12px 14px', border: `1.5px solid ${theme.inputBorder}`, borderRadius: '10px', fontSize: '14px', fontFamily: 'inherit', background: theme.inputBg, color: theme.text, boxSizing: 'border-box' }}>
                <option value="">Select department</option>
                {departments.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: theme.textSecondary, display: 'block', marginBottom: '4px' }}>Course</label>
              <input type="text" name="course" value={form.course} onChange={handleChange} placeholder="e.g. BCom Information Management" style={{ width: '100%', padding: '12px 14px', border: `1.5px solid ${theme.inputBorder}`, borderRadius: '10px', fontSize: '14px', fontFamily: 'inherit', boxSizing: 'border-box', background: theme.inputBg, color: theme.text }} />
            </div>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: theme.textSecondary, display: 'block', marginBottom: '4px' }}>Bio</label>
              <textarea name="bio" value={form.bio} onChange={handleChange} rows={4} placeholder="Tell us about yourself..." style={{ width: '100%', padding: '12px 14px', border: `1.5px solid ${theme.inputBorder}`, borderRadius: '10px', fontSize: '14px', fontFamily: 'inherit', resize: 'none', boxSizing: 'border-box', background: theme.inputBg, color: theme.text }} />
            </div>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: theme.textSecondary, display: 'block', marginBottom: '4px' }}>Skills</label>
              <input type="text" name="skills" value={form.skills} onChange={handleChange} placeholder="HTML, CSS, React, Python" style={{ width: '100%', padding: '12px 14px', border: `1.5px solid ${theme.inputBorder}`, borderRadius: '10px', fontSize: '14px', fontFamily: 'inherit', boxSizing: 'border-box', background: theme.inputBg, color: theme.text }} />
              <p style={{ fontSize: '11px', color: '#aaa', marginTop: '4px' }}>Separate with commas</p>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
              <button onClick={() => { setEditing(false); setForm({ full_name: user.full_name || '', preferred_name: user.preferred_name || '', department: user.department || '', course: user.course || '', year: user.year || '', bio: user.bio || '', skills: user.skills ? user.skills.join(', ') : '', cover_photo: user.cover_photo || '', profile_pic: user.profile_pic || '', cover_position_x: user.cover_position_x || '50', cover_position_y: user.cover_position_y || '50', cover_zoom: user.cover_zoom || '1', profile_position_x: user.profile_position_x || '50', profile_position_y: user.profile_position_y || '50', profile_zoom: user.profile_zoom || '1', dark_mode: user.dark_mode || 'false' }); setDarkMode(user.dark_mode === 'true'); setShowAvatarEditor(false); }} style={{ flex: 1, padding: '13px', background: theme.cardBg, border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', color: theme.textSecondary }}>Cancel</button>
              <button onClick={handleSave} disabled={saving} style={{ flex: 1, padding: '13px', background: '#FF6B00', color: 'white', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: 600, cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'inherit', opacity: saving ? 0.7 : 1 }}>{saving ? 'Saving...' : 'Save'}</button>
            </div>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
              {user?.department && <span style={{ background: theme.cardBg, padding: '6px 14px', borderRadius: '20px', fontSize: '13px', color: theme.textSecondary, fontWeight: 500 }}>{user.department}</span>}
              {user?.course && <span style={{ background: theme.cardBg, padding: '6px 14px', borderRadius: '20px', fontSize: '13px', color: theme.textSecondary, fontWeight: 500 }}>{user.course}</span>}
            </div>
            {user?.skills && user.skills.length > 0 && (
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: theme.text, marginBottom: '10px' }}>Skills</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {user.skills.map((skill, i) => (
                    <span key={i} style={{ background: '#FFF7ED', color: '#FF6B00', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 500 }}>{skill}</span>
                  ))}
                </div>
              </div>
            )}
            <div style={{ borderTop: `1px solid ${theme.border}`, paddingTop: '20px', marginTop: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-around', color: theme.textSecondary, fontSize: '14px', marginBottom: '16px' }}>
                <span style={{ textAlign: 'center' }}><strong style={{ color: theme.text, display: 'block' }}>0</strong> Posts</span>
                <span style={{ textAlign: 'center' }}><strong style={{ color: theme.text, display: 'block' }}>0</strong> Projects</span>
                <span style={{ textAlign: 'center' }}><strong style={{ color: theme.text, display: 'block' }}>0</strong> Communities</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', color: darkMode ? '#444' : '#ccc', cursor: 'pointer' }}><PlusIcon /></div>
            </div>
          </>
        )}
      </div>

      {/* Bottom Navigation */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '600px',
        background: theme.bg,
        borderTop: `1px solid ${theme.border}`,
        display: 'flex',
        justifyContent: 'space-around',
        padding: '8px 0',
        zIndex: 100,
        paddingBottom: 'max(8px, env(safe-area-inset-bottom))'
      }}>
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = (tab.id === 'home' && location.pathname === '/dashboard');
          return (
            <button key={tab.id} onClick={() => handleTabClick(tab.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: isActive ? '#FF6B00' : theme.textSecondary, fontFamily: 'inherit', transition: 'color 0.2s' }}>
              <Icon />
              <span style={{ fontSize: '10px', fontWeight: isActive ? 600 : 400 }}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Profile;