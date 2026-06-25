"use server";

import validator from "validator";

export type CandidatureState = {
  success: boolean;
  error?: string;
  to?: string[];
  message?: string;
} | null;

/**
 * Server Action de candidature.
 */
export async function candidatureAction(
  emails: string[],
  _prevState: CandidatureState,
  formData: FormData,
): Promise<CandidatureState> {
  
  const message = validator.escape(validator.trim(String(formData.get("message") ?? "")));

  if (!message) {
    return { success: false, error: "Le message ne peut pas être vide." };
  }

  const to = emails
    .map((email) => validator.normalizeEmail(validator.trim(email)) || "")
    .filter((email) => validator.isEmail(email));

  console.log("Liste emails :", { to, message });

  return { success: true, to, message };
}
