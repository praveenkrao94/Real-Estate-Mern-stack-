import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { toast } from 'react-toastify';


function SignUp() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();

    if (data.error) {
      setError(data.error);
      setLoading(false);
    } else if (res.status === 200) {
      toast.success('Sign Up successful!');
      navigate('/signin')
      console.log("User created successfully:", data);
      setLoading("success");
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading === 'success'}
          className={`text-white p-3 ${
            loading === 'success' ? 'bg-green-500' : 'bg-slate-700'
          } rounded-lg uppercase hover:opacity-95 disabled:opacity-80`}
        >
          {loading === 'success' ? (
            <div className="flex items-center justify-center">
              Successful
              <FaCheck className="ml-2 animate__animated animate__heartBeat animate__infinite" />
            </div>
          ) : loading ? (
            'Loading...'
          ) : (
            'Sign Up'
          )}
        </button>
      </form>
      <div className="flex gap-2 mt-4">
        <p className="font-semibold">Have an Account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign In</span>
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
