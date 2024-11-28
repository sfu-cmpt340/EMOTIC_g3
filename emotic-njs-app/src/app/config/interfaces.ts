// Interface for each metric in the classification report
export interface Metric {
  label: string; // Label of the class (e.g., 'Neutral', 'Negative', 'Positive')
  precision: number | null; // Precision value, can be null for certain rows like "Accuracy"
  recall: number | null; // Recall value, can be null for certain rows like "Accuracy"
  f1Score: number | null; // F1 Score, can be null for certain rows like "Accuracy"
  support: number | null; // Support value (number of samples), can be null for certain rows
}

// Interface for the classification report
export interface ClassificationReport {
  metrics: Metric[]; // Array of Metric objects
  testAccuracy: number; // Overall test accuracy
  testLoss: number; // Loss value for the test
}

// Main structure for test data
export interface Data {
  emotion: string; // Predicted emotion (e.g., 'Amusement')
  classificationReport: ClassificationReport; // Classification report with metrics and accuracy
  confusionMatrixImage: string; // URL or base64 string for the confusion matrix image
}
