import React from 'react';
import Quest from './Quest';
import { Container, Row, Col } from 'reactstrap';

const Quests = () => {
  //https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180
  // will require a backend to store ipfs hashes of quests
  return (
    <div className="Quests">
      {["quest to alabama", "nola quest", "i love me some quests quest"].forEach((el,idx) => {
        return <Quest hash={el} index={idx} />
      })}
    </div>
  )
}

export default Quests;
