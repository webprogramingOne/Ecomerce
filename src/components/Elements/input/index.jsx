/* eslint-disable react/prop-types */

import { forwardRef } from "react";
import Label from "./Label";
import Input from "./input";

// eslint-disable-next-line react/display-name
const InputForm = forwardRef((props, ref) => {
  const { label, name, type, placeholder } = props;
  return (
    <div className="mb-4">
      <Label htmlFor={name}>{label}</Label>
      <Input name={name} type={type} placeholder={placeholder} ref={ref} />
    </div>
  );
});
export default InputForm;
