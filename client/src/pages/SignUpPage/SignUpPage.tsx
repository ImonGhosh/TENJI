import React, { useState } from "react";
import { useCreateUserQueryMutation,useValidateEmailIdMutation } from "@/services/UsersApi";
import "./style.css";


const SignUpPage: React.FC = () => {
  const [language, setLanguage] = useState("en"); // Language state
    const [userData, setUserData] = useState({
      firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    confirmPassword: "",
    occupation: "",
    bio: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [createUserMutation] = useCreateUserQueryMutation();
  const [createValidateEmailMutation] = useValidateEmailIdMutation();

  // Language translation map
  const translations = {
    en: {
      signUp: "Sign Up",
      firstName: "First Name",
      lastName: "Last Name",
      emailId: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      occupation: "Occupation",
      bio: "Bio",
      cancel: "Cancel",
      saveAndSubmit: "Save and Submit",
      required: "is required.",
      passwordMismatch: "Passwords do not match.",
      invalidPassword:
        "Password must contain at least 8 characters, 1 capital letter, 1 number, and 1 special character.",
    },
    // Additional translations omitted for brevity
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error on input
  };

  const validateFields = () => {
    const { firstName, lastName, emailId, password, confirmPassword } = userData;
    const newErrors: any = {};

    if (!firstName) newErrors.firstName = `${translations[language].firstName} ${translations[language].required}`;
    if (!lastName) newErrors.lastName = `${translations[language].lastName} ${translations[language].required}`;
    if (!emailId) newErrors.emailId = `${translations[language].emailId} ${translations[language].required}`;
    if (!password) newErrors.password = `${translations[language].password} ${translations[language].required}`;
    if (!confirmPassword)
      newErrors.confirmPassword = `${translations[language].confirmPassword} ${translations[language].required}`;

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (password && !passwordRegex.test(password)) {
      newErrors.password = translations[language].invalidPassword;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = translations[language].passwordMismatch;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };


  const handleSaveAndSubmit = async () => {
    let isError: boolean = false;
      try {
        await createValidateEmailMutation(userData.emailId).unwrap();
      } catch (error) {
        isError = true
        alert(`Account already exists with this email id`);       
      }
      if (validateFields() && !isError) {
      try {
        await createUserMutation({ user: userData }).unwrap();
        alert(`${translations[language].signUp} successfully!`);
        window.location.href = "/"; // Redirect to the homepage
      } catch (error) {
        alert(`Failed to create user`);
      }
    }
  };

  const handleCancel = () => {
    setUserData({
      firstName: "",
      lastName: "",
      emailId: "",
      password: "",
      confirmPassword: "",
      occupation: "",
      bio: "",
    });
    setErrors({
      firstName: "",
      lastName: "",
      emailId: "",
      password: "",
      confirmPassword: "",
    });
    window.location.href = "/"; // Redirect to the homepage
  };

  return (
    <div className="signup-container">
      <div className="signup-main">
        <div className="language-selector">
          <select value={language} onChange={handleLanguageChange}>
            <option value="en">English</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
            <option value="pt">Português</option>
            <option value="it">Italiano</option>
            <option value="zh">中文 (Chinese)</option>
          </select>
        </div>
        <h2 className="signup-title">{translations[language].signUp}</h2>
        <form>
          <div className="form-grid">
            <div>
              <label>
                {translations[language].firstName} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={userData.firstName}
                onChange={handleChange}
                className="input-field"
              />
              {errors.firstName && <p className="error-message">{errors.firstName}</p>}
            </div>
            <div>
              <label>
                {translations[language].lastName} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={userData.lastName}
                onChange={handleChange}
                className="input-field"
              />
              {errors.lastName && <p className="error-message">{errors.lastName}</p>}
            </div>
            <div>
              <label>
                {translations[language].emailId} <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="emailId"
                value={userData.emailId}
                onChange={handleChange}
                className="input-field"
              />
              {errors.emailId && <p className="error-message">{errors.emailId}</p>}
            </div>
            <div className="password-grid">
              <div className="password-container">
                <label>
                  {translations[language].password} <span className="text-red-500">*</span>
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  className="input-field"
                />
                <span
                  className="password-toggle"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? "🔓" : "🔒"}
                </span>
                {errors.password && <p className="error-message">{errors.password}</p>}
              </div>
              <div className="password-container">
                <label>
                  {translations[language].confirmPassword} <span className="text-red-500">*</span>
                </label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={userData.confirmPassword}
                  onChange={handleChange}
                  className="input-field"
                />
                <span
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? "🔓" : "🔒"}
                </span>
                {errors.confirmPassword && (
                  <p className="error-message">{errors.confirmPassword}</p>
                )}
              </div>
            </div>
            <div>
              <label>{translations[language].occupation}</label>
              <select
                name="occupation"
                value={userData.occupation}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">{translations[language].occupation}</option>
                <option value="Lawyer">Lawyer</option>
                <option value="Student">Student</option>
                <option value="Law Educator">Law Educator</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div className="bio-field">
              <label>{translations[language].bio}</label>
              <textarea
                name="bio"
                value={userData.bio}
                onChange={handleChange}
                className="input-field"
              />
            </div>
          </div>
        </form>
        <div className="form-actions">
          <button type="button" className="action-button cancel" onClick={handleCancel}>
            {translations[language].cancel}
          </button>
          <button type="button" className="action-button save" onClick={handleSaveAndSubmit}>
            {translations[language].saveAndSubmit}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
