import React, {Component} from 'react'
import {Link, browserHistory} from 'react-router'
import header from './Header'
import footer from './Footer'
import {connect} from 'react-redux';
import * as cartActions from '../actions/cart'
import {logout} from '../actions/user'
import { Sidebar, Segment, Button, Menu, Image, Icon, Grid,Label } from 'semantic-ui-react'

class App extends Component {
	constructor(props){
		super(props);
		this.state={
			redirectToNewPage:false,
			total:0,
			visible: false,
			activeItem: "home",
		
		}
		this.logout=this.logout.bind(this)
	};

 	componentWillReceiveProps = (nextProps, nextState) => {
  		
  		if(this.props.carts!==nextProps.carts){
  			this.state={...this.state, total:nextProps.carts.length }}
  		
  		}
  	logout(){
  		if(this.props.isLogin){
			this.props.logout()
  			browserHistory.push('/');
  			
  		}else{
  			
  			browserHistory.push('/login')
  		}
  	}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render() {
    const { visible,activeItem } = this.state || {}
    return (
     <Grid>
		<Grid.Row>
			<Grid.Column color="teal">
				<Button onClick={this.toggleVisibility} circular icon="block layout"color="green"/>
				Viam Shop
				<span style={{float:"right"}}>
				{this.props.currentUser._id!==0? ' Welcome, '+ this.props.currentUser.name + ' ':''}
				<Link to="/cart" activeClassName="active">
				<Icon name="shopping basket" />
				{this.state.total}
				</Link>
						
				<Button color="green" onClick={this.logout}><Icon name={this.props.isLogin?"sign out":"sign in"}/>{this.props.isLogin?"Logout":"Login"}</Button>
				</span>
				
			</Grid.Column>
		</Grid.Row>

		<Grid.Row>
		<Grid.Column>
	        <Sidebar.Pushable as={Segment}>
	          <Sidebar as={Menu} animation="push" width="thin" visible={visible} icon="labeled" vertical inverted>
	             <Menu.Item active={activeItem === "home"} onClick={this.handleItemClick}>
		          <Menu.Header>
		            <Link to="/">
		            <Icon name="home" />
		            Home
		            </Link>
		          </Menu.Header>
		        </Menu.Item>
		        
		        
		        <Menu.Item>
		        {this.props.isLogin?
		          <Menu.Header><Icon name="users"/>Accounts</Menu.Header>:''}
		          <Menu.Menu>
		            {this.props.isLogin?
		            <Menu.Item active={activeItem === "users"} onClick={this.handleItemClick} ><Link to="/users" activeClassName="active"><Icon name="user"/>
		            	User</Link></Menu.Item>:''}
		            
		          </Menu.Menu>
		        </Menu.Item>
		        {this.props.isLogin?
		        <Menu.Item  active={activeItem === "transaction_view"} onClick={this.handleItemClick}  name="transaction" ><Link to="/transaction/view" activeClassName="active"><Icon name="shop"/>List Transaction</Link></Menu.Item> :''}
		        <Menu.Item active={activeItem === "about"} onClick={this.handleItemClick} ><Link to="/about">
		          	About
		        </Link></Menu.Item>
		        {!this.props.isLogin?
		        <Menu.Item  active={activeItem === "register"} onClick={this.handleItemClick} name="register"><Link to="/register">Register</Link></Menu.Item>
		        :''}
	          </Sidebar>
	          <Sidebar.Pusher>
	            <Segment basic>
	            
	              {this.props.children}
	            </Segment>
	          </Sidebar.Pusher>
	        </Sidebar.Pushable>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered columns={6}>
      	<Grid.Column >
      	<i className="icons">
			<i className="copyright icon"></i>
			altaire September 2017
		</i>
		</Grid.Column>
      </Grid.Row>
    </Grid>
    )
  }
}

const mapStateToProps=(state,ownProps)=>{
	return{
		
		carts:state.cart.items,
		currentUser:state.user.currentUser,
		isLogin:state.user.isLogin
		
	}
};
const mapDispatchToProps=(dispatch)=>{

	return{
		
		remove:(id)=>dispatch(cartActions.del(id)),
		cancel:()=>dispatch(cartActions.clear()),
		logout:()=>dispatch(logout())
	
		
	}
};
export default connect(mapStateToProps,mapDispatchToProps)(App)