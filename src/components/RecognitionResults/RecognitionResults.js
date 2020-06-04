import React from 'react';
import './RecognitionResults.css';


const RecognitionResults = ({imageUrl, box}) =>{
    return (
        <div className="center ma">    
            <div className="absolute mt2">
                <img id="inputImage" alt='' src= {imageUrl} width="500px" height="auto"></img>
                <div className="bounding-box" style={{top:box.topRow, left:box.leftCol, right: box.rightCol, bottom: box.bottomRow}}></div>
            </div>
            
        </div>
    )

}
export default RecognitionResults;