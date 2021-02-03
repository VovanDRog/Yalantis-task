import { useSelector } from "react-redux";
import { months } from "../config";

function EmployeesBirthday() {
	const list = useSelector(({ employeeList, selectedEmployeeList }) =>
		employeeList.filter(({ id }) => selectedEmployeeList.includes(id))
	);

	const getEmployeesByMonth = (index) => {
		let res = [];
		list.forEach((item) => {
			const date = new Date(item.dob);
			if (date.getMonth() == index) {
				res.push(
					<li key={item.id}>
						{item.lastName + " " + item.firstName}
					</li>
				);
			}
		});

		return res;
	};

	const renderMonth = (month, index) => {
		const EmployeesByMonth = getEmployeesByMonth(index);
		return EmployeesByMonth.length ? (
			<div className="symbol-item" key={month}>
				<p>{month}</p>
				<ul>{EmployeesByMonth}</ul>
			</div>
		) : null;
	};

	return (
		<div className="birthday-block">
			<div className="employees-birthday">
				<div>
					<h1>Employees Birthday</h1>
					{list.length ? (
						<div>
							{months.map((month, index) =>
								renderMonth(month, index)
							)}
						</div>
					) : (
						<p>No selected employees</p>
					)}
				</div>
			</div>
		</div>
	);
}

export default EmployeesBirthday;
