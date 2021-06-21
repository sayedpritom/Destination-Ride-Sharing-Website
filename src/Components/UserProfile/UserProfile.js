import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App';
import './UserProfile.css'
import firebase from "firebase/app";

const UserProfile = () => {
    const [currentUser, setCurrentUser] = useContext(UserContext)
    const handleLogOut = () => {
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            window.location.reload()
          }).catch((error) => {
            // An error happened.
          });
    }
    return (
        <div className="userProfile">
            <h1>{currentUser.displayName}</h1> <br />
            <img src={currentUser.photoURL} alt="" /> <br />
            <button onClick={() => handleLogOut()}>Log Out</button>
        </div>
    );
};

export default UserProfile;