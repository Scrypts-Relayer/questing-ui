import React from 'react';
import card1 from '../assets/img/card1.png'
import card2 from '../assets/img/card2.png'
import prizeGroup from '../assets/img/prizeGroup.png'
import ReactTypingEffect from 'react-typing-effect';


const Landing = (props) => {
  return (
    <div className="landing">
      <div className="hero">
        <div className="landingLeft">
          <p className="landingHeader">Collect the web, earn crypto.</p>
          <div className="buttonGroup">
            <div className="landingButton" id="signup">
              Sign Up
            </div>
            <div className="landingButton" id="learn">
              Learn More
            </div>
          </div>
          <div className="shuffleText">
          Get rewarded for <span className="spacing"/>
          <ReactTypingEffect
            text={["Voting on DAOs.", "Collecting a Crypto Kitty.", "Contributing to open source."]} 
            speed={100}
            eraseDelay={2000}
          />
          </div>
        </div>
        <div className="landingRight">
          <img src={card1} alt={''} />
          <img src={card2} alt={''} />
        </div>
      </div>
      <div className="landingContent">
        <div className="left">
          <img src={prizeGroup} alt={''} />
          <p className="greyText">There could only be one winner, proven by the blockchain.</p>
        </div>
        <div className="right">
          <h1>Scrypts is your mission log for the web.</h1>
          <p className="subHeadingReg greyText">Complete tasks around the web, obtain proof, and earn your prize.</p>
          <p className="subHeadingBold greyText">Ready Player One style.</p>
        </div>
      </div>
      <div className="signupSection">
        <p className="signupBold greyText">Sign Up for early access.</p>
        <div className="signupRow">
          <input placeholder="Natasha" />
          <div className="landingButton">
            Sign Up
          </div>
        </div>

      </div>
    </div>
  )
}

export default Landing;
