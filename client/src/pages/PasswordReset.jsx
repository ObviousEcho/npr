import { useSearchParams } from "react-router-dom";
import PasswordResetForm from "../components/Forms/PasswordResetForm";

let token;
let userId;

const PasswordReset = () => {
  const [searchParams] = useSearchParams();
  token = searchParams.get("token");
  userId = searchParams.get("id");

  if (!token && !userId) {
    window.location.replace("./login");
    return;
  }

  return <PasswordResetForm />;
};

export default PasswordReset;

export async function action() {
  console.log(token);
  console.log(userId);
  return null;
}
