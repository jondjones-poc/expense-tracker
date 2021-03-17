import React from 'react';
import { shallow } from 'enzyme';
import NotFoundPage from '../../pages/notfoundpage';

test('Should render homepage correctly', () => {
    const wrapper = shallow(<NotFoundPage />);
    expect(wrapper).toMatchSnapshot();
});
