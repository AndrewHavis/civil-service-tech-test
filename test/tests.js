'use strict';

QUnit.test('There must be at least one candidate', (assert) => {
    assert.ok(candidates.length >= 1);
});

QUnit.test('Each candidate must have an ID number, name, age, email address and work summary', (assert) => {
    candidates.map((candidate) => {
        assert.ok(typeof candidate.id === 'number');
        assert.ok(typeof candidate.name === 'string');
        assert.ok(typeof candidate.age === 'number');
        assert.ok(typeof candidate.email === 'string');
        assert.ok(typeof candidate.summary === 'string');
    });
});

QUnit.test('The email address for each candidate must be in a valid format', (assert) => {
   candidates.map((candidate) => {
       // Use a regular expression to check the validity of each email address (RFC 5322)
       let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
       assert.ok(regex.test(candidate.email));
   });
});
