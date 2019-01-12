import React from 'react';
import { Container, Row, Col,
  Progress,
  UncontrolledCollapse, Button,
  ListGroup, ListGroupItem, Badge } from 'reactstrap';

const Quest = (props) => {
  //https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180
  return (
    <div className="Quest card">
      <div class="card-header">
        Quest {props.index}
      </div>
      <div class="card-body">
        <h5 class="card-title">Description</h5>
        <p class="card-text">{props.hash} - {props.index}</p>
        <Progress value={75} />
        <br/>
        <Button color="primary" id={`toggler-${props.index}`}>Requirements</Button>
        <p class="card-text text-right">{75}%</p>
      </div>
      <UncontrolledCollapse toggler={`toggler-${props.index}`}>
        <ListGroup>
          <ListGroupItem color="success" action>Cras justo odio <Badge pill>14</Badge></ListGroupItem>
          <ListGroupItem color="info" action>Dapibus ac facilisis in <Badge pill>1</Badge></ListGroupItem>
          <ListGroupItem color="warning" action>Morbi leo risus <Badge pill>8</Badge></ListGroupItem>
          <ListGroupItem color="danger" action>Porta ac consectetur ac <Badge pill>2</Badge></ListGroupItem>
        </ListGroup>
      </UncontrolledCollapse>
    </div>
  )
}

export default Quest;
