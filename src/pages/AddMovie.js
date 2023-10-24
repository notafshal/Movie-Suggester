import axios from "axios";
import { useRef } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";

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
      <Link to="/">Home</Link>
      <br />
      <br />
      <form onSubmit={addMovieHandler}>
        Movie Name : <br />
        <input
          type="text"
          placeholder="Movie Name"
          ref={movie_name_reference}
        />
        {""}
        <br /> <br />
        Rating:
        <br />
        <input type="text" placeholder="Rating" ref={rating_reference} />
        <br /> <br />
        Description: <br />
        <textarea ref={desc_reference}></textarea>
        <br /> <br />
        <button type="submit">Add Movie</button>
      </form>
    </>
  );
};
export default AddMovie;
