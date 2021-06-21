import React from 'react';
import './Login.css';
import "firebase/auth";
import { useHistory, useLocation } from 'react-router-dom';
import googleG from '../../images/googleG.png'
import { useState } from 'react';
import firebase from "firebase/app";
import firebaseConfig from '../../firebase.config';
import { useContext } from 'react';
import { UserContext } from '../../App';

firebase.initializeApp(firebaseConfig);

const Login = (props) => {

    const [displayNameDidUpdate, setDisplayNameDidUpdate] = props.displayNameStatus;
    const [form, setForm] = useState('createAccount');
    const [response, setResponse] = useState('');
    const [user, setUser] = useState({
        email: '',
        password: '',
        name: '',
    })

    const handleBlur = e => {
        let isFormValid;

        if (e.target.name === 'email') {
            isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
            isFormValid ? setResponse('') : setResponse('Email Address is not valid!');
        } else if (e.target.name === 'password') {
            isFormValid = e.target.value.length > 6 && /\d{1}/.test(e.target.value);
            isFormValid ? setResponse('') : setResponse('Password needs to have at least 6 characters including a number');
        } else if (e.target.name === "confirmPassword") {
            isFormValid = e.target.value === document.getElementById("firstPassword").value;
            isFormValid ? setResponse('') : setResponse('Password did not match!');
        } else if (e.target.name === "name") {
            isFormValid = e.target.value.length > 2;
            isFormValid ? setResponse('') : setResponse('Password did not match!');
        }

        if (isFormValid) {
            let newUser = { ...user, };
            newUser[e.target.name] = e.target.value
            setUser(newUser)
        }
    }

    const handleSubmit = (e) => {
        const email = user.email;
        const password = user.password;
        const name = user.name;

        if (form === 'createAccount') {
            if (email && password && name) {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then((userCredential) => {
                        updateUserName(name);
                    })
                    .catch((error) => {
                        console.log(error.message);
                    })
            }
        }
        if (form === 'login') {
            if (email && password) {
                firebase.auth().signInWithEmailAndPassword(email, password)
                    .then((userCredential) => {
                        console.log(userCredential.user);
                    })
                    .catch((error) => {
                        var errorMessage = error.message;
                        console.log(errorMessage);
                    });
                console.log("login" + email, password, form);

            }
        }
        e.preventDefault();
    }

    console.log(form);

    const updateUserName = name => {
        const user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: name
        }).then(res => {
            setDisplayNameDidUpdate(true)
        }).error(err => {
            console.log(err);
        })
    }

    const googleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
            }).catch((error) => {
                var errorMessage = error.message;
                console.log(errorMessage);
            });
    }


    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        history.replace(from)
    } else {
      // User is signed out
      // ...
    }
  });

    return (
        <div className="login">
            <div >
                {form === 'login' ?
                    <form onSubmit={handleSubmit}>
                        <h2>Login</h2>
                        <input type="email" onBlur={handleBlur} placeholder="Email" name="email" id="" /> <br />
                        <input type="password" onBlur={handleBlur} placeholder="Password" name="password" id="" /> <br />
                        <button type="submit">Login</button>
                        <p>{response}</p>
                        <p>Don't have an account? <button onClick={() => setForm('createAccount')} className="formToggler">Create an account</button></p>
                    </form>
                    :
                    <form onSubmit={handleSubmit}>
                        <h2>Create Account</h2>
                        <input type="name" onBlur={handleBlur} required placeholder="Name" name="name" id="" /> <br />
                        <input type="email" onBlur={handleBlur} placeholder="Email" name="email" id="email" /> <br />
                        <input type="password" onBlur={handleBlur} placeholder="Password" name="password" id="firstPassword" /> <br />
                        <input type="password" onBlur={handleBlur} placeholder="Confirm Password" name="confirmPassword" id="confirmPassword" /> <br />
                        <button type="submit">Create an account</button>
                        <p>{response}</p>
                        <p>Already have an account? <button onClick={() => setForm("login")} className="formToggler">Login</button></p>
                    </form>}
                <p>Or</p>
                <div onClick={googleSignIn} className="signInWithGoogle">
                    <img src={googleG} alt="" />
                    <p>Continue With Google</p>
                </div>
            </div>
        </div>
    );
};

export default Login;