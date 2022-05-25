import * as Yup from "yup";

export default Yup.object().shape({
  firstName: Yup.string()
    .label("firstName")
    .trim()
    .min(3, "Invalid name!")
    .required("Name is required!"),
  lastName: Yup.string().label("lastName").trim(),
  email: Yup.string()
    .label("email")
    .trim()
    .email("Invalid email!")
    .required("Email is required"),
});
