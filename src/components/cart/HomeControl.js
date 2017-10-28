import React from 'react';
import {Input, Button, Icon, Dropdown, Label} from 'semantic-ui-react'

class ProductControl extends React.Component{
	constructor(props) {
		super(props);
	
	

		
	}
	state={
			query:'',
			queryProduct:''
		}
	componentWillReceiveProps = (nextProps, nextState) => {
	
		this.setState({
			query: nextProps.query===''?'':nextProps.query,
			queryGroup:nextProps.queryGroup===''?'':nextProps.queryGroup
		})
		
	}
	

	render(){
	return(
	//search
	<div>
		
		
		<Input 
			action={<Dropdown placeholder='Group' search selection options={this.props.groups} value={this.state.queryGroup} onChange={this.props.handleDropDownSearch}/>

		}	placeholder="name"
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
export default ProductControl;