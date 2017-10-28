import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import * as userActions from '../../actions/user';
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import {browserHistory} from 'react-router'; 
import {Input, Button, Form, Icon, Dropdown, Checkbox} from 'semantic-ui-react'

class Login extends React.Component{
	constructor(props) {
		super(props);

		this.handleChange=this.handleChange.bind(this);
		this.handleSubmit=this.handleSubmit.bind(this);
		this.handleCancel=this.handleCancel.bind(this);
	
	}

	state={
		username:'',
		password:'',
		errors:{},
		isCancel:false
	};

	componentWillReceiveProps = (nextProps, nextState) => {

		if(!this.state.isCancel && nextProps.isLogin){
        	browserHistory.push(`/`); //redirect after login success
    	}else{
    
    		this.state={
            _id: 0,
            username: '',
            isCancel:false,
            errors:{}
        }
    	}
       
    };
  	


	handleSubmit(e){
		
		let errors={};
		if(this.state.username==='')errors.name='Can\'t be empty.';
		this.setState({
			errors
		});
		const isValid=!Object.keys(errors).length;
	
		if(isValid){
		
			this.props.login(this.state);
			
		
				
		}
		

	};

	handleCancel(e){
		this.state={_id:0, username:'', isCancel:true} 
	
		this.props.cancel();
	}
	
	
	handleChange(e){
	
		if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];

            this.setState({
                [e.target.name]: e.target.value,
                errors
            });
        } else {

            this.setState({[e.target.name]: e.target.value});
        }
	}
	render(){
	
	return(
		<div>
			<Form >
				<Form.Group>
					
					<Form.Field>
						<label>Username</label>
						<Input 
							type="text"
							name="username"
							value={this.state.username}
							id="username"
							onChange={this.handleChange}
							className="form-horizontal"/>
		
					</Form.Field>
					<Form.Field>
						<label>Password</label>
						<Input 
							type="password"
							name="password"
							value={this.state.password}
							id="password"
							onChange={this.handleChange}
							className="form-horizontal"/>
					</Form.Field>
					<Button className="ui green  button" onClick={this.handleSubmit} ><Icon name="checkmark"/>Submit</Button>
			
					<Button className="ui orange  button" onClick={this.handleCancel}><Icon name="remove"/>Cancel</Button>
					
				</Form.Group>
			
			
			</Form>
			
		</div>

	);
};
};

const mapStateToProps=(state,ownProps)=>{
	return{
		user:state.user.item,
		toast:state.toast,
		isLogin:state.user.isLogin
	}
};
const mapDispatchToProps=(dispatch)=>{

	return{
		login:(user)=>dispatch(userActions.login(user)),
		cancel:()=>dispatch(userActions.clear()),
		clearAll:()=>dispatch(userActions.clearAll())
		
	}
};
export default connect(mapStateToProps,mapDispatchToProps)(Login);