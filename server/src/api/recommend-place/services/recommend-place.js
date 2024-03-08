'use strict';

/**
 * recommend-place service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::recommend-place.recommend-place');
