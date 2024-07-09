# Employee Management System

## Overview

This project implements a simple Employee Management System where users can add, read, edit, and delete employee records. The application also utilizes local storage to persist employee data across sessions.

## Features

- **Add Employee**: Users can add a new employee with details such as name, position, etc.
- **Read Employee**: Users can view a list of all employees currently stored.
- **Edit Employee**: Users can update the details of existing employees.
- **Delete Employee**: Users can remove employees from the system.
- **Local Storage Persistence**: Employee data is stored locally, allowing the application to maintain state across page refreshes.

## Technologies Used

- **React**: Frontend library for building the user interface, used with hooks including `useReducer`.
- **Tailwind CSS**: Utility-first CSS framework used for styling.
- **Font Awesome**: Icon toolkit used for icons in the user interface.
- **uuid**: Library used for generating unique identifiers.
- **Local Storage API**: Used to persist employee data locally within the browser.

## Installation

To run the project locally:

1. Clone the repository:

   ```bash
   git clone <https://github.com/Mark-Alexis-Posadas/employee-list>
   ```

2. Navigate into the project directory:

   ```bash
   cd employee-management-system

   ```

3. Install dependencies:

   ```bash
   npm install

   ```

4. Start the development server:

   ```bash
   npm start

   ```
