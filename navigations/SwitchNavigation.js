import React from "react";
import { useSelector } from "react-redux";
import UserTabNavigator from "./UserTabNavigation";
import HostTabNavigator from "./HostTabNavigation";

const SwitchNavigation = () => {
  const userType = useSelector((state) => state.Auth.userType);
  if (userType === "user") {
    return <UserTabNavigator />;
  }
  return <HostTabNavigator />;
};

export default SwitchNavigation;
