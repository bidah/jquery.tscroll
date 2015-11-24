jquery.tscroll
==============

Overview
--------

Tscroll provides custom replacements for stock vertical scrollbars.
Improvements include flexible styling, consistent cross-platform
look, left-hand or right-hand placement, and better compatibility
with map interfaces because the pointer will not be captured by a
scroll area passing beneath it.

Tscroll is used in commercial SPAs and uses techniques featured in
the book [Single page web applications - JavaScript end-to-end][1]

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

We need to create an a div that contains another div. The
outer div defines the "window" on the content. The inner div is the
container for that content. The outer div should have these CSS
attributes:

-  `overflow : hidden`
-  `padding : 0 1em 0 0` where the 1em right padding accomodates the
    scrollbar width. Switch this to `padding : 0 0 0 1em` if we elect
    to place the scroll bar on the left. **There should be no other
    padding or it will hose our scrollbars**
-  `position : absolute` or `position : relative`
-  A defined size by some combination of `width`, `height` and the
    `top-left-right-bottom` properties

The inner div should have these CSS attributes:

-  **Do not constrain the height.** This container needs to "grow" to
   accommodate its content
-  **Do not forget to clear floats** if we are floating elements
   within this div. Otherwise, this div will have 0
   height, and the plugin will not work correctly
-  **Do add padding** around our content to this div.

We may have multiple `tscroll` areas active at once in a window that are
individually activated. We should have also have a `window.resize`
handler so the scrollbar can be recalculated whenever the window is
resized for any reason. The example HTML illustrates all these concepts.

Error handling
--------------

Like many jQuery plugins, this code does not throw exceptions. Instead,
it does its work quietly.

Avoid complex 'SPA framework' libraries 
---------------------------------------

jQuery used with this and a few other well-chosen tools forms
a fantastic basis for a lean, easy to use SPA architecture
as detailed in [Single page web applications, JavaScript end-to-end][1].
Here are the recommended tools:

| Capability   | Tool                | Notes                             |
| ------------ | ------------------- | ----------------------------------|
| Websockets   | [Socket.io][6]      | Prefer websockets over AJAX.      |
| AJAX         | jQuery native       | Use jQuery AJAX methods.          |
| Promises     | jQuery native       | Use jQuery promise methods.       |
| Model Events | [Global Events][2]  | jQuery plugin eliminates having   |
|              |                     | to manage multiple event types.   |
| Touch        | [Unified events][3] | Unify desktop and touch events.   |
| Routing      | [uriAnchor][4]      | jQuery plugin for robust routing. |
|              |                     | Includes support for dependent    |
|              |                     | and independent query arguments.  |
| Data Model   | [taffyDB][5]        | A powerful and flexible SQL-like  |
|              |                     | client data management tool.      |
| SVG          | [D3][7]             | Great for easy graphs and charts  |
|              | [SVG][8]            | Low-level jQuery plugin           |
| Templates    | [Dust][9]           | Uses a powerful template DSL that |
|              |                     | minimizes chances to intemingle   |
|              |                     | business and display logic.       |

This suite of tools has all the capabilities of a bleeding-edge 
SPA "framework" library within the reliable and mature jQuery ecosystem.
It can provide an application that is significantly more flexible and
testable since display logic can easily be decoupled from business logic.
Finally, it leverages jQuery's maturity, performance, and excellent
tools instead of competing with them.

Release Notes
-------------

### Copyright (c)

2013-2015 Michael S. Mikowski (mike[dot]mikowski[at]gmail[dotcom])

### License

Dual licensed under the MIT or GPL Version 2 http://jquery.org/license

### Version 0.9.0

First public release through npm

### Version 0.9.1

Updated description

### Version 0.9.2

Updated documentation

### Version 0.9.3

Added dependencies

### Version 0.9.4

Added keywords

See also
--------

You don't have to do this you know. Native scroll bars work fine in many
instances.

TODO
----

- Enable common styling options

Contribute!
-----------

If you want to help out, like all jQuery plugins this is hosted at
GitHub. Any improvements or suggestions are welcome! You can reach me at
mike[dot]mikowski[at]gmail[dotcom].

Cheers, Mike

END
---

[1]:http://manning.com/mikowski
[2]:https://github.com/mmikowski/jquery.event.gevent
[3]:https://github.com/mmikowski/jquery.event.ue
[4]:https://github.com/mmikowski/urianchor
[5]:https://github.com/typicaljoe/taffydb
[6]:http://socket.io
[7]:https://github.com/mbostock/d3
[8]:http://keith-wood.name/svg.html
[9]:http://linkedin.github.io/dustjs

