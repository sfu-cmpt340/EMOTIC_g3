/**
 * Result passed from backend
 */
export interface EmotionResult {
  emotion: string; // Predicted emotion (e.g., 'Amusement')
}

/**
 * Daniel's model's results
 **/

// Interface for each metric in the classification report
export interface DanielMetric {
  label: string; // Label of the class (e.g., 'Anger', 'Joy', 'Sadness')
  precision: number | null; // Precision value, can be null for certain rows like "Accuracy"
  recall: number | null; // Recall value, can be null for certain rows like "Accuracy"
  f1Score: number | null; // F1 Score, can be null for certain rows like "Accuracy"
  support: number | null; // Support value (number of samples), can be null for certain rows
}

// Interface for the classification report
export interface DanielClassificationReport {
  metrics: DanielMetric[]; // Array of Metric objects
  accuracy: number; // Overall test accuracy
  loss: undefined;
}

// Main structure for test data
export interface DanielData {
  classificationReport: DanielClassificationReport; // Classification report with metrics and accuracy
  confusionMatrixImage: string; // URL or base64 string for the confusion matrix image
}

/**
 * Maisha's model's results
 **/
export interface MaishaMetric {
  label: string; // Label of the class (e.g., 'Neutral', 'Negative', 'Positive')
  precision: number | null; // Precision value, can be null for certain rows like "Accuracy"
  recall: number | null; // Recall value, can be null for certain rows like "Accuracy"
  f1Score: number | null; // F1 Score, can be null for certain rows like "Accuracy"
  support: number | null; // Support value (number of samples), can be null for certain rows
}

// Interface for the classification report
export interface MaishaClassificationReport {
  metrics: MaishaMetric[]; // Array of Metric objects
  accuracy: number; // Overall test accuracy
  loss: number; // Loss value for the test
}

// Main structure for test data
export interface MaishaData {
  classificationReport: MaishaClassificationReport; // Classification report with metrics and accuracy
  confusionMatrixImage: string; // URL or base64 string for the confusion matrix image
}
