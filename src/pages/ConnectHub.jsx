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

const HeartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const CommentIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
  </svg>
);

const ShareIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3"/>
    <circle cx="6" cy="12" r="3"/>
    <circle cx="18" cy="19" r="3"/>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
  </svg>
);

const ConnectHub = () => {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem('ujconnect_user') || '{}');
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('ujconnect_dark_mode') === 'true');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    fetchPosts();
    const onStorage = () => setDarkMode(localStorage.getItem('ujconnect_dark_mode') === 'true');
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/posts`);
      if (data && data.length > 0) {
        setPosts(data);
      } else {
        setDemoContent();
      }
    } catch (err) {
      setDemoContent();
    } finally {
      setLoading(false);
    }
  };

  const setDemoContent = () => {
    setPosts([
      {
        id: 1,
        user_name: 'Thabo M.',
        user_dept: 'Applied Information Systems',
        content: 'Running club this Saturday! 6AM at the track. Who\'s coming?',
        media_url: '/run.mp4',
        media_type: 'video',
        likes_count: 245,
        comments_count: 56,
        created_at: new Date(Date.now() - 3600000).toISOString()
      },
      {
        id: 2,
        user_name: 'Lerato K.',
        user_dept: 'Marketing',
        content: 'Varsity Cup energy! UJ vs Wits was insane',
        media_url: '/run.mp4',
        media_type: 'video',
        likes_count: 532,
        comments_count: 89,
        created_at: new Date(Date.now() - 7200000).toISOString()
      },
      {
        id: 3,
        user_name: 'Sipho N.',
        user_dept: 'Finance',
        content: 'Campus tour vibes! Check out APK',
        media_url: '/campus.mp4',
        media_type: 'video',
        likes_count: 312,
        comments_count: 78,
        created_at: new Date(Date.now() - 10800000).toISOString()
      },
      {
        id: 4,
        user_name: 'Amahle Z.',
        user_dept: 'Information & Knowledge Management',
        content: 'Late night study grind. Library vibes',
        media_url: '/study.mp4',
        media_type: 'video',
        likes_count: 156,
        comments_count: 23,
        created_at: new Date(Date.now() - 14400000).toISOString()
      },
      {
        id: 5,
        user_name: 'Neo M.',
        user_dept: 'Information & Knowledge Management',
        content: 'Running club week 3! Pace is getting better',
        media_url: '/run.mp4',
        media_type: 'video',
        likes_count: 198,
        comments_count: 34,
        created_at: new Date(Date.now() - 18000000).toISOString()
      },
      {
        id: 6,
        user_name: 'Karabo S.',
        user_dept: 'Law',
        content: 'Varsity Cup finals watch party at the student center!',
        media_url: '/campus.mp4',
        media_type: 'video',
        likes_count: 421,
        comments_count: 67,
        created_at: new Date(Date.now() - 21600000).toISOString()
      },
    ]);
  };

  const getFacultyColor = (dept) => {
    const c = ['Applied Information Systems', 'Business Management', 'Economics and Econometrics', 'Finance & Investment Management', 'Information & Knowledge Management', 'Public Management & Governance', 'Hospitality', 'Commercial Accountancy', 'Industrial Psychology', 'Marketing', 'Transport & Supply Chain Management', 'Tourism', 'Accountancy'];
    if (c.some(d => dept?.includes(d))) return '#2563eb';
    if (dept?.includes('Law')) return '#dc2626';
    if (dept?.includes('Science')) return '#16a34a';
    if (dept?.includes('Humanities')) return '#9333ea';
    if (dept?.includes('Health')) return '#ea580c';
    if (dept?.includes('Engineering')) return '#ca8a04';
    return '#666';
  };

  const formatTime = (ds) => {
    const n = new Date(), d = new Date(ds), dm = Math.floor((n - d) / 60000);
    if (dm < 1) return 'Just now';
    if (dm < 60) return `${dm}m`;
    const dh = Math.floor(dm / 60);
    if (dh < 24) return `${dh}h`;
    const dd = Math.floor(dh / 24);
    if (dd === 1) return 'Yesterday';
    if (dd < 7) return `${dd}d`;
    return d.toLocaleDateString('en-ZA', { day: 'numeric', month: 'short' });
  };

  const theme = {
    bg: darkMode ? '#000' : '#fff',
    text: darkMode ? '#fff' : '#1a1a1a',
    textSecondary: darkMode ? '#aaa' : '#888',
    border: darkMode ? '#222' : '#eee',
    cardBg: darkMode ? '#111' : '#f5f5f5',
  };

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'events', label: 'Events' },
    { id: 'sports', label: 'Sports' },
    { id: 'music', label: 'Music' },
    { id: 'study', label: 'Study' },
  ];

  const tabs = [
    { id: 'home', icon: HomeIcon, label: 'Feed' },
    { id: 'projects', icon: ProjectsIcon, label: 'Collabs' },
    { id: 'communities', icon: CommunitiesIcon, label: 'Squads' },
    { id: 'forums', icon: ForumsIcon, label: 'The Plug' },
    { id: 'messages', icon: MessagesIcon, label: 'Chats' },
  ];

  const handleTabClick = (tabId) => {
    if (tabId === 'home') { navigate('/dashboard'); }
    else if (tabId === 'projects') { navigate('/projects'); }
    else if (tabId === 'communities') { navigate('/communities'); }
    else if (tabId === 'forums') { navigate('/forums'); }
    else if (tabId === 'messages') { navigate('/messages'); }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#000',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      maxWidth: 600,
      margin: '0 auto',
      position: 'relative',
      paddingBottom: '80px',
      color: 'white'
    }}>
      {/* Header */}
      <div style={{
        padding: '12px 20px',
        borderBottom: '1px solid #222',
        position: 'sticky',
        top: 0,
        background: '#000',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white', padding: '4px', display: 'flex' }}>
          <ArrowLeftIcon />
        </button>
        <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: 'white' }}>Connect Hub</h2>
        <div style={{ width: '28px' }} />
      </div>

      {/* Filter Tabs */}
      <div style={{
        padding: '12px 20px',
        borderBottom: '1px solid #222',
        display: 'flex',
        gap: '8px',
        overflowX: 'auto'
      }}>
        {filters.map(filter => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: activeFilter === filter.id ? 'none' : '1.5px solid #333',
              background: activeFilter === filter.id ? '#FF6B00' : 'transparent',
              color: activeFilter === filter.id ? 'white' : '#aaa',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'inherit',
              whiteSpace: 'nowrap'
            }}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Video Feed - Full screen videos */}
      <div>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}>
            <div style={{
              width: 30,
              height: 30,
              border: '3px solid #333',
              borderTopColor: '#FF6B00',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite'
            }} />
          </div>
        ) : posts.length === 0 ? (
          <div style={{ padding: 60, textAlign: 'center', color: '#888', fontSize: 15 }}>
            Nothing here yet. Be the first to post!
          </div>
        ) : (
          posts.map(post => (
            <div key={post.id} style={{ borderBottom: '1px solid #1a1a1a' }}>
              {/* Video - fills the whole width */}
              <div style={{ position: 'relative', width: '100%', background: '#111' }}>
                {post.media_type === 'video' ? (
                  <video
                    src={post.media_url}
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{
                      width: '100%',
                      height: 'auto',
                      maxHeight: '600px',
                      display: 'block',
                      objectFit: 'cover'
                    }}
                  />
                ) : post.media_url ? (
                  <img
                    src={post.media_url}
                    alt="Post"
                    style={{
                      width: '100%',
                      maxHeight: '600px',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                ) : null}
              </div>

              {/* Post Info */}
              <div style={{ padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: getFacultyColor(post.user_dept),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: 15,
                    flexShrink: 0
                  }}>
                    {(post.user_name || '?').charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: 'white' }}>{post.user_name}</div>
                    <div style={{ fontSize: 12, color: '#888' }}>{formatTime(post.created_at)}</div>
                  </div>
                </div>

                {post.content && (
                  <p style={{ fontSize: 15, color: '#ddd', marginBottom: '14px', lineHeight: 1.4 }}>
                    {post.content}
                  </p>
                )}

                <div style={{ display: 'flex', gap: '30px', color: '#888' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                    <HeartIcon /> {post.likes_count || 0}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                    <CommentIcon /> {post.comments_count || 0}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                    <ShareIcon />
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Bottom Navigation */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: 600,
        background: '#000',
        borderTop: '1px solid #222',
        display: 'flex',
        justifyContent: 'space-around',
        padding: '8px 0',
        zIndex: 100,
        paddingBottom: 'max(8px, env(safe-area-inset-bottom))'
      }}>
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px 16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                color: '#888',
                fontFamily: 'inherit',
                transition: 'color 0.2s'
              }}
            >
              <Icon />
              <span style={{ fontSize: 10, fontWeight: 400 }}>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ConnectHub;