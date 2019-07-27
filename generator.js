function getPolyrhythm(ratios) {
  var result = [];
  for (var r of ratios) {
    var d = 1 / r;
    result.push(generateTimings(d, 1));
  }

  return result;
}

function generateTimings(d, time) {
  var timings = []
  var t = 0
  while (t < time) {
    timings.push(t)
    t += d
  }
  return timings
}

function mfrc(V) { //one measure fraction (192 = 1 quarter note in Tone.js)
  // return ((Tone.Transport.PPQ * 4) * V | 0) + 'i'
  return ((Tone.Transport._ppq * 4) * V | 0) + 'i'
}
