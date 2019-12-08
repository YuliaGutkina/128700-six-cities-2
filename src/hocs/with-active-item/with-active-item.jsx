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
      const {activeItem} = this.state;

      return <Component
        {...this.props}
        onSetActive={this._setActive}
        activeItem={activeItem}
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
