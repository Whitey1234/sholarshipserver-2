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
import ManageUsers from "../Page/ManageUsers/ManageUsers";
import ModeratorDashboardLayout from "../Dashboard/Moderetor Dashboard/ModeratorDashboardLayout";
import MyProfile from "../Page/moderetor/Moderetor Profile/MyProfile";
import ManageScholarshipMod from "../Page/moderetor/ManageScholarshipMod";
import AllReviewmod from "../Page/moderetor/AllReviewmod";
import AplidScholarshipMod from "../Page/moderetor/AplidScholarshipMod";
import AddSholarshipMod from "../Page/moderetor/AddSholarshipMod";
import PrivateAdminRoute from "../private/PrivateAdminRoute";
import PrivateModRoute from "../private/PrivateModRoute";





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
         element: <PrivateRoute> <ApplyScholarship /> </PrivateRoute> 
          
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
    element: <PrivateAdminRoute> <AdminDashboard/> </PrivateAdminRoute> ,
    children: [
      {
        index : true,
        element: <PrivateAdminRoute> <AdminProfile/></PrivateAdminRoute>
      },
      {
        path:"/admin-dashboard/aaddsclorship",
        element:  <PrivateAdminRoute><AddScholarship></AddScholarship></PrivateAdminRoute>
      },
      {
        path: "/admin-dashboard/manage-scholarship",
        element:   <ManageScholarships/> 
      },
      {
        path: "/admin-dashboard/manage-applied-application",
        element: <PrivateAdminRoute> <ManagedAppliedScholarships/>  </PrivateAdminRoute> 
      },
      {
        path: "/admin-dashboard/manage-users",
        element:  <PrivateAdminRoute> <ManageUsers/> </PrivateAdminRoute> 
      },
      {
        path: "/admin-dashboard/manage-review",
        element:  <PrivateAdminRoute> <ManageReviews/> </PrivateAdminRoute>   
      }
    ]
  },
  {
    path : '/user-dashboard',
    element :<PrivateRoute>  <UserDashBoard/> </PrivateRoute> ,
    children:[
      {
        index: true, // default route for /dashboard
        element: <PrivateRoute> <UserProfile /></PrivateRoute> ,
      },
      {
        path: '/user-dashboard/applications',
        element: <PrivateRoute> <MyApplications/></PrivateRoute>,
      },
      {
        path: '/user-dashboard/reviews',
        element: <PrivateRoute><MyReviews/> </PrivateRoute> ,
      },

    ]
  },
  {
  path: '/moderetor-dashboard',
  element :<PrivateModRoute> <ModeratorDashboardLayout/></PrivateModRoute>,
  children:[
    {
      index : true,
      element : <PrivateModRoute><MyProfile/></PrivateModRoute>
    },
{
  path: 'manage-scholarshipsmod',
  element: <PrivateModRoute> <ManageScholarshipMod/> </PrivateModRoute>
},
{
  path:'allreview',
  element : <PrivateModRoute> <AllReviewmod/> </PrivateModRoute>  
},
{
path:'applied-scholarships',
  element : <PrivateModRoute><AplidScholarshipMod/></PrivateModRoute>  
},
{
  path:'addscholarship',
  element :<PrivateModRoute> <AddSholarshipMod/> </PrivateModRoute>
}

  ]


  }
]);