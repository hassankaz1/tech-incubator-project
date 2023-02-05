import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { AuthContext } from "../App";
import { auth, db } from "../firebase";
import { collection, addDoc, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import "./EditProfile.css";
import { computeHeadingLevel } from "@testing-library/react";
import { faL } from "@fortawesome/free-solid-svg-icons";



const EditProfile = () => {

    const { currentUser } = useContext(AuthContext);
    const [details, setDetails] = useState(null);
    const [photo, setPhoto] = useState(null)


    useEffect(() => {

        async function getUserInfo() {

            const docRef = doc(db, "companies", currentUser.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                let ci = docSnap.data()
                setDetails(ci)
                console.log(details)
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }

        }
        getUserInfo()

    }, []);

    const handleForm = async (e) => {
        e.preventDefault();
        let title = e.target.title.value;
        // let image = e.target.files[0]
        let description = e.target.description.value;
        console.log(photo)

        // const dataToAdd = {
        //     title,
        //     deadline,
        //     description,
        //     author: auth.currentUser.uid,
        //     completed: false,
        //     student: null
        // }
        // console.log(deadline);
        // console.log(dataToAdd)


        // try {
        //     const docRef = await addDoc(collection(db, "tasks"), dataToAdd);
        //     console.log("Document written with ID: ", docRef.id);
        // } catch (e) {
        //     console.error("Error adding document: ", e);
        // }

        title = "";
    }

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setPhoto(e.target.files[0]);
        }

    }




    return (

        <div>
            <header className="instr">
                <h3>Edit Your Profile</h3>
                <p>Name | Photo | Description</p>
            </header>
            <form id="taskform" className="topBefore" onSubmit={handleForm}>
                <input className="ct" name="title" id="title" type="text" placeholder={details ? (details.info.companyName) : ("")} />
                <input type="file" accept="image/png, image/jpeg" onChange={handleChange} />
                <textarea className="ct" name="description" id="description" type="text" placeholder="DESCRIPTION"></textarea>
                <input id="submit" type="submit" value="GO!" />
            </form>
        </div>
    )


}

export default EditProfile;