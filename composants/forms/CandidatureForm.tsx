"use client";

import { useActionState } from "react";
import type { CandidatureState } from "@/actions/candidature";

type CandidatureFormProps = {
  action: (
    state: CandidatureState,
    formData: FormData,
  ) => Promise<CandidatureState>;
};

export default function CandidatureForm({ action }: CandidatureFormProps) {
  const [state, formAction, pending] = useActionState<
    CandidatureState,
    FormData
  >(action, null);

  return (
    <section className="flex flex-col gap-4">
      <form action={formAction} className="flex flex-col gap-4">
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Postuler à cette offre ..."
          className="bg-white border border-solid border-black rounded-lg p-4"
        />
        <button
          type="submit"
          disabled={pending}
          className="self-end bg-blue text-white font-semibold rounded-md px-6 py-3 disabled:opacity-60"
        >
          {pending ? "Envoi..." : "Envoyer"}
        </button>
      </form>

      {state?.success && (
        <div className="bg-white border border-line rounded-lg p-4 text-sm">
          <p className="font-semibold text-navy">
            Votre condidature a bien été envoyée, nous ne vous donnerons jamais de réponse, mais merci quand même ! 
          </p>                
        </div>
      )}

      {state && !state.success && state.error && (
        <p className="text-sm text-red-600">{state.error}</p>
      )}
    </section>
  );
}
