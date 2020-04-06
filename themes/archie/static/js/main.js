var expanders = document.getElementsByClassName('expander');
for (var i = 0; i < expanders.length; i++) {
  (function() {
    var expander = expanders[i];
    var content = expander.children[0];

    var button = document.createElement('button');
    button.appendChild(document.createTextNode('expand'));
    expander.appendChild(button);

    content.style.height = expander.dataset.height || '12.5em';
    button.onclick = function() {
      content.style.height = 'auto';
      button.remove();
    }
  })();
}
