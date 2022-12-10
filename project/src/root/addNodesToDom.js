/**
 * Adds nodes to the DOM
 * @param {string} container - The name of the container to add the HTML nodes to.
 * @param {string} name - The name of the HTML file to add.
 * @param {function} callback - The callback function to call after the HTML is loaded.
 * @returns {object} - An object that holds all the variables.
 */
function addNodesToDom(container, name, callback) {
  const scope = {}
  $(container).load(`../../html/${name}`, () => {
    toScope(container, scope)
    if (callback) callback(scope)
  })
}

function toScope(node, scope) {
    const {children} = node;
    for (let iChild = 0; iChild < children.length; iChild+=1) {
        if (children[iChild].getAttribute('var')) {
            const name = children[iChild].getAttribute('var');
            scope[name] = children[iChild];
        }
        toScope(children[iChild], scope);
    }
}