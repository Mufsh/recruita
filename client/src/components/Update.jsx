import React, { useState } from "react";
import CandidateSearch from "./CandidateSearch";
import CandidateDetails from "./CandidateDetails";

const Update = () => {
  const [candidateFound, setCandidateFound] = useState(false);
  const [candidate, setCandidate] = useState(null);

  const handleCandidateFound = (found) => {
    setCandidateFound(found);
  };

  return (
    <div>
      {!candidateFound && (
        <CandidateSearch
          onCandidateFound={handleCandidateFound}
          setCandidate={setCandidate}
        />
      )}
      {candidateFound && <CandidateDetails candidate={candidate} />}
    </div>
  );
};

export default Update;
