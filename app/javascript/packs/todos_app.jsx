// Run this example by adding <%= javascript_pack_tag 'todos_app' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react';
import ReactDOM from 'react-dom';

const TodosApp = () => <div>Hello</div>;

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <TodosApp />,
    document.body.appendChild(document.createElement('div'))
  );
});
