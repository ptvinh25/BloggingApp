import React, { useEffect, useMemo } from "react";
import { Field } from "../../field";
import { Label } from "../../label";
import { Input } from "../../input";
import { useForm } from "react-hook-form";
import { Dropdown } from "../../dropdown";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const PostAddNew = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (!auth?.access_token) navigate("/sign-in");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);
  const { control } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      hot: false,
      image: "",
      category: {},
    },
  });
  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["link", "image"],
      ],
    }),
    []
  );
  return (
    <div>
      <h1 className="dashboard-heading">Thêm bài viết mới</h1>
      <form action="">
        <div className="grid grid-cols-2 mb-10 gap-x-10">
          <Field>
            <Label>Tiêu đề bài viết</Label>
            <Input
              control={control}
              placeholder="Tiêu đề"
              name="title"
              required
            ></Input>
          </Field>
          <Field>
            <Label>Danh mục</Label>
            <Dropdown>
              <Dropdown.Select placeholder="Chon danh muc"></Dropdown.Select>
              <Dropdown.List></Dropdown.List>
              <span className="inline-block p-3 text-sm font-medium bg-gray-200 bg-green-300 rounded-lg">
                Life
              </span>
            </Dropdown>
          </Field>
          <Field>
            <Label>Noi dung bai viet</Label>
            <div className="w-full entry-content">
              <ReactQuill modules={modules} theme="snow" />
            </div>
          </Field>
        </div>
      </form>
    </div>
  );
};

export default PostAddNew;
