import TableHeader from "../../components/TableHeader";
import EmployeeItem from "../../components/EmployeeItem";

import { TABLE_HEADER_TEXT } from "../../data";
import Modal from "../../components/Modal/Modal";
import { useReducer } from "react";

//initial state
const initialState = {
  firstName: "",
  middleName: "",
  lastName: "",
  userName: "",
  isToggleModal: false,
};

//reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "HANDLE_ADD_EMPLOYEE":
      return { ...state, isToggleModal: true };
    case "HANDLE_FIELD_CHANGE":
      const { name, value } = action.payload;
      return { ...state, [name]: value };
    case "HANDLE_CANCEL":
      return { ...state, isToggleModal: false };
  }
};

export default function EmployeeList() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleFieldChange = (e) => {
    dispatch({ type: "HANDLE_FIELD_CHANGE", payload: e.target.value });
  };
  return (
    <div className="p-10">
      <button
        className="text-gray-400 p-2 rounded bg-gray-800 mb-5"
        onClick={() => dispatch({ type: "HANDLE_ADD_EMPLOYEE" })}
      >
        Add employee
      </button>
      <div className="relative overflow-x-auto shadow-md">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <TableHeader tableHeaderText={TABLE_HEADER_TEXT} />
            </tr>
          </thead>
          <tbody>
            <EmployeeItem />
          </tbody>
        </table>
      </div>

      {state.isToggleModal && (
        <Modal dispatch={dispatch} handleFieldChange={handleFieldChange} />
      )}
    </div>
  );
}
