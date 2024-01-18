import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditBlog() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        fetch(`http://20.111.16.18:3000/blogs/${id}`)
            .then(response => response.json())
            .then(data => setBlog(data));
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`http://20.111.16.18:3000/blogs/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(blog)
        })
            .then(() => {
                navigate('/blog-list');
            });
    };

    if (!blog) {
        return <div>Chargement...</div>;
    }

    return (
        <div className="edit-blog-container">
            <h2>Modifier le Blog</h2>
            <form onSubmit={handleSubmit} className="edit-blog-form">
                <div className="form-group">
                    <label>Titre</label>
                    <input
                        type="text"
                        className="form-control"
                        value={blog.titre}
                        onChange={(e) => setBlog({...blog, titre: e.target.value})}
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        className="form-control"
                        value={blog.description}
                        onChange={(e) => setBlog({...blog, description: e.target.value})}
                    ></textarea>
                </div>
                <div className="form-group">
                    <label>URL de l'image</label>
                    <input
                        type="text"
                        className="form-control"
                        value={blog.image_url}
                        onChange={(e) => setBlog({...blog, image_url: e.target.value})}
                    />
                </div>
                <div className="form-group">
                    <label>Pseudo</label>
                    <input
                        type="text"
                        className="form-control"
                        value={blog.pseudo}
                        onChange={(e) => setBlog({...blog, pseudo: e.target.value})}
                    />
                </div>
                <button type="submit" className="btn-submit">Mettre à jour</button>
            </form>
        </div>
    );
}
export default EditBlog;