"use client";

import React, { ReactNode, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

interface AosWrapperProps {
  children: ReactNode;
}

export default function AosWrapper({ children }: AosWrapperProps) {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  return <>{children}</>;
}
