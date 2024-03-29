import React from "react";
import css from "classnames";
import PropTypes from "prop-types";

import {
  getPlayerStateFromAction,
  getIconByPlayerStatus,
  getFormattedTime,
  removeFromEvent,
  getCurrentTime,
  attachToEvent,
  getProgress
} from "./utils";

import Player from "./utils/constants";

import styles from "./styles";
import { Paper, Grid, Typography, Slider, withStyles } from "@mui/material";
import { Loop, VolumeMute } from "@mui/icons-material";

class AudioPlayer extends React.PureComponent {
  static propTypes = {
    src: PropTypes.string.isRequired,
    width: PropTypes.string,
    height: PropTypes.string,
    rounded: PropTypes.bool,
    classes: PropTypes.object,
    classNames: PropTypes.shape({
      player: PropTypes.string,
      loopIcon: PropTypes.string,
      playIcon: PropTypes.string,
      muteIcon: PropTypes.string,
      slider: PropTypes.string,
      track: PropTypes.string,
      thumb: PropTypes.string,
      text: PropTypes.string
    })
  };

  static defaultProps = {
    rounded: false,
    classes: {},
    classNames: {},
    width: "425px",
    height: "45px"
  };

  state = {
    current: 0,
    progress: 0,
    duration: 0,
    loopStatus: Player.Status.UNLOOP,
    playStatus: Player.Status.PAUSE,
    muteStatus: Player.Status.UNMUTE
  };

  componentDidMount() {
    attachToEvent(this.player, Player.Events.CAN_PLAY, this.handleCanPlay);

    if (this.props.autoPlay) {
      this.triggerAction(Player.Status.PLAY);
    }
  }

  componentWillUnmount() {
    if (this.player) {
      removeFromEvent(
        this.player,
        Player.Events.TIME_UPDATE,
        this.handleTimeUpdate
      );
      removeFromEvent(this.player, Player.Events.CAN_PLAY, this.handleCanPlay);

      this.player = null;
    }
  }

  render() {
    const {
      rounded,
      width,
      height,
      src,
      classes,
      classNames: {
        player,
        loopIcon,
        playIcon,
        muteIcon,
        slider,
        track,
        thumb,
        text
      }
    } = this.props;
    const {
      loopStatus,
      playStatus,
      muteStatus,
      progress,
      current,
      duration
    } = this.state;

    const PlayStatusIcon = getIconByPlayerStatus(playStatus);

    const isLoopEnable = loopStatus === Player.Status.LOOP;
    const isMuteEnable = muteStatus === Player.Status.MUTE;

    return (
      <React.Fragment>
        <audio
          ref={node => (this.player = node)}
          controls="true"
          preload="true"
          hidden="true"
        >
          <source src={src} />
        </audio>
        <Paper
          className={css(classes["player-grid-container"], player)}
          square={!rounded}
          elevation={1}
          style={{
            width,
            height
          }}
        >
          <Grid sx={{alignItems:"center", justify:"center",}} spacing={0} container>
            <Grid className={classes["player-centered-grid-item"]} xs={1} item>
              <Loop
                className={css(classes["player-icon-disabled"], loopIcon, {
                  [classes["player-default-icon"]]: isLoopEnable
                })}
                onClick={() => this.triggerAction(Player.Status.LOOP)}
                focusable="true"
              />
            </Grid>
            <Grid className={classes["player-centered-grid-item"]} xs={1} item>
              <PlayStatusIcon
                className={css(
                  classes["player-default-icon"],
                  classes["player-main-icon"],
                  playIcon
                )}
                onClick={() => this.triggerAction(Player.Status.PLAY)}
                focusable="true"
              />
            </Grid>
            <Grid className={classes["player-centered-grid-item"]} xs={1} item>
              <VolumeMute
                className={css(classes["player-icon-disabled"], muteIcon, {
                  [classes["player-default-icon"]]: isMuteEnable
                })}
                onClick={() => this.triggerAction(Player.Status.MUTE)}
                focusable="true"
              />
            </Grid>
            <Grid className={classes["player-centered-grid-item"]} xs={9} item>
              <Grid sx={{justify:"center"}} spacing={0} direction="row" container>
                <Grid
                  className={classes["player-centered-grid-item"]}
                  xs={2}
                  item
                >
                  <Typography
                    className={css(classes["player-text-timer"], text)}
                    align="center"
                    gutterBottom
                    noWrap
                  >
                    {getFormattedTime(current)}
                  </Typography>
                </Grid>
                <Grid
                  className={classes["player-centered-grid-item"]}
                  xs={8}
                  item
                >
                  <Slider
                    onChange={(_, progress) =>
                      this.handleChange(progress, this.player)
                    }
                    classes={{
                      root: css(classes["player-slider-container"], slider),
                      track: css(classes["player-slider-track"], track),
                      thumb: css(classes["player-slider-thumb"], thumb)
                    }}
                    // variant="determinate"
                    color="secondary"
                    value={progress}
                  />
                </Grid>
                <Grid
                  className={classes["player-centered-grid-item"]}
                  xs={2}
                  item
                >
                  <Typography
                    className={css(classes["player-text-timer"], text)}
                    align="center"
                    gutterBottom
                    noWrap
                  >
                    {getFormattedTime(duration)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </React.Fragment>
    );
  }

  triggerAction = action => {
    const newState = getPlayerStateFromAction(this.player, action);

    if (newState) {
      this.setState(newState);
    }
  };

  handleCanPlay = player => {
    attachToEvent(player, Player.Events.TIME_UPDATE, this.handleTimeUpdate);

    this.setState({
      duration: player.duration
    });
  };

  handleTimeUpdate = player => {
    this.setState({
      current: player.currentTime,
      progress: getProgress(player.currentTime, player.duration)
    });
  };

  handleChange = (progress, player) => {
    if (player) {
      const currentTime = getCurrentTime(progress, player.duration);

      if (!isNaN(currentTime)) {
        player.currentTime = currentTime;
      }

      this.setState({
        progress,
        currentTime
      });
    }
  };
}

export default withStyles(styles, { withTheme: true })(AudioPlayer);
