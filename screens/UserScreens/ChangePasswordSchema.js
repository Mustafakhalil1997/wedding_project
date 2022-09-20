import * as Yup from "yup";

export default Yup.object().shape({
  currentPassword: Yup.string()
    .label("currentPassword")
    .trim()
    .min(8, "Password is too short!")
    .required("Current Password is required"),
  newPassword: Yup.string()
    .label("newPassword")
    .trim()
    .min(8, "Password is too short!")
    .required("New Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Password does not match!")
    .required("Confirm Password is required"),
});
