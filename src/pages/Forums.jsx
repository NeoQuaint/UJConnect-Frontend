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

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const HeartIcon = ({ filled }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const CommentIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
  </svg>
);

const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
  </svg>
);

const Forums = () => {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem('ujconnect_user') || '{}');
  const [user, setUser] = useState(storedUser);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('ujconnect_dark_mode') === 'true');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showAskModal, setShowAskModal] = useState(false);
  const [questionTitle, setQuestionTitle] = useState('');
  const [questionBody, setQuestionBody] = useState('');
  const [questionTags, setQuestionTags] = useState('');
  const [posting, setPosting] = useState(false);
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [answerText, setAnswerText] = useState('');
  const [submittingAnswer, setSubmittingAnswer] = useState(false);

  useEffect(() => {
    fetchUserProfile();
    fetchQuestions();
    const onStorage = () => setDarkMode(localStorage.getItem('ujconnect_dark_mode') === 'true');
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const fetchUserProfile = async () => {
    try { const { data } = await axios.get(`${API_URL}/api/users/${storedUser.id}`); setUser(data); localStorage.setItem('ujconnect_user', JSON.stringify(data)); } catch (err) {}
  };

  const fetchQuestions = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/forum`);
      setQuestions(data || []);
    } catch (err) {
      setQuestions(demoQuestions);
    } finally { setLoading(false); }
  };

  const fetchAnswers = async (questionId) => {
    try {
      const { data } = await axios.get(`${API_URL}/api/forum/${questionId}/answers`);
      setAnswers(data || []);
    } catch (err) { setAnswers([]); }
  };

  const handleAskQuestion = async () => {
    if (!questionTitle.trim()) return;
    setPosting(true);
    try {
      const tagsArray = questionTags.split(',').map(t => t.trim()).filter(t => t);
      const { data } = await axios.post(`${API_URL}/api/forum`, {
        user_id: user.id,
        title: questionTitle.trim(),
        body: questionBody.trim(),
        tags: tagsArray
      });
      setQuestions(prev => [data, ...prev]);
      setQuestionTitle(''); setQuestionBody(''); setQuestionTags(''); setShowAskModal(false);
    } catch (err) {} finally { setPosting(false); }
  };

  const handleSubmitAnswer = async (questionId) => {
    if (!answerText.trim()) return;
    setSubmittingAnswer(true);
    try {
      await axios.post(`${API_URL}/api/forum/${questionId}/answers`, {
        user_id: user.id,
        body: answerText.trim()
      });
      setAnswerText('');
      fetchAnswers(questionId);
    } catch (err) {} finally { setSubmittingAnswer(false); }
  };

  const toggleQuestion = (questionId) => {
    if (expandedQuestion === questionId) {
      setExpandedQuestion(null);
      setAnswers([]);
    } else {
      setExpandedQuestion(questionId);
      fetchAnswers(questionId);
      setAnswerText('');
    }
  };

  const formatTime = (ds) => {
    const n = new Date(), d = new Date(ds), dm = Math.floor((n-d)/60000), dh = Math.floor(dm/60), dd = Math.floor(dh/24);
    if (dm<1) return 'Just now'; if (dm<60) return `${dm}m`; if (dh<24) return `${dh}h`; if (dd===1) return 'Yesterday'; if (dd<7) return `${dd}d`;
    return d.toLocaleDateString('en-ZA',{day:'numeric',month:'short'});
  };

  const getFacultyColor = (dept) => {
    const c=['Applied Information Systems','Business Management','Economics and Econometrics','Finance & Investment Management','Information & Knowledge Management','Public Management & Governance','Hospitality','Commercial Accountancy','Industrial Psychology','Marketing','Transport & Supply Chain Management','Tourism','Accountancy'];
    if(c.some(d=>dept?.includes(d)))return'#2563eb'; if(dept?.includes('Law'))return'#dc2626'; if(dept?.includes('Science'))return'#16a34a'; if(dept?.includes('Humanities'))return'#9333ea'; if(dept?.includes('Health'))return'#ea580c'; if(dept?.includes('Engineering'))return'#ca8a04'; return'#666';
  };

  const theme = {
    bg: darkMode?'#000':'#fff', text: darkMode?'#fff':'#1a1a1a',
    textSecondary: darkMode?'#aaa':'#888', border: darkMode?'#222':'#eee',
    cardBg: darkMode?'#111':'#f5f5f5', inputBg: darkMode?'#1a1a1a':'#f5f5f5',
  };

  const demoQuestions = [
    { id: 1, title: 'How do I apply for a supplementary exam?', body: 'I missed my exam due to medical reasons. What is the process for applying for a supplementary exam at UJ? I have a doctors note.', tags: ['Exams', 'Academic'], user_name: 'Thabo M.', user_dept: 'Applied Information Systems', answers_count: 4, views: 128, created_at: new Date(Date.now()-7200000).toISOString() },
    { id: 2, title: 'Best study spots on APK campus?', body: 'Looking for quiet places to study on the Auckland Park campus. The library gets full during exam season. Any hidden gems?', tags: ['Campus', 'Study'], user_name: 'Lerato K.', user_dept: 'Marketing', answers_count: 7, views: 256, created_at: new Date(Date.now()-18000000).toISOString() },
    { id: 3, title: 'NSFAS funding delayed - what to do?', body: 'My NSFAS funding has not been processed yet and registration closes next week. Who should I contact and what documents do I need?', tags: ['Finance', 'NSFAS'], user_name: 'Sipho N.', user_dept: 'Finance', answers_count: 3, views: 89, created_at: new Date(Date.now()-86400000).toISOString() },
    { id: 4, title: 'Timetable clash between two compulsory modules', body: 'I have a clash between Information Management and Business Management lectures. Both are compulsory for my degree. What can I do?', tags: ['Academic', 'Timetable'], user_name: 'Amahle Z.', user_dept: 'Information & Knowledge Management', answers_count: 5, views: 67, created_at: new Date(Date.now()-172800000).toISOString() },
  ];

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'unanswered', label: 'Unanswered' },
    { id: 'popular', label: 'Popular' },
    { id: 'recent', label: 'Recent' },
  ];

  let filteredQuestions = [...questions];
  if (activeFilter === 'unanswered') filteredQuestions = filteredQuestions.filter(q => !q.answers_count || q.answers_count === 0);
  if (activeFilter === 'popular') filteredQuestions.sort((a, b) => (b.views || 0) - (a.views || 0));
  if (activeFilter === 'recent') filteredQuestions.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filteredQuestions = filteredQuestions.filter(item => item.title.toLowerCase().includes(q) || item.body?.toLowerCase().includes(q) || item.tags?.some(t => t.toLowerCase().includes(q)));
  }

  const tabs = [
    { id: 'home', icon: HomeIcon, label: 'Home' },
    { id: 'projects', icon: ProjectsIcon, label: 'Projects' },
    { id: 'communities', icon: CommunitiesIcon, label: 'Communities' },
    { id: 'forums', icon: ForumsIcon, label: 'Forums' },
    { id: 'messages', icon: MessagesIcon, label: 'Messages' },
  ];

  const handleTabClick = (tabId) => {
    if (tabId === 'forums') return;
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
        <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: theme.text, position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>Forum</h2>
        <button onClick={() => setShowAskModal(true)} style={{ background: '#FF6B00', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '20px', fontWeight: 600, fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit' }}>Ask</button>
      </div>

      {/* Search */}
      <div style={{ padding: '12px 20px', borderBottom: `1px solid ${theme.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: theme.inputBg, borderRadius: 24, padding: '10px 16px' }}>
          <SearchIcon />
          <input type="text" placeholder="Search questions..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: 15, fontFamily: 'inherit', color: theme.text }} />
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ padding: '12px 20px', borderBottom: `1px solid ${theme.border}`, display: 'flex', gap: 8, overflowX: 'auto' }}>
        {filters.map(filter => (
          <button key={filter.id} onClick={() => setActiveFilter(filter.id)} style={{
            padding: '6px 14px', borderRadius: 20, border: activeFilter === filter.id ? 'none' : `1.5px solid ${theme.border}`,
            background: activeFilter === filter.id ? '#FF6B00' : 'transparent',
            color: activeFilter === filter.id ? 'white' : theme.textSecondary,
            fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap'
          }}>{filter.label}</button>
        ))}
      </div>

      {/* Questions List */}
      <div style={{ padding: '16px 20px' }}>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}>
            <div style={{ width: 30, height: 30, border: `3px solid ${theme.border}`, borderTopColor: '#FF6B00', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
          </div>
        ) : filteredQuestions.length === 0 ? (
          <div style={{ textAlign: 'center', color: theme.textSecondary, fontSize: 15, padding: '40px 0' }}>
            No questions found. Be the first to ask!
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filteredQuestions.map(question => (
              <div key={question.id} style={{ background: theme.cardBg, borderRadius: '12px', border: `1px solid ${theme.border}`, overflow: 'hidden' }}>
                <div onClick={() => toggleQuestion(question.id)} style={{ padding: '16px', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', gap: 6, marginBottom: 8, flexWrap: 'wrap' }}>
                    {question.tags?.map((tag, i) => (
                      <span key={i} style={{ background: '#FFF7ED', color: '#FF6B00', padding: '3px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 500 }}>{tag}</span>
                    ))}
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: theme.text, marginBottom: '6px', lineHeight: 1.3 }}>{question.title}</h3>
                  <p style={{ fontSize: '14px', color: theme.textSecondary, marginBottom: '12px', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {question.body}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 28, height: 28, borderRadius: '50%', background: getFacultyColor(question.user_dept), display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, fontSize: 12 }}>
                        {(question.user_name || '?').charAt(0)}
                      </div>
                      <span style={{ fontSize: '13px', color: theme.textSecondary }}>{question.user_name}</span>
                      <span style={{ fontSize: '12px', color: theme.textSecondary }}>· {formatTime(question.created_at)}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 16, color: theme.textSecondary, fontSize: 13 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><EyeIcon /> {question.views || 0}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><CommentIcon /> {question.answers_count || 0}</span>
                    </div>
                  </div>
                </div>

                {/* Answers Section */}
                {expandedQuestion === question.id && (
                  <div style={{ borderTop: `1px solid ${theme.border}`, padding: '16px' }}>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: theme.text, marginBottom: '12px' }}>
                      Answers ({answers.length})
                    </div>

                    {/* Question body expanded */}
                    <div style={{ marginBottom: '16px', padding: '12px', background: theme.inputBg, borderRadius: '10px' }}>
                      <p style={{ fontSize: '14px', color: theme.text, lineHeight: 1.5, margin: 0, whiteSpace: 'pre-wrap' }}>{question.body}</p>
                    </div>

                    {answers.length === 0 ? (
                      <div style={{ textAlign: 'center', color: theme.textSecondary, fontSize: '13px', padding: '16px 0' }}>
                        No answers yet. Be the first to help!
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
                        {answers.map(answer => (
                          <div key={answer.id} style={{ padding: '12px', background: theme.inputBg, borderRadius: '10px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                              <div style={{ width: 28, height: 28, borderRadius: '50%', background: getFacultyColor(answer.user_dept), display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, fontSize: 12 }}>
                                {(answer.user_name || '?').charAt(0)}
                              </div>
                              <span style={{ fontSize: '13px', fontWeight: 600, color: theme.text }}>{answer.user_name}</span>
                              <span style={{ fontSize: '12px', color: theme.textSecondary }}>· {formatTime(answer.created_at)}</span>
                              {answer.accepted && (
                                <span style={{ display: 'flex', alignItems: 'center', gap: 3, color: '#16a34a', fontSize: '12px', fontWeight: 600 }}>
                                  <CheckIcon /> Accepted
                                </span>
                              )}
                            </div>
                            <p style={{ fontSize: '14px', color: theme.text, lineHeight: 1.5, margin: 0, whiteSpace: 'pre-wrap' }}>{answer.body}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Answer Input */}
                    <div style={{ display: 'flex', gap: 8 }}>
                      <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#FF6B00', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, fontSize: 12, flexShrink: 0 }}>
                        {user.full_name?.charAt(0) || 'U'}
                      </div>
                      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, background: theme.inputBg, borderRadius: 20, padding: '6px 12px' }}>
                        <input type="text" placeholder="Write an answer..." value={answerText} onChange={e => setAnswerText(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') handleSubmitAnswer(question.id); }} style={{ flex: 1, border: 'none', outline: 'none', fontSize: 13, background: 'transparent', color: theme.text, fontFamily: 'inherit' }} />
                        {answerText.trim() && (
                          <button onClick={() => handleSubmitAnswer(question.id)} disabled={submittingAnswer} style={{ background: 'none', border: 'none', color: '#FF6B00', cursor: 'pointer', padding: 4, display: 'flex' }}><SendIcon /></button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Ask Question Modal */}
      {showAskModal && (
        <div onClick={() => setShowAskModal(false)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: theme.bg, borderRadius: 20, padding: 24, width: '100%', maxWidth: 450 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: theme.text, marginBottom: 16, textAlign: 'center' }}>Ask a Question</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <input type="text" placeholder="Question title" value={questionTitle} onChange={e => setQuestionTitle(e.target.value)} style={{ width: '100%', padding: '12px 14px', border: `1.5px solid ${theme.border}`, borderRadius: 10, fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box', background: theme.inputBg, color: theme.text }} />
              <textarea placeholder="Describe your question in detail..." value={questionBody} onChange={e => setQuestionBody(e.target.value)} rows={5} style={{ width: '100%', padding: '12px 14px', border: `1.5px solid ${theme.border}`, borderRadius: 10, fontSize: 14, fontFamily: 'inherit', resize: 'none', boxSizing: 'border-box', background: theme.inputBg, color: theme.text }} />
              <input type="text" placeholder="Tags (comma separated)" value={questionTags} onChange={e => setQuestionTags(e.target.value)} style={{ width: '100%', padding: '12px 14px', border: `1.5px solid ${theme.border}`, borderRadius: 10, fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box', background: theme.inputBg, color: theme.text }} />
              <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                <button onClick={() => setShowAskModal(false)} style={{ flex: 1, padding: 12, background: theme.cardBg, border: 'none', borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', color: theme.textSecondary }}>Cancel</button>
                <button onClick={handleAskQuestion} disabled={posting || !questionTitle.trim()} style={{ flex: 1, padding: 12, background: '#FF6B00', color: 'white', border: 'none', borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: posting ? 'not-allowed' : 'pointer', fontFamily: 'inherit', opacity: posting || !questionTitle.trim() ? 0.5 : 1 }}>{posting ? 'Posting...' : 'Ask Question'}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 600, background: theme.bg, borderTop: `1px solid ${theme.border}`, display: 'flex', justifyContent: 'space-around', padding: '8px 0', zIndex: 100, paddingBottom: 'max(8px, env(safe-area-inset-bottom))' }}>
        {tabs.map(tab => { const Icon = tab.icon; const isActive = (tab.id === 'forums'); return (<button key={tab.id} onClick={() => handleTabClick(tab.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, color: isActive ? '#FF6B00' : theme.textSecondary, fontFamily: 'inherit', transition: 'color 0.2s' }}><Icon /><span style={{ fontSize: 10, fontWeight: isActive ? 600 : 400 }}>{tab.label}</span></button>); })}
      </div>
    </div>
  );
};

export default Forums;