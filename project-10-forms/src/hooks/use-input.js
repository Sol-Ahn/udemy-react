import { useState, useReducer } from "react";

const initialInputState = {
	value: "",
	isTouched: false,
};

const inputStateReducer = (state, action) => {
	if (action.type === "INPUT") {
		return { value: action.value, isTouched: state.isTouched };
	}
	if (action.type === "BLUR") {
		return { value: state.value, isTouched: true };
	}
	if (action.type === "RESET") {
		return { value: "", isTouched: false };
	}

	return inputStateReducer;
};

const useInput = (validateValue) => {
	useReducer(inputStateReducer, {});

	const [inputState, dispatch] = useReducer(
		inputStateReducer,
		initialInputState
	);

	// const [enteredValue, setEnteredValue] = useState("");
	// const [isTouched, setIsTouched] = useState(false);

	// const valueIsValid = validateValue(enteredValue);
	// const hasError = !valueIsValid && isTouched;

	const valueIsValid = validateValue(inputState.value);
	const hasError = !valueIsValid && inputState.isTouched;

	// const valueChangeHandler = (e) => {
	// 	setEnteredValue(e.target.value);
	// };

	const valueChangeHandler = (e) => {
		dispatch({ type: "INPUT", value: e.target.value });
	};

	// const inputBlurHandler = (e) => {
	// 	setIsTouched(true);
	// };

	const inputBlurHandler = (e) => {
		dispatch({ type: "BLUR" });
	};

	// const reset = () => {
	// 	setEnteredValue("");
	// 	setIsTouched(false);
	// };

	const reset = () => {
		dispatch({ type: "RESET" });
	};

	// return {
	// 	value: enteredValue,
	// 	isValid: valueIsValid,
	// 	hasError,
	// 	valueChangeHandler,
	// 	inputBlurHandler,
	// 	reset,
	// };

	return {
		value: inputState.value,
		isValid: valueIsValid,
		hasError,
		valueChangeHandler,
		inputBlurHandler,
		reset,
	};
};

export default useInput;
