import { Button } from "@mui/material";
import React, { useState } from "react";
import { FaAngleUp } from "react-icons/fa6";
import { LiaAngleDownSolid } from "react-icons/lia";
 

const QtyBox  = () => {
    const [qtyVal, setQtyVal] = useState(1);

    const plusQty= () => {
        setQtyVal(qtyVal+1);
    }

    const minusQty= () => {
        if(qtyVal === 1){
            setQtyVal(1); 
        }else{
        setQtyVal(qtyVal-1);
        }
    }
    return (<>
    <div className="qtyBox flex items-center relative">
        <input type="number" className="w-full h-[40px] p-2 text-[15px] focus:outline-none pl-5
        rounded-md "  value={qtyVal}/>

<div className="flex items-center flex-col justify-between h-[40px] absolute top-0 right-0 z-50 ">
        <Button className="!min-w-[25px] !h-[20px] !w-[25px] !text-[#000] !rounded-none hover:!bg-[#f1f1f1]" onClick={plusQty} ><FaAngleUp className="text-[12px]
        opacity-55"/></Button>
        <Button className="!min-w-[25px] !h-[20px] !w-[25px] !text-[#000] !rounded-none hover:!bg-[#f1f1f1]" onClick={minusQty}><LiaAngleDownSolid className="text-[12px] 
        opacity-55"/></Button>
    </div>

    
    </div>
    </>
    );
}

export default QtyBox;