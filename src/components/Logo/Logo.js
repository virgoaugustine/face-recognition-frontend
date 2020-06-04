import React from 'react';
import './Logo.css'
import brain from './logo.png';
import Tilt from 'react-tilt';

const Logo= () => {
    return (
        <div className="ma4 mt0">
            <Tilt className="Tilt br2 shadow-2" options={{ max : 45 }} style={{ height: 150, width: 150 }} >
                 <div className="Tilt-inner pa3"> 
                 <img alt="logo" style={{paddingTop: '5px'}} src={brain}></img>
                 </div>
            </Tilt>
        </div>
    )
}

export default Logo;