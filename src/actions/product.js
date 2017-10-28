import * as actionTypes from './actionTypes'
import axios from 'axios'

export const getAllSuccess=(items)=>{
	return{
		type:actionTypes.FETCH_PRODUCTS_SUCCESS,
		payload:items
	}
}

export const getAllError=(error)=>{
	return{
		type:actionTypes.FETCH_PRODUCTS_ERROR,
		payload: error
	}
}


export const getIdSuccess=(item)=>{
	return{
		type:actionTypes.FETCH_PRODUCT_ID_SUCCESS,
		payload:item
	}
}
export const getIdError=(error)=>{
	return{
		type:actionTypes.FETCH_PRODUCT_ID_ERROR,
		payload:error
	}
}
export const getAll=()=>{
	return dispatch =>{
		axios.get(actionTypes.ROOT_URL+"/products")
			.then((response)=>{
				
				dispatch(getAllSuccess(response.data.data));
			}).catch((error)=>{
			
				dispatch(getAllError(error));
			});
	}

}


export const getId=(id)=>{
	
	return dispatch=>{
		axios.get(actionTypes.ROOT_URL+"/product/id/" +id )
		.then((response)=>{
			dispatch(getIdSuccess(response.data.data))
		}).catch((error)=>{
			dispatch(getIdError(error))
		})
		
    }

}

export const getName=(data)=>{
	return {
		type:actionTypes.FETCH_PRODUCTS_NAME,
		name:data.name,
		group:data.group
  }
}

export const updateStock=(data)=>{

	return dispatch=>{
		return axios({
			method:'PUT',
			url:actionTypes.ROOT_URL + '/product/id/'+ data._id +'/updateStock/'+data.qty,
			headers:{
				'Accept' : 'application/json',
				'Content-Type':'application/json'
			},
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





