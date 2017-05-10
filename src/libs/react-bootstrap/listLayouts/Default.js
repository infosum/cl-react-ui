import React from 'react';
import ListActions from './ListActions';
import {Alert, Col, Row, Well, Table} from 'react-bootstrap';

export default ({actions, canSelect, data, config, listRow, modal, msg, rowClick, rows, search, selected, toggleAll, user}) => {
  let list;
   const columns = config.list.columns,
      headings = Object.keys(columns)
        .map((heading: string, key: number): Element<any> => {
          let th = columns[heading];
          return (<th key={th.id} className={th.class}>
            {th.label}
          </th>);
        });
    if (canSelect()) {
      headings.unshift(<th key="select-all">
          <input type="checkbox"
            data-action="check-all"
            style={{position: 'relative', margin: 0}}
            onClick={e => toggleAll(e)} />
        </th>);
    }

  if (rows.length > 0) {
      list = (<div>
              <Table responsive>
              <thead>
                <tr>
                {headings}
                </tr>
              </thead>
              <tbody>
                {rows.map((row: ListRowType, key: number) =>
                  listRow({key, row, selected, columns, actions, canSelect})
                )}
              </tbody>
              </Table>

              {modal}
          </div>);
    } else {
      list = (<div>
           <Alert bsStyle="info">
          {msg}
          </Alert>
          {modal}
          </div>);
    }

  return (<div>
            <Row>
            <Col md={8}>
              <ListActions rowClick={rowClick}
                user={user}
                selected={selected}
                actions={actions}
                config={config} />
            </Col>
            <Col md={4}>{search}</Col>
            </Row>
            {list}

          </div>);
}