import { connect } from "react-redux"
import { fetchUser } from "../actions/userActions"
import { fetchTweets } from "../actions/tweetsActions"
import React from 'react'
import { changeValue } from "../actions/userActions"
// import store from "../store"

@connect((store) => {
  return {
    user: store.user.user,
    userFetched: store.user.fetched,
    tweets: store.tweets.tweets,
    items: store.user.items,
    value: store.user.value,
  };
})


export class TodoItems extends React.Component{
  render() {
    function createList(item) {
        let list = () => {
            return <li key = {
                item.key
            } > {
                item.text
            } < /li>
        };
        return list();
    }

    let todoEntries = this.props.items;
    let listItems = todoEntries.map(createList);
    return ( 
      <ol className = "theList" > {listItems}</ol>
    );
  }
}

export default class Layout extends React.Component {

  constructor(props) {
    super(props);
    
    this.store = this.store.bind(this);
    this.addItem = this.addItem.bind(this);
  }
  store(e) {
    this.props.dispatch(changeValue(e.target.value));
  }
  addItem(e) {
      let arr = this.props.items;

      arr.push({
              text: this.props.value,
              key: Date.now()
          }

      );
      console.log(arr);
      this.props.dispatch(fetchUser(arr));
      
  }

  componentWillMount() {
   // this.props.dispatch(fetchUser(this.props.items));
  }

  render() {
    return (
      <div className = "todoListMain" >
        <div className = "header" >
          <form >
            <input placeholder = "enter task" onChange = {this.store}></input> 
              <button onClick = {this.addItem} > add < /button>
          </form>
        </div> 
        <TodoItems entries = {this.props.items}/> 
      </div>
    );
  }
}
