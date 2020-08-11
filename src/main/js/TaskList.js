import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';
import TaskListItem from './TaskListItem';

function TaskList(props) {

    const [data, setData] = useState(props.data);
    const [itens, setItens] = useState([]);
    const [onInputTaskListChange$] = useState(()=>new Subject());
    const [onInputNewTaskChange$] = useState(()=>new Subject());
    const [description, setDescription] = useState(props.data.description);
    const [descriptionNewItem, setDescriptionNewItem] = useState("");
    
    useEffect(() => {
        Axios.get(data._links.taskListItems.href)
            .then( response => setItens( response.data._embedded.taskListItems ))
            .catch(error => console.log(error))

        const subscription = onInputTaskListChange$.pipe(
            debounceTime(400),
            distinctUntilChanged()
            ).subscribe(setData);

        const subscription2 = onInputNewTaskChange$.pipe(
            debounceTime(800),
            distinctUntilChanged()
            ).subscribe(addItem);
    }, []);

    const handleDescription = e => {
        setDescription(e.target.value);
        onInputTaskListChange$.next({...data, description : event.target.value});
    };

    useEffect(() => {
        Axios.put(data._links.self.href, data)
        .catch(error => console.log(error))
    },[data])


    const addItem = (description) => {
        Axios.post(props.taskListItemBaseUrl, {
            description: description,
            isChecked: false
        })
        .then( response => Promise.all([
            response.data,
            Axios.post(data._links.taskListItems.href, response.data._links.self.href, { headers: { 'Content-Type': 'text/uri-list' } })
        ]))
        .then( resolves => setItens(oldArray => [ ... oldArray, resolves[0] ]))
        .then( () => setDescriptionNewItem( "" ))
        .catch(error => console.log(error))
    }

    const delItem = (_links,index) => {
        let id = _links.self.href.match(new RegExp('\/[0-9]*$'))
        Axios.delete(data._links.self.href + "/taskListItems" + id[0])
        .then( () => Axios.delete(_links.self.href))
        .then( () => setItens(oldArray => oldArray.filter( (_,i) => i !==  index) ))
        .catch(error => console.log(error))

    }

    return ( 
    <div style={{marginTop: "20px"}}>
        <div>
            <input type="text" value={description} onChange={handleDescription} />
        </div>
        <ul>
            {itens.map( (item, index) => 
            <li>
                <TaskListItem key={index} data={item} />
                <button onClick={() => delItem(item._links, index)} >X</button>
            </li> 
            )}
            <li>
                <input type="text" placeholder="Type to add new items" value={descriptionNewItem} onChange={(e) => {
                    setDescriptionNewItem( e.target.value )
                    onInputNewTaskChange$.next( e.target.value )
                    }} />
            </li>
        </ul>
        
    </div> )
}

export default TaskList 