"use client";

import { useSearchParams } from "next/navigation";
import Sidebar from "../components/landing/Sidebar";
import EmotionDisplay from "../components/app/EmotionDisplay";
import { useEffect, useState } from "react";
import { Emotion } from "../config/EmotionsConfig";
import CircularIndeterminate from "../components/app/CircularIndeterminate";
import { ClassificationReport, Data } from "../config/interfaces";
import ClassificationReportDisplay from "../components/app/ClassificationReportDisplay";
import { mockData } from "../config/mockData";

export default function AppPage() {
  const searchParams = useSearchParams();
  const filename = searchParams.get("filename"); // TODO: Retrieve filename from query
  const [emotion, setEmotion] = useState<Emotion | null>(Emotion.Amusement);
  const [loading, setLoading] = useState(false);

  // State for classification report and confusion matrix image
  const [classificationReport, setClassificationReport] =
    useState<ClassificationReport | null>(mockData.classificationReport); //TODO: Replace with retreived data
  const [confusionMatrixImage, setConfusionMatrixImage] = useState<
    string | null
  >(mockData.confusionMatrixImage); //TODO: Replace with retreived data

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
          const mockData: Data = await response.json();
          const emotion = mockData.emotion as Emotion;
          if (Object.values(Emotion).includes(emotion)) {
            setEmotion(emotion);
          } else {
            console.error("Unexpected emotion value:", emotion);
            setEmotion(null);
          }

          // Assuming the backend returns classification report and confusion matrix URL/image
          setClassificationReport(mockData.classificationReport);
          setConfusionMatrixImage(mockData.confusionMatrixImage); // URL to image or base64
        }
      } catch (error) {
        console.error("Error:", error);
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
              <p className="text-2xl">Processing EEG mockData...</p>
              <p className="text-lg">This may take a few minutes.</p>
            </>
          ) : emotion ? (
            <>
              {/* Display the predicted emotion*/}
              <EmotionDisplay emotion={emotion} />
              <ClassificationReportDisplay
                classificationReport={classificationReport}
                confusionMatrixImage={confusionMatrixImage}
              />
            </>
          ) : (
            <p>Error: Unable to process emotion mockData.</p>
          )}
        </div>
      </div>
    </div>
  );
}
