export const fetchMyRecipe = async () =>{
        const res = await fetch("http://localhost:3000/recipe",{
            method:"GET",
            credentials:"include"
        })
         if(res.ok){
            const json = await res.json();
            return json.data;
        }else{
            throw new Error('Failed to fetch recipe');
        }
    }