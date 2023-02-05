import React, { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../App";
import { auth, db } from "../firebase";
import { collection, addDoc, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import TaskItem from "../TaskItem/TaskItem"
import UserItem from "../TaskItem/UserItem";
import "../Profile/Profile.css";


function UserList({ tasks, setModalOpen, setOpenedTask }) {


    const rows = []
    tasks.forEach(t => {
        rows.push(<UserItem key={t.id} task={t} setModalOpen={setModalOpen} setOpenedTask={setOpenedTask}></UserItem>)
    })


    return rows
}

export default UserList;