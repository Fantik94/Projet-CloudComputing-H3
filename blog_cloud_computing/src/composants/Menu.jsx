import { NavLink , useNavigate } from "react-router-dom"

function Menu() {
    return ( 
        <div className="bg-dark mb-3">
            <nav className="navbar navbar-expand navbar-dark container">
                <span className="navbar-brand fs-3">
                    Mini E comerce
                </span>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink to="/Acceuil" className="nav-link">Catalogue</NavLink>
                    </li>
                </ul>
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <NavLink to="/Panier" className="nav-link">Panier</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/Commande" className="nav-link">dev</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Menu;