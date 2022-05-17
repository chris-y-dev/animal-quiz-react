import React from 'react';



function Login({handleLogin, getUserData}) {
    async function loginDatabase(input){
        try{
            const fetchData = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(input)
            })
            
            const fetchResponse = await fetchData.json()
            console.log(fetchResponse)
            
            /////////////////return object for App state
            //check password validity + set state
            if (fetchResponse.validPassword===true){
                //calls function in App (sets Login true)
                handleLogin()
                //sends user object to App for state
                getUserData(fetchResponse.userData)
            } else {
                alert(fetchResponse.message)
            }

        }catch(err){
            console.error(err)
        }
    }

    function handleClick(e){
        e.preventDefault();
        console.log('login clicked');
        console.log(e.target.username.value, e.target.password.value);

        const input = {
            username: e.target.username.value,
            password: e.target.password.value
        }
        console.log(input);
        loginDatabase(input)
    }


    return(
        <div className="modal" id="loginModal"> 
            <div className="login_container">
            <h2>Login</h2>
                <form onSubmit={handleClick}>
                    <div className='login_row'>
                        <label id="input_label">Username: </label>
                        <input type="text" name="username" id="username" maxLength="5"/>
                    </div>
                    <div className='login_row'>
                        <label id="input_label">Password: </label>
                        <input type="password" name="password" id="password" maxLength="5"/>
                    </div>
                    <p>
                    <button type="submit">Start</button>
                    <button type="button" id="loginCloseBtn">Close</button>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login;