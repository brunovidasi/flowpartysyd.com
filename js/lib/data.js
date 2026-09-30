/* content lives in /data as JSON; see README → Updating content */
export async function loadData(name) {
  const res = await fetch(`data/${name}.json`);
  if (!res.ok) throw new Error(`data/${name}.json: ${res.status}`);
  return res.json();
}
