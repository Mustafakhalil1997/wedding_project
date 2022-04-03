import * as Yup from "yup";

export default Yup.object().shape({
  hallName: Yup.string()
    .label("hallName")
    .trim()
    .min(3, "Invalid name")
    .required("Name is required"),
  address: Yup.string()
    .label("address")
    .min(5, "Invalid address")
    .required("Address is required"),
  // location: Yup.string().label("Location").required("Location is required"),
});
