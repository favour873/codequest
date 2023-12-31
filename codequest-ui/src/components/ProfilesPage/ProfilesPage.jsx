import React from "react";
import "./ProfilesPage.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProfilesNew from "../ProfilesNew/ProfilesNew";
import ProfilesDetail from "../ProfilesDetail/ProfilesDetail";

export default function ProfilesPage(props) {
  return (
    <div className="profiles-page">
      <div className="profiles-page-header">
        <div className="profiles-page-heading">
          {/* <h2 className="profiles-page-title">Profiles</h2> */}
        </div>
      </div>
      {!props.user.email && <Navigate to="/forbidden" replace={true} />}
      <Routes>
        <Route path="/create" element={<ProfilesNew />} />
        <Route
          path="/id/:profileId"
          element={
            <ProfilesDetail
              user={props.user}
              profileItem={props.profileItem}
              errors={props.errors}
              setErrors={props.setErrors}
              isLoading={props.isLoading}
            />
          }
        />
      </Routes>
    </div>
  );
}
