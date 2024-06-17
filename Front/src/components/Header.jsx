import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css'

function Header() {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        window.location.href = '/'; // Редирект на главную страницу
    };

    return (
        <header>
            <nav>
                <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>ТМЦ</NavLink>
                <NavLink to="/actual" className={({ isActive }) => isActive ? 'active' : ''}>Актуальное</NavLink>
                <NavLink to="/written-off" className={({ isActive }) => isActive ? 'active' : ''}>Списанное</NavLink>
                <NavLink to="/repair" className={({ isActive }) => isActive ? 'active' : ''}>На ремонте</NavLink>
                {isAuthenticated ? (
                    <button onClick={handleLogout} className={({ isActive }) => isActive ? 'active' : ''}>Выйти</button> // Используйте тот же класс, что и для NavLink
                ) : (
                    <NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''}>Авторизация</NavLink>
                )}
            </nav>
        </header>
    );
}

export default Header;
