function pie(data, canvas, labels) {

  var w = 300,
      h = 300,
      r = w / 2,
      a = pv.Scale.linear(0, pv.sum(data)).range(0, 2 * Math.PI);
  var vis = new pv.Panel()
      .canvas(canvas || 'pie')
      .width(w)
      .height(w);

  vis.add(pv.Wedge)
      .data(data.sort(pv.reverseOrder))
      .bottom(w / 2)
      .left(w / 2)
      .innerRadius(r - 40)
      .outerRadius(r)
      .angle(a)
      .event("mouseover", function() {return this.innerRadius(0)})
      .event("mouseout", function() {return this.innerRadius(r - 40)})
      .anchor("center").add(pv.Label)
      .visible(function(d) {return d > .15})
      .textAngle(0)
      .text(function(d) {
        if (labels) {
          return labels[this.index];
        } else {
          return d.toFixed(2);
        }
      });

  vis.render();
};

function bar(data, params, labels, max, canvas) {
  /* Sizing and scales. */
  panel_params = params ||    {
                                        width: 500, height: 250,
                                        bottom: 20, top: 5,
                                        left: 50, right: 10
                                    };
  var w = panel_params.width || 500,
      h = panel_params.height || 250,
      b = panel_params.bottom || 20,
      l = panel_params.left || 50,
      t = panel_params.top || 5,
      r = panel_params.right || 10,
      x = pv.Scale.linear(0, max || Math.max.apply( Math, data )).range(0, w),
      y = pv.Scale.ordinal(pv.range(data.length)).splitBanded(0, h, 4/5);

  /* The root panel. */
  var vis = new pv.Panel()
      .canvas(canvas || 'bar')
      .width(w)
      .height(h)
      .bottom(b)
      .left(l)
      .right(r)
      .top(t);

  /* The bars. */
  var bar = vis.add(pv.Bar)
      .data(data)
      .top(function() {return y(this.index);})
      .height(y.range().band)
      .left(0)
      .width(x);

  /* The value label. */
  bar.anchor("right").add(pv.Label)
      .textStyle("white")
      .text(function(d) {return d.toFixed(1);});

  /* The variable label. */
  bar.anchor("left").add(pv.Label)
      .textMargin(5)
      .textAlign("right")
      .text(function() {return labels[this.index];});

  /* X-axis ticks. */
  vis.add(pv.Rule)
      .data(x.ticks(5))
      .left(x)
      .strokeStyle(function(d) {return d ? "rgba(255,255,255,.3)" : "#000";})
    .add(pv.Rule)
      .bottom(0)
      .height(5)
      .strokeStyle("#000")
    .anchor("bottom").add(pv.Label)
      .text(x.tickFormat);

  vis.render();
}

function area(data, canvas) {
  /* TODO: support input data of the following form:
  {series:[{data:[1,2,3,4], name:'foo'}, {data:[5,6,7,8], name:'bar'}]}
  this will mean scaling appropriately will be a bit tougher.
  */
	/* Sizing and scales. */
	var y_max = 10 * (Math.round(data[data.length - 1].y /10) + 2 );

	var w = 400,
	    h = 200,
	    x = pv.Scale.linear(data, function(d) {return d.x;}).range(0, w),
	    y = pv.Scale.linear(0, y_max).range(0, h);

	/* The root panel. */
	var vis = new pv.Panel()
    	.canvas(canvas || 'area')
	    .width(w)
	    .height(h)
	    .bottom(20)
	    .left(20)
	    .right(10)
	    .top(5);

	/* Y-axis and ticks. */
	vis.add(pv.Rule)
	    .data(y.ticks(5))
	    .bottom(y)
	    .strokeStyle(function(d) {return d ? "#eee" : "#000";})
	  .anchor("left").add(pv.Label)
	    .text(y.tickFormat);

	/* X-axis and ticks. */
	vis.add(pv.Rule)
	    .data(x.ticks())
	    .visible(function(d) {return d;})
	    .left(x)
	    .bottom(-5)
	    .height(5)
	  .anchor("bottom").add(pv.Label)
	    .text(x.tickFormat);

	/* The area with top line. */
	vis.add(pv.Area)
	    .data(data)
	    .bottom(1)
	    .left(function(d) {return x(d.x);})
	    .height(function(d) {return y(d.y);})
	    .fillStyle("rgb(121,173,210)")
	  .anchor("top").add(pv.Line)
	    .lineWidth(3);

	vis.render();
}