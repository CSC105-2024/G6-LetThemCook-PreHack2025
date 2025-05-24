import defaulticon from '/userProfile/defaulticon.png';
import recipebook from '/userProfile/recipe-book.svg';
import React, { useState } from 'react';
import NavBar from "../components/navbar";
import { useNavigate } from 'react-router-dom';

function UserProfile() {
    const [username, setUsername] = useState('Guest');
    const [bio, setBio] = useState('hold up, let me cook.');
    const [tmpUsername, setTmpUsername] = useState(username);
    const [tmpBio, setTmpBio] = useState(bio);
    const handleSave = () => {
        setUsername(tmpUsername);
        setBio(tmpBio);
        setIsOpen(false);
    };

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

    const navigate = useNavigate();
    const handleStartNowClick = () =>{
        navigate("/add-recipe");
    }

    return (
        <div className="min-h-screen bg-[#E9E5DC] flex items-center justify-center px-4">
            <div className="w-full max-w-sm md:max-w-xl lg:max-w-2xl bg-white p-5 sm:p-8 rounded-lg shadow-md">
                <div className="md:max-w-sm lg:max-w-md xl:max-w-lg mx-auto items-center ">
                    <h1 className="text-black font-semibold text-lg  mb-9">My Profile</h1>
                    <div className="flex items-center">
                        <div className="w-24 h-24 rounded-full overflow-hidden flex items-center flex-shrink-0 justify-center">
                            <img src={profileURL} className="w-full h-full object-cover" />
                        </div>

                        <p className="ml-4 md:ml-6 w-full border mt-2 px-4 py-2 rounded-[10px]  ">{username} </p>
                    </div>
                    <div>
                        <p className="mt-3 md:mt-4 w-full border px-4 py-2 rounded-[10px]"> {bio} </p>
                    </div>
                    <div>
                        <button onClick={toggleDropdown}
                            className="bg-[#AE7E67] text-white text-left hover:bg-[#976a55] mt-4 w-full border px-4 py-2 rounded-[10px]">
                            Edit Profile </button>
                        <div >
                            {isOpen && (
                                <><div className="ml-2 mr-2 flex flex-col justify-center border rounded-[8px]">
                                    <div className="flex justify-center mt-3">
                                        <label htmlFor="profile-upload" className="cursor-pointer">
                                            <img src={profileURL} className="md:w-20 md:h-20 w-16 h-16 rounded-full object-cover" />
                                        </label>
                                        <input
                                            id="profile-upload"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleProfileChange}
                                            className="hidden"
                                        />
                                    </div>
                                    <span className=" ml-3 mt-3"> Username </span>
                                    <input
                                        type="text"
                                        placeholder="godFlimmyInwZa007"
                                        className="mt-1 ml-3 mr-3 border px-4 py-2 rounded-[10px]"
                                        value={tmpUsername}
                                        onChange={(e) => setTmpUsername(e.target.value)} />
                                    <span className="ml-3 mt-3"> Bio </span>
                                    <input
                                        type="text"
                                        value={tmpBio}
                                        onChange={(e) => setTmpBio(e.target.value)}
                                        className="mt-1 ml-3 mb-4 mr-3 border px-4 py-2 rounded-[10px]" />
                                    <div>
                                        <button onClick={handleSave} 
                                            className="flex float-right justify-center  bg-[#5C6A51] hover:bg-[#38462d] px-2 py-1 mx-2 my-2 text-white rounded-[10px]"> save </button>
                                    </div>
                                </div></>
                            )
                            }</div>
                    </div>
                    {!isOpen && (
                        <div className="mt-3">
                            <div className="flex items-center">
                                <img src={recipebook} className="w-8 h-8 ml-1" />
                                <h1 className="w-full px-1 py-2 rounded-[10px]"> Recipe </h1>
                            </div>
                            <div className="mt-22 mb-22">
                                <div className="text-gray-500 m-5 text-center ">No recipe shared yet.</div>
                                <div className="flex justify-center">
                                    <button 
                                        onClick={handleStartNowClick}
                                        className="flex bg-[#5C6A51] hover:bg-[#2d3626] text-white px-2 py-1 rounded-[10px] "> Start Now </button>
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