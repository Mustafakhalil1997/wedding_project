import * as Yup from "yup";

export default Yup.object().shape({
  firstName: Yup.string()
    .label("firstName")
    .trim()
    .min(3, "Invalid name!")
    .required("Name is required!"),
  lastName: Yup.string()
    .label("lastName")
    .trim()
    .min(1, "Invalid name!")
    .required("Last name is required"),
  email: Yup.string()
    .label("email")
    .trim()
    .email("Invalid email!")
    .required("Email is required"),
  password: Yup.string()
    .label("password")
    .trim()
    .min(8, "Password is too short!")
    .required("Password is required"),
});
