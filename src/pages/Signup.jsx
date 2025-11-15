import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign Up Data:", signupData);
    // Add sign-up logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-brown-900 via-brown-800 to-brown-700 relative px-4">
      {/* Online Temple Background */}
      <div
        className="absolute inset-0 bg-center bg-cover opacity-30 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1619336349871-6e9b3f20ee54?auto=format&fit=crop&w=1950&q=80')`,
        }}
      />

      <div className="relative z-10 bg-[#f4e4c1]/90 backdrop-blur-md p-10 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-heading font-bold text-brown-900 mb-6 text-center uppercase">
          Sacred Sign Up
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col">
            <label className="text-brown-900 font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={signupData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="px-4 py-2 rounded-lg border-2 border-brown-700 focus:border-temple-gold outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-brown-900 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={signupData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="px-4 py-2 rounded-lg border-2 border-brown-700 focus:border-temple-gold outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-brown-900 font-medium mb-1">Mobile Number</label>
            <input
              type="tel"
              name="mobile"
              value={signupData.mobile}
              onChange={handleChange}
              placeholder="Enter your mobile number"
              required
              className="px-4 py-2 rounded-lg border-2 border-brown-700 focus:border-temple-gold outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-temple-gold to-soft-gold text-brown-900 font-bold rounded-lg shadow-lg hover:shadow-divine transition-all duration-300 uppercase tracking-wide"
          >
            Sign Up
          </button>
        </form>

        {/* Back to Login */}
        <div className="mt-6 text-center">
          <p className="text-brown-900 mb-2">Already have an account?</p>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 bg-gradient-to-r from-soft-gold to-temple-gold text-brown-900 font-semibold rounded-lg shadow-md hover:shadow-divine transition-all duration-300 uppercase tracking-wide"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
