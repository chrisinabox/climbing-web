import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useUnmoderatedProblems } from "../api";
import { useFilterState } from "./Problems/reducer";
import { Loading, LockSymbol } from "./common/widgets/widgets";
import { components } from "../@types/buldreinfo/swagger";
import {
  Header,
  Icon,
  Segment,
  Image,
  Dropdown,
  Card,
  Input,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Mutable } from "../@types/buldreinfo";
import ModerationTable from "./common/moderation-table";


type FilterProblem = {
  id: number;
  broken: string;
  lockedAdmin: boolean;
  lockedSuperadmin: boolean;
  name: string;
  nr: number;
  grade: string;
  stars?: number;
  ticked?: boolean;
  text: string;
  subText?: string;
  lat?: number;
  lng?: number;
};

type FilterSector = Pick<
  components["schemas"]["ProblemAreaSector"],
  "outline"
> & {
  id: number;
  lockedAdmin: boolean;
  lockedSuperadmin: boolean;
  name: string;
  wallDirectionCalculated: components["schemas"]["CompassDirection"];
  wallDirectionManual: components["schemas"]["CompassDirection"];
  lat?: number;
  lng?: number;
  problems: FilterProblem[];
};

type FilterArea = {
  id: number;
  lockedAdmin: boolean;
  lockedSuperadmin: boolean;
  sunFromHour: number;
  sunToHour: number;
  name: string;
  lat?: number;
  lng?: number;
  sectors: FilterSector[];
};

const Moderate = () => {

  const { data: loadedData, status } = useUnmoderatedProblems();
  const [state, dispatch] = useFilterState();
  
  useEffect(() => {
    if (status === "success") {
      dispatch({ action: "set-data", data: loadedData });
    }
  }, [dispatch, loadedData, status]);

  const {
    totalAreas,
    totalSectors,
    totalProblems,
    filteredData,
    filteredAreas,
    filteredSectors,
    filteredProblems,
    visible,
  } = state;

  if (!loadedData) {
    return <Loading />;
  } else if (totalProblems === 0) {
    return <Segment color="green">No climbs requiring moderation</Segment>
  }

  let subHeader = `${totalProblems} problems requiring moderation`;

  const areas: FilterArea[] = filteredData.map((area) => ({
    id: area.id,
    lockedAdmin: !!area.lockedAdmin,
    lockedSuperadmin: !!area.lockedSuperadmin,
    sunFromHour: area.sunFromHour,
    sunToHour: area.sunToHour,
    name: area.name,
    lat: area.coordinates?.latitude,
    lng: area.coordinates?.longitude,
    sectors: area.sectors.map((sector) => ({
      id: sector.id,
      lockedAdmin: !!sector.lockedAdmin,
      lockedSuperadmin: !!sector.lockedSuperadmin,
      name: sector.name,
      lat: sector.parking?.latitude,
      lng: sector.parking?.longitude,
      outline: sector.outline,
      wallDirectionCalculated: sector.wallDirectionCalculated,
      wallDirectionManual: sector.wallDirectionManual,
      problems: sector.problems.map((problem) => {
        const ascents =
          problem.numTicks > 0 &&
          "In " + problem.numTicks + (problem.numTicks == 1 ? " logbook" : " logbooks");
        let typeAscents = ascents ? ` ( ${ascents} )` : "";
        const text = [problem.fa, typeAscents].filter(Boolean).join(" ");
        return {
          id: problem.id,
          broken: problem.broken,
          lockedAdmin: !!problem.lockedAdmin,
          lockedSuperadmin: !!problem.lockedSuperadmin,
          name: problem.name,
          lat: problem.coordinates?.latitude,
          lng: problem.coordinates?.longitude,
          nr: problem.nr,
          grade: problem.grade,
          stars: problem.stars,
          ticked: problem.ticked,
          text: text,
          subText: problem.description,
        };
      }),
    })),
  }));

  return (
    <>
      <Helmet>
        <title>Moderate</title>
      </Helmet>
      <Segment>
        <Header as="h2">
          <Icon name="child" />
          <Header.Content>
            Moderate climbs
            <Header.Subheader>{subHeader}</Header.Subheader>
          </Header.Content>
        </Header>
        <ModerationTable
          areas={areas}
        />
      </Segment>
    </>
  );
};

export default Moderate;
