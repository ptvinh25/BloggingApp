import React from "react";
import DashboardHeading from "../dashboard/DashboardHeading";
import { Button } from "../../button";
import UserTable from "./UserTable";

const UserManage = () => {
  return (
    <div>
      <DashboardHeading
        title="Tất cả người dùng"
        desc="Quản lý người dùng"
      ></DashboardHeading>

      <div className="flex justify-end mb-10">
        <Button kind="ghost" to="/manage/add-user">
          Add new user
        </Button>
      </div>
      <div className="flex justify-end mb-10">
        <div className="w-full max-w-[300px]">
          <input
            type="text"
            className="w-full p-4 border border-gray-300 border-solid rounded-lg"
            placeholder="Tìm kiếm..."
          />
        </div>
      </div>
      <UserTable></UserTable>
    </div>
  );
};

export default UserManage;
