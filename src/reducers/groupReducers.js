
const initialState={
	title:'Group',
	items:[],
	
	listItems:[],
	error:null,
	loading:false
}
export const groupReducer=(state=initialState, action)=>{
	switch(action.type){
		case 'FETCH_GROUPS_SUCCESS':
			return Object.assign({},state,{
				items:action.payload,
				listItems:action.payload,
				error:null,
				loading:false
			});
		case 'FETCH_GROUPS_ERROR':
			return Object.assign({}, state,{
				items:[],
				listItems:[],
				error:action.error,
				loading:false
			});
		
	
	
		default:
			return state;
	}
}
