import React from "react";
import Link from "next/link";
import { Button } from "react-bootstrap";
import { Card } from "react-bootstrap";

export default function AuthorCard({ authorObj }) {

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={authorObj.image} alt={authorObj.first_name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{authorObj.first_name} {authorObj.last_name}</Card.Title>
        <Link href={`/author/${authorObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        <Link href='/'>
          <Button>EDIT</Button>
        </Link>
        <Button variant="danger">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}
