import React from 'react';

export default function Error(props) {
    return (<div>
        <h1>{window.errorMessage}</h1>
        <div><button onClick={(e) => {
            props.setPage("main")
        }}>Home</button></div>
    </div>)
}