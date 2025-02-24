"use client";
import { useEffect, useRef, useState } from "react";
import {
  validateUsername,
  validateEmail,
  validatePassword,
} from "../validations/sign_up";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [usernameExists, setUsernameExists] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  const debouncedUsername = useRef("");
  const debouncedEmail = useRef("");
  const debouncedPassword = useRef("");

  const delay = 200;

  // Field configuration
  const fields = [
    {
      label: "Username",
      placeholder: "Enter a username",
      name: "username",
      type: "text",
      required: true,
      value: username,
      handler: setUsername,
      valid: validUsername,
      errorMsg:
        "username should be alphanumeric and have at least six characters",
    },
    {
      label: "Email",
      placeholder: "Enter your email",
      name: "email",
      type: "email",
      required: true,
      value: email,
      handler: setEmail,
      valid: validEmail,
      errorMsg: "please enter a properly formatted email address",
    },
    {
      label: "Password",
      placeholder: "Enter a password",
      name: "password",
      type: "password",
      required: true,
      value: password,
      handler: setPassword,
      valid: validPassword,
      errorMsg:
        "password should be at least 8 characters long, alphanumeric including at least one capital letter and one special character",
    },
  ];

  useEffect(() => {
    // This useEffect will be called on every change to `username`
    if (username === debouncedUsername.current) return; // Skip if no change
    debouncedUsername.current = username;
    setUsernameExists(false);
    const timer = setTimeout(() => {
      // Call the backend API here to check the username
      setValidUsername(validateUsername(username));
      if (validUsername) {
        fetch(`/api/users/exists?username=${username}`).then((obj) => {
          obj.json().then((jsonObj: any) => {
            const { UserExists } = jsonObj;
            setUsernameExists(UserExists);
          });
        });
      }
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [username]);

  useEffect(() => {
    if (email === debouncedEmail.current) return;
    debouncedEmail.current = email;
    const timer = setTimeout(() => {
      setValidEmail(validateEmail(email));
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [email]);

  useEffect(() => {
    if (password === debouncedPassword.current) return;
    debouncedPassword.current = password;
    const timer = setTimeout(() => {
      setValidPassword(validatePassword(password));
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [password]);

  return (
    <div className="signup-form">
      <h1 className="signup-header">Create an Account</h1>
      <form /* onSubmit={} */>
        {fields.map((field) => (
          <div key={field.name} className="form-group">
            <div className="block mb-6">
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={field.value}
                placeholder={field.placeholder}
                onChange={(e) => {
                  field.handler(e.target.value);
                }}
                className="signup-input"
                required={field.required}
              />
              {(usernameExists || (field.value != "" && !field.valid)) && (
                <p className="signup-error-msg">
                  {field.name === "username" && usernameExists
                    ? "username already exists"
                    : field.errorMsg}
                </p>
              )}
            </div>
          </div>
        ))}

        <button className="signup-submit-button" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}
