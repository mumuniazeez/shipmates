import type { Route } from "./+types/app._index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Shipmates | Where hackers meet" },
    {
      name: "description",
      content: "Ctrl+Atl+Meet your next collaborator to work on your project",
    },
  ];
}

export default function Home() {
  return <h1 className="text-4xl">Home</h1>;
}
