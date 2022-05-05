import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// ui-components
import CharacterCard from "../../ui-components/CharacterCard";
import Pagination from "../../ui-components/Pagination";

// reducers
import { getCharactersList } from "../../store/reducers/character.reducer";

// ==============================|| CHARACTERS LIST ||============================== //

export default function CharactersList() {
  const dispatch = useDispatch();
  const characters = useSelector((state) => state.character.results);
  const pageInfo = useSelector((state) => state.character.info);
  const apiLoading = useSelector((state) => state.character.loading);

  const fetchCharactersList = useCallback(
    (url) => dispatch(getCharactersList({ url })),
    [dispatch],
  );

  useEffect(() => {
    fetchCharactersList("https://rickandmortyapi.com/api/character/?page=1");
  }, [dispatch, fetchCharactersList]);

  const handleNext = useCallback(() => {
    fetchCharactersList(pageInfo.next);
  }, [pageInfo.next]);

  const handlePrev = useCallback(() => {
    fetchCharactersList(pageInfo.prev);
  }, [pageInfo.prev]);

  return (
    <div className="space-y-20">
      <h1 className="text-center font-bold text-8xl">Rick & Morty</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12">
        {characters.map((character) => (
          <CharacterCard
            key={character.id}
            name={character.name}
            status={character.status}
            species={character.species}
            gender={character.gender}
            origin={character.origin.name}
            location={character.location.name}
            image={character.image}
          />
        ))}
      </div>

      <Pagination
        handlePrev={handlePrev}
        prevDisabled={!pageInfo.prev}
        handleNext={handleNext}
        nextDisabled={!pageInfo.next}
        loading={apiLoading}
      />
    </div>
  );
}
