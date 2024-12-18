import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import './style.css';
import { useValidateSignInMutation } from "@/services/UsersApi";
import GoogleIcon from './google-icon.svg';

const LoginPage: React.FC = () => {
  const navigate = useNavigate(); // Initialize the navigation hook
  const [ValidateSignInMutation] = useValidateSignInMutation();
  const [signInData, setUserData] = useState({
    username: "",
    password: "",
  });
  const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;
      setUserData((prev) => ({ ...prev, [name]: value }));
    };
  //const iconPath = './google-icon.svg';
  const handleSignIn = async () => {
      try {
        await ValidateSignInMutation({ signInData: signInData }).unwrap();
        //alert(`Sign In successful!`);
        //navigate("/signin")
        window.location.href = "/signin";
      } catch (error) {
        alert(`Incorrect Username or Password`);
      }
  };
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
          <input type="text" name="username" value={signInData.username} onChange={handleChange} className="input-field"  
          placeholder="Type Username or Email ..."
          />
          <input type="password" name="password" value={signInData.password} onChange={handleChange} className="input-field" 
          placeholder="Type password here..."
           />

          {/* Forgot Password */}
          <div className="form-footer">
            <a href="#">Forgot your password?</a>
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-button" onClick={handleSignIn} // Navigate to the Sign-In page\
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
