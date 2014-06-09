/**
 * Sortify v1.0 - Simple table sort plugin for html tables
 * http://www.lucasbyerley.com/sortify
 *
 * Copyright 2014, Lucas Byerley - http://www.lucasbyerley.com
 * Written because all the other table sorters out there are too heavy
 * with too many features.
 *
 * Released under the MIT license - http://opensource.org/licenses/MIT
 */

;(function($){

	var defaults = {
		sortOrder: "desc",
		sortColumn: null
	}

	$.fn.sortify = function(options) {

		if(this.length == 0) return this;

		//support multiple tables
		if(this.length > 1){
			this.each(function(){
				$(this).sortify(options);
			});
			return this;
		}

		// set a reference to our table element
		var el = this;

		// create a namespace to be used throughout the plugin
		var table = {};

		/**
		* ===================================================================================
		* = PRIVATE FUNCTIONS
		* ===================================================================================
		*/

		//save the settings to the table object
		var init = function(){
			table.settings = $.extend({}, defaults, options);
			table.sortOrder = table.settings.sortOrder;
			table.sortColumnOnLoad = table.settings.sortColumnOnLoad;
			table.inverse = table.sortOrder=="desc" ? true : false;
			table.columnHeads = el.find('th.sortable');
			table.allCells = el.find('td');
			table.cellsToSort = [];
			table.sortedRows = [];
			setup();
		}

		//setup the sorting process
		var setup = function(){
			el.wrap('<div class="sortify-wrapper"></div>');

			//if there is a default column head to sort on, do it now.
			if(table.sortColumnOnLoad !== null){
				table.columnHeads.each(function(){
					if($(this).text() == table.sortColumnOnLoad){
						startSortingProcess($(this));	
					}
				});
			}
			appendClickHandlers();
		}

		//add click handlers to the table heads
		var appendClickHandlers = function(){
			table.columnHeads.on('click', function(event){
				startSortingProcess($(this));
			});
		}

		var startSortingProcess = function(columnHead){
			table.allCells.removeClass('sortcell');
			//find all td cells that are the same index as the clicked column head
			table.allCells.filter(function(){
				return $(this).index() === columnHead.index();
			}).each(function(){
				table.cellsToSort.push($(this));
			});

			//check type of cell data and sort accordingly
			if(isNaN(parseFloat(table.cellsToSort[0].text()))){
				table.cellsToSort = table.cellsToSort.sort(stringSort)
			}else{
				table.cellsToSort = table.cellsToSort.sort(numberSort)
			}

			//grab the parent rows of the sorted table cells
			$.each(table.cellsToSort, function(){
				$(this).addClass('sortcell');
				table.sortedRows.push($(this).parent());
			});
			updateTheDOMandReset();
		}

		var updateTheDOMandReset = function(){
			//updating the table in the dom
			el.find('tbody').html(table.sortedRows);
			el.find('tbody tr').removeClass('evenrow');
			el.find('tbody tr:odd').addClass('evenrow');

			//reset the necessary variables
			table.cellsToSort = [];
			table.sortedRows = [];
			table.inverse = !table.inverse;
		}

		//sorts number data types
		var numberSort = function(a,b){
			var valueA = parseFloat($.text([a])),
    			valueB = parseFloat($.text([b]));
    		if(valueA == valueB)
				return 0;

			return valueA > valueB ?
				table.inverse ? -1 : 1
				: table.inverse ? 1 : -1;
		}

		//sorts string data types
		var stringSort = function(a,b){
			var valueA = a.text().toUpperCase(),
				valueB = b.text().toUpperCase();
			if(valueA == valueB)
				return 0;

			return valueA > valueB ?
				table.inverse ? -1 : 1
				: table.inverse ? 1 : -1;
		}

		/**
		* ===================================================================================
		* = PUBLIC FUNCTIONS
		* if there are any, they will go under here and look like so
		* ===================================================================================
		*/
		el.sortifyPublic = function(message){
			console.log(message);
		}

		//initiate the sorting plugin
		init();

	};

})(jQuery);
