import * as React from 'react';
import { Alert, Col, Input, Row, Table } from 'reactstrap';
import { IListRow } from '../../../interfaces';
import PageSize from '../list/PageSize';
import Paginator from '../list/Paginator';
import ListActions from './ListActions';

export default ({ actions, canSelect, config, data, getData, listRow, msg, pagination,
  rowClick, rows, search, selected, showAddModal, toggleAll, update, user }) => {
  let list;
  console.log('pagination', pagination);
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
        style={{ position: 'relative', margin: 0 }}
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
            listRow({ key, row, selected, columns, actions }),
          )}
        </tbody>
      </Table>
      <Paginator total={pagination.total} limit={pagination.limit} offset={pagination.offset}
        setPagination={(p) => {
          getData(p);
        }} />
      <PageSize label={pagination.limit} setPageSize={(s) => console.log('setPageSize', s)} />

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
