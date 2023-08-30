import React from 'react';
import './Footer.css';
import Contacts from '../../../components/contacts/Contacts';
import CompanyRequisites from '../../../components/contacts/Requisites/Company_Requisites';

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