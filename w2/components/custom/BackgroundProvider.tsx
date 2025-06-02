"use client";

import { usePathname } from "next/navigation";
const BackgroundProvider = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <>

    </>
  )
}

export default BackgroundProvider