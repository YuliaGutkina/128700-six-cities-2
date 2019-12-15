import React from 'react';
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import {receiveUserDataSelector} from "../../reducer/user/selectors";


const Header = (props) => {
  const {userData} = props;

  return <header className="header">
    <div className="container">
      <div className="header__wrapper">
        <div className="header__left">
          <Link to="/" className="header__logo-link header__logo-link--active">
            <img className="header__logo" src="/img/logo.svg" alt="6 cities logo" width={81} height={41} />
          </Link>
        </div>
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item user">
              <Link
                className="header__nav-link header__nav-link--profile"
                to={!userData ? `/login` : `/favorites`}
              >
                <div className="header__avatar-wrapper user__avatar-wrapper">
                  {userData &&
                  <img
                    className="header__avatar user__avatar"
                    src={userData.avatar}
                    width="20"
                    height="20"
                    alt="User avatar"
                  />
                  }
                </div>
                {!userData ?
                  <span className="header__login">Sign in</span> :
                  <span className="header__user-name user__name">{userData.email}</span>
                }
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>;
};

Header.propTypes = {
  userData: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    name: PropTypes.string,
    avatar: PropTypes.string,
    isPro: PropTypes.bool
  })
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  userData: receiveUserDataSelector(state)
});


export {Header};
export default connect(mapStateToProps)(Header);
