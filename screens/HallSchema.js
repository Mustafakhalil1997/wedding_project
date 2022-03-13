import * as Yup from "yup";

export default Yup.object().shape({
  hallName: Yup.string()
    .label("hallName")
    .trim()
    .min(3, "Invalid name")
    .required("Name is required"),
  email: Yup.string().label("email").trim().required("Email is required"),
  address: Yup.string()
    .label("Address")
    .min(5, "Invalid address")
    .required("Address is required"),
  location: Yup.string().label("Location").required("Location is required"),
});
