import * as actionTypes from './actionTypes'
import axios from 'axios'

export const getAllSuccess=(items)=>{
	return{
		type:actionTypes.FETCH_TRANSACTION_HEADERS_SUCCESS,
		payload:items
	}
}

export const getAllError=(error)=>{
	return{
		type:actionTypes.FETCH_TRANSACTION_HEADERS_ERROR,
		payload: error
	}
}
export const getIdSuccess=(item)=>{
	return{
		type:actionTypes.FETCH_TRANSACTION_HEADER_ID_SUCCESS,
		payload:item
	}
}
export const getIdError=(error)=>{
	return{
		type:actionTypes.FETCH_TRANSACTION_HEADER_ID_ERROR,
		payload:error
	}
}
export const getUserSuccess=(items)=>{
	return{
		type:actionTypes.FETCH_TRANSACTION_HEADERS_USER_SUCCESS,
		headers:items.headers,
		details:items.details
		
	}
}
export const getUserError=(error)=>{
	return{
		type:actionTypes.FETCH_TRANSACTION_HEADERS_USER_ERROR,
		payload:error
	}
}
export const createSuccess=(item)=>{
	return{
		type:actionTypes.ADD_TRANSACTION_HEADER_SUCCESS,
		payload:item
	}
}
export const createError=(error)=>{
	return{
		type:actionTypes.ADD_TRANSACTION_HEADER_ERROR,
		error:error
	}
}

export const editSuccess=(item)=>{
	
	return{
		type:actionTypes.EDIT_TRANSACTION_HEADER_SUCCESS,
		payload:item
	}
}

export const editError=(error)=>{
	return{
		type:actionTypes.EDIT_TRANSACTION_HEADER_ERROR,
		error:error
	}
}


export const getAll=()=>{
	return dispatch =>{
		axios.get(actionTypes.ROOT_URL+'/transactionHeaders')
			.then((response)=>{
				
				dispatch(getAllSuccess(response.data.data));
			}).catch((error)=>{
			
				dispatch(getAllError(error));
			});
	}

}
export const getUser=(id)=>{
	return dispatch=>{
		axios.get(actionTypes.ROOT_URL+'/transactionHeader/user/' +id)
		.then((response)=>{
		
			dispatch(getUserSuccess(response.data))
		}).catch((error)=>{
			dispatch(getUserError(error))
		})
	}
}
export const getDate=(data)=>{
	return {
		type:actionTypes.FETCH_TRANSACTION_HEADERS,
		startDate:data.startDate,
		endDate:data.endDate,
		user:data.user
		
		
  }
}

export const add=(data)=>{
	console.log(data)
	return dispatch =>{
		return axios({
			method:'POST',
			headers:{
				'Accept' : 'application/json',
				'Content-Type':'application/json'
			},
			url:actionTypes.ROOT_URL + '/transactionHeader',
			
			data:JSON.stringify(data)
		})
		.then(
			response => {
				console.log(response.data.data)
				dispatch(createSuccess(response.data.data));
		}).catch(
			error => {
				dispatch(createError(error));
		})
		}
	}

export const update=(data)=>{
	console.log(data)
	return dispatch=>{
		return axios({
			method:'PUT',
			url:actionTypes.ROOT_URL + '/transactionHeader/id/'+ data._id,
			headers:{
				'Accept' : 'application/json',
				'Content-Type':'application/json'
			},
			data:JSON.stringify(data)
		})
		.then(
			response=>{
			console.log(response.data.data)
			dispatch(editSuccess(response.data.data))
		}).catch(
			error => {
				dispatch(editError(error));
		})
      }
    }
 export const clear=()=>{

 	return{
 		type:actionTypes.NEW_TRANSACTION_HEADER
 	}
 }
 export const clearAll=()=>{
 	return{
 		type:actionTypes.CLEAR_TRANSACTION_HEADERS
 	}
 }





