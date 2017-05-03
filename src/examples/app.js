import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Icon, Form, List, validations} from '../index';
import config from './config';
import CustomLayout from './CustomLayout';
import {Button, Container} from 'reactstrap';

class Demo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      lib: 'reactstrap'
    }
  }

  toggleLib() {
    let lib = this.state.lib === 'reactstrap'
      ? 'reactBootstrap'
      : 'reactstrap';

    this.setState({lib})
  }

  render() {
    let data = [
      {drone_id: '1', label: 'label 1', claimed: false},
      {drone_id: '2', label: 'label 2', claimed: true}
    ],
    row = {
      label: 'hi'
    };

console.log('data = ', data);
    return <Container>
        <Button onClick={e => this.toggleLib()}>
          lib: {this.state.lib}
        </Button>

        <h1>test form</h1>
        <Icon icon="leaf"
          color="info"
          label="leaf"
          pull="right"
          size={3}
          spin={true} />

        <List config={config}
          data={data}/>

        <Form config={config}
          layout={CustomLayout}
          data={row}
          lib={this.state.lib}
          errors={{}}
          onSubmit={e => console.log(e)} />
      </Container>
  }
}



ReactDOM.render(
  <Demo />,
  document.getElementById('root')
);