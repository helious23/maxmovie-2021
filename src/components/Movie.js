import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  height: 400px;
  width: 100%;
`;

const Poster = styled.div`
  background-image: url(${(props) => props.bg});
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center center;
`;

export default ({ id, bg }) => (
  <Container>
    <Link to={`/${id}`}>
      <Poster bg={bg} />
    </Link>
  </Container>
);
