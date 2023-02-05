import React, { useState, useEffect } from "react";
import "./UserTaskModal.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import { auth, db } from "../firebase";
import { collection, addDoc, getDocs, query, where, doc, getDoc, updateDoc } from "firebase/firestore";


function CompanyTaskModal({ setOpenModal, openedTask }) {

    const navigate = useNavigate()
    const [studentDetails, setStudentDetails] = useState(null)

    useEffect(() => {

        async function getStudentDetails() {
            const docRef = doc(db, "users", openedTask.student);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                let ci = docSnap.data()
                setStudentDetails(ci)
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }

        }
        getStudentDetails()

    }, [openedTask.student]);


    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <h1>Project: {openedTask.title}</h1>
                    <button
                        onClick={() => {
                            setOpenModal(false);
                        }}
                    >
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                </div>
                <div className="body">
                    <h4>Description:</h4>
                    <p>{openedTask.description}</p>
                    <span className="due">Due On: {openedTask.deadline}</span>
                </div>

                {openedTask.completed &&


                    <div className="completedlink">
                        <h3>Submission Link</h3>
                        <a href={openedTask.link}>{openedTask.link}</a>
                    </div>
                }

                <div class="formcontainer">
                    <h3>{openedTask.student ? "Participant:" : "No Participants yet"}</h3>
                    <p className="sdet">{studentDetails ? studentDetails.info.fullName : ""}</p>

                </div>

            </div>
        </div>
    );
}

export default CompanyTaskModal;