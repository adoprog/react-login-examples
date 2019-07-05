import React from 'react';
import ReactDOM from 'react-dom';
import expect from 'expect';
import { userService } from '../services/user.service';
import { configure } from 'enzyme';
import { Link } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import {spy} from 'sinon';

configure({ adapter: new Adapter() });

beforeEach(function() {
  global.fetch = jest.fn().mockImplementation((username, password) => {
      var p = new Promise((resolve, reject) => {
        resolve({
          ok: true,
          Id: '12',
          json: function() {
            return {username: 'username321'}
          }
        });
      });
      return p;
  });
});

describe("Test User service", () => {
  it('check if a fetch promise is returned and localStorage is used in login', async () => {
    spy(localStorage, "setItem");
    let res = await userService.login("username321", "password321");
    //login successful
    expect(res.username).toEqual("username321");
    expect(localStorage.setItem.called).toEqual(true);
  });

  it('check if logout removes `user` item from localStorage', () => {
    spy(localStorage, "removeItem");
    userService.logout();
    expect(localStorage.removeItem.called).toEqual(true);
  });
});
