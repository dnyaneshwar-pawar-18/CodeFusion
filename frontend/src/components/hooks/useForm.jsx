import { useState } from "react";

const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (event) => {
    const { name, value, type } = event.target;
    console.log(event.target.value)

    setValues({
      ...values,
      [name]: type === "number" ? Number(value) : value,  
    });
  };

  const resetForm = () => {
    setValues(initialValues);
  };

  return { values, handleChange, resetForm };
};

export default useForm;
