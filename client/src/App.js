import React from 'react'
import './App.css'
 import Header from './Components/Header'
import Home from './Pages/Home'
import Product from './Components/Product'
import Cart from './Components/Cart'
import Shop from './Components/Shop'
import SignUp from './Pages/SignUp'
import SignIn from './Pages/SignIn'
import UserProfile from './Pages/UserProfile'
import VendeurProfile from './Pages/VendeurProfile'
import AdminRoute from './ProtectRoutes/AdminRoute'
import UserRoute from './ProtectRoutes/UserRoute'
import {BrowserRouter as Router,Switch , Route} from 'react-router-dom'
import EditProduct from './Components/VendeurViews/EditProduct'
import Order from './Pages/Order'


const App = () => {
 return(
  <Router>
    <Header /> 
    <main>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/shop' exact component={Shop} />
        <Route path='/signup' exact component={SignUp} />
        <Route path='/signin' exact component={SignIn} />
        <Route path='/product/:productId' exact component={Product} />
        <Route path='/cart' exact component={Cart} />
        <Route path='/order' exact component={Order} />
        <AdminRoute  path='/admin/dashboard' component={VendeurProfile} />
        <AdminRoute  path='/admin/edit/product/:productId' component={EditProduct} />
        <UserRoute  path='/user/:userId' component={UserProfile} />
      </Switch>
    </main>
  </Router>
 ) 
}

export default App
