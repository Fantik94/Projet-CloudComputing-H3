import { NavLink } from "react-router-dom";

function Menu() {
    return ( 
        <div className="bg-dark mb-3">
            <nav className="navbar navbar-expand navbar-dark container">
                <NavLink to="/" className="navbar-brand fs-3">
                <i>DADABAPT.blog</i>
                </NavLink>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                            Accueil
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/add-blog" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                            Ajouter un Blog
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/blog-list" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                            Gérer les Blogs
                        </NavLink>
                    </li>
                </ul>
               
            </nav>
        </div>
    );
}

export default Menu;
