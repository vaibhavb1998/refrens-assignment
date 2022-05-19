import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// reducers
import {
  getCharacterById,
  getAllEpisodeList,
  episodeIdsFetchedSuccessAction,
} from "../../store/reducers/character.reducer";

function CharacterView() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  // Current character information
  const characterData = useSelector((state) => state.character.characterData);

  // This list is having all the episodes details fetched so far
  const episodeMasterList = useSelector(
    (state) => state.character.episodeMasterList,
  );

  // This list is having all the episode ids fetched so far
  const episodeIdsFetched = useSelector(
    (state) => state.character.episodeIdsFetched,
  );

  // This is the list of episode ids of current character needs to be rendered
  const [currentEpisodeIds, setCurrentEpisodeIds] = useState([]);

  // This is the list of episode ids that needs to fetched from api (using this useState for displaying count over page)
  const [newEpisodeIds, setNewEpisodeIds] = useState([]);

  // This is the list after apply filter to which all episodes should be shown on the page
  const [filteredList, setFilteredList] = useState([]);

  // Getting current character details
  useEffect(() => {
    dispatch(
      getCharacterById({
        url: `https://rickandmortyapi.com/api/character/${id}`,
      }),
    );
  }, [dispatch, id]);

  // Getting episode details of current character
  useEffect(() => {
    if (characterData?.episode?.length) {
      // Creating a list of ids from the api urls
      const episodeIds = characterData.episode.map((ep) => {
        const chunks = ep.split("/");
        return chunks[chunks.length - 1];
      });

      // List of new episode ids that needs to be fetched, for which we have not stored before
      const remainingIds = episodeIds.filter(
        (epId) => !episodeIdsFetched.includes(epId),
      );

      // Setting the list of episode ids we have fetched so far
      dispatch(episodeIdsFetchedSuccessAction(remainingIds));

      // Setting this for filter and to show the count on page
      setCurrentEpisodeIds(episodeIds);
      setNewEpisodeIds(remainingIds);

      // Making string of the episode ids that need to be fetched
      const episodesIdString = remainingIds.join(",");

      // Only call the api if we have an episode id for which we don't have the data, else take data from store
      if (episodesIdString) {
        dispatch(
          getAllEpisodeList({
            url: `https://rickandmortyapi.com/api/episode/${episodesIdString}`,
          }),
        );
      }
    }
  }, [characterData.id]);

  // Applying filter
  useEffect(() => {
    setFilteredList(
      episodeMasterList
        .filter((episode) => currentEpisodeIds.includes(episode.id.toString()))
        .sort((a, b) => a.id - b.id),
    );
  }, [episodeMasterList, currentEpisodeIds]);

  return (
    <div>
      <button
        type="button"
        className="text-2xl font-bold"
        onClick={() => navigate("/")}
      >
        {"<-"} Navigate Back
      </button>

      <div className="rounded-xl sm:flex space-x-6 bg-white bg-opacity-50 shadow-md hover:shadow-xl overflow-hidden min-h-[320px] lg:min-h-[280px] transition-all p-12">
        <div>
          <img
            src={characterData.image}
            alt={characterData.name}
            loading="lazy"
            width="300"
            height="300"
          />
        </div>
        <div className="w-full pl-0 p-2">
          <div className="space-y-2">
            <div>
              <div className="text-2xl mb-4">
                <span>
                  Number of episodes of character:{" "}
                  <span className="font-bold">{currentEpisodeIds.length}</span>
                </span>
                <span className="ml-4">
                  Number of new episodes fetched:{" "}
                  <span className="font-bold">{newEpisodeIds.length}</span>
                </span>
              </div>
            </div>
            <div className="w-100">
              <div className="grid grid-cols-1 xl:grid-cols-2">
                {filteredList.map((episode) => {
                  return (
                    <span key={episode.id}>
                      <span className="mr-2 h-[8px] w-[8px] rounded-full inline-block bg-blue-600" />
                      <span className="text-[16px]">
                        {episode.name} ({episode.id})
                      </span>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharacterView;
