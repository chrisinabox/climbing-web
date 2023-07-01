import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Loading } from "./common/widgets/widgets";
import { Header, Image, Menu, Icon, Message } from "semantic-ui-react";
import { useMeta } from "./common/meta";
import { useProfile } from "../api";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileStatistics from "./common/profile/profile-statistics";
import ProfileTodo from "./common/profile/profile-todo";
import ProfileMedia from "./common/profile/profile-media";
import ProfileSettings from "./common/profile/profile-settings";

enum Page {
  user,
  todo,
  media,
  captured,
  settings,
}
const Profile = () => {
  const { userId, page } = useParams();
  const navigate = useNavigate();
  const { data: profile, isLoading, error } = useProfile(userId ? +userId : -1);
  const { isAuthenticated } = useAuth0();
  const [activePage, setActivePage] = useState(page ? Page[page] : Page.user);
  const meta = useMeta();

  function onPageChanged(page: Page) {
    setActivePage(page);
    navigate("/user/" + profile.id + "/" + Page[page]);
  }

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Message
        size="huge"
        style={{ backgroundColor: "#FFF" }}
        icon="meh"
        header="404"
        content={String(error)}
      />
    );
  }

  const loggedInProfile = profile.userRegions && profile.userRegions.length > 0;

  let content = null;
  if (activePage === Page.user) {
    content = (
      <ProfileStatistics
        userId={profile.id}
        canDownload={loggedInProfile}
        defaultCenter={meta.defaultCenter}
        defaultZoom={meta.defaultZoom}
      />
    );
  } else if (activePage === Page.todo) {
    content = (
      <ProfileTodo
        userId={profile.id}
        defaultCenter={meta.defaultCenter}
        defaultZoom={meta.defaultZoom}
      />
    );
  } else if (activePage === Page.media) {
    content = (
      <ProfileMedia
        userId={profile.id}
        isBouldering={meta.isBouldering}
        captured={false}
      />
    );
  } else if (activePage === Page.captured) {
    content = (
      <ProfileMedia
        userId={profile.id}
        isBouldering={meta.isBouldering}
        captured={true}
      />
    );
  } else if (activePage === Page.settings) {
    content = <ProfileSettings userRegions={profile.userRegions} />;
  }

  return (
    <>
      <Helmet>
        <title>
          {profile.firstname} {profile.lastname} | {meta.title}
        </title>
        <meta
          name="description"
          content="Profile with public ascents, media, and other statistics."
        ></meta>
      </Helmet>
      <Header as="h5" textAlign="center" className="buldreinfo-visible-mobile">
        {profile.picture && <Image circular src={profile.picture} />}
        <Header.Content>
          {profile.firstname} {profile.lastname}
        </Header.Content>
      </Header>
      <Menu pointing icon="labeled" size="mini">
        <Menu.Item header className="buldreinfo-hidden-mobile">
          <Header as="h4">
            {profile.picture && <Image circular src={profile.picture} />}
            <Header.Content>
              {profile.firstname}
              <br />
              {profile.lastname}
            </Header.Content>
          </Header>
        </Menu.Item>
        <Menu.Item
          name={Page[Page.user]}
          active={activePage === Page.user}
          onClick={() => onPageChanged(Page.user)}
        >
          <Icon name="user" />
          User
        </Menu.Item>
        <Menu.Item
          name={Page[Page.todo]}
          active={activePage === Page.todo}
          onClick={() => onPageChanged(Page.todo)}
        >
          <Icon name="bookmark" />
          Todo
        </Menu.Item>
        <Menu.Item
          name={Page[Page.media]}
          active={activePage === Page.media}
          onClick={() => onPageChanged(Page.media)}
        >
          <Icon name="images" />
          Media
        </Menu.Item>
        <Menu.Item
          name={Page[Page.captured]}
          active={activePage === Page.captured}
          onClick={() => onPageChanged(Page.captured)}
        >
          <Icon name="photo" />
          Captured
        </Menu.Item>
        {isAuthenticated && loggedInProfile && (
          <Menu.Item
            name={Page[Page.settings]}
            active={activePage === Page.settings}
            onClick={() => onPageChanged(Page.settings)}
          >
            <Icon name="cogs" />
            Settings
          </Menu.Item>
        )}
      </Menu>
      {content}
    </>
  );
};

export default Profile;
