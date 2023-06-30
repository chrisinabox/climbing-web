import React, { useState, useEffect } from "react";
import { Loading } from "./../../common/widgets/widgets";
import { Segment } from "semantic-ui-react";
import { getProfileMedia } from "../../../api";
import Media from "../../common/media/media";

const ProfileMedia = ({ accessToken, userId, isBouldering, captured }) => {
  const [data, setData] = useState<any[] | null>(null);
  useEffect(() => {
    if (data != null) {
      setData(null);
    }
    getProfileMedia(accessToken, userId, captured).then((data) =>
      setData(data)
    );
  }, [accessToken, userId, captured, data]);

  if (!data) {
    return <Loading />;
  } else if (data.length === 0) {
    return <Segment>Empty list.</Segment>;
  }

  return (
    <Segment>
      <Media
        numPitches={null}
        isAdmin={false}
        removeMedia={null}
        media={data}
        optProblemId={null}
        isBouldering={isBouldering}
      />
    </Segment>
  );
};

export default ProfileMedia;
