import React from "react";
import {connect} from "react-redux";
import * as headerActions from "../../actions/transactionHeader";
import * as detailActions from "../../actions/transactionDetail"
import PropTypes from "prop-types"
import {browserHistory, Link} from "react-router"; //for go to url
import {Icon,Table, Grid, Header, Segment, Button, Popup, Menu, Label, Checkbox, Image, Divider} from "semantic-ui-react"
import moment from "moment"

import Control from "./TransactionControl";

class TransactionViewPage extends React.Component{
  constructor(props){
    super(props);
    this.state={
      
      transactions:[],
      listPage:[],
      currentStart:1,
      currentEnd:2,
      startDate:null,
      endDate:null,
      
      total:0
      
    }

    this.search=this.search.bind(this)
    this.refresh=this.refresh.bind(this)

    this.handleChangeStart=this.handleChangeStart.bind(this)
    this.handleChangeEnd=this.handleChangeEnd.bind(this)
    

  };

 
  componentWillMount(){
    
    this.props.getAll(this.props.currentUser._id) 
      
    
  }
  componentDidMount() {
    this.listMenu(0,this)
    this.props.router.setRouteLeaveHook(this.props.route, () => {
          this.props.cancel()
          this.props.clearDtl()
    })
        
    
  }
    componentWillReceiveProps = (nextProps, nextState) => {
     
      if(Object.keys(nextProps.transactions).length>0){
        console.log("mskkk")
       
         this.changePage(this.state.activeItem, nextProps.transactions, nextProps.pagination)
        
      }
  }
  changePage(page,  t, pagination){
    let size=pagination.size
    let start=(size*page)-size
    let end=size*page
   
    this.state={...this.state, transactions:t.filter((arr,index) => index>=start && index<end)}

  }

  handleItemClick (i, e){

    this.changePage(i, this.props.transactions, this.props.pagination)
  
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

  
  search(e){
    let h={startDate:this.state.startDate, endDate:this.state.endDate, user:this.props.currentUser._id}

    this.props.getDate(h)
    this.state={...this.state, activeItem:1}  
    
  }
  refresh(e){
    let h={startDate:null, endDate:null, user:this.props.currentUser._id}
    this.props.getDate(h)
    this.state={...this.state, startDate:null,endDate:null, activeItem:1}
  
  }
 
  handleChangeStart(e){

    this.setState({...this.state, startDate: e} )
    
  }
  handleChangeEnd(e){

    this.setState({...this.state, endDate:e})
  }

  
  render(){   
    
    return(
    <Segment> 

      <Control 
        startDate={this.state.startDate}
        endDate={this.state.endDate}
        handleChangeStart={this.handleChangeStart}
        handleChangeEnd={this.handleChangeEnd} 
        search={this.search} 
        refresh={this.refresh} /> 

      <br/>
      {this.state.transactions.map((t,i)=>{
        return(
          <div key={i}>
          <Table compact celled structured key={i}>
            <Table.Header>
              <Table.Row>
             
              <Table.HeaderCell colSpan="3"> Transaction No : {t._id}</Table.HeaderCell>
              <Table.HeaderCell textAlign="right">Date: {moment(t.dateTransaction).format("DD-MM-YYYY")}
              
              <Header as='h5' color={t.status?'green':'red'}>Status : {t.status?' Approved ' :' Void '}</Header>
              </Table.HeaderCell>
              </Table.Row>
              
              
             
              <Table.Row>
                <Table.HeaderCell width={6}>Product Name</Table.HeaderCell>
                <Table.HeaderCell width={1} textAlign="right">Qty</Table.HeaderCell>
                <Table.HeaderCell width={1} textAlign="right">Price</Table.HeaderCell>
                <Table.HeaderCell width={2} textAlign="right">SubTotal</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
            {t.details.map((d,j)=>{
              return(
                <Table.Row key={i + " " + j}>
                <Table.Cell collapsing>
                <Header as="h5">{d.product.name}</Header>
                <Link to={`/products/view/id/${d.product._id}`} activeClassName="active">
                <img src={d.product.urls[0].path} width="70px" height="70px"/>
                </Link>
                </Table.Cell>
                <Table.Cell collapsing textAlign="right">{d.qty}</Table.Cell>
                <Table.Cell collapsing textAlign="right">{d.price.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</Table.Cell>
                <Table.Cell collapsing textAlign="right">{(d.price*d.qty).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</Table.Cell> 
               
                </Table.Row>
              )
            })}
            </Table.Body>
            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell><Header size="large">Total</Header></Table.HeaderCell>
                <Table.HeaderCell colSpan="3" textAlign="right">
                 
                  <Header size="large">{t.total.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</Header>
                 
                </Table.HeaderCell>
              </Table.Row>
              </Table.Footer>
          </Table>
          <Divider hidden/>
        </div> 
        )
      })}
     
        
      <Menu floated="right" pagination>
        <Button basic onClick={this.listMenu.bind(this,1)} icon="left chevron"/>
          {this.state.listPage}
        <Button basic onClick={this.listMenu.bind(this,2)} icon="right chevron"/>
        
      </Menu>
  </Segment>
)}
}

const mapStateToProps=(state,ownProps)=>{
  return{
    search:state.search,
    transactions:state.transactionHeader.items,
    pagination:state.transactionHeader.pagination,
    currentUser:state.user.currentUser,
    isLogin:state.user.isLogin,
    toast:state.toast
  }
};
const mapDispatchToProps=(dispatch)=>{

  return{
    getAll:(id)=>dispatch(headerActions.getUser(id)),
    getDetails:(id, headersId)=>dispatch(detailActions.getUser(id,headersId)),
    getDate:(header)=>dispatch(headerActions.getDate(header)),
    cancel:()=>dispatch(headerActions.clearAll()),
    clearDtl:()=>dispatch(detailActions.clearAll())
  
    
  }
};
export default connect(mapStateToProps,mapDispatchToProps)(TransactionViewPage);
