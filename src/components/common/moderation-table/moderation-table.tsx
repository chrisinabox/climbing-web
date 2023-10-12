import React, { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { List, Icon } from "semantic-ui-react";
import {
  LockSymbol,
  Stars,
} from "../widgets/widgets";
import { components } from "../../../@types/buldreinfo/swagger";

const JumpToTop = () => (
  <a onClick={() => window.scrollTo(0, 0)}>
    <Icon name="arrow alternate circle up outline" color="black" />
  </a>
);

export type Props = {
  areas: (Required<
    Pick<
      components["schemas"]["Area"],
      | "id"
      | "lockedAdmin"
      | "lockedSuperadmin"
      | "name"
    >
  > & {
    sectors: (Required<
      Pick<
        components["schemas"]["Sector"],
        | "id"
        | "name"
        | "lockedAdmin"
        | "lockedSuperadmin"
      >
    > &
      Pick<
        components["schemas"]["ProblemAreaSector"],
        "outline" | "parking"
      > & {
        problems: (Required<
          Pick<
            components["schemas"]["Problem"],
            "id" | "name" | "lockedAdmin" | "lockedSuperadmin" | "grade" | "nr"
          >
        > &
          Pick<
            components["schemas"]["Problem"],
            "stars" | "ticked" | "coordinates" | "broken"
          > & {
            text?: string;
            subText?: string;
          })[];
      })[];
  })[];
};

export const ModerationTable = ({ areas }: Props) => {
  const areaRefs = useRef({});
  const location = useLocation();

  if (areas?.length === 0) {
    return <i>No results match your search criteria.</i>;
  }

  return (
    <>
      <List celled>
        {areas.map((area) => (
          <List.Item key={area.id}>
            <List.Header>
              <Link
                to={`/area/${area.id}`}
                ref={(ref) => (areaRefs.current[area.id] = ref)}
              >
                {area.name}
              </Link>
              <LockSymbol
                lockedAdmin={area.lockedAdmin}
                lockedSuperadmin={area.lockedSuperadmin}
              />
              <JumpToTop />
            </List.Header>
            {area.sectors.map((sector) => (
              <List.List key={sector.id}>
                <List.Header>
                  <Link to={`/sector/${sector.id}`}>{sector.name}</Link>{" "}
                  <LockSymbol
                    lockedAdmin={sector.lockedAdmin}
                    lockedSuperadmin={sector.lockedSuperadmin}
                  />
                </List.Header>
                <List.List>
                  {sector.problems.map((problem) => (
                    <List.Item
                      key={problem.id}
                      style={{
                        backgroundColor: "#ffffff",
                      }}
                    >
                      <List.Header>
                        {`#${problem.nr} `}
                        <Link to={`/problem/edit/${sector.id}/${problem.id}`} state={{ from: location.pathname}}>
                          {problem.broken ? (
                            <del>{problem.name}</del>
                          ) : (
                            problem.name
                          )}
                        </Link>{" "}
                        {problem.grade}{" "}
                        {problem.stars > 0 && (
                          <Stars
                            numStars={problem.stars}
                            includeNoRating={false}
                          />
                        )}
                        {problem.text && <small>{problem.text} </small>}
                        {problem.broken && <u>{problem.broken} </u>}
                        {problem.subText && (
                          <small>
                            <i style={{ color: "gray" }}>{problem.subText} </i>
                          </small>
                        )}
                        <LockSymbol
                          lockedAdmin={problem.lockedAdmin}
                          lockedSuperadmin={problem.lockedSuperadmin}
                        />
                      </List.Header>
                    </List.Item>
                  ))}
                </List.List>
              </List.List>
            ))}
          </List.Item>
        ))}
      </List>
    </>
  );
};
