import Axios from "axios";
import { useEffect, useState } from "react";
import EmployeesBirthday from "./components/EmployeesBirthday";
import EmployeesList from "./components/EmployeesList";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";

function App() {
	const dispatch = useDispatch();
	const { loading } = useSelector((state) => state);

	useEffect(() => {
		Axios.get(
			"https://yalantis-react-school-api.yalantis.com/api/task0/users"
		)
			.then(({ data }) => dispatch({ type: "SET_EMPLOYEE_LIST", data }))
			.catch((error) => console.error(error));
	}, []);

	if (loading) {
		return <div className="loading">Loading ...</div>;
	}

	return (
		<div className="App">
			<EmployeesList />

			<EmployeesBirthday />
		</div>
	);
}

export default App;
