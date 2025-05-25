import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    setDropdownOpen(false);
    setSidebarOpen(false);
    navigate("/pages/userProfile");
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");

    setDropdownOpen(false);
    setSidebarOpen(false);
    localStorage.clear();
    navigate("/");
  };

  const handlePostRecipe = () => {
    navigate("/add-recipe");
  };

  const storedUser = JSON.parse(localStorage.getItem("user")) || {
  name: "UserName",
  email: "email@gmail.com"
};


  return (
    <>

      <div className="bg-[#E9E5DC] flex items-center justify-between px-4 md:px-6 py-3 shadow-md sticky top-0 z-50 w-full">
        
        <div className="md:hidden">
          <button onClick={() => setSidebarOpen(true)}>
            <FontAwesomeIcon icon={faBars} size="lg" />
          </button>
        </div>

        <div className="hidden md:flex items-center space-x-3">
          <img
            src="/Homepage/logo.svg"
            className="w-10 h-10 cursor-pointer"
            alt="Logo"
            onClick={() => navigate("/homepage")}
          />
          <h1 className="text-xl font-semibold text-gray-800">LetThemCook</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={handlePostRecipe}
            className="flex items-center justify-center bg-[#5C6A51] hover:bg-[#4d6246] text-white font-medium p-2 md:py-2 md:px-4 rounded-full md:rounded-lg shadow transition-all duration-200"
          >
            <FontAwesomeIcon icon={faPenToSquare} />
            <span className="hidden md:inline ml-2">Post Recipe</span>
          </button>
          <div className="relative hidden md:block">
            <img
              src="/Homepage/profile.jpg"
              className="w-10 h-10 rounded-full border cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white rounded shadow-lg border z-50 text-sm">
                <div
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b"
                  onClick={handleProfileClick}
                >
                  My Profile
                </div>
                <div
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={handleLogoutClick}
                >
                  Log Out
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {sidebarOpen && (
        <div className="fixed inset-y-0 left-0 w-[70%] max-w-xs bg-[#AE7E67] text-white z-[999] p-5 shadow-lg flex flex-col transition-transform duration-300">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">LetThemCook</h1>
            <button onClick={() => setSidebarOpen(false)}>
              <FontAwesomeIcon icon={faXmark} size="lg" />
            </button>
          </div>

          <hr className="border-white mb-4" />
          <div
            className="flex items-center space-x-3 mb-4 cursor-pointer"
            onClick={handleProfileClick}
          >
            <img
              src="/Homepage/profile.jpg"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-semibold text-sm">{storedUser.name}</p>
               <p className="text-xs">{storedUser.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogoutClick}
            className="bg-[#962424] hover:bg-red-700 w-full py-2 rounded shadow text-white text-sm"
          >
            Log Out
          </button>
        </div>
      )}
    </>
  );
}

export default NavBar;

