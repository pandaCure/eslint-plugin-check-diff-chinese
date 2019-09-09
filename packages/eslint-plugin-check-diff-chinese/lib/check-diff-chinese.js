'use strict'
const errorText = require('../config/config')
const OpenCC = require('opencc')
const initOpenCC = new OpenCC('s2twp.json')
const RuleOfCheckDiffChinese = {
  meta: {
    type: 'suggestion',
    fixable: 'code',
    docs: {},
    schema: [
      {
        type: 'object',
        properties: {
          opencc: {
            type: 'boolean'
          }
        },
        additionalProperties: false
      }
    ]
  },
  create(context) {
    let isUseOpencc = false
    const opencc = context.options[0]
    if (Object.prototype.toString.call(opencc) === '[object Object]') {
      isUseOpencc = opencc['opencc']
    }
    return {
      JSXAttribute(node) {
        const propName = node.name && node.name.name
        const value = node.value
        if (value && value.expression && value.expression.value) {
          const JSXAttributeText = value.expression.value
          if (isUseOpencc) {
            const openccText = initOpenCC.convertSync(JSXAttributeText)
            if (openccText !== JSXAttributeText) {
              context.report({
                node,
                message: `${propName} --->  {{ str }} 是包含错用错别字 请修改 （づ￣3￣）づ╭❤～`,
                data: {
                  str: JSXAttributeText
                },
                fix(fixer) {
                  return fixer.replaceTextRange(
                    value.expression.range,
                    `'${openccText}'`
                  )
                }
              })
            }
          } else {
            if (errorText.has(JSXAttributeText)) {
              context.report({
                node,
                message: `${propName} --->  {{ str }} 是包含错用错别字 请修改 （づ￣3￣）づ╭❤～`,
                data: {
                  str: JSXAttributeText
                },
                fix(fixer) {
                  return fixer.replaceTextRange(
                    value.expression.range,
                    `'${errorText.get(JSXAttributeText)}'`
                  )
                }
              })
            }
          }
        }
      },
      JSXText(node) {
        const value = node.value
        if (isUseOpencc) {
          const openccText = initOpenCC.convertSync(JSXAttributeText)
          if (openccText !== JSXAttributeText) {
            context.report({
              node,
              message: `{{ str }} 是包含错用错别字 请修改 （づ￣3￣）づ╭❤～`,
              data: {
                str: value
              },
              fix(fixer) {
                return fixer.replaceTextRange(node.range, `${openccText}`)
              }
            })
          }
        } else {
          if (errorText.has(value)) {
            context.report({
              node,
              message: `{{ str }} 是包含错用错别字 请修改 （づ￣3￣）づ╭❤～`,
              data: {
                str: value
              },
              fix(fixer) {
                return fixer.replaceTextRange(
                  node.range,
                  `${errorText.get(value)}`
                )
              }
            })
          }
        }
      },
      VariableDeclarator(node) {
        const value = node.init && node.init.value
        if (isUseOpencc) {
          const openccText = initOpenCC.convertSync(JSXAttributeText)
          if (openccText !== JSXAttributeText) {
            context.report({
              node,
              message: `{{ str }} 是包含错用错别字 请修改 （づ￣3￣）づ╭❤～`,
              data: {
                str: value
              },
              fix(fixer) {
                return fixer.replaceTextRange(
                  node.init.range,
                  `'${openccText}'`
                )
              }
            })
          }
        } else {
          if (errorText.has(value)) {
            context.report({
              node,
              message: `{{ str }} 是包含错用错别字 请修改 （づ￣3￣）づ╭❤～`,
              data: {
                str: value
              },
              fix(fixer) {
                return fixer.replaceTextRange(
                  node.init.range,
                  `'${errorText.get(value)}'`
                )
              }
            })
          }
        }
      },
      Property(node) {
        if (node.value && node.value.type === 'Literal') {
          const value = node.value.value
          if (isUseOpencc) {
            const openccText = initOpenCC.convertSync(JSXAttributeText)
            if (openccText !== JSXAttributeText) {
              context.report({
                node,
                message: `{{ str }} 是包含错用错别字 请修改 （づ￣3￣）づ╭❤～`,
                data: {
                  str: value
                },
                fix(fixer) {
                  return fixer.replaceTextRange(
                    node.value.range,
                    `'${openccText}'`
                  )
                }
              })
            }
          } else {
            if (errorText.has(value)) {
              context.report({
                node,
                message: `{{ str }} 是包含错用错别字 请修改 （づ￣3￣）づ╭❤～`,
                data: {
                  str: value
                },
                fix(fixer) {
                  return fixer.replaceTextRange(
                    node.value.range,
                    `'${errorText.get(value)}'`
                  )
                }
              })
            }
          }
        }
      }
    }
  }
}
module.exports = RuleOfCheckDiffChinese
