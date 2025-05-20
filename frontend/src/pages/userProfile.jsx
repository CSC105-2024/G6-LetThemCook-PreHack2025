import defaulticon from '../userProfile/defaulticon.png';
import recipebook from '../userProfile/recipe-book.svg';
import React, { useState } from 'react';

function UserProfile() {
    const [isOpen, setIsOpen] = useState(false);
    const [profileURL, setProfileURL] = useState(defaulticon);
    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleProfileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setProfileURL(imageURL);
        }

    }

    return (
        <div className="min-h-screen bg-[#E9E5DC] flex items-center justify-center">
            <div className=" w-full max-w-sm md:max-w-xl lg:max-w-2xl bg-white p-5 sm:p-8 rounded-lg shadow-md mx-4 ">
                <div className="md:max-w-sm lg:max-w-md xl:max-w-lg mx-auto items-center ">
                    <h1 className="text-black font-semibold text-lg  mb-9">My Profile</h1>
                    <div className="flex items-center">
                        <div className="flex items-center md:ml-4 md:w-26 md:h-26 ml-1 w-24 h-24 ">
                            <img src={profileURL} className="rounded-full" />
                        </div>
        
                        <p className="ml-4 md:ml-8 w-full border mt-2 px-4 py-2 rounded-[10px] h-fit "> Guest </p>
                    </div>
                    <div>
                        <p className="mt-0 md:mt-2 w-full border px-4 py-2 rounded-[10px]"> Bio </p>
                    </div>
                    <div> 
                        <button onClick={toggleDropdown}
                            className="bg-[#AE7E67] text-white text-left hover:bg-[#976a55] mt-5 w-full border px-4 py-2 rounded-[10px]">
                            Edit Profile </button>
                        <div >
                            {isOpen && (
                                <><div className="ml-2 mr-2 flex flex-col justify-center border rounded-[8px]">
                                    <div className="flex justify-center mt-3">
                                        <label className="cursor-pointer">
                                        <img src={defaulticon} className="md:w-18 md:h-18 w-16 h-16 rounded-full" />
                                        </label>
                                    </div>
                                    <span className=" ml-3 mt-3"> Username </span>
                                    <input
                                        type="text"
                                        placeholder="godFlimmyInwZa007"
                                        className="mt-1 ml-3 mr-3 border px-4 py-2 rounded-[10px]" />
                                    <span className="ml-3 mt-3"> Bio </span>
                                    <input
                                        type="text"
                                        placeholder="Hold up, let me cook..."
                                        className="mt-1 ml-3 mb-4 mr-3 border px-4 py-2 rounded-[10px]" />
                                    <div>
                                        <button onClick={toggleDropdown}
                                            className="flex float-right justify-center  bg-[#5C6A51] hover:bg-[#38462d] px-2 py-1 mx-2 my-2 text-white rounded-[10px]"> save </button>
                                    </div>
                                </div></>
                            )
                            }</div>
                    </div>
                    {!isOpen && (
                        <div className="mt-5">
                            <div className="flex items-center">
                                <img src={recipebook} className="w-8 h-8 ml-1" />
                                <h1 className="w-full px-1 py-2 rounded-[10px]"> Recipe </h1>
                            </div>
                            <div className="mt-10 mb-10">
                                <div className="text-gray-500 m-5 text-center ">No recipe shared yet.</div>
                                <div className="flex justify-center">
                                    <button className="flex bg-[#5C6A51] text-white px-2 py-1 rounded-[10px] "> Start Now </button>
                                </div></div>
                        </div>

                    )
                    }
                </div>
            </div>
        </div>
    );
}


export default UserProfile;  