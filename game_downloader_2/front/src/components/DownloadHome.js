import React from 'react';
import { useTranslation } from "react-i18next";

const App = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };

  return (
    <body className="download">
      <div className="App">
        <div className="container-fluid">
          <div className="row">
            <div className="col col-12">
            <header className="App-header">
              <h1 className="display-4 mt-4 mb-4">{t("Download the game from here!")}</h1>
              <p>{t("Kindly choose one of the options")}</p>
            </header>
            <main>
                <a target="_blank" href="http://localhost:5027/windows">
                <div className="form-group">
                  <button className="down_w btn btn-primary">{t("Download") + "for Windows"}</button>
                </div>
                </a>
                <a target="_blank" href="http://localhost:5027/linux">
                <div className="form-group">
                  <button className="down_l btn btn-primary">{t("Download") + "for Linux"}</button>
                </div>
                </a>
                <a target="_blank" href="./game">
                <div className="form-group">
                  <button className="get_now btn btn-primary">{t("Play Now!")}</button>
                </div>
                </a>
            </main>
            </div>
          </div>
        </div>
      </div>
      </body>
    );
}

export default App;