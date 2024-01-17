/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { getAuthors } from '../api/authorData';

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
        <Link href="/" passHref>
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
  
