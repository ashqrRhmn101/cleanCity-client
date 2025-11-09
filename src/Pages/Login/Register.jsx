import React, { use } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { useNavigate } from "react-router";

const Register = () => {
  const { setUser, createUser } = use(AuthContext);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const image = e.target.image.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    console.log(name, image, email, password);

    createUser(email, password)
      .then((result) => {
        console.log(result.user);
        setUser(result);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1 className="text-5xl font-bold">Register now!</h1>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto m-9">
        <form onSubmit={handleRegister} className="card-body">
          <fieldset className="fieldset">
            <label className="label">Name</label>
            <input
              type="name"
              name="name"
              className="input"
              placeholder="Your Name"
            />
            <label className="label">Photo URL</label>
            <input
              type="photoURL"
              name="image"
              className="input"
              placeholder="Your Photo URL"
            />
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input"
              placeholder="Email"
            />
            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              className="input"
              placeholder="Password"
            />

            <button className="btn btn-neutral mt-4">Register</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Register;
