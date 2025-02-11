import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
    let location = useLocation();
    let navigate = useNavigate();
    useEffect(() => {
        // console.log(location.pathname);
    }, [location]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('currentUserName');
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    iNotebook
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${
                                    location.pathname === '/' ? 'active' : ''
                                }`}
                                aria-current="page"
                                to="/"
                            >
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${
                                    location.pathname === '/about'
                                        ? 'active'
                                        : ''
                                }`}
                                to="/about"
                            >
                                About
                            </Link>
                        </li>
                    </ul>
                    {localStorage.getItem('token') && (
                        <div className="mx-3" style={{ color: 'white' }}>
                            Hello! {localStorage.getItem('currentUserName')}
                        </div>
                    )}
                    {!localStorage.getItem('token') ? (
                        <form className="d-flex" role="search">
                            <Link to="/login" className="btn btn-success mx-2">
                                Login
                            </Link>
                            <Link to="/signup" className="btn btn-primary mx-2">
                                Signup
                            </Link>
                        </form>
                    ) : (
                        <button
                            className="btn btn-primary"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}
