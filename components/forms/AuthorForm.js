import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { updateAuthor, createAuthor } from '../../api/authorData';

const initialState = {
  image: '',
  email: '',
  first_name: '',
  last_name: '',
  favorite: false,
};

function AuthorForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj && obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateAuthor(formInput).then(() => router.push(`/author/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createAuthor(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateAuthor(patchPayload).then(() => {
          router.push('/authors');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj && obj.firebaseKey ? 'Update' : 'Create'} Author</h2>

            {/* Email INPUT  */}
            <FloatingLabel controlId="floatingInput1"  className="mb-3"  label="Email">
        <Form.Control
          type="email"
          placeholder="Email"
          name="email"
          value={formInput.email}
          onChange={handleChange}
          required
          autocomplete='off'
        />
      </FloatingLabel>

      {/* FIRST_NAME INPUT  */}
      <FloatingLabel controlId="floatingInput2"  className="mb-3"  label="First Name">
        <Form.Control
          type="text"
          placeholder="First Name"
          name="first_name"
          value={formInput.first_name}
          onChange={handleChange}
          required
          autocomplete='off'
        />
      </FloatingLabel>

      {/* LAST_NAME INPUT  */}
      <FloatingLabel controlId="floatingInput3"  className="mb-3" label="Last Name">
        <Form.Control
          type="text"
          placeholder="Last Name"
          name="last_name"
          value={formInput.last_name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput4" label="Author Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* A WAY TO HANDLE UPDATES FOR TOGGLES, RADIOS, ETC  */}
      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="favorite"
        name="favorite"
        label="Favorite?"
        checked={formInput.favorite}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            favorite: e.target.checked,
          }));
        }}
      />

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj && obj.firebaseKey ? 'Update' : 'Create'} Author</Button>
    </Form>
  );
}

AuthorForm.propTypes = {
  obj: PropTypes.shape({
    image: PropTypes.string,
    email: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    favorite: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }).isRequired,
};

AuthorForm.defaultProps = {
  obj: initialState,
};

export default AuthorForm;
