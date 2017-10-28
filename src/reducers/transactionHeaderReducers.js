
const initialState={
	title:'Transcation Header',
	items:[],
	item:[],
	listItems:[],
	searchQuery:'',
	pagination:[],
	error:null,
	loading:false
}
function applyFilters(data,action){
	//check if filter by user
	let list=data
	if(action.user!==0){
		list=list.filter(d=>d.customer===action.user)
	}
	
	//check if startDate choosen
	if(action.startDate!==null){
		//if endDate is not choosen
		if(action.endDate===null){
		
			list=list.filter(p=>
				p.dateTransaction.slice(0,10)===action.startDate.format("YYYY-MM-DD")
			)
			
		//endDate is choosen	 
		}else{
		
			list=list.filter(p=>p.dateTransaction.slice(0,10)>=action.startDate.format("YYYY-MM-DD") && p.dateTransaction.slice(0,10)<=action.endDate.format("YYYY-MM-DD"))
		}
	}

	return list
}


export const transactionHeaderReducer=(state=initialState, action )=>{
	switch(action.type){
		case 'FETCH_TRANSACTION_HEADERS_SUCCESS':
			return Object.assign({},state,{
				items:action.payload,
				listItems:action.payload,
				pagination:{
					total:action.payload.length,
					size:5,
					totalPage:Math.ceil(action.payload.length/1)
				},
				error:null,
				loading:false
			});
		case 'FETCH_TRANSACTION_HEADERS_ERROR':
			return Object.assign({}, state,{
				items:[],
				listItems:[],
				error:action.error,
				loading:false
			});
		case 'FETCH_TRANSACTION_HEADERS':


			let list=applyFilters(state.listItems.map(i =>Object.assign({},i)),action)
		
			let lists=[]
			
			return Object.assign({}, state,{
				items:list,
				listItems:state.listItems,
				pagination:{
					total:state.listItems.length,
					size:5,
					totalPage:Math.ceil(state.listItems.length/5)
				},
				error:null,
				loading:false
			})
		case 'FETCH_TRANSACTION_HEADERS_USER_SUCCESS':
			let headers=action.headers
			let details=action.details
		
			let transactions=[]
			action.headers.forEach((h,i)=>{
				let d=details.filter(d=>d.header===h._id)

				let t={
					_id:h._id,
					dateTransaction:h.dateTransaction,
					total:h.total,
					customer:h.customer._id,
					status:h.status, 
					details:details.filter(d=>d.header===h._id)
				}
				transactions.push(t)
			})
			return Object.assign({},state,{
				items:transactions,
				listItems:transactions,
				pagination:{
					total:transactions.length,
					size:5,
					totalPage:Math.ceil(transactions.length/5)
				},
				error:null,
				loading:false
			})
		case 'FETCH_TRANSACTION_HEADERS_USER_ERROR':
			return Object.assign({}, state,{
				items:[],
				listItems:[],
				error:action.error,
				loading:false
			})
		
		case 'FETCH_TRANSACTION_HEADER_ID_SUCCESS':
	
			return Object.assign({},state,{
				item: action.payload,
				error:null,
				loading:false

			})
		case 'FETCH_TRANSACTION_HEADER_ID_ERROR':
		
			return Object.assign({},state,{
				item: [],
				error:action.error,
				loading:false

			})	
		
		case 'ADD_TRANSACTION_HEADER_SUCCESS':
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
		case 'ADD_TRANSACTION_HEADER_ERROR':
			return Object.assign({}, state,{
				error:action.error
			})
		
		case 'EDIT_TRANSACTION_HEADER_SUCCESS':
			let updated=state.listItems.filter(i=>i._id!==action.payload._id)
			updated.push(action.payload)
			return Object.assign({},state,{
				item:action.payload,
				items:updated,
				listItems:updated,
				error:null,
				loading:false
			})
		case 'EDIT_TRANSACTION_HEADER_ERROR':
			return Object.assign({}, state,{
				error:action.error
			})
		case 'DELETE_TRANSACTION_HEADER_SUCCESS':
			let deleted=state.listItems.filter(i=> i._id!==action.id)
			return Object.assign({},state,{
				items:deleted,
				listItems:deleted,
				item:[],
				pagination:{
					total:state.listItems.length,
					size:5,
					totalPage:Math.ceil(state.listItems.length/5)
				},
				error:null,
				loading:false
			})
		case 'DELETE_TRANSACTION_HEADER_ERROR':
			return Object.assign({}, state,{
				error:action.error
			})
		case 'NEW_TRANSACTION_HEADER':
			return Object.assign({},state,{
				item:initialState.item
			})
		case 'CLEAR_TRANSACTION_HEADERS':
			return Object.assign({},state, initialState)
		default:
			return state;
	}
}
