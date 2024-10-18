import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const ViewAllEmployeesTable = () => {
  const [employees, setEmployees] = useState([]);

  // Fetch employee data from the API when the component mounts
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/employees');
        const data = await response.json();
        setEmployees(data); // Set the received data into the state
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployees();
  }, []);

  // Delete employee function with confirmation
  const deleteEmployee = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this employee?',
    );

    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/employees/${id}`,
          {
            method: 'DELETE',
          },
        );

        if (response.ok) {
          // Filter out the deleted employee from the state
          setEmployees(employees.filter((employee) => employee.id !== id));
        } else {
          console.error('Error deleting employee:', response.statusText);
        }
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        All Employee's List
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">
          <div className="p-2.5 text-left sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Employee Name
            </h5>
          </div>
          <div className="p-2.5 text-left sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Id</h5>
          </div>
          <div className="p-2.5 text-left sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Email
            </h5>
          </div>
          <div className="p-2.5 text-left sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Phone
            </h5>
          </div>
          <div className="p-2.5 text-left sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Job Role
            </h5>
          </div>
          <div className="p-2.5 text-left sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Actions
            </h5>
          </div>
        </div>

        {employees.map((employee, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-6 ${
              key === employees.length - 1
                ? ''
                : 'border-ba border-stroke dark:border-strokedark'
            }`}
            key={employee.id}
          >
            <NavLink to={`/employee/${employee.id}`}>
              <div className="flex justify-left items-center p-2.5 xl:p-5">
                <img
                  className="object-contain h-15 w-15 rounded-full mr-2"
                  src={
                    employee.logo
                      ? employee.logo
                      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcU50X1UOeDaphmUyD6T8ROKs-HjeirpOoapiWbC9cLAqewFy1gthrgUTB9E7nKjRwOVk&usqp=CAU'
                  }
                  alt="Brand"
                />
                <p className="text-black dark:text-white">{employee.name}</p>
              </div>
            </NavLink>
            <div className="flex justify-left items-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{employee.id}</p>
            </div>
            <div className="flex justify-left items-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{employee.email}</p>
            </div>
            <div className="flex justify-left items-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{employee.phone}</p>
            </div>
            <div className="flex justify-left items-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{employee.jobRole}</p>
            </div>
            <div className="flex justify-left items-center p-2.5 xl:p-5">
              <button
                type="button"
                className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
              >
                <i className="fa-solid fa-user-pen"></i>
              </button>
              <button
                type="button"
                onClick={() => deleteEmployee(employee.id)}
                className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewAllEmployeesTable;
