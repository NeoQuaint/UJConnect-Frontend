import { useNavigate } from 'react-router-dom';

const ArrowLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
  </svg>
);

const HomeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

const ProjectsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
  </svg>
);

const CommunitiesIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
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

const CampusTours = () => {
  const navigate = useNavigate();

  const posts = [
    { id: 1, user_name: 'Lerato K.', user_dept: 'Marketing', content: 'APK campus is beautiful in the morning', media_url: '/campus.mp4', media_type: 'video', likes_count: 312, comments_count: 78, created_at: new Date(Date.now() - 3600000).toISOString() },
    { id: 2, user_name: 'Sipho N.', user_dept: 'Finance', content: 'DFC campus tour! Check out the new buildings', media_url: '/campus.mp4', media_type: 'video', likes_count: 267, comments_count: 45, created_at: new Date(Date.now() - 7200000).toISOString() },
    { id: 3, user_name: 'Amahle Z.', user_dept: 'Information & Knowledge Management', content: 'Hidden gems on campus you need to know about', media_url: '/campus.mp4', media_type: 'video', likes_count: 198, comments_count: 34, created_at: new Date(Date.now() - 10800000).toISOString() },
    { id: 4, user_name: 'Thabo M.', user_dept: 'Applied Information Systems', content: 'Library tour for first years! Save this', media_url: '/campus.mp4', media_type: 'video', likes_count: 245, comments_count: 56, created_at: new Date(Date.now() - 14400000).toISOString() },
  ];

  const getFacultyColor = () => '#2563eb';

  const formatTime = (ds) => {
    const n = new Date(), d = new Date(ds), dm = Math.floor((n - d) / 60000);
    if (dm < 1) return 'Just now'; if (dm < 60) return `${dm}m`;
    const dh = Math.floor(dm / 60); if (dh < 24) return `${dh}h`;
    const dd = Math.floor(dh / 24); if (dd === 1) return 'Yesterday';
    return d.toLocaleDateString('en-ZA', { day: 'numeric', month: 'short' });
  };

  const tabs = [
    { id: 'home', icon: HomeIcon, label: 'Feed' }, { id: 'projects', icon: ProjectsIcon, label: 'Collabs' },
    { id: 'communities', icon: CommunitiesIcon, label: 'Squads' }, { id: 'forums', icon: ForumsIcon, label: 'The Plug' },
    { id: 'messages', icon: MessagesIcon, label: 'Chats' },
  ];

  const handleTabClick = (tabId) => {
    if (tabId === 'home') navigate('/dashboard');
    else if (tabId === 'projects') navigate('/projects');
    else if (tabId === 'communities') navigate('/communities');
    else if (tabId === 'forums') navigate('/forums');
    else if (tabId === 'messages') navigate('/messages');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#000', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', maxWidth: 600, margin: '0 auto', position: 'relative', paddingBottom: '80px', color: 'white' }}>
      <div style={{ padding: '12px 20px', borderBottom: '1px solid #222', position: 'sticky', top: 0, background: '#000', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white', padding: '4px', display: 'flex' }}><ArrowLeftIcon /></button>
        <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: 'white' }}>Campus Tours</h2>
        <div style={{ width: '28px' }} />
      </div>
      <div>
        {posts.map(post => (
          <div key={post.id} style={{ borderBottom: '1px solid #1a1a1a' }}>
            <div style={{ position: 'relative', width: '100%', background: '#111' }}>
              <video src={post.media_url} controls autoPlay muted loop playsInline style={{ width: '100%', height: 'auto', maxHeight: '600px', display: 'block', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: getFacultyColor(), display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 15 }}>{(post.user_name || '?').charAt(0)}</div>
                <div><div style={{ fontWeight: 600, fontSize: 14, color: 'white' }}>{post.user_name}</div><div style={{ fontSize: 12, color: '#888' }}>{formatTime(post.created_at)}</div></div>
              </div>
              {post.content && <p style={{ fontSize: 15, color: '#ddd', marginBottom: '14px', lineHeight: 1.4 }}>{post.content}</p>}
              <div style={{ display: 'flex', gap: '30px', color: '#888' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}><HeartIcon /> {post.likes_count}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}><CommentIcon /> {post.comments_count}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 600, background: '#000', borderTop: '1px solid #222', display: 'flex', justifyContent: 'space-around', padding: '8px 0', zIndex: 100, paddingBottom: 'max(8px, env(safe-area-inset-bottom))' }}>
        {tabs.map(tab => { const Icon = tab.icon; return (<button key={tab.id} onClick={() => handleTabClick(tab.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, color: '#888', fontFamily: 'inherit' }}><Icon /><span style={{ fontSize: 10 }}>{tab.label}</span></button>);})}
      </div>
    </div>
  );
};

export default CampusTours;