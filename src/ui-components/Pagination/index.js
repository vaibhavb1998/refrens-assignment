import PropTypes from "prop-types";

// ==============================|| PAGINATION ||============================== //

export default function CharacterCard({
  handlePrev,
  prevDisabled,
  handleNext,
  nextDisabled,
  loading,
}) {
  return (
    <div className="flex justify-center">
      <button
        className={`px-4 py-2 text-xl md:text-2xl mr-3 bg-white border-2 rounded-lg w-[200px] ${
          prevDisabled ? "bg-gray-300 hover:bg-gray-300" : "bg-white"
        } hover:bg-gray-100`}
        onClick={handlePrev}
        disabled={prevDisabled || loading}
        type="button"
      >
        {"<<"} Prev
      </button>
      <button
        className={`px-4 py-2 text-xl md:text-2xl ml-3 border-2 rounded-lg w-[200px] ${
          nextDisabled ? "bg-gray-300" : "bg-white"
        } hover:bg-gray-100`}
        onClick={handleNext}
        disabled={nextDisabled || loading}
        type="button"
      >
        Next {">>"}
      </button>
    </div>
  );
}

CharacterCard.propTypes = {
  handlePrev: PropTypes.func.isRequired,
  prevDisabled: PropTypes.bool.isRequired,
  handleNext: PropTypes.func.isRequired,
  nextDisabled: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};
