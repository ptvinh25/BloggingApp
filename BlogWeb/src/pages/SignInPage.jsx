import React, { useEffect } from "react";
import AuthenticationPage from "./AuthenticationPage";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Field } from "../components/field";
import { Label } from "../components/label";
import { Input, InputTogglePassword } from "../components/input";
import { Button } from "../components/button";
import { toast } from "react-toastify";
import { axiosClient } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../store/auth/authSlice";

const schema = yup.object({
  email: yup
    .string()
    .email("Email chưa đúng định dạng")
    .required("Hãy điền địa chỉ email"),
  password: yup
    .string()
    .required("Hãy điền mật khẩu")
    .min(8, "Mật khẩu ít nhất 8 kí tự"),
});

const SignInPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  console.log("AUTH - ", auth);
  useEffect(() => {
    if (auth?.access_token) navigate("/dashboard");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);
  const onSubmit = async (data) => {
    try {
      const results = await axiosClient.post("/auth/login", data);
      console.log(results);
      if (results.data.user.role === "ADMIN") {
        dispatch(setAuth(results.data));
        navigate("/dashboard");
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div>
      <AuthenticationPage>
        <form
          className="form"
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Field>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="Điền địa chỉ email"
              control={control}
            ></Input>
            {errors?.email?.message ? (
              <span className="text-sm text-red-500">
                {errors?.email?.message}
              </span>
            ) : (
              ""
            )}
          </Field>
          <Field>
            <Label htmlFor="password">Mật khẩu</Label>
            <InputTogglePassword control={control}></InputTogglePassword>
            {errors?.password?.message ? (
              <span className="text-sm text-red-500">
                {errors?.password?.message}
              </span>
            ) : (
              ""
            )}
          </Field>
          <Button
            onClick={handleSubmit(onSubmit)}
            type="submit"
            style={{
              width: "100%",
              maxWidth: 300,
              margin: "0 auto",
            }}
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Đăng nhập
          </Button>
        </form>
      </AuthenticationPage>
    </div>
  );
};

export default SignInPage;
