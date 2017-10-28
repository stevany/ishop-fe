
const initialState={
	title:'User',
	
	item:[],
	currentUser:{
		_id:0,
		username:'',
		password:'',
		isMaster:false,
		isTransaction:false,
		isAdmin:false,
		},
	isLogin:false,
	

	error:null,
	loading:false
}



export const userReducer=(state=initialState, action)=>{
	switch(action.type){
		
		case 'FETCH_USER_ID':
			return Object.assign({},state,{
				item: state.items.filter(i=>i._id===action.id)[0],
				error:null,
				loading:false

			})
		case 'LOGIN_SUCCESS':
		let user={...initialState.currentUser}
		user._id=action.payload._id
		user.username=action.payload.username
		user.name=action.payload.name
		user.password=''
		for(let i=0; i<action.payload.roles.length; i++){
			const role=action.payload.roles[i].name
			
			
			switch(role){
				case "admin": user.isAdmin=true;break;
				case "master": user.isMaster=true;break;
				case "transaction" : user.isTransaction=true;break;
			}
		}
			return Object.assign({},state,{
				item:{},
				items:[],
				listItems:[],
				currentUser:user,
				isLogin:true,
				error:null,
				loading:false,

			})
		case 'LOGIN_FAILED':
			return Object.assign({},state,initialState)
		case 'LOGOUT_SUCCESS':
			return Object.assign({},state,initialState)

		case 'ADD_USER_SUCCESS':
			return Object.assign({},state,{
				item:action.payload,
				items:state.listItems.concat(action.payload),
				listItems:state.listItems.concat(action.payload),
				pagination:{
					total:state.listItems.length,
					size:5,
					totalPage:Math.ceil(state.listItems.length/5)
				},
				error:null,
				loading:false
			})
		case 'ADD_USER_ERROR':
			return Object.assign({}, state,{
				error:action.error
			})
		case 'EDIT_USER_SUCCESS':
			let updated=state.listItems.filter(i=>i._id!==action.payload._id)
			updated.push(action.payload)
			return Object.assign({},state,{
				item:action.payload,
				items:updated,
				listItems:updated,
				error:null,
				loading:false
			})
		case 'EDIT_USER_ERROR':
			return Object.assign({}, state,{
				error:action.error
			})
		
		case 'NEW_USER':
			return Object.assign({},state,{
				item:initialState.item
			})
		
		default:
			return state;
	}
}
