import { useState } from 'react';

import './App.css';

import AddUser from './components/Users/AddUser/AddUser';
import UsersList from './components/Users/UsersList/UserList';

function App() {

  const [ users, setUsers ] = useState([]);

  const addUserHandler = (id, userName, age) => {
    setUsers(prevState => {
      return [{id: id, userName: userName, age: age}, ...prevState];
    })
  };
  
  return (
    <div>
      <AddUser onAddUser={addUserHandler}/>
      {users.length > 0 && <UsersList users={users}/>} 
    </div>
  );
}

export default App;
