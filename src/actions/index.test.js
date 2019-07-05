import React from 'react';
import ReactDOM from 'react-dom';
import expect from 'expect';
import {alertActions} from './alert.actions';
import {userActions} from './user.actions';
import { userService } from '../services';
import {configure} from 'enzyme';
import {Link} from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import {mount,shallow} from 'enzyme';
import {spy} from 'sinon';
import { userConstants } from '../constants';
import { history } from '../helpers';
import App from '../App';
import {store} from '../helpers/store';

configure({
  adapter: new Adapter()
});

describe("Test Redux Alert Actions", () => {
  it('uses correct constants', () => {
    expect(alertActions.success("Random Success Message")).toEqual({
      type: "ALERT_SUCCESS",
      message: "Random Success Message"
    })
    expect(alertActions.error("Random Error Message")).toEqual({
      type: "ALERT_ERROR",
      message: "Random Error Message"
    })
    expect(alertActions.clear()).toEqual({
      type: "ALERT_CLEAR"
    })
  });
});

describe("Test Authentication via Redux", () => {
  it('logout uses service and correct constant', () => {
    spy(userService, "logout");
    userActions.logout();
    expect(userService.logout.called).toEqual(true);
    expect(userActions.logout()).toEqual({type: 'USERS_LOGOUT'});
  });

  it('login uses service and correct dispatch logic', () => {
    expect(typeof userActions.login("demo_user", "demo_password")).toBe('function');
  });

  it('register uses service and correct logic', () => {
    expect(typeof userActions.register("demo_user")).toBe('function');
  });
});
