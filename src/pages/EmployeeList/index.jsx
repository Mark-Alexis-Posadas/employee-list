import TableHeader from "../../components/TableHeader";
import EmployeeItem from "../../components/EmployeeItem";

import { TABLE_HEADER_TEXT } from "../../data";
import Modal from "../../components/Modal/Modal";
import { useReducer } from "react";

//initial state
const initialState = {
  inputValue: "",
  isToggleModal: false,
};

//reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "HANDLE_ADD_EMPLOYEE":
      return { ...state, isToggleModal: true };
    case "HANDLE_CANCEL":
      return { ...state, isToggleModal: false };
  }
};
export default function EmployeeList() {
  const [state, dispatch] = useReducer(reducer, initialState);
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

      {state.isToggleModal && <Modal dispatch={dispatch} />}
    </div>
  );
}
