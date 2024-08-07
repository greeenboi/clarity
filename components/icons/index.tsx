import { Image } from "expo-image";
import React from "react";

const Email = () => {
  return (
    <Image
      source={require("../../assets/email.svg")}
      contentFit="cover"
      transition={1000}
      style={{ width: 26, height: 26 }}
    />
  );
};

const Google = () => {
  return (
    <Image
      source={require("../../assets/google.svg")}
      contentFit="cover"
      transition={1000}
      style={{ width: 26, height: 26 }}
    />
  );
};

const Logout = () => {
  return (
    <Image
      source={require("../../assets/logout.svg")}
      contentFit="cover"
      transition={1000}
      style={{ width: 26, height: 26 }}
    />
  );
};

const Check = () => {
  return (
    <Image
      source={require("../../assets/check.svg")}
      contentFit="cover"
      transition={1000}
      style={{ width: 26, height: 26 }}
    />
  );
};

export { Email, Google, Logout, Check };
