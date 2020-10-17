const {
    queue,
    queueManager,
    scope
} = require('../src/queue');

const assert = require('assert');


describe('Queue control', function() {

    describe('Undefined uri control', function() {

        it('The undefined mustn\'t added in queue', () => {
            queueManager(undefined);
            assert.notStrictEqual(queue.lenght, 1);
        });

    });


    describe('Scope control', function() {

        it('First entry must be a base url', () => {
            queueManager("http://php.testsparker.com");
            queueManager("http://example.com");

            assert.strictEqual(scope[0], "php.testsparker.com");
            assert.notStrictEqual(scope[0], "example.com");

        });

        it('Out of scope url mustn\'t added in queue', () => {
            queueManager("http://example.com");
            queueManager("http://asp.testsparker.com");
            queueManager("http://angular.testsparker.com");
            queueManager("http://php.testsparker.com/1");

            assert.strictEqual(queue[0], "http://php.testsparker.com");
            assert.strictEqual(queue[1], "http://php.testsparker.com/1");
        })


    });

    describe('Duplicate control', function() {

        it('uri mustn\'t added to queue', () => {
            queueManager("http://php.testsparker.com");
            queueManager("http://php.testsparker.com");
            queueManager("http://php.testsparker.com/1");
            queueManager("http://php.testsparker.com/2");
            queueManager("http://php.testsparker.com/3/4/5/6");

            assert.strictEqual(queue[1], "http://php.testsparker.com/1");
            assert.strictEqual(queue[3], "http://php.testsparker.com/3/4/5/6");
            assert.strictEqual(queue.length, 4);
        });

    });
});