import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Footer, Header } from "../../components";
import FileUploader from "components/FileUploader";
import DropdownComponent from "components/Dropdown";
import DownloadButton from "components/DownloadButton";
import PrimaryDataOverview from "components/PrimaryDataOverview";
import UploadResponse from "components/UploadResponse";
import Loading from "components/Loading";

export default function ColaborePage() {
  const [selectedDataType, setSelectedDataType] = useState<string | null>(null);
  const [responseBody, setResponseBody] = useState<string | null>(null);
  const [responseCode, setResponseCode] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const options = [
    {
      label: "Policy",
      value: "policies",
    },
    {
      label: "Initiative",
      value: "initiatives",
    },
    {
      label: "Factor",
      value: "factors",
    },
  ];

  return (
    <>
      <Header />

      <div className="flex flex-col p-10 items-center bg-gray-700 text-white-A700">
        <div className="flex w-full w-[1000px]">
          <div>
            <h1 className="text-3xl font-bold mb-6">Contribute with ELLAS!</h1>

            <div className="flex-1 pr-6">
              <p className="mb-6">
                Do you want to help strengthen the ELLAS platform? By adding new
                data, you will help grow our platform and promote the visibility
                of data on women in STEM.
              </p>
              <p className="mb-6">
                The process is quick and easy - we divide everything into three
                main categories:
                <span className="font-bold">
                  {" "}
                  Initiatives, Policies and Factors
                </span>
                . If you want to know more about each of these categories, look
                the information section below.
              </p>
              <p className="mb-6">
                The process is quick and easy - we divide everything into three
                main categories:
                <span className="font-bold">
                  {" "}
                  Initiatives, Policies and Factors
                </span>
                . If you want to know more about each of these categories, look
                the information section below.
              </p>
              <p className="mb-6">
                The process is quick and easy - we divide everything into three
                main categories:
                <span className="font-bold">
                  {" "}
                  Initiatives, Policies and Factors
                </span>
                . If you want to know more about each of these categories, look
                the information section below.
              </p>
              <p className="mb-6">
                The process is quick and easy - we divide everything into three
                main categories:
                <span className="font-bold">
                  {" "}
                  Initiatives, Policies and Factors
                </span>
                . If you want to know more about each of these categories, look
                the information section below.
              </p>
            </div>
          </div>

          <div className="bg-white-A700 rounded-lg p-6 shadow-lg text-gray-700 w-[550px]">
            {isLoading && (
              <div className="w-[400px] p-6">
                <Loading />
                <UploadResponse respondeCode={100} />
              </div>
            )}
            {!isLoading && !responseCode && (
              <>
                <h1 className="text-2xl font-semibold mb-4">Upload new data</h1>
                <div className="mb-4">
                  <label className="block font-medium mb-1 text-black-900">
                    Type of Spreadsheet
                  </label>
                  <div className="flex items-center space-x-4">
                    <DropdownComponent
                      options={options}
                      onSelect={setSelectedDataType}
                    />
                    <DownloadButton dataType={selectedDataType} />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block font-medium mb-1 text-black-900 mt-32">
                    Upload spreadsheet
                  </label>
                  <FileUploader
                    dataType={selectedDataType}
                    setResponseCode={setResponseCode}
                    setResponseBody={setResponseBody}
                    setIsloading={setIsLoading}
                    setSelectedDataType={setSelectedDataType}
                  />
                </div>
              </>
            )}
            {responseCode && !isLoading && (
                <div className="flex flex-col items-center justify-center w-[380px] p-6">
                <UploadResponse
                  respondeCode={responseCode}
                  responseBody={responseBody}
                />
                <button
                  className="px-4 py-2 bg-gray-700 text-white-A700 rounded-lg text-sm hover:bg-gray-800 mt-4"
                  onClick={() => setResponseCode(null)}
                >
                  Upload another file
                </button>
                </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <PrimaryDataOverview />
      </div>
    </>
  );
}
