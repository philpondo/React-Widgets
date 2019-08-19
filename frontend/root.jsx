import React from 'react';
import ReactDOM from 'react-dom';
import Clock from './clock'
import Weather from './weather'



const Root = () => {
    return (
        <div className='container'>
            <div className='name'> Widgets Made With React!</div>
            <Clock/>
            <Weather/>
        </div>
    );
}

document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("root");
    ReactDOM.render(<Root />, root);
});
