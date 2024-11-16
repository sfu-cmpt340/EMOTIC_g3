"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// Define the types for the event handlers
export default function LandingPage() {
  const [logo, setLogo] = useState<string>("/logoDarkMode.svg");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const updateLogo = () => {
      const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setLogo(darkMode ? "/logoDarkMode.svg" : "/logoLightMode.svg");
    };

    updateLogo();

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", updateLogo);

    return () => {
      window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", updateLogo);
    };
  }, []);

  // Type for the file change event
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  // Type for the upload function
  const handleUpload = async () => {
    if (!file) return alert("Please select a file to upload.");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("File uploaded successfully!");
      } else {
        alert("Error uploading file.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-lightBackground-500 dark:bg-darkBackground-500">
      <div className="justify-center mt-[15%] font-montserrat font-extralight text-lightText-500 dark:text-darkText-500">
        <div className="flex items-center justify-center">
          <p className="text-[100px]">EMOTIC</p>
          <a href="" target="_blank">
            <Image src={logo} className="h-20 w-20 ml-4" alt="EMOTIC logo" width={80} height={80} />
          </a>
        </div>
        <div className="text-[30px] -mt-4">
          EEG Monitoring of Thoughts and Individual Conditions
        </div>

        {/* File upload button */}
        <div className="mt-8 flex flex-col items-center">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="mb-4 p-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleUpload}
            className="px-6 py-3 bg-lightColorHero-500 dark:bg-darkColorHero-500 text-lightText-100 dark:text-darkText-100 font-inter font-medium text-lg rounded-full"
          >
            Upload EEG Data
          </button>
        </div>
      </div>
    </div>
  );
}
