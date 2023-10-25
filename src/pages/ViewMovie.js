import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import MovieNab from "../components/MovieNab";
import { Button, Card, Container } from "react-bootstrap";

const ViewMovie = () => {
  const getParams = useParams();
  const getID = getParams.id;
  const [movieData, setMovieData] = useState({});

  useEffect(() => {
    getSingleMovieInfo();
  }, []);

  const getSingleMovieInfo = async () => {
    try {
      const response = await axios.get(
        `https://api.dynoacademy.com/test-api/v1/movie/${getID}`
      );
      setMovieData(response.data.singleMovieData);
    } catch (error) {
      alert("Error");
    }
  };
  return (
    <>
      <MovieNab />
      <Container>
        <h1 className="text-info">{movieData.name}</h1> <br />
        <br />
        <Card className="px-5">
          <Card.Body>
            <img
              src={movieData.image}
              alt="Movie Image"
              style={{ height: "200px", width: "200px" }}
            />
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            {movieData.info}
            {movieData.desc}
            <br />
            Rating: {movieData.rating}
          </Card.Body>
        </Card>{" "}
        <br />
        <Link to="/">
          <Button className="bg-dark text-light">Home</Button>
        </Link>
      </Container>
    </>
  );
};
export default ViewMovie;
