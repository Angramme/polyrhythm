

function getPolyrthythm(a, b, time){
  var dA = time / a;
  var dB = time / b;
  
  return {
    a: generateTimings(dA, time),
    b: generateTimings(dB, time)
  }
}

function generateTimings(d, time){
  var timings = []
  var t = 0
  while(t < time){
    timings.push(t)
    t += d
  }
}
