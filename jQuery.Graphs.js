// jQuery.Graphs.js

$(document).ready(function($) {
	$('[data-graph]').each(function(index){
		var target = $(this);
		var dataUrl = target.attr('data-graph');
		CreateGraph(target, dataUrl);
	});
});

function CreateGraph(target, dataUrl){
	var options = {
		chart: { 
			renderTo : $(target)[0]
		},
		credits: {
				enabled : false
		},
		title: {
			text: null
		},
		xAxis: {
			categories: []
		},
		yAxis: {
			title: {
				text: null
			}
		},
		series: []
	};

	$.ajax({ 
		url: dataUrl,
		cache: false,
		success: function(xml) {
			var $xml = $(xml);

			options.title.text = $xml.find('title').text();
			options.yAxis.title.text = $xml.find('yAxis text').text();
			options.chart.type = $xml.find('type').text();

			// push categories
			var categories = $xml.find('categories').text();
			$.each(categories.split(","), function(i, category) {
				options.xAxis.categories.push(category);
			});
			
			// push series
			$xml.find('series').each(function(i, series) {
				var seriesOptions = {
					name: $(series).find('name').text(),
					data: []
				};
				
				// push data points
				var data = $(series).find('data').text();
				$.each(data.split(","), function(i, point) {
					seriesOptions.data.push(
						parseInt(point)
					);
				});
				
				// add it to the options
				options.series.push(seriesOptions);
			});
			var chart = new Highcharts.Chart(options);
		}
	});
}
