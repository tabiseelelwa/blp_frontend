import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMessage } from "../api/message";

const Contacts = () => {
  const queryClient = useQueryClient();

  const [values, setValues] = useState({
    nom: "",
    email: "",
    message: "",
  });

  const mutationEnvoiMessage = useMutation({
    mutationFn: (message) => createMessage({ ...message }),
    onSuccess: () => {
      queryClient.invalidateQueries("message");
      setValues({ nom: "", email: "", message: "" });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const enregMessage = (e) => {
    e.preventDefault();
    mutationEnvoiMessage.mutate({ ...values });
  };

  return (
    <div className="contact">
      <form className="form_contacts" onSubmit={enregMessage}>
        <input
          type="text"
          name="nom"
          value={values.nom}
          placeholder="Entrez votre nom"
          onChange={handleChange}
        />
        <input
          type="text"
          name="email"
          value={values.email}
          placeholder="Entrez votre email"
          onChange={handleChange}
        />
        <textarea
          name="message"
          cols="30"
          rows="5"
          value={values.message}
          placeholder="Écrivez-nous un message"
          onChange={handleChange}
        ></textarea>
        <button>Envoyer</button>
      </form>
    </div>
  );
};

export default Contacts;
