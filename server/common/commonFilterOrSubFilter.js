const SubFilter = require('../models/SubFilter');
const _ = require('lodash');

exports.sortingSubFilter = (filter)=>{
  return Promise.all(
    filter._idSubFilters.map(async element => {
      if (!_.isUndefined(element._idSubFilter)) {
        const subfilter = await SubFilter.findById(element._idSubFilter);
        if (subfilter) {
          return element._idSubFilter;
        }
      } else {
        const subfilter = await SubFilter.findOne({"name": {$regex: element.name}});

        if (subfilter) {
          return subfilter._id;
        }

        let newSubFilter = new SubFilter({
          name: element.name
        });

        newSubFilter = await newSubFilter.save();
        return newSubFilter._id;
      }
    })
  );
};
