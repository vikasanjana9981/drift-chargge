"use client";

import { useEffect } from "react";
import { useNavigation } from "@remix-run/react";
import NProgress from "nprogress";
import "nprogress/nprogress.css"; // Import default styles

export default function ProgressBar() {
  const navigation = useNavigation();

  useEffect(() => {
    if (navigation.state === "loading") {
      NProgress.start(); // Start loading animation
    } else {
      NProgress.done(); // Stop loading animation
    }
  }, [navigation.state]);

  return null; // No visible UI, just handles the progress bar
}
