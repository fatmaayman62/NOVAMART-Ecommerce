import { useEffect, useState } from 'react' 
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LayOut from './Components/LayOut'
import Home from './Pages/Home'
import Brands from './Pages/Brands'
import Products from './Pages/Products'
import Categories from './Pages/Categories'
import WishList from './Pages/WishList'
import Cart from './Pages/Cart'
import useCartStore from './Store/cartStore'
import useTokenStore from './Store/authTokenStore'
import LayOutAuth from './Components/LayOutAuth'
import Register from './Pages/Register'
import Login from './Pages/Login'
import useWishListStore from './Store/wishListStore'
import ProtectedRouting from './ProtectedRouting/ProtectedRouting'
import ProtectedAuth from './ProtectedRouting/ProtectedAuth'
import AllOrders from './Pages/AllOrders'


const router=createBrowserRouter([
  {
    path:'',element:<LayOut/>,children:[
      {index:true,element:<ProtectedRouting><Home/></ProtectedRouting>},
      {path:'/',element:<ProtectedRouting><Home/></ProtectedRouting>},
      {path:'products',element:<ProtectedRouting><Products/></ProtectedRouting>},
      {path:'brands',element:<ProtectedRouting><Brands/></ProtectedRouting>},
      {path:'categories',element:<ProtectedRouting><Categories/></ProtectedRouting>},
      {path:'wishList',element:<ProtectedRouting><WishList/></ProtectedRouting>},
      {path:'cart',element:<ProtectedRouting><Cart/></ProtectedRouting>},
      {path:'allorders',element:<ProtectedRouting><AllOrders/></ProtectedRouting>},
    ],
  
  },{
      path:'',element:<LayOutAuth/>,children:[
      {path:'register',element: <ProtectedAuth><Register/></ProtectedAuth> },
      {path:'login',element: <ProtectedAuth><Login/></ProtectedAuth> },
    ],
  }
])
function App() {
  const tokenAuth = useTokenStore((state) => state?.token); 
  
  const getData=useWishListStore((state)=>state?.getData);

  const getCart = useCartStore((state) => state?.getCart); 
  useEffect(() => { 
    const getCartOfProduct = async () => {
      await getCart(tokenAuth);
    };
        const fetchWishlist = async () => {
      try {
        await getData();
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
    getCartOfProduct();
  }, []); 


  return (
    <RouterProvider router={router}>

    </RouterProvider>
  )
}

export default App
