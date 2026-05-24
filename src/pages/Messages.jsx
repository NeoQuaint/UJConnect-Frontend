import { useState, useEffect, useRef } from 'react';
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

const FilterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
  </svg>
);

const PlusCircleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="16"/>
    <line x1="8" y1="12" x2="16" y2="12"/>
  </svg>
);

const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

const Messages = () => {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem('ujconnect_user') || '{}');
  const [user, setUser] = useState(storedUser);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('ujconnect_dark_mode') === 'true');
  const [showMeetPeople, setShowMeetPeople] = useState(false);
  const [matchedPeople, setMatchedPeople] = useState([]);
  const [loadingPeople, setLoadingPeople] = useState(false);
  const [addedUsers, setAddedUsers] = useState([]);
  const orbitRef = useRef(null);

  // Filters
  const [filters, setFilters] = useState({
    scope: 'faculty',
    gender: 'mix',
    groupSize: 3
  });

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

  const handleFindPeople = async () => {
    setLoadingPeople(true);
    try {
      const { data } = await axios.get(`${API_URL}/api/users/match`, {
        params: {
          scope: filters.scope,
          gender: filters.gender,
          limit: filters.groupSize,
          exclude: [user.id, ...addedUsers.map(u => u.id)]
        }
      });
      setMatchedPeople(data || []);
    } catch (err) {
      // Fallback demo data
      const demoPeople = [
        { id: 10, preferred_name: 'Thabo', full_name: 'Thabo Molefe', department: 'Applied Information Systems', profile_pic: null, year: '2nd' },
        { id: 11, preferred_name: 'Lerato', full_name: 'Lerato Khumalo', department: 'Marketing', profile_pic: null, year: '3rd' },
        { id: 12, preferred_name: 'Sipho', full_name: 'Sipho Nkosi', department: 'Finance & Investment Management', profile_pic: null, year: '1st' },
      ].slice(0, filters.groupSize);
      setMatchedPeople(demoPeople);
    } finally {
      setLoadingPeople(false);
    }
  };

  const handleAddPerson = (person) => {
    setAddedUsers(prev => [...prev, person]);
    setMatchedPeople(prev => prev.filter(p => p.id !== person.id));
  };

  const handleStartChat = (person) => {
    navigate(`/messages/chat/${person.id}`, { state: { person } });
  };

  const getFacultyColor = (dept) => {
    const cbeDepts = ['Applied Information Systems', 'Business Management', 'Economics and Econometrics', 'Finance & Investment Management', 'Information & Knowledge Management', 'Public Management & Governance', 'Hospitality', 'Commercial Accountancy', 'Industrial Psychology', 'Marketing', 'Transport & Supply Chain Management', 'Tourism', 'Accountancy'];
    if (cbeDepts.some(d => dept?.includes(d))) return '#2563eb';
    if (dept?.includes('Law')) return '#dc2626';
    if (dept?.includes('Science')) return '#16a34a';
    if (dept?.includes('Humanities')) return '#9333ea';
    if (dept?.includes('Health')) return '#ea580c';
    if (dept?.includes('Engineering')) return '#ca8a04';
    return '#666';
  };

  const theme = {
    bg: darkMode ? '#000' : '#fff',
    text: darkMode ? '#fff' : '#1a1a1a',
    textSecondary: darkMode ? '#aaa' : '#888',
    border: darkMode ? '#222' : '#eee',
    cardBg: darkMode ? '#111' : '#f5f5f5',
    inputBg: darkMode ? '#1a1a1a' : '#f5f5f5',
  };

  const tabs = [
    { id: 'home', icon: HomeIcon, label: 'Home' },
    { id: 'projects', icon: ProjectsIcon, label: 'Projects' },
    { id: 'communities', icon: CommunitiesIcon, label: 'Communities' },
    { id: 'forums', icon: ForumsIcon, label: 'Forums' },
    { id: 'messages', icon: MessagesIcon, label: 'Messages' },
  ];

  const handleTabClick = (tabId) => {
    if (tabId === 'messages') return;
    if (tabId === 'home') { navigate('/dashboard'); }
    else { navigate(`/${tabId}`); }
  };

  const scopeOptions = [
    { value: 'faculty', label: 'My Faculty' },
    { value: 'campus', label: 'My Campus' },
    { value: 'university', label: 'All UJ' },
    { value: 'different', label: 'Different Campus' },
  ];

  const genderOptions = [
    { value: 'mix', label: 'Mixed' },
    { value: 'male', label: 'Males Only' },
    { value: 'female', label: 'Females Only' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: theme.bg, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', maxWidth: 600, margin: '0 auto', position: 'relative', paddingBottom: '80px' }}>

      {/* Header */}
      <div style={{ padding: '12px 20px', borderBottom: `1px solid ${theme.border}`, position: 'sticky', top: 0, background: theme.bg, zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: theme.text, padding: '4px', display: 'flex' }}>
          <ArrowLeftIcon />
        </button>
        <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: theme.text, position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>Messages</h2>
        <button onClick={() => setShowMeetPeople(!showMeetPeople)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: showMeetPeople ? '#FF6B00' : theme.textSecondary, padding: '4px', display: 'flex' }}>
          <FilterIcon />
        </button>
      </div>

      {/* Chat List */}
      <div style={{ padding: '16px 20px' }}>
        {addedUsers.length === 0 ? (
          <div style={{ textAlign: 'center', color: theme.textSecondary, fontSize: '15px', padding: '40px 0' }}>
            No conversations yet.
            <br />
            <span style={{ fontSize: '13px' }}>Use the filter to meet new people!</span>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {addedUsers.map(person => (
              <div
                key={person.id}
                onClick={() => handleStartChat(person)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  background: theme.cardBg,
                  borderRadius: '12px',
                  cursor: 'pointer',
                  border: `1px solid ${theme.border}`
                }}
              >
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: person.profile_pic ? `url(${person.profile_pic}) center/cover` : getFacultyColor(person.department),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '16px',
                  flexShrink: 0
                }}>
                  {!person.profile_pic && (person.preferred_name || person.full_name || '?').charAt(0)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '15px', color: theme.text }}>{person.preferred_name || person.full_name}</div>
                  <div style={{ fontSize: '13px', color: theme.textSecondary }}>{person.department}</div>
                </div>
                <SendIcon />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Meet New People Section */}
      {showMeetPeople && (
        <div style={{ borderTop: `1px solid ${theme.border}`, padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <PlusCircleIcon />
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: theme.text, margin: 0 }}>Meet New People</h3>
          </div>

          {/* Filters */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
            {/* Scope */}
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: theme.textSecondary, display: 'block', marginBottom: '6px' }}>Where from?</label>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {scopeOptions.map(opt => (
                  <button key={opt.value} onClick={() => setFilters(prev => ({ ...prev, scope: opt.value }))} style={{
                    padding: '6px 12px', borderRadius: '20px', border: filters.scope === opt.value ? 'none' : `1.5px solid ${theme.border}`,
                    background: filters.scope === opt.value ? '#FF6B00' : 'transparent',
                    color: filters.scope === opt.value ? 'white' : theme.textSecondary,
                    fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit'
                  }}>{opt.label}</button>
                ))}
              </div>
            </div>

            {/* Gender */}
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: theme.textSecondary, display: 'block', marginBottom: '6px' }}>Who?</label>
              <div style={{ display: 'flex', gap: '6px' }}>
                {genderOptions.map(opt => (
                  <button key={opt.value} onClick={() => setFilters(prev => ({ ...prev, gender: opt.value }))} style={{
                    padding: '6px 12px', borderRadius: '20px', border: filters.gender === opt.value ? 'none' : `1.5px solid ${theme.border}`,
                    background: filters.gender === opt.value ? '#FF6B00' : 'transparent',
                    color: filters.gender === opt.value ? 'white' : theme.textSecondary,
                    fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit'
                  }}>{opt.label}</button>
                ))}
              </div>
            </div>

            {/* Group Size */}
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: theme.textSecondary, display: 'block', marginBottom: '6px' }}>How many? ({filters.groupSize})</label>
              <input
                type="range"
                min="1"
                max="6"
                value={filters.groupSize}
                onChange={(e) => setFilters(prev => ({ ...prev, groupSize: parseInt(e.target.value) }))}
                style={{ width: '100%', accentColor: '#FF6B00' }}
              />
            </div>

            <button
              onClick={handleFindPeople}
              disabled={loadingPeople}
              style={{
                width: '100%',
                padding: '14px',
                background: '#FF6B00',
                color: 'white',
                border: 'none',
                borderRadius: '24px',
                fontSize: '15px',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'inherit',
                opacity: loadingPeople ? 0.7 : 1
              }}
            >
              {loadingPeople ? 'Finding people...' : 'Find People'}
            </button>
          </div>

          {/* Orbiting Matched People */}
          {matchedPeople.length > 0 && (
            <div style={{
              position: 'relative',
              width: '100%',
              height: '320px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '10px'
            }}>
              {/* Concentric circles */}
              <div style={{
                position: 'absolute',
                width: '240px',
                height: '240px',
                borderRadius: '50%',
                border: `1px dashed ${theme.border}`,
                animation: 'spin 30s linear infinite'
              }} />
              <div style={{
                position: 'absolute',
                width: '180px',
                height: '180px',
                borderRadius: '50%',
                border: `1px dashed ${theme.border}`,
                animation: 'spin 20s linear infinite reverse'
              }} />

              {/* Center CTA */}
              <div style={{
                zIndex: 2,
                textAlign: 'center',
                background: theme.bg,
                padding: '16px',
                borderRadius: '50%',
                width: '100px',
                height: '100px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: theme.text }}>Meet</div>
                <div style={{ fontSize: '11px', color: theme.textSecondary }}>Tap to add</div>
              </div>

              {/* Orbiting avatars */}
              {matchedPeople.map((person, i) => {
                const total = matchedPeople.length;
                const angle = (i / total) * 2 * Math.PI - Math.PI / 2;
                const radius = 120;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                  <div
                    key={person.id}
                    onClick={() => handleAddPerson(person)}
                    style={{
                      position: 'absolute',
                      transform: `translate(${x}px, ${y}px)`,
                      cursor: 'pointer',
                      zIndex: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'transform 0.3s'
                    }}
                  >
                    <div style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      background: person.profile_pic ? `url(${person.profile_pic}) center/cover` : getFacultyColor(person.department),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '20px',
                      border: `3px solid ${theme.bg}`,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      animation: 'float 3s ease-in-out infinite',
                      animationDelay: `${i * 0.5}s`
                    }}>
                      {!person.profile_pic && (person.preferred_name || person.full_name || '?').charAt(0)}
                      <div style={{
                        position: 'absolute',
                        bottom: '-2px',
                        right: '-2px',
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: '#FF6B00',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: `2px solid ${theme.bg}`
                      }}>
                        <span style={{ color: 'white', fontSize: '12px', lineHeight: 1, fontWeight: 700 }}>+</span>
                      </div>
                    </div>
                    <span style={{ fontSize: '10px', color: theme.textSecondary, fontWeight: 500, textAlign: 'center', maxWidth: '70px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {person.preferred_name || person.full_name}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Animation styles */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}</style>

      {/* Bottom Navigation */}
      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 600, background: theme.bg, borderTop: `1px solid ${theme.border}`, display: 'flex', justifyContent: 'space-around', padding: '8px 0', zIndex: 100, paddingBottom: 'max(8px, env(safe-area-inset-bottom))' }}>
        {tabs.map(tab => { const Icon = tab.icon; const isActive = (tab.id === 'messages'); return (<button key={tab.id} onClick={() => handleTabClick(tab.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, color: isActive ? '#FF6B00' : theme.textSecondary, fontFamily: 'inherit', transition: 'color 0.2s' }}><Icon /><span style={{ fontSize: 10, fontWeight: isActive ? 600 : 400 }}>{tab.label}</span></button>); })}
      </div>
    </div>
  );
};

export default Messages;