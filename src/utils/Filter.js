import { getDistance } from "geolib";

class Filter {
  constructor(location, date, args) {
    this.location = location;
    this.date = date;

    this.update = this.update;
    this.filter = this.filter;
  }
  update(element) {
    this[element.key] = element.value;
  }
  filter (eventArray, location) {
    // Filter fetched events
    console.log("FILTERING", eventArray, location);
    const filteredEvents = eventArray.filter(event => {
      if (this.location) {
        const distanceFromMe = getDistance(
          { latitude: event.location.lat, longitude: event.location.lng },
          { latitude: location[0], longitude: location[1] }
        );
        if (distanceFromMe <= this.location)
          return true;
      }
      return false;
    });
    return filteredEvents;
  }
}

export default Filter;