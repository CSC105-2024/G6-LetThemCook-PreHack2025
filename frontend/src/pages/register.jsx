import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
const RegisterSchema = z
  .object({
    email: z.string().email(),
    username: z.string().min(1, "Username is required."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter.")
      .regex(/[a-z]/, "Must contain at least one lowercase letter.")
      .regex(/[0-9]/, "Must contain at least one number."),
    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const openEye = <FontAwesomeIcon icon={faEye} />;
  const closeEye = <FontAwesomeIcon icon={faEyeSlash} />;
  const loginNav = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegisterSchema),
  });

  const handleRegister = async (formData) => {
    try{
      const res  = await fetch("http://localhost:3000/auth/signup",{
        method:"POST",
        headers:{
          "Content-Type": "application/json",
        },
        credentials:"include",
        body: JSON.stringify({
          email:formData.email,
          password:formData.password,
          username:formData.username
        })
      })
       if(res.ok){
          loginNav('/');
       }else{
        alert("Registration failed");
       }
    }catch(e){
      alert("Network error" + errors.message)
    }
  };
  return (
    <>
      <div className="page-container relative  w-full flex-row flex min-h-screen  justify-center items-center md:items-baseline bg-[#E9E5DC]   ">
        <img
          src="Login\Login-pic2.svg"
          className="absolute top-0 right-0 block md:hidden"
        />
        <div className="regis-box flex gap-10 md:gap-30 flex-col md:flex-row relative py-15 md:bg-white md:h-screen px-20   ">
          <img
            src="Login\Login-pic2.svg"
            className="absolute top-0 right-10 hidden md:block"
          />
          <div className="regis-left flex flex-col gap-6">
            <h3 className="text-5xl font-bold">Sign up</h3>
            <form
              onSubmit={handleSubmit(handleRegister)}
              className="input-field flex flex-col gap-3"
            >
              <div className="input-group  flex flex-col gap-4">
                <label className="text-lg">Email</label>
                <input
                  type="text"
                  className="px-4 py-3 border-b-1 "
                  placeholder="e.g weresocooked@gmail.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mb-4">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="input-group  flex flex-col gap-2">
                <label className="text-lg ">Username</label>
                <input
                  type="text"
                  className="px-4 py-3 border-b-1"
                  placeholder="e.g Jungwonie"
                  {...register("username")}
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mb-4">
                    {errors.username.message}
                  </p>
                )}
              </div>
              <div className="input-group  flex flex-col gap-2 w-100%">
                <label className="text-lg ">Password</label>
                <div className="flex gap-3 items-center justify-between ">
                  <input
                    className="px-4 py-3 w-[100%] border-b-1"
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    placeholder="Password"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mb-4">
                      {errors.password.message}
                    </p>
                  )}
                  <span>
                    <button onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? openEye : closeEye}
                    </button>
                  </span>
                </div>
              </div>
              <div className="input-group  flex flex-col gap-2 w-100%">
                <label className="text-lg ">Confirm Password</label>
                <div className="flex gap-3 items-center justify-between ">
                  <input
                    className="px-4 py-3 w-[100%] border-b-1"
                    type={showPassword ? "text" : "password"}
                    {...register("confirmPassword")}
                    placeholder="Confirm Password"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mb-4">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                  <span>
                    <button onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? openEye : closeEye}
                    </button>
                  </span>
                </div>
              </div>

              <div className="sign-btn flex justify-center items-center">
                <button
                  type="submit"
                  className="bg-[#5C6A51] mt-3 cursor-pointer rounded-[10px] px-9 py-4 font-bold text-white text-md "
                >
                  Sign up
                </button>
              </div>
            </form>
            <div className="navigate-login flex gap-2 items-center justify-center">
              <p>Already have an account? </p>
              <button
                onClick={() => loginNav("/")}
                className="underline cursor-pointer  "
              >
                Login
              </button>
            </div>
          </div>
          <div className="regis-right md:bg-white flex flex-col justify-center items-center gap-2">
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
