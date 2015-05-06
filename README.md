# jquery.tscroll #

## Summary ##

Use this jQuery plugin to replace a standard vertical scrollbar
with a custom one.  The primary benefit is this does not get confused 
with touch devices and scrollwheels.

Other benefits include: 1. Flexible styling; 2. Place scrollbar on left or
right side, and 3. Custom scrollbars will not "capture" the pointer as it
passes over it.  This can be a real buzz-kill when you need a scrollable
input field in a google-map-esque environment.

This has is used in commercial SPAs and uses techniques featured in the book [Single page web applications - JavaScript end-to-end](http://manning.com/mikowski).

Please see the `tscroll-test.html` file for a demonstration.

**Compatible with jQuery 1.7.0+.**

## Replace Backbone with something much more robust ##

The plugin, used with a few other well-chosen tools, form a fantastic basis for a lean, easy to use SPA architecture as detailed in the [the book](http://manning.com/mikowski)(http://manning.com/mikowski). Here are the recommended tools:

- AJAX: Use **native jQuery** AJAX methods.
- Promises: Use **native jQuery** promise methods.
- Model Events: Use the **jQuery plugin** [jquery.event.gevent](https://www.npmjs.com/package/jquery.event.gevent) as a unified event mechanism.  This eliminates having to manage multiple event types in your SPA.
- Routing: Use the **jQuery plugin** [jquery.urianchor](https://www.npmjs.com/package/jquery.urianchor) for much more robust routing, including support to independent and dependent parameters.
- Touch interface: Use the **jQuery plugin** [jquery.event.ue](https://www.npmjs.com/package/jquery.event.ue) to handle touch and mouse events.
- Data Model: Use the **focused library** [taffyDB](https://github.com/typicaljoe/taffydb/) for superior and more flexible client side data management.
- Templating: Use **focused library** [Dust](http://linkedin.github.io/dustjs/) for much more useful templates that don't tempt you to intermingle display methods with application logic.

This suite of tools has all the capabilities of modern framework libraries but, when used correctly, can vastly improve flexibility and testability. It takes advantage jQuery's excellent built-in tools instead of competing with them.

## Browser Support ##

This plugin is useful for all modern browsers (IE9+ and later version of Chrome, Safari, and Firefox).
IE9 may require edge settings:

    <html>
    <head>
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      ....

## Release Notes ##

### Copyright (c)###
2013 Michael S. Mikowski (mike[dot]mikowski[at]gmail[dotcom])

### License ###
Dual licensed under the MIT or GPL Version 2
http://jquery.org/license

### Version 0.9.0 ###
First public release through npm

## Use ##
    $<outer_div>.tscroll( <inner_div> [, { pos_key : 'left' } ] )

## Examples ##

    // Standard
    $<outer_div>.tscroll( '<inner_div>' );
    
    // Left scroll bar
    $<outer_div>.tscroll( '<inner_div>', { pos_key : 'left' } );
    
    // Refresh scrollbar height (useful after a window resize)
    $<outer_div>.tscroll();
    
    '<inner_div>' may be a string selector or a jquery collection.

## Description ##
The outer div should be sized and position to hold the inner div.
In particular, it should have overflow hidden.  The inner div should not
be constrained in height.  The inner div should also have
padding-right set to some amount - say 24px - to accommodate the
scrollbar if required.

We may have multiple tscroll areas active at once in a window.
But we must initialize them one at a time since two selectors
must be specified for each, and jQuery doesn't provide iteration over
selector pairs as far as I know.

Mousewheel support is available if the jquery.mousewheel plugin is
installed.

## Error handling ##
Like many jQuery plugins, this code does not throw exceptions.
Instead, it does its work quietly.

## See also ##

## TODO ##

- Support a wider range of motions

## Contribute! ##

If you want to help out, like all jQuery plugins this is hosted at
GitHub.  Any improvements or suggestions are welcome!
You can reach me at mike[dot]mikowski[at]gmail[dotcom].

Cheers, Mike

END
