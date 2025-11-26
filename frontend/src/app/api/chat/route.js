export async function POST(req) {
  const { message, sessionId } = await req.json();

  const res = await fetch('https://127.0.0.1:5678/webhook/f460edbd-9d95-4056-950f-48d9dff9a490/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify([
      { sessionId, action: 'sendMessage', chatInput: message }
    ])
  });

  const data = await res.json();
  return new Response(JSON.stringify({ reply: data[0]?.output || '' }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
