module.exports = {
    prefix: 'section-steps-',

    sectionStepsLocator: function (sectionName) {
        return '#' + this.prefix + sectionName.toLowerCase();
    },

    sectionStepsListLocator: function(sectionName) {
        return this.sectionStepsLocator(sectionName) + ' .' + this.prefix + 'list';
    },

    sectionStepsTitleLocator: function (sectionName) {
        return this.sectionStepsLocator(sectionName) + ' .' + this.prefix + 'title';
    },

    sectionStepsAddLocator: function(sectionName) {
        return this.sectionStepsLocator(sectionName)
            + ' input#new-' + sectionName.toLowerCase() + '-step'
    }
}