function Login() {
  return (
    <>
      <div>
        <div className="container justify-between flex min-h-screen  bg-amber-50 ">
          <div className="left-log lg:hidden">
            <div className="pic group"></div>
          </div>
          <div className="right-log">
            <div className="login-container flex">
              <div className="left-header">
                <h3>LetThemCook</h3>
                <h4>Let's show off your cooking skills! </h4>
              </div>
              <div className="input-field">
                <div className="input-group">
                  <label>Email</label>
                  <input type="text" placeholder="e.g weresocooked@gmail.com" />
                </div>
                <div className="input-group">
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="e.g weresocooked@gmail.com"
                  />
                </div>
              </div>
              <div className="btn-feild">
                <button>Login</button>
              </div>
              <div className="navigate-signup">
                <p>Don’t have an account?</p>
                <span>Sign Up!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
