import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';

const Header = () => {
  const {setUserInfo,userInfo}=useContext(UserContext);

  useEffect(()=>{
    fetch(`http://localhost:4000/profile`,{
      method:'GET',
      credentials:'include',
    }).then((res)=>{
      res.json().then(userInfo=>{
        setUserInfo(userInfo);
      });
    })
  },[]);

  function logout(){
    fetch('http://localhost:4000/logout',{
      method:'POST',
      credentials:'include',
    });
    setUserInfo(null);
  }

  const username=userInfo?.username;

  return (
    <header>
        <Link to="/" className="logo">MyBlog</Link>
        <nav>
        {
          username ? (
            <>
              <span>Hello {username}!</span>
              <Link to='/create'>Create new post</Link>
              <a onClick={logout}>Logout</a>
            </>
          ):(
            <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            </>
          )
        }
        </nav>
      </header>
  )
}

export default Header 