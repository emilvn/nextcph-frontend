import { AxiosError } from "axios";
import toast from "react-hot-toast";

function handleError(e: unknown, defaultMessage: string) {
    if (e instanceof AxiosError) {
        console.error(e.response?.data || e.message);
        if (e.response && e.response.data.name === "ZodError") {
            toast.error(e.response?.data.errors[0].message);
        }
    } else {
        console.error(e);
        toast.error(defaultMessage);
    }
}

export default handleError;
