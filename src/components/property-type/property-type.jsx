import PropTypes from "prop-types";


const TYPES = {
  apartment: `Apartment`,
  room: `Private Room`,
  house: `House`,
  hotel: `Hotel`
};

const PropertyType = (props) => {
  return TYPES[props.type];
};

PropertyType.propTypes = {
  type: PropTypes.oneOf(Object.keys(TYPES)).isRequired
};


export {PropertyType};
