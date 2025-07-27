import React, { use, useState } from 'react';
import { useEffect } from 'react';
import axiosSecure from '../../Hooks/useAxiosSecure';
import { AuthContext } from '../../Provider/AuthProvider';

const Feedback = () => {
    const [feedbacks,setFeedbacks] = useState([])
    const {user}=use(AuthContext)
    
    useEffect(()=>{
         axiosSecure.get("/get-applied-scholarships")
       .then((res)=> setFeedbacks(res.data))
       
    },[])
   // console.log(feedback,user)
    const result = feedbacks.find((item)=>item.userEmail == user.email)
  console.log(result)
 if (!result) {
    return <p>No feedback found.</p>;
  }

  const { _id,universityName,feedbackAt,feedback } = result;

  return (
    <div>
        <h1 className=' text-2xl text-center my-3 font-bold'> University FeedBack</h1>
    
     <div class="chat chat-start">
        <p className=' text-xl py-0.5 text-green-600'>{universityName}</p>
  <div class="chat-bubble chat-bubble-secondary">

    {feedback}
   
  </div>
    </div>
    </div>
  );
};
export default Feedback;