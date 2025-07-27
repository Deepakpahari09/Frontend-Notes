import { useState } from 'react';

export default function DiaryList({ entries, onUpdate, onDelete }) {
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState('');

  const handleEdit = (entry) => {
    setEditingId(entry.id);
    setEditedText(entry.text);
  };

  const handleUpdate = (id) => {
    onUpdate({ id, text: editedText, date: new Date().toLocaleDateString() });
    setEditingId(null);
  };

  return (
    <div className="diary-list">
      {entries.map((entry) => (
        <div key={entry.id} className="diary-card">
          <div className="diary-date">{entry.date}</div>
          {entry.image && <img src={entry.image} alt="Diary" className="entry-img" />}
          {editingId === entry.id ? (
            <>
              <textarea
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                rows="4"
              />
              <button onClick={() => handleUpdate(entry.id)}>Update</button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <p>{entry.text}</p>
              <button onClick={() => handleEdit(entry)}>✏️ Edit</button>
              <button onClick={() => onDelete(entry.id)}>🗑 Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
