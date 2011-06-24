function(data) {
  // Need to do some extra work to handle composite keys [target, tag_name]
  // We may have the same tag under different targets (e.g. [0.1, foo] [0.2, foo]) so we want to combine these
  var rows = _.map(data.rows, function(row) { return {key: row.key[1], value: row.value}; });
  var keys = _.uniq(_.map(rows, function(row) { return row.key; }));
  var summed_rows = _.map(keys, 
    function(key) { 
      var rows_for_key = _.select(rows, function(row) { return row.key == key; });
      var reduced = {
        key: key,
        value: _.reduce(rows_for_key, function(memo, row) { return memo + row.value }, 0)
      }
      return reduced;
    }
  );
  // Copy so original order not disrupted by in-place sort
  var summed_rows_ordered = _.map(summed_rows, function(row) { return row });
  // Sort by value and slice
  var sliced_rows = summed_rows.sort(function(a, b) { return a.value - b.value }).reverse().slice(0, 30);
  // Get keys from sorted/sliced rows
  var keys = _.map(sliced_rows, function(row) { return row.key });
  // Now get the rows in the original order
  var filtered_rows = _.select(summed_rows_ordered, function(row) { return _.include(keys, row.key); });
  return {tags: filtered_rows};
}