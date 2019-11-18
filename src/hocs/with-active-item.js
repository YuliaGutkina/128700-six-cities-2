import React, {PureComponent} from 'react';

const withActiveItem = (Component) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: null
      };
    }

    render() {
      return <Component
        {...this.props}
        onSetActive={this._setActive}
      />;
    }

    _setActive(item) {
      this.setState({
        activeItem: item
      });
    }
  }

  WithActiveItem.propTypes = {};

  return WithActiveItem;
};

export default withActiveItem;
