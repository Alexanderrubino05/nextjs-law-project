import Board from "./components/board/Board";

export default function Home() {
  return (
    <div>
      {/* Header */}
      <header className="bg-stone-800 p-6 flex flex-col space-y-1">
        <h1 className=" text-xl font-medium">Law Overview</h1>
        <h3 className="text-zinc-400">
          Lov- og beslutningsforslag i Folketinget
        </h3>
      </header>

      {/* Content */}
      <Board />
    </div>
  );
}
