import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsTrash } from 'react-icons/bs';
import { BiPencil } from 'react-icons/bi';


function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  useEffect(() => {
    fetch('http://20.111.16.18:3000/all-blogs')
      .then((response) => response.json())
      .then((data) => setBlogs(data));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://20.111.16.18:3000/blogs/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          setBlogs(blogs.filter((blog) => blog.id !== id));
          setDeleteConfirmation(null); 
        }
      });
  };

  return (
    <div className="blog-list">
      {blogs.map((blog) => (
        <div key={blog.id} className="blog-item">
          <img className="blog-image" src={blog.image_url} alt={blog.titre} />
          <h2>{blog.titre}</h2>
          <p>{blog.description}</p>
          <p>Par {blog.pseudo}</p>
          <div>
            <button onClick={() => setDeleteConfirmation(blog.id)}>
              <BsTrash />
            </button>
            <Link to={`/edit/${blog.id}`}>
              <BiPencil />
            </Link>
          </div>
          {deleteConfirmation === blog.id && (
            <div className="delete-confirmation">
              <p>Confirmez la suppression de ce blog ?</p>
              <button onClick={() => handleDelete(blog.id)}>Oui</button>
              <button onClick={() => setDeleteConfirmation(null)}>Annuler</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default BlogList;
