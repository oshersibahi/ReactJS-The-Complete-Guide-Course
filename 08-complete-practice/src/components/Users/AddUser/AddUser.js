import { useState } from "react";

import styles from "./AddUser.module.css";

import Card from "../../UI/Card/Card";
import Button from "../../UI/Button/Button";
import ErrorModal from "../../UI/ErrorModal/ErrorModal";

const AddUser = (props) => {
  const [enteredUserName, setEnteredUserName] = useState("");
  const [enteredAge, setEnteredAge] = useState("");

  const [error, setError] = useState();

  const userNameChangeHandler = (event) => {
    setEnteredUserName(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };

  const addUserHandler = (event) => {
    event.preventDefault();

    if (enteredUserName.trim().length === 0) {
      setError((prevState) => {
        return {
          title: "Invalid Input",
          message: "User name field is empty. Please enter an user name.",
        };
      });
      return;
    }

    if (enteredAge.trim().length === 0) {
      setError((prevState) => {
        return {
          title: "Invalid Input",
          message: "Age field is empty. Please enter an age.",
        };
      });
      return;
    }

    if (enteredAge.trim() < 0) {
      setError((prevState) => {
        return {
          title: "Invalid Input",
          message: "Age is invalid. Please enter a valid (age > 0) age.",
        };
      });
      return;
    }

    props.onAddUser(Math.random(), enteredUserName, enteredAge);
    setEnteredUserName("");
    setEnteredAge("");
  };

  const errorHandler = (event) => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <ErrorModal
          onConfirm={errorHandler}
          title={error.title}
          message={error.message}
        ></ErrorModal>
      )}
      <Card className={styles.input}>
        <form onSubmit={addUserHandler}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              onChange={userNameChangeHandler}
              value={enteredUserName}
            />
          </div>
          <div>
            <label htmlFor="age">Age (Years)</label>
            <input
              id="age"
              type="number"
              onChange={ageChangeHandler}
              value={enteredAge}
            />
          </div>
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
