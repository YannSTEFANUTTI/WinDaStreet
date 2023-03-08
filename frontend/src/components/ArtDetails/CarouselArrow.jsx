import PropTypes from "prop-types";

function CarouselArrow({ myClass, myHandle }) {
  return (
    <div className={`${myClass}Arrow`}>
      <div
        className={`${myClass}LeftArrow`}
        onClick={() => myHandle("left")}
        onKeyDown={() => myHandle("left")}
        role="none"
      />
      <div
        className={`${myClass}RightArrow`}
        onClick={() => myHandle("right")}
        onKeyDown={() => myHandle("right")}
        role="none"
      />
    </div>
  );
}

export default CarouselArrow;

CarouselArrow.propTypes = {
  myClass: PropTypes.string.isRequired,
  myHandle: PropTypes.func.isRequired,
};
