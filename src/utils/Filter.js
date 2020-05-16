class Filter {
    constructor(location, date, args) {
        this.location = location;
        this.date = date;
    }
    update(element) {
        this[element.key] = element.value;
    }
}

export default Filter;