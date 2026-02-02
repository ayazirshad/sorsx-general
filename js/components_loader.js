/**
 * Loads an HTML component into a specified element.
 * @param {string} elementId - The ID of the element to inject the component into.
 * @param {string} componentPath - The path to the component HTML file.
 * @param {function} [callback] - Optional callback function to run after the component is loaded.
 */
function loadComponent(elementId, componentPath, callback) {
  const placeholder = document.getElementById(elementId);
  if (!placeholder) {
    console.error(`Element with ID "${elementId}" not found.`);
    return;
  }

  fetch(componentPath)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load component: ${response.statusText}`);
      }
      return response.text();
    })
    .then((html) => {
      placeholder.innerHTML = html;
      if (callback) callback();
    })
    .catch((error) => {
      console.error("Error loading component:", error);
    });
}
