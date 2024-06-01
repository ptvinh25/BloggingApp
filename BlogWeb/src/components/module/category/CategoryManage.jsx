import React, { useEffect, useState } from "react";
import DashboardHeading from "../dashboard/DashboardHeading";
import Button from "../../button/Button";
import Table from "../../table/Table";
import ActionView from "../../action/ActionView";
import ActionEdit from "../../action/ActionEdit";
import ActionDelete from "../../action/ActionDelete";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { axiosClient } from "../../../api";
import Swal from "sweetalert2";

const CategoryManage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [categoryList, setCategoryList] = useState([]);
  console.log(categoryList);
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (!auth?.access_token) navigate("/sign-in");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);
  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const fetchCategories = async () => {
    try {
      const results = await axiosClient.get("/categories", {
        headers: { Authorization: `Bearer ${auth.access_token}` },
      });
      setCategoryList(results.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteCategory = async (categoryId) => {
    console.log(categoryId);
    Swal.fire({
      title: "Bạn muốn xóa danh mục này?",
      text: "Không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Vẫn xóa!",
    }).then(async (result) => {
      try {
        if (result.isConfirmed) {
          await axiosClient.delete(`/categories/${categoryId}`, {
            headers: { Authorization: `Bearer ${auth.access_token}` },
          });
          fetchCategories();
          Swal.fire({
            title: "Đã xóa!",
            text: "Danh mục đã bị xóa.",
            icon: "success",
          });
        }
      } catch (error) {
        console.warn(error);
      }
    });
  };
  return (
    <div>
      <DashboardHeading title="Tất cả danh mục" desc="Quản lý danh mục">
        <Button kind="primary" height="60px" to="/manage/add-category">
          Tạo danh mục mới
        </Button>
      </DashboardHeading>
      <div className="flex justify-end mb-10">
        <input
          type="text"
          placeholder="Tìm kiếm..."
          className="px-5 py-4 border border-gray-300 rounded-lg"
        />
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Tên danh mục</th>
            <th>Ảnh</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {categoryList.length > 0 &&
            categoryList.map((category) => {
              return (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>

                  <td>
                    <div className="w-[60px] h-auto">
                      <img className="rounded-lg" src={category.image} alt="" />
                    </div>
                  </td>
                  <td>
                    <div className="flex item-center gap-x-3">
                      <ActionView></ActionView>
                      <ActionEdit></ActionEdit>
                      <ActionDelete
                        onClick={() => {
                          handleDeleteCategory(category.id);
                        }}
                      ></ActionDelete>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default CategoryManage;
