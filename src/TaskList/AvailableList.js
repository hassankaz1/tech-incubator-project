import React, { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { AuthContext } from "../App";
import { auth, db } from "../firebase";
import { collection, addDoc, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import TaskItem from "../TaskItem/TaskItem"
import AvailableItem from "../TaskItem/AvailableItem";
import "../Profile/Profile.css";


function AvailableList({ tasks }) {
    const { currentUser } = useContext(AuthContext);
    const [items, setItems] = useState([])

    const rows = []
    tasks.forEach(t => {
        rows.push(<AvailableItem key={t.id} task={t}></AvailableItem>)
    })

    console.log("array")
    console.log(rows)


    return rows
}

export default AvailableList;