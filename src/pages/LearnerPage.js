import React, { useEffect, useState } from 'react';

const LearnerPage = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('authToken'));
    if (user && user.role === 'learner') {
      setUserName(user.name); // Set user name if the role is learner
    }
  }, []);

  return (
    <div>
      <h1>Welcome, {userName}</h1>
      {/* Learner-specific content here */}
    </div>
  );
};

export default LearnerPage;
