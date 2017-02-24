import React from 'react';
import ListActions from './ListActions';
import {Alert, Input, Col, Row, Table} from 'reactstrap';

export default ({actions, data, config, listRow, modal, msg, rowClick, rows, search, selected, toggleAll, user}) => {
  let list;
  const columns = config.list.columns,
      headings = Object.keys(columns)
        .map((heading: string, key: number): Element<any> => {
          let th = columns[heading];
          return (<th key={th.id} className={th.class}>
            {th.label}
          </th>);
        });
    headings.unshift(<th key="select-all">
        <Input type="checkbox"
          style={{position: 'relative', margin: 0}}
          onClick={e => toggleAll(e)} />
      </th>);

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
                  listRow({key, row, selected, columns, actions})
                )}
              </tbody>
              </Table>

              {modal}
          </div>);
    } else {
      list = (<div>
           <Alert color="info">
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