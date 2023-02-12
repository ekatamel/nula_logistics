import React from "react";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import { Dashboard } from "./dashboard/Dashboard";
import { ProductPage } from "./product/ProductPage";
import { SupplierPage } from "./supplier/SupplierPage";
import { WarehousePage } from "./warehouse/WarehousePage";
import { QueryClient, QueryClientProvider } from "react-query";

const App = () => {
    const queryClient = new QueryClient();
    const router = createBrowserRouter(
        createRoutesFromElements([
            <Route path="/" element={<Dashboard />} />,
            <Route path="/products" element={<ProductPage />} />,
            <Route path="/suppliers" element={<SupplierPage />} />,
            <Route path="/warehouses" element={<WarehousePage />} />,
        ])
    );

    return (
        <React.StrictMode>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </React.StrictMode>
    );
};

export default App;

// import React, { useState } from "react";

// export interface IUser {
//     name: string;
//     age: number;
// }
// const App = () => {
//     const [users, setUsers] = useState<IUser[]>([
//         {
//             name: "Bijaya",
//             age: 25,
//         },
//         {
//             name: "Ram",
//             age: 25,
//         },
//     ]);

//     return (
//         <div>
//             <h1>Users list</h1>
//             <ul>
//                 {users.map((user: IUser) => {
//                     return (
//                         <li key={user.name}>
//                             {user.name} is {user.age} years old
//                         </li>
//                     );
//                 })}
//             </ul>
//         </div>
//     );
// };

// export default App;
