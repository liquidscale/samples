import { useState, useContext } from "react";
import { LQSContext } from "../client";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import ConfirmModal from "./confirm-modal";
import { Link } from "react-router-dom";

export default function TodoListSummary({ name, id, owner, tags, tasks }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { perform, dispatch } = useContext(LQSContext);

  const onConfirm = () => {
    setShowDeleteConfirm(false);
    perform("delete-list", { id }, function ({ error }) {
      if (error) {
        console.error(error);
      } else {
        dispatch({ type: "message", message: "List was successfully deleted" });
      }
    });
  };

  const onCancel = () => setShowDeleteConfirm(false);

  return (
    <div className='flex bg-indigo-200 p-2 rounded'>
      <div className='flex flex-1 flex-col'>
        <p className='text-indigo-800'>
          <Link className='hover:underline' to={`/lists/${id}`}>
            {name} ({tasks.length})
          </Link>{" "}
          <span className='text-xs'>by {owner}</span>
        </p>
        <div className='flex justify-start gap-1 text-xs'>
          {tags.map((tag, idx) => (
            <span key={idx} className='text-indigo-200 p-1 bg-indigo-500 rounded border border-indigo-300'>
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className='flex flex-shrink-0 gap-x-1'>
        <button className='flex-1 h-8 text-xs bg-amber-300 border border-amber-400 rounded p-1 text-amber-900'>
          <PencilAltIcon className='h-4 w-4 text-amber-900' />
        </button>
        <button onClick={() => setShowDeleteConfirm(true)} className='flex-1 h-8 text-xs bg-pink-700 border border-pink-800 rounded p-1 text-pink-100'>
          <TrashIcon className='h-4 w-4 text-pink-100' />
        </button>
      </div>
      <ConfirmModal
        show={showDeleteConfirm}
        title='Delete list'
        prompt={`Do you really want to delete list '${name}'?`}
        confirmText='Delete'
        cancelText='Cancel'
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    </div>
  );
}
