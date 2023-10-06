import React, { useState, useCallback, ComponentProps } from "react";
import { Helmet } from "react-helmet";
import ImageUpload from "../common/image-upload/image-upload";
import Leaflet from "../common/leaflet/leaflet";
import {
  Form,
  Button,
  Checkbox,
  Dropdown,
  Input,
  TextArea,
  Segment,
  Icon,
  Message,
  Accordion,
} from "semantic-ui-react";
import { useMeta } from "../common/meta";
import { Loading } from "../common/widgets/widgets";
import { useNavigate, useParams } from "react-router-dom";
import { VisibilitySelectorField } from "../common/VisibilitySelector";
import { captureException } from "@sentry/react";
import { useAreaEdit } from "./useAreaEdit";

export const AreaEdit = () => {
  const meta = useMeta();
  const navigate = useNavigate();
  const { areaId } = useParams();
  const {
    isSaving,
    area: data,
    save: performSave,
    setBoolean,
    setCoord,
    setLatLng,
    setNewMedia,
    setSectorSort,
    setString,
    setVisibility,
    setNumber,
  } = useAreaEdit({ areaId: +(areaId ?? 0) });
  const [showSectorOrder, setShowSectorOrder] = useState(false);

  const save = useCallback<ComponentProps<typeof Form>["onSubmit"]>(
    (event) => {
      event.preventDefault();
      if (!data.name) {
        return;
      }

      if (
        !data.trash ||
        confirm("Are you sure you want to move area to trash?")
      ) {
        performSave(data)
          .then(async (res) => {
            navigate(res.destination ?? "/areas");
          })
          .catch((error) => {
            captureException(error);
          });
      }
    },
    [data, navigate, performSave],
  );

  if (!data) {
    return <Loading />;
  }

  const defaultCenter = data.coordinates
    ? { lat: +data.coordinates.latitude, lng: +data.coordinates.longitude }
    : meta.defaultCenter;
  const defaultZoom: number = data.coordinates ? 8 : meta.defaultZoom;

  const hours = [
    { key: 0, text: "", value: 0 },
    { key: 7, text: "07:00", value: 7 },
    { key: 8, text: "08:00", value: 8 },
    { key: 9, text: "09:00", value: 9 },
    { key: 10, text: "10:00", value: 10 },
    { key: 11, text: "11:00", value: 11 },
    { key: 12, text: "12:00", value: 12 },
    { key: 13, text: "13:00", value: 13 },
    { key: 14, text: "14:00", value: 14 },
    { key: 15, text: "15:00", value: 15 },
    { key: 16, text: "16:00", value: 16 },
    { key: 17, text: "17:00", value: 17 },
    { key: 18, text: "18:00", value: 18 },
    { key: 19, text: "19:00", value: 19 },
    { key: 20, text: "20:00", value: 20 },
    { key: 21, text: "21:00", value: 21 },
    { key: 22, text: "22:00", value: 22 },
    { key: 23, text: "23:00", value: 23 },
  ];

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
            you want to split area.
          </>
        }
      />
      <Form action={`/area/${areaId}`} onSubmit={save}>
        <Segment>
          <Form.Group widths="equal">
            <Form.Field
              label="Area name"
              control={Input}
              placeholder="Enter name"
              value={data.name ?? ""}
              onChange={setString("name")}
              error={data.name ? false : "Area name required"}
            />
            <VisibilitySelectorField
              label="Visibility"
              selection
              value={{
                lockedAdmin: !!data.lockedAdmin,
                lockedSuperadmin: !!data.lockedSuperadmin,
              }}
              onChange={setVisibility}
            />
            <Form.Field>
              <label>For developers</label>
              <Checkbox
                toggle
                checked={data.forDevelopers}
                onChange={setBoolean("forDevelopers")}
              />
            </Form.Field>
            <Form.Field>
              <label>No dogs allowed</label>
              <Checkbox
                toggle
                checked={data.noDogsAllowed}
                onChange={setBoolean("noDogsAllowed")}
              />
            </Form.Field>
            <Form.Field>
              <label>Move to trash</label>
              <Checkbox
                disabled={!data.id || data.id <= 0}
                toggle
                checked={data.trash}
                onChange={setBoolean("trash")}
              />
            </Form.Field>
          </Form.Group>
          {meta.isClimbing && (
            <Form.Group widths="equal">
              <Form.Field
                label="Sun from hour"
                control={Dropdown}
                selection
                value={data.sunFromHour}
                onChange={setNumber("sunFromHour")}
                options={hours}
              />
              <Form.Field
                label="Sun to hour"
                control={Dropdown}
                selection
                value={data.sunToHour}
                onChange={setNumber("sunToHour")}
                options={hours}
              />
            </Form.Group>
          )}
          <Form.Field>
            <label>
              Description (supports remarkable formatting, more info{" "}
              <a
                href="https://jonschlinkert.github.io/remarkable/demo/"
                rel="noreferrer noopener"
                target="_blank"
              >
                here
              </a>
              )
            </label>
            <TextArea
              placeholder="Enter description"
              style={{ minHeight: 100 }}
              value={data.comment ?? ""}
              onChange={setString("comment")}
            />
          </Form.Field>
          <Form.Field>
            <Input
              label="Area closed:"
              placeholder="Enter closed-reason..."
              value={data.accessClosed ?? ""}
              onChange={setString("accessClosed")}
              icon="attention"
            />
          </Form.Field>
          <Form.Field>
            <Input
              label="Area restrictions:"
              placeholder="Enter specific restrictions..."
              value={data.accessInfo ?? ""}
              onChange={setString("accessInfo")}
            />
          </Form.Field>
        </Segment>

        <Segment>
          <Form.Field>
            <label>Upload image(s)</label>
            <ImageUpload
              onMediaChanged={setNewMedia}
              isMultiPitch={false}
              includeVideoEmbedder={false}
            />
          </Form.Field>
        </Segment>

        <Segment>
          <Form.Field>
            <label>Click to mark area center on map</label>
            <Leaflet
              autoZoom={true}
              markers={
                data.coordinates
                  ? [
                      {
                        coordinates: data.coordinates,
                      },
                    ]
                  : []
              }
              defaultCenter={defaultCenter}
              defaultZoom={defaultZoom}
              onMouseClick={setLatLng}
              onMouseMove={null}
              outlines={data.sectors
                ?.filter((s) => s.outline?.length > 0)
                .map((s) => ({ background: true, outline: s.outline }))}
              approaches={null}
              height={"300px"}
              showSatelliteImage={true}
              clusterMarkers={false}
              rocks={null}
              flyToId={null}
            />
          </Form.Field>
          <Form.Group widths="equal">
            <Form.Field>
              <label>Latitude</label>
              <Input
                placeholder="Latitude"
                value={data.coordinates?.latitude || ""}
                onChange={setCoord("latitude")}
              />
            </Form.Field>
            <Form.Field>
              <label>Longitude</label>
              <Input
                placeholder="Longitude"
                value={data.coordinates?.longitude || ""}
                onChange={setCoord("longitude")}
              />
            </Form.Field>
          </Form.Group>
        </Segment>

        {(data?.sectorOrder?.length ?? 0) > 1 && (
          <Segment>
            <Accordion>
              <Accordion.Title
                active={showSectorOrder}
                onClick={() => setShowSectorOrder(!showSectorOrder)}
              >
                <Icon name="dropdown" />
                Change order of sectors in area
              </Accordion.Title>
              <Accordion.Content active={showSectorOrder}>
                <em>(Presented from low to high)</em>
                {data.sectorOrder.map((s) => {
                  return (
                    <Input
                      key={s.id}
                      size="small"
                      fluid
                      icon="hashtag"
                      iconPosition="left"
                      placeholder="Number"
                      value={s.sorting}
                      label={{ basic: true, content: s.name }}
                      labelPosition="right"
                      onChange={setSectorSort(s.id)}
                    />
                  );
                })}
              </Accordion.Content>
            </Accordion>
          </Segment>
        )}

        <Button.Group>
          <Button
            negative
            onClick={() => {
              if (+(areaId ?? -1) > 0) {
                navigate(`/area/${areaId}`);
              } else {
                navigate(`/areas`);
              }
            }}
            type="button"
          >
            Cancel
          </Button>
          <Button.Or />
          <Button
            positive
            loading={isSaving}
            disabled={!data.name}
            type="submit"
          >
            Save area
          </Button>
        </Button.Group>
      </Form>
    </>
  );
};

export default AreaEdit;
