import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Ensure this line is added to resolve the warning

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [editItemId, setEditItemId] = useState(null);
  const [editItemName, setEditItemName] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/items')
      .then(response => setItems(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleAddItem = () => {
    axios.post('http://localhost:3001/items', { name: newItem })
      .then(response => {
        setItems([...items, response.data]);
        setNewItem('');
      })
      .catch(error => console.error(error));
  };

  const handleEditItem = () => {
    axios.put(`http://localhost:3001/items/${editItemId}`, { name: editItemName })
      .then(response => {
        const updatedItems = items.map(item => {
          if (item.id === editItemId) {
            return { ...item, name: editItemName };
          }
          return item;
        });
        setItems(updatedItems);
        setEditItemId(null);
        setEditItemName('');
        setModalOpen(false);
      })
      .catch(error => console.error(error));
  };

  const handleEditButtonClick = (id, name) => {
    setEditItemId(id);
    setEditItemName(name);
    setModalOpen(true);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div>
        <button onClick={() => setModalOpen(true)}>Open Modal</button>
        <Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)} style={modalStyles}>
          <h2 style={{ color: '#333', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>{editItemId ? 'Edit Item' : 'Add New Item'}</h2>
          <input type="text" value={editItemId ? editItemName : newItem} onChange={e => editItemId ? setEditItemName(e.target.value) : setNewItem(e.target.value)} style={inputStyles} />
          <button onClick={editItemId ? handleEditItem : handleAddItem} style={buttonStyles}>{editItemId ? 'Edit Item' : 'Add Item'}</button>
          <h2 style={{ color: '#333', borderBottom: '1px solid #ccc', paddingBottom: '10px', marginTop: '20px' }}>Items</h2>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {items.map(item => (
              <li key={item.id} style={{ marginBottom: '5px', borderBottom: '1px solid #ccc', paddingBottom: '5px' }}>
                {item.name}
                <button onClick={() => handleEditButtonClick(item.id, item.name)} style={{ marginLeft: '10px' }}>Edit</button>
              </li>
            ))}
          </ul>
          <button onClick={() => setModalOpen(false)} style={{ ...buttonStyles, marginTop: '20px' }}>Close Modal</button>
        </Modal>
      </div>
    </div>
  );
}

export default App;

const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  content: {
    width: '50%',
    margin: 'auto',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '20px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  }
};

const inputStyles = {
  width: '100%',
  padding: '5px',
  marginBottom: '10px',
  borderRadius: '3px',
  border: '1px solid #ccc',
};

const buttonStyles = {
  backgroundColor: '#007bff',
  color: '#fff',
  padding: '5px 10px',
  border: 'none',
  borderRadius: '3px',
  cursor: 'pointer',
  marginRight: '10px',
};
