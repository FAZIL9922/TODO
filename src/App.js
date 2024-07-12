import React, { useEffect, useState } from 'react';
import ToDo from './components/ToDo';
import { addToDo, getAllToDo, updateToDo, deleteToDo } from './utils/HandleApi';
import './index.css';


// Declare particlesJS as a global variable
/* global particlesJS */

const App = () => {
  useEffect(() => {
    particlesJS.load('particles-js', `${process.env.PUBLIC_URL}/assets/particles.json`, function() {
      console.log('callback - particles.js config loaded');
    });
  }, []);

  const [toDo, setToDo] = useState([]);
  const [text, setText] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [toDoId, setToDoId] = useState('');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    getAllToDo(setToDo);
  }, []);

  const updateMode = (_id, text) => {
    setIsUpdating(true);
    setText(text);
    setToDoId(_id);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.className = newTheme;
  };

  return (
    <>
    <div id="particles-js"></div>
    <div className={`App ${theme}`}>
      <div className="container">
        <h1>ToDo App</h1>
        <button className="theme-toggle" onClick={toggleTheme}>
          Toggle Theme
        </button>
        <div className="top">
          <input
            type="text"
            placeholder="Add ToDos..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div
            className="add"
            onClick={
              isUpdating
                ? () => updateToDo(toDoId, text, setToDo, setText, setIsUpdating)
                : () => addToDo(text, setText, setToDo)
            }
          >
            {isUpdating ? 'Update' : 'Add'}
          </div>
        </div>
        <div className="list">
          {toDo.map((item) => (
            <ToDo
              key={item._id}
              text={item.text}
              updateMode={() => updateMode(item._id, item.text)}
              deleteToDo={() => deleteToDo(item._id, setToDo)}
            />
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default App;
