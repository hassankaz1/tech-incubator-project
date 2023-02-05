import React, { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { AuthContext } from "../App";
import { auth, db } from "../firebase";
import { collection, addDoc, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import TaskItem from "../TaskItem/TaskItem"
import TaskList from "../TaskList/TaskList"
import AvailableList from "../TaskList/AvailableList";
import "../Profile/Profile.css"



function ViewProjects() {
    const { currentUser } = useContext(AuthContext);

    const [availableTasks, setAvailableTasks] = useState([]);
    // const [completed, setCompleted] = useState(0);
    // const [userDetails, setUserDetails] = useState({});

    let date = new Date()
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();


    const months = ["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"];

    let currentDate = `${months[month]} ${day}, ${year}`
    useEffect(() => {

        async function getTasks() {
            const q = query(collection(db, "tasks"), where("student", "==", null));

            const querySnapshot = await getDocs(q);
            const docs = querySnapshot.docs.map((doc) => {
                const data = doc.data()
                data.id = doc.id
                return data
            })

            setAvailableTasks(docs)
            console.log(availableTasks)
            console.log(docs)

        }
        getTasks()

    }, []);

    // useEffect(() => {

    //     async function getUserInfo() {

    //         const docRef = doc(db, "users", currentUser.uid);
    //         const docSnap = await getDoc(docRef);

    //         if (docSnap.exists()) {
    //             let ci = docSnap.data()
    //             setUserDetails(ci)
    //         } else {
    //             // doc.data() will be undefined in this case
    //             console.log("No such document!");
    //         }

    //         // setCompleted(counter);

    //     }
    //     getUserInfo()

    // }, []);



    return (
        <div className="app-container">
            <div className="app-content">
                <div class="projects-section">
                    <div class="projects-section-header">
                        <p>{availableTasks.length} Projects Available</p>
                        <p class="time">{currentDate}</p>
                    </div>

                    <div class="project-boxes jsListView">

                        <div class="project-box-wrapper">
                            <div class="project-box" style={{ backgroundColor: "#d5deff" }}>
                                <div class="project-box-header">
                                    <span>date created</span>
                                    <div class="more-wrapper">
                                        <button class="project-btn-more">
                                        </button>
                                    </div>
                                </div>
                                <div class="project-box-content-header">
                                    <p class="box-content-header">Company Name</p>
                                    {/* <p class="box-content-subheader">{description}</p> */}
                                </div>
                                <div class="box-progress-wrapper">
                                    <p className="phead">Project Title</p>
                                    <p>Project Description</p>


                                </div>
                                <div class="project-box-footer">
                                    <button className="s editinf" >Sample</button>
                                    <div class="participants">


                                    </div>
                                    <div class="days-left" style={{ color: "#4067f9" }}>
                                        Due Date
                                    </div>
                                </div>
                            </div>
                        </div>

                        {availableTasks.length > 0 ? (<AvailableList tasks={availableTasks}></AvailableList>) : (<></>)}

                    </div>
                </div>
            </div>
        </div>


    )


}

export default ViewProjects;


