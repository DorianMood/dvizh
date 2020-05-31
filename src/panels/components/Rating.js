import React from "react";
import PropTypes from "prop-types";

const Rating = (props) => <>{props.rating}</>;

Rating.propTypes = {
  rating: PropTypes.any.isRequired,
};

export default Rating;
