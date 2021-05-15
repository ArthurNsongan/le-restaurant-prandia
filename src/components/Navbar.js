import './Navbar.css'
import logo from '../logo.svg';
import { NavLink } from 'react-router-dom'

function Navbar() {

    return (
        <nav id="navBar" className="NavBar">
            <div className="NavBar__Container">
                <div className="NavBar__Logo">
                    {/* <img src={logo} /> */}
                    <h3 className="font-2">Le Prandia</h3>
                </div>
                <div className="NavBar__Container__List">
                    <ul className="NavBar__List">
                        <li><NavLink exact to="/" activeClassName="active">Accueil</NavLink></li>
                        <li><NavLink to="/menu" activeClassName="active">Menu</NavLink></li>
                        <li><NavLink to="/cart" activeClassName="active">Panier</NavLink></li>
                        <li><NavLink to="/admin/menu" activeClassName="active">Admin</NavLink></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar