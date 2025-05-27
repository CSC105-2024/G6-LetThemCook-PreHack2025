import defaulticon from "/userProfile/defaulticon.png";
import recipebook from "/userProfile/recipe-book.svg";
import React, { useEffect, useState } from "react";
import NavBar from "../components/navbar";
import { fetchUserData } from "../services/getUserProifleData";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function OtherProfilePage() {


  const [username, setUsername] = useState("Loading...");
  const [bio, setBio] = useState("");
  const [profileURL, setProfileURL] = useState(defaulticon);
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(0);
  const {id:userId} = useParams();
  const nav = useNavigate();
  const itemsPerPage = 6;
  const totalPages = Math.ceil(recipes.length / itemsPerPage);
  const currentRecipes = recipes.slice(
    page * itemsPerPage,
    page * itemsPerPage + itemsPerPage
  );

  useEffect(() => {
    if (!userId) return;
    fetchUserData(userId).then((data) => {
        console.log("Fetched user data:", data); 
        console.log(data.recipe)
      if (data) {
        setUsername(data.username || "Unnamed Cook");
        setBio(data.bio || "This user hasn't written a bio yet.");
        setProfileURL(data.pfpURL || defaulticon);
        setRecipes(data.recipe || []);
      }
    });
  }, [userId]);
  console.log(profileURL); 
  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-[#E9E5DC] flex items-center justify-center px-4">
        <div className="my-10 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-4xl bg-white p-6 lg:py-16 sm:p-8 md:p-10 rounded-lg shadow-md">
          <div className="w-full">
            <h1 className="text-black font-bold text-lg mb-4 lg:text-3xl font-serif4">
              {username}'s Profile
            </h1>
            <div className="flex items-center">
              <div className="w-24 h-24 rounded-full overflow-hidden flex items-center flex-shrink-0 justify-center">
                <img
                  src={profileURL && profileURL !== defaulticon ? `http://localhost:3000${profileURL}` : defaulticon}
                  className="w-full h-full object-cover"
                  alt="Profile"
              />
              </div>
              <div className="ml-3 w-full px-2 py-2">
                <p className="text-2xl font-semibold">{username}</p>
                <p className="text-sm lg:text-base mt-2 text-gray-700">{bio}</p>
              </div>
            </div>

            <div className="mt-3">
              <div className="flex items-center">
                <img src={recipebook} className="w-8 h-8 ml-1" />
                <h1 className="lg:text-xl w-full ml-1 px-1 py-2 rounded-[10px]">
                  Recipes
                </h1>
              </div>

              <div className="my-10">
                {recipes.length === 0 ? (
                  <p className="text-gray-500 text-center">No recipes yet.</p>
                ) : (
                  <>
                    <div className="menu-box grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                      {currentRecipes.map((re) => (
                        <div
                          onClick={()=>nav(`/recipe/${re.id}`)}
                          key={re.id}
                          className="flex flex-col w-full max-w-[240px]"
                        >
                          <img
                             src={re.image ? `http://localhost:3000${re.image}`: "/userProfile/noImg.png"} 
                            className="aspect-[4/3] object-cover rounded-lg shadow-md cursor-pointer"
                            
                          />
                          <p className="font-semibold mt-2">{re.title}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-center items-center mt-6 space-x-6">
                      <button
                        className="text-xl hover:scale-125 transition-transform disabled:text-gray-400"
                        disabled={page === 0}
                        onClick={() => setPage((p) => Math.max(p - 1, 0))}
                      >
                        &larr;
                      </button>

                      <span className="text-gray-700 font-medium">
                        Page {page + 1} of {totalPages}
                      </span>

                      <button
                        className="text-xl hover:scale-125 transition-transform disabled:text-gray-400"
                        disabled={page >= totalPages - 1}
                        onClick={() =>
                          setPage((p) => Math.min(p + 1, totalPages - 1))
                        }
                      >
                        &rarr;
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OtherProfilePage;
