import React from 'react';


const Entries = ({NumEntries, userName}) => {
    return (
        <div>
           <div className="white f3">
               {`${userName}, your current entry count is `}
           </div>
           <div className="white f1">
               {NumEntries}
           </div>
        </div>
    )

}

export default Entries;