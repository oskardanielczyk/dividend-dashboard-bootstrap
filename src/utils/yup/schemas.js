import * as yup from "yup";

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

export const transactionSchema = yup.object().shape({
  ticker: yup.string().required("Pole wymagane"),
  name: yup.string().required("Pole wymagane"),
  price: yup
    .number()
    .typeError("Cena akcji musi być liczbą")
    .positive("Cena nie może być ujemna")
    .required("Pole wymagane"),
  quantity: yup
    .number()
    .typeError("Ilość akcji musi być liczbą")
    .positive("Ilość akcji musi być dodatnia")
    .integer("Ilość akcji musi być liczbą całkowitą")
    .required("Pole wymagane"),
});
