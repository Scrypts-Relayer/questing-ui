import React from 'react';
import { Container, Row, Col,
  Progress,
  UncontrolledCollapse, Button,
  ListGroup, ListGroupItem, Badge } from 'reactstrap';

const Quest = (props) => {
  //https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180
  return (
    <div className="Quest card">
      <div className="card-header">
        Quest {props.index}
      </div>
      <div className="card-body">
        <h5 className="card-title">Description</h5>
        <p className="card-text">{props.hash} - {props.index}</p>
        <Progress value={75} />
        <p className="card-text text-right">{75}%</p>
        <Button color="primary" id={`toggler-${props.index}`}>Requirements</Button>
      </div>
      <UncontrolledCollapse toggler={`toggler-${props.index}`}>
        <ListGroup>
          <ListGroupItem color="success" action>Cras justo odio <Badge pill>14/14</Badge></ListGroupItem>
          <ListGroupItem color="success" action>Dapibus ac facilisis in <Badge pill>1/1</Badge></ListGroupItem>
          <ListGroupItem color="warning" action>Morbi leo risus <Badge pill>8/10</Badge></ListGroupItem>
          <ListGroupItem color="danger" action>Porta ac consectetur ac <Badge pill>0/2</Badge></ListGroupItem>
        </ListGroup>
      </UncontrolledCollapse>
    </div>
  )
}

export default Quest;
