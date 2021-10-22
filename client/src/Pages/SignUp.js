import React, {useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import equals from 'validator/lib/equals';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import './SignUp.css'
import {showErrorMsg, showSuccessMsg, showLoading}from '../helpers/Message'
import { signup,signin } from '../Api/Auth';
 import {  isAuthenticated, setAuthentication } from '../helpers/auth';
import {  useHistory } from 'react-router-dom';



const SignUp = () => {
    let history = useHistory();
  
    const[formData,setFormData]=useState({
        username: '',
        email: '',
        password: '',
        password2: '',
        successMsg: false,
        errorMsg: false,
        loading: false
    })
    const {username, email, password, password2, successMsg, errorMsg, loading} = formData;
    
    const handleChange = e => {   
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
            successMsg: '',
            errorMsg: ''
        });
    }
   
 
    const handleSubmit = (evt) => {
        evt.preventDefault();
        if(isEmpty(username) || isEmpty(email) || isEmpty(password) || isEmpty(password2)){
            setFormData({
                ...formData,
                errorMsg: 'All fields are required'
            })
        } else if (!isEmail(email)){
            setFormData({
                ...formData,
                errorMsg: 'Invalid email'
            })
        } else if (!equals(password, password2)){
            setFormData({
                ...formData,
                errorMsg: 'Passwords do not match'
            })
        } else {
            const { username, email, password } = formData;
            const data = { username, email, password };
           
            signup(data).then(response => {
                    console.log(response);
                    const {token,user}=response.data
                    setAuthentication(token,user)
                    if(isAuthenticated() && isAuthenticated().role === 1){
                        console.log('Redirection to admin dashboard');
                       history.push('/admin/dashboard');
                   }else if(isAuthenticated() && isAuthenticated().role === 0){ 
                       console.log('Redirecting to user dashboard');
                      history.push(`/user/${user._id}`);
                    }
                    setFormData({
                        ...formData,
                        username: '',
                        email: '',
                        password: '',
                        password2: '',
                        profilPic:null,
                        loading: false,
                        successMsg: response.data.successMessage
                    })
                })
                    .catch ((err) => {
                    console.log('Axios signup error: ', err);
                    setFormData({...formData,loading: false, errorMsg: err.response.data.errorMessage});
                });
            }
    }


const showSignupForm = () => ( 
    <div className='form__container' onSubmit={handleSubmit}>
        <div className='row px-10 vh-100'>
            <div className='col-md-5 align-self-center mx-auto '>
                <form className='signup-form'  >
                <div className='form-group input-group'>
                    <div className='input-group-prepend'>
                        <span className='input-group-text'>
                            <i className='fa fa-user'></i>
                        </span>
                    </div>
                    <input 
                        name='username'
                        value={username}
                        className='form-control'
                        placeholder='Username'
                        type='text'
                        onChange={handleChange}
                    />
                </div>
                {/* email */}
                <div className='form-group input-group'>
                    <div className='input-group-prepend'>
                        <span className='input-group-text'>
                            <i className='fa fa-envelope'></i>
                        </span>
                    </div>
                    <input
                        name='email'
                        value={email}
                        className='form-control'
                        placeholder='Email address'
                        type='email'
                        onChange={handleChange}
                    />
                </div>
                {/* password */}
                <div className='form-group input-group'>
                    <div className='input-group-prepend'>
                        <span className='input-group-text'>
                            <i className='fa fa-lock'></i>
                        </span>
                    </div>
                    <input 
                        name='password'
                        value={password}
                        className='form-control'
                        placeholder='Create password'
                        type='password'
                     onChange={handleChange}
                    />
                </div>
                {/* password2 */}
                <div className='form-group input-group'>
                    <div className='input-group-prepend'>
                        <span className='input-group-text'>
                            <i className='fa fa-lock'></i>
                        </span>
                    </div>
                    <input 
                        name='password2'
                        value={password2}
                        className='form-control'
                        placeholder='Confirm password'
                        type='password'
                        onChange={handleChange}
                    />
                 
               </div>
                {/* signup button */}
                <div className='form-group'>
                    <button type='submit' className='btn btn-primary btn-block'>
                        Signup
                    </button>
                </div>
                {/* already have account */}
                <p className='text-center text-black'>
                    Have an account?<Link to='/signin'>Log In</Link>
                </p>
            </form>
            </div>
    </div>
    </div>
    )

    
    return (
        <div className='signup-container' noValidate>
        <div className='row px-3 vh-100'>
            <div className='col-md-5 mx-auto align-self-center'>
                {successMsg && showSuccessMsg(successMsg)}
                {errorMsg && showErrorMsg(errorMsg)}
                {loading && <div className='text-center pd-4'>{showLoading()}</div>} 
                {showSignupForm()}
                {/*<p style={{color:'black'}}>{JSON.stringify(formData)}</p>*/}
            </div>
        </div>
    </div>
);
}


export default SignUp
