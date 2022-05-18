import React from 'react';



function SignUp({handleSignup}) {
    async function signupDatabase(input){
        try{
            const fetchData = await fetch('/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(input)
            })
            
            const fetchResponse = await fetchData.json()
            console.log(fetchResponse)

            if (fetchResponse.message===undefined){
                alert('Registered Successfully, please login')
            } else{
                alert(fetchResponse.message)
            }
        }catch(err){
            console.error(err)
        }
    }

    function handleClick(e){
        e.preventDefault();
        console.log('Signup Clicked');
        console.log(e.target.username.value, e.target.password.value);

        const input = {
            username: e.target.username.value,
            password: e.target.password.value
        }
        console.log(input);
        signupDatabase(input)

        //calls function in app (currently blank)
        handleSignup(input)
    }


    return(
        <div className="modal" id="signupModal"> 
            <div className="login_container">
            <h2>Create Account</h2>
                <form onSubmit={handleClick}>
                    <div className='login_row'>
                        <label id="input_label">Username: </label>
                        <input type="text" name="username" id="username" maxLength="5"/>
                    </div>
                    <div className='login_row'>
                        <label id="input_label">Password: </label>
                        <input type="password" name="password" id="password" maxLength="5"/>
                    </div>
                    <button type="submit">Start</button>
                    <button type="button" id="signupCloseBtn">Close</button>
                </form>
            </div>
        </div>
    )
}

export default SignUp;