import * as actionTypes from './actionTypes'
import axios from 'axios'

export const getAllSuccess=(items)=>{
	return{
		type:actionTypes.FETCH_GROUPS_SUCCESS,
		payload:items
	}
}

export const getAllError=(error)=>{
	return{
		type:actionTypes.FETCH_GROUPS_ERROR,
		payload: error
	}
}


export const getAll=()=>{
	return dispatch =>{

		axios.get(actionTypes.ROOT_URL+"/groups")
			.then((response)=>{

				dispatch(getAllSuccess(response.data.data));
			}).catch((error)=>{
		
				dispatch(getAllError(error));
			});
	}

}




