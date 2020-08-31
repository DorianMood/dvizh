import { getDistance, earthRadius } from "geolib";

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
    console.log("filtering ", location, this.location);
    // Filter fetched events
    const filteredEvents = eventArray.filter(event => {
      if (this.location && this.location !== null) {
        const distanceFromMe = getDistance(
          { latitude: event.location.lat, longitude: event.location.lng },
          { latitude: location[0], longitude: location[1] }
        );
        return (distanceFromMe <= this.location);
      }
      return true;
    });
    return filteredEvents;
  }
}

export default Filter;