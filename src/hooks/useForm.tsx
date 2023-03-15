import { useState } from "react";

export const useForm = <T extends Object>(initialState: T) => {
  const [textInputValue, setTextInputValue] = useState(initialState);

  const handleChange = (value: string, field: keyof T) => {
    setTextInputValue({ ...textInputValue, [field]: value });
  };
  return { ...textInputValue, handleChange };
};
