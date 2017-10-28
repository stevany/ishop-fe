import * as actionTypes from './actionTypes'
import axios from 'axios'
import Base64 from '../utils/Base64'

export const getAllSuccess=(items)=>{

	return{
		
		type:actionTypes.FETCH_USERS_SUCCESS,
		payload:items
	}
}

export const getAllError=(error)=>{
	
	return{
		
		type:actionTypes.FETCH_USERS_ERROR,
		payload: error
	}
}

export const createSuccess=(item)=>{
	return{
		type:actionTypes.ADD_USER_SUCCESS,
		payload:item
	}
}
export const createError=(error)=>{
	return{
		type:actionTypes.ADD_USER_ERROR,
		error:error
	}
}
export const editSuccess=(item)=>{
	return{
		type:actionTypes.EDIT_USER_SUCCESS,
		payload:item
	}
}
export const loginSuccess=(item)=>{
	return{
		type:actionTypes.LOGIN_SUCCESS,
		payload:item
	}
}
export const loginError=(error)=>{
	return{
		type:actionTypes.LOGIN_FAILED,
		error:error
	}
}
export const editError=(error)=>{
	return{
		type:actionTypes.EDIT_USER_ERROR,
		error:error
	}
}


export const getAll=()=>{
	return dispatch =>{
		axios.get(actionTypes.ROOT_URL+"/users")
			.then((response)=>{
		
				dispatch(getAllSuccess(response.data.data));
			}).catch((error)=>{
			
				dispatch(getAllError(error));
			});
	}

}

export const getId=(id)=>{

	return {
		type:actionTypes.FETCH_USER_ID,
		id: id
    }

}

export const add=(data)=>{
	return dispatch =>{
		data.password=Base64.encode(data.password)
		return axios({
			method:'POST',
			headers:{
				'Accept' : 'application/json',
				'Content-Type':'application/json'
			},
			url:actionTypes.ROOT_URL + '/user',
			
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

export const update=(data)=>{
	return dispatch=>{
		data.password=Base64.encode(data.password)
	
		return axios({
			method:'PUT',
			url:actionTypes.ROOT_URL + '/user/id/'+ data._id,
			headers:{
				'Accept' : 'application/json',
				'Content-Type':'application/json'
			},
			data:JSON.stringify(data)
		})
		.then(
			response=>{

			dispatch(editSuccess(response.data.data))
		}).catch(
			error => {

				dispatch(editError(error));
		})
      }
    }

export const login=(data)=>{
	return dispatch=>{
	
		return axios.get(actionTypes.ROOT_URL+'/user/name/' + data.username)
			.then(response => {
				let client=response.data.data
				
				const logg=Base64.decode(client[0].password)===data.password?true:false
			
				client[0].password=''
				if(logg){
					dispatch(loginSuccess(client[0]))
				}else{
					dispatch(loginError(response.data.error))
				}
				
			})
			 .catch(function (error) {
			 	dispatch(loginError(error))
		
			 })	
	}	
}

 export const clear=()=>{

 	return{
 		type:actionTypes.NEW_USER
 	}
 }
 export const clearAll=()=>{
 	return{
 		type:actionTypes.CLEAR_USERS
 	}
 }
export const logout=()=>{
	return{
		type:actionTypes.LOGOUT_SUCCESS
	}
}



