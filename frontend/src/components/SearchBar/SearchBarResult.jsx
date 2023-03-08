import propTypes from "prop-types";
import { Link } from "react-router-dom";
import "./SearchBar.css";

function SearchBarResult({ results }) {
  const pathCondition = (id, type) => {
    if (type === "artiste" || type === "quartier") {
      return { path: `/quartier/${id}`, state: type };
    }
    return { path: "/artdetail", state: type };
  };
  return (
    <div className="SearchBarResult">
      {results.map((result) => {
        const path = pathCondition(result.id, result.type);
        return (
          <div className="oneResult">
            <Link to={path.path} state={path.state}>
              <p>{result.result}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default SearchBarResult;

SearchBarResult.propTypes = {
  results: propTypes.arrayOf(propTypes.string).isRequired,
};
