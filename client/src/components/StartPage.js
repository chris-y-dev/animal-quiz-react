import React, {useState} from "react";
import Login from "./Login";
import SignUp from "./Signup";

function StartPage({handleLogin, handleSignup, getUserData}) {
    const [loginModalOpen, setLoginModalOpen] = useState(false)
    const [signupModalOpen, setSignupModalOpen] = useState(false)
    const modal = document.getElementById('modal')
    const loginCloseBtn = document.getElementById('loginCloseBtn')
    const signupCloseBtn = document.getElementById('signupCloseBtn')
    const loginModal = document.getElementById('loginModal')
    const signupModal = document.getElementById('signupModal')
    const window=document.querySelector('html')

    //Adding event listeners
    if (modal){
        window.addEventListener('click', ()=> 
        modal.style.display="none")
    }
    if(loginCloseBtn){
        loginCloseBtn.addEventListener('click', ()=>
        loginModal.style.display="none"
    )}
    if(signupCloseBtn){
        signupCloseBtn.addEventListener('click', ()=> signupModal.style.display="none")
    }

    //Show modals
    function showLoginModal(){
        loginModal.style.display="block"
    }
    function showSignUpModal(){
        signupModal.style.display="block"
    }


    return(
        <div className="startPage_container">
            <h2>Login or Sign up to start</h2>
            <div>
                <button 
                type="button"
                onClick={showLoginModal}>Login</button>
                <button
                type="button"
                onClick={showSignUpModal}>Sign Up</button>
            </div>
                <Login handleLogin={handleLogin} getUserData={getUserData}/>
                <SignUp handleSignup={handleSignup}/>
        </div>
    )
}

export default StartPage;