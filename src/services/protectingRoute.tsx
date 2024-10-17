import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface ProtectedRouteProps {
    userId: string;
    children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ userId, children }) => {
    if (userId === "") {
      return <Navigate to="/signin" replace />;
    }
    return children;
};

export default ProtectedRoute;