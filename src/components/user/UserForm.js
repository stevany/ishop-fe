import React from 'react';
import {Input, Button, Form, Icon, Dropdown, Checkbox, Textarea} from 'semantic-ui-react'

class UserForm extends React.Component{
	constructor(props) {
		super(props);


	
	}
	

	state={
		_id:this.props.user._id?this.props.user._id:0,
		name:this.props.user.name?this.props.user.name:'',
		username:this.props.user.username?this.props.user.username:'',
		address:this.props.user.address?this.props.user.address:'',
		phone:this.props.user.phone?this.props.user.phone:'',
		password:'',
		roles:Object.keys(this.props.user.roles).length>0?this.props.user.roles:'',
		active:this.props.user.active?this.props.user.active:false,
		errors:{},

		isCancel:false
	};

	componentWillReceiveProps = (nextProps, nextState) => {

		this.state={
            _id: nextProps.user._id===0?0:nextProps.user._id,
            name:nextProps.user.name?nextProps.user.name:'',
			username:nextProps.user.username?nextProps.user.username:'',
			password:nextProps.user.password?nextProps.user.password:'',
			address:nextProps.user.address?nextProps.user.address:'',
			phone:nextProps.user.phone?nextProps.user.phone:'',
			roles:Object.keys(nextProps.user.roles).length>0?nextProps.user.roles:'',
			active:nextProps.user.active?nextProps.user.active:false,
			errors:nextProps.errors?nextProps.errors:{},
            isCancel:false,
           
        }
    console.log(nextProps.user)   
    };
  	
	
	render(){
	
	return(
		<div>
			<Form>
				<Form.Field>
					<label>Name</label>
					<Input 
						type="hidden"
						name="id"
						value={this.state._id}
						id="id"/>
					<Input icon='user' iconPosition='left' 
						type="text"
						name="name"
						value={this.state.name}
						id="name"
						onChange={this.props.handleInputChange}/>
					<span>{this.state.errors.name}</span>
				</Form.Field>
				<Form.Field>
					<label>Username</label>
					<Input icon='at' iconPosition='left'
						type="text"
						name="username"
						value={this.state.username}
						id="username"
						onChange={this.props.handleInputChange}/>
					<span>{this.state.errors.name}</span>
				</Form.Field>
				<Form.Field>
					<label>Password</label>
					<Input icon='key' iconPosition='left'
						type="password"
						name="password"
						value={this.state.password}
						id="password"
						onChange={this.props.handleInputChange}/>
					<span>{this.state.errors.name}</span>
				</Form.Field>
				<Form.Field>
					<label>Address</label>
					<Input icon='street view' iconPosition='left'
						name="address"
						value={this.state.address}
						id="address"
						onChange={this.props.handleInputChange}/>
					<span>{this.state.errors.name}</span>
				</Form.Field>
				<Form.Field>
					<label>Phone</label>
					<Input icon='address book outline' iconPosition='left'
						type="text"
						name="phone"
						value={this.state.phone}
						id="phone"
						onChange={this.props.handleInputChange}/>
					<span>{this.state.errors.name}</span>
				</Form.Field>
				{this.props.currentUser.isAdmin && this.props.isLogin?
				<div>
				<Form.Field>
					<Dropdown placeholder='Roles' fluid multiple search  selection options={this.props.roles} 
					value={this.state.roles}
					onChange={this.props.handleDropDownChange}/>
				</Form.Field>
				<Form.Field>

					<Checkbox label='Active' toggle checked={this.state.active}  onChange={this.props.handleCheckboxChange} color='green'/>
				</Form.Field>
				</div>
				:''}
				<Button className="ui green  button" onClick={this.props.save}><Icon name='checkmark'/>Submit</Button>
		
				<Button className="ui orange  button" onClick={this.props.handleCancel}><Icon name='remove'/>Cancel</Button>
			
				
			
			
			</Form>
			
		</div>

	);
};
};
export default UserForm;