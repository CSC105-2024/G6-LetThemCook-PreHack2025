export const fetchRecipeById = async (id)=>{
    try{
        const res = await fetch(`http://localhost:3000/recipe/${id}`,{
            credentials:'include'
        });
        if(!res.ok){
            throw new Error('Failed to fetch recipe');
        }
        const json = await res.json();
        return json.data;
    }catch(error){
           console.error("Error deleting post:", error); 
        }
    
}