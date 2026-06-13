import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

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

const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
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

const Messages = () => {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem('ujconnect_user') || '{}');
  const [user, setUser] = useState(storedUser);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('ujconnect_dark_mode') === 'true');
  const [addedUsers, setAddedUsers] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState({});
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const [showMeetPeople, setShowMeetPeople] = useState(false);
  const [meetFilters, setMeetFilters] = useState({ scope: 'faculty', gender: 'mix', groupSize: 3 });
  const [matchedPeople, setMatchedPeople] = useState([]);
  const [loadingPeople, setLoadingPeople] = useState(false);

  useEffect(() => {
    fetchUserProfile();
    const onStorage = () => setDarkMode(localStorage.getItem('ujconnect_dark_mode') === 'true');
    window.addEventListener('storage', onStorage);

    socketRef.current = io(SOCKET_URL);
    socketRef.current.emit('user_online', storedUser.id);

    socketRef.current.on('online_users', (users) => {
      setOnlineUsers(users);
    });

    socketRef.current.on('new_message', (msg) => {
      if (activeChat && (String(msg.sender_id) === String(activeChat.id) || String(msg.sender_id) === String(storedUser.id))) {
        setMessages(prev => [...prev, msg]);
      }
    });

    socketRef.current.on('message_sent', (msg) => {
      if (activeChat && String(msg.receiver_id) === String(activeChat.id)) {
        setMessages(prev => [...prev, msg]);
      }
    });

    socketRef.current.on('user_typing', (data) => {
      setTypingUsers(prev => ({ ...prev, [data.sender_id]: true }));
    });

    socketRef.current.on('user_stop_typing', (data) => {
      setTypingUsers(prev => ({ ...prev, [data.sender_id]: false }));
    });

    return () => {
      window.removeEventListener('storage', onStorage);
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (activeChat) {
      fetchMessages(activeChat.id);
    }
  }, [activeChat]);

  const fetchUserProfile = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/users/${storedUser.id}`);
      setUser(data);
      localStorage.setItem('ujconnect_user', JSON.stringify(data));
    } catch (err) {}
  };

  const fetchMessages = async (otherUserId) => {
    try {
      const { data } = await axios.get(`${API_URL}/api/messages/${storedUser.id}/${otherUserId}`);
      setMessages(data || []);
    } catch (err) {
      setMessages([]);
    }
  };

  const handleSendMessage = () => {
    if (!chatInput.trim() || !activeChat) return;
    socketRef.current.emit('send_message', {
      sender_id: Number(storedUser.id),
      receiver_id: Number(activeChat.id),
      content: chatInput.trim()
    });
    setChatInput('');
    socketRef.current.emit('stop_typing', { receiver_id: Number(activeChat.id) });
  };

  const handleTyping = () => {
    if (!activeChat) return;
    socketRef.current.emit('typing', { sender_id: Number(storedUser.id), receiver_id: Number(activeChat.id) });
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socketRef.current.emit('stop_typing', { receiver_id: Number(activeChat.id) });
    }, 1500);
  };

  const handleFindPeople = async () => {
    setLoadingPeople(true);
    try {
      const { data } = await axios.get(`${API_URL}/api/users/match`, {
        params: { scope: meetFilters.scope, gender: meetFilters.gender, limit: meetFilters.groupSize, exclude: [user.id, ...addedUsers.map(u => u.id)] }
      });
      setMatchedPeople(data || []);
    } catch (err) {
      setMatchedPeople([
        { id: 10, preferred_name: 'Thabo', full_name: 'Thabo Molefe', department: 'Applied Information Systems', profile_pic: null, year: '2nd' },
        { id: 11, preferred_name: 'Lerato', full_name: 'Lerato Khumalo', department: 'Marketing', profile_pic: null, year: '3rd' },
        { id: 12, preferred_name: 'Sipho', full_name: 'Sipho Nkosi', department: 'Finance & Investment Management', profile_pic: null, year: '1st' },
      ].slice(0, meetFilters.groupSize));
    } finally { setLoadingPeople(false); }
  };

  const handleAddPerson = (person) => {
    if (addedUsers.find(u => u.id === person.id)) {
      setActiveChat(person);
      return;
    }
    setAddedUsers(prev => [...prev, person]);
    setMatchedPeople(prev => prev.filter(p => p.id !== person.id));
    setActiveChat(person);
  };

  const getFacultyColor = (dept) => {
    const c = ['Applied Information Systems', 'Business Management', 'Finance & Investment Management', 'Information & Knowledge Management', 'Marketing'];
    if (c.some(d => dept?.includes(d))) return '#2563eb';
    if (dept?.includes('Law')) return '#dc2626';
    if (dept?.includes('Science')) return '#16a34a';
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
    { id: 'home', icon: HomeIcon, label: 'Feed' },
    { id: 'projects', icon: ProjectsIcon, label: 'Collabs' },
    { id: 'communities', icon: CommunitiesIcon, label: 'Squads' },
    { id: 'forums', icon: ForumsIcon, label: 'The Plug' },
    { id: 'messages', icon: MessagesIcon, label: 'Chats' },
  ];

  const handleTabClick = (tabId) => {
    if (tabId === 'messages') return;
    if (tabId === 'home') navigate('/dashboard');
    else if (tabId === 'projects') navigate('/projects');
    else if (tabId === 'communities') navigate('/communities');
    else if (tabId === 'forums') navigate('/forums');
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
        <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: theme.text, position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>Chats</h2>
        <button onClick={() => setShowMeetPeople(!showMeetPeople)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: showMeetPeople ? '#FF6B00' : theme.textSecondary, padding: '4px', display: 'flex' }}>
          <FilterIcon />
        </button>
      </div>

      {/* Active Chat View */}
      {activeChat ? (
        <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 140px)' }}>
          <div style={{ padding: '12px 20px', borderBottom: `1px solid ${theme.border}`, display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => setActiveChat(null)}>
            <ArrowLeftIcon />
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: getFacultyColor(activeChat.department), display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 14, flexShrink: 0, position: 'relative' }}>
              {(activeChat.preferred_name || activeChat.full_name || '?').charAt(0)}
              {onlineUsers.includes(String(activeChat.id)) && (
                <div style={{ position: 'absolute', bottom: 0, right: 0, width: 10, height: 10, borderRadius: '50%', background: '#16a34a', border: `2px solid ${theme.bg}` }} />
              )}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 15, color: theme.text }}>{activeChat.preferred_name || activeChat.full_name}</div>
              <div style={{ fontSize: 12, color: onlineUsers.includes(String(activeChat.id)) ? '#16a34a' : theme.textSecondary }}>
                {typingUsers[activeChat.id] ? 'typing...' : onlineUsers.includes(String(activeChat.id)) ? 'Online' : 'Offline'}
              </div>
            </div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
            {messages.length === 0 && (
              <div style={{ textAlign: 'center', color: theme.textSecondary, fontSize: 13, padding: 40 }}>
                No messages yet. Say hello!
              </div>
            )}
            {messages.map(msg => (
              <div key={msg.id} style={{ display: 'flex', justifyContent: String(msg.sender_id) === String(storedUser.id) ? 'flex-end' : 'flex-start', marginBottom: '12px' }}>
                <div style={{
                  maxWidth: '75%',
                  padding: '10px 14px',
                  borderRadius: '18px',
                  borderTopRightRadius: String(msg.sender_id) === String(storedUser.id) ? '4px' : '18px',
                  borderTopLeftRadius: String(msg.sender_id) === String(storedUser.id) ? '18px' : '4px',
                  background: String(msg.sender_id) === String(storedUser.id) ? '#FF6B00' : theme.cardBg,
                  color: String(msg.sender_id) === String(storedUser.id) ? 'white' : theme.text,
                  fontSize: '14px',
                  lineHeight: 1.4
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div style={{ padding: '12px 16px', borderTop: `1px solid ${theme.border}`, display: 'flex', gap: '8px', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Message..."
              value={chatInput}
              onChange={(e) => { setChatInput(e.target.value); handleTyping(); }}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
              style={{ flex: 1, padding: '12px 16px', borderRadius: '24px', border: `1.5px solid ${theme.border}`, outline: 'none', fontSize: '14px', background: theme.inputBg, color: theme.text, fontFamily: 'inherit' }}
            />
            <button onClick={handleSendMessage} disabled={!chatInput.trim()} style={{ background: '#FF6B00', color: 'white', border: 'none', borderRadius: '50%', width: '42px', height: '42px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: chatInput.trim() ? 1 : 0.5, flexShrink: 0 }}>
              <SendIcon />
            </button>
          </div>
        </div>
      ) : (
        <>
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
                    onClick={() => setActiveChat(person)}
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
                      flexShrink: 0,
                      position: 'relative'
                    }}>
                      {!person.profile_pic && (person.preferred_name || person.full_name || '?').charAt(0)}
                      {onlineUsers.includes(String(person.id)) && (
                        <div style={{ position: 'absolute', bottom: 0, right: 0, width: 12, height: 12, borderRadius: '50%', background: '#16a34a', border: `2px solid ${theme.bg}` }} />
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: '15px', color: theme.text }}>{person.preferred_name || person.full_name}</div>
                      <div style={{ fontSize: '13px', color: onlineUsers.includes(String(person.id)) ? '#16a34a' : theme.textSecondary }}>
                        {onlineUsers.includes(String(person.id)) ? 'Online' : person.department || 'Offline'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {showMeetPeople && (
            <div style={{ borderTop: `1px solid ${theme.border}`, padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <PlusCircleIcon />
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: theme.text, margin: 0 }}>Meet New People</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: theme.textSecondary, display: 'block', marginBottom: '6px' }}>Where from?</label>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {scopeOptions.map(opt => (
                      <button key={opt.value} onClick={() => setMeetFilters(prev => ({ ...prev, scope: opt.value }))} style={{ padding: '6px 12px', borderRadius: '20px', border: meetFilters.scope === opt.value ? 'none' : `1.5px solid ${theme.border}`, background: meetFilters.scope === opt.value ? '#FF6B00' : 'transparent', color: meetFilters.scope === opt.value ? 'white' : theme.textSecondary, fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>{opt.label}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: theme.textSecondary, display: 'block', marginBottom: '6px' }}>Who?</label>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {genderOptions.map(opt => (
                      <button key={opt.value} onClick={() => setMeetFilters(prev => ({ ...prev, gender: opt.value }))} style={{ padding: '6px 12px', borderRadius: '20px', border: meetFilters.gender === opt.value ? 'none' : `1.5px solid ${theme.border}`, background: meetFilters.gender === opt.value ? '#FF6B00' : 'transparent', color: meetFilters.gender === opt.value ? 'white' : theme.textSecondary, fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>{opt.label}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: theme.textSecondary, display: 'block', marginBottom: '6px' }}>How many? ({meetFilters.groupSize})</label>
                  <input type="range" min="1" max="6" value={meetFilters.groupSize} onChange={e => setMeetFilters(prev => ({ ...prev, groupSize: parseInt(e.target.value) }))} style={{ width: '100%', accentColor: '#FF6B00' }} />
                </div>
                <button onClick={handleFindPeople} disabled={loadingPeople} style={{ width: '100%', padding: '14px', background: '#FF6B00', color: 'white', border: 'none', borderRadius: '24px', fontSize: '15px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', opacity: loadingPeople ? 0.7 : 1 }}>{loadingPeople ? 'Finding people...' : 'Find People'}</button>
              </div>
              {matchedPeople.length > 0 && (
                <div style={{ position: 'relative', width: '100%', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ position: 'absolute', width: '220px', height: '220px', borderRadius: '50%', border: `1px dashed ${theme.border}`, animation: 'spin 30s linear infinite' }} />
                  <div style={{ position: 'absolute', width: '160px', height: '160px', borderRadius: '50%', border: `1px dashed ${theme.border}`, animation: 'spin 20s linear infinite reverse' }} />
                  <div style={{ zIndex: 2, textAlign: 'center', background: theme.bg, padding: '16px', borderRadius: '50%', width: '90px', height: '90px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: theme.text }}>Meet</div>
                    <div style={{ fontSize: '11px', color: theme.textSecondary }}>Tap +</div>
                  </div>
                  {matchedPeople.map((person, i) => {
                    const total = matchedPeople.length;
                    const angle = (i / total) * 2 * Math.PI - Math.PI / 2;
                    const radius = 110;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;
                    return (
                      <div key={person.id} onClick={() => handleAddPerson(person)} style={{ position: 'absolute', transform: `translate(${x}px, ${y}px)`, cursor: 'pointer', zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                        <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: person.profile_pic ? `url(${person.profile_pic}) center/cover` : getFacultyColor(person.department), display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '18px', border: `3px solid ${theme.bg}`, boxShadow: '0 4px 12px rgba(0,0,0,0.15)', animation: 'float 3s ease-in-out infinite', animationDelay: `${i * 0.5}s`, position: 'relative' }}>
                          {!person.profile_pic && (person.preferred_name || person.full_name || '?').charAt(0)}
                          <div style={{ position: 'absolute', bottom: '-3px', right: '-3px', width: '20px', height: '20px', borderRadius: '50%', background: '#FF6B00', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${theme.bg}` }}><span style={{ color: 'white', fontSize: '12px', lineHeight: 1, fontWeight: 700 }}>+</span></div>
                        </div>
                        <span style={{ fontSize: '10px', color: theme.textSecondary, fontWeight: 500, maxWidth: '60px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textAlign: 'center' }}>{person.preferred_name || person.full_name}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </>
      )}

      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 600, background: theme.bg, borderTop: `1px solid ${theme.border}`, display: 'flex', justifyContent: 'space-around', padding: '8px 0', zIndex: 100, paddingBottom: 'max(8px, env(safe-area-inset-bottom))' }}>
        {tabs.map(tab => { const Icon = tab.icon; const isActive = (tab.id === 'messages'); return (<button key={tab.id} onClick={() => handleTabClick(tab.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, color: isActive ? '#FF6B00' : theme.textSecondary, fontFamily: 'inherit', transition: 'color 0.2s' }}><Icon /><span style={{ fontSize: 10, fontWeight: isActive ? 600 : 400 }}>{tab.label}</span></button>); })}
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
      `}</style>
    </div>
  );
};

export default Messages;