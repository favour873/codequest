import React, { useContext, useEffect, useState } from "react";
import "./Modules.css";
import { Link } from "react-router-dom";
import { useNavigate, Navigate } from "react-router-dom";
import AuthContext from "../../contexts/auth";
import ProfileContext from "../../contexts/profile";
import apiClient from "../../services/apiClient";
import AccessForbidden from "../AccessForbidden/AccessForbidden";
import LottieBackgroundAnimation from "../AnimationBackgroundComponent/AnimationBackgroundComponent";
import LottieAnimation from "../AnimationComponent/AnimationComponent";
import animation12 from "/src/assets/scrollingBackgroundAnimation.json";
import animation15 from "/src/assets/mountainBadgeAnimation.json";

/**
 * Modules component displays the learning modules for a selected profile.
 * It fetches the userProgress data for the selected profile from the backend API.
 * It calculates the `leftOff` value based on the completed modules in `userProgress`.
 * The selectedProfileId is retrieved from the URL query parameter 'selectedProfile'.
 * The leftOff value is stored in localStorage to persist the user progress.
 */
export default function Modules() {
  const navigate = useNavigate();
  // User context from AuthContext
  const { userContext } = useContext(AuthContext);
  const [user, setUser] = userContext;

  // Profile context from ProfileContext
  const {
    selectedProfile,
    setSelectedProfile,
    userProgress,
    setUserProgress,
    leftOff,
    setLeftOff,
  } = useContext(ProfileContext);

  // /**
  //  * Calculate the value for `leftOff` based on the completed modules in `userProgress`.
  //  * This effect runs whenever the `userProgress` changes.
  //  */
  // useEffect(() => {
  //   const leftOffValue = Object.values(userProgress)
  //     .filter((key) => typeof key === "boolean")
  //     .filter(Boolean).length;
  //   setLeftOff(leftOffValue);
  // }, [userProgress]);

  // /**
  //  * Fetch the `selectedProfile` from the URL query parameter 'selectedProfile'.
  //  * Update the `selectedProfile` state and store it in localStorage.
  //  * This effect runs when the URL query parameter 'selectedProfile' or the `setSelectedProfile` function changes.
  //  */
  // useEffect(() => {
  //   const searchParams = new URLSearchParams(location.search);
  //   const selectedProfile = searchParams.get("selectedProfile");
  //   if (selectedProfile) {
  //     setSelectedProfile(parseInt(selectedProfile, 10));
  //     localStorage.setItem("selectedProfile", selectedProfile);

  //     // setTimeout(() => {
  //     //   setShowContent(true);
  //     // }, 100);
  //   }
  // }, [location.search, setSelectedProfile]);

  // /**
  //  * Fetch data from the backend API for the selected profile.
  //  * Update the `selectedProfile` and `userProgress` state based on the API response.
  //  * This effect runs when the `localStorage.getItem("selectedProfile")` changes.
  //  */
  // useEffect(() => {
  //   const fetchDataAndSetSelectedProfile = async () => {
  //     try {
  //       const profileId = localStorage.getItem("selectedProfile");
  //       const response = await apiClient.fetchData(profileId);
  //       setSelectedProfile(profileId);
  //       setUserProgress(response.userprogress);
  //     } catch (error) {
  //       // Handle any error that might occur during the API call
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   // Call the new function when 'localStorage.getItem("selectedProfile")'
  //   if (localStorage.getItem("selectedProfile")) {
  //     fetchDataAndSetSelectedProfile();
  //   }
  // }, [localStorage.getItem("selectedProfile")]);

  // /**
  //  * Store the `leftOff` value in localStorage to persist user progress.
  //  * This effect runs whenever the `leftOff` changes.
  //  */
  // useEffect(() => {
  //   if (leftOff) {
  //     localStorage.setItem("leftOff", leftOff);
  //   }
  //   setLeftOff(localStorage.getItem("leftOff"));
  // }, [leftOff]);

  const module_id_name = [
    { number: 1, value: "Data Types" },
    { number: 2, value: "Variables" },
    { number: 3, value: "Conditionals" },
    { number: 4, value: "Lists" },
    { number: 5, value: "Loops" },
    { number: 6, value: "Functions" },
  ];
  return (
    <div className="Modules">
      {console.log("modules leftOff" + leftOff)}
      <LottieBackgroundAnimation animationData={animation12} />
      {user.email && !localStorage.getItem("selectedProfile") && (
        <Navigate to="/account-profiles" replace={true} />
      )}
      <h1 className="learnPythonH1">Learn Python</h1>
      <div className="moduleCard">
        <div className="moduleCircles">
          {module_id_name.map(({ number, value }) => {
            return number <= leftOff ? (
              <Link key={number} to={`/modules/${number}/curriculum`}>
                <span
                  className={`module-${number} circle ${
                    number <= leftOff === true ? "completed" : ""
                  }`}
                >
                  <h4>{value}</h4>
                </span>
              </Link>
            ) : (
              <React.Fragment key={number}>
                {leftOff > 0 && (
                  <>
                    {number === parseInt(leftOff) + 1 ? (
                      <Link key={number} to={`/modules/${number}/curriculum`}>
                        <span
                          className={`module-${number} circle ${
                            number <= leftOff ? "completed" : "todo"
                          }`}
                        >
                          <h4>{value}</h4>
                        </span>
                      </Link>
                    ) : (
                      <span
                        key={number}
                        className={`module-${number} circle ${
                          number <= leftOff ? "completed" : ""
                        }`}
                      >
                        <h4>{value}</h4>
                      </span>
                    )}
                  </>
                )}

                {leftOff === 0 && user.email ? (
                  <>
                    {number === 1 ? (
                      <Link key={number} to={`/modules/${number}/curriculum`}>
                        <span className={`module-${number} circle todo`}>
                          <h4>{value}</h4>
                        </span>
                      </Link>
                    ) : (
                      <span key={number} className={`module-${number} circle`}>
                        <h4>{value}</h4>
                      </span>
                    )}
                  </>
                ) : null}
                {leftOff === 0 && !user.email ? (
                  <>
                    {number === 1 ? (
                      <Link key={number} to={`/modules/${number}/curriculum`}>
                        <span className={`module-${number} circle todo`}>
                          <h4>{value}</h4>
                        </span>
                      </Link>
                    ) : (
                      <span key={number} className={`module-${number} circle`}>
                        <h4>{value}</h4>
                      </span>
                    )}
                  </>
                ) : null}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
