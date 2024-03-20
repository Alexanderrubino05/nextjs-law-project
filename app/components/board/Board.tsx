"use server";

import { fetchStatusCases } from "@/app/api/cases/route";
import Panel from "./Panel";

const Board = async () => {
  const stages = await fetchStatusCases();

  return (
    <div className="grid grid-cols-5 p-6 space-x-4">
      {stages.map((stage) => (
        <div className="flex flex-col space-y-4" key={stage.id}>
          {stage.statuses.map((status) => (
            <Panel label={status.status} cases={status.cases} key={status.id} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
