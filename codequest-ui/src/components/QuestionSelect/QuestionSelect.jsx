import React from "react";
import "./QuestionSelect.css";
import QuestionContext from "../../contexts/question";
import apiClient from "../../services/apiClient";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileContext from "../../contexts/profile";
import AuthContext from "../../contexts/auth";

export default function QuestionSelect() {
  const navigate = useNavigate();
  const { questionContext } = useContext(QuestionContext);
  const [questions, setQuestions] = questionContext;

  const { counterContext } = useContext(QuestionContext);
  const [counter, setCounter] = counterContext;

  const { profileContext, removeProfile, selectedProfile, setSelectedProfile } =
    useContext(ProfileContext);

  const { userContext } = useContext(AuthContext);
  const [user, setUser] = userContext;

  const finishModule = async (module_id) => {
    // update module in user progress table
    console.log(
      "module id:" + module_id,
      "selected profile" + localStorage.getItem("selectedProfile")
    );
    const { data, error } = await apiClient.completeModule(
      module_id,
      localStorage.getItem("selectedProfile")
    );
    if (error) {
      console.log("error in apiclient finish module", error);
    }
    if (data?.user) {
      console.log(data?.user);
      console.log("module has been completed");
    }
  };

  const addFinal = () => {
    const finishBtn = document.getElementById("curriculum-finish-btn");
    finishBtn.classList.add("visibile");
    finishBtn.classList.remove("hidden");
  };

  const removeFinal = () => {
    const finishBtn = document.getElementById("curriculum-finish-btn");
    finishBtn.classList.add("hidden");
    finishBtn.classList.remove("visible");
  };

  const addNext = () => {
    const nextBtn = document.getElementById("curriculum-next-btn");
    nextBtn.classList.add("visible");
    nextBtn.classList.remove("hidden");
  };

  const removeNext = () => {
    const nextBtn = document.getElementById("curriculum-next-btn");
    nextBtn.classList.add("hidden");
    nextBtn.classList.remove("visible");
  };

  const incrementCounter = () => {
    if (counter < questions.length - 1) {
      setCounter(counter + 1);
      removeNext();
      document.getElementById("message").innerHTML = "";
    }
  };

  const decrementCounter = () => {
    if (counter > 0) setCounter(counter - 1);
    document.getElementById("message").innerHTML = "";
    counter < questions.length - 1 ? removeNext() : removeFinal();
  };

  const handleResult = (event) => {
    var element = event.target; // Get the clicked element
    var content = element.innerHTML; // Get the content of the element

    if (content === questions[counter].answer) {
      document.getElementById("message").innerHTML = "Correct!";
      element.classList.add("correct-answer-2");
      counter < questions.length - 1 ? addNext() : addFinal();
    } else {
      document.getElementById("message").innerHTML = "You'll get it next time!";
      element.classList.add("wrong-answer-2");
      counter < questions.length - 1 ? removeNext() : removeFinal();
    }
  };

  return (
    <>
      <div id="content-2">
        {/* SECOND QUESTION TYPE */}
        <div className="second-question-type">
          <h2 id="message"></h2>
          <div className="question-2">
            {questions.length > 0 && questions[counter].question}
          </div>

          {questions.length > 0 ? (
            <>
              <button onClick={(event) => handleResult(event)}>
                {questions[counter].answer}
              </button>
              <br />
              <button onClick={(event) => handleResult(event)}>
                {questions[counter].incorrect_answers[0]}
              </button>
              <br />
              <button onClick={(event) => handleResult(event)}>
                {questions[counter].incorrect_answers[1]}
              </button>
              <br />
              <button onClick={(event) => handleResult(event)}>
                {questions[counter].incorrect_answers[2]}
              </button>
            </>
          ) : null}
        </div>
        <div className="curriculumCardButtonCard">
          {counter > 0 ? (
            <button
              id="curriculum-back-btn"
              className="curriculumCardButton"
              onClick={decrementCounter}
            >
              Back
            </button>
          ) : null}
          {counter == questions.length - 1 ? (
            <>
              {user.email ? (
                <button
                  id="curriculum-finish-btn"
                  className="curriculumCardButton hidden"
                  onClick={() => finishModule(questions[counter].module_id)}
                >
                  Finish
                </button>
              ) : (
                <button
                  id="curriculum-finish-btn"
                  className="curriculumCardButton hidden"
                  onClick={() => navigate("/modules")}
                >
                  Finish
                </button>
              )}
            </>
          ) : (
            <button
              id="curriculum-next-btn"
              className="curriculumCardButton hidden"
              onClick={incrementCounter}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </>
  );
}
