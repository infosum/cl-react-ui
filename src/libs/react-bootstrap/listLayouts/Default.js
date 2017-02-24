import React from 'react';
import ListActions from './ListActions';
import {Alert, Col, Row, Well} from 'reactstrap';

export default ({msg, rowClick}) => {
  return (<div>
          <Row>
          <Col md={8}>
            <ListActions rowClick={rowClick}
              user={user} selected={selected}
              actions={actions} config={config} />
          </Col>
          <Col md={4}>{search}</Col>
          </Row>
           <Well>
             <Alert bsStyle="info">
              {msg}
            </Alert>
          </Well>
          {modal}
          </div>);
}