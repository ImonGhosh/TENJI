import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import './style.css';
import GoogleIcon from './google-icon.svg';

const LoginPage: React.FC = () => {
  const navigate = useNavigate(); // Initialize the navigation hook

  //const iconPath = './google-icon.svg';
   
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="form-container">
        <h2 className="form-heading">Log in to Tenji</h2>

        {/* Google Button */}
        <button className="google-button">
          <span>Register with</span>
          <img src = {GoogleIcon} alt="Google Icon" className="google-icon" />
        </button>

        {/* Divider */}
        <div className="divider">
          <div className="divider-line"></div>
          <span className="divider-text">Or continue with</span>
          <div className="divider-line"></div>
        </div>

        {/* Input Fields */}
        <form>
          <input type="text" placeholder="Type Username or Email ..." className="input-field" />
          <input type="password" placeholder="Type password here..." className="input-field" />

          {/* Forgot Password */}
          <div className="form-footer">
            <a href="#">Forgot your password?</a>
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-button" onClick={() => navigate("/signin")} // Navigate to the Sign-Up page
          >Sign In</button>
        </form>

        {/* Footer Text */}
        <div className="footer-text">
          Not a member?{" "}
          <button
            className="text-blue-600 hover:underline"
            onClick={() => navigate("/signup")} // Navigate to the Sign-Up page
          >
            Sign up now
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
