import React, { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { AuthContext } from "../App";
import { auth, db } from "../firebase";
import { collection, addDoc, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import "../Profile/Profile.css";


function UserItem({ task, setModalOpen, setOpenedTask }) {
    const { currentUser } = useContext(AuthContext);
    const { deadline, description, title, student, completed, author, id, link } = task
    let news = new Date(deadline);

    let currdate = new Date()
    let daysLeft = Math.floor(Math.abs(news - currdate) / 86400000);

    const openTask = () => {

        setOpenedTask({
            deadline, description, title, student, completed, author, id, link
        })

        setModalOpen(true);
    }

    return (
        <>

            <div class="project-box-wrapper">
                <div class="project-box" style={{ backgroundColor: completed ? "#c8f7dc" : "#fee4cb" }}>
                    <div class="project-box-header">
                        <span>December 10, 2020</span>
                        <div class="more-wrapper">
                            <button class="project-btn-more">
                            </button>
                        </div>
                    </div>
                    <div class="project-box-content-header">
                        <p class="box-content-header">{title}</p>
                        <p class="box-content-subheader">{completed ? "completed" : "incomplete"}</p>
                    </div>

                    <div class="project-box-footer">
                        <div class="participants">
                            <button className={completed ? "com editinf" : "editinf"} onClick={openTask}>view more</button>
                        </div>
                        <div class="days-left" style={{ color: completed ? "#34c471" : "#ff942e" }}>
                            {daysLeft} Days Left
                        </div>
                    </div>
                </div>
            </div>


        </>
    )


}

export default UserItem;