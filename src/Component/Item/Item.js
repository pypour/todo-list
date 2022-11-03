import React, { useEffect, useRef, useState } from "react";
import { DeleteTask, UpdateTask } from "../../HttpClient/HttpClient";
import showToast from "../../Toast/Toast";
import "./Item.css";

const Item = (props) => {
  const [state, setState] = useState(props.task.completed);
  const [disabled, setDisabled] = useState(false);

  const changeState = (event) => {
    setState(event.target.checked);
    UpdateTask(props.task._id, event.target.checked)
      .then((response) => {
        if (response.data.success) {
          showToast("Task was updated.", "success");
        } else {
          setState(!event.target.checked);
        }
      })
      .catch(() => {
        showToast("An error has occured!", "error");
        setState(!event.target.checked);
      });
  };

  const deleteTask = () => {
    setDisabled(true);
    DeleteTask(props.task._id)
      .then(() => {
        showToast("Task was deleted.", "success");
        props.reload();
      })
      .finally(() => setDisabled(false));
  };

  const checkBox = useRef(null);

  useEffect(() => {
    checkBox.current.checked = state;
  });

  return (
    <li
      id={props.task._id}
      className={
        (state ? "border-bottom mb-2 completed" : "border-bottom mb-2") +
        (disabled ? " disabled" : "")
      }
    >
      <div className="form-check">
        <label className="form-check-label">
          <input type="checkbox" ref={checkBox} onClick={changeState} />
          {props.task.description}
          <i className="input-helper"></i>
        </label>
      </div>
      <i
        className="remove mdi mdi-close-circle-outline"
        onClick={deleteTask}
      ></i>
    </li>
  );
};

export default Item;
