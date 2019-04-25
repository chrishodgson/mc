//convertGridRefToNorthingEasting
module.exports = ngr => {
  var e;
  var n;

  ngr = ngr.toUpperCase(ngr);

  //remove any spaces
  var bits = ngr.split(" ");
  ngr = "";
  for (var i = 0; i < bits.length; i++) ngr += bits[i];

  var c = ngr.charAt(0);
  if (c === "S") {
    e = 0;
    n = 0;
  } else if (c === "T") {
    e = 500000;
    n = 0;
  } else if (c === "N") {
    n = 500000;
    e = 0;
  } else if (c === "O") {
    n = 500000;
    e = 500000;
  } else if (c === "H") {
    n = 1000000;
    e = 0;
  } else return null;

  c = ngr.charAt(1);
  if (c === "I") return null;

  c = ngr.charCodeAt(1) - 65;
  if (c > 8) c -= 1;
  e += (c % 5) * 100000;
  n += (4 - Math.floor(c / 5)) * 100000;

  c = ngr.substr(2);
  if (c.length % 2 === 1) return null;
  if (c.length > 10) return null;

  try {
    var s = c.substr(0, c.length / 2);
    while (s.length < 5) s += "0";
    e += parseInt(s, 10);
    if (isNaN(e)) return null;

    s = c.substr(c.length / 2);
    while (s.length < 5) s += "0";
    n += parseInt(s, 10);
    if (isNaN(n)) return null;

    //return new OpenSpace.MapPoint(e, n);
    return [e, n];
  } catch (ex) {
    return null;
  }
};
