import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function AuthProtected({children}) {
    const authStatus = useSelector(state => state.auth.authStatus);
    const navigate = useNavigate();

    useEffect(() => {
        if (!authStatus) {
            navigate("/login");
        }
    }, [authStatus]);

  return (
    <>
      {authStatus ? children : null}
    </>
  );
}

export default AuthProtected;
