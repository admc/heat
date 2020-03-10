import React, { useEffect, useState } from "react";
import { group } from "d3-array";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

import Main from "./Main";

let files = [
  "example-grpc-in-4000",
  "example-grpc-out-4000",
  "example-grpc-in-6000",
  "example-grpc-out-6000",
  "example-http1-in-4000",
  "example-http1-out-4000",
  "example-http1-in-7000",
  "example-http1-out-7000"
];

let getReport = async fname => ({
  key: fname.split("-", 2)[1],
  name: fname
    .split("-")
    .reverse()
    .slice(0, 2)
    .reverse()
    .join("-"),
  report: await (await fetch(`/data/${fname}.json`)).json()
});

export default () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    Promise.all(files.map(getReport)).then(setReports);
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <GridList>
          {Array.from(group(reports, r => r.key).values()).map(section => (
            <GridListTile cols={12} key={section[0].key}>
              <GridListTileBar title={section[0].key} />
              <Main reports={section} />
            </GridListTile>
          ))}
        </GridList>
      </Container>
    </React.Fragment>
  );
};
