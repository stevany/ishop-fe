
const initialState={
	title:'Cart',
	items:[],
	item:[],
	listItems:[],

	error:null,
	loading:false
}

export const cartReducer=(state=initialState, action)=>{
	switch(action.type){
		case 'FETCH_CARTS':
			return Object.assign({},state,{
				
				error:null,
				loading:false
			});
		case 'ADD_CART':
			let carts=state.items.filter(carts=> carts._id!==action.payload._id).map(carts=>Object.assign({},carts))
			carts.push(action.payload)

			return Object.assign({},state,{
				item:action.payload,
				items:carts,
				listItems:carts,
				
				error:null,
				loading:false
			})
		
		case 'DELETE_CART':
			let deleted=state.listItems.filter(i=> i._id!==action.id)
			return Object.assign({},state,{
				items:deleted,
				listItems:deleted,
				item:[],
				error:null,
				loading:false
			})
		
		case 'NEW_CART':
			return Object.assign({},state,initialState)
		
		default:
			return state;
	}
}
