import {
  createBrowserRouter,
  
} from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Componenet/Home/Home";
import SignUp from "../Componenet/SignUp/SignUp";
import Register from "../Page/Register/Register";
import Login from "../Page/Login/Login";
import AddScholarship from "../Page/AddScolarship/AddScholarship";
import AdminDashboard from "../Dashboard/AdminDashBoard/AdminDashboard";
import AllScholarship from "../Page/AllScholarship/AllScholarship";
import axiosSecure from "../Hooks/useAxiosSecure";
import ScholarshipDetails from "../Page/DetailsScholarshipDetaila/ScholarshipDetails";
import PrivateRoute from "../private/PrivateRoute";
import ApplyScholarship from "../Page/ApplyScholarship/ApplyScholarship";
import PaymentPage from "../Page/PaymentPage/PaymentPage";
import UserDashBoard from "../Dashboard/userDashBoard/UserDashBoard";
import UserProfile from "../Page/userPofile/UserProfile";
import MyApplications from "../Page/userMyApllication/MyApplications";
import MyReviews from "../Page/MyReviews/MyReviews";
import AdminProfile from "../Page/AdminProfile/AdminProfile";
import ManageScholarships from "../Page/ManageScholarships/ManageScholarships";
import ManagedAppliedScholarships from "../Page/ManagedAppliedScholarship/ManagedAppliedScholarship";
import ManageReviews from "../Page/ManageReviews/ManageReviews";




const scholarshipLoader = async () => {
  
  const res = await axiosSecure.get('/scholarships');
  return res.data;
};
 export const router = createBrowserRouter([
 
  {
    path: "/",
     element : <RootLayout/>,
     children : [
        {
            index : true,
            element : <Home/>
        },
        {
          path:'/all-scholarship',
          loader :scholarshipLoader,
          element: <AllScholarship/>
        },
        {
           path:'/scolarship-details/:id',
          loader :scholarshipLoader,
          element: <PrivateRoute><ScholarshipDetails/></PrivateRoute>
        },
        {
          
  path: "/apply/:id",
  loader: async ({ params }) => {
    const res = await axiosSecure.get(`/scholarships`);
    return res.data.find((item) => item._id === params.id);
  },
         element: <ApplyScholarship />
          
        },
        {
       path: '/payment/:id',
  //      loader: async ({ params }) => {
  //   const res = await axiosSecure.get(`/get-applied-scholarships`);
  //   console.log('params.id:', params.id);
  // console.log('Available IDs:', res.data.map(item => item._id));
  
  //     console.log('Fetched scholarships:', res.data); // 
  //   return res.data.find((item) => item._id === params.id);
  // },
       element: <PrivateRoute><PaymentPage /></PrivateRoute> // protect if needed
        },
        
      
        {
            path: "/signup",
            element :<Register/>
        },
        {
            path : '/login',
            element: <Login/>
        }
     ]
  },
  {
    path: "/admin-dashboard",
    element: <PrivateRoute> <AdminDashboard/></PrivateRoute> ,
    children: [
      {
        index : true,
        element: <PrivateRoute> <AdminProfile/></PrivateRoute>
      },
      {
        path:"/admin-dashboard/aaddsclorship",
        element:  <PrivateRoute><AddScholarship></AddScholarship></PrivateRoute>
      },
      {
        path: "/admin-dashboard/manage-scholarship",
        element: <ManageScholarships/>
      },
      {
        path: "/admin-dashboard/manage-applied-application",
        element: <ManagedAppliedScholarships/>
      },
      {
        path: "manage-users",
        element: <h1></h1>
      },
      {
        path: "/admin-dashboard/manage-review",
        element:<ManageReviews/>
      }
    ]
  },
  {
    path : '/user-dashboard',
    element :<PrivateRoute>  <UserDashBoard/> </PrivateRoute> ,
    children:[
      {
        index: true, // default route for /dashboard
        element: <UserProfile />,
      },
      {
        path: '/user-dashboard/applications',
        element: <MyApplications/>,
      },
      {
        path: '/user-dashboard/reviews',
        element: <MyReviews />,
      },

    ]
  }
]);