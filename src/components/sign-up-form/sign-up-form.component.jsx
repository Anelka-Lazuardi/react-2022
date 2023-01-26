import { useState, useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import {
  createAuthUserWithEmailAndPassword,
  createuserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../../components/form-input/form-input.componennt";
import Button from "../button/button.component";
import "./sign-up-form.styles.scss";

const defaultFormField = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setformFields] = useState(defaultFormField);
  const { displayName, email, password, confirmPassword } = formFields;

  const { setCurrentUser } = useContext(UserContext);

  const handleChange = (event) => {
    const { value, name } = event.target;
    setformFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setformFields(defaultFormField);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("password not match");
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      setCurrentUser(user);
      await createuserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code == "auth/email-already-in-use") {
        alert("Email already in use");
      } else {
        console.log("user creation encountered an error", error);
      }
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label={"Display Name"}
          type={"text"}
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

        <FormInput
          label={"Email"}
          type={"email"}
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label={"Password"}
          type={"password"}
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <FormInput
          label={"Confirm Password"}
          type={"password"}
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
