import React from "react";
import "./UserTaskModal.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import { auth, db } from "../firebase";
import { collection, addDoc, getDocs, query, where, doc, getDoc, updateDoc } from "firebase/firestore";


function UserTaskModal({ setOpenModal, openedTask }) {

    const navigate = useNavigate()

    const handleLinkSubmit = async (e) => {
        e.preventDefault();
        let link = e.target.link.value
        console.log(openedTask.id)
        if (!link) {
            alert("Please submit a link")
        } else {

            const taskRef = doc(db, "tasks", openedTask.id);

            await updateDoc(taskRef, {
                link: link,
                completed: true

            })

            setOpenModal(false);


        }
    }

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
                        <h3>Past Submission</h3>
                        <a href={openedTask.link}>{openedTask.link}</a>
                    </div>
                }

                <div class="formcontainer">
                    <h3>{openedTask.completed ? "Edit Submission" : "Submit Project"}</h3>
                    <form onSubmit={handleLinkSubmit}>
                        <input name="link" type="text" placeholder="link to submission" />
                        <button className="sum editinfo" type="submit">Submit</button>
                    </form>

                </div>

            </div>
        </div>
    );
}

export default UserTaskModal;