import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../../components/Admin/Sidebar';

function Contact() {
  const [contacts, setContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [contactsPerPage] = useState(10);

  useEffect(() => {
    loadContacts();
  }, [currentPage]);

  const loadContacts = async () => {
    try {
      const response = await axios.get("http://localhost:8384/api/contact");
      setContacts(response.data.content);
    } catch (error) {
      console.error("Error loading contacts:", error);
    }
  };

  const deleteContact = async (id) => {
    try {
      await axios.delete(`http://localhost:8384/api/contact/${id}`);
      loadContacts();
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = contacts.slice(indexOfFirstContact, indexOfLastContact);

  return (
    <div className="d-flex">
        <Sidebar />

    <div className="container">
      <div className="py-4">
        <h1>Contact List</h1>
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Title</th>
              <th scope="col">Content</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentContacts.map((contact, index) => (
              <tr key={index}>
                <td>{contact.id}</td>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>{contact.title}</td>
                <td>{contact.content}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => deleteContact(contact.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <nav>
          <ul className="pagination">
            {[...Array(Math.ceil(contacts.length / contactsPerPage)).keys()].map((number) => (
              <li key={number + 1} className="page-item">
                <button className="page-link" onClick={() => paginate(number + 1)}>
                  {number + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
    </div>

  );
}

export default Contact;
