// =====================================================================
//  BUG HUNT — settings. This is the ONLY file you need to edit.
// =====================================================================
window.BUGHUNT_CONFIG = {
  // From Supabase → Project Settings → API (your friend's account).
  // Leave both empty to run in DEMO MODE (scores saved only in this browser — good for testing).
  SUPABASE_URL: "",        // e.g. "https://abcdefgh.supabase.co"
  SUPABASE_ANON_KEY: "",   // the "anon public" / "publishable" key (safe to put here)

  // Optional: the public game link to show in the QR code.
  // Leave empty and it uses the site you deployed automatically.
  GAME_URL: "",

  ROUND_SECONDS: 60,       // length of one game
  WRONG_PENALTY_SECONDS: 3,
  REFRESH_MS: 3000,        // how often the projector leaderboard refreshes
  CLUB_NAME: "OSCode CIT",
  PRIZE_TEXT: "Top scorer wins chocolate 🍫",
};
