import { json, redirect } from "react-router-dom";
import SignupForm from "../components/Layout/SignupForm";

const Signup = () => {
  return <SignupForm />;
};

export default Signup;

export async function action({ request }) {
  const data = await request.formData();
  const authData = {
    userName: data.get("username"),
    userEmail: data.get("email"),
    userPassword: data.get("password"),
  };

  const response = await fetch("/api/users/signup", {
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

  console.log(response);
  return redirect("/");
}
