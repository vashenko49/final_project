import React from 'react';

import Row from '../row/Row';

import Login from './Login';
import Registration from './Registration';

const Сontainer = () => {
  return <Row left={<Registration />} right={<Login />} />;
};

export default Сontainer;
