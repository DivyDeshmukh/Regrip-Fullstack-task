import React from 'react'
import { useNavigate } from 'react-router-dom';
import {useDispatch} from "react-redux";
import {logout} from "../../features/authSlice";
import api from '../../api/api';
import {toast} from "react-toastify";

function LogoutBtn({children, className}) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = async() => {
      try {
          const response = await api.get("/logout");
          if (response) {
            dispatch(logout());
            navigate("/login");
          }
      } catch (error) {
          toast.error("Failed to logout the user");
      }
    }

  return (
    <button onClick={handleClick} className={`${className} px-3 p-2`}>
        {children}
    </button>
  )
}

export default LogoutBtn;


