"use client";

import Sidebar from "../components/landing/Sidebar";
import EmotionDisplay from "../components/app/EmotionDisplay";
import { Emotion } from "../config/EmotionsConfig";

export default function AppPage() {
  return (
    <div className="flex">
      <div className="">
        <Sidebar />
      </div>
      <div className="flex-1 min-h-screen flex justify-center bg-lightBackground-500 dark:bg-darkBackground-500">
        <div className="">
          <EmotionDisplay emotion={Emotion.Amusement} /> {/* TODO: Need to replace with emotion result passed from backend */}
        </div>
        <div></div>
      </div>
    </div>
  );
}
