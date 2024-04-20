import React, { useContext, useState } from "react";
import { Navigate } from 'react-router-dom';
import { UserContext } from "../UserContext";
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect]=useState(false);
  const {setUserInfo}=useContext(UserContext);

  const login= async (e)=>{
    e.preventDefault();
    const response= await fetch(`http://localhost:4000/login`,{
      method:'POST',
      body:JSON.stringify({username,password}),
      headers:{'Content-Type':'application/json'},
      credentials:'include',
    })
    if(response.status===200){
      response.json().then(userInfo=>{
        setUserInfo(userInfo);
        setRedirect(true);
      })
    }else{
      alert('wrong credentials');
    }
  }

  if(redirect){
    return <Navigate to={'/'}/>
  }

  return (
    <div>
      <form className="login" onSubmit={login}>
        <h1>Login</h1>
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="username"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
        />
        <button>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
