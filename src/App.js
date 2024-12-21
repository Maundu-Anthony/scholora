import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Authentication from './components/Authentication';
import TeacherPage from './pages/TeacherPage';
import AdminPage from './pages/AdminPage';
import LearnerPage from './pages/LearnerPage';

const DashboardRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('authToken'));
    if (user) {
      if (user.role === 'teacher') {
        navigate('/teacher');
      } else if (user.role === 'admin') {
        navigate('/admin');
      } else if (user.role === 'learner') {
        navigate('/learner');
      } else {
        navigate('/'); // Redirect to login if the role is unknown
      }
    } else {
      navigate('/'); // Redirect to login if no user is found
    }
  }, [navigate]);

  return <div>Redirecting...</div>;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Authentication />} />
        <Route path="/dashboard" element={<DashboardRedirect />} />
        <Route path="/teacher" element={<TeacherPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/learner" element={<LearnerPage />} />
      </Routes>
    </Router>
  );
};

export default App;
