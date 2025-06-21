import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "../lib/axios";
import { useNavigate } from "react-router-dom";

const UploadImages = () => {
  console.log("this is upload images router");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async () => {
      const url = "/api/auth/upload";
      const formData = new FormData();
      formData.append("file", imageFile);
      const response = await api.post(url, formData);
      return response.data;
    },
    onSuccess: () => {
      setImageFile(null);
      setPreview(null);
      navigate("/getAll");
      alert("Image uploaded successfully!");
    },
    onError: (error) => {
      alert(error?.response?.data?.message || "Upload failed");
    },
  });
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!imageFile) {
      alert("Please select an image to upload.");
      return;
    }
    mutation.mutate();
  };
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-cyan-100 via-blue-100 to-indigo-200 px-2 sm:px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-4 sm:p-8 w-full max-w-xs sm:max-w-md flex flex-col items-center"
      >
        <h1 className="text-2xl sm:text-3xl font-extrabold text-indigo-700 mb-4 sm:mb-6 tracking-tight text-center">
          Upload Image
        </h1>
        <label
          htmlFor="file-upload"
          className="w-full flex flex-col items-center justify-center border-2 border-dashed border-indigo-300 rounded-lg p-4 sm:p-6 cursor-pointer hover:border-indigo-500 transition mb-4 bg-indigo-50"
        >
          <span className="text-indigo-500 font-semibold mb-2 text-sm sm:text-base">
            {imageFile ? "Change Image" : "Select Image"}
          </span>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-4 w-24 h-24 sm:w-32 sm:h-32 object-cover rounded shadow"
            />
          )}
        </label>
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 sm:px-6 rounded-lg shadow transition w-full mt-2 disabled:opacity-60 text-sm sm:text-base"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
};

export default UploadImages;
