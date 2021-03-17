import React from 'react';
import { shallow } from 'enzyme';
import LoginPage from '../../pages/LoginPage';


let wrapper, startLogin;

beforeEach(() => {
    startLogin = jest.fn();
    wrapper = shallow(
        <LoginPage startLogin={startLogin} />);
});


test('Should render log-in correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should call login on button click', () => {
    wrapper.find('button').simulate('click');
    expect(startLogin).toHaveBeenCalled();
});