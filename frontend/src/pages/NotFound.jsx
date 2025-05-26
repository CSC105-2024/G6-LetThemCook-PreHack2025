import { useNavigate } from "react-router-dom";
function NotFoundPage (){
    const nav = useNavigate();
    return(
        <div className="flex min-h-screen justify-center items-center">
            <div className="box flex flex-col items-center gap-5 justify-center">
                <h className="text-[200px] text-center font-bold">404</h>
                <h3 className="text-2xl">Page not found</h3>
                <h3 className="">This is not web page you are looking for</h3>
                <button className=" p-3 bg-[#5C6A51] text-white rounded-2xl hover:bg-gray-800 cursor-pointer" onClick={()=> nav("/homePage")}>
                    Go Home
                </button>
            </div>
        </div>
    )
}
export default NotFoundPage;