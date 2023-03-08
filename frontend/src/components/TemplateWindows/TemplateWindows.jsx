import { React } from "react";
import PropTypes from "prop-types";
import "./TemplateWindows.css";
import { useNavigate } from "react-router-dom";
import deletes from "../../assets/delete.png";
import previous from "../../assets/back-arrow.png";
import traitblanc from "../../assets/trait.png";

function TemplateWindows({ title, children, back }) {
  const navigate = useNavigate();

  return (
    <div className="windowControl">
      <div className="templateWindow">
        <div className="titleAndClose">
          <h1>{title}</h1>
          <div className="allButtons">
            {back && (
              <div className="prevAndLine">
                <div
                  className="btnprevious"
                  role="button"
                  onClick={() => navigate(-1)}
                  onKeyDown={() => navigate(-1)}
                  tabIndex={0}
                >
                  <img
                    src={previous}
                    alt="imgprecedent"
                    className="previousimg"
                  />
                  <img
                    src={traitblanc}
                    alt="traitblanc"
                    className="traitblanc"
                  />
                </div>
              </div>
            )}
            <div
              className="btnExit"
              role="button"
              onClick={() => navigate("/")}
              onKeyDown={() => navigate("/")}
              tabIndex={0}
            >
              <img src={deletes} alt="Exit" className="closingCross" />
            </div>
          </div>
        </div>
        <div className="children">{children}</div>
      </div>
    </div>
  );
}

TemplateWindows.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  back: PropTypes.string.isRequired,
};

export default TemplateWindows;
