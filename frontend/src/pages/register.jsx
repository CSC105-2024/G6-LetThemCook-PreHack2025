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
  const loginNav = useNavigate();
  return (
    <>
      <div className="page-container relative  w-full flex-row flex min-h-screen  justify-center items-center md:items-baseline bg-[#E9E5DC]   ">
        <img
          src="Login\Login-pic2.svg"
          className="absolute top-0 right-0 block md:hidden"
        />
        <div className="regis-box flex gap-10 md:gap-30 flex-col md:flex-row relative py-20 md:bg-white md:h-screen px-20   ">
          <img
            src="Login\Login-pic2.svg"
            className="absolute top-0 right-10 hidden md:block"
          />
          <div className="regis-left flex flex-col gap-8">
            <h3 className="text-5xl font-bold">Sign up</h3>
            <div className="input-field flex flex-col gap-3">
              <div className="input-group  flex flex-col gap-4">
                <label className="text-lg">Email</label>
                <input
                  type="text"
                  className="px-4 py-3"
                  placeholder="e.g weresocooked@gmail.com"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <div className="bg-black w-full h-[1px]"></div>
              </div>
              <div className="input-group  flex flex-col gap-2">
                <label className="text-lg ">Username</label>
                <input
                  type="text"
                  className="px-4 py-3"
                  placeholder="e.g Jungwonie"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <div className="bg-black w-full h-[1px]"></div>
              </div>
              <div className="input-group  flex flex-col gap-2 w-100%">
                <label className="text-lg ">Password</label>
                <div className="flex gap-3 items-center justify-between ">
                  <input
                    className="px-4 py-3 w-[100%]"
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
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
                <label className="text-lg ">Confirm Password</label>
                <div className="flex gap-3 items-center justify-between ">
                  <input
                    className="px-4 py-3 w-[100%]"
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Confirm Password"
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
            <div className="sign-btn flex justify-center items-center">
              <button className="bg-[#5C6A51] cursor-pointer rounded-[10px] px-9 py-4 font-bold text-white text-md ">
                Sign up
              </button>
            </div>
            <div className="navigate-login flex gap-2">
              <p>Already have an account? </p>
              <button
                onClick={() => loginNav("/")}
                className="underline cursor-pointer  "
              >
                Login
              </button>
            </div>
          </div>
          <div className="regis-right md:bg-white flex flex-col justify-center items-center">
            <div className="username">
              <h4 className="font-bold">Username must:</h4>
              <ul className="list-disc">
                <li>At least 8 characters long </li>
                <li>Uppercase letters: A-Z</li>
                <li>Lowercase letters: a-z</li>
                <li>Numbers: 0-9</li>
              </ul>
            </div>
            <div className="password">
              <h4 className="font-bold">Password must:</h4>
              <ul className="list-disc">
                <li>At least 8 characters long </li>
                <li>Uppercase letters: A-Z</li>
                <li>Lowercase letters: a-z</li>
                <li>Numbers: 0-9</li>
              </ul>
            </div>
            <div className="sign-in-pic hidden md:block md:mt-10">
              <img src="Signin/sigin-img1.svg" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Register;
