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

/**
 * create a new list.
 *
 */
export function createList({ idgen }) {
  this.scope("todo-app");

  return (scope, data) => {
    data.id = idgen();
    data.tasks = [];
    scope.lists.push(data);
  };
}

export function updateList({ mutator, merge }) {
  this.scope("todo-app");
  return (scope, data) => mutator(scope.lists).updateOne({ id: data.id }, list => merge(list, data));
}

export function deleteList({ mutator }) {
  this.scope("todo-app");
  return (scope, { id }) => mutator(scope.lists).delete({ id });
}

/**
 * User specific list view. Query can be used to filter lists based on tags or name
 */
export function allVisibleLists({ view }) {
  this.scope("todo-app").immutable();
  return (scope, query = {}) => view(scope).select({ selector: ".lists", query }).render();
}
