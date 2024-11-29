"use client";

import { useSearchParams } from "next/navigation";
import Sidebar from "../components/landing/Sidebar";
import EmotionDisplay from "../components/app/EmotionDisplay";
import { useEffect, useState } from "react";
import { Emotion } from "../config/EmotionsConfig";
import CircularIndeterminate from "../components/app/CircularIndeterminate";
import { ClassificationReport, Data } from "../config/interfaces";
import ClassificationReportDisplay from "../components/app/ClassificationReportDisplay";

export default function AppPage() {
  const searchParams = useSearchParams();
  const filename = searchParams.get("filename");
  const [emotion, setEmotion] = useState<Emotion | null>(null);
  const [loading, setLoading] = useState(true);

  // State for classification report and confusion matrix image
  const [classificationReport, setClassificationReport] =
    useState<ClassificationReport | null>(null);
  const [confusionMatrixImage, setConfusionMatrixImage] = useState<
    string | null
  >(null);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true); // Start loading when the request is triggered
      try {
        const response = await fetch("http://localhost:5000/process", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ filename }),
        });

        if (response.ok) {
          const data: Data = await response.json();

          // Check for valid emotion
          const emotion = data.emotion as Emotion;
          if (Object.values(Emotion).includes(emotion)) {
            setEmotion(emotion);
          } else {
            console.error("Unexpected emotion value:", emotion);
            setEmotion(null);
          }

          // Set classification report and confusion matrix image
          setClassificationReport(data.classificationReport);
          setConfusionMatrixImage(data.confusionMatrixImage);
        } else {
          console.error("Backend error:", await response.text());
          setEmotion(null);
          setClassificationReport(null);
          setConfusionMatrixImage(null);
        }
      } catch (error) {
        console.error("Network or processing error:", error);
        setEmotion(null);
        setClassificationReport(null);
        setConfusionMatrixImage(null);
      } finally {
        setLoading(false); // End loading when the request is complete
      }
    };

    if (filename) fetchResults();
  }, [filename]);

  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>
      <div
        className={`flex-1 min-h-screen ${
          !loading && emotion ? "pt-[15%] sm:pt-[5%]" : "pt-[20%] sm:pt-[10%]"
        } px-[5%] sm:px-[10%] pb-20 flex justify-center bg-lightBackground-500 dark:bg-darkBackground-500`}
      >
        <div className="flex flex-col items-center">
          {loading ? (
            <>
              <div className="mb-12">
                <CircularIndeterminate />
              </div>
              <p className="text-2xl font-montserrat">Processing EEG data...</p>
              <p className="text-lg font-montserrat">This may take a few minutes.</p>
            </>
          ) : emotion ? (
            <>
              {/* Display the predicted emotion */}
              <EmotionDisplay emotion={emotion} />
              <ClassificationReportDisplay
                classificationReport={classificationReport}
                confusionMatrixImage={confusionMatrixImage}
              />
            </>
          ) : (
            <p>Error: Unable to process EEG data.</p>
          )}
        </div>
      </div>
    </div>
  );
}
