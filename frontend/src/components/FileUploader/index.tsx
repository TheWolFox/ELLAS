import axios from 'axios';
import { Upload } from 'lucide-react';
import React, { useState } from 'react';

interface FileUploaderProps {
    dataType: string;
  }

  const FileUploader: React.FC<FileUploaderProps> = ({ dataType }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];
        setSelectedFile(file);
      }
    };

    const handleUpload = async () => {
        var bodyFormData = new FormData();
        bodyFormData.append('file', selectedFile);
        axios({
                method: "post",
                url: "http://localhost:3001/api/colabore/" + dataType,
                data: bodyFormData,
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (response) {
                console.log(response);
            });
    };

    return (
        <>
        <div className="w-96 p-6 border border-gray-300 rounded-lg shadow-sm bg-white text-center">
            <label className="cursor-pointer flex flex-col items-center">
                <Upload className="w-6 h-6 text-gray-500 mb-2" />
                <span className="text-gray-700 text-sm">{selectedFile ? selectedFile.name : "Upload a file"}</span>
                <input type="file" className="hidden" onChange={handleFileChange} />
            </label>
        </div>
        {selectedFile && (
            <div className="flex justify-center mt-2">
                <button className="mt-2 px-4 py-2 bg-gray-700 text-white-A700 rounded-lg hover:bg-gray-800 text-center"
                        onClick={handleUpload}>
                    SEND
                </button>
            </div>
        )}
        </>
    );
};

export default FileUploader;