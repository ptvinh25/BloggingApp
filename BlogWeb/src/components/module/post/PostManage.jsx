import React, { useEffect, useState } from "react";
import DashboardHeading from "../dashboard/DashboardHeading";
import { Table } from "../../table";
import { ActionDelete, ActionView } from "../../action";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { axiosClient } from "../../../api";
import dayjs from "dayjs";
import Swal from "sweetalert2";

const PostManage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [postList, setPostList] = useState([]);
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (!auth?.access_token) navigate("/sign-in");
    console.log(auth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const fetchPosts = async () => {
    try {
      const results = await axiosClient.get("/posts", {
        headers: { Authorization: `Bearer ${auth.access_token}` },
      });
      setPostList(results.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeletePost = async (postId) => {
    console.log(postId);
    Swal.fire({
      title: "Bạn muốn xóa bài viết này?",
      text: "Không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Vẫn xóa!",
    }).then(async (result) => {
      try {
        if (result.isConfirmed) {
          await axiosClient.delete(`/posts/${postId}`, {
            headers: { Authorization: `Bearer ${auth.access_token}` },
          });
          fetchCategories();
          Swal.fire({
            title: "Đã xóa!",
            text: "Bài viết đã bị xóa.",
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
      <DashboardHeading
        title="Tất cả bài viết"
        desc="Quản lý các bài viết"
      ></DashboardHeading>
      <div className="flex justify-end mb-10">
        <div className="w-full max-w-[300px]">
          <input
            type="text"
            className="w-full p-4 border border-gray-300 border-solid rounded-lg"
            placeholder="Tìm kiếm..."
          />
        </div>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Bài viết</th>
            <th>Danh mục</th>
            <th>Tác giả</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {postList.length > 0 &&
            postList.map((post) => {
              const date = dayjs(post.createdAt).format("DD/MM/YYYY");
              return (
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td>
                    <div className="flex items-center gap-x-3">
                      <img
                        src={post.coverImage}
                        alt=""
                        className="w-[66px] h-[55px] rounded object-cover"
                      />
                      <div className="flex-1 whitespace-pre-wrap">
                        <h3 className="font-semibold max-w-[300px] ">
                          {post.title}
                        </h3>
                        <time className="text-sm text-gray-500">{date}</time>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="text-gray-500">{post.category.name}</span>
                  </td>
                  <td>
                    <span className="text-gray-500">{post.user.fullName}</span>
                  </td>
                  <td>
                    <div className="flex items-center text-gray-500 gap-x-3">
                      <ActionView
                        onClick={() => navigate(`/${post.id}`)}
                      ></ActionView>
                      <ActionDelete
                        onClick={() => {
                          handleDeletePost(post.id);
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

export default PostManage;
