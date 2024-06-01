import React, { useEffect, useState } from "react";
import { Table } from "../../table";
import { ActionDelete, ActionEdit } from "../../action";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { axiosClient } from "../../../api";
import dayjs from "dayjs";
import LabelStatus from "../../label/LabelStatus";

const UserTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userList, setUserList] = useState({});

  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (!auth?.access_token) navigate("/sign-in");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);
  useEffect(() => {
    (async () => {
      try {
        const results = await axiosClient.get("/auth/get-users", {
          headers: { Authorization: `Bearer ${auth.access_token}` },
        });
        setUserList(results.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Họ và tên</th>
            <th>Tên đăng nhập</th>
            <th>Email</th>
            <th>Vai trò</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {userList.length > 0 &&
            userList.map((user) => {
              const date = dayjs(user.createdAt).format("DD/MM/YYYY");
              return (
                <tr key={user.id}>
                  <th>{user.id}</th>
                  <th>
                    <div className="flex items-center flex-shrink-0 gap-x-3">
                      <img
                        className="object-cover w-10 h-10 rounded-full"
                        src={user.avatar}
                        alt=""
                      />
                      <div className="flex-1">
                        <h3>{user.fullName}</h3>
                        <time className="text-sm text-gray-400">{date}</time>
                      </div>
                    </div>
                  </th>
                  <th>{user.username}</th>
                  <th>{user.email}</th>
                  <th>
                    {user.role === "ADMIN" ? (
                      <LabelStatus type="success">{user.role}</LabelStatus>
                    ) : (
                      <LabelStatus type="warning">{user.role}</LabelStatus>
                    )}
                  </th>
                  <th>
                    <div className="flex item-center gap-x-3">
                      <ActionDelete></ActionDelete>
                    </div>
                  </th>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default UserTable;
