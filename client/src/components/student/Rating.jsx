import React, { useEffect, useState } from "react";

export default function Rating({ initialRating ,onRate}) {
  const [rating, setRating] = useState(initialRating || 0);
  
  const handleRating=(value)=>{
    setRating(value);
    if(onRate) onRate(value);
  }

  useEffect(()=>{
    if(initialRating)
      setRating(initialRating);
  },[initialRating]);


  return (
    <div>
      { Array.from({length:5},(_,idx)=>{
         const starvalue=idx+1;
         return <span key={idx} onClick={()=>handleRating(starvalue)} className={`cursor-pointer text-xl sm:text-2xl  ${starvalue<=rating?'text-yellow-500':'text-gray-400'}`}>&#9733;</span>
        })
      }
    </div>
  );
}
