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
    input: '[1, 2, 3]',
    output: '[1, 2]',
    answer: '_.dropRight([1, 2, 3]);',
  },
  {
    input: "[1, 2, 3], 'a'",
    output: "['a', 'a', 'a']",
    answer: "_.fill(array, 'a');",
  },
  {
    input: '[1, [2, [3, [4]], 5]]',
    output: '[1, 2, [3, [4]], 5]',
    answer: '_.flatten([1, [2, [3, [4]], 5]]);',
  },
  {
    input: '[1, [2, [3, [4]], 5]]',
    output: '[1, 2, 3, 4, 5]',
    answer: '_.flattenDeep([1, [2, [3, [4]], 5]]);',
  },
]

module.exports = { quizzes }
