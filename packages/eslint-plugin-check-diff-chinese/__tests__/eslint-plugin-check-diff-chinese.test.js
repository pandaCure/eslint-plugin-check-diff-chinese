'use strict'

const RuleTester = require('eslint').RuleTester
const rule = require('../lib/eslint-plugin-check-diff-chinese')[
  'check-diff-chinese'
]

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: 'module',
  ecmaFeatures: {
    jsx: true
  }
}
const ruleTester = new RuleTester({ parserOptions })
ruleTester.run('check-diff-chinese', rule, {
  valid: [
    { code: "<App foo={'影片'} />;" },
    { code: '<App>影片</App>;' },
    { code: "const a = '影片'" },
    { code: "const a = () => { const s = '影片' }" },
    { code: "const a = { b: '影片', c: { d: '影片' } }" }
  ],
  invalid: [
    {
      code: "<App foo={'视频'} />;",
      output: "<App foo={'影片'} />;",
      errors: [
        { message: 'foo --->  视频 是包含错用错别字 请修改 （づ￣3￣）づ╭❤～' }
      ]
    },
    {
      code: "<App foo={'視頻'} />;",
      output: "<App foo={'影片'} />;",
      errors: [
        { message: 'foo --->  視頻 是包含错用错别字 请修改 （づ￣3￣）づ╭❤～' }
      ]
    },
    {
      code: '<App>視頻</App>;',
      output: '<App>影片</App>;',
      errors: [{ message: '視頻 是包含错用错别字 请修改 （づ￣3￣）づ╭❤～' }]
    },
    {
      code: "const a = '視頻'",
      output: "const a = '影片'",
      errors: [{ message: '視頻 是包含错用错别字 请修改 （づ￣3￣）づ╭❤～' }]
    },
    {
      code: "const b = () => { const a = '視頻' }",
      output: "const b = () => { const a = '影片' }",
      errors: [{ message: '視頻 是包含错用错别字 请修改 （づ￣3￣）づ╭❤～' }]
    },
    {
      code: "const b = { a: '視頻' }",
      output: "const b = { a: '影片' }",
      errors: [{ message: '視頻 是包含错用错别字 请修改 （づ￣3￣）づ╭❤～' }]
    },
    {
      code:
        "const b = { a: { a: { a: { a: '視頻' }, b: { a: '視頻' } }, b: { a: '視頻' } }, b: { a: '視頻' } }",
      output:
        "const b = { a: { a: { a: { a: '影片' }, b: { a: '影片' } }, b: { a: '影片' } }, b: { a: '影片' } }",
      errors: [
        { message: '視頻 是包含错用错别字 请修改 （づ￣3￣）づ╭❤～' },
        { message: '視頻 是包含错用错别字 请修改 （づ￣3￣）づ╭❤～' },
        { message: '視頻 是包含错用错别字 请修改 （づ￣3￣）づ╭❤～' },
        { message: '視頻 是包含错用错别字 请修改 （づ￣3￣）づ╭❤～' }
      ]
    }
  ]
})
