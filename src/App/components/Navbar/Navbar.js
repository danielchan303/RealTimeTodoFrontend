import React, {useContext} from 'react';
import {connect} from 'react-redux';
import {NavLink, Link} from 'react-router-dom';
import AppContext from '../../AppContext';
import './Navbar.css';

const Navbar = (props) => {
    const appContext = useContext(AppContext);

    const logout = () => {
        appContext.auth().signOut();
    }

    let authLink;
    if (props.isLoggedIn === true) {
        authLink = <Link to="/" onClick={logout}>Logout</Link>;
    } else if (props.isLoggedIn === false) {
        authLink = <NavLink to="/login">Login</NavLink>;
    }

    return (
        <nav className="Navbar">
            <Link id="BrandNav" to="/">Realtime Todo</Link>
            <ul>
                {authLink}
            </ul>
        </nav>
    );
};

const mapStateToProps = state => {
    return {
        isLoggedIn: state.auth.isLoggedIn
    };
};

export default connect(mapStateToProps)(Navbar);