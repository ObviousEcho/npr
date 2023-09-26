import { json, redirect } from "react-router-dom";
import LoginForm from "../components/Layout/LoginForm";
import Auth from "../utils/auth";

const Login = () => {
  return <LoginForm />;
};

export default Login;

export async function action({ request }) {
  const data = await request.formData();
  const authData = {
    userEmail: data.get("email"),
    userPassword: data.get("password"),
  };

  const response = await fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (
    response.status === 422 ||
    response.status === 401 ||
    response.status === 400
  ) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not authenticate user." }, { status: 500 });
  }

  const resData = await response.json();
  const token = resData.token;

  Auth.login(token);

  return redirect("/voyages");
}
