import { useState } from 'react';

export default function DiaryForm({ onAdd }) {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newEntry = {
      id: Date.now(),
      text,
      image,
      date: new Date().toLocaleDateString(),
    };

    onAdd(newEntry);
    setText('');
    setImage(null);
  };

  return (
    <form onSubmit={handleSubmit} className="diary-form">
      <textarea
        placeholder="How was your day?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="4"
      />
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button type="submit">📩 Save Entry</button>
    </form>
  );
}
