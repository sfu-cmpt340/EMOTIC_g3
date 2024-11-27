"use client";

import { useSearchParams } from "next/navigation";
import Sidebar from "../components/landing/Sidebar";
import EmotionDisplay from "../components/app/EmotionDisplay";
import { useEffect, useState } from "react";
import { Emotion } from "../config/EmotionsConfig";
import CircularIndeterminate from "../components/app/CircularIndeterminate";

export default function AppPage() {
  const searchParams = useSearchParams();
  const filename = searchParams.get("filename"); // TODO: Retrieve filename from query
  const [emotion, setEmotion] = useState<Emotion | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch("http://localhost:5000/process", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ filename }),
        });

        if (response.ok) {
          const data = await response.json();
          const emotion = data.emotion as Emotion;
          if (Object.values(Emotion).includes(emotion)) {
            setEmotion(emotion as Emotion);
          } else {
            console.error("Unexpected emotion value:", emotion);
            setEmotion(null);
          }
        }
      } catch (error) {
        console.error("Error:", error);
        setEmotion(null);
      } finally {
        setLoading(false); // Ensure loading is set to false regardless of success or failure
      }
    };

    if (filename) fetchResults();
  }, [filename]);

  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>
      <div className="flex-1 min-h-screen pt-[20%] sm:pt-[10%] px-[5%] sm:px-[10%] flex justify-center bg-lightBackground-500 dark:bg-darkBackground-500">
        <div className="flex flex-col items-center">
          {loading ? (
            <>
              <div className="mb-12">
                <CircularIndeterminate />
              </div>
              <p className="text-2xl">Processing EEG data...</p>
              <p className="text-lg">This may take a few minutes.</p>
            </>
          ) : emotion ? (
            <EmotionDisplay emotion={emotion} />
          ) : (
            <p className="text-xl text-red-500">Failed to process data.</p>
          )}
        </div>
      </div>
    </div>
  );
}
