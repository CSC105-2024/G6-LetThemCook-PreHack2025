export const fetchAllRecipe = async () =>{
        const res = await fetch("http://localhost:3000/recipe/all",{
            method:"GET",
            credentials:"include"
        })
        if(res.ok){
            const json = await res.json();
            return json.data;
        }
    }