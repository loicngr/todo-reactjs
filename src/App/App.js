import React, {Component} from 'react';
import './App.css';

class App extends Component {
	constructor() {
		super();

		this.state = {todoIptValue: '', todos: []};
	}

	/**
	 * When input value has updated/changed
	 * 
	 * @param {Event} evt 
	 */
	handleChange = (evt) => {
		// Update todo state with input value
		this.setState({todoIptValue: evt.target.value});
	}


	/**
	 * When form is submitted
	 * 
	 * @param {Event} evt Form event 
	 */
	handleSubmit = (evt) => {
		evt.preventDefault();

		// Get todos array
		const {todos} = this.state;
		
		// Push new element in todos array
		todos.push(this.state.todoIptValue);

		// Update todos state
		this.setState({todos: todos});

		// Reset input value
		this.setState({todoIptValue: ''});
	}

	/**
	 * Delete specified todo in todos array
	 * 
	 * @param {Event} evt 
	 */
	handleDelete = (evt) => {
		evt.preventDefault();

		// Get todo index in todos array
		const {key} = evt.target.dataset;
		
		// Get todos array
		const {todos} = this.state;

		// Remove todo in todos array
		todos.splice(key, 1);

		// Update todos state
		this.setState({todos: todos});
	}

	render() {
		// Loop in todos and generate a Li list
		const todos = this.state.todos.map((todo, key) => {
			return (
				<li key={key}>
					{todo} <button onClick={this.handleDelete} type="submit" data-key={key} >X</button>
				</li>)
			;
		});

		return (
			<div className="App">
				<h1>Todo App</h1>
				<form onSubmit={this.handleSubmit}>
					<label htmlFor="todo_ipt">Todo: </label>
					<input type="text" name="todo_ipt" id="todo_ipt" onChange={this.handleChange} value={this.state.todoIptValue} required/>
					<button type="submit">Post</button>
				</form>
				<ul>
					{todos}
				</ul>
			</div>
		);
	}

}

export default App;
