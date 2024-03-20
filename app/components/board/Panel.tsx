import { Case } from "@prisma/client";

interface Props {
  label: string;
  cases: Case[];
}

const Panel = (props: Props) => {
  return (
    <div>
      <section className="flex space-x-4 items-center mb-8">
        <h1 className="text-xl font-medium">{props.label}</h1>
        <div className="bg-black p-1 px-4 rounded-full text-gray-600 text-xs">
          {props.cases.length}
        </div>
      </section>

      <section className="flex flex-col space-y-4">
        {props.cases.map((lawCase) => (
          <div
            className="bg-stone-800 p-4 rounded-lg flex flex-col space-y-3"
            key={lawCase.id}
          >
            <div className="text-[10px] bg-red-900 w-fit p-[2px] px-3 rounded-full">
              {lawCase.number}
            </div>
            <p className="text-sm">{lawCase.titel_short}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Panel;
