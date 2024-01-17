/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getAuthors } from '../api/authorData';
import AuthorCard from '../components/forms/AuthorCard';

export default function author() {

  const [authors, setAuthors] = useState([]);

  const { user } = useAuth();
  
  const getAllTheAuthors = () => {
    getAuthors(user.uid).then(setAuthors);
  };
  
  useEffect(() => {
    getAllTheAuthors();
   }, []);
  
  return (
    <div className="text-center my-4">
      <Link href="/author/new" passHref>
        <Button>Add An Author</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {authors.map((author) => (
          <AuthorCard key={author.firebaseKey} authorObj={author} onUpdate={getAllTheAuthors} />
        ))}
      </div>
  
    </div>
  );
}
  
