import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import DashboardLayout from "./components/module/dashboard/DashboardLayout";
import DashboardPage from "./pages/DashboardPage";
import PostManage from "./components/module/post/PostManage";
import CategoryManage from "./components/module/category/CategoryManage";
import CategoryAddNew from "./components/module/category/CategoryAddNew";
import UserManage from "./components/module/user/UserManage";
import UserAddNew from "./components/module/user/UserAddNew";
import PostAddNew from "./components/module/post/PostAddNew";
import PostDetailsPage from "./pages/PostDetailsPage";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
          <Route
            path="/:id"
            element={<PostDetailsPage></PostDetailsPage>}
          ></Route>
          <Route element={<DashboardLayout></DashboardLayout>}>
            <Route
              path="/dashboard"
              element={<DashboardPage></DashboardPage>}
            ></Route>
            <Route
              path="/manage/post"
              element={<PostManage></PostManage>}
            ></Route>
            <Route
              path="/manage/add-post"
              element={<PostAddNew></PostAddNew>}
            ></Route>
            <Route
              path="/manage/category"
              element={<CategoryManage></CategoryManage>}
            ></Route>
            <Route
              path="/manage/add-category"
              element={<CategoryAddNew></CategoryAddNew>}
            ></Route>
            <Route
              path="/manage/user"
              element={<UserManage></UserManage>}
            ></Route>
            <Route
              path="/manage/add-user"
              element={<UserAddNew></UserAddNew>}
            ></Route>
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
