import React, { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { AuthContext } from "../App";
import { auth, db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import "./CreateTask.css";
import { computeHeadingLevel } from "@testing-library/react";
import { faL } from "@fortawesome/free-solid-svg-icons";



const CreateTask = () => {

    const navigate = useNavigate()

    const handleForm = async (e) => {
        e.preventDefault();
        let title = e.target.title.value;
        let deadline = e.target.deadline.value;
        let description = e.target.description.value;
        const dataToAdd = {
            title,
            deadline,
            description,
            author: auth.currentUser.uid,
            completed: false,
            student: null,
            link: null
        }


        try {
            const docRef = await addDoc(collection(db, "tasks"), dataToAdd);
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }

        navigate("/")


    }




    return (
        <div>
            <header className="instr">
                <h3>Create a New Task</h3>
                <p>Title | Deadline | Description</p>
            </header>
            <form id="taskform" className="topBefore" onSubmit={handleForm}>
                <input className="ct" name="title" id="title" type="text" placeholder="TITLE" />
                <input className="ct" name="deadline" id="deadline" type="date" placeholder="DEADLINE" />
                <textarea className="ct" name="description" id="description" type="text" placeholder="DESCRIPTION"></textarea>
                <input id="submit" type="submit" value="GO!" />
            </form>
        </div>
    )


}

export default CreateTask;