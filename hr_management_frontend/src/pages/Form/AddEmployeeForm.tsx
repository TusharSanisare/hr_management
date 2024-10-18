import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import AddEmployeeDocument from './AddEmployeeDocument';

interface EmployeeForm {
  name: string;
  email: string;
  phone: string;
  jobRole: string;
  salary: string;
}

const AddEmployeeForm = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [employeeId, setEmployeeId] = useState<number | null>(null);
  const [addDocument, setAddDocument] = useState(false);
  const [formData, setFormData] = useState<EmployeeForm>({
    name: '',
    email: '',
    phone: '',
    jobRole: '',
    salary: '',
  });

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      setSuccessMessage('Employee added successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        jobRole: '',
        salary: '',
      });

      if (!response.ok) {
        throw new Error('Failed to add employee');
      }

      const result = await response.json();
      setAddDocument(true);
      setEmployeeId(result.id);
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'salary' ? Number(value) : value,
    });
  };

  return (
    <>
      <Breadcrumb pageName="Add Employee" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {!addDocument ? (
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Employee Form
                </h3>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="p-6.5">
                  {/* Success Message */}
                  {successMessage && (
                    <div className="mb-4.5 p-3 bg-green-100 text-green-700 rounded">
                      {successMessage}
                    </div>
                  )}
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Employee Name <span className="text-meta-1">*</span>
                    </label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter employee name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Employee Email <span className="text-meta-1">*</span>
                    </label>
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter employee email"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Employee Phone <span className="text-meta-1">*</span>
                    </label>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter employee phone"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Employee Job Role <span className="text-meta-1">*</span>
                    </label>
                    <input
                      name="jobRole"
                      value={formData.jobRole}
                      onChange={handleChange}
                      placeholder="Enter employee job role"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Employee Salary <span className="text-meta-1">*</span>
                    </label>
                    <input
                      name="salary"
                      value={formData.salary}
                      onChange={handleChange}
                      type="number"
                      placeholder="Enter employee salary"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                  >
                    Add Employee
                  </button>
                </div>
              </form>
            </div>
          ) : (
            ''
          )}
          {/* Document form */}
          {addDocument ? <AddEmployeeDocument employeeId={employeeId} /> : ' '}
        </div>
      </div>
    </>
  );
};

export default AddEmployeeForm;
