import Google from "../images/google.png";

import "../styles/Login.css";
const Login = () => {
  const google = () => {
    window.open("http://localhost:4000/auth/google", "_self");
  };


  return (
    <div className="login">
     
      <div className="wrapper">
        <div className="left">
          <div className="loginButton google" onClick={google}>
            <img src={Google} alt="" className="icon" />
            Google
          </div>
          
          
        </div>
        
      </div>
    </div>
  );
};

export default Login;
