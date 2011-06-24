function(data) {
  // Get a copy of the rows that we can sort in place (could just re-sort alphabetically to get original order but sorting = expensive)
  var rows = _.map(data.rows, function(row) { return row; });
  // Sort by value and slice
  var sliced_rows = rows.sort(function(a, b) { return a.value - b.value }).reverse().slice(0, 30);
  // Get keys from sorted/sliced rows
  var keys = _.map(sliced_rows, function(row) { return row.key });
  // Now get the rows in the original order
  var filtered_rows = _.select(data.rows, function(row) { return _.include(keys, row.key); });
  return {tags: filtered_rows};
}