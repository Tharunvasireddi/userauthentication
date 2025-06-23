import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axios";
import { useState } from "react";
import useAuthStore from "../store/auth";
const GetImages = () => {
  const role = useAuthStore((state) => state.user.role);
  const id = useAuthStore((state) => state.user._id);
  const queryClient = useQueryClient();
  const [imageId, setImageId] = useState("");
  // const mutate = useMutation({
  //   mutationFn: async () => {
  //     const url = "/api/auth/getAll";
  //     const response = await api.get(url);
  //     //   console.log(response.data.data);
  //     return response.data.data;
  //   },
  //   onSuccess: (data) => {
  //     setImages(data);
  //     console.log("at on success function", data);
  //   },
  //   onError: (error) => {
  //     console.log("error at getAll images", error);
  //   },
  // });
  const {
    data: images,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["images"],
    queryFn: async () => {
      const url = "/api/auth/getAll";
      const response = await api.get(url);
      return response.data.data;
    },
    staleTime: 6 * 60 * 1000,
  });
  console.log(images);
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const url = `/api/auth/deleteImage/${id}`;
      console.log(imageId);
      const response = await api.delete(url);
      console.log(response);
      return response;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["images"] });
      console.log(data);
    },
    onError: (error) => {
      console.log("this error at delete mutation", error);
    },
  });
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      deleteMutation.mutate(id);
    }
  };
  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-emerald-200 to-indigo-100 flex flex-col items-center py-6 sm:py-10">
      <h1 className="text-2xl sm:text-4xl font-extrabold text-indigo-700 mb-6 sm:mb-8 tracking-tight">
        Image Gallery
      </h1>
      {isLoading && (
        <div className="text-base sm:text-lg text-gray-600 animate-pulse">
          Loading images...
        </div>
      )}
      {error && (
        <div className="text-red-600 font-semibold">
          Failed to load images...
        </div>
      )}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 px-2 sm:px-4 w-full max-w-6xl">
        {images?.length === 0 && (
          <div className="col-span-full text-center text-gray-500">
            No images found.
          </div>
        )}
        {images?.map((image, index) => (
          <figure
            key={image._id}
            className="bg-white/80 rounded-xl shadow-md p-3 sm:p-4 flex flex-col items-center transition hover:shadow-lg w-auto max-w-full mx-auto"
          >
            <img
              src={image.url}
              alt={`Uploaded image ${index + 1}`}
              className="w-auto max-w-full h-56 sm:h-64 aspect-video object-contain bg-white rounded-lg border mb-3 sm:mb-4"
              loading="lazy"
            />
            {(role === "admin" || role === "Admin") &&
              id === image.uploadedBy && (
                <button
                  className="w-full bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded transition font-semibold shadow-sm disabled:opacity-60 text-sm sm:text-base"
                  onClick={() => {
                    handleDelete(image._id);
                    setImageId(image._id);
                  }}
                  disabled={deleteMutation.isLoading}
                  aria-label={`Delete image ${index + 1}`}
                >
                  {deleteMutation.isLoading && imageId === image._id
                    ? "Deleting..."
                    : "Delete"}
                </button>
              )}
          </figure>
        ))}
      </section>
    </main>
  );
};

export default GetImages;
