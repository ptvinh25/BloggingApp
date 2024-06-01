import React, { Fragment, useState } from "react";
import { IconEyeClose, IconEyeOpen } from "../icon";
import Input from "./Input";

const InputTogglePassword = ({ control }) => {
  const [togglePassword, setTogglePassword] = useState(false);
  if (!control) return null;
  return (
    <Fragment>
      <Input
        type={togglePassword ? "text" : "password"}
        name="password"
        placeholder="Điền mật khẩu"
        control={control}
      >
        {!togglePassword ? (
          <IconEyeOpen
            onClick={() => {
              setTogglePassword(true);
            }}
          ></IconEyeOpen>
        ) : (
          <IconEyeClose
            onClick={() => {
              setTogglePassword(false);
            }}
          ></IconEyeClose>
        )}
      </Input>
    </Fragment>
  );
};

export default InputTogglePassword;
