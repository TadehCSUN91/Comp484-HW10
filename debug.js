// HW10 - Chrome DevTools demos for the Giga Pet project.
// Everything here is intentional: it exists so there is something to see in the Console.

$(function() {

  // Runs once when the page loads so the messages are waiting in the Console
  runConsoleDemo();

  $('.demo-console-button').click(runConsoleDemo);
  $('.demo-404-button').click(trigger404);
  $('.demo-typeerror-button').click(triggerTypeError);
  $('.demo-violation-button').click(triggerViolation);
});

// ---------------------------------------------------------------
// Part 2.1 - Console message logging
// ---------------------------------------------------------------
function runConsoleDemo() {

  // Log Info: console.info() and console.log() both print a normal message
  console.info('INFO: Giga Pet page loaded. Pet name is ' + pet_info['name']);
  console.log('LOG: current pet_info object:', pet_info);

  // Log Warning: shown with a yellow background
  console.warn('WARNING: ' + pet_info['name'] + "'s energy is " + pet_info['energy'] + ". Consider a nap.");

  // Log Error: shown with a red background (this is only a message, it does not stop the script)
  console.error('ERROR: this is a demo error message, nothing is actually broken.');

  // Log Table: an array of objects prints as a sortable table
  console.table([
    {action: 'Treat',    happiness: '+5', weight: '+2', energy: '0'},
    {action: 'Play',     happiness: '+8', weight: '-2', energy: '-10'},
    {action: 'Exercise', happiness: '-5', weight: '-3', energy: '-15'},
    {action: 'Nap',      happiness: '+2', weight: '0',  energy: '+25'}
  ]);

  // Log Group: everything between group() and groupEnd() is indented and collapsible
  console.group('Pet stats');
  console.log('Name: ' + pet_info['name']);
  console.log('Weight: ' + pet_info['weight'] + ' pounds');
  console.log('Happiness: ' + pet_info['happiness']);
  console.log('Energy: ' + pet_info['energy'] + ' / 100');
  console.groupEnd();

  // Log Custom: %c applies the CSS in the next argument to the text before it
  console.log(
    '%cGiga Pet %cHW10 DevTools',
    'background: #1e2835; color: #ffffff; font-size: 16px; padding: 4px 8px; border-radius: 4px;',
    'color: #e5484d; font-size: 16px; font-weight: bold;'
  );
}

// ---------------------------------------------------------------
// Part 2.2 - Messages the BROWSER logs
// ---------------------------------------------------------------

// 404 Network Error: ask the server for a file that does not exist.
// The Console shows "Failed to load resource: the server responded with a status of 404".
// (Run this from a web server or GitHub Pages. Opening index.html straight from your
// computer gives a different error, not a 404.)
function trigger404() {
  fetch('data/pet-stats.json')
    .then(function(response) {
      console.log('Response status:', response.status); // 404
    });
  // A missing image does the same thing:
  $('.pet-image-container').append('<img src="images/missing-pet.png" alt="" width="1" height="1">');
}

// TypeError: petNickname was never given a value, so it is undefined.
// Calling .toUpperCase() on undefined throws
// "Uncaught TypeError: Cannot read properties of undefined (reading 'toUpperCase')".
function triggerTypeError() {
  var petNickname;
  console.log(petNickname.toUpperCase());
}

// Violation: a click handler that blocks the page for about 300ms.
// Chrome reports "[Violation] 'click' handler took 3xx ms" because handlers should
// finish in well under 50ms. (Turn on the "Verbose" log level to see violations.)
function triggerViolation() {
  var start = Date.now();
  while (Date.now() - start < 300) {
    // busy loop on purpose: nothing else can run until it ends
  }
  console.log('Finished the slow handler.');
}
