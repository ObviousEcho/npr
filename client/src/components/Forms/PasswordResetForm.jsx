import { useSearchParams } from "react-router-dom";
import classes from "./PasswordResetForm.module.css";

const PasswordResetForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("token");
  const userId = searchParams.get("id");

  if (!token && !userId) {
    window.location.replace("./login");
    return;
  }

  return <h1>Reset Password</h1>;
};

export default PasswordResetForm;
