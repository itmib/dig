/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Query = require('../api/query/query.model');


User.find({}).remove(function() {
  User.create({
    provider: 'local',
    role: 'user',
    name: 'Test User',
    username: 'test'
  }, function() {
      console.log('finished populating users');
    }
  );
});

Query.find({}).remove(function() {
  Query.create({
    name: 'Query #1',
    digState: {
      searchTerms: 'bob smith',
      filters: {"aggFilters":{"city_agg":{"LittleRock":true,"FortSmith":true}},"textFilters":{"phonenumber":{"live":"","submitted":""}},"dateFilters":{"dateCreated":{"beginDate":null,"endDate":null}}},
      selectedSort: {"title":"Best Match","order":"rank"},
      includeMissing: {'aggregations': {}, 'allIncludeMissing': false}
    },
    elasticUIState: {
      queryState:{"query_string":{"fields":["_all"],"query":"bob smith"}}},
      filterState:{"bool":{"should":[{"terms":{"hasFeatureCollection\\uff0eplace_postalAddress_feature\\uff0efeatureObject\\uff0eaddressLocality":["LittleRock"]}},{"terms":{"hasFeatureCollection\\uff0eplace_postalAddress_feature\\uff0efeatureObject\\uff0eaddressLocality":["FortSmith"]}}]}
    },
    username: 'test',
    frequency: 'never',
    createDate: new Date(),
    lastRunDate: new Date()
  }, {
    name: 'Query #2',
    digState: {
      searchTerms: 'jane doe',
      filters: {"textFilters":{"phonenumber":{"live":"","submitted":""}},"dateFilters":{"dateCreated":{"beginDate":"2013-02-02T05:00:00.000Z","endDate":"2015-02-03T05:00:00.000Z"}}},
      selectedSort: {"title":"Best Match","order":"rank"},
      includeMissing: {'aggregations': {}, 'allIncludeMissing': false}
    },
    elasticUIState: {
      queryState: {"query_string":{"query":"jane doe","fields":["_all"]}},
      filterState:{"bool":{"must":[{"range":{"dateCreated":{"from":"2013-02-02"}}},{"range":{"dateCreated":{"to":"2015-02-03"}}}]}}
    },
    username: 'test',
    frequency: 'never',
    createDate: new Date(),
    lastRunDate: new Date()
  }, {
    name: 'Query #3',
    digState: {
      searchTerms: 'another users query',
      filters: {"textFilters":{"phonenumber":{"live":"","submitted":""}},"dateFilters":{"dateCreated":{"beginDate":null,"endDate":null}}},
      selectedSort: {"title":"Best Match","order":"rank"},
      includeMissing: {'aggregations': {}, 'allIncludeMissing': false}
    },
    elasticUIState: {
      queryState: {"query_string":{"fields":["_all"],"query":"another users query"}}
    },
    username: 'test2',
    frequency: 'never',
    createDate: new Date(),
    lastRunDate: new Date()
  }, function() {
      console.log('finished populating queries');
    }
  );
});
