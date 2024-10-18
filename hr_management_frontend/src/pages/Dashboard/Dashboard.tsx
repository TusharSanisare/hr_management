import React, { useState, useEffect } from 'react';
import axios from 'axios';



import CardDataStats from '../../components/CardDataStats';
import ChartOne from '../../components/Charts/ChartOne';
import ChartThree from '../../components/Charts/ChartThree';
import ChartTwo from '../../components/Charts/ChartTwo';
import ChatCard from '../../components/Chat/ChatCard';
import MapOne from '../../components/Maps/MapOne';
import TableOne from '../../components/Tables/TableOne';

const Dashboard: React.FC = () => {

  // State variables for employee counts
  const [employeeCount, setEmployeeCount] = useState<number | null>(null);
  const [presentEmployeeCount, setPresentEmployeeCount] = useState<number | null>(null);
  const [absentEmployeeCount, setAbsentEmployeeCount] = useState<number | null>(null);
  const [leaveEmployeeCount, setLeaveEmployeeCount] = useState<number | null>(null);

  // Function to fetch total employee count
  const fetchEmployeeCount = async () => {
    const response = await axios.get<number>('http://localhost:8080/api/employees/count');  
    setEmployeeCount(response.data);
  };

  // Function to fetch present employee count
  const fetchPresentEmployeeCount = async () => {
    const response = await axios.get<number>('http://localhost:8080/api/employees/present');  
    setPresentEmployeeCount(response.data);
  };

  // Function to fetch absent employee count
  const fetchAbsentEmployeeCount = async () => {
    const response = await axios.get<number>('http://localhost:8080/api/employees/absent');  
    setAbsentEmployeeCount(response.data);
  };

  // Function to fetch leave employee count
  const fetchLeaveEmployeeCount = async () => {
    const response = await axios.get<number>('http://localhost:8080/api/employees/leave');  // Fix endpoint to fetch leave count
    setLeaveEmployeeCount(response.data);
  };

  // useEffect hooks to call fetch functions
  useEffect(() => {
    fetchEmployeeCount();
    fetchPresentEmployeeCount();
    fetchAbsentEmployeeCount();
    fetchLeaveEmployeeCount();
  }, []);

  // Calculate percentages
  const presentPercentage = employeeCount ? ((presentEmployeeCount! / employeeCount) * 100).toFixed(2) : '0.00';
  const absentPercentage = employeeCount ? ((absentEmployeeCount! / employeeCount) * 100).toFixed(2) : '0.00';
  const leavePercentage = employeeCount ? ((leaveEmployeeCount! / employeeCount) * 100).toFixed(2) : '0.00';
  



  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Total Employee's" total={employeeCount ? employeeCount.toString() : '0' }  rate="100%" >
          <svg
            className="fill-primary dark:fill-white"
            height="30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 640 512">
          <path d="M72 88a56 56 0 1 1 112 0A56 56 0 1 1 72 88zM64 245.7C54 256.9 48 271.8 48 288s6 31.1 16 42.3l0-84.7zm144.4-49.3C178.7 222.7 160 261.2 160 304c0 34.3 12 65.8 32 90.5l0 21.5c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-26.8C26.2 371.2 0 332.7 0 288c0-61.9 50.1-112 112-112l32 0c24 0 46.2 7.5 64.4 20.3zM448 416l0-21.5c20-24.7 32-56.2 32-90.5c0-42.8-18.7-81.3-48.4-107.7C449.8 183.5 472 176 496 176l32 0c61.9 0 112 50.1 112 112c0 44.7-26.2 83.2-64 101.2l0 26.8c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32zm8-328a56 56 0 1 1 112 0A56 56 0 1 1 456 88zM576 245.7l0 84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM320 32a64 64 0 1 1 0 128 64 64 0 1 1 0-128zM240 304c0 16.2 6 31 16 42.3l0-84.7c-10 11.3-16 26.1-16 42.3zm144-42.3l0 84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM448 304c0 44.7-26.2 83.2-64 101.2l0 42.8c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-42.8c-37.8-18-64-56.5-64-101.2c0-61.9 50.1-112 112-112l32 0c61.9 0 112 50.1 112 112z"/>
          </svg>   
        </CardDataStats>
        <CardDataStats title="Present Employee's" total={presentEmployeeCount ? presentEmployeeCount.toString() : '0' } rate={presentPercentage.toString()+"%"} levelUp={presentPercentage >= absentPercentage} levelDown={presentPercentage < absentPercentage}>
          <svg 
            className="fill-primary dark:fill-white"
            height="30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 512 512">
            <path d="M184 48l144 0c4.4 0 8 3.6 8 8l0 40L176 96l0-40c0-4.4 3.6-8 8-8zm-56 8l0 40L64 96C28.7 96 0 124.7 0 160l0 96 192 0 128 0 192 0 0-96c0-35.3-28.7-64-64-64l-64 0 0-40c0-30.9-25.1-56-56-56L184 0c-30.9 0-56 25.1-56 56zM512 288l-192 0 0 32c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-32L0 288 0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-128z"/>
          </svg>
        </CardDataStats>
        <CardDataStats title="Absent Employee's" total={absentEmployeeCount ? absentEmployeeCount.toString() : '0' } rate={absentPercentage.toString()+"%"} levelDown={presentPercentage >= absentPercentage} levelUp={presentPercentage < absentPercentage}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 512 512"
            className="fill-primary dark:fill-white"
            height="30"
            >
          {/* <path d="M367.2 412.5L99.5 144.8C77.1 176.1 64 214.5 64 256c0 106 86 192 192 192c41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3C434.9 335.9 448 297.5 448 256c0-106-86-192-192-192c-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"/> */}
          <path d="M75 75L41 41C25.9 25.9 0 36.6 0 57.9L0 168c0 13.3 10.7 24 24 24l110.1 0c21.4 0 32.1-25.9 17-41l-30.8-30.8C155 85.5 203 64 256 64c106 0 192 86 192 192s-86 192-192 192c-40.8 0-78.6-12.7-109.7-34.4c-14.5-10.1-34.4-6.6-44.6 7.9s-6.6 34.4 7.9 44.6C151.2 495 201.7 512 256 512c141.4 0 256-114.6 256-256S397.4 0 256 0C185.3 0 121.3 28.7 75 75zm181 53c-13.3 0-24 10.7-24 24l0 104c0 6.4 2.5 12.5 7 17l72 72c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-65-65 0-94.1c0-13.3-10.7-24-24-24z"/>
          </svg>
        </CardDataStats>
        <CardDataStats title="Employee's On Leave" total={leaveEmployeeCount ? leaveEmployeeCount.toString() : '0' } rate={leavePercentage.toString()+"%"}>
          <svg 
            className="fill-primary dark:fill-white"
            width="30"
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 640 512">
          <path d="M32 32c17.7 0 32 14.3 32 32l0 256 224 0 0-160c0-17.7 14.3-32 32-32l224 0c53 0 96 43 96 96l0 224c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-32-224 0-32 0L64 416l0 32c0 17.7-14.3 32-32 32s-32-14.3-32-32L0 64C0 46.3 14.3 32 32 32zm144 96a80 80 0 1 1 0 160 80 80 0 1 1 0-160z"/>
          </svg>
        </CardDataStats>
      </div>

      {/* <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <MapOne />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
      </div> */}
    </>
  );
};

export default Dashboard;
