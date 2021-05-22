import React from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
`;

const MovieContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
  height: 80%;
  width: 90%;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 10px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 28px;
`;

const Poster = styled.div`
  width: 25%;
  height: 70%;
  background-color: transparent;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: cetner center;
`;

const SContainer = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
`;

const SPoster = styled.div`
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: cetner center;
  width: 100px;
  height: 150px;
  margin-left: 100px;
`;

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      id
      title
      medium_cover_image
      language
      rating
      description_intro
      isLiked @client
    }
    suggestions(id: $id) {
      id
      medium_cover_image
    }
  }
`;

export default () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id: parseInt(id) },
  });

  return (
    <Container>
      <MovieContainer>
        <Column>
          <Title>
            {loading
              ? "Loading..."
              : `${data.movie.title} ${data.movie.isLiked ? "👍" : "😭"}`}
          </Title>

          <Subtitle>
            {data?.movie?.language} · {data?.movie?.rating}
          </Subtitle>
          <Description>{data?.movie?.description_intro}</Description>
        </Column>
        <Poster bg={data?.movie?.medium_cover_image}></Poster>
      </MovieContainer>
      <SContainer>
        {data &&
          data.suggestions &&
          data.suggestions.map((s) => (
            <SPoster key={s.id} bg={s?.medium_cover_image} />
          ))}
      </SContainer>
    </Container>
  );
};
