import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {ActionCreator} from "../../reducer/data/data";
import {getSortingOrder} from "../../reducer/data/selectors";


const withSelect = (Component) => {
  class WithSelect extends PureComponent {
    constructor(props) {
      super(props);

      this._changeHandler = this._changeHandler.bind(this);
    }

    render() {
      const {sortingOrder} = this.props;

      return <Component
        {...this.props}
        onSortingChange={this._changeHandler}
        defaultValue={sortingOrder}
      />;
    }

    _changeHandler(e) {
      const {onChangeSorting} = this.props;

      onChangeSorting(e.target.value);
    }
  }

  WithSelect.propTypes = {
    onChangeSorting: PropTypes.func.isRequired,
    sortingOrder: PropTypes.string
  };

  const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
    sortingOrder: getSortingOrder(state)
  });

  const mapDispatchToProps = (dispatch) => ({
    onChangeSorting: (sortBy) => {
      dispatch(ActionCreator.changeSorting(sortBy));
    },
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithSelect);
};


export default withSelect;
