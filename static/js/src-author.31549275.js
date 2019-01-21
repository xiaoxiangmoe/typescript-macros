(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{"./src/author.mdx":function(e,t,n){"use strict";var a=n("../node_modules/@babel/runtime/helpers/interopRequireDefault.js");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=a(n("../node_modules/@babel/runtime/helpers/objectWithoutProperties.js")),r=a(n("../node_modules/@babel/runtime/helpers/classCallCheck.js")),m=a(n("../node_modules/@babel/runtime/helpers/createClass.js")),s=a(n("../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js")),p=a(n("../node_modules/@babel/runtime/helpers/getPrototypeOf.js")),c=a(n("../node_modules/@babel/runtime/helpers/inherits.js")),l=a(n("../node_modules/umi-build-dev/node_modules/react/index.js")),i=n("../node_modules/@mdx-js/tag/dist/index.js"),u=function(e){function t(e){var n;return(0,r.default)(this,t),(n=(0,s.default)(this,(0,p.default)(t).call(this,e))).layout=null,n}return(0,c.default)(t,e),(0,m.default)(t,[{key:"render",value:function(){var e=this.props,t=e.components;(0,o.default)(e,["components"]);return l.default.createElement(i.MDXTag,{name:"wrapper",components:t},l.default.createElement(i.MDXTag,{name:"h1",components:t,props:{id:"typescript-macros-usage-for-macros-authors"}},l.default.createElement(i.MDXTag,{name:"inlineCode",components:t,parentName:"h1"},"typescript-macros")," Usage for macros authors"),l.default.createElement(i.MDXTag,{name:"h2",components:t,props:{id:"writing-a-macro"}},"Writing a macro"),l.default.createElement(i.MDXTag,{name:"p",components:t},"A macro is a TypeScript module that exports a transform function by another macro(",l.default.createElement(i.MDXTag,{name:"inlineCode",components:t,parentName:"p"},"interop-export-macros.tsmacro"),"). Here's a simple example:"),l.default.createElement(i.MDXTag,{name:"pre",components:t},l.default.createElement(i.MDXTag,{name:"code",components:t,parentName:"pre",props:{className:"language-ts"}},"import { exportTypeScriptMacro } from 'interop-export-macros.tsmacro';\nimport * as ts from 'typescript';\nimport { TypeScriptMacroNodeTransformFunction } from 'typescript-macros';\n\n/**\n * this function will generate function type in`.d.ts` file for us.\n * ` declare function uppercase(input: string): string; `\n */\nexport function uppercase(input: string): string {\n  throw new Error('no runtime output');\n}\n\nconst transform: TypeScriptMacroNodeTransformFunction = ({\n  reference,\n  node\n}) => {\n  // convert your node to another node here.\n  // refrence should input a node and it will return\n  // * false if this node is not an identifier imported by this macros\n  // * string if this node is an identifier mported by this macros.\n  //   the string stands for the import name\n  return node;\n};\n\n// `exportTypeScriptMacro` is a macro function that generate export function\nexportTypeScriptMacro(transform);\n")),l.default.createElement(i.MDXTag,{name:"h2",components:t,props:{id:"filename"}},"Filename"),l.default.createElement(i.MDXTag,{name:"p",components:t},"The way that babel-plugin-macros determines whether to run a macro is based on the source string of the import or require statement.\nIt must match this regex: /",".","(ts)?macro\\$/ for example:"),l.default.createElement(i.MDXTag,{name:"ul",components:t},l.default.createElement(i.MDXTag,{name:"li",components:t,parentName:"ul"},"matches:")),l.default.createElement(i.MDXTag,{name:"pre",components:t},l.default.createElement(i.MDXTag,{name:"code",components:t,parentName:"pre",props:{}},"'my.macro'\n'my.tsmacro'\n")),l.default.createElement(i.MDXTag,{name:"ul",components:t},l.default.createElement(i.MDXTag,{name:"li",components:t,parentName:"ul"},"does not match:")),l.default.createElement(i.MDXTag,{name:"pre",components:t},l.default.createElement(i.MDXTag,{name:"code",components:t,parentName:"pre",props:{}},"'my-macro'\n'my.macro.is-sweet'\n'my/macro/rocks'\n'my.macro.js'\n'my.macro.ts'\n")),l.default.createElement(i.MDXTag,{name:"p",components:t},"maybe we'll support more ",l.default.createElement(i.MDXTag,{name:"inlineCode",components:t,parentName:"p"},"my.macro.ts")," in the future."),l.default.createElement(i.MDXTag,{name:"h2",components:t,props:{id:"helpful-tools"}},"Helpful Tools"),l.default.createElement(i.MDXTag,{name:"ul",components:t},l.default.createElement(i.MDXTag,{name:"li",components:t,parentName:"ul"},l.default.createElement(i.MDXTag,{name:"a",components:t,parentName:"li",props:{href:"https://github.com/ajafff/tsutils"}},"tsutils"),": Utility functions for working with typescript's AST"),l.default.createElement(i.MDXTag,{name:"li",components:t,parentName:"ul"},l.default.createElement(i.MDXTag,{name:"a",components:t,parentName:"li",props:{href:"https://github.com/HearTao/ts-creator"}},"ts-creator"),": A code generator to generate TypeScript code generator from TypeScript code")),l.default.createElement(i.MDXTag,{name:"h2",components:t,props:{id:"examples"}},"Examples"),l.default.createElement(i.MDXTag,{name:"p",components:t},"see ",l.default.createElement(i.MDXTag,{name:"a",components:t,parentName:"p",props:{href:"https://github.com/xiaoxiangmoe/typescript-macros/tree/master/examples"}},"https://github.com/xiaoxiangmoe/typescript-macros/tree/master/examples")))}}]),t}(l.default.Component);t.default=u,u.__docgenInfo={description:"",methods:[],displayName:"MDXContent"}}}]);
//# sourceMappingURL=src-author.d25e98d0a85705ed59ec.js.map