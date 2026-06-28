import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function MoodBoard() {
  const [items, setItems] = useLocalStorage('cipher_moodboard', []);
  const [inputValue, setInputValue] = useState('');

  const handleAddItem = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      setItems([...items, { id: Date.now(), value: inputValue.trim() }]);
      setInputValue('');
    }
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const isHex = (val) => /^#([0-9A-F]{3}){1,2}$/i.test(val);

  return (
    <div className="mood-board">
      <h2>MoodBoard</h2>
      <input 
        type="text" 
        placeholder="Enter Hex (#ff0000) or Image URL..." 
        value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)} 
        onKeyDown={handleAddItem}
        style={{ width: '100%', maxWidth: '400px', padding: '8px' }}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '15px', marginTop: '20px' }}>
        {items.map(item => (
          <div 
            key={item.id} 
            onClick={() => removeItem(item.id)}
            style={{
              width: '100px', height: '100px', cursor: 'pointer',
              backgroundColor: isHex(item.value) ? item.value : 'transparent',
              backgroundImage: !isHex(item.value) ? `url(${item.value})` : 'none',
              backgroundSize: 'cover', backgroundPosition: 'center',
              border: '1px solid #333', borderRadius: '8px'
            }}
            title="Click to remove"
          />
        ))}
      </div>
    </div>
  );
}