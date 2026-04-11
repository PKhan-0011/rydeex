"use client";

import React, { useState, useEffect } from "react";
import HeroSection from "./HeroSection";
import VehicleSlidar from "./VehicleSlidar";
import AuthModal from "./AuthModal";

const PublicHome = () => {
  const [authOpen, setAuthOpen] = useState<boolean>(true);

  return (
    <div>
      <HeroSection />
      <VehicleSlidar />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
};

export default PublicHome;
