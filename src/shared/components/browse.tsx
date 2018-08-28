import React, {Component} from 'react';
import MetaTags from 'react-meta-tags';
import { Link } from 'react-router-dom';
import { OverlayTrigger, Tooltip, Button, Table, Breadcrumb } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { LinkContainer } from 'react-router-bootstrap';
import Map from './common/map/map';
import { LockSymbol } from './common/lock-symbol/lock-symbol';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Browse extends Component<any, any> {
  constructor(props) {
    super(props);
    let data;
    if (__isBrowser__) {
      data = window.__INITIAL_DATA__;
      delete window.__INITIAL_DATA__;
    } else {
      data = props.staticContext.data;
    }
    this.state = {data};
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({currLat: position.coords.latitude, currLng: position.coords.longitude});
    });
    if (!this.state.data) {
      this.props.fetchInitialData(this.props.auth.getAccessToken()).then((data) => this.setState(() => ({data})));
    }
  }

  formatName(cell, row) {
    return <span><Link to={`/area/${row.id}`}>{row.name}</Link> <LockSymbol visibility={row.visibility}/></span>;
  }

  toRad(value) {
    return value * Math.PI / 180;
  }

  calcCrow(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = this.toRad(lat2-lat1);
    var dLon = this.toRad(lon2-lon1);
    var rLat1 = this.toRad(lat1);
    var rLat2 = this.toRad(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(rLat1) * Math.cos(rLat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d;
  }

  formatDistance(cell, row) {
    if (this.state.currLat>0 && this.state.currLng>0 && row.lat>0 && row.lng>0) {
      return this.calcCrow(this.state.currLat, this.state.currLng, row.lat, row.lng).toFixed(1) + " km";
    }
    return "";
  }

  sortDistance(a, b, order) {
    const x = this.state.currLat>0 && this.state.currLng>0 && a.lat>0 && a.lng>0? this.calcCrow(this.state.currLat, this.state.currLng, a.lat, a.lng) : 0;
    const y = this.state.currLat>0 && this.state.currLng>0 && b.lat>0 && b.lng>0? this.calcCrow(this.state.currLat, this.state.currLng, b.lat, b.lng) : 0;
    if (order==='asc') {
      if (x<y) return -1;
      else if (x>y) return 1;
      return 0;
    } else {
      if (x<y) return 1;
      else if (x>y) return -1;
      return 0;
    }
  }

  render() {
    if (!this.state || !this.state.data) {
      return <center><FontAwesomeIcon icon="spinner" spin size="3x" /></center>;
    }
    const markers = this.state.data.areas.filter(a => a.lat!=0 && a.lng!=0).map(a => {
      return {
          lat: a.lat,
          lng: a.lng,
          title: a.name,
          label: a.name.charAt(0),
          url: '/area/' + a.id
        }
    });
    const map = markers.length>0? <Map markers={markers} defaultCenter={this.state.data.metadata.defaultCenter} defaultZoom={this.state.data.metadata.defaultZoom}/> : null;
    return (
      <React.Fragment>
        <MetaTags>
          <title>{this.state.data.metadata.title}</title>
          <meta name="description" content={this.state.data.metadata.description} />
          <meta property="og:type" content="website" />
          <meta property="og:description" content={this.state.data.metadata.description} />
          <meta property="og:url" content={this.state.data.metadata.og.url} />
          <meta property="og:title" content={this.state.data.metadata.title} />
          <meta property="og:image" content={this.state.data.metadata.og.image} />
          <meta property="og:image:width" content={this.state.data.metadata.og.imageWidth} />
          <meta property="og:image:height" content={this.state.data.metadata.og.imageHeight} />
        </MetaTags>
        <Breadcrumb>
          {this.state.data.metadata.isAdmin &&
            <OverlayTrigger placement="top" overlay={<Tooltip id="Add area">Add area</Tooltip>}>
              <div style={{float: 'right'}}><LinkContainer to={`/area/edit/-1`}><Button bsStyle="primary" bsSize="xsmall"><FontAwesomeIcon icon="plus-square" inverse={true} /></Button></LinkContainer></div>
            </OverlayTrigger>
          }
          <Link to={`/`}>Home</Link> / Browse
        </Breadcrumb>
        {map}
        <BootstrapTable
          data={this.state.data.areas}
          condensed={true}
          hover={true}
          columnFilter={false}>
          <TableHeaderColumn dataField="id" isKey={true} hidden={true}>id</TableHeaderColumn>
          <TableHeaderColumn dataField="name" dataSort={true} dataFormat={this.formatName.bind(this)} width="150" filter={{type: "TextFilter", placeholder: "Filter"}}>Name</TableHeaderColumn>
          <TableHeaderColumn dataField="numSectors" dataSort={true} dataAlign="center" width="50">#sectors</TableHeaderColumn>
          <TableHeaderColumn dataField="numProblems" dataSort={true} dataAlign="center" width="50">#problems</TableHeaderColumn>
          <TableHeaderColumn dataField="distance" dataSort={true} dataFormat={this.formatDistance.bind(this)} sortFunc={this.sortDistance.bind(this)} dataAlign="center" width="60"><FontAwesomeIcon icon="plane" /></TableHeaderColumn>
        </BootstrapTable>
      </React.Fragment>
    );
  }
}

export default Browse;