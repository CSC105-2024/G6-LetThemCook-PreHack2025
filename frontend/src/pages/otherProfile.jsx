import defaulticon from '/userProfile/defaulticon.png';
import recipebook from '/userProfile/recipe-book.svg';
import React, { useState } from 'react';
import NavBar from "../components/navbar";
import { useNavigate } from 'react-router-dom';

function OtherProfilePage() {
    const [username, setUsername] = useState('Guest');
    const [bio, setBio] = useState('hold up, let me cook.');

    return (
        <>
        <NavBar/>
        <div className="min-h-screen bg-[#E9E5DC] flex items-center justify-center px-4">
                   <div className="w-full max-w-sm md:max-w-xl lg:max-w-2xl bg-white p-5 sm:p-8 rounded-lg shadow-md">
                       <div className="md:max-w-sm lg:max-w-md xl:max-w-lg mx-auto items-center ">
                           <div className="flex items-center">
                               <div className="w-24 h-24 rounded-full overflow-hidden flex items-center flex-shrink-0 justify-center">
                                   <img src={defaulticon} className="w-full h-full object-cover" />
                               </div>
       
                                                       <div className="ml-3 w-full px-2 py-2 ">
                               <p className="text-2xl font-semibold">{username} </p>
                               <p className="text-sm  mt-2 text-gray-700"> { bio } </p>
                               </div>

                           </div>
                              <div className="mt-22 mb-22">
                                       <div className="text-gray-500 m-5 text-center ">No recipe shared yet.</div>
</div>
                       </div>
                   </div>
               </div>
                </>
    );
}


export default OtherProfilePage;  