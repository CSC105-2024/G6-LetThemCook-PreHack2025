function Login() {
  return (
    <div className=" w-full flex-row flex min-h-screen justify-around  bg-[#E9E5DC]  ">
      <div className="left-log hidden md:block">
        <div className="pic group justify-center items-center flex h-screen ">
          <img className="w-[500px]" src="Login/Login-pic1.svg" />
        </div>
      </div>
      <div className="right-log w-full md:w-fit  relative  md:bg-white flex h-screen">
        <img src="Login\Login-pic2.svg" className="absolute right-0" />
        <div className="login-container gap-10 w-full flex flex-col justify-center px-20 lg:px-30 ">
          <div className="left-header flex text-center flex-col">
            <h3 className="text-5xl text-nowrap">LetThemCook</h3>
            <h4>Let's show off your cooking skills! </h4>
          </div>
          <div className="input-field flex flex-col gap-3">
            <div className="input-group  flex flex-col gap-2">
              <label className="text-2xl">Email</label>
              <input
                type="text"
                className="px-4 py-3"
                placeholder="e.g weresocooked@gmail.com"
              />
              <div className="bg-black w-full h-[1px]"></div>
            </div>
            <div className="input-group  flex flex-col gap-2">
              <label className="text-2xl">Password</label>
              <input
                className="px-4 py-3"
                type="password"
                placeholder="e.g weresocooked@gmail.com"
              />
              <div className="bg-black w-full h-[1px]"></div>
            </div>
          </div>
          <div className="btn-feild flex justify-center items-center">
            <button className="bg-[#5C6A51] rounded-[10px] px-9 py-4 font-bold text-white text-md">
              Login
            </button>
          </div>
          <div className="navigate-signup flex justify-center items-center text-lg">
            <p>Don’t have an account?</p>
            <span className="underline ml-3">Sign Up!</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
