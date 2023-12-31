import React, { useEffect, useContext } from "react";
import "./Home.css";
import { Link, Navigate } from "react-router-dom";
import lottie from "lottie-web";

import animationData from '/src/assets/heroAnimation.json'; // Replace with your animation file path
import LottieAnimation from "../AnimationComponent/AnimationComponent";
import animation8 from "/src/assets/codingGirlAnimation.json"
import animation21 from "/src/assets/wavingPeopleAnimation.json"
import animation22 from "/src/assets/codingKidAnimation.json"
import AuthContext from "../../contexts/auth";


const AnimationComponent = () => {
  useEffect(() => {
    // Lottie configuration
    const animationContainer = document.getElementById("lottieHomeContainer");
    const anim = lottie.loadAnimation({
      container: animationContainer,
      renderer: "svg", // Choose the renderer (svg, canvas, html)
      loop: false,
      autoplay: true,
      animationData: animationData,
    });

    return () => anim.destroy(); // Clean up on unmount
  }, []);

  return (
    <div
      id="lottieHomeContainer"
      className="floating"
      style={{ width: "600px" }}
    ></div>
  );
};

export default function Home() {
  const { userContext } = useContext(AuthContext);
  const [user, setUser] = userContext;
  return (
    <div className="Home">
      {user.email && <Navigate to="/account-profiles" replace={true} />}
      <div className="Hero">
        <div className="hero-text-and-btn">
          <h1 className="fadeIn">
            Learn how to code in a fun and interactive way!
          </h1>
          <Link to="/register">
            <button className="signUpHomeButton">Sign Up</button>
          </Link>
        </div>

        <div id="lottieAnimation">
          <AnimationComponent />
        </div>

          {/* <img src="https://www.usnews.com/object/image/00000171-9ce7-d084-affd-9def28d10000/200421-boylaptop-stock.jpg?update-time=1587475425427&size=responsive640" alt="Child sitting at a desk working on a laptop"></img> */}
        </div>
        <div className="robot-signup">
        <LottieAnimation animationData={animation21} />
        <h2 className='floating'>Learn with fun characters and progress in your coding journey!</h2>
        </div>

      <div className="testSection">
        <div className="custom-shape-divider-top-1690233543">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
        <div className="fadeIn">
          <div className="cardContent">
            <div className="animation21">
              <LottieAnimation animationData={animation22} />
            </div>
            <div className="cardTextFloatRight">
              <h3>Designed for kids aged 6-10</h3>
              <h2 className="pinkH2">
                Play games and learn how to code at the same time!
              </h2>
              <h3>
                CodeQuest is designed to give kids a fun and interactive
                environment to learning. Give it a try!
              </h3>
            </div>
          </div>
        </div>
        <div className="testSectionButtons">
          <button>
            <Link to="/modules">Try Sample Lesson</Link>
          </button>
          <button>
            <Link to="/register">Sign Up</Link>
          </button>
        </div>
      </div>

      <div className="testCard">
        <div className="custom-shape-divider-top-1690235926">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>

        <div className="floating">
          <h2>Want to try a lesson before signing up?</h2>
          <div className="pythonCard">
            <h3>Learn Python</h3>
            <h4>
              In this lesson, we will learn the basics about the Python coding
              language!
            </h4>
            {/* <img
              src="https://idsb.tmgrup.com.tr/ly/uploads/images/2022/08/22/226382.jpg"
              alt="Python logo"
            ></img> */}
            <div className="codingGirlAnimation">
              <LottieAnimation animationData={animation8} />
            </div>
            <Link to="/modules">
            <button>Try Sample Lesson</button>
          </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
}
