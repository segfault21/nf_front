'use strict'
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i]
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]
        }
        return t
      }
    return __assign.apply(this, arguments)
  }
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1]
          return t[1]
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this
        }),
      g
    )
    function verb(n) {
      return function (v) {
        return step([n, v])
      }
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.')
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                  ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t
          if (((y = 0), t)) op = [op[0] & 2, t.value]
          switch (op[0]) {
            case 0:
            case 1:
              t = op
              break
            case 4:
              _.label++
              return { value: op[1], done: false }
            case 5:
              _.label++
              y = op[1]
              op = [0]
              continue
            case 7:
              op = _.ops.pop()
              _.trys.pop()
              continue
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0
                continue
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1]
                break
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1]
                t = op
                break
              }
              if (t && _.label < t[2]) {
                _.label = t[2]
                _.ops.push(op)
                break
              }
              if (t[2]) _.ops.pop()
              _.trys.pop()
              continue
          }
          op = body.call(thisArg, _)
        } catch (e) {
          op = [6, e]
          y = 0
        } finally {
          f = t = 0
        }
      if (op[0] & 5) throw op[1]
      return { value: op[0] ? op[1] : void 0, done: true }
    }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.plugin = void 0
var utils_1 = require('./utils')
var plugin = function (opts) {
  if (opts === void 0) {
    opts = {}
  }
  var _a = opts.transformContent,
    transformContent =
      _a === void 0
        ? function (x) {
            return x.content
          }
        : _a,
    _b = opts.writeFile,
    writeFile = _b === void 0 ? utils_1.defaultWriteFile : _b,
    extra = opts.extra
  var cache = {}
  return {
    postcssPlugin: 'postcss-typescript-d-ts',
    Once: function (root, _a) {
      var _b
      var result = _a.result
      var file =
        (_b = root.source) === null || _b === void 0 ? void 0 : _b.input.file
      if (!file) {
        result.warn(
          'Filepath for the plugin "postcss-typescript-d-ts" was expected, however "' +
            JSON.stringify(file) +
            '" was received.',
        )
        return
      }
      cache[file] = new Set()
    },
    OnceExit: function (root, _a) {
      var result = _a.result
      return __awaiter(void 0, void 0, void 0, function () {
        var file,
          set,
          classes,
          classesProps,
          classesDefinition,
          contentProps,
          writeFileProps,
          _b
        var _c
        var _d
        return __generator(this, function (_e) {
          switch (_e.label) {
            case 0:
              file =
                (_d = root.source) === null || _d === void 0
                  ? void 0
                  : _d.input.file
              if (!file) {
                // warning was already outputted by the `Once` event.
                return [2 /*return*/]
              }
              if (file.includes('.html')) {
                // do not generate .d.ts files for html files
                return [2 /*return*/]
              }
              set = cache[file]
              if (!set) {
                result.warn(
                  'There is a bug in "postcss-typescript-d-ts" plugin, set of classes expected to be truthy but it was falsy.',
                )
              }
              classes = Array.from(set)
              delete cache[file]
              if (classes.length === 0) {
                return [2 /*return*/]
              }
              classesProps = classes
                .map(function (x) {
                  return "'" + x + "': string"
                })
                .join('\n  ')
              classesDefinition = [
                'declare const styles: {',
                '  ' + classesProps,
                '}',
                '',
                'export default styles',
              ].join('\n')
              contentProps = {
                paths: { cssFile: file, dtsFile: file + '.d.ts' },
                parts: __assign(__assign({}, extra), { classes: classes }),
                content: [
                  extra === null || extra === void 0 ? void 0 : extra.header,
                  classesDefinition,
                  extra === null || extra === void 0 ? void 0 : extra.footer,
                  '',
                ]
                  .filter(function (x) {
                    return x !== undefined
                  })
                  .join('\n'),
              }
              _b = [__assign({}, contentProps)]
              _c = {}
              return [4 /*yield*/, transformContent(contentProps)]
            case 1:
              writeFileProps = __assign.apply(
                void 0,
                _b.concat([((_c.content = _e.sent()), _c)]),
              )
              if (!writeFileProps.content) {
                result.warn(
                  'Received content passed through user defined "transformContent" function is falsy. ' +
                    'Check if "transformContent" property is defined correctly.',
                )
              }
              if (writeFileProps.paths.cssFile.includes('.html?'))
                return [2 /*return*/]
              writeFile(writeFileProps)
              return [2 /*return*/]
          }
        })
      })
    },
    Rule: function (rule, _a) {
      var result = _a.result
      return __awaiter(void 0, void 0, void 0, function () {
        var file, set, classes
        var _b
        return __generator(this, function (_c) {
          switch (_c.label) {
            case 0:
              file =
                (_b = rule.source) === null || _b === void 0
                  ? void 0
                  : _b.input.file
              if (!file) {
                // warning was already outputted by the `Once` event.
                return [2 /*return*/]
              }
              set = cache[file]
              if (!set) {
                result.warn(
                  'There is a bug in "postcss-typescript-d-ts" plugin, set of classes expected to be truthy but it was falsy.',
                )
              }
              return [4 /*yield*/, utils_1.getClasses(rule.selector)]
            case 1:
              classes = _c.sent()
              classes.forEach(function (c) {
                return set.add(c)
              })
              return [2 /*return*/]
          }
        })
      })
    },
  }
}
exports.plugin = plugin
//# sourceMappingURL=plugin.js.map
