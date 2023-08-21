const Practice = () => {
	const number = [0,1, 2, 3, 4, 5, 6];
	const double = number.map((eachnumber) => eachnumber * 2);
	return (
		<>
			<span >{double}</span>
		</>
	);
}
export default Practice;