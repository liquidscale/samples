import { useState } from "react";
import { useView } from "../client";
import TodoListSummary from "./todo-list-summary";
import AddListModal from "./add-list-modal";
import { trim } from "lodash";

export default function Lists() {
  const { data: lists, local, perform, dispatch } = useView("all-visible-lists");
  const [showAddListModal, setShowAddListModal] = useState(false);

  const onAddList = listInfo => {
    listInfo.owner = local.identity;
    listInfo.tags = listInfo.tags
      ? listInfo.tags
          .split(",")
          .map(trim)
          .map(t => t.toLowerCase())
      : [];
    perform("create-list", listInfo, function ({ error }) {
      if (error) {
        console.error(error);
      } else {
        dispatch({ type: "message", message: "List was successfully created" });
      }
    });
    setShowAddListModal(false);
  };

  return (
    <div className='max-w-3xl md:max-w-5xl min-w-max md:mx-auto md:shadow-xl md:rounded border border-indigo-800 bg-indigo-700'>
      <h1 className='text-xl p-2 text-indigo-100 font-bold mb-2 clear-both'>
        <button className='bg-cyan-500 ring-1 hover:bg-cyan-400 text-base float-right font-bold py-1 px-2 rounded text-cyan-50' onClick={() => setShowAddListModal(true)}>
          Add List
        </button>
        My Todo Lists
      </h1>
      <div className='flex flex-col bg-indigo-800 p-2 gap-1'>
        {lists.length === 0 && (
          <div className='bg-amber-300 p-1 border border-amber-400 text-amber-800 rounded'>
            <strong>No list found.</strong> Use Add button above to create a new one
          </div>
        )}
        {lists.map((todoList, idx) => (
          <TodoListSummary key={idx} {...todoList} />
        ))}
      </div>
      {showAddListModal && <AddListModal open={showAddListModal} onSubmit={onAddList} onClose={() => setShowAddListModal(false)} />}
    </div>
  );
}
