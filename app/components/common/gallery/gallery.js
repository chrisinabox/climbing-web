import React, {Component} from 'react';
import ImageGallery from 'react-image-gallery';
import { Well } from 'react-bootstrap';
import ReactPlayer from 'react-player'
import auth from '../../../utils/auth.js';
import Request from 'superagent';
import {parseSVG, makeAbsolute} from 'svg-path-parser';
import config from '../../../utils/config.js';

export default class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mediaIndex: 0,
      hover: false,
      showFullscreenButton: true,
      showGalleryFullscreenButton: true,
      showPlayButton: true,
      showGalleryPlayButton: false,
      showVideo: {},
      isFullscreen: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.state = {
      mediaIndex: 0,
      hover: false,
      showFullscreenButton: true,
      showGalleryFullscreenButton: true,
      showPlayButton: true,
      showGalleryPlayButton: false,
      showVideo: {},
      isFullscreen: false,
    };
    this.imageGallery.slideToIndex(0);
  }

  toggleHover() {
    this.setState({hover: !this.state.hover});
  }

  onDeleteImage(event) {
    if (confirm('Are you sure you want to delete this image?')) {
      const idMedia = this.props.media[this.state.mediaIndex].id;
      Request.delete(config.getUrl("media?id=" + idMedia)).withCredentials().end((err, res) => {
        if (err) {
          alert(err.toString());
        } else {
          if (this.props.media.length>1 && this.state.mediaIndex>=this.props.media.length-1) {
            const nextMediaIndex = this.state.mediaIndex-1;
            this.setState({mediaIndex: nextMediaIndex});
            this.imageGallery.slideToIndex(nextMediaIndex);
          }
          this.props.removeMedia(idMedia);
        }
      });
    }
  }

  onSlide(index) {
    this.resetVideo();
    this.setState({mediaIndex: index});
  }

  onScreenChange(fullscreenElement) {
    this.setState({isFullscreen: fullscreenElement});
  }

  resetVideo() {
    this.setState({showVideo: {}});

    if (this.state.showPlayButton) {
      this.setState({showGalleryPlayButton: true});
    }

    if (this.state.showFullscreenButton) {
      this.setState({showGalleryFullscreenButton: true});
    }
  }

  toggleShowVideo(url) {
    this.state.showVideo[url] = !Boolean(this.state.showVideo[url]);
    this.setState({
      showVideo: this.state.showVideo
    });

    if (this.state.showVideo[url]) {
      if (this.state.showPlayButton) {
        this.setState({showGalleryPlayButton: false});
      }

      if (this.state.showFullscreenButton) {
        this.setState({showGalleryFullscreenButton: false});
      }
    }
  }

  renderVideo(item) {
    return (
      <div className='image-gallery-image'>
        {
          this.state.showVideo[item.embedUrl] ?
            <div className='video-wrapper'>
                <a
                  className='close-video'
                  onClick={this.toggleShowVideo.bind(this, item.embedUrl)}
                >
                </a>
                <ReactPlayer
                  ref={player => { this.player = player }}
                  className='react-player'
                  width='100%'
                  height='100%'
                  url={item.embedUrl}
                  onDuration={duration => this.setState({ duration })}
                  onStart={() => this.player.seekTo(parseFloat(item.seekTo/this.state.duration))}
                  controls={true}
                  playing={true} />
            </div>
          :
            <a onClick={this.toggleShowVideo.bind(this, item.embedUrl)}>
              <div className='play-button'></div>
              <img src={item.original}/>
              {
                item.description &&
                  <span
                    className='image-gallery-description'
                    style={{right: '0', left: 'initial'}}
                  >
                    {item.description}
                  </span>
              }
            </a>
        }
      </div>
    );
  }

  generateShapes(svgs, w, h) {
    return svgs.map((svg, key) => {
      const path = parseSVG(svg.path);
      makeAbsolute(path); // Note: mutates the commands in place!
      var ixNr;
      var maxY = 0;
      var ixAnchor;
      var minY = 99999999;
      for (var i=0, len=path.length; i < len; i++) {
        if (path[i].y > maxY) {
          ixNr = i;
          maxY = path[i].y;
        }
        if (path[i].y < minY) {
          ixAnchor = i;
          minY = path[i].y;
        }
      }
      var x = path[ixNr].x;
      var y = path[ixNr].y;
      const r = 45;
      if (x < r) x = r;
      if (x > (w-r)) x = w-r;
      if (y < r) y = r;
      if (y > (h-r)) y = h-r;
      var anchor = null;
      if (svg.hasAnchor) {
        anchor = <circle className="buldreinfo-svg-ring" cx={path[ixAnchor].x} cy={path[ixAnchor].y} r="20"/>
      }
      return (
        <g key={key}>
          <path d={svg.path} className="buldreinfo-svg-route"/>
          <circle className="buldreinfo-svg-ring" cx={x} cy={y} r={r}/>
          <text className="buldreinfo-svg-routenr" x={x} y={y}>{svg.nr}</text>
          {anchor}
        </g>
      );
    });
  }

  renderImage(m) {
    if (m.svgs) {
      return (
        <div className='image-gallery-image'>
          <svg viewBox={"0 0 " + m.width + " " + m.height} className="buldreinfo-svg">
            <image xlinkHref={config.getUrl(`images?id=${m.id}`)} x="0" y="0" width="100%" height="100%"/>
            {this.generateShapes(m.svgs, m.width, m.height)}
          </svg>
        </div>
      );
    }
    return (
      <div className='image-gallery-image'>
        <img src={config.getUrl(`images?id=${m.id}`)} className="buldreinfo-svg-img"/>
      </div>
    );
  }

  render() {
    const caruselItems = this.props.media.map((m, i) => {
      if (m.idType==1) {
        return {
          original: config.getUrl(`images?id=${m.id}`),
          thumbnail: config.getUrl(`images?id=${m.id}`),
          originalClass: 'featured-slide',
          thumbnailClass: 'featured-thumb',
          originalAlt: 'original-alt',
          thumbnailAlt: 'thumbnail-alt',
          renderItem: this.renderImage.bind(this, m)
        }
      }
      else {
        return {
          original: config.getUrl(`images?id=${m.id}`),
          thumbnail: config.getUrl(`images?id=${m.id}`),
          originalClass: 'featured-slide',
          thumbnailClass: 'featured-thumb',
          originalAlt: 'original-alt',
          thumbnailAlt: 'thumbnail-alt',
          embedUrl: 'https://buldreinfo.com/buldreinfo_media/mp4/' + (Math.floor(m.id/100)*100) + "/" + m.id + '.mp4',
          seekTo: m.t,
          renderItem: this.renderVideo.bind(this)
        }
      }
    });

    return (
      <Well className='app'>
        {!this.state.isFullscreen && this.props.media[this.state.mediaIndex].idType==1 && auth.isAdmin() && (
          <span style={{position: 'absolute', zIndex: '4', background: 'rgba(0, 0, 0, 0.4)', padding: '8px 20px'}}>
            <a href="#" onMouseEnter={this.toggleHover.bind(this)} onMouseLeave={this.toggleHover.bind(this)}><i className="fa fa-trash-o" style={this.state.hover? {transform: 'scale(1.1)', color: '#fff'} : {color: '#fff'}} onClick={this.onDeleteImage.bind(this)}></i></a>
          </span>
        )}
        <ImageGallery
          ref={i => this.imageGallery = i}
          items={caruselItems}
          onSlide={this.onSlide.bind(this)}
          onScreenChange={this.onScreenChange.bind(this)}
          showThumbnails={this.props.showThumbnails}
          showBullets={this.state.showFullscreenButton && this.state.showGalleryFullscreenButton}
          showIndex={this.state.showFullscreenButton && this.state.showGalleryFullscreenButton}
          showPlayButton={false}
          showFullscreenButton={this.state.showFullscreenButton && this.state.showGalleryFullscreenButton}/>
      </Well>
    );
  }
}
