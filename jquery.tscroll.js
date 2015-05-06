/*jslint           browser : true,   continue : true,
 devel   : true,    indent : 2,       maxerr  : 50,
 newcap  : true,     nomen : true,   plusplus : true,
 regexp  : true,      vars : false,    white  : true
 unparam : true,      todo : true
*/
/*global jQuery */

/*
 * jQuery tscroll - A trivial scroll function.  Replaces standard
 * vertical scrollbar with a custom one.  The primary benefit is this
 * does not get confused with touch devices and scrollwheels.
 *
 * Copyright (c) 2013/2015 Michael Mikowski - mike.mikowski(at)gmail(dot)com
 * Dual licensed under MIT and GPL.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Date   : 2013-01-28
 * Revised: 2015-05-07
 * @author Michael S. Mikowski
 * @version 0.9.0
 *
 * Use
 * $<outer_div>.tscroll( <inner_div> [, { pos_key : 'left' } ] )
 *
 * Example
 *   // Standard
 *   $<outer_div>.tscroll( '<inner_div>' );
 *
 *   // Left scroll bar
 *   $<outer_div>.tscroll( '<inner_div>', { pos_key : 'left' } );
 *
 *   // Refresh scrollbar height (useful after a window resize)
 *   $<outer_div>.tscroll();
 *
 *   '<inner_div>' may be a string selector or a jquery collection.
 *
 * Discussion
 *   The outer div should be sized and position to hold the inner div.
 *   In particular, it should have overflow hidden.  The inner div should not
 *   be constrained in height.  The inner div should also have
 *   padding-right set to some amount - say 24px - to accommodate the
 *   scrollbar if required.
 *
 *   We may have multiple tscroll areas active at once in a window.
 *   But we must initialize them one at a time since two selectors
 *   must be specified for each, and jQuery doesn't provide iteration over
 *   selector pairs as far as I know.
 *
 *   Mousewheel support is available if the jquery.mousewheel plugin is
 *   installed.
 *
 * TODO list
 *   * Add github repo; post on jQuery plugin site
 *   * Support scroll wheel if initiated when cursor is in scrollable area
 *   * Better styling
 *   * Fix pointer on scrolling (it defaults to text cursor;
 *     changing cursor:pointer on outer, content, and knob does not work
 *   * Sizing of the content only occurs on initialization.  If the
 *     content changes size there is no guarantee of good results.
 *     The solution is to reconsider height during onDragmove.
 *     This means storing content and outer height, and also
 *     moving the sizing routine from the initialize
 *     to an external routine so it can be reused.
 *
*/
(function ( $ ) {
  'use strict';
  var
    configMap = {
      scroll_ratio : 24,
      bar_html : String()
        + '<div class="jq-tscroll-box jq-tscroll-ns">'
          + '<div class="jq-tscroll-zip jq-tscroll-ns"></div>'
          + '<div class="jq-tscroll-knob jq-tscroll-ns"></div>'
        + '</div>',
      style_css : String()
        + '.jq-tscroll-ns, .jq-tscroll-box, .jq-tscroll-zip,'
          + 'jq-tscroll-knob {'
          + '-webkit-user-select:none; -khtml-user-select:none;'
          + '-moz-user-select:-moz-none; -o-user-select:none;'
          + '-ms-user-select:none; user-select:none;'
          + '-webkit-user-drag:none; -moz-user-drag:none;'
          + 'user-drag:none; -webkit-tap-highlight-color:transparent;'
          + '-webkit-touch-callout:none;'
        + '}'

        + '.jq-tscroll-box {'
          + 'position:absolute; top:0; bottom:0;'
          + 'width:10px; background:#d8d8d8; z-index: 1;'
        + '}'

        + '.jq-tscroll-zip {'
          + 'position:absolute; top:0; bottom:0; right:4px;'
          + 'width:2px; background:#aaa; z-index:2;'
        + '}'
        + '.jq-tscroll-knob {'
          + 'position:absolute; top:0; right:0; width:10px;'
          + 'background-color:#aaa;'
          + 'background-image:linear-gradient(to bottom,#ddd,#999);'
          + 'border:1px solid #888; border-radius: 2px;'
          + 'z-index:3; cursor:pointer;'
        + '}'
        + '.jq-tscroll-knob:hover, .jq-tscroll-knob.jq-tscroll-active {'
          + 'background-color:#999;'
          + 'background-image:linear-gradient(to bottom,#ccc,#888);'
          + 'border-color:#888; cursor:pointer;'
        + '}'
    },
    onDragstart, onDragmove, onDragend,
    onMousedown, onMousewheel, resizeScrollbar,
    initModule;

  onMousedown = function ( event ) {
    event.preventDefault();
  };

  onDragstart = function ( event ) {
    var
      data_map   = $( this ).data( 'tscroll' ),
      jquery_map = data_map.jquery_map;

    jquery_map.$content.addClass(    'jq-tscroll-ns'     );
    jquery_map.$scrollknob.addClass( 'jq-tscroll-active' );
    return false;
  };

  onDragmove = function ( event ) {
    var
      data_map   = $( this ).data( 'tscroll' ),
      jquery_map = data_map.jquery_map,
      state_map  = data_map.state_map,

      $outer   = jquery_map.$outer,

      top_px  = $outer.scrollTop()
        + ( event.px_delta_y / state_map.height_ratio),
      knob_top_px
      ;

    if ( top_px < 0 ) { top_px = 0; }
    else if ( top_px > state_map.max_scroll_px ) {
      top_px = state_map.max_scroll_px;
    }

    knob_top_px = top_px * state_map.height_ratio;
    jquery_map.$scrollbox.css({  top : top_px, bottom : -top_px });
    jquery_map.$scrollknob.css({ top : knob_top_px });
    $outer.scrollTop( top_px );

    state_map.knob_top_px = knob_top_px;
    return false;
  };

  onDragend = function ( event ) {
    var
      data_map   = $( this ).data( 'tscroll' ),
      jquery_map = data_map.jquery_map;

    jquery_map.$content.removeClass( 'jq-tscroll-ns' );
    jquery_map.$scrollknob.removeClass( 'jq-tscroll-active' );
    return false;
  };

  onMousewheel = function ( event, delta_num ) {
    var
      $scrollknob = $(this).find( '.jq-tscroll-knob' ),
      data_map    = $scrollknob.data( 'tscroll' ),
      jquery_map  = data_map.jquery_map,
      state_map   = data_map.state_map,

      $outer      = jquery_map.$outer,
      top_px      = $outer.scrollTop(),
      knob_top_px
      ;

    top_px -= Number( delta_num || 0 ) * configMap.scroll_ratio;
    if ( top_px < 0 ) { top_px = 0; }
    if ( top_px > state_map.max_scroll_px ) {
      top_px = state_map.max_scroll_px;
    }
    knob_top_px = top_px * state_map.height_ratio;

    $outer.scrollTop( top_px );
    jquery_map.$scrollbox.css({  top : top_px, bottom : -top_px });
    jquery_map.$scrollknob.css({ top : knob_top_px });
    return false;
  };

  resizeScrollbar = function ( data_map ) {
    var
      jquery_map  = data_map.jquery_map,
      state_map   = data_map.state_map,

      $outer      = jquery_map.$outer,
      $content    = jquery_map.$content,
      $scrollbox  = jquery_map.$scrollbox,
      $scrollknob = jquery_map.$scrollknob,
      top_px      = $outer.scrollTop(),

      outer_ht   = $outer.height(),
      content_ht = $content.height(),

      height_ratio  = outer_ht / content_ht,
      max_scroll_px = content_ht - outer_ht,

      knob_top_px;


    if ( height_ratio > 1 ) {
      $scrollbox.hide();
    }
    else {
      knob_top_px = top_px * height_ratio;
      jquery_map.$scrollknob.css({ top : knob_top_px });
      $scrollbox.css({ top : top_px, bottom: - top_px }).show();
      $scrollknob.height( Math.floor( height_ratio * outer_ht ) ).show();
    }

    state_map.height_ratio  = height_ratio;
    state_map.max_scroll_px = max_scroll_px;
  };

  initModule = function ( $outer, inner_data, option_map ) {
    var
      inner_type = typeof inner_data,
      $content   = inner_type === 'string'
        ? $( inner_data ) : inner_data,

      $styles, $scrollbox, $scrollknob, jquery_map, state_map, data_map;

    if ( $outer.length   !== 1 ) { return false;}
    if ( $content.length !== 1 ) { return false;}

    $styles = $( 'style#jq-tscroll' );
    if ( $styles.length < 1 ){
      $styles = $('<style id="jq-tscroll">').appendTo('head');
      $styles.text( configMap.style_css );
    }

    if ( $outer.hasClass( 'jq-tscroll' ) ) {
      $.removeData( $outer.find( '.jq-tscroll-knob'), 'tscroll' );
      $outer.find( '.jq-tscroll-box' ).remove();
    }

    $scrollbox  = $( configMap.bar_html );
    $scrollknob = $scrollbox.find( '.jq-tscroll-knob' );

    // set to left or right side as required
    if ( option_map && option_map.pos_key && option_map.pos_key === 'left' ) {
      $scrollbox.css( 'left', 0 );
    }
    else {
      $scrollbox.css( 'right', 0 );
    }

    $outer.append( $scrollbox );

    jquery_map = {
      $outer      : $outer,
      $content    : $content,
      $scrollbox  : $scrollbox,
      $scrollknob : $scrollknob
    };

    state_map = {
      height_ratio  : 0,
      max_scroll_px : 0
    };

    data_map = { jquery_map : jquery_map, state_map : state_map };

    resizeScrollbar( data_map );

    $scrollknob
      .bind( 'mousedown.tscroll',  onMousedown )
      .bind( 'udragstart.tscroll', onDragstart )
      .bind( 'udragmove.tscroll',  onDragmove  )
      .bind( 'udragend.tscroll',   onDragend   )
      .data( 'tscroll',            data_map    );

    $outer.bind( 'mousewheel', onMousewheel )
      .addClass( 'jq-tscroll' );

    // call this once to ensure the position of the scrollbar is correct
    // if there was scrolling already on this div
    onDragmove.call( $scrollknob, { px_delta_y : 0 });

    return true;
  };

  $.fn.tscroll = function ( arg_data ) {
    var $outer, inner_data, option_map, data_map;

    $outer = this;

    // if we have received no argument, refresh the
    // scrollbar size
    if ( ! arg_data ) {
      if ( $outer.hasClass( 'jq-tscroll' ) ) {
        data_map = $outer.find( '.jq-tscroll-knob' ).data( 'tscroll' );
        if ( data_map ) { resizeScrollbar( data_map ); }
      }
    }
    // if we have received a jquery object, for content,
    // do the right thing and initialize
    else if ( arg_data.jquery ) {
      inner_data = arguments[0];
      option_map = arguments[1] || {};

      initModule( $outer, inner_data, option_map );
    }
    return this;
  };

}( jQuery ));

