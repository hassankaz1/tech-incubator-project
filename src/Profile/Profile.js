import React, { useContext, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { AuthContext } from "../App";
import { auth, db } from "../firebase";
import { collection, addDoc, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import TaskItem from "../TaskItem/TaskItem"
import TaskList from "../TaskList/TaskList"
import CompanyInfoModal from "../UserInfoModal/CompanyInfoModal";
import CompanyTaskModal from "../UserTaskModal/CompanyTaskModel";
import "./Profile.css";



function Profile() {
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalInfoOpen, setInfoModalOpen] = useState(false);
    const [openedTask, setOpenedTask] = useState(null);

    const [companyTasks, setCompanyTasks] = useState([]);
    const [completed, setCompleted] = useState(0);
    const [companyDetails, setCompDetails] = useState({});

    let date = new Date()
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();


    const months = ["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"];

    let currentDate = `${months[month]} ${day}, ${year}`
    useEffect(() => {

        async function getTasks() {
            const q = query(collection(db, "tasks"), where("author", "==", currentUser.uid));

            const querySnapshot = await getDocs(q);
            const docs = querySnapshot.docs.map((doc) => {
                const data = doc.data()
                data.id = doc.id
                return data
            })

            setCompanyTasks(docs)
            let counter = 0;
            companyTasks.forEach((t) => {
                if (t.completed == true) {
                    counter += 1
                }
            })

            setCompleted(counter);

        }
        getTasks()

    }, [modalOpen]);

    useEffect(() => {

        async function getCompInfo() {

            const docRef = doc(db, "companies", currentUser.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                let ci = docSnap.data()
                setCompDetails(ci)
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }

            // setCompleted(counter);

        }
        getCompInfo()

    }, [modalInfoOpen]);

    const createNew = (e) => {
        e.preventDefault();
        navigate("/create-task");
    }

    const handleCompModal = (e) => {
        e.preventDefault();
        setInfoModalOpen(true);

    }


    return (
        <>
            {modalOpen && <CompanyTaskModal setOpenModal={setModalOpen} openedTask={openedTask} />}

            {modalInfoOpen && <CompanyInfoModal setInfoOpenModal={setInfoModalOpen} userDetails={companyDetails} />}

            <div className="app-container">
                <div className="app-content">
                    <div className="projects-section">
                        <div className="projects-section-header">
                            <p>Projects</p>
                            <p className="time">{currentDate}</p>
                        </div>
                        <div className="projects-section-line">
                            <div className="projects-status">
                                <div className="item-status">
                                    <span className="status-number">{companyTasks.length - completed}</span>
                                    <span className="status-type">In Progress</span>
                                </div>
                                <div className="item-status">
                                    <span className="status-number">{completed}</span>
                                    <span className="status-type">Completed</span>
                                </div>
                                <div className="item-status">
                                    <span className="status-number">{companyTasks.length}</span>
                                    <span className="status-type">Total Projects</span>
                                </div>
                            </div>
                        </div>
                        <div className="project-boxes jsGridView">


                            {companyTasks.length > 0 ? (<TaskList tasks={companyTasks} setModalOpen={setModalOpen} setOpenedTask={setOpenedTask} ></TaskList>) : (<></>)}

                        </div>

                    </div>




                    <div className="messages-section">
                        <button Name="messages-close">
                        </button>
                        <div class="projects-section-header">
                            <p>Profile Info</p>
                        </div>
                        <div className="messages">
                            <div className="message-box">
                                <img src={companyDetails.info ? companyDetails.info.profilepic : "https://cdn.landesa.org/wp-content/uploads/default-user-image.png"} />
                                <div className="message-content">
                                    <div className="message-header">
                                        {companyDetails.info ? (<div className="name">{companyDetails.info.companyName}</div>) : (<></>)}

                                    </div>
                                    <p className="message-line">
                                        <button className="editinfo" onClick={handleCompModal} >Edit Info</button>
                                    </p>
                                </div>
                            </div>

                            <div className="message-box">
                                <div className="message-content">
                                    <button onClick={createNew} className="fnew editinfo">Create New Projects</button>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </>
    )


}

export default Profile;


