
import React, { useRef, useEffect } from "react";
import LogoutBtn from "./LogoutBtn";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import Logo from "../Logo";
import Search from "../Search";

function Header() {
  const authStatus = useSelector((state) => state.auth.authStatus);

  const navItems = [
    {
      name: "Dashboard",
      slug: "/dashboard",
      active: authStatus,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
  ];

  return (
    <div className="w-full h-[80px] border-b-2 border-white dark:border-red-600 flex justify-between items-center px-8 font-bold">
      <Link to="/dashboard">
        <Logo />
      </Link>
      <div className="flex justify-center items-center gap-6">
        <Search />
        <ul className="flex gap-6 justify-center items-center">
          {navItems.map(
            (item) =>
              item.active && (
                <li key={item.name}>
                  <NavLink
                    to={item.slug}
                    className={({ isActive }) =>
                      `hover:text-[#fff] hover:bg-[#16A34A]  p-2 px-3 rounded-full text-black ${isActive ? "text-[#16A34A]" : "text-black"}`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              )
          )}

          {authStatus && (
            <li>
              <LogoutBtn className="rounded-full text-black  hover:text-[#fff] hover:bg-[#16A34A]">
                Logout
              </LogoutBtn>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Header;
