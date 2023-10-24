import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

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
      <div>
        <Link to="/add">Add Movie</Link>
      </div>
      <div>
        <input
          type="text"
          value={searchMovieText}
          placeholder="Search Movie"
          onChange={(e) => setSearchMovieText(e.target.value)}
        />
        <span style={{ color: "red" }}>{searchErrorText}</span>
      </div>
      Suggested Movies:
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
            <div>{loading ? <>Loading.....</> : <></>}</div>
            {!loading && movies.length < 1 ? (
              <>No Movies found</>
            ) : (
              <>
                {" "}
                {movies.map((el) => (
                  <>
                    <div key={el.id}>
                      <Link to={`/view/${el.id}`}>
                        <span style={{ fontWeight: "bold" }}>{el.name}</span>
                      </Link>
                      <br />
                      <img
                        src={el.image}
                        alt="Movie image"
                        style={{ height: "100px" }}
                      />
                      <br />
                      Info:{el.info}
                      <br />
                      Rating: {el.rating}
                      <br />
                      <br />
                      <br />
                    </div>
                  </>
                ))}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default Index;
