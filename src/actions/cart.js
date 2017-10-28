import * as actionTypes from './actionTypes'


export const getAll=()=>{
	return{
		type:actionTypes.FETCH_CARTS,
	
	}

}

export const add=(data)=>{
	return{
		type:actionTypes.ADD_CART,
		payload:data
	}
			
	}

export const del=(id)=>{
	return {
		type:actionTypes.DELETE_CART,
		id:id
			
     }
 }
 
 export const clear=()=>{

 	return{
 		type:actionTypes.NEW_CART
 	}
 }
 
 




