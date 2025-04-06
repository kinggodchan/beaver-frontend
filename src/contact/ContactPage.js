import React from "react";
import { useNavigate } from "react-router-dom"; 
import "./ContactPage.css";
import Header from "../component/Header";

const ContactPage = () => {
  const navigate = useNavigate(); 

  return (
    <>
      <Header /> 
      <div className="contact-container">
        <div className="contact-content">
          <img src="/question.png" alt="Question" className="question-image" />

          <form className="contact-form">
            <div className="form-group">
              <label>Name</label>
              <input type="text" placeholder="Enter your name" />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="Enter your email" />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input type="tel" placeholder="Enter your phone number" />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea placeholder="Enter your message"></textarea>
            </div>

            <div className="button-group">
              <button type="submit">Submit</button>
              <button type="button" onClick={() => navigate("/inquiry")}>
                List
              </button>{" "}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
