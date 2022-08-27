// @ts-nocheck
import React, { Component } from 'react'
import { createRoot } from 'react-dom/client'
import './style/base.css'
import './style/index.css'
import TodoHeader from './components/TodoHeader'
import TodoMain from './components/TodoMain'
import TodoFooter from './components/TodoFooter'
class App extends Component {
  state = {
    list: [
      // { id: 1, name: '吃饭', done: false },
      // { id: 2, name: '睡觉', done: true },
      // { id: 3, name: '打豆豆', done: false }
    ],
    // all active completed
    type: 'all'
  }
  render() {
    const { list, type } = this.state
    return (
      <section className="todoapp">
        <TodoHeader addTodo={this.addTodo}></TodoHeader>
        <TodoMain list={list} delTodoById={this.delTodoById} updateDone={this.updateDone} editTodo={this.editTodo} type={type} checkAll={this.checkAll}></TodoMain>
        <TodoFooter list={list} clearTodo={this.clearTodo} type={type} changeType={this.changeType}></TodoFooter>
      </section>
    )
  }
  delTodoById = (id) => {
    this.setState({
      list: this.state.list.filter((item) => item.id !== id)
    })
  }
  updateDone = (id) => {
    // 根据id将对应的done值取反
    this.setState({
      list: this.state.list.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            done: !item.done
          }
        } else {
          return item
        }
      })
    })
  }
  addTodo = (name) => {
    this.setState({
      list: [{ id: Date.now(), name, done: false }, ...this.state.list]
    })
  }
  editTodo = (id, name) => {
    this.setState({
      list: this.state.list.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            name
          }
        } else {
          return item
        }
      })
    })
  }
  clearTodo = () => {
    this.setState({
      list: this.state.list.filter((item) => !item.done)
    })
  }
  changeType = (type) => {
    this.setState({
      type
    })
  }
  checkAll = (check) => {
    this.setState({
      list: this.state.list.map((item) => {
        return { ...item, done: check }
      })
    })
  }
  componentDidMount() {
    this.setState({
      list: JSON.parse(localStorage.getItem('todos') || [])
    })
  }
  componentDidUpdate() {
    localStorage.setItem('todos', JSON.stringify(this.state.list))
  }
}
createRoot(document.getElementById('root')).render(<App></App>)
