"use client";

import { useState } from "react";

interface DragAndDropUploadProps {
  onFileSelect: (file: File | null) => void;
}

const DragAndDropUpload: React.FC<DragAndDropUploadProps> = ({
  onFileSelect,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null); // State for error messages

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      validateAndSelectFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndSelectFile(file);
    }
  };

  const validateAndSelectFile = (file: File) => {
    if (file.type === "text/csv" || file.name.endsWith(".csv")) {
      setError(null); // Clear any previous errors
      onFileSelect(file);
    } else {
      setError("Only CSV files are allowed. Please select a valid file.");
      onFileSelect(null); // Reset the selected file
    }
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg py-10 px-16 mx-10 flex flex-col items-center justify-center text-center transition-all ${
        isDragging
          ? "border-lightColorHero-500 dark:border-darkBorder-500 dark:border-opacity-65 bg-lightColorHero-500 bg-opacity-35 dark:bg-darkBackground-300 dark:bg-opacity-65"
          : "border-lightColorHero-500 dark:border-darkText-500"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <p className="font-normal dark:font-light text-lightText-500 dark:text-darkText-500">
        Drag and drop your files anywhere or
      </p>
      <label
        htmlFor="file-input"
        className="cursor-pointer mt-2 bg-lightColorHero-500 dark:bg-darkColorHero-500 text-lightText-100 dark:text-darkText-100 font-inter font-medium text-base px-4 py-2 rounded-md"
      >
        Upload Files
      </label>
      <input
        id="file-input"
        type="file"
        accept=".csv"
        className="hidden"
        onChange={handleFileChange}
      />
      {error && <p className="text-red-500 mt-4 text-sm font-normal dark:font-light">{error}</p>}
    </div>
  );
};

export default DragAndDropUpload;
