import React from "react";
import Image from "next/image";
import {
  DanielClassificationReport,
  MaishaClassificationReport,
  DanielMetric,
  MaishaMetric,
} from "../../config/interfaces";

interface ClassificationReportDisplayProps {
  modelType: string;
  classificationReport:
    | DanielClassificationReport
    | MaishaClassificationReport
    | null;
  confusionMatrixImage: string | null;
}

const ClassificationReportDisplay: React.FC<
  ClassificationReportDisplayProps
> = ({ modelType, classificationReport, confusionMatrixImage }) => {
  return (
    <div className="flex flex-col items-center">
      {/* Display the classification report */}
      <div className="lg:mr-10">
        {classificationReport && (
          <div className="mt-6 w-full max-w-[700px] overflow-x-auto">
            <h2 className="text-xl font-semibold mb-4 text-center">
              {modelType} Model Classification Report:
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
                {classificationReport.metrics.map(
                  (metric: DanielMetric | MaishaMetric, index) => (
                    <tr key={index}>
                      <td className="border-b p-2 text-left">{metric.label}</td>
                      <td className="border-b p-2 text-left">
                        {metric.precision}
                      </td>
                      <td className="border-b p-2 text-left">
                        {metric.recall}
                      </td>
                      <td className="border-b p-2 text-left">
                        {metric.f1Score}
                      </td>
                      <td className="border-b p-2 text-left">
                        {metric.support}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
        <div className="mt-4 p-2 text-lg">
          <p className="mb-2">
            Test Accuracy: {classificationReport?.accuracy}%
          </p>
          {classificationReport?.loss !== undefined && (
            <p>Test Loss: {classificationReport.loss}%</p>
          )}
        </div>
      </div>

      {/* Display the confusion matrix image */}
      {confusionMatrixImage && (
        <div className="mt-6 justify-center">
          <h2 className="text-xl font-semibold mb-4 text-center">
            {modelType} Model Confusion Matrix:
          </h2>
          <Image
            src={confusionMatrixImage}
            alt="Confusion Matrix"
            width={1200}
            height={900}
          />
        </div>
      )}
    </div>
  );
};

export default ClassificationReportDisplay;
