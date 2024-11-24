"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Image from "next/image";
import { useLogo } from "./hooks/useLogo";
import DragAndDropUpload from "./components/DragAndDropUpload";

export default function LandingPage() {
  const logo = useLogo();
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (selectedFile: File | null) => {
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file to upload.");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/upload", {
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
    <div className="flex">
      <div className="">
        <Sidebar />
      </div>
      <div className="flex-1 min-h-screen pt-[5%] px-[5%] sm:px-[10%] flex justify-center bg-lightBackground-500 dark:bg-darkBackground-500">
        <div className="justify-center pb-20 font-montserrat font-extralight text-lightText-500 dark:text-darkText-500">
          <div className="flex items-center justify-center">
            <p className="text-[45px] sm:text-[65px] md:text-[80px] lg:text-[100px]">
              EMOTIC
            </p>
            <a href="/" target="_blank">
              <Image
                src={logo}
                className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 ml-4 hover:scale-110 transition-transform duration-200"
                alt="EMOTIC logo"
                width={80}
                height={80}
              />
            </a>
          </div>
          <div className="text-[18px] sm:text-[24px] md:text-[30px] lg:text-[36px] -mt-4 text-center">
            EEG Monitoring of Thoughts and Individual Conditions
          </div>

          {/* Drag-and-Drop File Upload */}
          <div className="flex items-center justify-center w-full mt-12 bg-lightBackground-500 dark:bg-darkBackground-500">
            <div className="flex flex-col items-center">
              <DragAndDropUpload onFileSelect={handleFileSelect} />
              <button
                onClick={handleUpload}
                disabled={!file}
                className="mt-4 mx-10 px-6 py-3 bg-lightColorHero-500 dark:bg-darkColorHero-500 text-lightText-100 dark:text-darkText-100 font-inter font-medium text-lg rounded-md disabled:opacity-45 disabled:cursor-not-allowed"
              >
                {file ? `Upload: ${file.name}` : "Upload EEG Data"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
