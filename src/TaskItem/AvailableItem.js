import React, { useContext, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { AuthContext } from "../App";
import { auth, db } from "../firebase";
import { collection, addDoc, getDocs, query, where, doc, getDoc, updateDoc } from "firebase/firestore";
import "../Profile/Profile.css";
import "./TaskItem.css"


function AvailableItem({ task }) {

    const navigate = useNavigate()
    const { currentUser } = useContext(AuthContext);
    const { deadline, description, title, student, completed, author, id } = task
    const [companyName, setCompanyName] = useState("loading");
    console.log(typeof deadline)
    let news = new Date(deadline);
    console.log(news)

    let currdate = new Date()
    let daysLeft = Math.floor(Math.abs(news - currdate) / 86400000);


    useEffect(() => {

        async function getCompanyName() {
            if (!currentUser) return;

            const docRef = doc(db, "companies", author);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setCompanyName(docSnap.data().info.companyName)

            }

        }
        getCompanyName()

    }, []);

    const handleClick = async (e) => {
        e.preventDefault();
        console.log(id)
        console.log(currentUser.uid)
        const taskRef = doc(db, "tasks", id);

        await updateDoc(taskRef, {
            student: currentUser.uid

        })

        navigate("/")
    }

    return (

        <div class="project-box-wrapper">
            <div class="project-box" style={{ backgroundColor: "#fee4cb" }}>
                <div class="project-box-header">
                    <span>{deadline}</span>
                    <div class="more-wrapper">
                        <button class="project-btn-more">
                        </button>
                    </div>
                </div>
                <div class="project-box-content-header">
                    <p class="box-content-header">{companyName}</p>
                    {/* <p class="box-content-subheader">{description}</p> */}
                </div>
                <div class="box-progress-wrapper">
                    <p className="phead">{title}</p>
                    <p>{description}</p>


                </div>
                <div class="project-box-footer">
                    <button className="editinf" onClick={handleClick}>Sign Up</button>
                    <div class="participants">


                    </div>
                    <div class="days-left" style={{ color: "#ff942e" }}>
                        {daysLeft} Days Left
                    </div>
                </div>
            </div>
        </div>


    )


}

export default AvailableItem;