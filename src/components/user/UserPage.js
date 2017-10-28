import React from 'react';
import {connect} from 'react-redux';
import * as userActions from '../../actions/user';
import * as roleActions from '../../actions/role';
import PropTypes from 'prop-types'
import {browserHistory} from 'react-router'; //for go to url
import {Icon,Table, Header, Segment, Button, Popup, Menu, Label} from 'semantic-ui-react'

import Form from './UserForm';
import Control from './UserControl';

class UserPage extends React.Component{
	constructor(props){
		super(props);
		this.state={
			isEdit:false,
		
			listRoles:[],
			
			
			query:'',
			queryRole:'',
			
			user:{
				_id:0,
				name:'',
				password:'',
				address:'',
				phone:'',
				roles:{},
				active:false,
				errors:{},
				isCancel:false
			}
		}
		this.save=this.save.bind(this)
		this.add=this.add.bind(this)
		this.search=this.search.bind(this)
		this.refresh=this.refresh.bind(this)
		this.getRoles=this.getRoles.bind(this)

		this.handleInputChange=this.handleInputChange.bind(this)
		this.handleDropDownChange=this.handleDropDownChange.bind(this)
		this.handleCheckboxChange=this.handleCheckboxChange.bind(this)
		this.handleCancel=this.handleCancel.bind(this)
		this.handleDropDownSearch=this.handleDropDownSearch.bind(this)
		this.handleInputSearch=this.handleInputSearch.bind(this)

	};

	componentWillMount(){
		
		
		this.props.getAll()	
		this.props.getRoles()
		
		
	};
	componentDidMount() {
		this.listMenu(0,this)
        this.props.router.setRouteLeaveHook(this.props.route, () => {
        	this.props.cancel()
        })
	  
    }

	//to rerender component
  	componentWillReceiveProps = (nextProps, nextState) => {
  	
  			
		if(this.props.isLogin && !this.props.currentUser.isAdmin){
			this.props.getId(this.props.currentUser._id) //get id only if user is not admin
		}

  			
  		
  		if(this.props.roles!==nextProps.roles){
  			this.getRoles(nextProps.roles)
  		}

  		if(this.props.user!==nextProps.user){
  		
  			this.getUser(nextProps.user)
  			if(!this.props.isLogin){
  				browserHistory.push(`/login`);
  			}
  		}
  		
  		
  		
  	};
  	
  	getRoles(roles){
  	
  		let r=roles.map((r,index) =>(Object.assign({},
  			{key:index, value:r._id, text:r.name})))
  		
  		this.state.listRoles=r

  	}
  	getUser(user){

  		let roles=[]
  		if(Object.keys(user).length!==0){
  			for(let i=0; i<user.roles.length; i++){
  				roles.push(user.roles[i]._id)
  			}
  		}
  		this.setState({user:{

			_id:Object.keys(user).length===0?0:user._id,
			name:Object.keys(user).length===0?'':user.name,
			username:Object.keys(user).length===0?'':user.username,
			password:'',
			address:Object.keys(user).length===0?'':user.address,
			phone:Object.keys(user).length===0?'':user.phone,
			roles:roles,
			active:Object.keys(user).length===0?true:user.active,
			errors:{},
			isCancel:false
  		}})
  		
  	}
  

	save(){
		//if there's id, then update

		if(this.state.user._id!==0){
			if(this.props.isLogin){
				this.props.update(this.state.user);
			}else{
				browserHistory.push(`/login`); //redirect to login if not login
			}
			
		}else {// no id, then add

			delete this.state.user._id
			if(!this.props.isLogin){
				
				let role=this.props.roles.filter(r=>r.name==='transaction')[0]
				
				this.state.user={...this.state.user, roles:[{_id:role._id}]}
				
			}
			this.props.add(this.state.user)
		}
	

	}

	search(e){
		let r={name:this.state.query, role:this.state.queryRole}
		this.props.getName(r)
		this.state={...this.state, activeItem:1}	
		
	}
	refresh(e){
		let r={name:'', role:''}
		this.props.getName(r)
		this.state={...this.state, query:'', queryRole:'', activeItem:1}

	
	}
	handleInputSearch(e){
		this.setState({...this.state, query: e.target.value} )
		
	}
	handleDropDownSearch(e, {value}){
		this.setState({...this.state, queryRole:value})
	
	}
	add(){
		
		
		this.getUser({})
	}

	remove(id,e){

		this.props.remove(id)
		
		
	}
	edit( id, e){
	
		this.props.getId(id)
	
	}
	

	handleInputChange(e){

		this.setState({user:{...this.state.user, [e.target.name]: e.target.value} })
        
	}
	handleCheckboxChange(e, {checked}){
		
		this.setState({user:{...this.state.user, active:checked}})
	}
	handleDropDownChange(e, {value}){
		
		this.setState({user:{...this.state.user, roles:value}})

	}
	handleCancel(e){
		this.setState({user:{...this.state.user, isCancel:true}})
		this.props.cancel()
		this.getUser({})
	}

	
	render(){		
		
		return(
			<Segment>
				<Header as='h2'>
					{this.props.currentUser.isAdmin? 'Users'
					: 'Register'}
				</Header>
				{this.props.currentUser.isAdmin && this.props.isLogin?
				
				<div>			
					<Control query={this.state.query} handleInputSearch={this.handleInputSearch} handleDropDownSearch={this.handleDropDownSearch} search={this.search} refresh={this.refresh} roles={this.state.listRoles} queryRole={this.state.queryRole}/>
				</div>	
			
				
				:''}
				
					<div>					 
					<Form user={this.props.user} 
						save={this.save}
						cancel={this.cancel} 
						currentUser={this.props.currentUser}
						isLogin={this.props.isLogin}
						handleInputChange={this.handleInputChange}
						handleDropDownChange={this.handleDropDownChange}
						handleCheckboxChange={this.handleCheckboxChange}
						handleCancel={this.handleCancel}
						user={this.state.user}
						roles={this.state.listRoles} />
				</div>
				
			</Segment>
		)
	}
}

const mapStateToProps=(state,ownProps)=>{
	return{
		query:state.query,
		user:state.user.item,
		roles:state.role.items,
		isLogin:state.user.isLogin,
		currentUser:state.user.currentUser
	}
};
const mapDispatchToProps=(dispatch)=>{

	return{
		
		getRoles:()=>dispatch(roleActions.getAll()),
		getId:(id)=>dispatch(userActions.getId(id)),
		add:user=>dispatch(userActions.add(user)),
		update:user=>dispatch(userActions.update(user)),
		remove:(id)=>dispatch(userActions.del(id)),
		cancel:()=>dispatch(userActions.clear()),
		
		
	}
};
export default connect(mapStateToProps,mapDispatchToProps)(UserPage);