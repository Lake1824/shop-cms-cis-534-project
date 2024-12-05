class Hour {
    constructor({opening = 0, closing = 0, day_of_week = ""}) {
        this.opening = opening;
        this.closing = closing;
        this.day_of_week = day_of_week;
    }

    static fromJSON(json) {
        return new Hour({
            opening: json.opening,
            closing: json.closing,
            day_of_week: json.day_of_week,
        });
    }
}

export default Hour;
