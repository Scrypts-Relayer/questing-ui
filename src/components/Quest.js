import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const Quest = (props) => {
  //https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180
  return (
    <div className="Quest">
      <p>{props.hash} - {props.index}</p>
    </div>
  )
}

export default Quest;
