
const initialState={
	title:'Product',
	items:[],
	item:[],
	listItems:[],
	error:null,
	loading:false
}


export const productReducer=(state=initialState, action )=>{
	switch(action.type){
		case 'FETCH_PRODUCTS_SUCCESS':
			return Object.assign({},state,{
				items:action.payload,
				listItems:action.payload,
				error:null,
				loading:false
			});
		case 'FETCH_PRODUCTS_ERROR':
			return Object.assign({}, state,{
				items:[],
				listItems:[],
				error:action.error,
				loading:false
			});
		
		case 'FETCH_PRODUCT_ID_SUCCESS':
			
			return Object.assign({},state,{
				item: action.payload,
				error:null,
				loading:false

			})
		case 'FETCH_PRODUCT_ID_ERROR':
		
			return Object.assign({},state,{
				item: [],
				error:action.error,
				loading:false

			})	
		default:
			return state;
	}
}
