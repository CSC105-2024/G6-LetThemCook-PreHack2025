import defaulticon from '/userProfile/defaulticon.png';
import recipebook from '/userProfile/recipe-book.svg';
import React, { useState } from 'react';
import NavBar from "../components/navbar";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

function UserProfile() {
    const [username, setUsername] = useState('Guest');
    const [bio, setBio] = useState('hold up, let me cook.');
    const [tmpUsername, setTmpUsername] = useState(username);
    const [tmpBio, setTmpBio] = useState(bio);
    const [isOpen, setIsOpen] = useState(false);
    const [profileURL, setProfileURL] = useState(defaulticon);
    const [tmpProfileURL, setTmpProfileURL] = useState(defaulticon);
    const toggleDropdown = () => setIsOpen(!isOpen);
    const handleProfileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setTmpProfileURL(imageURL);
        }
    }
    const handleSave = () => {
        setUsername(tmpUsername);
        setBio(tmpBio);
        setProfileURL(tmpProfileURL);
        setIsOpen(false);
    };

    const navigate = useNavigate();
    const handleStartNowClick = () =>{
        navigate("/add-recipe");
    }

    return (
        <div className="min-h-screen bg-[#E9E5DC] flex items-center justify-center px-4">
            <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-4xl bg-white p-6 lg:py-16 sm:p-8 md:p-10 rounded-lg shadow-md">
                <div className="w-full">
                    <h1 className="text-black font-bold text-lg mb-4 lg:text-2xl">My Profile</h1>
                    <div className="flex items-center">
                        <div className="w-24 h-24 rounded-full overflow-hidden flex items-center flex-shrink-0 justify-center">
                            <img src={profileURL} className="w-full h-full object-cover" />
                        </div>

                                                <div className="ml-3 w-full px-2 py-2 ">
                        <p className="text-2xl font-semibold">{username} </p>
                        <p className="text-sm lg:text-base mt-2 text-gray-700"> { bio } </p>
                        </div>
               
                    </div>

                    <div >
                       
                        <button onClick={toggleDropdown}
                            className="bg-[#AE7E67] text-white hover:bg-[#976a55] mt-4 w-full border 
                            px-4 py-2 rounded-[10px] flex items-center justify-between
                            lg:text-xl">
                            Edit Profile 
                         <FontAwesomeIcon icon={isOpen ? faSortUp : faSortDown} className="float-right" />   </button>
                        <div ></div>
                            {isOpen && (
                                <div className="flex justify-center mt-4">
                                
                                <div className="ml-2 mr-2 flex flex-col justify-center border rounded-[8px] max-w-2xl lg:max-w-xl w-full">
                                    <div className="flex justify-center mt-3 ">
                                        <label htmlFor="profile-upload" className=" cursor-pointer opacity-100 transition duration-300 ease-in-out hover:opacity-50">
                                            <img src={tmpProfileURL} className="md:w-20 md:h-20 w-16 h-16 rounded-full object-cover" />
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
                                </div>
                           
                                </div>
                                
                            )
                            }
                    </div>
                    {!isOpen && (
                        <div className="mt-3">
                            <div className="flex items-center">
                                <img src={recipebook} className="w-8 h-8 ml-1" />
                                <h1 className="lg:text-xl w-full ml-1 px-1 py-2 rounded-[10px]"> Recipe </h1>
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