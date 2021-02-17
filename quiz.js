const quizzes = [
  {
    input: "['a', 'b', 'c', 'd']",
    output: "[['a', 'b'], ['c', 'd']]",
    answer: "_.chunk(['a', 'b', 'c', 'd'], 2);",
  },
  {
    input: "[0, 1, false, 2, '', 3]",
    output: '[1, 2, 3]',
    answer: "_.compact([0, 1, false, 2, '', 3]);",
  },
  {
    input: '[1], 2, [3], [[4]]',
    output: '[1, 2, 3, [4]]',
    answer: '_.concat(array, 2, [3], [[4]]);',
  },
  {
    input: '[2, 1], [2, 3]',
    output: '[1]',
    answer: '_.difference([2, 1], [2, 3]);',
  },
  {
    input: '[1, 2, 3]',
    output: '[2, 3]',
    answer: '_.drop([1, 2, 3]);',
  },
  {
    input: "[1, 2, 3], 'a'",
    output: "['a', 'a', 'a']",
    answer: "_.fill(array, 'a');",
  },
  {
    input: '[1, 2, 3]',
    output: '1',
    answer: '_.head([1, 2, 3]);',
  },
  {
    input: '[2, 1], [2, 3]',
    output: '[2]',
    answer: '_.intersection([2, 1], [2, 3])',
  },
  {
    input: '[1, 2, 3]',
    output: '3',
    answer: '_.last([1, 2, 3]);',
  },
  {
    input: "['a', 'b', 'c', 'a', 'b', 'c'], 'a', 'c'",
    output: "['b', 'b']",
    answer: "_.pull(array, 'a', 'c');",
  },
  {
    input: "['a', 'b'], [1, 2], [true, false])",
    output: "[['a', 1, true], ['b', 2, false]]",
    answer: "_.zip(['a', 'b'], [1, 2], [true, false])",
  },
  {
    input: '[6.1, 4.2, 6.3], Math.floor',
    output: "{ '4': [4.2], '6': [6.1, 6.3] }",
    answer: '_.groupBy([6.1, 4.2, 6.3], Math.floor);',
  },
  {
    input:
      "[{ uid: 1, name: 'hi'}, { uid: 2, name: 'hello'}, { uid: 3, name: 'bye'}], 'uid'",
    output:
      "{'1':{'uid':1,'name':'hi'},'2':{'uid':2,'name':'hello'},'3':{'uid':3,'name':'bye'}}",
    answer:
      "_.keyBy([{ uid: 1, name: 'hi'}, { uid: 2, name: 'hello'}, { uid: 3, name: 'bye'}], 'uid')",
  },
  {
    input: `[\n  { 'user': 'barney',  'age': 36, 'active': false },\n  { 'user': 'fred',    'age': 40, 'active': true },\n  { 'user': 'pebbles', 'age': 1,  'active': false }\n],\n o => o.active`,
    output: "[['fred'], ['barney', 'pebbles']]",
    answer: '_.partition(users, o => o.active);',
  },
  {
    input: '-10, -5, 5',
    output: '-5',
    answer: '_.clamp(-10, -5, 5);',
  },
  {
    input: "{ 'a': [{ 'b': { 'c': 3 } }] }, 'a[0].b.c'",
    output: '3',
    answer: "_.get({ 'a': [{ 'b': { 'c': 3 } }] }, 'a[0].b.c')",
  },
  {
    input: "{ 'a': 1, 'b': '2', 'c': 3 }, ['a', 'c']",
    output: "{ 'b': '2' }",
    answer: "_.omit({ 'a': 1, 'b': '2', 'c': 3 }, ['a', 'c'])",
  },
  {
    input: "{ 'a': 1, 'b': '2', 'c': 3 }, ['a', 'c']",
    output: "{ 'a': 1, 'c': 3 }",
    answer: "_.pick({ 'a': 1, 'b': '2', 'c': 3 }, ['a', 'c'])",
  },
  {
    input: "'*', 3",
    output: "'***'",
    answer: "_.repeat('*', 3);",
  },
  {
    input: '4',
    output: '[0, 1, 2, 3]',
    answer: '_.range(4)',
  },
].sort(() => Math.random() - 0.5)

module.exports = { quizzes }
