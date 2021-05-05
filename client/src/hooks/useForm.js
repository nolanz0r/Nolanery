import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export const useForm = (callback, validate) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors, isSubmitting, callback]);

  const handleChange = (event) => {
    event.persist();

    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    if (event) event.preventDefault();

    values && setErrors(validate(values));
    setIsSubmitting(true);

    Object.values(validate(values)).map((error) => {
      return toast.error(error);
    });
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
  };
};
