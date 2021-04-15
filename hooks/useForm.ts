import { useState } from "react";

const useForm = (initialState) => {
  const [data, setData] = useState(initialState);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return [data, handleChange, setData];
};
export default useForm;
