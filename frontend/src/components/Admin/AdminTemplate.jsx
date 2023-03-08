import PropTypes from "prop-types";
import "./Admin.css";

function AdminTemplate({ title, children }) {
  return (
    <div className="AdminTemplate">
      <p>{title}</p>
      {children}
    </div>
  );
}

AdminTemplate.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default AdminTemplate;
