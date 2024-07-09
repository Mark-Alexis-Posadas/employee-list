import TableHeader from "../../components/TableHeader";
import EmployeeItem from "../../components/EmployeeItem";

import { TABLE_HEADER_TEXT } from "../../data";
import Modal from "../../components/Modal/Modal";
import { useReducer } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

//initial state
const initialState = {
  firstName: "",
  middleName: "",
  lastName: "",
  email: "",
  isToggleModal: false,
  submittedData: [],
  editIndex: null,
};

//reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "HANDLE_ADD_EMPLOYEE":
      return { ...state, isToggleModal: true };
    case "HANDLE_FIELD_CHANGE":
      return { ...state, [action.field]: action.value };
    case "HANDLE_EDIT":
      const editIdx = action.index;
      const editedData = state.submittedData[editIdx];
      console.log(editIdx, editedData);
      return {
        ...state,
        isToggleModal: true,
        firstName: editedData.firstName,
        middleName: editedData.middleName,
        lastName: editedData.lastName,
        email: editedData.email,
        editIndex: editIdx,
      };
    case "HANDLE_DELETE":
      const idx = action.index;
      return {
        ...state,
        submittedData: state.submittedData.filter((_, index) => index !== idx),
      };
    case "HANDLE_CANCEL":
      return { ...state, isToggleModal: false };

    case "HANDLE_SUBMIT":
      return {
        ...state,
        submittedData: [...state.submittedData, { ...state }],
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        isToggleModal: false,
      };
  }
};

export default function EmployeeList() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "HANDLE_FIELD_CHANGE", field: name, value: value });
  };

  const handleDelete = (index) => {
    dispatch({ type: "HANDLE_DELETE", index });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "HANDLE_SUBMIT" });
  };

  return (
    <div className="p-10 bg-black min-h-screen overflow-hidden">
      <button
        className="text-gray-400 p-2 rounded bg-gray-800 mb-5 flex items-center gap-3"
        onClick={() => dispatch({ type: "HANDLE_ADD_EMPLOYEE" })}
      >
        Add employee
        <FontAwesomeIcon icon={faPlusCircle} />
      </button>
      <div className="relative overflow-x-auto shadow-md">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <TableHeader tableHeaderText={TABLE_HEADER_TEXT} />
            </tr>
          </thead>
          <tbody>
            {state.submittedData.map((item, index) => (
              <EmployeeItem
                key={index}
                employee={item}
                dispatch={dispatch}
                index={index}
                handleDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>

      {state.isToggleModal && (
        <Modal
          dispatch={dispatch}
          handleFieldChange={handleFieldChange}
          handleSubmit={handleSubmit}
          state={state}
        />
      )}
    </div>
  );
}
