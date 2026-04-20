"use client";

import React, { useState } from "react";
import ProfileView from "../components/profile-view";

export default function ProfileContainer() {
  const [isSharing, setIsSharing] = useState(false);
  const [showShareSuccess, setShowShareSuccess] = useState(false);

  const handleShare = () => {
    setIsSharing(true);
    // Simulate generation of share image
    setTimeout(() => {
      setIsSharing(false);
      setShowShareSuccess(true);
      setTimeout(() => setShowShareSuccess(false), 3000);
    }, 1500);
  };

  return (
    <ProfileView 
      isSharing={isSharing}
      showShareSuccess={showShareSuccess}
      handleShare={handleShare}
    />
  );
}
