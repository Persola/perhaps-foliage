import { shallow } from 'enzyme';

export default component => {
  expect(shallow(component)).toMatchSnapshot();
}
