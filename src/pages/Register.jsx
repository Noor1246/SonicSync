import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import API from "../api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${API}/api/auth/register`,
        {
          name,
          email,
          password,
        }
      );

      alert("Registration Successful!");
      window.location.href = "/login";
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Registration Failed"
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
        onSubmit={registerUser}
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
          Create Account
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
          Join SonicSync and enjoy your music anywhere.
        </p>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="
            w-full
            p-4
            mb-5

            rounded-xl

            bg-white/10

            border
            border-white/10

            text-white

            placeholder-gray-400

            outline-none

            focus:border-cyan-400

            transition
          "
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="
            w-full
            p-4
            mb-5

            rounded-xl

            bg-white/10

            border
            border-white/10

            text-white

            placeholder-gray-400

            outline-none

            focus:border-cyan-400

            transition
          "
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="
            w-full
            p-4
            mb-7

            rounded-xl

            bg-white/10

            border
            border-white/10

            text-white

            placeholder-gray-400

            outline-none

            focus:border-cyan-400

            transition
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

            text-white
            font-semibold

            shadow-lg

            hover:scale-[1.02]

            transition-all
            duration-300
          "
        >
          Create Account
        </button>

        <p
  className="
    text-center
    text-gray-400
    mt-6
    text-sm
  "
>
  Already have an account?{" "}
  <Link
    to="/login"
    className="
      text-cyan-400
      font-semibold
      hover:text-cyan-300
      transition-colors
      duration-300
    "
  >
    Login
  </Link>
</p>
      </form>
    </div>
  );
};

export default Register;