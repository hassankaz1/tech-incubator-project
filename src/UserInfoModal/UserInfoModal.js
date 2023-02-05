import React, { useContext } from "react";
import "../UserTaskModal/UserTaskModal.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import { auth, db } from "../firebase";
import { collection, addDoc, getDocs, query, where, doc, getDoc, updateDoc } from "firebase/firestore";


function UserInfoModal({ setInfoOpenModal, userDetails }) {
    const { currentUser } = useContext(AuthContext);

    const navigate = useNavigate()

    const handleInfoSubmit = async (e) => {
        e.preventDefault();
        let propic = e.target.propic.value
        let fullname = e.target.fullname.value

        console.log(propic)

        if (!propic || !fullname) {
            alert("Form not complete")
        } else {

            const taskRef = doc(db, "users", currentUser.uid);

            await updateDoc(taskRef, {
                info: {
                    profilepic: propic,
                    fullName: fullname
                }

            })

            setInfoOpenModal(false);
        }
    }

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <h1>Edit User Details</h1>
                    <button
                        onClick={() => {
                            setInfoOpenModal(false);
                        }}
                    >
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                </div>

                <div class="formcontainer">
                    <form onSubmit={handleInfoSubmit}>
                        <input name="fullname" type="text" placeholder="full name" />
                        <input name="propic" type="text" placeholder="link to profile picture" />
                        <button className="sum editinfo" type="submit">Submit</button>
                    </form>

                </div>

            </div>
        </div>
    );
}

export default UserInfoModal;