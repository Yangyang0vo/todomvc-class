import React, { Component } from 'react'

export default class TodoFooter extends Component {
  render() {
    const { list, type } = this.props
    if (list.length === 0) {
      return null
    }
    const leftCount = list.filter((item) => !item.done).length
    const isShow = list.some((item) => item.done)
    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{leftCount}</strong> item left
        </span>

        <ul className="filters">
          <li>
            <a
              onClick={() => {
                this.handleClick('all')
              }}
              className={type === 'all' ? 'selected' : ''}
              href="#/"
            >
              All
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                this.handleClick('active')
              }}
              className={type === 'active' ? 'selected' : ''}
              href="#/active"
            >
              Active
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                this.handleClick('completed')
              }}
              className={type === 'completed' ? 'selected' : ''}
              href="#/completed"
            >
              Completed
            </a>
          </li>
        </ul>

        {isShow && (
          <button className="clear-completed" onClick={this.clearTodo}>
            Clear completed
          </button>
        )}
      </footer>
    )
  }
  clearTodo = () => {
    this.props.clearTodo()
  }
  handleClick = (type) => {
    this.props.changeType(type)
  }
}
