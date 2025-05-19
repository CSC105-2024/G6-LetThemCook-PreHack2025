import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
function Register() {
      const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const openEye = <FontAwesomeIcon icon={faEye} />;
  const closeEye = <FontAwesomeIcon icon={faEyeSlash} />;
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
                    <div className="input-group  flex flex-col gap-2 w-100%">
              <label className="text-2xl">Password</label>
              <div className="flex gap-3 items-center justify-between ">
                <input
                  className="px-4 py-3 w-[100%]"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="e.g weresocooked@gmail.com"
                />
                <span>
                  <button onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? openEye : closeEye}
                  </button>
                </span>
              </div>
              <div className="bg-black w-full h-[1px]"></div>
            </div>
            <div className="input-group  flex flex-col gap-2 w-100%">
              <label className="text-2xl">Password</label>
              <div className="flex gap-3 items-center justify-between ">
                <input
                  className="px-4 py-3 w-[100%]"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="e.g weresocooked@gmail.com"
                />
                <span>
                  <button onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? openEye : closeEye}
                  </button>
                </span>
              </div>
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
