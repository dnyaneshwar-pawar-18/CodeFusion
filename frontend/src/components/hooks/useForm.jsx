import { useState } from "react";

const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (event) => {
    const { name, value, type } = event.target;

    setValues({
      ...values,
      [name]: type === "number" ? Number(value) : value, // Ensure numbers are stored correctly
    });
  };

  const resetForm = () => {
    setValues(initialValues);
  };

  return { values, handleChange, resetForm };
};

export default useForm;
