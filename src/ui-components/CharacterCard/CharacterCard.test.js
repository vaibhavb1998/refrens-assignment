import { render, screen } from "@testing-library/react";
import CharacterCard from ".";

test("render character card component", () => {
  const character = {
    id: 361,
    name: "Toxic Rick",
    status: "Dead",
    species: "Humanoid",
    type: "Rick's Toxic Side",
    gender: "Male",
    origin: {
      name: "Alien Spa",
      url: "https://rickandmortyapi.com/api/location/64",
    },
    location: {
      name: "Earth",
      url: "https://rickandmortyapi.com/api/location/20",
    },
    image: "https://rickandmortyapi.com/api/character/avatar/361.jpeg",
    episode: ["https://rickandmortyapi.com/api/episode/27"],
    url: "https://rickandmortyapi.com/api/character/361",
    created: "2018-01-10T18:20:41.703Z",
  };

  render(
    <CharacterCard
      name={character.name}
      status={character.status}
      species={character.species}
      gender={character.gender}
      origin={character.origin.name}
      location={character.location.name}
      image={character.image}
    />,
  );

  const characterName = screen.getByText(/Toxic Rick/i);
  const characterStatus = screen.getByText(/Dead/i);
  const characterSpecies = screen.getByText(/Humanoid/i);
  const characterGender = screen.getByText(/Male/i);
  const characterOrigin = screen.getByText(/Alien Spa/i);
  const characterLocation = screen.getByText(/Earth/i);

  expect(characterName).toBeInTheDocument();
  expect(characterStatus).toBeInTheDocument();
  expect(characterSpecies).toBeInTheDocument();
  expect(characterGender).toBeInTheDocument();
  expect(characterOrigin).toBeInTheDocument();
  expect(characterLocation).toBeInTheDocument();
});
