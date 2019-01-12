import React from 'react';
import { Web3Provider } from 'react-web3';

import Create from './Create';
import Quests from './Quests';
import About from './About';
import Search from './Search';

const Page = (props) => {
  if (props.page === 1) {
    return (
      <Web3Provider>
        <Search />
        <Quests quests={props.quests} />
      </Web3Provider>
    )
  } else if (props.page === 2) {
    return (
      <Web3Provider>
        <Create />
      </Web3Provider>
    )
  } else {
    return <About />
  }
}

export default Page;
