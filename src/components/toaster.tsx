import { Toaster } from "react-hot-toast";

function StyledToaster() {
  return (
    <Toaster
      reverseOrder={false}
      toastOptions={{
        position: "bottom-center",
        success: {
          style: {
            border: "2px solid black",
            padding: "16px",
            background: "#F96B4C",
            color: "white",
          },
        },
        error: {
          style: {
            border: "2px solid black",
            padding: "16px",
            background: "#F96B4C",
            color: "white",
          },
        },
      }}
    />
  );
}

export default StyledToaster;
