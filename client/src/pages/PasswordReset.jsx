import { useSearchParams, json, redirect } from "react-router-dom";
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

export async function action({ request }) {
  const data = await request.formData();
  const authData = {
    token: token,
    userId: userId,
    userPassword: data.get("password"),
  };

  const response = await fetch("/api/users/resetpassword", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 400) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Internal server error." }, { status: 500 });
  }

  localStorage.setItem("isSuccessful", true);

  return redirect("/login");
}
