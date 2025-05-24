import { useEffect, useState } from "react";

function HomePageTest(){
    const [recipe,setRecipe] = useState([]);
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
    useEffect(()=>{
        fetchRecipe();
    },[])
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
        </>
    )
}
export default HomePageTest;