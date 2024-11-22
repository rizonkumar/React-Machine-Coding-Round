import axios from "axios";
import { ChangeEvent, useState } from "react";

type UploadStatus = "idle" | "uploading" | "success" | "error";

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (!file) return null;
    setStatus("uploading");
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("https://httpbin.org/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const progress = progressEvent?.total
            ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
            : 0;
          setUploadProgress(progress);
        },
      });
      setStatus("success");
      setUploadProgress(100);
    } catch (error) {
      setStatus("error");
      setUploadProgress(0);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-sm">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">File Upload</h1>

      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center
          ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <p className="text-gray-600">
          Drag and drop your file here, or click to select
        </p>
      </div>

      {file && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-900">
              File Name: {file.name}
            </p>
            <p className="text-sm text-gray-500">
              Size: {(file.size / 1024).toFixed(2)} KB
            </p>
            <p className="text-sm text-gray-500">
              Type: {file.type || "Unknown"}
            </p>
          </div>
        </div>
      )}

      {status === "uploading" && (
        <div className="mt-4 space-y-2">
          <div className="h-2 w-full rounded-full bg-gray-200">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <p className="text-sm text-center text-gray-600">
            {uploadProgress}% Uploaded
          </p>
        </div>
      )}

      {file && status !== "uploading" && (
        <button
          onClick={handleFileUpload}
          className="mt-4 w-full py-2.5 px-4 bg-blue-600 text-white rounded-lg
            hover:bg-blue-700 transition-colors duration-200 font-medium"
        >
          Upload
        </button>
      )}

      {status === "success" && (
        <p className="mt-4 text-sm text-green-600 text-center">
          File uploaded successfully!
        </p>
      )}

      {status === "error" && (
        <p className="mt-4 text-sm text-red-600 text-center">
          Upload failed... Please try again
        </p>
      )}
    </div>
  );
};

export default FileUpload;
