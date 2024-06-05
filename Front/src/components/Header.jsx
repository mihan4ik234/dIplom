import { NavLink } from 'react-router-dom';
import './Header.css'

function Header() {
    return (
        <header>
            <nav>
                <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>ТМЦ</NavLink>
                <NavLink to="/actual" className={({ isActive }) => isActive ? 'active' : ''}>Актуальное</NavLink>
                <NavLink to="/written-off" className={({ isActive }) => isActive ? 'active' : ''}>Списанное</NavLink>
                <NavLink to="/repair" className={({ isActive }) => isActive ? 'active' : ''}>На ремонте</NavLink>
                <NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''}>Авторизация</NavLink>
            </nav>
        </header>
    );
}

export default Header;
