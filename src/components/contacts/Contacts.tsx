import React from 'react';
import './Contacts.css';
import { CompanyRequisites } from './Requisites/Company_Requisites';

class Contacts extends React.Component {
  render() {
    return (
      <div className="contacts-form">
        <div className="contacts_company-title">{CompanyRequisites.title}</div>
        <div className="contacts_company-adress">
          Адрес:
          {' '}
          {CompanyRequisites.reg_adress}
        </div>
        <div className="contacts_company-tel">
          Тел.:
          {' '}
          {CompanyRequisites.tel}
        </div>
        <div className="contacts_company-mail">
          E-mail:
          {' '}
          {CompanyRequisites.mail}
        </div>
        <div className="contacts_company-sm-links">
          Мы в социальных сетях:
          <div className="contacts_sm-link">{CompanyRequisites.links}</div>

        </div>

      </div>
    );
  }
}

export { Contacts };
