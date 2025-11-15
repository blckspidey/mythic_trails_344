import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    mobile: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", loginData);
    // Handle login logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-brown-950 via-brown-900 to-brown-800 relative px-4">
      {/* Darker Online Temple Background */}
      <div
        className="absolute inset-0 bg-center bg-cover opacity-50 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1619336349871-6e9b3f20ee54?auto=format&fit=crop&w=1950&q=80')`,
        }}
      />

      <div className="relative z-10 bg-[#f4e4c1]/80 backdrop-blur-md p-10 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-heading font-bold text-brown-900 mb-6 text-center uppercase">
          Sacred Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col">
            <label className="text-brown-900 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="px-4 py-2 rounded-lg border-2 border-brown-700 focus:border-temple-gold outline-none bg-brown-50/80"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-brown-900 font-medium mb-1">Mobile Number</label>
            <input
              type="tel"
              name="mobile"
              value={loginData.mobile}
              onChange={handleChange}
              placeholder="Enter your mobile number"
              required
              className="px-4 py-2 rounded-lg border-2 border-brown-700 focus:border-temple-gold outline-none bg-brown-50/80"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-temple-gold to-soft-gold text-brown-900 font-bold rounded-lg shadow-lg hover:shadow-divine transition-all duration-300 uppercase tracking-wide"
          >
            Login
          </button>
        </form>

        {/* Sign Up Button */}
        <div className="mt-6 text-center">
          <p className="text-brown-900 mb-2">Don't have an account?</p>
          <button
            onClick={() => navigate("/signup")}
            className="px-6 py-2 bg-gradient-to-r from-soft-gold to-temple-gold text-brown-900 font-semibold rounded-lg shadow-md hover:shadow-divine transition-all duration-300 uppercase tracking-wide"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
