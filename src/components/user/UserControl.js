import React from 'react';
import {Input, Button, Icon, Dropdown, Label} from 'semantic-ui-react'

class UserControl extends React.Component{
	constructor(props) {
		super(props);
		console.log(this.props);
		

		
	}
	state={
			query:'',
			queryRole:''
		}
	componentWillReceiveProps = (nextProps, nextState) => {

		this.setState({
			query: nextProps.query===''?'':nextProps.query,
			queryRole:nextProps.queryRole===''?'':nextProps.queryRole
		})
		
	}
	
	render(){
	return(
	//search
	<div>
		
		
		<Input 
			action={<Dropdown placeholder='Select Role' search selection options={this.props.roles} value={this.state.queryRole} onChange={this.props.handleDropDownSearch}/>

		}	placeholder="username"
			actionPosition='left'
			type="text"
			name="search"
			value={this.props.query}
			id="search"
			onChange={this.props.handleInputSearch}
			className="form-horizontal"/>
		<Button className="ui teal  button" onClick={this.props.search} >Search  <Icon name="find"/></Button>	
		<Button className="ui green  button" onClick={this.props.refresh} >Refresh  <Icon name="recycle"/></Button>
									
		
	
	</div>
	)};
}
export default UserControl;