import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function EmployeeItem({
  dispatch,
  employee,
  handleDelete,
  index,
}) {
  return (
    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {index}
      </th>
      <td className="px-6 py-4">{employee.firstName}</td>
      <td className="px-6 py-4">{employee.middleName}</td>
      <td className="px-6 py-4">{employee.lastName}</td>
      <td className="px-6 py-4">{employee.email}</td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <button
            className="flex items-center gap-2 font-medium text-blue-600 dark:text-blue-500 hover:underline"
            onClick={() => dispatch({ type: "HANDLE_EDIT", index: index })}
          >
            Edit
            <FontAwesomeIcon icon={faPencilAlt} />
          </button>
          <button
            className="flex items-center gap-2 font-medium text-red-600 dark:text-red-500 hover:underline"
            onClick={() => handleDelete(index)}
          >
            Delete
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </div>
      </td>
    </tr>
  );
}
