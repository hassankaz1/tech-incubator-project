import React, { useCallback, useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { AuthContext } from "../App";
import "./Login.css";

const Login = () => {

    const [hasAccount, setHasAccount] = useState(true);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        fullName: "",
        companyName: "",
        profilepic: ""
    });

    const [type, setType] = useState("users")

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleToggleUser = () => {
        setType("users")
        console.log(type)
    }

    const handleToggleCompany = () => {
        setType("companies")
        console.log(type)
    }


    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(fData => ({
            ...fData,
            [name]: value
        }));
    };




    const handleLogin = async (e) => {
        e.preventDefault();

        console.log("email")
        setPasswordError("");
        setEmailError("");

        let email = formData.email
        let password = formData.password


        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                if (errorCode == "auth/invalid-password" || errorCode == "auth/wrong-password") {
                    setPasswordError(errorMessage)
                } else {
                    setEmailError(errorMessage)
                }
            });

    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        console.log(type)

        setPasswordError("");
        setEmailError("");


        let { email, password, companyName, fullName, profilepic } = formData;

        const compinfo = {
            companyName,
            profilepic
        }

        const userinfo = {
            fullName,
            profilepic
        }
        console.log(userinfo)

        let uid;

        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                uid = user.uid;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                if (errorCode == "auth/invalid-password" || errorCode == "auth/wrong-password") {
                    setPasswordError(errorMessage)
                } else {
                    setEmailError(errorMessage)
                }
            });

        if (type == "users") {
            await setDoc(doc(db, "users", uid), {
                info: userinfo
            })
        } else {
            await setDoc(doc(db, "companies", uid), {
                info: compinfo
            })

        }

    }

    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return <Navigate to="/" />;
    }

    return (
        <section className="login">


            <div className="loginContainer" >
                {!hasAccount &&
                    <div className="toggle">

                        <input id="toggle-on" class="toggle toggle-left" name="toggle" value="false" type="radio" checked />
                        <label for="toggle-on" class="btn" onClick={handleToggleUser}>user</label>
                        <input id="toggle-off" class="toggle toggle-right" name="toggle" value="true" type="radio" />
                        <label for="toggle-off" class="btn" onClick={handleToggleCompany}>company</label>



                    </div>
                }

                <form>
                    <label>
                        Email
                    </label>
                    <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                    <p className="errorMsg">{emailError}</p>
                    <label>
                        Password
                    </label>
                    <input name="password" type="password" value={formData.password} placeholder="Password" onChange={handleChange} />
                    <p className="errorMsg">{passwordError}</p>


                    {(type == "users") && (!hasAccount) && (
                        <>
                            <label>
                                Full Name
                            </label>
                            <input name="fullName" type="text" placeholder="Full Name" value={formData.fullName} onChange={handleChange} />
                        </>

                    )}

                    {(type == "companies") && (!hasAccount) && (
                        <>
                            <label>
                                Company Name
                            </label>
                            <input name="companyName" type="text" placeholder="Company Name" value={formData.companyName} onChange={handleChange} />
                        </>
                    )}

                    {(!hasAccount) && (
                        <>
                            <label>
                                Link to Profile Pic
                            </label>
                            <input name="profilepic" type="text" placeholder="Profile Pic Link" value={formData.profilepic} onChange={handleChange} />
                        </>
                    )}


                    <div className="btnContainer">
                        {hasAccount ? (
                            <>
                                <button className="lbutton" type="submit" onClick={handleLogin}>Log In</button>
                                <p>Don't have an account ? <span onClick={() => setHasAccount(false)}>Sign Up</span></p>
                            </>
                        ) : (
                            <>
                                <button className="lbutton" type="submit" onClick={handleSignUp}>Sign Up</button>
                                <p>Have an account ? <span onClick={() => setHasAccount(true)}>Sign In</span></p>
                            </>
                        )
                        }
                    </div>



                </form>
            </div >

        </section >
    );
};

export default Login;