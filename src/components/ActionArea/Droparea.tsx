"use client";
import React, { useState } from "react";

const Droparea: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      handleFileUpload(selectedFile);
    }
  };

  const handleProcessing = async () => {
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("File uploaded successfully");
        // Handle success
      } else {
        console.error("Failed to upload file");
        // Handle failure
      }
    } catch (error) {
      console.error("An error occurred while uploading the file", error);
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    const selectedFile = event.dataTransfer.files[0];
    handleFileUpload(selectedFile);
  };

  const handleFileUpload = (selectedFile: File) => {
    setFile(selectedFile);
    setLoading(true);

    // Simulate a file upload and generate a preview
    setTimeout(() => {
      setLoading(false);
      if (selectedFile.type.startsWith("image/")) {
        setFilePreview(URL.createObjectURL(selectedFile));
      } else if (selectedFile.type === "application/pdf") {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
          if (e.target && typeof e.target.result === "string") {
            setFilePreview(e.target.result);
          }
        };
        fileReader.readAsDataURL(selectedFile);
      }
      // Handle other file types if needed
    }, 2000); // Simulate a 2-second upload time
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFilePreview(null);
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  };

  return (
    <div className="flex flex-col justify-start items-center w-full h-fit">
      <label
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          {loading ? (
            <div className="flex flex-col items-center space-x-2">
              <span className="loading loading-spinner loading-md"></span>
              <p className="text-sm text-gray-500">Uploading...</p>
            </div>
          ) : filePreview ? (
            <div className="flex flex-col items-center">
              {file?.type.startsWith("image/") ? (
                <img
                  src={filePreview}
                  alt="File Preview"
                  className="w-32 h-32 object-cover mb-4"
                />
              ) : file?.type === "application/pdf" ? (
                <iframe
                  src={filePreview}
                  className="w-full h-32 mb-4 border"
                  title="PDF Preview"
                />
              ) : (
                <p className="text-sm text-gray-500">Unsupported file type</p>
              )}
              <div className="flex items-center justify-between w-full px-4 bg-[#0b7dffd4] py-1 rounded-xl">
                <p className="text-sm text-white">{file?.name}</p>
                <button
                  className="text-white ml-4 hover:scale-[1.03]"
                  onClick={handleRemoveFile}
                >
                  ✖
                </button>
              </div>
            </div>
          ) : (
            <>
              <svg
                className="w-8 h-8 mb-4 text-[#0f55d6b8]"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold text-[#0f55d6b8]">
                  Click to upload
                </span>{" "}
                or drag and drop
              </p>
              <p className="text-xs text-gray-500">PDF, DOCX, PNG, or JPG</p>
            </>
          )}
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
      {file && (
        <button
          className="btn px-7 rounded-full outline-[#0b7dffd4] text-grey-800 hover:bg-[#6dc1fc] mt-8"
          onClick={handleProcessing}
        >
          Process 🪄
        </button>
      )}
    </div>
  );
};

export default Droparea;
