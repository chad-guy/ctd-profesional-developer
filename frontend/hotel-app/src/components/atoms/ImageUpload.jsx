import { useState } from "react";

const ImageUpload = ({ onImagesSelected }) => {
  const [previewUrls, setPreviewUrls] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
    onImagesSelected(files);
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Imágenes del Hotel
      </label>

      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-blue-500 transition-colors duration-300">
        <div className="space-y-1 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex text-sm text-gray-600">
            <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
              <span>Subir archivos</span>
              <input
                type="file"
                multiple
                accept="image/*"
                className="sr-only"
                onChange={handleFileChange}
              />
            </label>
            <p className="pl-1">o arrastrar y soltar</p>
          </div>
          <p className="text-xs text-gray-500">PNG, JPG, GIF hasta 10MB</p>
        </div>
      </div>

      {previewUrls.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mt-4">
          {previewUrls.map((url, index) => (
            <div key={index} className="relative">
              <img
                src={url}
                alt={`Preview ${index + 1}`}
                className="h-24 w-full object-cover rounded-md"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
