import React from 'react';
import {connect} from 'react-redux';
import * as cartActions from '../../actions/cart';
import * as productActions from '../../actions/product';
import * as groupActions from '../../actions/group'
import {browserHistory, Link} from 'react-router'; //for go to url
import {Icon, Header, Segment, Button, Popup, Menu, Label, Card, Input, Image, Divider} from 'semantic-ui-react'

import Control from './HomeControl';

class HomePage extends React.Component{
	constructor(props){
		super(props);
		this.state={
			
			
			listGroups:[],
			listPage:[],
			currentStart:1,
			currentEnd:3,
			query:'',
			queryGroup:'',
			carts:[],
			products:[],
			pagination:[],
			cart:{
				_id:0,
				name:'',
				url:'',
				price:0,
				qty:1,
				stock:0,
				subtotal:0,
			}
		}

		this.search=this.search.bind(this)
		this.refresh=this.refresh.bind(this)

		this.handleInputChange=this.handleInputChange.bind(this)
		this.handleCancel=this.handleCancel.bind(this)
		this.handleDropDownSearch=this.handleDropDownSearch.bind(this)
		this.handleInputSearch=this.handleInputSearch.bind(this)

	};

	componentWillMount(){
		
		this.props.getAll()	
			
		
		this.props.getGroups()
		

		
	}
	componentDidMount() {
		this.listMenu(0,this)
        
	  
    }
    componentWillReceiveProps = (nextProps, nextState) => {
  		
  		if(this.props.products!==nextProps.products){
  			console.log('mskkk')
  			this.state={...this.state, pagination:{total:nextProps.pagination.total, size:12, totalPage:Math.ceil(nextProps.pagination.total/10) }}
  			this.changePage(this.state.activeItem, nextProps.products, this.state.pagination)
  			
  		
  			
  		}

  		if(this.props.groups!==nextProps.groups){
  			this.getGroups(nextProps.groups)
  		}

  		
  		
  	};
  	getGroups(groups){
  	
  		let r=groups.map((r,index) =>(Object.assign({},
  			{key:index, value:r._id, text:r.name})))
  		
  		this.state={...this.state,listGroups:r}
  		
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
    search(e){
		let r={name:this.state.query, group:this.state.queryGroup}
		this.props.getName(r)
		this.state={...this.state, activeItem:1}	
		
	}
	refresh(e){
		let r={name:'', group:''}
		this.props.getName(r)
		this.state={...this.state, query:'', queryGroup:'', activeItem:1}

	
	}
	handleInputSearch(e){
		this.setState({...this.state, query: e.target.value} )
		
	}
	handleDropDownSearch(e, {value}){
		this.setState({...this.state, queryGroup:value})
	
	}
	changePage(page,  r, pagination){
		let size=pagination.size
		let start=(size*page)-size
		let end=size*page
		
		this.state={...this.state, products:r.filter((arr,index) => index>=start && index<end)}

	}

	handleItemClick (i, e){

		this.changePage(i, this.props.products, this.state.pagination)
	
		this.setState({...this.state, activeItem: i})

	} 

	listMenu(action, e){

		let start=1
		let end=3
		switch (action){
			case 0://start 
				 start=1
				 end=3
				 break;
			case 1://prev
				
				start=this.state.currentStart===1?this.state.currentStart:this.state.currentStart-1
				end=this.state.currentStart===1?this.state.currentEnd:this.state.currentEnd-1
				break;
			case 2://next
				start=this.state.currentEnd===this.props.pagination.totalPage?this.state.currentStart:this.state.currentStart+1
				end=this.state.currentEnd===this.props.pagination.totalPage?this.state.currentEnd:this.state.currentEnd+1
				break;
		}
		let list=[]
		
	
			for(let i=start; i<=end; i++){
				list.push(<Menu.Item name={i.toString()} key={i} active={this.state.activeItem === {i}} onClick={this.handleItemClick.bind(this,i)} />)
			}

		this.state={
			...this.state,
			currentStart:start,
			currentEnd:end,
			listPage:list,
			activeItem:start
		}

		if(action>0){
			this.handleItemClick(start, this)
		}	

		

	}

    handleInputChange( p, e, {value}){
    	
		this.setState({cart:{...this.state.cart, [e.target.name]: e.target.value} })
        
	}
	handleCancel(e){
		this.setState({cart:{...this.state.cart, isCancel:true}})
		this.props.cancel()
		this.getCart({})
	}

	add(){
		
		this.setState({isEdit:true})
		this.getUser({})
	}

	remove(id,e){

		this.props.remove(id)
		
		
	}
	save(p, e){
		let c={
			...this.state.cart,
			_id:p._id,
			name:p.name,
			url:p.urls[0].path,
			price:p.price,
			stock:p.qty,
			subtotal:this.state.cart.qty*p.price

		}
		
		this.state={...this.state, cart:c, carts:this.state.carts.concat(c)}
		this.props.add(this.state.cart)
		this.state={...this.state, cart:{_id:0, name:'', url:'', price:0, qty:1, stock:0, subtotal:0}}

	}
	search(e){
		let r={name:this.state.query, group:this.state.queryGroup}
		this.props.getName(r)
		this.state={...this.state, activeItem:1}	
		
	}
	refresh(e){
		let r={name:'', group:''}
		this.props.getName(r)
		this.state={...this.state, query:'', queryGroup:'', activeItem:1}

	
	}
	handleInputSearch(e){
		this.setState({...this.state, query: e.target.value} )
		
	}
	handleDropDownSearch(e, {value}){
		this.setState({...this.state, queryGroup:value})
	
	}

	
	render(){		
		
		return(
			
			
			<Segment>
				
				
				<div>			
					<Control query={this.state.query} handleInputSearch={this.handleInputSearch} handleDropDownSearch={this.handleDropDownSearch} search={this.search} refresh={this.refresh} groups={this.state.listGroups} queryGroup={this.state.queryGroup}/>
				</div>	
				
				<Card.Group>
				{this.state.products.map((p,i)=>{
					return(
						<Card key={i}>
					
							<Link to={`/products/view/id/${p._id}`} activeClassName='active'>
							<img src={p.urls[0].path} width="270px" height="170px" />	
							</Link>
							<Card.Content>
								
								<Card.Header>
									{p.name}
								</Card.Header>
								<Card.Meta>
								{'Price : IDR ' + p.price.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}
								<span style={{float:'right'}}>Stock : {p.qty}</span>
								</Card.Meta>
								<Card.Description>
									
									<Input 
									fluid
									labelPosition='left'
									type="number"
									name="qty"
									id="qty"
									defaultValue='1'
									onChange={this.handleInputChange.bind(this, p)} action >
									<Label basic>Qty</Label>
									<input/>
									<Popup trigger={<Button className="ui green  button" onClick={this.save.bind(this, p)} icon="plus cart" floated='right'/>}content='Add to cart'/>
									</Input>
								</Card.Description>
							</Card.Content>
						
						</Card>
					)
				})}
				</Card.Group>
				
				<Menu floated='right' pagination>
					<Button basic onClick={this.listMenu.bind(this,1)} icon='left chevron'/>
					
					
					{this.state.listPage}
					<Button basic onClick={this.listMenu.bind(this,2)} icon='right chevron'/>
					
				</Menu>
								

				</Segment>
		
	)}
}

const mapStateToProps=(state,ownProps)=>{
	return{
		search:state.search,
		query:state.query,
		cart:state.cart.item,
		carts:state.cart.items,
		groups:state.group.items,
		products:state.product.items,
		pagination:state.product.pagination,
		toast:state.toast
	}
};
const mapDispatchToProps=(dispatch)=>{

	return{
		getAll:()=>dispatch(productActions.getAll()),
		getName:(name)=>dispatch(productActions.getName(name)),
		getGroups:()=>dispatch(groupActions.getAll()),
		add:cart=>dispatch(cartActions.add(cart)),
		
		cancel:()=>dispatch(cartActions.clear()),
	
		
	}
};
export default connect(mapStateToProps,mapDispatchToProps)(HomePage);
