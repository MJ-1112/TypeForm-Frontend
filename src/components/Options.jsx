import React from "react";

function Option(props) {
    return (
        <div className="my-2">
            <input 
                className="bg-gray-200 w-full h-10 rounded-xl p-2" 
                type={props.type}
                placeholder={props.placeholder || `Enter ${props.type} value`} 
            />
        </div>
    );
}

export default Option;