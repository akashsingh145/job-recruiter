import { Navigate, Outlet, useLocation } from "react-router-dom";
import {useSelector} from "react-redux"

function ProtectedRoute({ allowedRoles }) {

  // redux se user data
  const reduxUser =useSelector((state)=>state.user.user)

  const location = useLocation();

  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user");

  if (!token || !userData) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  let storedUser;

  try {
    storedUser = JSON.parse(userData);
  } catch (error) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    return <Navigate to="/login" replace />;
  }
  // redux se data lenge agr uske paas data nhi h to 
  // localStorage se le lenge
  const user = reduxUser||storedUser

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;