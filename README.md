jquery.tscroll
==============

Overview
--------

Use this jQuery plugin to replace a standard vertical scrollbar with a
custom one. The primary benefit is this does not get confused with touch
devices and scrollwheels.

Other benefits include:

1.  Flexible styling
2.  Place scrollbar on left or right side, which is useful to create
    seamless graphical layouts
3.  Custom scrollbars will not "capture" the pointer as it passes over
    it - this can be very handy when we need a scrollable input field
    inside a google-map-like environment.

Tscroll is used in commercial SPAs and uses techniques featured in
the book [Single page web applications - JavaScript
end-to-end](http://manning.com/mikowski).

Use
---

    $<outer_div>.tscroll( <inner_div> [, { pos_key : 'left' } ] )

Examples
--------

    // Standard
    $<outer_div>.tscroll( '<inner_div>' );

    // Left scroll bar
    $<outer_div>.tscroll( '<inner_div>', { pos_key : 'left' } );

    // Refresh scrollbar height (useful after a window resize)
    $<outer_div>.tscroll();

    '<inner_div>' may be a string selector or a jquery collection.

Please see the `tscroll-test.html` file for a demonstration of use.

Prerequisites
-------------

We must use jQuery 1.7.0+. We also require the following jQuery plugins
be installed and processed by the browser before this plugin is added or
used:

-   The unified event plugin (`jquery.event.ue`)
-   The mousewheel plugin (`jquery-mousewheel`)

**jquery.tscroll** works in any modern browser (IE9+ and later version
of Chrome, Safari, and Firefox). IE9 may require edge settings:

    <html>
    <head>
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      ....

Implementation
--------------

You will need to create an outer div that contains an inner div. The
outer div defines the "window" on the content. The inner div is the
container for that content. The outer div should have these CSS
attributes:

-   `overflow : hidden`
-   `padding : 0 1em 0 0` where the 1em right padding accomodates the
    scrollbar width. Switch this to `padding : 0 0 0 1em` if you elect
    to place the scroll bar on the left. **There should be no other
    padding or it will hose your scrollbars**
-   `position : absolute` or `position : relative`
-   A defined size by some combination of `width`, `height` and the
    `top-left-right-bottom` properties

The inner div should have these CSS attributes:

-   **Do not constrain the height.** This container needs to "grow" to
    accommodate its content
-   **Do not forget to clear floats** if you are floating elements
    within this div. Otherwise, this div will have the wrong or 0
    height, and the plugin will not work correctly
-   **Do add padding** around your content to this div.

We may have multiple `tscroll` areas active at once in a window that are
individually activated. We should have also have a `window.resize`
handler so the scrollbar can be recalculated whenever the window is
resized for any reason. The example HTML illustrates all these concepts.

Error handling
--------------

Like many jQuery plugins, this code does not throw exceptions. Instead,
it does its work quietly.

Avoid complex 'SPA framework' libraries {#replace-backbone}
---------------------------------------

This plugin is part of a set of lean, easy-to-use tools to implement the
SPA architecture detailed in the best-selling book, [Single Page Web
Applications - JavaScript end-to-end](http://manning.com/mikowski).
Other recommended tools include:

-   AJAX: Use **native jQuery** AJAX methods.
-   Promises: Use **native jQuery** promise methods.
-   Model Events: Use the **jQuery plugin**
    [jquery.event.gevent](https://www.npmjs.com/package/jquery.event.gevent)
    as a unified event mechanism. This eliminates having to manage
    multiple event types in your SPA.
-   Routing: Use the **jQuery plugin**
    [jquery.urianchor](https://www.npmjs.com/package/jquery.urianchor)
    for much more robust routing, including support to independent and
    dependent parameters.
-   Touch interface: Use the **jQuery plugin**
    [jquery.event.ue](https://www.npmjs.com/package/jquery.event.ue) to
    handle touch and mouse events.
-   Data Model: Use the **focused library**
    [taffyDB](https://github.com/typicaljoe/taffydb/) for superior and
    more flexible client side data management.
-   Templating: Use **focused library**
    [Dust](http://linkedin.github.io/dustjs/) for much more useful
    templates that don't tempt you to intermingle display methods with
    application logic.

This suite of tools has all the capabilities of modern framework
libraries but, when used correctly, can vastly improve flexibility and
testability. It takes advantage jQuery's excellent built-in tools
instead of competing with them.

Release Notes
-------------

### Copyright (c)

2013-2015 Michael S. Mikowski (mike[dot]mikowski[at]gmail[dotcom])

### License

Dual licensed under the MIT or GPL Version 2 http://jquery.org/license

### Version 0.9.0

First public release through npm

See also
--------

You don't have to do this you know. Native scroll bars work fine in many
instances.

TODO
----

-   Enable common styling options

Contribute!
-----------

If you want to help out, like all jQuery plugins this is hosted at
GitHub. Any improvements or suggestions are welcome! You can reach me at
mike[dot]mikowski[at]gmail[dotcom].

Cheers, Mike

END
---
