import React, { Component } from 'react';
import Quest from './Quest';
import { Container, Row, Col } from 'reactstrap';

const Quests = (props) => {
  //https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180
  // will require a backend to store ipfs hashes of quests
  return props.quests.map((el, idx) => {
    return <Quest hash={el} index={idx} key={idx} />
  })
}

export default Quests;
