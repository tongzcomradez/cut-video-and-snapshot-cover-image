var ffmpeg = require('fluent-ffmpeg');
var fs = require('fs')

const originalVideo = `${process.cwd()}/src/sample.mp4`
const originalFileName = originalVideo.split('/')
ffmpeg(originalVideo)
  .setStartTime('00:00:00')
  .duration(30) // 30 seconend from 00:00
  .videoCodec('libx264')
  .audioCodec('libmp3lame')
  .on('start', (cmd) => {
    console.log('Started: ' + cmd)
  })
  .on('error', function(err) {
    console.log('An error occurred: ' + err.message);
  })
  .on('end', function() {
    console.log('Processing finished !');
  })
  .save(`${process.cwd()}/src_modified/${originalFileName[originalFileName.length - 1]}`)

ffmpeg(originalVideo)
  .screenshot({
    timestamps: ['00:00:10'],
    filename: 'thumbnail-at-%s-seconds.png',
    folder: 'screenshots',
    size: '320x240'
  })
  .on('start', (cmd) => {
    console.log(cmd)
  })
  .on('end', () => {
    console.log('Screenshot Done!!')
  })
  .on('error', function(err) {
    console.log('An error occurred: ' + err.message);
  })