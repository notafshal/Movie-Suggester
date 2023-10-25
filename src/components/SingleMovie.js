import { Button, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const singleMovie = (props) => {
  return (
    <>
      <Col>
        <Card style={{ width: "20rem", minHeight: "700px" }}>
          <Card.Img
            variant="top"
            src={props.data.image}
            style={{ weight: "200px" }}
          />
          <Card.Body>
            <Card.Title>{props.data.name}</Card.Title>
            <Card.Text>{props.data.info}</Card.Text>
            <Link to={`/view/${props.data.id}`}>
              {" "}
              <Button variant="dark">View Details</Button>
            </Link>
          </Card.Body>
        </Card>
        {/* <div key={props.data.id}>
          <Link to={`/view/${props.data.id}`}>
            <span style={{ fontWeight: "bold" }}>{props.data.name}</span>
          </Link>
          <br />
          <img
            src={props.data.image}
            alt="Movie image"
            style={{ height: "100px" }}
          />
          <br />
          Info:{props.data.info}
          <br />
          Rating: {props.data.rating}
          <br />
          <br />
          <br />
        </div> */}
      </Col>
    </>
  );
};
export default singleMovie;
