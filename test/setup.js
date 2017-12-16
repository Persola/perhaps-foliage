import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// setup file 'raf/polyfill' required because: https://reactjs.org/docs/javascript-environment-requirements.html

Enzyme.configure({ adapter: new Adapter() });
