import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Document {
  id: number;
  documentName: string;
  documentType: string;
  filePath: string;
}

interface FetchDocumentsProps {
  employeeId: number;
}

const FetchDocuments: React.FC<FetchDocumentsProps> = ({ employeeId }) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/documents/${employeeId}`,
        );
        setDocuments(response.data);
      } catch (err) {
        setError('Failed to fetch documents.');
        console.error(err);
      }
    };

    fetchDocuments();
  }, [employeeId]);

  return (
    <>
      {documents.length > 0 ? (
        documents.map((document) => (
          <div className="mx-auto mt-4.5 mb-5.5 grid  grid-cols-1 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
            <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
              <div className=""></div>
              <span className="font-semibold text-black dark:text-white">
                <a
                  className="flex flex-col items-center justify-center"
                  href={`http://localhost:8080/${document.filePath}`}
                  target="_blank"
                >
                  <svg
                    className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    height="100"
                    width="100"
                    viewBox="0 0 576 512"
                  >
                    <path d="M88.7 223.8L0 375.8 0 96C0 60.7 28.7 32 64 32l117.5 0c17 0 33.3 6.7 45.3 18.7l26.5 26.5c12 12 28.3 18.7 45.3 18.7L416 96c35.3 0 64 28.7 64 64l0 32-336 0c-22.8 0-43.8 12.1-55.3 31.8zm27.6 16.1C122.1 230 132.6 224 144 224l400 0c11.5 0 22 6.1 27.7 16.1s5.7 22.2-.1 32.1l-112 192C453.9 474 443.4 480 432 480L32 480c-11.5 0-22-6.1-27.7-16.1s-5.7-22.2 .1-32.1l112-192z" />
                  </svg>
                  {document.documentName} ({document.documentType})
                </a>
              </span>
            </div>
          </div>
        ))
      ) : (
        <p>No documents found for this employee.</p>
      )}
    </>
  );
};

export default FetchDocuments;
