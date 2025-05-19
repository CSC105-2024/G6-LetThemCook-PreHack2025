import defaulticon from '../userProfile/defaulticon.png';
import React, {useState} from 'react';

function UserProfile() {
    const [isOpen, setIsOpen] = useState(false);
    
    

    return (
        <div className="min-h-screen bg-[#E9E5DC] flex items-center justify-center">
            <div className="w-full max-w-sm md:max-w-xl lg:max-w-2xl bg-white p-6 sm:p-8 rounded-lg shadow-md mx-4">
                <h1 className="text-black font-semibold text-lg mb-9">My Profile</h1>
                <div className="flex">
                    <img src={defaulticon} className="md:w-18 md:h-18 w-16 h-16 rounded-full" />
                    <p className="ml-4 w-full border px-4 py-2 rounded-[10px] "> Guest </p>
                </div>
                <div>
                    <p className="mt-5 w-full border px-4 py-2 rounded-[10px]"> Bio </p>
                </div>
                <div>
                    <p className="mt-5 w-full border px-4 py-2 rounded-[10px]"> Edit Profile </p>
                </div>
                <div>
                    <p className="mt-5 w-full px-1 py-2 rounded-[10px]"> Recipe </p>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;  