$('#lookup').live('pagebeforeshow', function() {
  $('#open-oe2').remove();
  
  var b = $('<fieldset>')
      .attr('id', 'open-oe2')
      .addClass('ui-grid-b')
      .append($('<div>')
              .addClass('ui-block-a'))
      .append($('<div>')
              .addClass('ui-block-b')
              .append($('<a>')
                      .attr('data-role', 'button')
                      .attr('href', '#')
                      .attr('data-icon', 'forward')
                      .attr('data-theme', 'a')
                      .text('Open Haske')
                      .button()
                      .click(function(e) {
                        window.open('../${OE2_BASE_URL}/app/index.html');
                      })));
  
  b.insertAfter($('#lookup-result'));
});
