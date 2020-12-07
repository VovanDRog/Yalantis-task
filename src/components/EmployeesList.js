import { useDispatch, useSelector } from "react-redux";

const arr_EN = [
	"A",
	"B",
	"C",
	"D",
	"E",
	"F",
	"G",
	"H",
	"I",
	"J",
	"K",
	"L",
	"M",
	"N",
	"O",
	"P",
	"Q",
	"R",
	"S",
	"T",
	"U",
	"V",
	"W",
	"X",
	"Y",
	"Z",
];

function EmployeesList() {
  const dispatch = useDispatch();
  const {employeeList, selectedEmployeeList} = useSelector(state => state);

  const onChange = ({ target: { name } }) => {
		let newSelectedEmployees = [...selectedEmployeeList];
		const index = newSelectedEmployees.indexOf(name);
		if (~index) {
			newSelectedEmployees.splice(index, 1);
		} else {
			newSelectedEmployees.push(name);
		}

		localStorage.setItem("selectedEmployees", newSelectedEmployees);
		dispatch({type: "SET_SELECTED_EMPLOYEE_LIST", data: newSelectedEmployees})
	};
  
	function getEmployeesByAlphabet(symbol) {
		let res = [];

		employeeList.forEach((employee) => {
			if(employee.lastName.startsWith(symbol)) {
				res.push(
					<Employee
						{...employee}
						key={employee.id}
						onChange={onChange}
						checked={~selectedEmployeeList.indexOf(employee.id)}
					/>
				);
			}
		});

		return res.length ? res : "-";
	}

	return (
		<div className="symbols">
			<h1>Employees</h1>
			<div className="symbols-block">
				{arr_EN.map((symbol) => (
					<div className="symbol-item" key={symbol}>
						<p>{symbol}</p>
						<ul>{getEmployeesByAlphabet(symbol)}</ul>
					</div>
				))}
			</div>
		</div>
	);
}

const Employee = ({ id, lastName, firstName, onChange, checked }) => (
	<li>
		<input
			type="checkbox"
			name={id}
			id={id}
			checked={checked}
			onChange={onChange}
		/>
		<label htmlFor={id}>{`${lastName} ${firstName}`}</label>
	</li>
);

export default EmployeesList;
