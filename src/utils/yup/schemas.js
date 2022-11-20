import * as yup from "yup";

const passwordRules = "";

export const loginSchema = yup.object().shape({
  email: yup.string().email("Nieprawidłowy email").required("Pole wymagane"),
  password: yup.string().required("Pole wymagane"),
});

export const signupSchema = yup.object().shape({
  nameSubmit: yup.string().min(3, "Minimum 3 znaki").required("Pole wymagane"),
  emailSubmit: yup
    .string()
    .email("Nieprawidłowy email")
    .required("Pole wymagane"),
  passwordSubmit: yup
    .string()
    .min(5, "Minimum 5 znaków")
    .required("Pole wymagane"),
  confirmPasswordSubmit: yup
    .string()
    .oneOf([yup.ref("passwordSubmit"), null], "Hasła muszą się zgadzać")
    .required("Pole wymagane"),
});
