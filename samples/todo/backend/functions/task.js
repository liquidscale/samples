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
import { scopeRef } from "@liquidscale/platform";
export const scope = scopeRef("todo-list", {
  selector: ".tasks",
  idField: "listId"
});

export function addTask(scope, { idgen }) {
  return taskInfo => {
    taskInfo.id = idgen();
    return scope.tasks.push(taskInfo);
  };
}

export function deleteTask(scope, { morph }) {
  return ({ id }) => morph(scope.tasks).delete({ id });
}

export function updateTask(scope, { morph, merge }) {
  return taskInfo => morph(scope.tasks).update({ id: taskInfo.id }, task => merge(task, taskInfo));
}

export function completeTask(scope, { morph }) {
  return taskInfo =>
    morph(scope.tasks).update({ id: taskInfo.id }, task => {
      task.status = "complete";
    });
}

export function cancelTask(scope, { morph }) {
  return taskInfo =>
    morph(scope.tasks).update({ id: taskInfo.id }, task => {
      task.status = "cancel";
    });
}

export function moveTask(scope, { morph }) {
  return (taskInfo, direction) => {
    morph(scope.lists).move(taskInfo.id, direction);
  };
}

export function filteredTasks(scope, { view }) {
  return (query = {}, { height }) => view(scope).select(query, { height }).render();
}
