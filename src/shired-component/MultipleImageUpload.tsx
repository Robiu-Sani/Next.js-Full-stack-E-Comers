"use client";
import { useState, useCallback } from "react";
import axios from "axios";
import {
  UploadCloud,
  Loader2,
  CheckCircle2,
  XCircle,
  Trash2,
} from "lucide-react";
import Image from "next/image";

export default function MultipleImageUpload({
  onUpload,
}: {
  onUpload: (urls: string[]) => void;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<"success" | "error" | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [previews, setPreviews] = useState<{ file: File; preview: string }[]>(
    []
  );
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const files = Array.from(event.target.files);
    const newPreviews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    setPreviews((prev) => {
      const newPreviews = [...prev];
      URL.revokeObjectURL(newPreviews[index].preview);
      newPreviews.splice(index, 1);
      return newPreviews;
    });
  };

  const uploadImages = useCallback(async () => {
    if (previews.length === 0) return;

    setIsUploading(true);
    setUploadStatus(null);
    setErrorMessage("");

    try {
      const uploadPromises = previews.map(async (preview) => {
        const formData = new FormData();
        formData.append("file", preview.file);
        formData.append(
          "upload_preset",
          process.env.NEXT_PUBLIC_PRESET as string
        );
        formData.append(
          "cloud_name",
          process.env.NEXT_PUBLIC_CLOUD_NAME as string
        );

        const response = await axios.post(
          process.env.NEXT_PUBLIC_IMAGE_API as string,
          formData
        );

        if (response.status !== 200) {
          throw new Error("Failed to upload image");
        }

        return response.data.url;
      });

      const urls = await Promise.all(uploadPromises);
      setUploadedUrls(urls);
      onUpload(urls);
      setUploadStatus("success");
    } catch (error) {
      console.error("Error uploading images:", error);
      setUploadStatus("error");
      setErrorMessage("Failed to upload some images");
    } finally {
      setIsUploading(false);
    }
  }, [previews, onUpload]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="relative group">
          <label
            htmlFor="file-upload"
            className={`
              flex flex-col items-center justify-center w-full p-6 border-2 h-[135px] border-dashed rounded-lg cursor-pointer
              ${
                isUploading
                  ? "border-gray-300 bg-gray-50"
                  : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
              }
              transition-colors duration-200
            `}
          >
            <div className="flex flex-col items-center justify-center space-y-2 text-center">
              {isUploading ? (
                <Loader2 className="w-8 h-8 text-gray-500 animate-spin" />
              ) : (
                <UploadCloud className="w-8 h-8 text-gray-500" />
              )}
              <div className="text-sm text-gray-600">
                {isUploading ? (
                  <p>Uploading...</p>
                ) : (
                  <>
                    <p className="font-medium text-gray-900">
                      Click to upload or drag and drop
                    </p>
                    <p>PNG, JPG, WEBP, SVG (MAX. 10MB each)</p>
                  </>
                )}
              </div>
            </div>
            <input
              id="file-upload"
              type="file"
              accept=".jpg, .jpeg, .png, .webp, .svg"
              onChange={handleImageChange}
              disabled={isUploading}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              multiple
            />
          </label>
        </div>

        {previews.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Selected files ({previews.length})
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {previews.map((preview, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-square rounded-md overflow-hidden border border-gray-200">
                    <Image
                      width={100}
                      height={100}
                      src={preview.preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 p-1 bg-white rounded-full shadow-sm hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                  <div className="mt-1 text-xs text-gray-500 truncate">
                    {preview.file.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {previews.length > 0 && (
        <button
          type="button"
          onClick={uploadImages}
          disabled={isUploading}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isUploading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Uploading...
            </span>
          ) : (
            `Upload ${previews.length} image${previews.length > 1 ? "s" : ""}`
          )}
        </button>
      )}

      {uploadStatus === "success" && (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <CheckCircle2 className="w-4 h-4 text-green-500" />
          <span>
            Successfully uploaded {uploadedUrls.length} image
            {uploadedUrls.length > 1 ? "s" : ""}!
          </span>
        </div>
      )}

      {uploadStatus === "error" && (
        <div className="flex items-center gap-2 text-sm text-red-600">
          <XCircle className="w-4 h-4" />
          <span>{errorMessage || "Error uploading images"}</span>
        </div>
      )}
    </div>
  );
}
