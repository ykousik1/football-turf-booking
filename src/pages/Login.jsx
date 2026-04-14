import { useState } from "react";
import { supabase } from "../supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) alert(error.message);
    else alert("Login successful ✅");
  };

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) alert(error.message);
    else alert("Signup successful ✅");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-gray-900 p-6 rounded w-80">

        <h1 className="text-2xl mb-4">Login</h1>

        <input
          placeholder="Email"
          className="w-full p-2 mb-2 bg-gray-800"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-2 bg-gray-800"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-green-500 w-full py-2 mb-2"
        >
          Login
        </button>

        <button
          onClick={handleSignup}
          className="bg-gray-700 w-full py-2"
        >
          Signup
        </button>

      </div>
    </div>
  );
}