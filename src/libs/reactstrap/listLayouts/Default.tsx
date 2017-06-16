/// <reference path="../../../interfaces.d.ts" />
import * as React from 'react';
import {Alert, Col, Input, Row, Table} from 'reactstrap';
import ListActions from './ListActions';

export default ({actions, canSelect, data, config, listRow, msg,
  rowClick, rows, search, selected, showAddModal, toggleAll, update, user}) => {
  let list;
  const columns = config.list.columns;
  const headings = Object.keys(columns)
        .map((heading: string, key: number): JSX.Element => {
          const th = columns[heading];
          return (<th key={th.id} className={th.class}>
            {th.label}
          </th>);
        });
  if (canSelect()) {
          headings.unshift(<th key="select-all">
              <Input type="checkbox"
                data-action="check-all"
                style={{position: 'relative', margin: 0}}
                onClick={(e) => toggleAll(e)} />
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
                {rows.map((row: IListRow, key: number) =>
                  listRow({key, row, selected, columns, actions}),
                )}
              </tbody>
              </Table>

          </div>);
    } else {
      list = (<div>
           <Alert color="info">
          {msg}
          </Alert>
          </div>);
    }

  return (<div>
            <Row>
            <Col md={8}>
              <ListActions rowClick={rowClick}
                user={user}
                selected={selected}
                actions={actions}
                config={config}
                showAddModal={showAddModal}
                update={update} />
            </Col>
            <Col md={4}>{search}</Col>
            </Row>
            {list}

          </div>);
};
