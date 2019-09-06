'use strict'
const errText = ['視頻', '视频']
const RuleOfCheckDiffChinese = {
  meta: {
    type: 'suggestion',
    fixable: 'code',
    docs: {},
    schema: {}
  },
  create(context) {
    console.log(`------------->`)
    return {
      JSXAttribute(node) {
        const propName = node.name && node.name.name
        const value = node.value
        if (value && value.expression && value.expression.value) {
          if (errText.includes(value.expression.value)) {
            context.report({
              node,
              message: `${propName} --->  {{ str }} 是包含错用错别字 请修改 （づ￣3￣）づ╭❤～`,
              data: {
                str: value.expression.value
              },
              fix(fixer) {
                return fixer.replaceTextRange(value.expression.range, "'影片'")
              }
            })
          }
        }
      }
    }
  }
}
const rules = {
  'check-diff-chinese': RuleOfCheckDiffChinese
}
module.exports = rules
