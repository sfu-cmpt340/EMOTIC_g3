import React from "react";
import Image from "next/image";
import { ClassificationReport, Metric } from "../../config/interfaces";

interface ClassificationReportDisplayProps {
  classificationReport: ClassificationReport | null;
  confusionMatrixImage: string | null;
}

const ClassificationReportDisplay: React.FC<
  ClassificationReportDisplayProps
> = ({ classificationReport, confusionMatrixImage }) => {
  return (
    <div className="lg:flex">
      {/* Display the classification report */}
      <div className="lg:mr-10">
        {classificationReport && (
          <div className="mt-6 w-full max-w-[700px] overflow-x-auto">
            <h2 className="text-xl font-semibold mb-4 flex justify-center">
              Classification Report:
            </h2>
            <table className="table-auto w-full text-md border-collapse">
              <thead>
                <tr>
                  <th className="border-b p-2 text-left">Label</th>
                  <th className="border-b p-2 text-left">Precision</th>
                  <th className="border-b p-2 text-left">Recall</th>
                  <th className="border-b p-2 text-left">F1 Score</th>
                  <th className="border-b p-2 text-left">Support</th>
                </tr>
              </thead>
              <tbody>
                {classificationReport.metrics.map((metric: Metric, index) => (
                  <tr key={index}>
                    <td className="border-b p-2 text-left">{metric.label}</td>
                    <td className="border-b p-2 text-left">
                      {metric.precision}
                    </td>
                    <td className="border-b p-2 text-left">{metric.recall}</td>
                    <td className="border-b p-2 text-left">{metric.f1Score}</td>
                    <td className="border-b p-2 text-left">{metric.support}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="mt-4 p-2 text-lg">
          <p className="mb-2">
            Test Accuracy: {classificationReport?.testAccuracy}%
          </p>
          <p>Test Loss: {classificationReport?.testLoss}%</p>
        </div>
      </div>

      {/* Display the confusion matrix image */}
      {confusionMatrixImage && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4 flex justify-center">Confusion Matrix:</h2>
          <Image
            src={confusionMatrixImage}
            alt="Confusion Matrix"
            width={400}
            height={400}
          />
        </div>
      )}
    </div>
  );
};

export default ClassificationReportDisplay;
