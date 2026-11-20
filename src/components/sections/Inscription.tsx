"use client";

import { useState } from "react";
import { SecureForm } from "@/components/forms/SecureForm";
import { submitInscription } from "@/app/actions/inscription";

const demandes = [
  "Venir au vernissage (samedi 5 décembre, 18 h)",
  "Organiser une visite avec l’artiste",
  "Information sur une œuvre",
  "Autre demande",
];

const personnes = ["1", "2", "3", "4"];

const label = "text-[13px] font-semibold text-ink";

export default function Inscription() {
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  return (
    <section id="inscription" className="bg-paper-deep py-24 lg:py-36">
      <div className="mx-auto grid max-w-(--container-site) gap-10 px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
        <div className="lg:col-span-5">
          <p className="eyebrow">Inscription</p>
          <h2 className="mt-4 font-display text-h2 font-normal leading-[1.1] tracking-[-0.01em] text-ink">
            Vernissage, visite privée ou renseignement
          </h2>
          <p className="mt-5 max-w-[65ch] text-lead leading-[1.65] text-ink-text">
            Laissez-nous vos coordonnées : nous vous confirmons votre venue au vernissage du samedi 5 décembre à 18 h, ou nous revenons vers vous pour organiser une visite avec l’artiste.
          </p>
        </div>
        <div className="card p-6 lg:col-span-7 lg:p-10">
          <SecureForm
            action={submitInscription}
            turnstileAction="inscription"
            className="relative grid gap-5"
            statusClassName="font-display text-lead text-ink empty:hidden data-[state=error]:field-error data-[state=error]:p-3 data-[state=error]:font-body data-[state=error]:text-caption"
            messages={{
              success: `Merci. Votre demande est bien envoyée, ${prenom}. Une confirmation part vers ${email}. À très bientôt à la Very Art Gallery, 21 rue Michel Le Comte.`,
            }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <label htmlFor="f-prenom" className={label}>Prénom</label>
                <input id="f-prenom" name="prenom" type="text" autoComplete="given-name" required value={prenom} onChange={(e) => setPrenom(e.target.value)} className="field" />
              </div>
              <div className="grid gap-2">
                <label htmlFor="f-nom" className={label}>Nom</label>
                <input id="f-nom" name="nom" type="text" autoComplete="family-name" required className="field" />
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <label htmlFor="f-email" className={label}>E-mail</label>
                <input id="f-email" name="email" type="email" autoComplete="email" inputMode="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="field" />
              </div>
              <div className="grid gap-2">
                <label htmlFor="f-tel" className={label}>Téléphone</label>
                <input id="f-tel" name="telephone" type="tel" autoComplete="tel" className="field" />
              </div>
            </div>
            <div className="grid gap-2">
              <label htmlFor="f-type" className={label}>Votre demande</label>
              <select id="f-type" name="demande" className="field">
                {demandes.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div className="grid gap-2">
              <label htmlFor="f-nb" className={label}>Nombre de personnes</label>
              <select id="f-nb" name="personnes" defaultValue="2" className="field">
                {personnes.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            <div className="grid gap-2">
              <label htmlFor="f-msg" className={label}>Message (facultatif)</label>
              <textarea id="f-msg" name="message" rows={3} className="field" />
            </div>
            <div className="flex items-start gap-3 text-caption text-ink-soft">
              <input id="f-rgpd" name="consentement" type="checkbox" value="oui" required className="mt-1 accent-accent" />
              <label htmlFor="f-rgpd">J’accepte que mes données soient utilisées pour répondre à ma demande.</label>
            </div>
            <div className="flex items-start gap-3 text-caption text-ink-soft">
              <input id="f-news" name="newsletter" type="checkbox" value="oui" className="mt-1 accent-accent" />
              <label htmlFor="f-news">Je souhaite être informé(e) des prochaines expositions de Jean-Paul Boyer.</label>
            </div>
            <span hidden aria-hidden="true">Ne pas remplir</span>
            <div>
              <button type="submit" className="btn w-full sm:w-auto">Je m’inscris</button>
            </div>
            <p className="text-caption text-ink-soft">
              Vos données sont utilisées uniquement pour répondre à votre demande.{" "}
              <a className="link" href="/mentions-legales">Mentions légales</a>
            </p>
          </SecureForm>
        </div>
      </div>
    </section>
  );
}
