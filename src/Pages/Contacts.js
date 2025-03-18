import React from "react";

const Contacts = () => {
  return (
    <div className="contact">
      <form className="form_contacts">
        <input type="text" placeholder="Entrez votre nom" />
        <input type="text" placeholder="Entrez votre email" />
        <textarea
          name=""
          id=""
          cols="30"
          rows="3"
          placeholder="Ecrivez-nous un message"
        ></textarea>
        <button>Envoyer</button>
      </form>
    </div>
  );
};

export default Contacts;
