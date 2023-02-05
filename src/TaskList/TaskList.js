import React, { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { AuthContext } from "../App";
import { auth, db } from "../firebase";
import { collection, addDoc, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import TaskItem from "../TaskItem/TaskItem"
import "../Profile/Profile.css";


function TaskList({ tasks, setModalOpen, setOpenedTask }) {

    const rows = []
    tasks.forEach(t => {
        rows.push(<TaskItem key={t.id} task={t} setModalOpen={setModalOpen} setOpenedTask={setOpenedTask}></TaskItem>)
    })


    return rows
}

export default TaskList;