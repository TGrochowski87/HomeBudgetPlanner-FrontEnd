import React from 'react';

import { Row } from 'react-bootstrap';

const ExpensesListHeader = ({ children, icons }) => {
  return (
    <>
      {children}
      <Row noGutters className='mb-1 d-none d-sm-flex justify-content-around'>
        {icons?.category}
        {icons?.price}
        {icons?.user}
      </Row>
    </>
  );
};

export default ExpensesListHeader;
