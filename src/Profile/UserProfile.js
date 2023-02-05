import React, { useContext, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { AuthContext } from "../App";
import { auth, db } from "../firebase";
import { collection, addDoc, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import TaskItem from "../TaskItem/TaskItem"
import TaskList from "../TaskList/TaskList"
import UserList from "../TaskList/UserList";
import UserTaskModal from "../UserTaskModal/UserTaskModal";
import UserInfoModal from "../UserInfoModal/UserInfoModal";
import "./Profile.css";



function UserProfile() {
    const { currentUser } = useContext(AuthContext);

    const [userTasks, setUserTasks] = useState([]);
    const [completed, setCompleted] = useState(0);
    const [userDetails, setUserDetails] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const [modalInfoOpen, setInfoModalOpen] = useState(false);
    const [openedTask, setOpenedTask] = useState(null);

    const navigate = useNavigate()


    let date = new Date()
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();


    const months = ["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"];

    let currentDate = `${months[month]} ${day}, ${year}`
    useEffect(() => {

        async function getTasks() {
            const q = query(collection(db, "tasks"), where("student", "==", currentUser.uid));

            const querySnapshot = await getDocs(q);
            const docs = querySnapshot.docs.map((doc) => {
                const data = doc.data()
                data.id = doc.id
                return data
            })

            setUserTasks(docs)
            let counter = 0;
            userTasks.forEach((t) => {
                if (t.completed == true) {
                    counter += 1
                }
            })

            setCompleted(counter);

        }
        getTasks()

    }, [modalOpen]);

    useEffect(() => {

        async function getUserInfo() {

            const docRef = doc(db, "users", currentUser.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                let ci = docSnap.data()
                setUserDetails(ci)
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }

            // setCompleted(counter);

        }
        getUserInfo()

    }, [modalInfoOpen]);

    const findNew = (e) => {
        e.preventDefault();
        navigate("/view-task");
    }

    const handleUserModal = (e) => {
        e.preventDefault();
        setInfoModalOpen(true);

    }



    return (
        <>
            {modalOpen && <UserTaskModal setOpenModal={setModalOpen} openedTask={openedTask} />}
            {modalInfoOpen && <UserInfoModal setInfoOpenModal={setInfoModalOpen} userDetails={userDetails} />}

            <div className="app-container">
                <div className="app-content">
                    <div class="projects-section">
                        <div class="projects-section-header">
                            <p>Projects</p>
                            <p class="time">{currentDate}</p>
                        </div>
                        <div class="projects-section-line">
                            <div class="projects-status">
                                <div class="item-status">
                                    <span class="status-number">{userTasks.length - completed}</span>
                                    <span class="status-type">In Progress</span>
                                </div>
                                <div class="item-status">
                                    <span class="status-number">{completed}</span>
                                    <span class="status-type">Completed</span>
                                </div>
                                <div class="item-status">
                                    <span class="status-number">{userTasks.length}</span>
                                    <span class="status-type">Total Projects</span>
                                </div>
                            </div>
                        </div>
                        <div class="project-boxes jsGridView">

                            {userTasks.length > 0 ? (<UserList setModalOpen={setModalOpen} tasks={userTasks} setOpenedTask={setOpenedTask}></UserList>) : (<></>)}

                        </div>

                    </div>




                    <div class="messages-section">
                        <button class="messages-close">
                        </button>
                        <div class="projects-section-header">
                            <p>Profile Info</p>
                        </div>
                        <div class="messages">
                            <div class="message-box">
                                <img src={userDetails.info ? userDetails.info.profilepic : "https://cdn.landesa.org/wp-content/uploads/default-user-image.png"} />
                                <div class="message-content">
                                    <div class="message-header">
                                        {userDetails.info ? (<div class="name">{userDetails.info.fullName}</div>) : (<></>)}

                                    </div>
                                    <p class="message-line">
                                        <button className="editinfo" onClick={handleUserModal}>Edit Info</button>
                                    </p>
                                </div>
                            </div>

                            <div class="message-box">
                                <div class="message-content">
                                    <button onClick={findNew} className="fnew editinfo">Find New Projects</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </>


    )


}

export default UserProfile;


