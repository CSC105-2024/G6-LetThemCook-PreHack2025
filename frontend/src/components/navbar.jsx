import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    setDropdownOpen(false);
    navigate("/pages/userProfile");
  };

  const handleLogoutClick = () => {
    setDropdownOpen(false);
    navigate("/pages/login");
  };

  const handlePostRecipe = () => {
    navigate("/pages/editor");
  };

  return (
    <div className="bg-[#E9E5DC] flex items-center justify-between px-6 py-3 shadow-md sticky top-0 z-50">
      <div className="flex items-center space-x-3">
        <img src="/Homepage/logo.svg" className="w-10 h-10" alt="Logo" />
        <h1 className="text-xl font-semibold text-gray-800">LetThemCook</h1>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={handlePostRecipe}
          className="flex items-center space-x-2 bg-[#586f4f] hover:bg-[#4d6246] text-white font-medium py-2 px-4 rounded-lg shadow"
        >
          <FontAwesomeIcon icon={faPenToSquare} />
          <span>Post Recipe</span>
        </button>

        <div className="relative">
          <img
            src=""
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
  );
}

export default NavBar;
