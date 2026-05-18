import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const CommentIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
  </svg>
);

const RepostIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="17 1 21 5 17 9"/>
    <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
    <polyline points="7 23 3 19 7 15"/>
    <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('ujconnect_user') || '{}');
  const [activeTab, setActiveTab] = useState('home');

  const handleLogout = () => {
    localStorage.removeItem('ujconnect_user');
    localStorage.removeItem('ujconnect_token');
    navigate('/');
  };

  const tabs = [
    { id: 'home', icon: HomeIcon, label: 'Home' },
    { id: 'projects', icon: ProjectsIcon, label: 'Projects' },
    { id: 'communities', icon: CommunitiesIcon, label: 'Communities' },
    { id: 'forums', icon: ForumsIcon, label: 'Forums' },
    { id: 'messages', icon: MessagesIcon, label: 'Messages' },
  ];

  const getFacultyColor = (dept) => {
    const cbeDepts = ['Applied Information Systems', 'Business Management', 'Economics and Econometrics', 'Finance & Investment Management', 'Information & Knowledge Management', 'Public Management & Governance', 'Hospitality', 'Commercial Accountancy', 'Industrial Psychology', 'Marketing', 'Transport & Supply Chain Management', 'Tourism', 'Accountancy'];
    const lawDepts = ['Law', 'Faculty of Law'];
    const scienceDepts = ['Science', 'Faculty of Science'];
    const humanitiesDepts = ['Humanities', 'Faculty of Humanities'];
    const healthDepts = ['Health Sciences', 'Faculty of Health Sciences'];
    const engineeringDepts = ['Engineering', 'Faculty of Engineering'];

    if (cbeDepts.some(d => dept?.includes(d))) return '#2563eb';
    if (lawDepts.some(d => dept?.includes(d))) return '#dc2626';
    if (scienceDepts.some(d => dept?.includes(d))) return '#16a34a';
    if (humanitiesDepts.some(d => dept?.includes(d))) return '#9333ea';
    if (healthDepts.some(d => dept?.includes(d))) return '#ea580c';
    if (engineeringDepts.some(d => dept?.includes(d))) return '#ca8a04';
    return '#666';
  };

  const posts = [
    {
      id: 1,
      user: 'Thabo M.',
      handle: '@thabo_m',
      dept: 'Applied Information Systems',
      time: '2h',
      content: 'Looking for 2 developers to join our hackathon team this weekend. Need React and Node.js experience. DM me if interested!',
      likes: 24,
      comments: 8,
      reposts: 5
    },
    {
      id: 2,
      user: 'Lerato K.',
      handle: '@lerato_k',
      dept: 'Marketing',
      time: '4h',
      content: 'Just posted a new project — building a marketing analytics dashboard for local businesses. Need a data analyst and a UI designer. Check it out on the Projects tab!',
      likes: 18,
      comments: 12,
      reposts: 3
    },
    {
      id: 3,
      user: 'Sipho N.',
      handle: '@sipho_n',
      dept: 'Finance & Investment Management',
      time: '6h',
      content: 'Anyone else struggling with the Investment Analysis assignment? Let\'s form a study group. Drop a comment if you\'re interested.',
      likes: 32,
      comments: 24,
      reposts: 7
    },
    {
      id: 4,
      user: 'Amahle Z.',
      handle: '@amahle_z',
      dept: 'Information & Knowledge Management',
      time: '8h',
      content: 'Just finished my portfolio website using HTML, CSS and a bit of JavaScript. Would love feedback from the community! Link in bio.',
      likes: 45,
      comments: 15,
      reposts: 11
    }
  ];

  const renderHome = () => (
    <div style={{ paddingBottom: '80px' }}>
      {/* Header: [Avatar] [Home] [Live] [Post] */}
      <div style={{
        padding: '12px 20px',
        borderBottom: '1px solid #eee',
        position: 'sticky',
        top: 0,
        background: 'white',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{
          width: '34px',
          height: '34px',
          borderRadius: '50%',
          background: '#FF6B00',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 700,
          fontSize: '14px',
          flexShrink: 0,
          cursor: 'pointer'
        }}
        onClick={() => navigate('/profile')}
        >
          {user.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
        </div>

        <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0, position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>Home</h2>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button style={{
            background: 'none',
            border: '1.5px solid #e2e8f0',
            padding: '6px 14px',
            borderRadius: '20px',
            fontSize: '13px',
            fontWeight: 600,
            color: '#333',
            cursor: 'pointer',
            fontFamily: 'inherit',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}>
            <span style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#dc2626',
              display: 'inline-block'
            }} />
            Live
          </button>
          <button style={{
            background: '#FF6B00',
            color: 'white',
            border: 'none',
            padding: '8px 18px',
            borderRadius: '20px',
            fontWeight: 600,
            fontSize: '13px',
            cursor: 'pointer',
            fontFamily: 'inherit',
            whiteSpace: 'nowrap'
          }}>Post</button>
        </div>
      </div>

      {/* Search + What's happening */}
      <div style={{
        padding: '12px 20px',
        borderBottom: '1px solid #eee'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: '#f5f5f5',
          borderRadius: '24px',
          padding: '10px 16px',
          marginBottom: '12px'
        }}>
          <SearchIcon />
          <input
            type="text"
            placeholder="Search"
            style={{
              width: '55px',
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontSize: '15px',
              fontFamily: 'inherit',
              color: '#333'
            }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            background: '#FF6B00',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 700,
            fontSize: '14px',
            flexShrink: 0
          }}>
            {user.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
          </div>
          <input
            type="text"
            placeholder="What's happening?"
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '15px',
              fontFamily: 'inherit',
              color: '#333',
              background: 'transparent'
            }}
          />
        </div>
      </div>

      {/* Feed */}
      <div>
        {posts.map(post => (
          <div key={post.id} style={{
            padding: '16px 20px',
            borderBottom: '1px solid #f5f5f5',
            display: 'flex',
            gap: '12px',
            cursor: 'pointer'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: '#f0f0f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#666',
              fontWeight: 600,
              fontSize: '15px',
              flexShrink: 0,
              position: 'relative'
            }}>
              {post.user.charAt(0)}
              <div style={{
                position: 'absolute',
                bottom: '-1px',
                right: '-1px',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: getFacultyColor(post.dept),
                border: '2px solid white'
              }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', flexWrap: 'wrap' }}>
                <span style={{ fontWeight: 700, fontSize: '15px' }}>{post.user}</span>
                <span style={{ color: '#999', fontSize: '14px' }}>{post.handle}</span>
                <span style={{ color: '#999', fontSize: '14px' }}>· {post.time}</span>
              </div>
              <p style={{ margin: '0 0 12px', fontSize: '15px', lineHeight: '1.5', color: '#333' }}>
                {post.content}
              </p>
              <div style={{ display: 'flex', gap: '40px', color: '#999' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                  <CommentIcon />
                  <span style={{ fontSize: '13px' }}>{post.comments}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                  <RepostIcon />
                  <span style={{ fontSize: '13px' }}>{post.reposts}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                  <HeartIcon />
                  <span style={{ fontSize: '13px' }}>{post.likes}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPlaceholder = (title) => (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '60vh',
      color: '#999',
      fontSize: '16px'
    }}>
      {title} — coming soon
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return renderHome();
      case 'projects': return renderPlaceholder('Projects');
      case 'communities': return renderPlaceholder('Communities');
      case 'forums': return renderPlaceholder('Forums');
      case 'messages': return renderPlaceholder('Messages');
      default: return renderHome();
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'white',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      maxWidth: '600px',
      margin: '0 auto',
      position: 'relative'
    }}>
      {renderContent()}

      <div style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '600px',
        background: 'white',
        borderTop: '1px solid #eee',
        display: 'flex',
        justifyContent: 'space-around',
        padding: '8px 0',
        zIndex: 100,
        paddingBottom: 'max(8px, env(safe-area-inset-bottom))'
      }}>
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px 16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                color: isActive ? '#FF6B00' : '#666',
                fontFamily: 'inherit',
                transition: 'color 0.2s'
              }}
            >
              <Icon />
              <span style={{ fontSize: '10px', fontWeight: isActive ? 600 : 400 }}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;