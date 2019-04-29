import React, { Component } from "react";

class OSMap extends Component {
  componentDidMount() {
    const OpenSpace = window.OpenSpace;
    const options = {
      resolutions: [2500, 1000, 500, 200, 100, 50, 25, 10, 5, 4, 2.5, 2, 1]
    };
    const osMap = new OpenSpace.Map(this.refs.map, options);
    const bounds = new OpenSpace.MapBounds();

    // get map centre
    let eastingCentre = 0;
    let northingCentre = 0;
    for (const item of this.props.mountains) {
      eastingCentre += item.easting;
      northingCentre += item.northing;
    }
    eastingCentre = eastingCentre / this.props.mountains.length;
    northingCentre = northingCentre / this.props.mountains.length;

    osMap.setCenter(new OpenSpace.MapPoint(eastingCentre, northingCentre), 3);
    //osMap.setCenter(new OpenSpace.MapPoint(420000, 400000), 3); //langsett

    //add map markers and map bounds
    for (const item of this.props.mountains) {
      const point = new OpenSpace.MapPoint(item.easting, item.northing);
      bounds.extend(point);
      const popupText = item.name + " " + item.metres + "m - " + item.gridRef;
      osMap.createMarker(point, null, popupText);
    }

    osMap.getZoomForExtent(bounds, true);
  }
  render() {
    return (
      <div
        style={{
          border: "1px solid #ccc",
          width: "750px",
          height: "750px"
        }}
        ref="map"
      />
    );
  }
}

export default OSMap;
