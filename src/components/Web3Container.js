import React from "react";
import PropTypes from "prop-types";
import { getProvider } from "../services/web3Service";
import { Web3Ctx } from "../contexts/Web3Context";
import signin from '../assets/img/signin.png'

class Web3Container extends React.Component {
  state = {
    isLoading: false,
    web3: null,
    provider: "",
    account: "",
    loggedIn: false,
    hasWeb3: false,
    network : 'Rinkeby'
  };

  async componentWillMount() {
    await this.checkAccounStatus();
    await this.subscribeToAccountChange(this.checkAccounStatus);
    this.setState({ isLoading: false });
  };

  subscribeToAccountChange = async onAccountChangeFunc => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", accounts => {
        onAccountChangeFunc();
      });
    } else {
      setInterval(await this.checkAccounStatus, 3000);
    }
  };

  checkAccounStatus = async () => {
    let web3Instance = await getProvider();
    //check that web3 is injected
    if (web3Instance == null) {
      this.setState({
        hasWeb3: false,
      });
      return;
    }

    let id = await web3Instance.eth.net.getId();
    let networkName;
    switch (id) {
      case 1:
        networkName = "Main";
        break;
      case 4:
        networkName = "Rinkeby";
        break;
      default:
        networkName = "Unknown";
    }
    
    if (web3Instance.currentProvider.isMetaMask) {
      this.setState({
        provider: "MetaMask"
      });
    }
    const accounts = await web3Instance.eth.getAccounts();
    if (accounts.length === 0) {
      this.setState({
        loggedIn: false,
        hasWeb3: true,
        web3: web3Instance,
      });
      return;
    }
    //the user is logged in, set state with current account
    this.setState({
      loggedIn: true,
      hasWeb3: true,
      account: accounts[0],
      web3: web3Instance,
      network : networkName
    });
  };

  render = () => {
    if (this.state.isLoading) {
      return null;
    }
    if (!this.state.hasWeb3 || !this.state.loggedIn) {
      if(window.location.pathname!='/' && window.location.pathname!='/faq'){
        return (
          <div className="web3warning">
            <img src={signin} alt={''} />
            <p className="warningTop">No connection to Ethereum.</p>
            <p className="warningBottom">{getText(this.state.hasWeb3, this.state.loggedIn)}</p>
          </div>
        );
      }
    }
    return (
      <Web3Ctx.Provider value={this.state}>
        {this.props.children}
      </Web3Ctx.Provider>
    );
  };
}

const getText = (hasWeb3, loggedIn) => {
  if (!hasWeb3) {
    return "Download metamask or access from Web3 supported browser.";
  }
  if (!loggedIn) {
    return "Unlock Metamask or access from Web3 supported Browser.";
  }

  return "There seems to be an error with your Web3 provider.";
};

Web3Container.propTypes = {
  children: PropTypes.object.isRequired
};

export default Web3Container;