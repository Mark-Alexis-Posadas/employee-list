import TableHeader from "../../components/TableHeader";
import EmployeeItem from "../../components/EmployeeItem";

import { TABLE_HEADER_TEXT } from "../../data";
import Modal from "../../components/Modal/Modal";
import { useEffect, useReducer } from "react";
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
  isToggleExist: false,
  isEditing: false,
  isToggleModal: false,
  isToggleTheme: JSON.parse(localStorage.getItem("isToggleTheme")) || false, // Initialize from localStorage
  isToggleConfirmationModal: false,
};

//reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "HANDLE_ADD_EMPLOYEE":
      return { ...state, isToggleModal: true };
    case "HANDLE_FIELD_CHANGE":
      return {
        ...state,
        [action.field]: action.value,
        isToggleExist: false,
      };

    case "HANDLE_EMAIL_EXIST":
      return {
        ...state,
        isToggleExist: true,
      };
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
      return {
        ...state,
        isToggleConfirmationModal: true,
        editIndex: action.index,
      };
    case "HANDLE_PROCEED_DELETE":
      const updatedData = state.submittedData.filter(
        (_, index) => index !== state.editIndex
      );
      return {
        ...state,
        submittedData: updatedData,
        isToggleConfirmationModal: false,
        editIndex: null,
      };
    case "HANDLE_CANCEL":
      return {
        ...state,
        isToggleModal: false,
        isToggleConfirmationModal: false,
      };
    case "HANDLE_SAVE_DATA":
      return { ...state, submittedData: action.payload };

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

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("isToggleTheme"));
    if (storedData) {
      dispatch({ type: "TOGGLE_THEME" });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("isToggleTheme", JSON.stringify(state.isToggleTheme));
  }, [state.isToggleTheme]);

  useEffect(() => {
    const storedTheme = JSON.parse(localStorage.getItem("isToggleTheme"));
    if (storedTheme) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, []);

  const handleToggleTheme = () => {
    const newThemeState = !state.isToggleTheme;
    dispatch({ type: "TOGGLE_THEME" });
    localStorage.setItem("isToggleTheme", JSON.stringify(newThemeState)); // Update localStorage immediately
    document.body.classList.toggle("dark", newThemeState); // Toggle dark class on body
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      dispatch({
        type: "HANDLE_FIELD_CHANGE",
        field: name,
        value: value,
        isToggleExist: false,
      });
    } else {
      dispatch({
        type: "HANDLE_FIELD_CHANGE",
        field: name,
        value: value,
      });
    }
  };

  const handleDelete = (index) => {
    dispatch({ type: "HANDLE_DELETE", index });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailExists = state.submittedData.some(
      (item, index) => item.email === state.email && index !== state.editIndex
    );

    if (emailExists) {
      dispatch({ type: "HANDLE_EMAIL_EXIST" });
      return;
    }

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
          isToggleExist={state.isToggleExist}
          email={state.email}
        />
      )}
      {state.isToggleConfirmationModal && (
        <ConfirmationModal dispatch={dispatch} />
      )}
    </div>
  );
}
