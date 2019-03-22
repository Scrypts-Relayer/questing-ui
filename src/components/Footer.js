import React from 'react';
import zerox from '../assets/img/0x.png'
import open from '../assets/img/opensea.png'

const Footer = () => {
  return (
    <div className='footer'>
      <div className="partners">
        <h2 className="whiteText">Powered By</h2>
        <img src={zerox} alt={''} className="footlogo" />
        <img src={open} alt={''} className="footlogo" />
      </div>
      <div className="siteMap">
        <h2 className="whiteText">About</h2>
        <h2 className="whiteText">FAQ</h2>
        <h2 className="whiteText">Medium</h2>
        <h2 className="whiteText">Discord</h2>
        <h2 className="whiteText">Github</h2>
      </div>
    </div>
  );
};

export default Footer;
