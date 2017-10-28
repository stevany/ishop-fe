import * as actionTypes from './actionTypes'
import axios from 'axios'

export const getAllSuccess=(items)=>{
	return{
		type:actionTypes.FETCH_TRANSACTION_DETAILS_SUCCESS,
		payload:items
	}
}

export const getAllError=(error)=>{
	return{
		type:actionTypes.FETCH_TRANSACTION_DETAILS_ERROR,
		payload: error
	}
}
export const createSuccess=(item)=>{
	return{
		type:actionTypes.ADD_TRANSACTION_DETAIL_SUCCESS,
		payload:item
	}
}
export const createError=(error)=>{
	return{
		type:actionTypes.ADD_TRANSACTION_DETAIL_ERROR,
		error:error
	}
}


export const getAll=(id)=>{
	
	return dispatch =>{
		axios.get(actionTypes.ROOT_URL+'/transactionHeader/id/'+id +'/details')
			.then((response)=>{
	
				dispatch(getAllSuccess(response.data.data));
			}).catch((error)=>{
			
				dispatch(getAllError(error));
			});
	}

}

export const add=(data, id, code)=>{

	let url=actionTypes.ROOT_URL+'/transactionHeader/id/'+id+'/detail'
	if(code===0){
		url=url + 's' 
	}

	return dispatch =>{
		return axios({
			method:'POST',
			headers:{
				'Accept' : 'application/json',
				'Content-Type':'application/json'
			},
			url: url,
			
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
 
 	return{
 		type:actionTypes.NEW_TRANSACTION_DETAIL
 	}
 }
 export const clearAll=()=>{
 	return{
 		type:actionTypes.CLEAR_TRANSACTION_DETAILS
 	}
 }





