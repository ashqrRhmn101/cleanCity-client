import React from "react";

const Register = () => {
  return (
    <div>
      <h1 className="text-5xl font-bold">Register now!</h1>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto m-9">
        <form className="card-body">
          <fieldset className="fieldset">
            <label className="label">Name</label>
            <input type="name" name="name" className="input" placeholder="Your Name" />
            <label className="label">Photo URL</label>
            <input type="photoURL" name="image" className="input" placeholder="Your Photo URL" />
            <label className="label">Email</label>
            <input type="email" name="email" className="input" placeholder="Email" />
            <label className="label">Password</label>
            <input type="password" name="password" className="input" placeholder="Password" />
            
            <button className="btn btn-neutral mt-4">Register</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Register;
