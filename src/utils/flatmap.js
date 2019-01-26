if (!Array.prototype.flatMap) {
    // eslint-disable-next-line
    Array.prototype.flatMap = function(lambda) {
        return Array.prototype.concat.apply([], this.map(lambda));
    };
}