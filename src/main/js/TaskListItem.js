import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';


function TaskListItem(props) {
    const [data, setData] = useState(props.data);
    const [description, setDescription] = useState(props.data.description);
    const [isChecked, setIsChecked] = useState(props.data.isChecked);
    const [onInputChange$] = useState(()=> new Subject());

    useEffect(() => {
        const subscription = onInputChange$.pipe(
          debounceTime(400),
          distinctUntilChanged()
        ).subscribe(setData);
      }, [])

    useEffect(() => {
        Axios.put(data._links.self.href, data)
        .catch(error => console.log(error))
    },[data])

    const handleDescription = e => {
        setDescription(e.target.value);
        onInputChange$.next({...data, description : e.target.value});
    };

    const handleIsChecked = e => {
        setIsChecked(oldIsChecked => !oldIsChecked);
        setData(oldData => ({...oldData, isChecked : !oldData.isChecked}));
    };

    return  <>
        <input type="checkbox" defaultChecked={isChecked} onChange={handleIsChecked} />
        <input type="text" value={description} onChange={handleDescription} />
    </> 
}

export default TaskListItem 