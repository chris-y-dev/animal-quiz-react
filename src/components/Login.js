import React from 'react';

function Login({handleLogin}) {

    function handleClick(e){
        e.preventDefault();
        console.log('Quiz started');
        console.log(e.target.username.value, e.target.password.value);

        const input = {
            username: e.target.username.value,
            password: e.target.password.value
        }

        handleLogin(input)
    
    }


    return(
        <div className="login_container">
        <h2>Enter your details to Login/Create Account</h2>
            <form onSubmit={handleClick}>
                <div className='login_row'>
                    <label id="input_label">Username: </label>
                    <input type="text" name="username" id="username" maxLength="5"/>
                </div>
                <div className='login_row'>
                    <label id="input_label">Password: </label>
                    <input type="text" name="password" id="password" maxLength="5"/>
                </div>
                <button type="submit">Start</button>
            </form>
        </div>
    )
}

export default Login;