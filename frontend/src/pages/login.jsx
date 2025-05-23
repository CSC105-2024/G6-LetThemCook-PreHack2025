import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
  const nav = useNavigate();
  const handleLogin = async () => {
  try {
    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    let data;
    try {
      data = await res.json();
    } catch {
      const text = await res.text();
      alert(text || "Something went wrong");
      return;
    }

    if (res.ok) {
      const token = data.token;
      const payload = JSON.parse(atob(token.split('.')[1])); 
      const userId = payload.userId;

      if (!userId) {
        alert("Invalid token: missing userId");
        return;
      }

      localStorage.setItem("userId", String(userId));
      alert("Login successful");
      nav("/homePage");
    } else {
      alert(data.msg || "Login failed");
    }
  } catch (error) {
    alert("Network error: " + error.message);
  }
};

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const openEye = <FontAwesomeIcon icon={faEye} />;
  const closeEye = <FontAwesomeIcon icon={faEyeSlash} />;
  return (
    <div className=" w-full flex-row flex min-h-screen justify-around  bg-[#E9E5DC]  ">
      <div className="left-log hidden md:block">
        <div className="pic group justify-center items-center flex h-screen ">
          <img className="w-[500px]" src="Login/Login-pic1.svg" />
        </div>
      </div>
      <div className="right-log w-full md:w-fit  relative  md:bg-white flex h-screen">
        <img src="Login\Login-pic2.svg" className="absolute right-0 top-0" />
        <div className="login-container gap-10 w-full flex flex-col justify-center px-20 lg:px-30 ">
          <div className="left-header gap-3 flex text-center flex-col">
            <h3 className="text-5xl text-nowrap font-bold">LetThemCook</h3>
            <h4>Let's show off your cooking skills! </h4>
          </div>
          <div className="input-field flex flex-col gap-3">
            <div className="input-group  flex flex-col gap-2">
              <label className="text-2xl ">Email</label>
              <input
                type="text"
                className="px-4 py-3 border-b-1 "
                placeholder="e.g weresocooked@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group  flex flex-col gap-2 w-100%">
              <label className="text-2xl ">Password</label>
              <div className="flex gap-3 items-center justify-between ">
                <input
                  className="px-4 py-3 border-b-1 w-[100%]"
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
            </div>
          </div>
          <div className="btn-feild flex justify-center items-center">
            <button onClick={handleLogin} className="bg-[#5C6A51] cursor-pointer rounded-[10px] px-9 py-4 font-bold text-white text-md">
              Login
            </button>
          </div>
          <div className="navigate-signup flex justify-center gap-2 items-center text-lg">
            <p>Don’t have an account?</p>
            <button
              onClick={() => nav("/register")}
              className="underline cursor-pointer"
            >
              Sign Up!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
