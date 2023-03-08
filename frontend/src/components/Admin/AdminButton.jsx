import PropTypes from "prop-types";

function AdminButton({ content, myHandle }) {
  return (
    <div
      className={
        content === "VALIDER" ? "AdminButton" : "AdminButton AdminButtonRed"
      }
      onClick={myHandle}
      onKeyDown={myHandle}
      role="none"
    >
      <p>{content}</p>
    </div>
  );
}

AdminButton.propTypes = {
  content: PropTypes.string.isRequired,
  myHandle: PropTypes.func.isRequired,
};

export default AdminButton;
