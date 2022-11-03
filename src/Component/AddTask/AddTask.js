import React, { useRef, useState } from 'react';
import toast from 'react-simple-toasts';
import { AddNewTask } from '../../HttpClient/HttpClient';
import showToast from '../../Toast/Toast';
import './AddTask.css';

const AddTask = (props) => {
  const taskInput = useRef(null);
  const [loading, setLoading] = useState(false);

  const keyPress = (event) => {
    if (event.key == 'Enter') {
      addNewTask();
    }
  };

  const addNewTask = () => {
    if (
      !taskInput.current.value ||
      taskInput.current.value.replace(' ', '') === ''
    ) {
      showToast('Please set your activity!', 'error');
      return;
    }
    setLoading(true);
    AddNewTask({ description: taskInput.current.value })
      .then((response) => {
        if (response.data.success) {
          props.setNewTaskId(response.data.data._id);
          taskInput.current.value = '';
          showToast('Task was added.', 'success');
        }
      })
      .finally(() => {
        setLoading(false);
        setTimeout(() => taskInput.current.focus(), 500);
      });
  };

  return (
    <div className='d-flex'>
      <input
        ref={taskInput}
        type='text'
        className='form-control'
        placeholder='What do you do today?'
        onKeyUp={keyPress}
        disabled={loading}
      />
      <button
        className='btn btn-primary add-button'
        onClick={addNewTask}
        disabled={loading}
      >
        Add
      </button>
    </div>
  );
};

export default AddTask;
