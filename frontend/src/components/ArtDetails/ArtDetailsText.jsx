import PropTypes from "prop-types";

function ArtDetailsText({ artDetails }) {
  return (
    <div className="ArtDetails">
      <div className="Oeuvre">
        <p className="ArtDetailsTitle">Oeuvre : </p>
        <p>{artDetails.name}</p>
      </div>
      <div>
        <p className="ArtDetailsTitle">Adresse : </p>
        <p className="detailsText">{artDetails.adress}</p>
      </div>
      <div>
        <p className="ArtDetailsTitle Artiste">Artiste : </p>
        <p className="ArtisteName">{artDetails.artiste}</p>
      </div>
      <p>{artDetails.artiste_description}</p>
      <div>
        <p className="ArtDetailsTitle">Description : </p>
        <p className="detailsText">{artDetails.description}</p>
      </div>
    </div>
  );
}

ArtDetailsText.propTypes = {
  artDetails: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default ArtDetailsText;
