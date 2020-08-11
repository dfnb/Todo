import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Axios from 'axios'
import TaskList from './TaskList'

function App(props) {
	const [links,setlinks] = useState({});
	const [inputtext,setInputtext] = useState("");
	const [taskLists,setTaskLists] = useState([]);
	let kk = {}

    useEffect(() => {
		Axios.get('/api')
		.then(response => setlinks(response.data._links))
		.catch(error => console.log(error))
	}, []);

	useEffect(() => getTaskLists(),[links])

	const getTaskLists = () => {
		if (Object.keys(links).length === 0 && links.constructor === Object) return
		Axios.get(links.taskLists.href)
		.then( response => setTaskLists(response.data._embedded.taskLists))
		.then(() => setInputtext(''))
		.catch(error => console.log(error));
	}

	const addTaskList = () => {
		Axios.post(links.taskLists.href,{ description: inputtext })
		.then(() => getTaskLists())
		.catch(error => console.log(error));
	}
	
	return (
		<div>
			<div>
				<input type="text" value={inputtext} onChange={event => setInputtext(event.target.value)} />
				<button onClick={() => addTaskList()} >Add</button>
			</div>	
			{taskLists.map((singleTaskList,index) => <TaskList key={index} taskListItemBaseUrl={links.taskListItems.href} data={singleTaskList} />)}
		</div>
	)

}

ReactDOM.render(
	<App />,
	document.getElementById('react')
)

