"use client";

import Sidebar from "../components/Sidebar";

export default function AppPage() {
  return (
    <div className="flex">
      <div className="">
        <Sidebar />
      </div>
      <div className="flex-1 min-h-screen flex justify-center bg-lightBackground-500 dark:bg-darkBackground-500">
      </div>
    </div>
  );
}
