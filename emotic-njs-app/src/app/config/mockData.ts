import { Data } from "./interfaces";

export const mockData: Data = {
  emotion: "Amusement",
  classificationReport: {
    metrics: [
      {
        label: "Neutral",
        precision: 0.85,
        recall: 0.88,
        f1Score: 0.86,
        support: 100,
      },
      {
        label: "Negative",
        precision: 0.75,
        recall: 0.78,
        f1Score: 0.76,
        support: 150,
      },
      {
        label: "Positive",
        precision: 0.8,
        recall: 0.75,
        f1Score: 0.77,
        support: 120,
      },
      // Gap row for better spacing
      {
        label: "",
        precision: null,
        recall: null,
        f1Score: null,
        support: null,
      },
      {
        label: "Accuracy",
        precision: null,
        recall: null,
        f1Score: 0.79,
        support: 640,
      },
      {
        label: "Macro Average",
        precision: 0.8,
        recall: 0.8,
        f1Score: 0.79,
        support: 640,
      },
      {
        label: "Weighted Average",
        precision: 0.78,
        recall: 0.79,
        f1Score: 0.78,
        support: 640,
      },
    ],
    testAccuracy: 95.785,
    testLoss: 280.44,
  },
  confusionMatrixImage: "/mock-confusion-matrix.png",
};
