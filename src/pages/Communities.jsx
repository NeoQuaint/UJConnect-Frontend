import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

const Communities = () => {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem('ujconnect_user') || '{}');
  const [user, setUser] = useState(storedUser);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('ujconnect_dark_mode') === 'true');

  useEffect(() => {
    fetchUserProfile();
    const onStorage = () => setDarkMode(localStorage.getItem('ujconnect_dark_mode') === 'true');
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const fetchUserProfile = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/users/${storedUser.id}`);
      setUser(data);
      localStorage.setItem('ujconnect_user', JSON.stringify(data));
    } catch (err) {}
  };

  const theme = {
    bg: darkMode ? '#000' : '#fff',
    text: darkMode ? '#fff' : '#1a1a1a',
    textSecondary: darkMode ? '#aaa' : '#888',
    border: darkMode ? '#222' : '#eee',
    cardBg: darkMode ? '#111' : '#f5f5f5',
    inputBg: darkMode ? '#1a1a1a' : '#f5f5f5',
  };

  const communities = [
    {
      id: 'src',
      name: 'Student Representative Council',
      description: 'Your voice at UJ. Stay updated with student governance and representation.',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      link: '/src',
      color: '#2563eb'
    },
    {
      id: 'gog',
      name: 'Governing Body',
      description: 'The Governing Body oversees university policies and strategic direction.',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      link: '/gog',
      color: '#dc2626'
    },
    {
      id: 'sports',
      name: 'Sports',
      description: 'From rugby to chess, find all UJ sports teams, schedules, results, and how to join.',
      image: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      link: 'https://www.uj.ac.za/sport/',
      color: '#16a34a'
    },
    {
      id: 'finance',
      name: 'Student Finance',
      description: 'Financial aid, bursaries, budgeting tools, and all money matters for UJ students.',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      link: 'https://www.uj.ac.za/admission-aid/student-finance/',
      color: '#ea580c'
    },
    {
      id: 'engagement',
      name: 'Community Engagement',
      description: 'Make a difference through UJ\'s outreach programs and volunteer opportunities.',
      image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      link: '/engagement',
      color: '#9333ea'
    },
    {
      id: 'accommodation',
      name: 'Student Accommodation',
      description: 'Find information about UJ residences, off-campus housing, and student living communities.',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      link: '/houses',
      color: '#ca8a04'
    }
  ];

  const tabs = [
    { id: 'home', icon: HomeIcon, label: 'Home' },
    { id: 'projects', icon: ProjectsIcon, label: 'Projects' },
    { id: 'communities', icon: CommunitiesIcon, label: 'Communities' },
    { id: 'forums', icon: ForumsIcon, label: 'Forums' },
    { id: 'messages', icon: MessagesIcon, label: 'Messages' },
  ];

  const handleTabClick = (tabId) => {
    if (tabId === 'communities') return;
    if (tabId === 'home') { navigate('/dashboard'); }
    else { navigate(`/${tabId}`); }
  };

  return (
    <div style={{ minHeight: '100vh', background: theme.bg, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', maxWidth: 600, margin: '0 auto', position: 'relative', paddingBottom: '80px' }}>

      {/* Header */}
      <div style={{ padding: '12px 20px', borderBottom: `1px solid ${theme.border}`, position: 'sticky', top: 0, background: theme.bg, zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: theme.text, padding: '4px', display: 'flex' }}>
          <ArrowLeftIcon />
        </button>
        <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: theme.text, position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>Communities</h2>
        <div style={{ width: '28px' }} />
      </div>

      {/* Hero Banner */}
      <div style={{ padding: '20px', borderBottom: `1px solid ${theme.border}` }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: theme.text, marginBottom: '8px' }}>Bridging UJ Communities</h1>
          <p style={{ fontSize: '14px', color: theme.textSecondary, lineHeight: 1.5, maxWidth: '400px', margin: '0 auto' }}>
            Connecting Student Representative Council, Sports, Student Finance, Community Engagement, and Student Accommodations on one unified platform.
          </p>
        </div>
      </div>

      {/* Community Cards */}
      <div style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {communities.map(community => (
            <div
              key={community.id}
              onClick={() => {
                if (community.link.startsWith('http')) {
                  window.open(community.link, '_blank');
                } else {
                  navigate(community.link);
                }
              }}
              style={{
                background: theme.cardBg,
                borderRadius: '12px',
                overflow: 'hidden',
                border: `1px solid ${theme.border}`,
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
            >
              <div style={{
                height: '120px',
                background: `url(${community.image}) center/cover`,
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.7))`
                }} />
                <h3 style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '16px',
                  color: 'white',
                  fontSize: '18px',
                  fontWeight: 700,
                  margin: 0
                }}>
                  {community.name}
                </h3>
              </div>
              <div style={{ padding: '16px' }}>
                <p style={{ fontSize: '14px', color: theme.textSecondary, margin: '0 0 12px', lineHeight: 1.4 }}>
                  {community.description}
                </p>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button style={{
                    background: community.color,
                    color: 'white',
                    border: 'none',
                    padding: '8px 18px',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontFamily: 'inherit'
                  }}>
                    Explore
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div style={{ padding: '20px', borderTop: `1px solid ${theme.border}`, marginTop: '20px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: theme.text, marginBottom: '16px' }}>Quick Links</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {[
            { label: 'UJ Main Website', link: 'https://www.uj.ac.za' },
            { label: 'Student Portal', link: 'https://student.uj.ac.za' },
            { label: 'Library', link: 'https://www.uj.ac.za/library' },
            { label: 'Timetables', link: 'https://www.uj.ac.za/timetables' },
            { label: 'SRC', link: '/src' },
            { label: 'Sports', link: 'https://www.uj.ac.za/sport/' },
            { label: 'Finance', link: 'https://www.uj.ac.za/admission-aid/student-finance/' },
            { label: 'Housing', link: '/houses' },
          ].map((link, i) => (
            <a
              key={i}
              href={link.link.startsWith('http') ? link.link : '#'}
              target={link.link.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              onClick={(e) => {
                if (!link.link.startsWith('http')) {
                  e.preventDefault();
                  navigate(link.link);
                }
              }}
              style={{
                padding: '8px 14px',
                background: theme.cardBg,
                border: `1px solid ${theme.border}`,
                borderRadius: '20px',
                fontSize: '13px',
                color: theme.textSecondary,
                textDecoration: 'none',
                fontWeight: 500
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 600, background: theme.bg, borderTop: `1px solid ${theme.border}`, display: 'flex', justifyContent: 'space-around', padding: '8px 0', zIndex: 100, paddingBottom: 'max(8px, env(safe-area-inset-bottom))' }}>
        {tabs.map(tab => { const Icon = tab.icon; const isActive = (tab.id === 'communities'); return (<button key={tab.id} onClick={() => handleTabClick(tab.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, color: isActive ? '#FF6B00' : theme.textSecondary, fontFamily: 'inherit', transition: 'color 0.2s' }}><Icon /><span style={{ fontSize: 10, fontWeight: isActive ? 600 : 400 }}>{tab.label}</span></button>); })}
      </div>
    </div>
  );
};

export default Communities;