import axios from 'axios';
import { Upload } from 'lucide-react';
import React, { useState } from 'react';

interface DownloadButtonProps {
    dataType: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ dataType }) => {
    const handleDownload = async () => {
        axios({
                method: "get",
                url: "http://localhost:3001/api/colabore/" + dataType,
                responseType: 'blob'
            })
            .then(function (response) {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `${dataType}.csv`);
                document.body.appendChild(link);
                link.click();
                link.remove();
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <>
        {dataType && (
            <button className="px-4 py-2 bg-gray-700 text-white-A700 rounded-lg hover:bg-gray-800"
                    onClick={handleDownload}>
            DOWNLOAD TEMPLATE
            </button>
        )}
        </>
    );
};

export default DownloadButton;