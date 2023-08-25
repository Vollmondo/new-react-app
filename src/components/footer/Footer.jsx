import React from 'react';
import './Footer.css';
import Contacts from '../contacts/Contacts';
import CompanyRequisites from '../contacts/Requisites/Company_Requisites';

export function Footer(){
    return (
      <div className="footer">
        <div className='footer-info'>
            <div className='footer-contacts'>
                <Contacts />
            </div>
        </div>
        <div className='footer-copyright'>
            <p>{CompanyRequisites.title}&copy; 2023</p>
        </div>
      </div>
    );
}

export default Footer;
