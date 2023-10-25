import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import MovieNab from "../components/MovieNab";
import SingleMovie from "../components/SingleMovie";
import { Container, Form, Row, Spinner } from "react-bootstrap";

const Index = () => {
  const [movies, setMovies] = useState([]);
  const [searchMovieText, setSearchMovieText] = useState("");
  const [searchErrorText, setsearchErrorText] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [loading, setloading] = useState(false);

  const [firstRun, setFirstRun] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, []);
  useEffect(() => {
    if (!firstRun) {
      //searching
      // console.log("search text change");
      const fetchTimer = setTimeout(() => {
        if (searchMovieText && searchMovieText.length > 2) {
          fetchMovies();
        } else if (searchMovieText.length < 1) {
          fetchMovies();
        } else {
          setsearchErrorText(
            "  Please enter atleast 3 characters for searching.."
          );
        }
      }, 1500);
      // console.log("Effect run successfully!");
      //clean up function
      return () => {
        clearTimeout(fetchTimer);
        // console.log("clean up!");
      };
    }
  }, [searchMovieText]);
  const fetchMovies = async () => {
    setloading(true);
    setsearchErrorText("");
    //Fetch resource
    // console.log("calling api...");
    try {
      const response = await axios.get(
        `https://api.dynoacademy.com/test-api/v1/movies?search=${searchMovieText}`
      );
      setMovies(response.data.moviesData);
      setIsError(false);
      setloading(false);
      setFirstRun(false);
    } catch (error) {
      setIsError(true);
      setErrorText("Cannot get movie info!!");
      setloading(false);
      setFirstRun(false);
    }

    console.log(movies);
  };
  return (
    <div className="App">
      <MovieNab />
      <div className="text-center mt-2">
        <Container>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Search Movie"
              onChange={(e) => setSearchMovieText(e.target.value)}
              value={searchMovieText}
            />
          </Form.Group>
          <div>
            <span style={{ color: "red" }}>{searchErrorText}</span>
          </div>
        </Container>
      </div>

      <br />
      {isError ? (
        <>
          <div
            style={{
              background: "red",
              color: "#fff",
              padding: "10px",
              margin: "5px",
            }}
          >
            {errorText}
          </div>
        </>
      ) : (
        <>
          <div
            style={{ background: "#e7e7e7", padding: "10px", margin: "10px" }}
          >
            <div>
              {loading ? (
                <>
                  <Container className="text-center">
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </Container>
                </>
              ) : (
                <></>
              )}
            </div>
            {!loading && movies.length < 1 ? (
              <>No Movies found</>
            ) : (
              <>
                {" "}
                <Row>
                  {movies.map((el) => (
                    <SingleMovie data={el} />
                  ))}
                </Row>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default Index;
