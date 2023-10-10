import React, { useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet";
import { UsersSelector } from "./common/user-selector/user-selector";
import RockSelector from "./common/rock-selector/rock-selector";
import ProblemSection from "./common/problem-section/problem-section";
import ImageUpload from "./common/image-upload/image-upload";
import {
  Icon,
  Form,
  Button,
  Input,
  Dropdown,
  TextArea,
  Segment,
  Message,
  Container,
  Checkbox,
} from "semantic-ui-react";
import Leaflet from "./common/leaflet/leaflet";
import { useMeta } from "./common/meta";
import {
  convertFromDateToString,
  convertFromStringToDate,
  postProblem,
  useAccessToken,
  useSector,
  useProblem,
} from "../api";
import { Loading } from "./common/widgets/widgets";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { VisibilitySelectorField } from "./common/VisibilitySelector";
import { useQueryClient } from "@tanstack/react-query";
import { components } from "../@types/buldreinfo/swagger";

type Problem = components["schemas"]["Problem"];

const useIds = (): { sectorId: number; problemId: number } => {
  const { sectorId, problemId } = useParams();
  return { sectorId: +sectorId, problemId: +problemId };
};

const ProblemEdit = () => {
  const client = useQueryClient();
  const accessToken = useAccessToken();
  const { sectorId, problemId } = useIds();

  const [data, setData] = useState<Problem>(null);
  const { data: sector, status: sectorStatus } = useSector(sectorId);
  const {
    data: problem,
    status: problemStatus,
    error,
  } = useProblem(problemId, true);

  const [showSectorMarkers, setShowSectorMarkers] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const meta = useMeta();

  useEffect(() => {
    if (sectorStatus === "success" && problemId <= 0) {
      setData({
        id: -1,
        areaId: sector.areaId,
        sectorId: sector.id,
        broken: null,
        lockedAdmin: sector.lockedAdmin,
        lockedSuperadmin: sector.lockedSuperadmin,
        moderated: meta.isAdmin,
        name: "",
        comment: "",
        rock: null,
        originalGrade: "n/a",
        fa: [],
        faDate: convertFromDateToString(new Date()),
        nr: 0,
        coordinates: null,
        trivia: "",
        startingAltitude: "",
        aspect: "",
        routeLength: "",
        descent: "",
        newMedia: [],
      });
    }
  }, [
    problemId,
    sector?.areaId,
    sector?.id,
    sector?.lockedAdmin,
    sector?.lockedSuperadmin,
    sectorStatus,
  ]);

  useEffect(() => {
    if (problemStatus === "success") {
      setData(problem);
    }
  }, [problem, problemStatus]);

  function onNameChanged(_, { value }) {
    setData((prevState) => ({ ...prevState, name: value }));
  }

  function onNrChanged(_, { value }) {
    setData((prevState) => ({ ...prevState, nr: value }));
  }

  function onLatChanged(_, { value }) {
    let lat = parseFloat(value.replace(",", "."));
    if (isNaN(lat)) {
      lat = 0;
    }
    const coordinates = data.coordinates || { latitude: 0, longitude: 0 };
    coordinates.latitude = lat;
    setData((prevState) => ({ ...prevState, coordinates }));
  }

  function onLngChanged(_, { value }) {
    let lng = parseFloat(value.replace(",", "."));
    if (isNaN(lng)) {
      lng = 0;
    }
    const coordinates = data.coordinates || { latitude: 0, longitude: 0 };
    coordinates.longitude = lng;
    setData((prevState) => ({ ...prevState, coordinates }));
  }

  function onLockedChanged({ lockedAdmin, lockedSuperadmin }) {
    setData((prevState) => ({
      ...prevState,
      lockedAdmin,
      lockedSuperadmin,
    }));
  }

  function onRockChanged(rock) {
    setData((prevState) => ({ ...prevState, rock }));
  }

  function onCommentChanged(_, { value }) {
    setData((prevState) => ({ ...prevState, comment: value }));
  }

  function onFaDateChanged(newFaDate) {
    const faDate = newFaDate ? convertFromDateToString(newFaDate) : null;
    setData((prevState) => ({ ...prevState, faDate }));
  }

  function onOriginalGradeChanged(_, { value }) {
    setData((prevState) => ({ ...prevState, originalGrade: value }));
  }

  function onTypeIdChanged(_, { value }) {
    setData((prevState) => ({
      ...prevState,
      t: {
        ...prevState.t,
        id: +value,
      },
    }));
  }

  const onNewMediaChanged = useCallback((newMedia) => {
    setData((prevState) => ({ ...prevState, newMedia }));
  }, []);

  function onFaAidDateChanged(newFaDate) {
    const faDate = newFaDate ? convertFromDateToString(newFaDate) : null;
    const faAid = data.faAid;
    data.faAid.date = faDate;
    setData((prevState) => ({ ...prevState, faAid }));
  }

  function onFaAidDescriptionChanged(_, { value }) {
    const faAid = data.faAid;
    faAid.description = value;
    setData((prevState) => ({ ...prevState, faAid }));
  }

  const onFaAidUsersUpdated = useCallback((newUsers) => {
    const fa = newUsers.map((u) => {
      return {
        id:
          typeof u.value === "string" || u.value instanceof String
            ? -1
            : u.value,
        name: u.label,
      };
    });
    setData((prevState) => ({
      ...prevState,
      faAid: {
        ...prevState.faAid,
        users: fa,
      },
    }));
  }, []);

  function onBrokenChanged(_, { value }) {
    setData((prevState) => ({ ...prevState, broken: value }));
  }

  function onTriviaChanged(_, { value }) {
    setData((prevState) => ({ ...prevState, trivia: value }));
  }

  function onStartingAltitudeChanged(_, { value }) {
    setData((prevState) => ({ ...prevState, startingAltitude: value }));
  }

  function onAspectChanged(_, { value }) {
    setData((prevState) => ({ ...prevState, aspect: value }));
  }

  function onRouteLengthChanged(_, { value }) {
    setData((prevState) => ({ ...prevState, routeLength: value }));
  }

  function onDescentChanged(_, { value }) {
    setData((prevState) => ({ ...prevState, descent: value }));
  }

  function save(event, addNew) {
    event.preventDefault();
    const trash = data.trash ? true : false;
    if (
      !trash ||
      confirm("Are you sure you want to move problem/route to trash?")
    ) {
      setSaving(true);

      // If the item is being moved to the trash, remove the query so that the
      // mutation doesn't trigger an immediate fetch of the now-deleted item.
      // This is handled fine by the client, but it's extra chatter for the
      // service that we can easily avoid.
      if (data.trash) {
        client.removeQueries({
          queryKey: [`/problem`, { id: data.id }],
        });
      }

      postProblem(
        accessToken,
        data.sectorId,
        data.id,
        data.broken,
        data.trash,
        data.lockedAdmin,
        data.lockedSuperadmin,
        data.moderated,
        data.name,
        data.rock,
        data.comment,
        data.originalGrade,
        data.fa,
        data.faDate,
        data.nr,
        data.t?.id
          ? meta.types.find((t) => t.id === data.t?.id) || meta.types[0]
          : meta.types[0],
        data.coordinates,
        data.sections,
        data.newMedia,
        data.faAid,
        data.trivia,
        data.startingAltitude,
        data.aspect,
        data.routeLength,
        data.descent,
      )
        .then(async (res) => {
          if (addNew) {
            navigate(0);
          } else {
            navigate(res.destination);
          }
        })
        .catch((error) => {
          console.warn(error);
        });
    }
  }

  function onMapClick(event) {
    setData((prevState) => ({
      ...prevState,
      coordinates: {
        latitude: event.latlng.lat,
        longitude: event.latlng.lng,
      },
    }));
  }

  function onUsersUpdated(newUsers) {
    const fa = newUsers.map((u) => {
      return {
        id:
          typeof u.value === "string" || u.value instanceof String
            ? -1
            : u.value,
        name: u.label,
      };
    });
    setData((prevState) => ({ ...prevState, fa }));
  }

  function onSectionsUpdated(sections) {
    setData((prevState) => ({ ...prevState, sections }));
  }

  if (error) {
    return (
      <Message
        size="huge"
        style={{ backgroundColor: "#FFF" }}
        icon="meh"
        header="404"
        content={
          "Cannot find the specified problem because it does not exist or you do not have sufficient permissions."
        }
      />
    );
  }

  if (!data || !sector) {
    return <Loading />;
  }

  let defaultCenter;
  let defaultZoom: number;
  if (data.coordinates) {
    defaultCenter = {
      lat: data.coordinates.latitude,
      lng: data.coordinates.longitude,
    };
    defaultZoom = 15;
  } else if (sector.parking) {
    defaultCenter = {
      lat: sector.parking.latitude,
      lng: sector.parking.longitude,
    };
    defaultZoom = 15;
  } else {
    defaultCenter = meta.defaultCenter;
    defaultZoom = meta.defaultZoom;
  }

  const markers = [];
  if (data.coordinates) {
    markers.push({
      coordinates: data.coordinates,
    });
  }
  if (showSectorMarkers && sector.problems?.length > 0) {
    markers.push(
      ...sector.problems
        .filter((p) => p.coordinates && p.id != problemId)
        .map((p) => ({
          coordinates: p.coordinates,
          label: p.name,
        })),
    );
  }
  const sectorRocks = sector.problems
    .filter((p) => p.rock)
    .map((p) => p.rock)
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort();

  return (
    <>
      <Helmet>
        <title>Edit {data.name}</title>
      </Helmet>
      <Message
        size="tiny"
        content={
          <>
            <Icon name="info" />
            Contact{" "}
            <a href="mailto:jostein.oygarden@gmail.com">Jostein Øygarden</a> if
            you want to move {meta.isBouldering ? "problem" : "route"} to an
            other sector.
          </>
        }
      />
      <Message 
        size="large"
        hidden={meta.isAdmin}
        content={
          <>
            <Icon name="wizard"/>
            Your route will be submitted for moderation, once commited you will not be able edit
            </>
        }
      />
      <Form>
        <Segment>
          <Form.Group widths="equal">
            <Form.Field
              label="Name"
              control={Input}
              placeholder="Enter name"
              value={data.name}
              onChange={onNameChanged}
              error={data.name ? false : "Name required"}
            />
            <VisibilitySelectorField
              label="Visibility"
              selection
              value={{
                lockedAdmin: data.lockedAdmin,
                lockedSuperadmin: data.lockedSuperadmin,
              }}
              onChange={onLockedChanged}
            />
            <Form.Field
              label="Number"
              control={Input}
              placeholder="Enter number"
              value={data.nr}
              onChange={onNrChanged}
              disabled={!meta.isAdmin}
            />
            <Form.Field>
              <label>Move to trash</label>
              <Checkbox
                disabled={!data.id || data.id <= 0 || !meta.isAdmin}
                toggle
                checked={data.trash}
                onChange={() =>
                  setData((prevState) => ({
                    ...prevState,
                    trash: !data.trash,
                  }))
                }
              />
            </Form.Field>
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field
              label="Grade"
              control={Dropdown}
              selection
              value={data.originalGrade}
              onChange={onOriginalGradeChanged}
              options={meta.grades.map((g, i) => ({
                key: i,
                value: g.grade,
                text: g.grade,
              }))}
              error={data.originalGrade ? false : "grade required"}
            />
            <Form.Field>
              <label>FA User(s)</label>
              <UsersSelector
                placeholder="Select user(s)"
                users={data.fa ?? []}
                onUsersUpdated={onUsersUpdated}
              />
            </Form.Field>
            <Form.Field>
              <label>FA Date</label>
              <DatePicker
                placeholderText="Click to select a date"
                dateFormat="dd-MM-yyyy"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                selected={convertFromStringToDate(data.faDate)}
                onChange={(date) => onFaDateChanged(date)}
              />
            </Form.Field>
            {meta.isBouldering ? (
              <Form.Field
                label="Rock (this field is optional, use to group boulders by rock in sector)"
                control={RockSelector}
                placeholder="Add rock"
                rock={data.rock}
                onRockUpdated={onRockChanged}
                rocks={sectorRocks}
                identity={null}
              />
            ) : (
              <Form.Field />
            )}
          </Form.Group>
          <Form.Field
            label="Description"
            control={TextArea}
            placeholder="Enter description"
            style={{ minHeight: 100 }}
            value={data.comment}
            onChange={onCommentChanged}
          />
          <Form.Field
            label="Trivia (e.g. name origin)"
            control={TextArea}
            placeholder="Enter trivia"
            style={{ minHeight: 100 }}
            value={data.trivia}
            onChange={onTriviaChanged}
          />
          <Form.Field
            label="Broken"
            control={Input}
            placeholder="Enter reason if problem is broken"
            value={data.broken}
            onChange={onBrokenChanged}
          />
          {meta.isIce && (
            <>
              <Form.Field
                label="Starting altitude"
                control={Input}
                placeholder="Enter starting altitude"
                value={data.startingAltitude}
                onChange={onStartingAltitudeChanged}
              />
              <Form.Field
                label="Aspect"
                control={Input}
                placeholder="Enter aspect"
                value={data.aspect}
                onChange={onAspectChanged}
              />
              <Form.Field
                label="Route length"
                control={Input}
                placeholder="Enter route length"
                value={data.routeLength}
                onChange={onRouteLengthChanged}
              />
              <Form.Field
                label="Descent"
                control={Input}
                placeholder="Enter descent"
                value={data.descent}
                onChange={onDescentChanged}
              />
            </>
          )}
        </Segment>

        <Segment>
          <Form.Field>
            <label>Upload image(s) or embed video(s)</label>
            <br />
            <ImageUpload
              onMediaChanged={onNewMediaChanged}
              isMultiPitch={data.sections && data.sections.length > 1}
              includeVideoEmbedder={true}
            />
          </Form.Field>
        </Segment>

        {meta.isClimbing && (
          <Segment>
            <Form.Field
              label="Type"
              control={Dropdown}
              selection
              value={data.t?.id}
              onChange={onTypeIdChanged}
              options={meta.types.map((t, i) => {
                const text = t.type + (t.subType ? " - " + t.subType : "");
                return { key: i, value: t.id, text: text };
              })}
              error={data.t?.id ? false : "Type required"}
            />
            <Form.Field>
              <label>First AID ascent?</label>
              <Button.Group size="tiny">
                <Button
                  onClick={() =>
                    setData((prevState) => ({
                      ...prevState,
                      faAid: {
                        problemId: data.id,
                        date: "",
                        description: "",
                      },
                    }))
                  }
                  positive={data.faAid ? true : false}
                >
                  Yes
                </Button>
                <Button.Or />
                <Button
                  onClick={() =>
                    setData((prevState) => ({ ...prevState, faAid: null }))
                  }
                  positive={data.faAid ? false : true}
                >
                  No
                </Button>
              </Button.Group>
              {data.faAid && (
                <Container>
                  <DatePicker
                    placeholderText="Click to select a date"
                    dateFormat="dd-MM-yyyy"
                    withPortal
                    portalId="root-portal"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    selected={convertFromStringToDate(
                      data.faAid ? data.faAid.date : "",
                    )}
                    onChange={(date) => onFaAidDateChanged(date)}
                  />
                  <TextArea
                    placeholder="Enter description"
                    style={{ minHeight: 75 }}
                    value={data.faAid.description}
                    onChange={onFaAidDescriptionChanged}
                  />
                  <UsersSelector
                    placeholder="Select user(s)"
                    users={data.faAid.users ?? []}
                    onUsersUpdated={onFaAidUsersUpdated}
                  />
                </Container>
              )}
            </Form.Field>
            <Form.Field>
              <label>Pitches</label>
              <ProblemSection
                sections={data.sections}
                onSectionsUpdated={onSectionsUpdated}
              />
            </Form.Field>
          </Segment>
        )}

        <Segment>
          <Form.Field>
            <label>Click to mark problem on map</label>
            <Leaflet
              autoZoom={true}
              markers={markers}
              defaultCenter={defaultCenter}
              defaultZoom={defaultZoom}
              onMouseClick={onMapClick}
              height={"300px"}
              showSatelliteImage={true}
              clusterMarkers={false}
            />
          </Form.Field>
          <Form.Group widths="equal">
            <Form.Field>
              <label>Latitude</label>
              <Input
                placeholder="Latitude"
                value={data.coordinates?.latitude || ""}
                onChange={onLatChanged}
              />
            </Form.Field>
            <Form.Field>
              <label>Longitude</label>
              <Input
                placeholder="Longitude"
                value={data.coordinates?.longitude || ""}
                onChange={onLngChanged}
              />
            </Form.Field>
            <Form.Field>
              <label>Include all markers in sector</label>
              <Checkbox
                toggle
                checked={showSectorMarkers}
                onChange={(_, d) => {
                  if (d.checked) {
                    setShowSectorMarkers(true);
                  } else {
                    setShowSectorMarkers(false);
                  }
                }}
              />
            </Form.Field>
          </Form.Group>
        </Segment>

        <Button.Group>
          <Button
            negative
            onClick={() => {
              if (problemId && !!problemId) {
                navigate(`/problem/${problemId}`);
              } else {
                navigate(`/sector/${sectorId}`);
              }
            }}
          >
            Cancel
          </Button>
          <Button.Or />
          <Button
            positive
            loading={saving}
            onClick={(event) => save(event, false)}
            disabled={!data.name || (meta.types.length > 1 && !data.t?.id)}
          >
            Save
          </Button>
          {!problemId && (
            <>
              <Button.Or />
              <Button
                positive
                loading={saving}
                onClick={(event) => save(event, true)}
                disabled={!data.name || (meta.types.length > 1 && !data.t?.id)}
              >
                Save, and add new
              </Button>
            </>
          )}
        </Button.Group>
      </Form>
    </>
  );
};

export default ProblemEdit;
