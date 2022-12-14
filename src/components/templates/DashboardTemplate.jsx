import React, { useContext } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../contexts";

export const DashboardTemplate = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const urlActual = location.pathname;
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const onLogout = async () => {
    try {
      await axios.post(
        "https://appsistemacarcelario.herokuapp.com/api/v1/logout",
        {},
        { headers: { accept: "application/json", authorization: token } }
      );
      navigate("/login", { replace: true });
      logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="md:flex md:min-h-screen">
      <div className="md:w-1/4 bg-sky-900 px-5 py-10">
        <h2 className="text-4xl font-black text-center text-white underline">
          Prison System
        </h2>
        <img
          src="https://cdn-icons-png.flaticon.com/512/711/711769.png"
          alt="img-client"
          className="m-auto mt-4"
          width={512}
          height={512}
        />
        <h3 className="text-2xl font-black text-center text-white">
          {user.full_name}
        </h3>
        <h3 className="text-xl font-black text-center text-white">
          {user.role}
        </h3>
        <hr className="mt-5 text-orange-900" />
        {user.role === 'guard' ?  
        <ul className="mt-5 list-disc list-outside px-5">
        <li className="text-orange-900">
            <Link
              to="/profile"
              className={`${
                urlActual === "/profile"
                  ? "text-blue-300 underline"
                  : "text-white"
              } text-2xl block mt-2 hover:text-blue-200`}
            >
              My Profile
            </Link>
          </li>
          <li className="text-orange-900">
            <Link
              to="/reports"
              className={`${
                urlActual === "/reports"
                  ? "text-blue-300 underline"
                  : "text-white"
              } text-2xl block mt-2 hover:text-blue-200`}
            >
              Reports
            </Link>
          </li>
          <li className="text-orange-900">
            <Link
              to="/reports/create"
              className={`${
                urlActual === "/reports/create"
                  ? "text-blue-300 underline"
                  : "text-white"
              } text-2xl block mt-2 hover:text-blue-200`}
            >
              Create a Report
            </Link>
          </li>
          <button
            type="button"
            onClick={onLogout}
            className="m-auto text-white text-2xl block mt-4 hover:text-red-300 text-center bg-red-900 p-1 rounded-lg"
          >
            Logout
          </button>
        </ul>
        :
        <ul className="mt-5 list-disc list-outside px-5">
        <li className="text-orange-900">
            <Link
              to="/profile"
              className={`${
                urlActual === "/profile"
                  ? "text-blue-300 underline"
                  : "text-white"
              } text-2xl block mt-2 hover:text-blue-200`}
            >
              My Profile
            </Link>
          </li>
          <li className="text-orange-900">
            <Link
              to="/directors"
              className={`${
                urlActual === "/directors"
                  ? "text-blue-300 underline"
                  : "text-white"
              } text-2xl block mt-2 hover:text-blue-200`}
            >
              Directors
            </Link>
          </li>
          <li className="text-orange-900">
            <Link
              to="/directors/create"
              className={`${
                urlActual === "/directors/create"
                  ? "text-blue-300 underline"
                  : "text-white"
              } text-2xl block mt-2 hover:text-blue-200`}
            >
              Create a director
            </Link>
          </li>
          <li className="text-orange-900">
            <Link
              to="/jails"
              className={`${
                urlActual === "/jails"
                  ? "text-blue-300 underline"
                  : "text-white"
              } text-2xl block mt-2 hover:text-blue-200`}
            >
              Jails
            </Link>
          </li>
          <button
            type="button"
            onClick={onLogout}
            className="m-auto text-white text-2xl block mt-4 hover:text-red-300 text-center bg-red-900 p-1 rounded-lg"
          >
            Logout
          </button>
        </ul>
      }   
      </div>
      <div className="md:w-3/4 p-10 md:h-screen overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  );
};
