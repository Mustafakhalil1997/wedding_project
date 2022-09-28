import * as Yup from "yup";

export default Yup.object().shape({
  hallName: Yup.string()
    .label("hallName")
    .trim()
    .min(3, "Invalid Venue Name!")
    .required("Venue Name is required!"),
  address: Yup.string()
    .label("address")
    .trim()
    .min(5, "Invalid Address")
    .required("Address is required"),
  mobileNumber: Yup.string()
    .label("mobileNumber")
    .trim()
    .min(7, "Invalid Mobile Number")
    .required("Mobile Number is required"),
  price: Yup.string()
    .label("price")
    .trim()
    .min(1, "Invalid Price")
    .required("Price is required"),
});
