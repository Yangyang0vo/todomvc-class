import React, { Component } from 'react'
import classnames from 'classnames'

export default class Todoitem extends Component {
  state = {
    // 当前双击的id
    currentId: '',
    // 当前双击的名字
    currentName: ''
  }
  inputRef = React.createRef()
  render() {
    const { item } = this.props
    return (
      <li className={classnames({ completed: item.done, editing: item.id === this.state.currentId })} key={item.id}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={item.done} onChange={() => this.updateDone(item.id)} />
          <label
            onDoubleClick={() => {
              this.showEdit(item)
            }}
          >
            {item.name}
          </label>
          <button
            className="destroy"
            onClick={() => {
              this.delTodo(item.id)
            }}
          ></button>
        </div>
        <input
          className="edit"
          value={this.state.currentName}
          onChange={(e) => {
            this.setState({
              currentName: e.target.value
            })
          }}
          onKeyUp={this.handleKeyUp}
          ref={this.inputRef}
          onBlur={() => {
            this.setState({
              currentId: ''
            })
          }}
        />
      </li>
    )
  }
  delTodo = (id) => {
    // console.log(id)
    this.props.delTodoById(id)
  }
  updateDone = (id) => {
    this.props.updateDone(id)
  }
  showEdit = ({ id, name }) => {
    this.setState(
      {
        currentId: id,
        currentName: name
      },
      () => {
        this.inputRef.current.focus()
      }
    )
  }

  handleKeyUp = (e) => {
    if (e.keyCode === 27) {
      // 按了esc
      this.setState({
        currentId: ''
      })
    }
    if (e.keyCode === 13) {
      this.props.editTodo(this.state.currentId, this.state.currentName)
      // 关闭输入框
      this.setState({
        currentId: '',
        currentName: ''
      })
    }
  }
  // componentDidUpdate() {
  //   // 让输入框自动获取焦点
  // }
}
