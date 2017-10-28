
const initialState={
	title:'Role',
	items:[],

	listItems:[],
	
	error:null,
	loading:false
}

export const roleReducer=(state=initialState, action)=>{
	switch(action.type){
		case 'FETCH_ROLES_SUCCESS':
			return Object.assign({},state,{
				items:action.payload,
				listItems:action.payload,
				
				error:null,
				loading:false
			});
		case 'FETCH_ROLES_ERROR':
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
