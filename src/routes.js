import React  from 'react';
import {Route, IndexRoute, Router, browserHistory} from 'react-router';
import HomePage from './components/cart/HomePage'
import About from './components/common/AboutPage'
import HomePage from './components/cart/HomePage'
import ProductView from './components/product/ProductView'
import CartPage from './components/cart/CartPage'
import TransactionView from './components/transaction/TransactionView'
import Login from './components/user/Login'

import App from './containers/App'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}></IndexRoute>
    <Route path="/about" component={About}></Route>
    <Route path="/login" component={Login}></Route>
 	<Route path="/users" component={UserPage}></Route>
 	<Route path="/register" component={UserPage}></Route>
 	<Route path="/products/view/id/:id" component={ProductView}></Route>
 	<Route path="/cart" component={CartPage}></Route>
 	<Route path="/transaction/view" component={TransactionView}></Route>
  </Route>
)
