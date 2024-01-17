import './App.css'

import React, { useState, useEffect } from 'react';

function App() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/all-blogs')
      .then(response => response.json())
      .then(data => setBlogs(data))
      .catch(error => console.error('Erreur lors de la récupération des blogs', error));
  }, []);

  return (
    <div>
      <h1>Liste des Blogs</h1>
      <ul>
        {blogs.map(blog => (
          <li key={blog.id}>
            <p className='texte'>
            <strong>{blog.titre}</strong> - {blog.description}
            <br/>
            {blog.image_url && <img src={blog.image_url} alt={`Image pour ${blog.titre}`} />}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;