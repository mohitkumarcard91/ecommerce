import * as yup from 'yup';

const userSchema = yup.object({
  name: yup.string().min(3, "Name must be at least 3 characters").max(30).required("Name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").max(20).required("Password is required"),
});


export default userSchema;
