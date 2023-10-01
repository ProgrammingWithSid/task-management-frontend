import { getData, postData } from "../../api/apiactions";
import { setSignupAct, setSignupUserAct, setSignupErrorAct } from "./Signupslice";
import { toast } from 'react-toastify';

export function signupUserAct(apiUrl, payload) {
    return async (dispatch) => {
        try {
            const response = await postData(apiUrl, payload);
            if (response.status === 201) {
                dispatch(setSignupAct(response.data));
                // Display a success toast message
                toast.success("Signup successful");
            } else {
                dispatch(setSignupErrorAct(response));
                // Display an error toast message
                toast.error("Signup failed. Maybe the E-Mail already exists");
            }
        } catch (error) {
            // Handle network or other errors
            console.error("Error during signup:", error);
            // Display an error toast message
            toast.error("An error occurred while signing up.");
        }
    };
}
