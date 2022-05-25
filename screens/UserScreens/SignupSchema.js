import * as Yup from "yup";

export default Yup.object().shape({
  fullName: Yup.string()
    .label("fullName")
    .trim()
    .min(3, "Invalid name!")
    .required("Name is required!"),
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
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password does not match!")
    .required("Confirm Password is required"),
});
