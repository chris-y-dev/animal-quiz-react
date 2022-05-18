import React from 'react'


function Profiles({Leaderboard}) {
  
  
    return (
    <div id="profiles">
        {Leaderboard.map((user, index)=>(
            <div className="profile" key={index}>
                <div>
                    <p>{`${index+1}) ${user.username}`}</p>
                </div>
                <div>
                    <p>{user.score}</p>
                </div>
            </div>
        ))}
    </div>
  )
}


export default Profiles;