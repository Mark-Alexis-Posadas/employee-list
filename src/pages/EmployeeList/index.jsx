import TableHeader from "../../components/TableHeader";
import EmployeeItem from "../../components/EmployeeItem";

import { TABLE_HEADER_TEXT } from "../../data";
import Modal from "../../components/Modal/Modal";
import { useReducer } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faPlusCircle, faSun } from "@fortawesome/free-solid-svg-icons";
import ConfirmationModal from "../../components/Modal/ConfirmationModal";

//initial state
const initialState = {
  firstName: "",
  middleName: "",
  lastName: "",
  email: "",
  submittedData: [],
  editIndex: null,

  isEditing: false,
  isToggleModal: false,
  isToggleTheme: false,
  isToggleConfirmationModal: false,
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
      return {
        ...state,
        isToggleModal: true,
        firstName: editedData.firstName,
        middleName: editedData.middleName,
        lastName: editedData.lastName,
        email: editedData.email,
        editIndex: editIdx,
        isEditing: true,
      };
    case "HANDLE_DELETE":
      const idx = action.index;
      return {
        ...state,
        // submittedData: state.submittedData.filter((_, index) => index !== idx),
        isToggleConfirmationModal: true,
      };
    case "HANDLE_CANCEL":
      return { ...state, isToggleModal: false };

    case "HANDLE_SUBMIT":
      if (state.editIndex !== null) {
        const submittedData = [...state.submittedData];
        submittedData[state.editIndex] = { ...state };
        return {
          ...state,
          submittedData,
          firstName: "",
          middleName: "",
          lastName: "",
          email: "",
          editIndex: null,
          isToggleModal: false,
        };
      } else {
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

    case "TOGGLE_THEME":
      return { ...state, isToggleTheme: !state.isToggleTheme };
    default:
      return state;
  }
};

export default function EmployeeList() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleToggleTheme = () => {
    dispatch({ type: "TOGGLE_THEME" });
    document.body.classList.toggle("dark");
  };
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "HANDLE_FIELD_CHANGE", field: name, value: value });
  };

  const handleDelete = (index) => {
    dispatch({ type: "HANDLE_DELETE", index });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !state.firstName.trim() ||
      !state.middleName.trim() ||
      !state.lastName.trim() ||
      !state.email.trim() === ""
    ) {
      alert("please add text");
      return;
    }
    dispatch({ type: "HANDLE_SUBMIT" });
  };

  return (
    <div className="p-10 bg-slate-50 dark:bg-black min-h-screen overflow-hidden">
      <div className="flex items-center justify-between">
        <button
          className="dark:text-gray-400 p-2 rounded bg-blue-600 text-white dark:bg-gray-800 mb-5 flex items-center gap-3"
          onClick={() => dispatch({ type: "HANDLE_ADD_EMPLOYEE" })}
        >
          Add employee
          <FontAwesomeIcon icon={faPlusCircle} />
        </button>
        <button onClick={handleToggleTheme}>
          <FontAwesomeIcon
            icon={state.isToggleTheme ? faSun : faMoon}
            className="text-yellow-400 text-2xl cursor-pointer"
          />
        </button>
      </div>
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
          isEditing={state.isEditing}
        />
      )}
      {state.isToggleConfirmationModal && <ConfirmationModal />}
    </div>
  );
}
