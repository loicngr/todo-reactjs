import React, {Component} from 'react';
import './App.css';


class TodoForm extends Component {
    constructor(props) {
        super(props);

        this.state = { value: '' };

        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormChange(e) {
        this.setState({value: e.target.value});
    }
    handleFormSubmit(e) {
        const value = this.state.value;

        this.setState({value: ''})

        this.props.onNewTodo(value)

        e.preventDefault();
    }

    render() {
        return(
            <form onSubmit={this.handleFormSubmit}>
                <label htmlFor="todoContent">
                    Todo content:
                    <input name="todoContent" value={this.state.value} onChange={this.handleFormChange} placeholder="Todo content"></input>
                </label>
                <button type="submit">Create todo</button>
            </form>
        );
    }
}

class TodoList extends Component {
    constructor(props) {
        super(props);

        this.state = {todos: []};
    }

    componentDidMount() {
        this.setState({
            todos: this.props.todos
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.todos !== this.state.todos) {
            this.setState({
                todos: prevProps.todos
            });
        }
    }

    render() {
        const listTodos = this.state.todos.map((todo) =>  <li key={todo}>{todo}</li>);

        return (
            <ul>
                {listTodos}
            </ul>
        );
    }
}

class Todo extends Component {
    constructor(props) {
        super(props);

        this.state = {todos: []};
    }

    todosExist(todo) {
        return this.state.todos.indexOf(todo) !== -1;
    }

    handleNewTodo = (todo) => {
        if (this.todosExist(todo)) return false; // Todo duplication
        const todos = this.state.todos;
        todos.push(todo);

        this.setState({todos: todos});
    }

    render() {
        return (
            <div className="App">
                <h1>Todo React</h1>
                <TodoForm todos={this.state.todos} onNewTodo={this.handleNewTodo} />
                <TodoList todos={this.state.todos} />
            </div>
        );
    }
}

export default function App() {
    return (
        <Todo />
    );
}
