import React from "react";

export default function EmployeeItem() {
  return (
    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        1
      </th>
      <td className="px-6 py-4">mark alexis</td>
      <td className="px-6 py-4">petrola</td>
      <td className="px-6 py-4">posadas</td>
      <td className="px-6 py-4">markalexisposadas@gmail.com</td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Edit
          </a>
          <a
            href="#"
            className="font-medium text-red-600 dark:text-red-500 hover:underline"
          >
            Delete
          </a>
        </div>
      </td>
    </tr>
  );
}
