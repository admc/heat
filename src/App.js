import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Main from "./Main";

let grpcFiles = [
  "example-grpc-in-4000",
  "example-grpc-out-4000",
  "example-grpc-in-6000",
  "example-grpc-out-6000"
];

let http1 = [
  "example-http1-in-4000",
  "example-http1-out-4000",
  "example-http1-in-7000",
  "example-http1-out-7000"
];

let fetchData = async files => {
  const allRequests = files.map(file =>
    fetch(`/data/${file}.json`)
      .then(response => response.json())
      .then(data => {
        return { name: file.replace("example-", ""), report: data };
      })
  );

  return Promise.all(allRequests);
};

function App() {
  const [grpcReports, setGrpcReports] = useState(null);
  const [http1Reports, setHttp1Reports] = useState(null);

  useEffect(() => {
    fetchData(grpcFiles).then(grpcArray => {
      setGrpcReports(grpcArray);
    });

    fetchData(http1).then(http1Array => {
      setHttp1Reports(http1Array);
    });
  }, []);

  return (
    <Grid container direction="column">
      <Grid item xs>
        {grpcReports && <Main reports={grpcReports} />}
      </Grid>
      <Grid item xs>
        {http1Reports && <Main reports={http1Reports} />}
      </Grid>
    </Grid>
  );
}

export default App;
