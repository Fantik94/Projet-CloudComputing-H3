import React, { useState } from 'react';

function AddBlog() {
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [image_url, setImageUrl] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const blog = { titre, description, image_url, pseudo };

    const response = await fetch('http://localhost:3000/blogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blog),
    });

    if (response.ok) {
      setMessage('Blog ajouté avec succès'); // Mettez à jour le message de confirmation
    }
  };

  return (
    <div className="add-blog-container">
      <form onSubmit={handleSubmit} className="add-blog-form">
        <h2>Ajouter un Blog</h2>
        <div>
          <label>Titre:</label>
          <input type="text" value={titre} onChange={(e) => setTitre(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
        </div>
        <div>
          <label>URL de l'Image:</label>
          <input type="text" value={image_url} onChange={(e) => setImageUrl(e.target.value)} />
        </div>
        <div>
          <label>Pseudo:</label>
          <input type="text" value={pseudo} onChange={(e) => setPseudo(e.target.value)} required />
        </div>
        <button type="submit">Ajouter le Blog</button>
        {message && <p className="success-message">{message}</p>} {/* Afficher le message de confirmation */}
      </form>
    </div>
  );
}

export default AddBlog;
