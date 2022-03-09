import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import data from "../Comp/mock-data.json";
import ReadOnlyRow from "../Comp/ReadOnlyRow";
import EditableRow from "../Comp/EditableRow";

const AddStudent = () => {

  const [contacts, setContacts] = useState(data);

  const [addFormData, setAddFormData] = useState({ name: "", age: "", course: "", batch: "", });

  const [editFormData, setEditFormData] = useState({ name: "", age: "", course: "", batch: "", });

  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      name: addFormData.name,
      age: addFormData.age,
      course: addFormData.course,
      batch: addFormData.batch,
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      name: editFormData.name,
      age: editFormData.age,
      course: editFormData.course,
      batch: editFormData.batch,
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      name: contact.name,
      age: contact.age,
      course: contact.course,
      batch: contact.batch,
    };

    setEditFormData(formValues);
  };

  return (
    <>
    <div className="app-container">
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Course</th>
              <th>Batch</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <Fragment>
                {editContactId === contact.id ? (
                  <EditableRow editFormData={editFormData} handleEditFormChange={handleEditFormChange} />
                ) : (
                  <ReadOnlyRow contact={contact} handleEditClick={handleEditClick} />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>
    </div>
    <div className='addform'>
      <form onSubmit={handleAddFormSubmit}>
        <input type="text" name="name" required="required" placeholder="name..." onChange={handleAddFormChange} />
        <input type="number" name="age" required="required" placeholder="age" onChange={handleAddFormChange} />
        <input type="text" name="course" required="required" placeholder="course..." onChange={handleAddFormChange} />
        <input type="text" name="batch" required="required" placeholder="batch..." onChange={handleAddFormChange} />
        <button type="submit">Add</button>
      </form>
    </div>
    </>
  );
};

export default AddStudent;