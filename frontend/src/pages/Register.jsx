import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] =
    useState({
      name: "",
      email: "",
      password: "",
      role: "candidate",
    });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post(
        "/auth/register",
        form
      );

      alert(
        "Registration Successful"
      );

      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data
          ?.message ||
          "Registration Failed"
      );
    }
  };

  return (
    <div
      style={{
        width: "400px",
        margin: "50px auto",
      }}
    >
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <select
          name="role"
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <option value="candidate">
            Candidate
          </option>

          <option value="employer">
            Employer
          </option>
        </select>

        <button
          style={{
            width: "100%",
            padding: "10px",
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;