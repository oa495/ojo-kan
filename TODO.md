
[] - Get the folk tale text and translation
[x] - Break it up into "modules". Each word should have its translation and its module
[] - creative module names
[] - words without an easy translation? how to handle
[] - make sure frequency works (it can't work when the timer is going)
[] - store frequency also in localstorage
[x] - decide what the module should be and make it
[x] - Each module (and word) has the class
[x] - Only translate after module is "passed"
[x] - Set timer before they can do another module
[x] - Make timer configurable
[x] - module timer should reset on load
[x] - info page
[] - buy a domain

### Interactions

[] - Flip words that have been translated on click
[] - if multiple meanings you can switch between them by clicking
[] - hover to highlight words corresponding to each module
[x] - small circle becomes big when module is activated
[] - add confirmation when frequency is clicked

## Visual

[] - visual pattern for differentiating translated words, test out undeline, above line height, background color
[x] - finalize look of the site
[x] - "blobs" should only render in a certain area***
[] - should be responsive

## Nice to Have
[] - rearrange words after whole module is finished? because they won't always make sense translated directly to english
[] - recordings scattered around (to simulate gossip)
[] - have a reference for the words and translations
[] - make blobs draggable


## Testing flow

1. On first load all modules are ready and can be used
2. Can click in and out of an active module
3. When module is finished:
    - words are switched over
    - all modules are disabled for the set duration of time.
    - timer shows correct time
    - timer persists on reload (test multiple reloads) as does the modules being disabled
    - when timer is up the modules are re-enabled
    - reset
        - returns everything to initial state: no timer, no modules completed, no words translated
    - changing frequency means everything is reset? ***


### Jan 20, meeting with thehtml.review

- Talk about what's left ^
 =