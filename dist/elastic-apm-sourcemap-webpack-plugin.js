"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _formData = _interopRequireDefault(require("form-data"));

var _webpackLog = _interopRequireDefault(require("webpack-log"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ElasticAPMSourceMapPlugin = /*#__PURE__*/function () {
  function ElasticAPMSourceMapPlugin(config) {
    _classCallCheck(this, ElasticAPMSourceMapPlugin);

    this.config = Object.assign({
      logLevel: 'warn',
      ignoreErrors: false
    }, config);
    this.logger = (0, _webpackLog["default"])({
      name: 'ElasticAPMSourceMapPlugin',
      level: this.config.logLevel
    });
  }

  _createClass(ElasticAPMSourceMapPlugin, [{
    key: "emit",
    value: function emit(compilation, callback) {
      var _this = this;

      var logger = this.logger;
      logger.debug("starting uploading sourcemaps with configs: ".concat(JSON.stringify(this.config), "."));

      var _compilation$getStats = compilation.getStats().toJson(),
          _compilation$getStats2 = _compilation$getStats.chunks,
          chunks = _compilation$getStats2 === void 0 ? [] : _compilation$getStats2;

      return R.compose(function (promises) {
        return Promise.all(promises).then(function () {
          logger.debug('finished uploading sourcemaps.');
          callback();
        })["catch"](function (err) {
          logger.error(err);

          if (_this.config.ignoreErrors) {
            callback();
          } else {
            callback(err);
          }
        });
      }, R.map(function (_ref) {
        var sourceFile = _ref.sourceFile,
            sourceMap = _ref.sourceMap;

        /* istanbul ignore next */
        if (!sourceFile || !sourceMap) {
          // It is impossible for Wepback to run into here.
          logger.debug('there is no .js files to be uploaded.');
          return Promise.resolve();
        }

        var formData = new _formData["default"]();
        var bundleFilePath = "".concat(_this.config.publicPath, "/").concat(sourceFile);
        formData.append('sourcemap', compilation.assets[sourceMap].source());
        formData.append('service_version', _this.config.serviceVersion);
        formData.append('bundle_filepath', bundleFilePath);
        formData.append('service_name', _this.config.serviceName);
        var headers = _this.config.secret ? {
          Authorization: "Bearer ".concat(_this.config.secret)
        } : undefined;
        logger.debug("uploading ".concat(sourceMap, " to Elastic APM with bundle_filepath: ").concat(bundleFilePath, "."));
        return (0, _nodeFetch["default"])(_this.config.serverURL, {
          method: 'POST',
          body: formData,
          headers: _objectSpread(_objectSpread({}, headers), {}, {
            'kbn-xsrf': 'true'
          })
        }).then(function (response) {
          return Promise.all([response.ok, response.text()]);
        }).then(function (_ref2) {
          var _ref3 = _slicedToArray(_ref2, 2),
              ok = _ref3[0],
              responseText = _ref3[1];

          if (ok) {
            logger.debug("uploaded ".concat(sourceMap, "."));
          } else {
            logger.error("APM server response: ".concat(responseText));
            throw new Error("error while uploading ".concat(sourceMap, " to Elastic APM"));
          }
        });
      }), R.map(function (chunk) {
        var files = chunk.files,
            auxiliaryFiles = chunk.auxiliaryFiles;
        var sourceFile = R.find(R.test(/\.js$/), files || []); // Webpack 4 uses `files` and does not have `auxiliaryFiles`. The following line
        // is allowed to work in both Webpack 4 and 5.

        var sourceMap = R.find(R.test(/\.js\.map$/), auxiliaryFiles || files || []);
        return {
          sourceFile: sourceFile,
          sourceMap: sourceMap
        };
      }))(chunks);
    }
  }, {
    key: "apply",
    value: function apply(compiler) {
      var _this2 = this;

      /* istanbul ignore else */
      if (compiler.hooks) {
        // webpack 5
        compiler.hooks.emit.tapAsync('ElasticAPMSourceMapPlugin', function (compilation, callback) {
          return _this2.emit(compilation, callback);
        }); // We only run tests against Webpack 5 currently.

        /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
        // @ts-expect-error
      } else if (compiler.plugin) {
        // Webpack 4

        /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
        // @ts-expect-error
        compiler.plugin('emit', function (compilation, callback) {
          return _this2.emit(compilation, callback);
        });
      } else {
        this.logger.error("does not compatible with the current Webpack version");
      }
    }
  }]);

  return ElasticAPMSourceMapPlugin;
}();

exports["default"] = ElasticAPMSourceMapPlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9lbGFzdGljLWFwbS1zb3VyY2VtYXAtd2VicGFjay1wbHVnaW4udHMiXSwibmFtZXMiOlsiRWxhc3RpY0FQTVNvdXJjZU1hcFBsdWdpbiIsImNvbmZpZyIsIk9iamVjdCIsImFzc2lnbiIsImxvZ0xldmVsIiwiaWdub3JlRXJyb3JzIiwibG9nZ2VyIiwibmFtZSIsImxldmVsIiwiY29tcGlsYXRpb24iLCJjYWxsYmFjayIsImRlYnVnIiwiSlNPTiIsInN0cmluZ2lmeSIsImdldFN0YXRzIiwidG9Kc29uIiwiY2h1bmtzIiwiUiIsImNvbXBvc2UiLCJwcm9taXNlcyIsIlByb21pc2UiLCJhbGwiLCJ0aGVuIiwiZXJyIiwiZXJyb3IiLCJtYXAiLCJzb3VyY2VGaWxlIiwic291cmNlTWFwIiwicmVzb2x2ZSIsImZvcm1EYXRhIiwiRm9ybURhdGEiLCJidW5kbGVGaWxlUGF0aCIsInB1YmxpY1BhdGgiLCJhcHBlbmQiLCJhc3NldHMiLCJzb3VyY2UiLCJzZXJ2aWNlVmVyc2lvbiIsInNlcnZpY2VOYW1lIiwiaGVhZGVycyIsInNlY3JldCIsIkF1dGhvcml6YXRpb24iLCJ1bmRlZmluZWQiLCJzZXJ2ZXJVUkwiLCJtZXRob2QiLCJib2R5IiwicmVzcG9uc2UiLCJvayIsInRleHQiLCJyZXNwb25zZVRleHQiLCJFcnJvciIsImNodW5rIiwiZmlsZXMiLCJhdXhpbGlhcnlGaWxlcyIsImZpbmQiLCJ0ZXN0IiwiY29tcGlsZXIiLCJob29rcyIsImVtaXQiLCJ0YXBBc3luYyIsInBsdWdpbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBbUJxQkEseUI7QUFJbkIscUNBQVlDLE1BQVosRUFBNEI7QUFBQTs7QUFDMUIsU0FBS0EsTUFBTCxHQUFjQyxNQUFNLENBQUNDLE1BQVAsQ0FDWjtBQUNFQyxNQUFBQSxRQUFRLEVBQUUsTUFEWjtBQUVFQyxNQUFBQSxZQUFZ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LFVBQUlBLFFBQVEsQ0FBQ0MsS0FBYixFQUFvQjtBQUNsQjtBQUNBRCxRQUFBQSxRQUFRLENBQUNDLEtBQVQsQ0FBZUMsSUFBZixDQUFvQkMsUUFBcEIsQ0FBNkIsMkJBQTdCLEVBQTBELFVBQUNqRCxXQUFELEVBQWNDLFFBQWQ7QUFBQSxpQkFDeEQsTUFBSSxDQUFDK0MsSUFBTCxDQUFVaEQsV0FBVixFQUF1QkMsUUFBdkIsQ0FEd0Q7QUFBQSxTQUExRCxFQUZrQixDQUtsQjs7QUFDQTtBQUNBO0FBQ0QsT0FSRCxNQVFPLElBQUk2QyxRQUFRLENBQUNJLE1BQWIsRUFBcUI7QUFDMUI7O0FBQ0E7QUFDQTtBQUNBSixRQUFBQSxRQUFRLENBQUNJLE1BQVQsQ0FBZ0IsTUFBaEIsRUFBd0IsVUFBQ2xELFdBQUQsRUFBY0MsUUFBZDtBQUFBLGlCQUN0QixNQUFJLENBQUMrQyxJQUFMLENBQVVoRCxXQUFWLEVBQXVCQyxRQUF2QixDQURzQjtBQUFBLFNBQXhCO0FBR0QsT0FQTSxNQU9BO0FBQ0wsYUFBS0osTUFBTCxDQUFZa0IsS0FBWjtBQUNEO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSIGZyb20gJ3JhbWRhJztcbmltcG9ydCBmZXRjaCBmcm9tICdub2RlLWZldGNoJztcbmltcG9ydCBGb3JtRGF0YSBmcm9tICdmb3JtLWRhdGEnO1xuaW1wb3J0IHdlYnBhY2ssIHsgU3RhdHNDaHVuaywgV2VicGFja1BsdWdpbkluc3RhbmNlIH0gZnJvbSAnd2VicGFjayc7XG5pbXBvcnQgd2VicGFja0xvZywgeyBMZXZlbCwgTG9nZ2VyIH0gZnJvbSAnd2VicGFjay1sb2cnO1xuXG5pbnRlcmZhY2UgU291cmNlIHtcbiAgc291cmNlRmlsZT86IHN0cmluZztcbiAgc291cmNlTWFwPzogc3RyaW5nO1xufVxuXG50eXBlIFVwbG9hZFRhc2sgPSBQcm9taXNlPHZvaWQ+O1xuXG5leHBvcnQgaW50ZXJmYWNlIENvbmZpZyB7XG4gIHNlcnZpY2VOYW1lOiBzdHJpbmc7XG4gIHNlcnZpY2VWZXJzaW9uOiBzdHJpbmc7XG4gIHB1YmxpY1BhdGg6IHN0cmluZztcbiAgc2VydmVyVVJMOiBzdHJpbmc7XG4gIHNlY3JldD86IHN0cmluZztcbiAgbG9nTGV2ZWw/OiBMZXZlbDtcbiAgaWdub3JlRXJyb3JzPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWxhc3RpY0FQTVNvdXJjZU1hcFBsdWdpbiBpbXBsZW1lbnRzIFdlYnBhY2tQbHVnaW5JbnN0YW5jZSB7XG4gIGNvbmZpZzogQ29uZmlnO1xuICBsb2dnZXI6IExvZ2dlcjtcblxuICBjb25zdHJ1Y3Rvcihjb25maWc6IENvbmZpZykge1xuICAgIHRoaXMuY29uZmlnID0gT2JqZWN0LmFzc2lnbihcbiAgICAgIHtcbiAgICAgICAgbG9nTGV2ZWw6ICd3YXJuJyxcbiAgICAgICAgaWdub3JlRXJyb3JzOiBmYWxzZVxuICAgICAgfSxcbiAgICAgIGNvbmZpZ1xuICAgICk7XG4gICAgdGhpcy5sb2dnZXIgPSB3ZWJwYWNrTG9nKHtcbiAgICAgIG5hbWU6ICdFbGFzdGljQVBNU291cmNlTWFwUGx1Z2luJyxcbiAgICAgIGxldmVsOiB0aGlzLmNvbmZpZy5sb2dMZXZlbFxuICAgIH0pO1xuICB9XG5cbiAgZW1pdChcbiAgICBjb21waWxhdGlvbjogd2VicGFjay5Db21waWxhdGlvbixcbiAgICBjYWxsYmFjazogKGVycm9yPzogRXJyb3IpID0+IHZvaWRcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgbG9nZ2VyID0gdGhpcy5sb2dnZXI7XG5cbiAgICBsb2dnZXIuZGVidWcoYHN0YXJ0aW5nIHVwbG9hZGluZyBzb3VyY2VtYXBzIHdpdGggY29uZmlnczogJHtKU09OLnN0cmluZ2lmeSh0aGlzLmNvbmZpZyl9LmApO1xuXG4gICAgY29uc3QgeyBjaHVua3MgPSBbXSB9ID0gY29tcGlsYXRpb24uZ2V0U3RhdHMoKS50b0pzb24oKTtcblxuICAgIHJldHVybiBSLmNvbXBvc2U8U3RhdHNDaHVua1tdLCBTb3VyY2VbXSwgVXBsb2FkVGFza1tdLCBQcm9taXNlPHZvaWQ+PihcbiAgICAgIChwcm9taXNlczogQXJyYXk8UHJvbWlzZTx2b2lkPj4pID0+XG4gICAgICAgIFByb21pc2UuYWxsKHByb21pc2VzKVxuICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnZmluaXNoZWQgdXBsb2FkaW5nIHNvdXJjZW1hcHMuJyk7XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICBsb2dnZXIuZXJyb3IoZXJyKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlnLmlnbm9yZUVycm9ycykge1xuICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY2FsbGJhY2soZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSxcbiAgICAgIFIubWFwKCh7IHNvdXJjZUZpbGUsIHNvdXJjZU1hcCB9KSA9PiB7XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgIGlmICghc291cmNlRmlsZSB8fCAhc291cmNlTWFwKSB7XG4gICAgICAgICAgLy8gSXQgaXMgaW1wb3NzaWJsZSBmb3IgV2VwYmFjayB0byBydW4gaW50byBoZXJlLlxuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygndGhlcmUgaXMgbm8gLmpzIGZpbGVzIHRvIGJlIHVwbG9hZGVkLicpO1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICAgIGNvbnN0IGJ1bmRsZUZpbGVQYXRoID0gYCR7dGhpcy5jb25maWcucHVibGljUGF0aH0vJHtzb3VyY2VGaWxlfWA7XG5cbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKCdzb3VyY2VtYXAnLCBjb21waWxhdGlvbi5hc3NldHNbc291cmNlTWFwXS5zb3VyY2UoKSk7XG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZCgnc2VydmljZV92ZXJzaW9uJywgdGhpcy5jb25maWcuc2VydmljZVZlcnNpb24pO1xuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ2J1bmRsZV9maWxlcGF0aCcsIGJ1bmRsZUZpbGVQYXRoKTtcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKCdzZXJ2aWNlX25hbWUnLCB0aGlzLmNvbmZpZy5zZXJ2aWNlTmFtZSk7XG5cbiAgICAgICAgY29uc3QgaGVhZGVycyA9IHRoaXMuY29uZmlnLnNlY3JldFxuICAgICAgICAgID8geyBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7dGhpcy5jb25maWcuc2VjcmV0fWAgfVxuICAgICAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgICAgIGxvZ2dlci5kZWJ1ZyhcbiAgICAgICAgICBgdXBsb2FkaW5nICR7c291cmNlTWFwfSB0byBFbGFzdGljIEFQTSB3aXRoIGJ1bmRsZV9maWxlcGF0aDogJHtidW5kbGVGaWxlUGF0aH0uYFxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiBmZXRjaCh0aGlzLmNvbmZpZy5zZXJ2ZXJVUkwsIHtcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICBib2R5OiBmb3JtRGF0YSxcbiAgICAgICAgICBoZWFkZXJzOiB7IC4uLmhlYWRlcnMsICdrYm4teHNyZic6ICd0cnVlJyB9XG4gICAgICAgIH0pXG4gICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gUHJvbWlzZS5hbGwoW3Jlc3BvbnNlLm9rLCByZXNwb25zZS50ZXh0KCldKSlcbiAgICAgICAgICAudGhlbigoW29rLCByZXNwb25zZVRleHRdKSA9PiB7XG4gICAgICAgICAgICBpZiAob2spIHtcbiAgICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKGB1cGxvYWRlZCAke3NvdXJjZU1hcH0uYCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBsb2dnZXIuZXJyb3IoYEFQTSBzZXJ2ZXIgcmVzcG9uc2U6ICR7cmVzcG9uc2VUZXh0fWApO1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGVycm9yIHdoaWxlIHVwbG9hZGluZyAke3NvdXJjZU1hcH0gdG8gRWxhc3RpYyBBUE1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgIH0pLFxuICAgICAgUi5tYXAoKGNodW5rKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgZmlsZXMsIGF1eGlsaWFyeUZpbGVzIH0gPSBjaHVuaztcblxuICAgICAgICBjb25zdCBzb3VyY2VGaWxlID0gUi5maW5kKFIudGVzdCgvXFwuanMkLyksIGZpbGVzIHx8IFtdKTtcbiAgICAgICAgLy8gV2VicGFjayA0IHVzZXMgYGZpbGVzYCBhbmQgZG9lcyBub3QgaGF2ZSBgYXV4aWxpYXJ5RmlsZXNgLiBUaGUgZm9sbG93aW5nIGxpbmVcbiAgICAgICAgLy8gaXMgYWxsb3dlZCB0byB3b3JrIGluIGJvdGggV2VicGFjayA0IGFuZCA1LlxuICAgICAgICBjb25zdCBzb3VyY2VNYXAgPSBSLmZpbmQoUi50ZXN0KC9cXC5qc1xcLm1hcCQvKSwgYXV4aWxpYXJ5RmlsZXMgfHwgZmlsZXMgfHwgW10pO1xuXG4gICAgICAgIHJldHVybiB7IHNvdXJjZUZpbGUsIHNvdXJjZU1hcCB9O1xuICAgICAgfSlcbiAgICApKGNodW5rcyk7XG4gIH1cblxuICBhcHBseShjb21waWxlcjogd2VicGFjay5Db21waWxlcik6IHZvaWQge1xuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICBpZiAoY29tcGlsZXIuaG9va3MpIHtcbiAgICAgIC8vIHdlYnBhY2sgNVxuICAgICAgY29tcGlsZXIuaG9va3MuZW1pdC50YXBBc3luYygnRWxhc3RpY0FQTVNvdXJjZU1hcFBsdWdpbicsIChjb21waWxhdGlvbiwgY2FsbGJhY2spID0+XG4gICAgICAgIHRoaXMuZW1pdChjb21waWxhdGlvbiwgY2FsbGJhY2spXG4gICAgICApO1xuICAgICAgLy8gV2Ugb25seSBydW4gdGVzdHMgYWdhaW5zdCBXZWJwYWNrIDUgY3VycmVudGx5LlxuICAgICAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9iYW4tdHMtY29tbWVudCAqL1xuICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvclxuICAgIH0gZWxzZSBpZiAoY29tcGlsZXIucGx1Z2luKSB7XG4gICAgICAvLyBXZWJwYWNrIDRcbiAgICAgIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvYmFuLXRzLWNvbW1lbnQgKi9cbiAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3JcbiAgICAgIGNvbXBpbGVyLnBsdWdpbignZW1pdCcsIChjb21waWxhdGlvbiwgY2FsbGJhY2spID0+XG4gICAgICAgIHRoaXMuZW1pdChjb21waWxhdGlvbiwgY2FsbGJhY2spXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxvZ2dlci5lcnJvcihgZG9lcyBub3QgY29tcGF0aWJsZSB3aXRoIHRoZSBjdXJyZW50IFdlYnBhY2sgdmVyc2lvbmApO1xuICAgIH1cbiAgfVxufVxuIl19