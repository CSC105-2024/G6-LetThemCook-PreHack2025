import defaulticon from '../userProfile/defaulticon.png';

function UserProfile() {
  return (
    <div className="min-h-screen bg-[#E9E5DC] flex items-center justify-center">
      <div className="w-full max-w-sm md:max-w-xl lg:max-w-2xl bg-white p-6 sm:p-8 rounded-lg shadow-md mx-4">
        <h1 className="text-black font-semibold text-lg mb-2">My Profile</h1>
        <div className="flex "> 
            <img src={defaulticon} className="md:w-18 md:h-18 w-16 h-16 rounded-full"/>
            <div className="w-full border-black border ml-4 ">
                <p className="w-full py-6 px-4 rounded-[10px] "> Guest </p>
            </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;1