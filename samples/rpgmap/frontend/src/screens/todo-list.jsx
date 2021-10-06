import { useState } from "react";
import { useScope, useDevice } from "../client";
import { TrashIcon } from "@heroicons/react/solid";
import { Link, useHistory } from "react-router-dom";
import ConfirmModal from "../components/confirm-modal";
import Spinner from "../components/spinner";
import { useForm } from "react-hook-form";

function Task({ id, name, assignedTo, creator, effort, comments, onDelete }) {
  return (
    <div className=' bg-indigo-600 p-1 rounded hover:bg-indigo-500 hover:cursor-pointer'>
      <div className='flex font-bold justify-between'>
        <span>{name}</span>
        <button onClick={() => onDelete(id)}>
          <TrashIcon className='h-5 w-5 text-pink-500' />
        </button>
      </div>
      <div className='text-xs font-extralight text-indigo-200'>
        created by: {creator}, assigned to: {assignedTo}, effort: {effort || 0}h {comments.length > 0 && <span>, {comments.length} comments</span>}
      </div>
    </div>
  );
}

export default function TodoList({ match }) {
  const { state: todoList, perform, dispatch } = useScope("todo-list", match.params.id);
  const { device } = useDevice();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const history = useHistory();
  const { register, reset, handleSubmit } = useForm();

  const onDeleteList = () => {
    setShowConfirmModal(false);
    perform("delete-list", { id: todoList.id }, function ({ success, error }) {
      if (!success) {
        console.error(error);
      } else {
        dispatch({ type: "message", message: `List ${todolist.name} was successfully deleted!` });
        history.goBack();
      }
    });
  };

  const onAddTask = taskInfo => {
    taskInfo.creator = device.identity;
    taskInfo.assignedTo = device.identity;
    taskInfo.tags = taskInfo.tags || todoList.tags || [];
    taskInfo.comments = [];
    taskInfo.listId = todoList.id;
    perform("add-task", taskInfo, function ({ success, error }) {
      if (success) {
        dispatch({ type: "message", message: "Task Added!" });
        reset();
      } else {
        console.error(error);
      }
    });
  };

  const onTaskDelete = id => {
    perform("delete-task", { id, listId: todoList.id }, function ({ error }) {
      if (error) {
        console.error(error);
      } else {
        dispatch({ type: "message", message: "Task Removed!" });
      }
    });
  };
  return todoList ? (
    <div className='max-w-3xl md:max-w-5xl min-w-max md:mx-auto md:shadow-xl md:rounded border border-indigo-800 bg-indigo-700'>
      <h1 className='text-xl p-2 text-indigo-100 font-bold mb-2 clear-both'>
        <button className='bg-pink-700 ring-1 hover:bg-cyan-400 text-base float-right font-bold py-1 px-2 rounded text-cyan-50' onClick={() => setShowConfirmModal(true)}>
          <TrashIcon className='h-5 w-5 text-pink-100' />
        </button>
        {todoList.name}
        <p className='text-xs text-indigo-300 font-light'>Connected as {device.identity}</p>
      </h1>
      <div className='flex flex-col text-indigo-100 bg-indigo-800 p-2 gap-1'>
        <ul className='flex flex-col gap-1 py-2 text-sm font-light'>
          {todoList.tasks.map(task => (
            <Task key={task.id} {...task} onDelete={onTaskDelete} />
          ))}
        </ul>
        <form className='bg-indigo-700 text-indigo-100 text-sm p-2 rounded flex gap-2' onSubmit={handleSubmit(onAddTask)}>
          <label className='mt-1'>Quick Task</label>
          <input className='flex-1 bg-indigo-100 text-indigo-900 p-1 text-sm rounded' {...register("name", { required: true })} />
          <button className='bg-indigo-300 text-indigo-900 p-1 rounded'>Add</button>
        </form>
      </div>
      <div className='text-right p-2'>
        <Link className='text-indigo-100 text-sm underline' to='/'>
          Back to all lists
        </Link>
      </div>
      <ConfirmModal
        title='Confirm Delete List'
        prompt={`Are your sure your want to delete list '${todoList.name}'?`}
        confirmText='Yes, Delete!'
        cancelText='No, Cancel'
        show={showConfirmModal}
        onConfirm={onDeleteList}
        onCancel={() => setShowConfirmModal(false)}
      />
    </div>
  ) : (
    <Spinner text='Loading...' />
  );
}
