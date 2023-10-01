import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import {signInStart,signInSuccess,signInFailure} from '../../src/redux/user/UserSlice'


function SignIn() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const {loading} = useSelector((state) => state.user);
  const {error} = useSelector((state) => state.user);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
  
      if (res.status === 200) {
        toast.success('Sign In successful!');
        navigate('/');
        console.log("User Logged In successfully:", data);
        dispatch(signInSuccess(data)); 
      } else {
        
        toast.error(data.error || 'Sign In failed', {
        
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        dispatch(signInFailure(data.error || 'Sign In failed'));
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      dispatch(signInFailure("failure"));
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">User Sign-In</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
     
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          value={formData.password}
          onChange={handleChange}
        />
         <button
              disabled={loading === 'success'}
              className={`text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 ${
                loading === 'success' ? 'bg-green-500' : loading === 'failure' ? 'bg-red-500' : 'bg-slate-700'
              }`}
            >
              {loading === 'success' ? (
                <div className="flex items-center justify-center">
                  Successful
                  <FaCheck className="ml-2 animate__animated animate__heartBeat animate__infinite" />
                </div>
              ) : loading === 'failure' ? (
                
                <>
                  Login Failed
                  <FaCheck className="ml-2 text-white" /> 
                </>
              ) : loading ? (
                'Loading...'
              ) : (
                'Sign Up'
              )}
            </button>
      </form>
      <div className="flex gap-2 mt-4">
        <p className="font-semibold">Don't have an Account?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700">Register</span>
        </Link>
      </div>
    </div>
  );
}

export default SignIn;
