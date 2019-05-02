$('#share-link').on('click', function(){
    $('#share-link-modal').modal('toggle');
    console.log('show link');
  });
  
  $('#share-facebook').on('click', function(){
    const link = $('#share-facebook').data('link')
    FB.ui({
      method: 'share',
      href: link,
    }, function(response){});
  })