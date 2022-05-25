import * as Yup from "yup";

export default Yup.object().shape({
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
