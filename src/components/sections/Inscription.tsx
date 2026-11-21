"use client";

import { SecureForm } from "@/components/forms/SecureForm";
import { submitInscription } from "@/app/actions/inscription";
import { demandes } from "@/lib/inscription-demandes";


const personnes = ["1", "2", "3", "4"];

const label = "text-[13px] font-semibold text-ink";

/** Text of the confirmation dialog, adapted to what the visitor asked for. */
function confirmation({ prenom = "", email = "", demande = "" }: Record<string, string>) {
  const who = prenom ? `Merci ${prenom}. ` : "Merci. ";
  if (demande.startsWith("Venir au vernissage")) {
    return `${who}Votre venue au vernissage est bien enregistrée : nous vous attendons le samedi 5 décembre à 18 h à la Very Art Gallery, 21 rue Michel Le Comte, Paris 3e. Une confirmation part vers ${email}.`;
  }
  if (demande.startsWith("Organiser une visite")) {
    return `${who}Nous avons bien reçu votre demande de visite avec l’artiste. Nous vous écrivons à ${email} pour convenir d’un rendez-vous à la Very Art Gallery.`;
  }
  return `${who}Nous avons bien reçu votre demande et revenons vers vous à ${email} dans les meilleurs délais.`;
}

export default function Inscription() {
  return (
    <section id="inscription" className="bg-paper-deep py-24 lg:py-36">
      <div className="mx-auto grid max-w-(--container-site) gap-10 px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
        <div className="lg:col-span-5">
          <p className="eyebrow">Inscription</p>
          <h2 className="mt-4 font-display text-h2 font-normal leading-[1.1] tracking-[-0.01em] text-ink">
            Vernissage, visite privée ou renseignement
          </h2>
          <p className="mt-5 max-w-[65ch] text-lead leading-[1.65] text-ink-text">
            Laissez-nous vos coordonnées : nous vous confirmons votre venue au vernissage du samedi 5 décembre à 18 h, ou nous revenons vers vous pour organiser une visite avec l’artiste.
          </p>
        </div>
        <div className="card p-6 lg:col-span-7 lg:p-10">
          <SecureForm
            action={submitInscription}
            turnstileAction="inscription"
            className="relative grid gap-5"
            statusClassName="font-display text-lead text-ink empty:hidden data-[state=error]:field-error data-[state=error]:p-3 data-[state=error]:font-body data-[state=error]:text-caption"
            errorTitle="Merci de corriger les points suivants :"
            errorClassName="field-error grid gap-2 p-4 [&_a]:underline [&_li]:ml-4 [&_li]:list-disc [&_p]:font-semibold"
            successModal={{
              title: "Votre demande est bien envoyée",
              message: confirmation,
              closeLabel: "Fermer",
              dialogClassName: "modal",
              panelClassName: "modal-panel",
              iconClassName: "mx-auto text-accent",
              titleClassName: "mt-6 font-display text-h3 font-normal leading-[1.15] text-ink",
              textClassName: "mx-auto mt-4 max-w-[42ch] leading-[1.65] text-ink-text",
              buttonClassName: "btn mt-8",
            }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <label htmlFor="f-prenom" className={label}>Prénom</label>
                <input id="f-prenom" name="prenom" type="text" autoComplete="given-name" required maxLength={80} className="field" />
              </div>
              <div className="grid gap-2">
                <label htmlFor="f-nom" className={label}>Nom</label>
                <input id="f-nom" name="nom" type="text" autoComplete="family-name" required maxLength={80} className="field" />
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <label htmlFor="f-email" className={label}>E-mail</label>
                <input id="f-email" name="email" type="email" autoComplete="email" inputMode="email" required maxLength={254} className="field" />
              </div>
              <div className="grid gap-2">
                <label htmlFor="f-tel" className={label}>Téléphone</label>
                <input id="f-tel" name="telephone" type="tel" autoComplete="tel" maxLength={30} className="field" />
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
              <textarea id="f-msg" name="message" rows={3} maxLength={2000} className="field" />
            </div>
            <div className="flex items-start gap-3 text-caption text-ink-soft">
              <input id="f-rgpd" name="consentement" type="checkbox" required className="mt-1 accent-accent" />
              <label htmlFor="f-rgpd">J’accepte que mes données soient utilisées pour répondre à ma demande.</label>
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
