import axios from "axios";
import { useRef } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import MovieNab from "../components/MovieNab";
import { Button, Container, Form } from "react-bootstrap";

const AddMovie = () => {
  const history = useHistory();
  const movie_name_reference = useRef();
  const rating_reference = useRef();
  const desc_reference = useRef();
  const addMovieHandler = async (e) => {
    e.preventDefault();
    const movieData = {
      movie_name: movie_name_reference.current.value,
      rating: rating_reference.current.value,
      description: desc_reference.current.value,
    };
    try {
      const response = await axios.post(
        "https://api.dynoacademy.com/test-api/v1/movies",
        movieData,
        {
          timeout: 10000,
        }
      );
      alert(response.data.message);
      history.replace("/");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.errors[0].message);
      } else {
        alert("Unknown error occured!! Try again");
      }
      alert(error.response.data.errors[0].message);
    }
  };
  return (
    <>
      <MovieNab />
      <br />
      <br />
      <Container>
        <form onSubmit={addMovieHandler}>
          <h3>Add a Movie</h3>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Movie Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Movie Name"
              ref={movie_name_reference}
              autoComplete={false}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type="number"
              placeholder="Rating..."
              ref={rating_reference}
              autoComplete={false}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="About Movie"
              ref={desc_reference}
              autoComplete={false}
            />
          </Form.Group>

          <Button variant="dark" type="submit">
            Add Movie
          </Button>
        </form>
      </Container>
    </>
  );
};
export default AddMovie;
