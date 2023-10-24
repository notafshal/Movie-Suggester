import axios from "axios";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const AddMovie = () => {
  const addMovieHandler = async (e) => {
    e.preventDefault();
    const movieData = {
      movie_name: "Dummy",
      rating: 7,
      description: " Khatra movie",
    };
    try {
      const response = await axios.post(
        "https://api.dynoacademy.com/test-api/v1/movies",
        movieData
      );
      console.log(response);
    } catch (error) {}
  };
  return (
    <>
      <Link to="/">Home</Link>
      <br />
      <br />
      <form onSubmit={addMovieHandler}>
        <input type="text" placeholder="Movie Name" />
        <br /> <br />
        <input type="text" placeholder="Rating" />
        <br /> <br />
        <textarea></textarea>
        <br /> <br />
        <button type="submit">Add Movie</button>
      </form>
    </>
  );
};
export default AddMovie;
