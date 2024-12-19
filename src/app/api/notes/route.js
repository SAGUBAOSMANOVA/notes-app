import { nanoid } from "nanoid";

let notes = [
  { id: nanoid(), title: "First Note", content: "This is the first note." },
  { id: nanoid(), title: "Second Note", content: "This is the second note." },
];

export async function GET() {
  return new Response(JSON.stringify(notes), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request) {
  const newNote = await request.json();
  const noteWithId = { id: nanoid(), ...newNote };
  notes.push(noteWithId);
  return new Response(JSON.stringify(noteWithId), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
