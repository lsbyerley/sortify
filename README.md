sortify
=======

Simple table sorting script without all the heavy features

Setup:

1. Your table must contain the <thead> and <tbody> tags.
2. The <thead> must contain <th> tags.
3. To add sorting to a column, add the class="sortable" to the <th> tag

<table class="sort-table">
<thead>
  <th class="sortable">Column One</th>
  <th class="sortable">Column Two</th>
  <th class="sortable">Column Three</th>
</thead>
<tbody>
  <tr>
    <td>1</td>
    <td>2</td>
    <td>3</td>
  <tr>
  <tr>
    <td>aa</td>
    <td>bb</td>
    <td>cc</td>
  <tr>
  <tr>
    <td>89.1</td>
    <td>68.2</td>
    <td>54.8</td>
  <tr>
<tbody>
</table>

Initiation:

1. To hook the sortify plugin to the table above, use the following code:

<script type="text/javascript">
(function($){
	$('table.sort-table').sortify();
})(jQuery);
</script>

Customize:

1. sortOrder
    default: "desc"
    Other Option: "asc"

2. sortColumnOnLoad
    default: null
    Other Option: The name of the column you want to sort on when the page loads. To sort on Column 1 when the page         loads, use sortColumnOnLoad:"Column 1" 

