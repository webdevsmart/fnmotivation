// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "../../configs/firebase.config";

export const initializeFirebaseApp = () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
}
initializeFirebaseApp()



export const googleLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
    
        .then((result) => {

            var user = result.user;
            const {photoURL, displayName, email, uid} = result.user;
            const newUser = {
                photo :  photoURL,
                name: displayName,
                email: email,
                id: uid
            }
            return newUser;

        }).catch((error) => {
            const newUser = {};
            newUser.error = error.message;
            return newUser;

        });

}

export const signUpwithPassword = (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
            const newUser = res.user;
            newUser.error = '';
            newUser.suscess = true;
            return newUser;

        })
        .catch(error => {
            const newUser = {};
            newUser.error = error.message;
            newUser.suscess = false;
            return newUser;

        });

}

export const signInwithEmail = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
            const newUser = res.user;
            newUser.error = '';
            newUser.suscess = true;
            return newUser;
        })
        .catch(error => {
            const newUser = {};
            newUser.error = error.message;
            newUser.suscess = false;
            return newUser;
        });

}

export const idToken = () => {
    return firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function (idToken) {
        localStorage.setItem('token', idToken)
    }).catch(function (error) {
        // Handle error
    });
}

