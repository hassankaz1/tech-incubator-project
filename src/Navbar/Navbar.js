import { useRef, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";
import { AuthContext } from "../App";
import { auth, db } from "../firebase";
import { Navigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandPeace } from '@fortawesome/free-solid-svg-icons'
import { collection, addDoc, getDocs, query, where, doc, getDoc } from "firebase/firestore";



function Navbar() {
    const { currentUser } = useContext(AuthContext);
    const navRef = useRef();
    const [type, setType] = useState(null)

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    };

    const handleSignOut = (e) => {

        e.preventDefault();

        const auth = getAuth();
        signOut(auth).then(() => {
            console.log("signed out")
            return <Navigate to="/login" />;
        }).catch((error) => {
            // An error happened.
        });
    }

    useEffect(() => {

        async function getUserInfo() {
            if (!currentUser) return;

            const docRef = doc(db, "companies", currentUser.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setType("company")

            } else {
                setType("user")
            }

        }
        getUserInfo()

    }, []);

    console.log("hi")


    return (
        <>

            <nav>
                <ul id="navbar">
                    <li>
                        <FontAwesomeIcon icon={faHandPeace} />
                    </li>


                    {!currentUser &&
                        <li><Link to='/Login'>Login</Link></li>
                    }

                    {currentUser &&
                        <li><Link to='/'>Dashboard</Link></li>

                    }
                    {type == "company" &&
                        <li><Link to='/create-task'>Create Project</Link></li>

                    }
                    {type == "user" &&
                        <li><Link to='/view-task'>View Projects</Link></li>

                    }

                    {currentUser &&
                        <li><span onClick={handleSignOut}>Sign Out</span></li>

                    }
                </ul>
            </nav>
        </>
    );
}

export default Navbar;