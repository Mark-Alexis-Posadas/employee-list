import EmployeeItem from "../../components/EmployeeItem";
import { TABLE_HEADER_TEXT } from "../../data";
export default function EmployeeList() {
  return (
    <div className="p-10">
      <button className="text-gray-400 p-2 rounded bg-gray-800 mb-5">
        Add employee
      </button>
      <div className="relative overflow-x-auto shadow-md">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {TABLE_HEADER_TEXT.map((item) => (
                <th scope="col" className="px-6 py-3" key={item.id}>
                  {item.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <EmployeeItem />
          </tbody>
        </table>
      </div>
    </div>
  );
}
