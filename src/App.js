import { useEffect, useState } from 'react';
import AuthForm from './components/AuthForm';
import DiaryForm from './components/DiaryForm';
import DiaryList from './components/DiaryList';

function App() {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem("diaryEntries");
    return saved ? JSON.parse(saved) : [];
  });

  const [user, setUser] = useState(localStorage.getItem("loggedInUser") || null);

  useEffect(() => {
    localStorage.setItem("diaryEntries", JSON.stringify(entries));
  }, [entries]);

  const addEntry = (entry) => {
    setEntries([entry, ...entries]);
  };

  const updateEntry = (updatedEntry) => {
    const updatedList = entries.map(entry =>
      entry.id === updatedEntry.id ? updatedEntry : entry
    );
    setEntries(updatedList);
  };

  const deleteEntry = (id) => {
    const filtered = entries.filter(entry => entry.id !== id);
    setEntries(filtered);
  };

  const handleLogin = (email) => {
    setUser(email);
    localStorage.setItem("loggedInUser", email);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("loggedInUser");
  };

  if (!user) return <AuthForm onAuth={handleLogin} />;

  return (
    <div className="container">
      <h1>📝 Daily Diary</h1>
      <p>Welcome, {user} <button onClick={handleLogout}>Logout</button></p>
      <DiaryForm onAdd={addEntry} />
      <DiaryList entries={entries} onUpdate={updateEntry} onDelete={deleteEntry} />
    </div>
  );
}

export default App;
