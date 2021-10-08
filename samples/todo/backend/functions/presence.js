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

export function updatePresence() {
  this.scope("todo-app");

  return (scope, { status = "active", device, identity, color }, { meta }) => {
    const user = scope.users.find(u => u.identity === identity);
    if (user) {
      user.color = color;
      user.device = device;
      user.status = status;
      user.connId = meta.connId;
      user.lastUpdate = new Date();
    } else {
      scope.users.push({
        identity,
        color,
        device,
        status,
        connId: meta.connId,
        lastUpdate: new Date()
      });
    }
  };
}

export function checkPresence({ timer, config }) {
  this.scope("todo-app");

  // declare a trigger for this function
  this.trigger(timer(config.presence.check_interval, "30s"));

  return () =>
    scope.users
      .filter(user => Date.now() - user.lastUpdate.getTime() >= config.presence.last_update_threshold)
      .map(disconnectedUser => {
        disconnectedUser.status = "inactive";
        disconnectedUser.connId = null;
        disconnectedUser.lastUpdate = new Date();
      });
}
