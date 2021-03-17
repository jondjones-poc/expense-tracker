import React from 'react';
import { shallow } from 'enzyme';
import Homepage from '../../pages/homepage';

test('Should render homepage correctly', () => {
    const wrapper = shallow(<Homepage />);
    expect(wrapper).toMatchSnapshot();
});
