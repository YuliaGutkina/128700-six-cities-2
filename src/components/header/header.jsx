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
          <a className="header__logo-link header__logo-link--active">
            <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width={81} height={41} />
          </a>
        </div>
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item user">
              <Link
                className="header__nav-link header__nav-link--profile"
                to={!userData ? `/login` : `/favorites`}
              >
                <div className="header__avatar-wrapper user__avatar-wrapper">
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
  userData: PropTypes.object
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  userData: receiveUserDataSelector(state)
});


export {Header};
export default connect(mapStateToProps)(Header);
