import React from "react";
import DashboardHeading from "../dashboard/DashboardHeading";
import { Field } from "../../field";
import { Label } from "../../label";
import { useForm } from "react-hook-form";
import { Input } from "../../input";
import Button from "../../button/Button";

const CategoryAddNew = () => {
  const { control, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      image: "",
      createdAt: new Date(),
    },
  });
  return (
    <div>
      <DashboardHeading
        title="Danh mục mới"
        desc="Thêm danh mục mới"
      ></DashboardHeading>
      <form action="">
        <div className="form-layout">
          <Field>
            <Label>Tên danh mục</Label>
            <Input
              control={control}
              name="name"
              placeholder="Điền tên danh mục"
              required
            ></Input>
          </Field>
          <Field>
            <Label>Ảnh</Label>
            <Input control={control} name="image" type="file"></Input>
          </Field>
        </div>
        <Button kind="ghost" type="submit">
          Thêm danh mục
        </Button>
      </form>
    </div>
  );
};

export default CategoryAddNew;
