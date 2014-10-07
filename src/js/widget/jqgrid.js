/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */
define(['sos-data-access', 'locale-date', 'jqgrid', 'css!widget/jqgrid.css'], function(data_access, ld) {
    "use strict";

    var inputs = ["title", "service", "offering", "features", "properties", "time_start", "time_end"];
    var count = 0;

    return {
        inputs: inputs,

        init: function(config, el) {

            // Render template
            el.innerHTML = [
                '<div class="jqgrid widget">',
                    '<h3 class="title"></h3>',
                    '<table id="grid',++count,'"></table>',
                    '<div id="pager',count,'"></div>',
                '</div>'
            ].join('');
            el.querySelector(".title").innerHTML = config.title;

            // Setup SOS data access
            var data = data_access(config, redraw);
            data.read();

            function redraw(data) {
                // jqGrid table
                $("#grid"+count).first().jqGrid({
                    datatype: 'local',
                    height: 'auto',
                    width: '100%',
                    caption: 'Results',
                    data: data,
                    pager: '#pager'+count,
                    rowNum: 12,
                    sortname: 'time',
                    autowidth: true,
                    colNames: ['Time', 'Feature', 'Property', 'Value', 'Unit'],
                    colModel: [{
                        name: 'time',
                        index: 'time',
                        width: '160',
                        formatter: function(cellvalue, options, rowObject) {
                            var new_formatted_cellvalue = ld.display(cellvalue);
                            return new_formatted_cellvalue;
                        }
                    }, {
                        name: 'feature',
                        index: 'feature',
                        width: '150'
                    }, {
                        name: 'property',
                        index: 'property',
                        width: '150'
                    }, {
                        name: 'value',
                        index: 'value',
                        width: '80',
                        align: "right"
                    }, {
                        name: 'uom',
                        index: 'uom',
                        width: '60'
                    }]
                });

                $(window).bind('resize', setFullWidth);
                setFullWidth();
            }

            function setFullWidth() {
                $(".grid").setGridWidth($(window).width() - 2);
            }
        }
    };

});