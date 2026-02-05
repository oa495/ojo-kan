
[] - Get the folk tale text and translation
[x] - creative module names
[] - words without an easy translation? how to handle
[] - FINAL STATE:  **[NEXT UP]**
    - rearrange + animate words after whole module because they won't always make sense translated directly to english
    [x] flip background to black
[x] - Break it up into "modules". Each word should have its translation and its module
[x] - make sure frequency works (it can't work when the timer is going)
[x] - store frequency also in localstorage
[x] - decide what the module should be and make it
[x] - Each module (and word) has the class
[x] - Only translate after module is "passed"
[x] - Set timer before they can do another module
[x] - Make timer configurable
[x] - module timer should reset on load
[x] - info page
[] - buy a domain
[] - scroll to top after module completed  **[NEXT UP]**
[] - replace scrollbar with down arrow? 

### Interactions

[x] - Flip words that have been translated on click
[x] - small circle becomes big when module is activated

### REFINEMENT
[] - add tests
[x] - test in chrome & safari
[] - accessibility pass  **[NEXT UP]**
[] - perf pass: minify, clean up css etc

### Bugs

[x] - reset modules needs reload
[x] - capitalization isn't preserved
[x] - don't require accents to "pass" 
[] - doesn't reset after input is right
[x] - not so much a bug but user has to click out of input to know if it's correct
[x] - recalculate .circle positioning on resize

## Visual

[x] - should be responsive/mobile
[x] - visual pattern for differentiating translated words, test out undeline, above line height, background color
[x] - finalize look of the site
[x] - "blobs" should only render in a certain area***

## Nice to Have

[] - recordings scattered around (to simulate gossip)
[] - have a reference for the words and translations
[] - make blobs draggable
[x] - surprise me frequency
[x] - transition route changes

## Testing flow

1. On first load all modules are ready and can be used *
2. Can click in and out of an active module *
3. When module is finished:
    - words are switched over *
    - all modules are disabled for the set duration of time. *
    - timer shows correct time *
    - timer persists on reload (test multiple reloads) as does the modules being disabled *
    - when timer is up the modules are re-enabled except for the finished module*
    - reset
        - returns everything to initial state: no timer, no modules completed, no words translated
    - changing frequency means everything is reset? ***
