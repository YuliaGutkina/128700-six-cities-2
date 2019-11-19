import React, {PureComponent} from 'react';

const withActiveItem = (Component) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: null
      };

      this._setActive = this._setActive.bind(this);
    }

    render() {
      return <Component
        {...this.props}
        onSetActive={this._setActive}
      />;
    }

    _setActive(e, item) {
      this.setState({
        activeItem: e ? item : null
      });
    }
  }

  WithActiveItem.propTypes = {};

  return WithActiveItem;
};

export default withActiveItem;
