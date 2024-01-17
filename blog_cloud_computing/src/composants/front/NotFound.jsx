import { Link } from "react-router-dom"

const NotFound = () => {
    return ( <>
        <h1 className="bg-warning p-3 display-2 text-center rounded">Page 404 <small>page introuvable</small></h1>
         <div className="text-center">
            <img src="404.gif" alt="" className="rounded mb-2"/>
         </div>
         <Link to={`/acceuil`} className="btn btn-warning d-flex justify-content-center">Retourner sur le catalogue</Link>
    </> );
}
 
export default NotFound;