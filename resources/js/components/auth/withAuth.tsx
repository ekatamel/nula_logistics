// import React, { useContext } from "react";
// import { UserContext } from "../auth/UserContext";
// import { Navigate } from "react-router-dom";

// export const withAuth = (Component) => {
//     return function AuthenticatedComponent(props) {
//         const { userData } = useContext(UserContext);

//         if (!userData) {
//             return <Navigate to="/login" />;
//         }

//         return <Component {...props} />;
//     };
// };
