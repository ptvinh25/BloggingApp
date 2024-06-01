import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (!auth?.access_token) navigate("/sign-in");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);
  return (
    <div>
      <h1 className="dashboard-heading">Dashboard page</h1>
    </div>
  );
};

export default DashboardPage;
