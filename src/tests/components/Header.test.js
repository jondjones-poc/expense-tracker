import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../components/header';

const homePageLink = '/';
const adminPageCreateLink = '/create'
const adminPageEditLink = '/edit/:id';

let wrapper, startLogout;

beforeEach(() => {
    startLogout = jest.fn();
    wrapper = shallow(
        <Header  
         homePageLink={homePageLink}
         adminPageCreateLink={adminPageCreateLink}
         adminPageEditLink={adminPageEditLink}
         startLogout ={startLogout}
     />);
});

test('Header snapshot Tes', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should call logout on button click', () => {
    wrapper.find('button').simulate('click');
    expect(startLogout).toHaveBeenCalled();
});