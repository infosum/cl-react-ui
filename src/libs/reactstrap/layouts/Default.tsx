import * as React from 'react';
import { Component } from 'react';
import { Alert, Form } from 'reactstrap';
import { IFormLayout } from '../../../../index';

export default ({ form, fields, actions, errors, onSubmit }: IFormLayout) => {
    let alert;
    const allFields = Object.keys(fields).map((n) => fields[n]);

    if (errors.message) {
        alert = (<Alert color="danger">
            <p>{errors.message}</p>
        </Alert>);
    }
    return (<Form onSubmit={onSubmit}>
        <h2>{form.title}</h2>
        {alert}
        {allFields}
        {actions}
    </Form>);
};
