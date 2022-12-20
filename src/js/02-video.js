import Player from '@vimeo/player'
import _ from 'lodash'


const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const onPlay = function (evt) {
    localStorage.setItem("videoplayer-current-time", evt.seconds);
};

player.on('timeupdate', _.throttle(onPlay, 1000));

const duration = localStorage.getItem("videoplayer-current-time")

player.setCurrentTime(duration);
