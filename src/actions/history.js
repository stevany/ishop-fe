import * as actionTypes from './actionTypes'
import axios from 'axios'

export const createSuccess=(item)=>{
	return{
		type:actionTypes.ADD_HISTORY_SUCCESS,
		payload:item
	}
}
export const createError=(error)=>{
	return{
		type:actionTypes.ADD_HISTORY_ERROR,
		error:error
	}
}


export const add=(data)=>{

	return dispatch =>{
		return axios({
			method:'POST',
			headers:{
				'Accept' : 'application/json',
				'Content-Type':'application/json'
			},
			url:actionTypes.ROOT_URL + '/product/history',
			
			data:JSON.stringify(data)
		})
		.then(
			response => {
			
				dispatch(createSuccess(response.data.data));
		}).catch(
			error => {
				dispatch(createError(error));
		})
		}
	}
 export const clear=()=>{
 	console.log('newww')
 	return{
 		type:actionTypes.NEW_HISTORY
 	}
 }





