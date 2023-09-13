import React from "react";
import { BasePage } from "../basePage/BasePage";
import CompanyRequisites from "../../components/contacts/Requisites/Company_Requisites";
import './AboutPage.css'

export function AboutPage(){
    return(
        <>
            <BasePage>
                <div className="about">
                    <h1>О НАС</h1>
                    <p className="about-p">Наша организация самая лучшая!</p>
                    <h3 className="about-h3">Наше производство:</h3>
                    <p className="about-p">Lorem ipsum, dolor sit amezzt consectetur adipisicing elit. Adipisci vero velit quisquam quia enim, ratione odio exercitationem sint expedita delectus est voluptate, accusamus earum maxime ipsum minima temporibus in vitae!</p>
                    <h3 className="about-h3">Наши результаты:</h3>
                    <p className="about-p">Lorem ipsum, dolor sit amezzt consectetur adipisicing elit. Adipisci vero velit quisquam quia enim, ratione odio exercitationem sint expedita delectus est voluptate, accusamus earum maxime ipsum minima temporibus in vitae!</p>
                    <h3 className="about-h3">Наши преимущества:</h3>
                    <p className="about-p">Lorem ipsum, dolor sit amezzt consectetur adipisicing elit. Adipisci vero velit quisquam quia enim, ratione odio exercitationem sint expedita delectus est voluptate, accusamus earum maxime ipsum minima temporibus in vitae!</p>
                    <h3 className="about-h3">Нам доверяют:</h3>
                    <p className="about-p">Lorem ipsum, dolor sit amezzt consectetur adipisicing elit. Adipisci vero velit quisquam quia enim, ratione odio exercitationem sint expedita delectus est voluptate, accusamus earum maxime ipsum minima temporibus in vitae!</p>
                </div>
                <h2 className="about-reqTableHeader">Реквизиты организации:</h2>
                <table className="about-reqTable">
                    <tbody>
                        <tr>
                            <td>Названеие организации:</td>
                            <td>ООО {CompanyRequisites.title}</td>
                        </tr><tr>
                            <td>Адрес регистрации:</td>
                            <td>{CompanyRequisites.reg_adress}</td>
                        </tr><tr>
                            <td>Адрес для отправки почтовой корреспонденции:</td>
                            <td>{CompanyRequisites.post_adress}</td>
                        </tr><tr>
                            <td>ОГРН:</td>
                            <td>{CompanyRequisites.OGRN}</td>
                        </tr><tr>
                            <td>ИНН/КПП:</td>
                            <td>{CompanyRequisites.INN} / {CompanyRequisites.KPP}</td>
                        </tr><tr>
                            <td>ОКПО:</td>
                            <td>{CompanyRequisites.OKPO}</td>
                        </tr><tr>
                            <td>ОКВЭД:</td>
                            <td>{CompanyRequisites.OKVED}</td>
                        </tr><tr>
                            <td>Р/сч:</td>
                            <td>{CompanyRequisites.rasS4et}</td>
                        </tr><tr>
                            <td>Кор/сч:</td>
                            <td>{CompanyRequisites.corS4et}</td>
                        </tr><tr>
                            <td>БИК Банка:</td>
                            <td>{CompanyRequisites.BIK}</td>
                        </tr><tr>
                            <td>Наименование Банка:</td>
                            <td>{CompanyRequisites.bank}</td>
                        </tr><tr>
                            <td>ФИО/должность руководителя организации:</td>
                            <td>{CompanyRequisites.genDirName}</td>
                        </tr><tr>
                            <td>ФИО главного бухгалтера организации:</td>
                            <td>{CompanyRequisites.glavBuhName}</td>
                        </tr>
                    </tbody>
                </table>
            </BasePage>
        </>
    )
}