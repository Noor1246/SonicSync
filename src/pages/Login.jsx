import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import API from "../api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
  `${API}/api/auth/login`,
  {
    email,
    password,
  }
);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      alert("Login Successful!");

      window.location.href = "/";
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        px-4
        py-8
        bg-gradient-to-br
        from-[#020617]
        via-[#111827]
        to-[#0f172a]
      "
    >
      <form
        onSubmit={loginUser}
        className="
          w-full
          max-w-md

          rounded-3xl

          border
          border-white/10

          bg-white/10

          backdrop-blur-2xl

          shadow-[0_0_40px_rgba(34,211,238,0.15)]

          p-6
          sm:p-8
        "
      >
        <h1
          className="
            text-white
            text-3xl
            sm:text-4xl
            font-bold
            text-center
            mb-2
          "
        >
          Welcome Back
        </h1>

        <p
          className="
            text-center
            text-gray-400
            mb-8
            text-sm
            sm:text-base
          "
        >
          Login to continue listening.
        </p>

        <input
          type="email"
          placeholder="Email"

          value={email}

          onChange={(e) =>
            setEmail(e.target.value)
          }

          className="
            w-full

            p-4

            rounded-xl

            bg-white/10

            border
            border-white/10

            text-white

            placeholder-gray-400

            outline-none

            focus:border-cyan-400

            transition

            mb-5
          "
        />

        <input
          type="password"
          placeholder="Password"

          value={password}

          onChange={(e) =>
            setPassword(e.target.value)
          }

          className="
            w-full

            p-4

            rounded-xl

            bg-white/10

            border
            border-white/10

            text-white

            placeholder-gray-400

            outline-none

            focus:border-cyan-400

            transition

            mb-7
          "
        />

        <button
          className="
            w-full

            py-4

            rounded-xl

            bg-gradient-to-r
            from-cyan-500
            to-violet-500

            font-semibold
            text-white

            shadow-lg

            hover:scale-[1.02]

            transition-all
            duration-300
          "
        >
          Login
        </button>

        <p
  className="
    text-center
    text-gray-400
    mt-6
    text-sm
  "
>
  Don't have an account?{" "}
  <Link
    to="/register"
    className="
      text-cyan-400
      font-semibold
      hover:text-cyan-300
      transition-colors
      duration-300
    "
  >
    Create Account
  </Link>
</p>
      </form>
    </div>
  );
};

export default Login;