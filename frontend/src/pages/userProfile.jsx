import defaulticon from '../userProfile/defaulticon.png';
import React, {useState} from 'react';

function UserProfile() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => setIsOpen(!isOpen);
    

    return (
        <div className="min-h-screen bg-[#E9E5DC] flex items-center justify-center">
            <div className="w-full max-w-sm md:max-w-xl lg:max-w-2xl bg-white p-6 sm:p-8 rounded-lg shadow-md mx-4">
                <h1 className="text-black font-semibold text-lg mb-9">My Profile</h1>
                <div className="flex">
                    <img src={defaulticon} className="md:w-18 md:h-18 w-16 h-16 rounded-full" />
                    <p className="ml-4 md:ml-8 w-full border mt-2 px-4 py-2 rounded-[10px] h-fit "> Guest </p>
                </div>
                <div>
                    <p className="mt-5 w-full border px-4 py-2 rounded-[10px]"> Bio </p>
                </div>
                <div>
                    <button onClick={toggleDropdown} 
                    className="bg-[#AE7E67] text-white text-left hover:bg-[#976a55] mt-5 w-full border px-4 py-2 rounded-[10px]"> 
                    Edit Profile </button>
                    <div className="">
                    {isOpen && (
                        <div className="ml-2 mr-2 flex flex-col justify-center border rounded-[8px]">
                        <div className="flex justify-center mt-3">  
                            <img src={defaulticon} className="md:w-18 md:h-18 w-16 h-16 rounded-full" />
                        </div>
                         <span className=" ml-3 mt-3"> Username </span>
                         <input 
                            type="text"
                            placeholder="godFlimmyInwZa007"
                            className="mt-1 ml-3 mr-3 border px-4 py-2 rounded-[10px]"
                         />
                         <span className="ml-3 mt-3"> Bio </span>
                         <input 
                            type="text"
                            placeholder="Hold up, let me cook..."
                            className="mt-1 ml-3 mb-4 mr-3 border px-4 py-2 rounded-[10px]"
                         />
                         </div>
                        )
                    }</div>
                </div>
                <div>
                    <p className="mt-5 w-full px-1 py-2 rounded-[10px]"> Recipe </p>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;  