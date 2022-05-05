import PropTypes from "prop-types";

function getStatusColor(status) {
  switch (status) {
    case "Alive":
      return "bg-green-600";
    case "Dead":
      return "bg-red-600";
    default:
      return "bg-gray-600";
  }
}

// ==============================|| CHARACTER CARD ||============================== //

export default function CharacterCard({
  name,
  status,
  species,
  gender,
  origin,
  location,
  image,
}) {
  return (
    <div className="rounded-xl sm:flex space-x-6 bg-white bg-opacity-50 shadow-md hover:shadow-xl overflow-hidden min-h-[320px] lg:min-h-[280px] transition-all">
      <img
        src={image}
        alt={name}
        loading="lazy"
        width="300"
        height="300"
        className="h-56 sm:h-full w-full sm:w-5/12 object-cover object-top transition duration-500"
      />
      <div className="sm:w-7/12 pl-0 p-2">
        <div className="space-y-2">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-pink-500">{name}</h1>
            <p className="text-gray-600">
              <span
                className={`mr-2 h-[10px] w-[10px] rounded-full inline-block ${getStatusColor(
                  status,
                )}`}
              />
              {status} - {species} ({gender})
            </p>
          </div>
          <div className="space-y-1">
            <h2 className="text-md font-semibold">Origin</h2>
            <p className="text-xl text-gray-600">{origin}</p>
          </div>
          <div className="space-y-1">
            <h2 className="text-md font-semibold">Location</h2>
            <p className="text-xl text-gray-600">{location}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

CharacterCard.propTypes = {
  name: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  species: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  origin: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};
