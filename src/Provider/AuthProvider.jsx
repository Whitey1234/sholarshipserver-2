import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.init";
import axios from "axios";

// google provider
const Provider = new GoogleAuthProvider();

// create auth context

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoding] = useState(true);
  const [userRole, setUserRole] = useState('')

  useEffect(() => {
   // console.log("User Changed:", user);
  }, [user]);

  // firebase create user
  const createUser = (email, password) => {
    setLoding(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // firebase observe

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoding(false);
      const getToken = async () => {
        if (currentUser) {
          try {
            const token = await currentUser.getIdToken();
            localStorage.setItem("access-token", token); // Save token for later
           // console.log(" Firebase Access Token:", token);
           // add user role
            const res = await axios.get(`https://student-scholarship-ass-12.vercel.app/users/${currentUser.email}`);
          setUserRole(res.data.role);
          } catch (err) {
            console.error(" Failed to get Firebase token:", err);
             setUserRole(null);
          }
           finally {
        setLoding(false); // after token + role fetched
      }
        } else {
          localStorage.removeItem("access-token");
          setUserRole(null);
          setLoding(false)
        }
      };

     setLoding(false);
      getToken();
    });
    return () => {
      unSubscribe();
    };
  }, []);
  // firebase login
  const login = (email, password) => {
    setLoding(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //update user profile

  const updateUser = (updateData) => {
    return updateProfile(auth.currentUser, updateData);
  };
  //google log in
  const gLogin = () => {
    return signInWithPopup(auth, Provider);
  };

  // firebse loguut

  const logout = () => {
    return signOut(auth);
  };

// set role 
// useEffect(() => {
//   if (user?.email) {
//     axios.get(`https://student-scholarship-ass-12.vercel.app/users/${user.email}`)
//       .then(res => setUserRole(res.data.role));
//   }
// }, [user]);

  const authData = {
    createUser,
    user,



    /**@deprecated Do not use this function */
    setUser: setUser,
    logout,
    login,
    updateUser,
    loading,
    setLoding,
    gLogin,
    userRole
  };

  return <AuthContext value={authData}>{children}</AuthContext>;
};

export default AuthProvider;
