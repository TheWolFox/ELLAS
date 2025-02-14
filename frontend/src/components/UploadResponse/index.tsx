import axios from "axios";
import { Upload } from "lucide-react";
import React, { useState } from "react";

interface UploadResponseProps {
  respondeCode: number;
  responseBody?: string;
}

const UploadResponse: React.FC<UploadResponseProps> = ({
  respondeCode,
  responseBody,
}) => {
  return (
    <>
      {respondeCode == 200 && (
        <div className="bg-green-100 rounded-lg mt-6 p-6 shadow-lg text-green-700">
          {responseBody}
        </div>
      )}

      {respondeCode >= 400 && (
        <div className="bg-red-100 rounded-lg p-6 mt-6 shadow-lg text-red-700">
          {responseBody}
        </div>
      )}

      {respondeCode == 100 && (
        <div className="bg-yellow-100 rounded-lg p-6 mt-6 shadow-lg text-yellow-700">
            <p>Wait until the processment is done. </p>
            <p>This may take up to 2 minutes...</p>
          
        </div>
      )}
    </>
  );
};

export default UploadResponse;
