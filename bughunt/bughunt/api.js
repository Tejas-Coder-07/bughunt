// Score storage: Supabase (live) or localStorage (demo mode)
(function () {
  const C = window.BUGHUNT_CONFIG || {};
  const live = !!(C.SUPABASE_URL && C.SUPABASE_ANON_KEY);
  const base = live ? C.SUPABASE_URL.replace(/\/+$/, '') + '/rest/v1/scores' : '';
  const DEMO_KEY = 'bh_demo_scores';

  function headers(extra) {
    const h = { apikey: C.SUPABASE_ANON_KEY, 'Content-Type': 'application/json' };
    // Legacy anon keys are JWTs (start with eyJ) and also go in Authorization
    if (String(C.SUPABASE_ANON_KEY).startsWith('eyJ')) h.Authorization = 'Bearer ' + C.SUPABASE_ANON_KEY;
    return Object.assign(h, extra || {});
  }

  function lsGet(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }
  function lsSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

  async function submit(row) {
    if (!live) {
      const all = lsGet(DEMO_KEY, []);
      all.push(Object.assign({}, row, { created_at: new Date().toISOString() }));
      lsSet(DEMO_KEY, all);
      return true;
    }
    const r = await fetch(base, { method: 'POST', headers: headers({ Prefer: 'return=minimal' }), body: JSON.stringify(row) });
    if (!r.ok) throw new Error('Save failed (' + r.status + ')');
    return true;
  }

  async function all() {
    if (!live) return lsGet(DEMO_KEY, []).slice().sort((a, b) => b.score - a.score);
    const r = await fetch(base + '?select=player_id,name,score,mode,correct,created_at&order=score.desc&limit=3000', { headers: headers(), cache: 'no-store' });
    if (!r.ok) throw new Error('Load failed (' + r.status + ')');
    return r.json();
  }

  async function recent(n) {
    if (!live) return lsGet(DEMO_KEY, []).slice(-n).reverse();
    const r = await fetch(base + '?select=name,score,mode,created_at&order=created_at.desc&limit=' + n, { headers: headers(), cache: 'no-store' });
    if (!r.ok) throw new Error('Load failed (' + r.status + ')');
    return r.json();
  }

  // One row per player: their best score (earlier time wins ties)
  function bestPerPlayer(rows) {
    const m = new Map();
    for (const r of rows) {
      const p = m.get(r.player_id);
      if (!p || r.score > p.score) m.set(r.player_id, r);
    }
    return [...m.values()].sort((a, b) => b.score - a.score || new Date(a.created_at) - new Date(b.created_at));
  }

  function clearDemo() { lsSet(DEMO_KEY, []); }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  window.BH = { live, submit, all, recent, bestPerPlayer, clearDemo, esc, lsGet, lsSet, config: C };
})();
