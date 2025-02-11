import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Footer, Header } from "../../components";
import FileUploader from "components/FileUploader";
import DropdownComponent from "components/Dropdown";
import DownloadButton from "components/DownloadButton";

export default function ColaborePage() {
  const [selectedDataType, setSelectedDataType] = useState<string | null>(null);

  const options = [
    {
      label: "Policy",
      value: "policies"
    },
    {
      label: "Initiative",
      value: "initiatives"
    },
    {
      label: "Factor",
      value: "factors"
    }
  ]

  return (
    <>
        <Header />

        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        
          <Helmet>
              <title>ELLAS</title>
              <meta name="description" content="Web site created using create-react-app" />
          </Helmet>

          <div className="flex items-center space-x-4">
            <DropdownComponent options={options} onSelect={setSelectedDataType} />
            <DownloadButton dataType={selectedDataType} />
          </div>

          <div className="mt-32">
            <FileUploader dataType={selectedDataType} />
          </div>
        </div>

        <Footer />
    </>
  );
}
