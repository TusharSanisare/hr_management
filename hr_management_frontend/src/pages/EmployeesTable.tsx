import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import ViewAllEmployeesTable from '../components/Tables/ViewAllEmployeesTable';
// import TableOne from '../components/Tables/TableOne';
// import TableThree from '../components/Tables/TableThree';
// import TableTwo from '../components/Tables/TableTwo';

const EmployeesTable = () => {
  return (
    <>
      <Breadcrumb pageName="Employee's" />

      <div className="flex flex-col gap-10">
        <ViewAllEmployeesTable />
        {/* <TableTwo />
        <TableThree /> */}
      </div>
    </>
  );
};

export default EmployeesTable;
