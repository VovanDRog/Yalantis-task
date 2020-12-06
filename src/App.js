import Axios from "axios";
import { useEffect, useState } from "react";
import EmployeesBirthday from "./EmployeesBirthday";
import "./App.css";

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

function App() {
	const [employees, setEmployees] = useState([]);
	const [selectedEmployees, setSelectedEmployees] = useState([]);

	useEffect(() => {
		Axios.get(
			"https://yalantis-react-school-api.yalantis.com/api/task0/users"
		)
			.then(({ data }) => setEmployees(data))
			.catch((error) => console.log(error));
	}, []);

	useEffect(() => {
		const emplFromStorage = localStorage.getItem("selectedEmployees");
		const resEmpl = !!emplFromStorage ? emplFromStorage.split(",") : [];
		setSelectedEmployees(resEmpl);
	}, []);

	const onChange = ({ target: { name } }) => {
		let newSelectedEmployees = [...selectedEmployees];
		const index = newSelectedEmployees.indexOf(name);
		if (~index) {
			newSelectedEmployees.splice(index, 1);
		} else {
			newSelectedEmployees.push(name);
		}

		localStorage.setItem("selectedEmployees", newSelectedEmployees);
		setSelectedEmployees(newSelectedEmployees);
	};

	const getUsersByAlphabet = (symbol) => {
		let res = [];

		employees.forEach((employee) => {
			if (employee.lastName.startsWith(symbol)) {
				res.push(
					<User
						{...employee}
						key={employee.id}
						onChange={onChange}
						checked={~selectedEmployees.indexOf(employee.id)}
					/>
				);
			}
		});

		return res.length ? res : "-";
	};

	if (!employees.length) {
		return <div className="loading">Loading ...</div>;
	}

	return (
		<div className="App">
			<div className="symbols">
				<h1>Employees</h1>
				<div className="symbols-block">
					{arr_EN.map((symbol) => (
						<div className="symbol-item" key={symbol}>
							<p>{symbol}</p>
							<ul>{getUsersByAlphabet(symbol)}</ul>
						</div>
					))}
				</div>
			</div>

			<div className="birthday-block">
				<EmployeesBirthday
					employees={employees.filter(({ id }) =>
						selectedEmployees.includes(id)
					)}
				/>
			</div>
		</div>
	);
}

const User = ({ id, lastName, firstName, onChange, checked }) => (
	<li>
		<input
			type="checkbox"
			name={id}
			checked={checked}
			onChange={onChange}
		/>
		<laber htmlFor={id}>{`${lastName} ${firstName}`}</laber>
	</li>
);

export default App;
