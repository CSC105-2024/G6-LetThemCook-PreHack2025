import defaulticon from '/userProfile/defaulticon.png';
import recipebook from '/userProfile/recipe-book.svg';
import React, { useEffect, useState } from 'react';
import NavBar from "../components/navbar";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { fetchMyRecipe } from '../services/getUserRecipe';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';


function UserProfile() {
    const nav = useNavigate();
    const [username, setUsername] = useState('Guest');
    const [bio, setBio] = useState('hold up, let me cook.');
    const [tmpUsername, setTmpUsername] = useState(username);
    const [tmpBio, setTmpBio] = useState(bio);
    const [isOpen, setIsOpen] = useState(false);
    const [profileURL, setProfileURL] = useState(defaulticon);
    const [tmpProfileURL, setTmpProfileURL] = useState(defaulticon);
    const [userRecipeList , setUserRecipeList] = useState([]);
    const toggleDropdown = () => setIsOpen(!isOpen);
    const [page,setPage]= useState(0);
    const itemsPerPage = 9;
    const handleDelete = async (id)=>{
        try{
            const res = await fetch(`http://localhost:3000/recipe/${id}`,{
                method:"DELETE",
                credentials:"include"
            })
            if(res.ok){
                setUserRecipeList(userRecipeList.filter((c)=>c.id !== id));
            }
        }catch(error){
           console.error("Error deleting post:", error); 
        }
    }
    useEffect(()=>{
        const loadUserRecipe = async ()=>{
            try{
                const userRecipe = await fetchMyRecipe();
                setUserRecipeList(userRecipe);
            }catch(error){
                console.error("Error fetching recipes:", error);
            }
            
            
        }
        loadUserRecipe();
    },[])
    console.log(userRecipeList)
    const totalPages = Math.ceil(userRecipeList.length / itemsPerPage);
    const currentRecipes = userRecipeList.slice(
    page * itemsPerPage,
    page * itemsPerPage + itemsPerPage
    );
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
        <>
        <NavBar/>
        <div className="min-h-screen bg-[#E9E5DC] flex items-center justify-center px-4">
            <div className="my-10 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-4xl bg-white p-6 lg:py-16 sm:p-8 md:p-10 rounded-lg shadow-md">
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
                            <div className="my-10">
                                {userRecipeList.length > 0 ? (
                                  <>
                      <div className="menu-box grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                        {currentRecipes.map((re) => (
                          <div key={re.id} className="flex flex-col w-full max-w-[240px]">
                            <img
                              className="aspect-[4/3] object-cover rounded-lg shadow-md"
                              src={`http://localhost:3000${re.image}`}
                              alt={re.title}
                              onClick={()=>nav(`/recipe/${re.id}`)}
                            />
                            <div className="text-area flex justify-between items-center mt-2">
                              <p className="font-semibold">{re.title}</p>
                              <div className="button-area space-x-2">
                                <button onClick={()=>nav("/add-recipe",{state:{mode:"edit", recipe:re}})} className="text-sm text-white bg-[#5C6A51] px-2 py-1 rounded">Edit</button>
                                <button onClick={()=>handleDelete(re.id)} className="text-sm text-white bg-[#962424] px-2 py-1 rounded ">Delete</button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-center items-center mt-6 space-x-6">
                        <button
                          className="text-xl hover:scale-125 transition-transform disabled:text-gray-400"
                          disabled={page === 0}
                          onClick={() => setPage((p) => Math.max(p - 1, 0))}
                        >
                          <FontAwesomeIcon icon={faArrowLeft} />
                        </button>

                        <span className="text-gray-700 font-medium">
                          Page {page + 1} of {totalPages}
                        </span>

                        <button
                          className="text-xl hover:scale-125 transition-transform disabled:text-gray-400"
                          disabled={page >= totalPages - 1}
                          onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
                        >
                          <FontAwesomeIcon icon={faArrowRight} />
                        </button>
                      </div>
                    </>
                                ):(
                                    <>
                                    <div className="text-gray-500 m-5 text-center ">No recipe shared yet.</div>
                                        <div className="flex justify-center">
                                    <button 
                                        onClick={handleStartNowClick}
                                        className="flex bg-[#5C6A51] hover:bg-[#2d3626] text-white px-2 py-1 rounded-[10px] "> Start Now </button>
                                    </div>
                                    </>
                                )}
                                
                                </div>
                        </div>
                    )
                    }
                </div>
            </div>
        </div>
        </>
    );
}


export default UserProfile;  