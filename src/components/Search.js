import React from 'react';
import { InputGroup, InputGroupAddon, Button, Input } from 'reactstrap';

const Search = (props) => {
  return (
    <div className="Search">
      <InputGroup>
        <Input placeholder="Search quests by address, 0xabc123..."></Input>
        <InputGroupAddon addonType="append">
          <Button color="secondary" onClick={() => alert('do this!')}>Search</Button>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

export default Search;
