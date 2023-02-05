import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { AuthContext } from "../App";
import { auth, db } from "../firebase";
import CreateTask from "../CreateTask/CreateTask";
import Profile from "../Profile/Profile";
import UserProfile from "../Profile/UserProfile";
import EditProfile from "../EditProfile/EditProfile";
import { collection, addDoc, getDocs, query, where, doc, getDoc } from "firebase/firestore";


const Home = () => {

    const { currentUser } = useContext(AuthContext);
    const [type, setType] = useState(null)

    useEffect(() => {

        async function getUserInfo() {
            if (!currentUser) return;

            const docRef = doc(db, "companies", currentUser.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setType("company")

            } else {
                setType("user")
            }

        }
        getUserInfo()

    }, []);









    const handleSignOut = (e) => {

        e.preventDefault();

        const auth = getAuth();
        signOut(auth).then(() => {
            console.log("signed out")
            return <Navigate to="/login" />;
        }).catch((error) => {
            // An error happened.
        });
    }

    if (!currentUser) {
        return <Navigate to="/login" />;
    }


    return (
        <>
            {type == "company" &&

                <Profile></Profile>}

            {type == "user" &&

                <UserProfile></UserProfile>}
        </>
    );
};

export default Home;