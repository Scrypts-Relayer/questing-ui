import React, { Component} from "react";
import '../App.scss'

class Faq extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  async componentWillMount() {

  }

  render() {
    return (
      <div className="faq">
        <h1>Scrypts FAQ</h1>
        <p className="faqHeader">What is Scrypts?</p>
        <p className="faqSub">Scrypts is a global quest log on the Ethereum blockchain. Anyone can fulfill a quest if the requirements needed to submit.</p>

        <p className="faqHeader">How does Scrypts work?</p>
        <p className="faqSub">Currently, once you obtain all the necessary tokens you can submit the requirements by entering the tokenID of each individual token.</p>

        <p className="faqHeader">Why are only a few tokens supported?</p>
        <p className="faqSub">We’re always adding new tokens to the platform. Have an idea for what should be added next? Fill out this form</p>

        <p className="faqHeader">How can I create a new quest?</p>
        <p className="faqSub">We’re currently limiting the number of addresses who can create quests. Stay tuned for more information when we’ll open it up.</p>

        <p className="faqHeader">What happens to my items after I submit them to a quest?</p>
        <p className="faqSub">In order to prevent sybil resistant attacks, users must swap their items with the quest reward. </p>

        <p className="faqHeader">I have a great idea and I want to use scrypts!</p>
        <p className="faqSub">If you want to use Scrypts in your project, get in touch at hello@scrypts.io.</p>


      </div>
    );
  }
}

export default Faq;
