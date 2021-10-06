/**
   MIT License

   Copyright (c) 2021 Joel Grenon

   Permission is hereby granted, free of charge, to any person obtaining a copy
   of this software and associated documentation files (the "Software"), to deal
   in the Software without restriction, including without limitation the rights
   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   copies of the Software, and to permit persons to whom the Software is
   furnished to do so, subject to the following conditions:

   The above copyright notice and this permission notice shall be included in all
   copies or substantial portions of the Software.

   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   SOFTWARE.
 */
function updateTodoListState({ type, key, id }, state, childState, { merge }) {
  if (type === "sync-child-state" && key === "todoList") {
    merge(
      state.lists.find(todoList => todoList.id === id),
      childState
    );
  }
}

/**
 * Root scope of the todo list app. This scope could have a system scope as parent and subscribe to a
 * security scope for user management and authentication (future)
 */
export function todoApp() {
  return () => ({
    locales: ["en"],
    initialValue: {
      title: "TodoApp",
      version: 1,
      lists: [],
      users: []
    },
    reducers: [updateTodoListState],
    schema: {
      title: { type: "string", value: { en: "TodoApp" } },
      version: { type: "integer" },
      users: {
        type: "array",
        items: {
          scopeRef: "todo-user"
        }
      },
      lists: {
        type: "array",
        items: {
          scopeRef: "todo-list"
        }
      }
    }
  });
}
