export const fetchUserData = async (userId)=>{
    try{
        const res = await fetch(`http://localhost:3000/auth/getUserData/${userId}`,{
            method:"GET",
            credentials:'include'
        })
        const json = await res.json();
        return json.data;
        
    }catch(error){
        console.error("Error fetch user data:", error); 
    }
}