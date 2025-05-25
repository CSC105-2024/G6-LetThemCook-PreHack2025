import defaulticon from '/userProfile/defaulticon.png';
import recipebook from '/userProfile/recipe-book.svg';
import React, { useState } from 'react';
import NavBar from "../components/navbar";
import { useNavigate } from 'react-router-dom';
import RecipeCard from '../components/recipeCard'

function OtherProfilePage() {
    const [username, setUsername] = useState('Guest');
    const [bio, setBio] = useState('hold up, let me cook.');


    return (
        <>
            <div className="min-h-screen bg-[#E9E5DC] flex items-center justify-center px-4">
                <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-4xl bg-white p-6 lg:py-16 sm:p-8 md:p-10 rounded-lg shadow-md">
                    <div className="w-full">
                        <div className="mb-10 flex items-center">
                            <div className="w-24 h-24 rounded-full overflow-hidden flex items-center flex-shrink-0 justify-center">
                                <img src={defaulticon} className="w-full h-full object-cover" />
                            </div>

                            <div className="ml-3 w-full px-2 py-2 ">
                                <p className="text-2xl font-semibold">{username} </p>
                                <p className="text-sm lg:text-base mt-2 text-gray-700"> {bio} </p>
                            </div>

                        </div>
                        <div className="mt-3">
                            <div className="flex items-center">
                                <img src={recipebook} className="w-8 h-8 ml-1" />
                                <h1 className="lg:text-xl w-full ml-1 px-1 py-2 rounded-[10px]"> Recipe </h1>
                            </div>
                            <RecipeCard />
                            {/*<div className="mt-22 mb-22">
                            <div className="text-gray-500 m-5 text-center ">No recipe shared yet.</div>
                        </div>*/}</div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default OtherProfilePage;  