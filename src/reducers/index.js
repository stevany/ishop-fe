import { combineReducers } from 'redux';

import {groupReducer} from './groupReducers'
import {userReducer} from './userReducers'
import {roleReducer} from './roleReducers'
import {productReducer} from './productReducers'
import {cartReducer} from './cartReducers'
import {transactionHeaderReducer} from './transactionHeaderReducers'
import {transactionDetailReducer} from './transactionDetailReducers'
import {historyReducer} from './historyReducers'

export default combineReducers({
	
	group:groupReducer,
	user:userReducer,
	role:roleReducer,
	product:productReducer,
	cart:cartReducer,
	transactionHeader:transactionHeaderReducer,
	transactionDetail:transactionDetailReducer,
	history:historyReducer


});