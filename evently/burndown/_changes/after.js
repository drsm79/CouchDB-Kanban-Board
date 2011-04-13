function(data, widget){
    $.log(widget);
    $.log(widget);
    var values_to_sort = {};
    for (i in data.rows){
        values_to_sort[data.rows[i].key] = data.rows[i].value;
    };

    ordered_states = [
    			"New",
    			"Devel_Ready",
    			"Development",
    			"Test_Ready",
    			"Test",
    			"Deploy_Ready",
    			"Deployment",
    			"Rel_Ready",
    			"Release"
    		];
    var sorted_values = [];
    for (i in ordered_states){
      sorted_values.push(values_to_sort[ordered_states[i]]);
    }
    panel_params = {};
    panel_params.width = 500;
    panel_params.height = 400;
    panel_params.left = 100;
    bar(sorted_values, panel_params, ordered_states, undefined, 'burndown');
}