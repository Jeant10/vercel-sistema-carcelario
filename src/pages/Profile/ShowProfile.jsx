import React from "react";
import { UpdateProfileAvatar } from "./UpdateProfileAvatar";
import { UpdateProfileInformation } from "./UpdateProfileInformation";

export const ShowProfile = () => {
  return (
    <div>
        <UpdateProfileAvatar />
        <UpdateProfileInformation />
    </div>
  );
};
