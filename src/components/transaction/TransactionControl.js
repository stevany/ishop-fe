import React from 'react';
import {Input, Button, Icon, Dropdown, Label} from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
class TransactionControl extends React.Component{
	constructor(props) {
		super(props);
	

		
	}
	state={
			startDate:null,
			endDate:null
			
		}
	componentWillReceiveProps = (nextProps, nextState) => {

		this.setState({
			startDate: nextProps.startDate===null?null:nextProps.startDate,
			endDate:nextProps.endDate===null?null:nextProps.endDate
			
		})
		
	}
	
	render(){
	return(
	//search
	<div>
		<Label>From</Label>
		<DatePicker
		selectsStart
		selected={this.state.startDate}
	    startDate={this.state.startDate}
	    endDate={this.state.endDate}
	    onChange={this.props.handleChangeStart}
		name="startDate"
		id="startDate"
		dateFormat="DD-MM-YYYY"
		/>
		<Label>To</Label>
		<DatePicker
	    selected={this.state.endDate}
	    selectsEnd
	    startDate={this.state.startDate}
	    endDate={this.state.endDate}
	    onChange={this.props.handleChangeEnd}
	    name="endDate"
	    id="endDate"
	    dateFormat="DD-MM-YYYY"
	    />


		
		<Button className="ui teal  button" onClick={this.props.search} >Search  <Icon name="find"/></Button>	
		<Button className="ui green  button" onClick={this.props.refresh} >Refresh  <Icon name="recycle"/></Button>
									
		
	
	</div>
	)};
}
export default TransactionControl;