import React from "react";

const Badge = (props) => {
    return(
        <span className={`inline-block py-1 px-3 rounded-full text-[11px] capitalize ${props.status === "pending" && 'bg-primary text-white'}
        ${props.status === "confirm" && 'bg-green-500 text-white'}
        ${props.status === "deliverd" && 'bg-green-700 text-white'}
        `}>
            {props.status}</span>
    );
}

export default Badge;