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
  valid: [{ code: "<App foo={'影片'} />;" }],
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
    }
  ]
})
