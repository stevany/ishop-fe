
const initialState={
	title:'Transcation Detail',
	items:[],
	item:[],
	listItems:[]
	
	error:null,
	loading:false
}
function applyFilters(name,items){
	return items.filter(i => i.name.toLowerCase().match(name.toLowerCase()))
}

export const transactionDetailReducer=(state=initialState, action )=>{
	switch(action.type){
		case 'FETCH_TRANSACTION_DETAILS_SUCCESS':

			return Object.assign({},state,{
				items:action.payload,
				listItems:action.payload,
				
				error:null,
				loading:false
			})
		case 'FETCH_TRANSACTION_DETAILS_ERROR':
			return Object.assign({}, state,{
				items:[],
				listItems:[],
				error:action.error,
				loading:false
			})
		case 'ADD_TRANSACTION_DETAIL_SUCCESS':
			return Object.assign({},state,{
				item:action.payload,
				items:state.items.concat(action.payload),
				listItems:state.listItems.concat(action.payload),
				pagination:{
					total:state.listItems.length,
					size:5,
					totalPage:Math.ceil(state.listItems.length/5)
				},
				error:null,
				loading:false
			})
		case 'ADD_TRANSACTION_DETAIL_ERROR':
			return Object.assign({}, state,{
				error:action.error
			})
		
		case 'NEW_TRANSACTION_DETAIL':
			return Object.assign({},state,{
				item:initialState.item
			})
		case 'CLEAR_TRANSACTION_DETAILS':
			return Object.assign({},state, initialState)
		default:
			return state;
	}
}
