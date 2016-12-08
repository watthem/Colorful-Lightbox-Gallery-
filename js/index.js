var progressBar, $navigation, $doc, $checkboxes, $links, $progress, $imageLayout;

function ProgressBar(element) {
  this.progressElement = $(element);
  this.progress = 0;

  this.getPercentProgress = function(element) {
    return element.getAttribute("data") * 20 // 20% of total width   
  }
  this.handleUserUpdate = function(element) {
    this.setProgress(this.getPercentProgress(element));
  }

  this.setProgress = function(value) {
    this.progress = value;
    this.updateUI();
  }
  this.updateUI = function() {
    this.progressElement.css({
      background: 'linear-gradient(to right, rgba(243, 255, 189, 0.25) ' + this.progress + '%, #e3e3e3 ' + this.progress + '%, #e3e3e3 ' + this.progress + '% '
    });
  }
}

function doSmoothScroll(element) {
  $doc.animate({
    scrollTop: $(element.hash).offset().top - $navigation.height()
  }, Math.round($doc.height()));
}

function handleCheckClick() {  
  progressBar.handleUserUpdate(this);
}

function handleHashClick(event) {
  progressBar.handleUserUpdate(this);
  doSmoothScroll(this);
}

function init() {
  progressBar = new ProgressBar(('.progress'));
  $navigation = $('nav');
  $doc = $('html,body');
  $checkboxes = $('input:checkbox');
  $links = $('.link-text');
  $imageLayout = $('.image-layout');
  setBindings();
}

function setBindings() {

  $links.on('click', handleHashClick);
  $checkboxes.on('click', handleCheckClick);

  $navigation.on('click', function(event) {
    $checkboxes.prop('checked', false);    
  });
}

$(document).ready(init);