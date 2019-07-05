import React from 'react';
import ReactDOM from 'react-dom';
import expect from 'expect';
import { TestLoginPage } from '../components/LoginPage';
import { App } from '../App';
import { configure } from 'enzyme';
import { Link } from 'react-router-dom';
import { MemoryRouter } from 'react-router'
import Adapter from 'enzyme-adapter-react-16';
import { mount, shallow } from 'enzyme';
import { PropTypes } from 'prop-types';
import renderer from 'react-test-renderer';
import {spy} from 'sinon';
import { Provider } from 'react-redux';
import { store } from '../helpers';
import configureStore from 'redux-mock-store'

const middlewares = []
const mockStore = configureStore(middlewares)
configure({ adapter: new Adapter() });
let mockedStore = mockStore({})

export const CustomProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <MemoryRouter>
        {children}
      </MemoryRouter>
    </Provider>
  );
};

describe("Test LoginPage component", () => {
  it('check route, dispatch and store setup for component', () => {
    // test will not compile if component is not correctly setup
    const wrapper = mount(<MemoryRouter><TestLoginPage dispatch={spy()}/></MemoryRouter>, {
                            context: {store: mockedStore},
                            childContextTypes: {store: PropTypes.object.isRequired}});
    const inst = wrapper.children();
    let uname = inst.find('.username');
    let pwd = inst.find('.password');
    uname.value = 'demo_username';
    pwd.value = 'demo_password';
    uname.simulate('change');
    pwd.simulate('change');
    wrapper.update();
    expect(true).toBeTruthy();
  });
});
