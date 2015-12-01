/*!
 * Copyright 2002 - 2015 Webdetails, a Pentaho company. All rights reserved.
 *
 * This software was developed by Webdetails and is provided under the terms
 * of the Mozilla Public License, Version 2.0, or any later version. You may not use
 * this file except in compliance with the license. If you need a copy of the license,
 * please go to http://mozilla.org/MPL/2.0/. The Initial Developer is Webdetails.
 *
 * Software distributed under the Mozilla Public License is distributed on an "AS IS"
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. Please refer to
 * the license for the specific language governing your rights and limitations.
 */

define([
  'cdf/lib/jquery',
  'amd!cdf/lib/underscore'
], function ($, _) {

  return {
    getConfiguration: getConfiguration
  };

  /**
   * Validates the configuration options and gathers them by context
   * @returns {{addIns: {MarkerImage: *, ShapeResolver: *, LocationResolver: *}}}
   */
  function getConfiguration() {
    var addIns = {
      MarkerImage: {
        name: this.markerCggGraph ? 'cggMarker' : this.markerImageGetter,
        options: {
          cggScript: this.markerCggGraph,
          parameters: this.cggGraphParameters,
          height: this.markerHeight,
          width: this.markerWidth,
          iconUrl: this.marker
        }
      },
      ShapeResolver: {
        name: this.shapeResolver,
        options: {
          url: this.shapeSource,
          parseShapeKey: this.parseShapeKey
        }
      },
      LocationResolver: {
        name: this.locationResolver || 'openstreetmap',
        options: {}
      },
      MapEngine: {
        name: this.mapEngineType,
        options: {
          rawOptions: {
            map: {}
          },
          tileServices: this.tileServices,
          tileServicesOptions: this.tileServicesOptions,
          tilesets: (_.isString(this.tilesets)) ? [this.tilesets] : this.tilesets,
          API_KEY: this.API_KEY || window.API_KEY
        }
      }
    };

    //
    var controls = {
      enableKeyboardNavigation: true,
      enableZoomOnMouseWheel: false
    };

    var viewport = {
      center: {
        latitude: parseFloat(this.centerLatitude),
        longitude: parseFloat(this.centerLongitude)
      },
      zoomLevel: {
        min: 0,
        max: Infinity,
        "default": this.defaultZoomLevel
      }

    };

    return $.extend(true, {}, {
      isSelector: !_.isEmpty(this.parameter),
      addIns: addIns,
      controls: controls,
      styleMap: this.styleMap,
      viewport: viewport
    }, _.result(this, 'options'));
  }

});