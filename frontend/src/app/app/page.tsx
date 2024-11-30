"use client";

import { useSearchParams } from "next/navigation";
import Sidebar from "../components/landing/Sidebar";
import EmotionDisplay from "../components/app/EmotionDisplay";
import { useEffect, useState } from "react";
import { Emotion } from "../config/EmotionsConfig";
import CircularIndeterminate from "../components/app/CircularIndeterminate";
import { danielData, maishaData } from "../config/reportData";
import ClassificationReportDisplay from "../components/app/ClassificationReportDisplay";

export default function AppPage() {
  const searchParams = useSearchParams();
  const filename = searchParams.get("filename");
  const [emotion, setEmotion] = useState<Emotion | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmotion = async () => {
      setLoading(true); // Start loading
      try {
        const response = await fetch("http://localhost:5000/process", {
          mode: 'no-cors',
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ filename }),
        });
  
        if (response.ok) {
          const data = await response.json();
          let emotion = data.emotion;
  
          // Handle case where emotion is an array
          if (Array.isArray(emotion)) {
            emotion = emotion[0]; // Extract the first emotion
          }
  
          // Ensure the emotion matches the Emotion enum
          if (Object.values(Emotion).includes(emotion as Emotion)) {
            setEmotion(emotion as Emotion);
          } else {
            console.error("Unexpected emotion value:", emotion);
            setEmotion(null);
          }
        } else {
          console.error("Backend error:", await response.text());
          setEmotion(null);
        }
      } catch (error) {
        console.error("Network or processing error:", error);
        setEmotion(null);
      } finally {
        setLoading(false); // End loading
      }
    };
  
    if (filename) fetchEmotion();
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
              <p className="text-lg font-montserrat">
                This may take a moment.
              </p>
            </>
          ) : emotion ? (
            <>
              {/* Display the predicted emotion */}
              <EmotionDisplay emotion={emotion} />
            </>
          ) : (
            <p>Error: Unable to process EEG data.</p>
          )}
          <p className="text-lg w-full max-w-[700px] mx-auto mt-20 font-nunitoSans">
            Below are the results of training the model. We trained two models:
            the first one, shown below, was trained using a Support Vector
            Machine (SVM) learning model. The predicted emotion shown above was
            derived from this model. The second model was trained using a Gated
            Recurrent Unit (GRU) neural network. We also initially trained a
            model using K-Nearest Neighbours (KNN), but it is not shown below as
            it did not fit our use case.
          </p>
          <div className="mt-8">
            {/* Display the hardcoded reports */}
            <ClassificationReportDisplay
              modelType="SVM"
              classificationReport={danielData.classificationReport}
              confusionMatrixImage={danielData.confusionMatrixImage}
            />
            <div className="mt-8"></div>
            <ClassificationReportDisplay
              modelType="GRU"
              classificationReport={maishaData.classificationReport}
              confusionMatrixImage={maishaData.confusionMatrixImage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
