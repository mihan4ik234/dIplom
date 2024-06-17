import React, { useState } from 'react';
import './Login.css';

function Login() {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [errors, setErrors] = useState({ username: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'username' && value.trim() === '') {
            setErrors({ ...errors, username: 'Имя пользователя не должно быть пустым' });
        } else if (name === 'password' && value.trim().length < 6) {
            setErrors({ ...errors, password: 'Пароль должен содержать не менее 6 символов' });
        } else {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validCredentials = [
            { username: 'admin', password: 'admin' },
            { username: 'buh', password: 'buhalter' }
        ];
        
        const isValid = validCredentials.some(creds => formData.username === creds.username && formData.password === creds.password);

        if (isValid) {
            console.log('Форма отправлена:', formData);
            localStorage.setItem('isAuthenticated', 'true');
            window.location.href = '/'; // Редирект на главную страницу
        } else {
            console.log('Ошибка валидации');
            // Обработка ошибки аутентификации
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <h1 className="login-heading">Авторизация</h1>
                    <label htmlFor="username" className="label">Имя пользователя</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className={`input ${errors.username ? 'input-error' : ''}`}
                    />
                    {errors.username && <span className="error-message">{errors.username}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="label">Пароль</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`input ${errors.password ? 'input-error' : ''}`}
                    />
                    {errors.password && <span className="error-message">{errors.password}</span>}
                </div>
                <button type="submit" className="login-button">Войти</button>
            </form>
        </div>
    );
}

export default Login;
