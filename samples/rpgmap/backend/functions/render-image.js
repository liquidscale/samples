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
 * Render the background image associated with the specified map id. Image storing and rendering
 * is performed using media extension plugin.
 */
export function renderImage({ mediaRenderer, mediaStore, gateway }) {
  // Define the scope of this function
  this.scope("rpg-map-app", {
    selector: ".maps",
    immutable: true
  });

  // Mount this function to an HTTP endpoint for easy call from the client
  this.mount(gateway("http").mountpoint("/media/:id", { method: "get" }));

  return ({ maps }, id) => {
    const map = maps.find((m = m.id === id));
    return mediaRenderer.render(mediaStore.load(map.imagePath));
  };
}
