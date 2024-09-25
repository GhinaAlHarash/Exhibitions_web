import { Text } from "@chakra-ui/react";
import React from "react";
import ProfileComp from "./ProfileComp";

const Profile = () => {
  localStorage.removeItem("CurrentProfile");
  return (
    <>
      {localStorage.getItem("useroles") == "company"? (
        <ProfileComp />
      ) : (
        <Text>profile</Text>
      )}
    </>
  );
};

export default Profile;
