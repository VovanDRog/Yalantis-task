
const getSelectedEmployee = () => {
  const emplFromStorage = localStorage.getItem("selectedEmployees");
  return !!emplFromStorage ? emplFromStorage.split(",") : [];
}

const initialState = {
  loading: true,
  employeeList: [],
  selectedEmployeeList: getSelectedEmployee(),
};

function empoloyeesReducer(state = initialState, action) {
  switch (action.type) {
		case "SET_EMPLOYEE_LIST":
			return { ...state, loading: false, employeeList: action.data };

		case "SET_SELECTED_EMPLOYEE_LIST":
			return { ...state, selectedEmployeeList: action.data };

		default:
			return state;
	}
};

export default empoloyeesReducer;