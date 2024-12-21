import React, { useEffect, useState } from 'react';

const AdminPage = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('authToken'));
    if (user && user.role === 'admin') {
      setUserName(user.name); // Set user name if the role is admin
    }
  }, []);

  return (
    <div>
      <h1>Welcome, {userName}</h1>
      {/* Admin-specific content here */}
    </div>
  );
};

export default AdminPage;
