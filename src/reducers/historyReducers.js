
const initialState={
	title:'History',
	items:[],
	item:[],
	listItems:[],
	
	error:null,
	loading:false
}

export const historyReducer=(state=initialState, action )=>{
	switch(action.type){
		case 'FETCH_HISTORY_SUCCESS':
			return Object.assign({},state,{
				items:action.payload,
				listItems:action.payload,
				error:null,
				loading:false
			});
		case 'FETCH_HISTORY_ERROR':
			return Object.assign({}, state,{
				items:[],
				listItems:[],
				error:action.error,
				loading:false
			});
	
		
		case 'ADD_HISTORY_SUCCESS':
			return Object.assign({},state,{
				item:action.payload,
				items:state.items.concat(action.payload),
				listItems:state.listItems.concat(action.payload),
				
				error:null,
				loading:false
			})
		case 'ADD_HISTORY_ERROR':
			return Object.assign({}, state,{
				error:action.error
			})
		
		case 'NEW_HISTORY':
			return Object.assign({},state,{
				item:initialState.item
			})
		
		default:
			return state;
	}
}
