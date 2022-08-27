import React, { Component } from 'react'
import Todoitem from './Todoitem'
export default class TodoMain extends Component {
  render() {
    const { list, type } = this.props
    let showList = []
    if (type === 'active') {
      showList = list.filter((item) => !item.done)
    } else if (type === 'completed') {
      showList = list.filter((item) => item.done)
    } else {
      showList = list
    }
    return (
      <section className="main">
        <input id="toggle-all" className="toggle-all" type="checkbox" checked={list.every((item) => item.done)} onChange={this.handleChage} />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list">
          {showList.map((item) => (
            <Todoitem {...this.props} key={item.id} item={item}></Todoitem>
          ))}
        </ul>
      </section>
    )
  }

  handleChage = (e) => {
    // console.log(e.target.checked)
    this.props.checkAll(e.target.checked)
  }
}
