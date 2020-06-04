import React from 'react';
import './ImageLink.css';

const ImageLink = ({onInputChange, onDetectClick}) => {
    return (
        <div>
            <p className="f3">Enter image link below</p>
            <div className="center">
                <div className="center form pa4 br3 shadow-5 pointer">
                    <input className="f4 pa2 w-70 center" type="text" onChange={onInputChange}/>
                    <button className="f4 w-30 grow dib link ph3 pv2 white bg-light-purple" onClick={onDetectClick}>Detect</button>
                </div>
            </div>
        </div>
    )

}

export default ImageLink;