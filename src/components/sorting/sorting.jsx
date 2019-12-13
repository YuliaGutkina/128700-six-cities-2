import React from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {ActionCreator} from "../../reducer/data/data";
import {getSortingOrder} from "../../reducer/data/selectors";
import {Select} from "../select/select";


const SORTING_OPTIONS = [
  {value: `popular`, text: `Popular`},
  {value: `to-high`, text: `Price: low to high`},
  {value: `to-low`, text: `Price: high to low`},
  {value: `top-rated`, text: `Top rated first`}
];

const Sorting = (props) => {
  const {onChangeSorting, sortingOrder} = props;

  return <form className="places__sorting" action="#" method="get" onSubmit={(e) => {
    e.preventDefault();
  }}>
    <span className="places__sorting-caption">Sort by</span>
    <Select
      onChange={onChangeSorting}
      value={sortingOrder}
      options={SORTING_OPTIONS}
      id="places-sorting"
      className="places__sorting-type"
      optionClassName="places__option"
    />
  </form>;
};

Sorting.propTypes = {
  onChangeSorting: PropTypes.func.isRequired,
  sortingOrder: PropTypes.oneOf([`popular`, `to-high`, `to-low`, `top-rated`]),
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  sortingOrder: getSortingOrder(state)
});

const mapDispatchToProps = (dispatch) => ({
  onChangeSorting: (sortBy) => {
    dispatch(ActionCreator.changeSorting(sortBy));
  },
});


export {Sorting};
export default connect(mapStateToProps, mapDispatchToProps)(Sorting);
