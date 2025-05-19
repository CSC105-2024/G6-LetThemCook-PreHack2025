import { useState } from "react";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  return (
    <>
      <div className="page-container ">
        <div className="regis-box">
            <div className="regis-left">
                <h3>Sign up</h3>
                <div className="input-field">
                    <div className="input-group  flex flex-col gap-2">
                        <label className="text-2xl">Email</label>
                        <input
                            type="text"
                            className="px-4 py-3"
                            placeholder="e.g weresocooked@gmail.com"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <div className="bg-black w-full h-[1px]"></div>
                    </div>
                    <div className="input-group  flex flex-col gap-2">
                        <label className="text-2xl">Username</label>
                        <input
                            type="text"
                            className="px-4 py-3"
                            placeholder="e.g weresocooked@gmail.com"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <div className="bg-black w-full h-[1px]"></div>
                    </div>
                    
                </div>
                <div className="sign-btn">
                    <button>
                        Sign up
                    </button>
                </div>
                <div className="navigate-login ">
                <p>Already have an account? </p>
                    <button onClick={()=>signInNav('')} className="underline">Login</button>
                </div>
            </div>
            <div className="regis-right"></div>
        </div>
      </div>
    </>
  );
}
export default Register;
