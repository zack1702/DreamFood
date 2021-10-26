import React, { Fragment } from 'react';
import { Link, withRouter} from 'react-router-dom';
import { isAuthenticated, logout } from '../helpers/auth';
import {useSelector} from 'react-redux'

import SearchIcon from '@mui/icons-material/Search';
import './Header.css'

import { Badge } from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";


const Header = ({history}) => {
    const {cart}=useSelector(state=>state.cart)
    // const cartItems = localStorage.getItem('cart')
    // ? JSON.parse(localStorage.getItem('cart'))
    // : [];
    const {user}=useSelector(state=>state.users)
    const quantity = cart?.length;
    const handleLogout = evt => {
        logout(() => {
            history.push('/signin');
        });
    }
    // views
    const showNavigation = () => (
        <div className="header_view"> 
            <div className="header__left">
                    <img className='logo' src="/assets/images/logo.png" alt="DreamFood" />
                    <div className="header__input">
                        <SearchIcon /> 
                        <input placeholder='Search' type="text" />
                    </div>
            </div>
            <div className="header__centre">
                <div className="header__option">
                    <ul className="header__option mt-2 mt-lg-0"> 
                        {!isAuthenticated() && (
                            <Fragment>
                                <li className="nav-item">
                                    <Link to='/' className="nav-link"><i className='fas fa-home' /> Home</Link>
                                </li>

                                <li className="nav-item">
                                    <Link to='/signup' className="nav-link"><i className='fas fa-edit' /> Signup</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/signin' className="nav-link"><i className='fas fa-sign-in-alt' /> Signin</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/shop' className="nav-link"><i className='fas fa-shopping-bag' /> Shop</Link>
                                </li>
                                <Link to="/cart">
                                        <div className='menu__iteme'>
                                            <Badge badgeContent={quantity} color="primary">
                                            <ShoppingCartOutlined />
                                            </Badge>
                                        </div>
                                 </Link>
                            </Fragment>
                        )}
                        {isAuthenticated() && isAuthenticated().role === 1 && (
                            <Fragment>
                                <li className="nav-item">
                                    <Link to='/admin/dashboard' className="nav-link"><i className='fas fa-home' /> Dashboard</Link>
                                </li>
                                <Link to="/cart">
                                        <div className='menu__iteme'>
                                            <Badge badgeContent={quantity} color="primary">
                                            <ShoppingCartOutlined />
                                            </Badge>
                                        </div>
                                 </Link>
                            </Fragment>
                        )}
                        {isAuthenticated() && isAuthenticated().role === 0 && (
                          <Fragment>
                                <li className="nav-item">
                                    <Link to='/shop' className="nav-link"><i className='fas fa-shopping-bag' /> Shop</Link>
                                </li>
                             
                         </Fragment>
                            
                        )}
                       {isAuthenticated() && ( 
                            <Fragment>
                                <li className="nav-item">
                                    <button className="btn btn-link text-secondary 
                                    text-decoration-none pl-0" onClick={handleLogout}>
                                    <i className='fas fa-sign-out-alt' /> Logout</button>
                                </li>
                                <div className="header__right">
                                    <div className="header__info">
                                       <img src={user?.profilPic} alt={user?.username} />
                                       <h6>Welkom {user?.username}</h6>
                                      
                                    </div>
                                    <Link to="/cart">
                                <div className='menu__iteme'>
                                    <Badge badgeContent={quantity} color="primary">
                                    <ShoppingCartOutlined />
                                    </Badge>
                                </div>
                         </Link>
                                 
                                    </div>
                            </Fragment>)}
                        
                     </ul> 
                </div>
                </div>
            
               
            
        </div>    
    )
    // render
    return (
        <div className="header">
            { showNavigation() }
        </div>
    );
};

export default withRouter(Header);