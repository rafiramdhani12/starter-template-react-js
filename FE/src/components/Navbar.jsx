import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/" || location.pathname === "/register";

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <NavLink to="/dashboard" className="btn btn-ghost text-xl">
          BENGKEL DJAWA{" "}
        </NavLink>
      </div>
      {!isAuthPage && (
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink to={"/dashboard/items-page"}>Barang</NavLink>
            </li>
            <li>
              <a>Transaksi</a>
            </li>
            <li>
              <a>Pegawai</a>
            </li>
            <li>
              <a>Laporan</a>
            </li>
            <li>
              <a>logout</a>
            </li>
          </ul>
        </div>
      )}
      {/* {isAuthPage && (
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            {location.pathname === "/" ? (
              <li>
                <NavLink to="/register">Register</NavLink>
              </li>
            ) : (
              <li>
                <NavLink to="/">Login</NavLink>
              </li>
            )}
          </ul>
        </div>
      )} */}
    </div>
  );
};

export default Navbar;
