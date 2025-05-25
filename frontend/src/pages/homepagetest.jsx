import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function HomePageTest(){
    const nav = useNavigate();
    const [recipe,setRecipe] = useState([]);
    const [myrecipe,setMyRecipe] = useState([]);
    const fetchRecipe = async () =>{
        const res = await fetch("http://localhost:3000/recipe/all",{
            method:"GET",
            credentials:"include"
        })
        if(res.ok){
            const data = await res.json();
            console.log(data.data)
            setRecipe(data.data);
        }
    }
    const fetchMyRecipe = async () =>{
        const res = await fetch("http://localhost:3000/recipe",{
            method:"GET",
            credentials:"include"
        })
         if(res.ok){
            const json = await res.json();
            console.log(json.data)
            setMyRecipe(json.data);
        }
    }
    useEffect(()=>{
        fetchRecipe();
        fetchMyRecipe();
    },[])
    const handleDelete = async (id)=>{
        try{
            const res = await fetch(`http://localhost:3000/recipe/${id}`,{
                method:"DELETE",
                credentials:"include"
            })
            if(res.ok){
                setMyRecipe(myrecipe.filter((c)=>c.id !== id));
            }
        }catch(error){
           console.error("Error deleting post:", error); 
        }
    }
    return(
        <>
        HOmeTst
        {recipe.map((recipe,index)=>{
            return(
                <div key={index} className="border-1 p-2 m-3">
                    <p>{recipe.title}</p>
                    <p>by: {recipe.user.username}</p>
                    <p>Description: {recipe.description}</p>
                    <img className="w-30" src={`http://localhost:3000${recipe.image}`} />
                    <p>Nationality:{recipe.nationality}</p>
                    <p>category:{recipe.category}</p>
                </div>
            )
        })}
        <br/>
        <hr/>
        {myrecipe.map((myre, index)=>{
            return(
                <div key={index} className="flex gap-2 p-10 border-1 m-4">
                    <p>{myre.title}</p>
                    <button onClick={()=>handleDelete(myre.id)} className="bg-gray-400 p-2">Delete</button>
                    <button onClick={()=>nav("/add-recipe",{state:myre})} className="bg-gray-400 p-2">Edit</button>
                </div>
            )
        })}
        </>
    )
}
export default HomePageTest;