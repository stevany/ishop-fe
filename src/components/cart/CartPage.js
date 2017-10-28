import React from 'react';
import {connect} from 'react-redux';
import * as cartActions from '../../actions/cart';
import * as productActions from '../../actions/product';
import * as headerActions from '../../actions/transactionHeader';
import * as detailActions from '../../actions/transactionDetail';
import * as historyActions from '../../actions/history'
import {browserHistory} from 'react-router'; //for go to url
import {Icon, Header, Segment, Button, Popup, Menu, Label, Card, Input, Image, Divider, Table} from 'semantic-ui-react'

import Control from './HomeControl';

class CartPage extends React.Component{
	constructor(props){
		super(props);
		this.state={
			
			listCarts:[],
			listPage:[],
			
			carts:[],
			
			total:0
			
		}

		this.handleInputChange=this.handleInputChange.bind(this)
		

	};

	componentWillMount(){
		
		let total=this.total(this.props.carts)
		this.state={...this.state, carts:this.props.carts, total:total}
		
	}
	componentDidMount(){
		this.props.router.setRouteLeaveHook(this.props.route, () => {
    	this.props.clearHdr()
    	this.props.clearDtl()
        })
	}
	componentWillReceiveProps = (nextProps, nextState) => {
	
		if(this.props.carts!==nextProps.carts){

		 setTimeout(()=>{this.setState({...this.state, carts:nextProps.carts})},1000)
			

			
		}
		if(this.props.header!==nextProps.header && !nextProps.header.status){
			let details=[]
			let histories=[]
			this.state.carts.forEach((c,index)=>{
				
				let detail={
				header:nextProps.header,
				product:c,
				qty:c.qty,
				price:c.price,
				userUpdate:this.props.currentUser,
				created_at:new Date(),
				updated_at:new Date(),
				status:true
				}	
				let history={
					product:c,
					user:this.props.currentUser,
					qty:c.qty,
					price:c.price,
					stock:c.stock-c.qty,
					note:'transaction automatically added from cart id product '+c._id,
					created_at:new Date(),
					updated_at:new Date()
				}
				details.push(detail)
				histories.push(history)
				let product={_id:c._id, qty:c.qty}
				this.props.updateStock(product)
			})
			this.props.addDtls(details, nextProps.header._id,0)//insert dtl transaction
			this.props.addHist(histories)//insert hist transaction
			let header={...nextProps.header, updated_at:new Date(),status:true}
			this.props.update(header)
			this.props.clear()
			this.state={...this.state, cart:[], carts:[], total:0}
			}
	
		
	}
	total(c){
		let total=c.reduce(
		function (
		a,
		c
		) {

		return a+ c.subtotal
		},0
		)
		return total
	}
  	save(c,e){
  		this.update(c)
  	}
  	remove(c,e){
  		let carts=this.state.carts.filter(carts=>carts._id!==c._id).map(carts=>Object.assign({}, carts))
  		let total=this.total(carts)
  		this.props.delete(c._id)
  		this.state={...this.state, total:total}
  	}

    handleInputChange( c, e, {value}){
    	
    	let cart=Object.assign({}, c)
    	cart.qty=Number(value)

    	
    	this.update(cart)
        	
    	
    	
	}
	update(c){
		let carts=this.state.carts.filter(carts=>carts._id!==c._id).map(carts=>Object.assign({}, carts))
		c.subtotal=c.qty*c.price
		let total=this.total(carts)
		total+=c.subtotal
		
		carts.push(c)
		this.props.add(c)
		this.state={...this.state, total:total}

	}
	checkout(e){
		if(Object.keys(this.props.currentUser).length===0 && Object.keys(this.props.isLogin).length===0){
			browserHistory.push('/login')
		}else{
	
		let header={
			dateTransaction:new Date(),
			notes:'transaction automatically from cart',
			total:this.state.total,
			customer:this.props.currentUser,
			userUpdate:this.props.currentUser,
			updated_at:new Date(),
			status:false
		}
		this.props.addHdr(header)//insert hdr transaction
		}
		
		
	}
  	render(){		
		
		return(
			
			<Segment>
				<Table collapsing basic="very">
					<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Name</Table.HeaderCell>
						<Table.HeaderCell>Qty</Table.HeaderCell>
						<Table.HeaderCell>Price</Table.HeaderCell>
						<Table.HeaderCell>SubTotal</Table.HeaderCell>
						<Table.HeaderCell>Actions</Table.HeaderCell>
					</Table.Row>
					</Table.Header>

					<Table.Body>
					
					{this.state.carts.map((c,i)=>{
						return(
						<Table.Row key={i}>
							<Table.Cell collapsing>
								{c.name}
								<Image src={c.url} width="50px" height="50px"/>
							</Table.Cell>
							<Table.Cell collapsing>
								<Input  
								type="number"
								name="qty"
								id="qty"
								value={c.qty}
								size="mini"
								onChange={this.handleInputChange.bind(this, c)} transparent/>
							</Table.Cell>
							<Table.Cell collapsing>
								{c.price.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}
							</Table.Cell>
							
							<Table.Cell collapsing>
							{c.subtotal.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}
							</Table.Cell>
							<Table.Cell collapsing>
								<Button color="green" onClick={this.save.bind(this,c)} circular icon="checkmark"/>
			
								<Button color="orange" onClick={this.remove.bind(this,c)} circular icon="remove"/>
							</Table.Cell>
						</Table.Row>
					)}
				)}
					</Table.Body>
					<Table.Footer>
						<Table.Row>
							<Table.HeaderCell colSpan="1">
								<Header size="large"> Total : </Header>
							</Table.HeaderCell>
							<Table.HeaderCell colSpan="2">
								<Header size="large"> {this.state.carts.length} items</Header>
							</Table.HeaderCell>
							<Table.HeaderCell colSpan="2">
							<Header floated="right" size="large">
							{this.state.total.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}
							</Header>
							</Table.HeaderCell>
						</Table.Row>
						<Table.Row>
						<Table.HeaderCell colSpan="5">
						<Button fluid className="ui teal button" onClick={this.checkout.bind(this)}><Icon name="shopping basket"/>Checkout</Button>
						</Table.HeaderCell>
						</Table.Row>
					</Table.Footer>	
					
				</Table>
				
			
		</Segment>
		)
	}
}
const mapStateToProps=(state,ownProps)=>{
	return{
		carts:state.cart.items,
		currentUser:state.user.currentUser,
		isLogin:state.user.isLogin,
		header:state.transactionHeader.item,

	}
};
const mapDispatchToProps=(dispatch)=>{

	return{
		
		add:cart=>dispatch(cartActions.add(cart)),
		addHdr:header=>dispatch(headerActions.add(header)),
		update:header=>dispatch(headerActions.update(header)),
		addDtls:(details,id,code)=>dispatch(detailActions.add(details,id,code)),
		addHist:histories=>dispatch(historyActions.add(histories)),
		updateStock:product=>dispatch(productActions.updateStock(product)),
		delete:(id)=>dispatch(cartActions.del(id)),
		clear:()=>dispatch(cartActions.clear()),
		clearHdr:()=>dispatch(headerActions.clearAll()),
		clearDtl:()=>dispatch(detailActions.clearAll())
	
		
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
