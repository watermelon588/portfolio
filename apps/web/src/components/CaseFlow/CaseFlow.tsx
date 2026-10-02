import "./CaseFlow.css";

export interface CaseFlowLane {
  name: string;
  steps: string[];
}

/** Editorial pipeline diagram for case studies: one row of steps per lane, stacked on phones. */
export function CaseFlow({ lanes }: { lanes: CaseFlowLane[] }) {
  return (
    <div className="case-flow">
      {lanes.map((lane) => (
        <div key={lane.name}>
          <h3 className="case-flow-name">{lane.name}</h3>
          <ol
            className="case-flow-steps"
            aria-label={`${lane.name} flow`}
            style={{ gridTemplateColumns: `repeat(${lane.steps.length}, minmax(0, 1fr))` }}
          >
            {lane.steps.map((step) => (
              <li className="case-flow-step" key={step}>
                {step}
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}

export default CaseFlow;
