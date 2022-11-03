import React, { useEffect, useState } from 'react';
import { GetTasks } from '../../HttpClient/HttpClient';
import Item from '../Item/Item';
import './TaskList.css';
import Loading from '../../Loading/Loading'

const TaskList = (props) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    reload();
  }, [props.newTaskId]);

  const reload = () => {
    setLoading(true);
    GetTasks().then((response) => {
      setTasks(response.data.data);
    }).finally(() => setLoading(false));
  };

  return (
    <React.Fragment>
      {loading && <Loading></Loading>}
      {!loading && tasks && (
        <div className='list-wrapper'>
          <ul className='d-flex flex-column-reverse'>
            {tasks
              .sort((a, b) => a.description.localeCompare(b.description))
              .map((item) => (
                <Item key={item._id} reload={reload} task={item}></Item>
              ))}
          </ul>
        </div>
      )}
    </React.Fragment>
  );
};

export default TaskList;
