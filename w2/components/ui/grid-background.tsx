"use client";

import { cn } from "@/lib/utils";
import React from "react";

export function GridBackgroundDemo() {
  return (
    <>
      {/* Full page fixed background */}
      <div
        aria-hidden="true"
        className={cn(
          "fixed inset-0 opacity-50 dark:opacity-60", // fixed full screen and behind everything
          "bg-white dark:bg-black",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
        )}
      />

      {/* Radial gradient fade overlay */}
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10 pointer-events-none bg-white dark:bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
      />
    </>
  );
}
