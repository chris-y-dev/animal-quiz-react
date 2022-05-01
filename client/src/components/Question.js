import React from 'react';

function Question({data}){

    return (
    <div className='question'>
        <h2 dangerouslySetInnerHTML={{__html: data.question}} />
    </div>
    )
}

export default Question