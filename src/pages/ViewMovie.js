import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const ViewMovie = () => {
  const getParams = useParams();
  const getID = getParams.id;
  const [movieData, setMovieData] = useState({});

  useEffect(() => {
    getSingleMovieInfo();
  });

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
      View Movie
      <br />
      <button onClick={getSingleMovieInfo}>View Movie Detail</button>
      <br />
      <br />
      <h3>Movie Detail:</h3>
      <br />
      Movie Name: {movieData.name}
      <br />
      Info: {movieData.info}
      <br />
      Description :{movieData.desc}
      <br /> Image:
      <br />
      <img
        src={movieData.image}
        alt="Movie Image"
        style={{ height: "200px" }}
      />
      <br />
      rating:{movieData.rating}
    </>
  );
};
export default ViewMovie;
