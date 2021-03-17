import React from 'react';
import { shallow } from 'enzyme';
import PageLoading from '../../components/pageloading';

test('Should render expense list item correctly', () => {
    const wrapper = shallow(<PageLoading />);
    expect(wrapper).toMatchSnapshot();
});
