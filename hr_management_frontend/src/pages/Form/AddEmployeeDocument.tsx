import React, { useState } from 'react';
import axios from 'axios';

interface AddEmployeeDocumentProps {
  employeeId: number;
}

const AddEmployeeDocument: React.FC<AddEmployeeDocumentProps> = ({
  employeeId,
}) => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [documentName, setDocumentName] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file || !documentName) {
      alert('Please provide both a document name and a file.');
      return;
    }

    const formData = new FormData();
    formData.append('documentName', documentName);
    formData.append('file', file);
    formData.append('employeeId', employeeId.toString());

    try {
      const response = await axios.post(
        'http://localhost:8080/api/documents/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      // Clear the form fields after successful submission
      setDocumentName('');
      setFile(null);
      setSuccessMessage('Document added successfully!');
    } catch (error) {
      console.error('Error uploading document:', error);
      alert('Failed to upload document.');
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
        {/* Success Message */}
        {successMessage && (
          <div className="mb-4.5 p-3 bg-green-100 text-green-700 rounded">
            {successMessage}
          </div>
        )}
        <h3 className="font-medium text-black dark:text-white">
          Add Employee Documents
        </h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="p-6.5">
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Employee Document Name <span className="text-meta-1">*</span>
            </label>
            <input
              name="documentName"
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
              placeholder="Enter document name"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              required
            />
          </div>

          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Employee Document <span className="text-meta-1">*</span>
            </label>
            <input
              type="file"
              name="file"
              onChange={(e) =>
                setFile(e.target.files ? e.target.files[0] : null)
              }
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              required
            />
          </div>

          <button
            type="submit"
            className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
          >
            Add Document
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployeeDocument;
