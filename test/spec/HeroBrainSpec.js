/* eslint no-undef: 0 */
var chai = require('chai');

chai.should();

describe('Hero file', function () {
    var move;

    beforeEach(function () {
        move = require('../../hero.js');
    });

    it('exists and exports a move function', function () {
        move.should.be.a('function');
    });
});

describe('Helper file', function () {
    var helpers;

    beforeEach(function () {
        helpers = require('../../helpers.js');
    });

    it('exists and exports a helper object', function () {
        helpers.should.be.a('object');
    });
});