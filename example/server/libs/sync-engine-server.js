module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/entities-system/entity.js
var Entity = function Entity(params) {
  var config = Object.assign({
    uuid: '',
    x: 0,
    y: 0
  }, params);
  this.x = config.x;
  this.y = config.y;
};

/* harmony default export */ var entities_system_entity = (Entity);
// CONCATENATED MODULE: ./src/entities-system/entities-system.js


var EntitiesSystem = function EntitiesSystem() {
  this.cache = {};
};

EntitiesSystem.prototype.create = function (config) {
  config.uuid = this.uuid();
  var entity = new entities_system_entity(config);
  this.cache[config.uuid] = entity;
  return entity;
};

EntitiesSystem.prototype.uuid = function () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0;
    var v = c === 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
};

/* harmony default export */ var entities_system = (EntitiesSystem);
// CONCATENATED MODULE: ./src/loop/loop.js
var Loop = function Loop() {
  this.fps = 1;
  this.frame = 0;
};

Loop.prototype.run = function () {
  var _this = this;

  setInterval(function () {
    _this.step();
  }, 1000 / this.fps);
};

Loop.prototype.step = function () {
  this.frame++;
  this.onStep();
};

Loop.prototype.onStep = function () {};

/* harmony default export */ var loop = (Loop);
// CONCATENATED MODULE: ./src/network-system/network-system-server.js
var Network = function Network() {};

Network.prototype.sync = function () {};

/* harmony default export */ var network_system_server = (Network);
// CONCATENATED MODULE: ./src/scene-system/scene.js
var Scene = function Scene(params) {
  var config = Object.assign({
    create: function create() {},
    update: function update() {}
  }, params);
  this.create = config.create;
  this.update = config.update;
};

/* harmony default export */ var scene = (Scene);
// CONCATENATED MODULE: ./src/scene-system/scene-system.js


var SceneSystem = function SceneSystem() {
  this.current = null;
  this.requested = null;
  this.mustCreate = false;
  this.mustUpdate = false;
  this.mustSwitch = false;
};

SceneSystem.prototype.create = function (config) {
  return new scene(config);
};

SceneSystem.prototype["switch"] = function (scene) {
  this.requested = scene;
  this.requestSwitch();
};

SceneSystem.prototype.requestCreate = function () {
  this.mustCreate = true;
  this.mustUpdate = false;
  this.mustSwitch = false;
};

SceneSystem.prototype.requestUpdate = function () {
  this.mustCreate = false;
  this.mustUpdate = true;
  this.mustSwitch = false;
};

SceneSystem.prototype.requestSwitch = function () {
  this.mustCreate = false;
  this.mustUpdate = false;
  this.mustSwitch = true;
};

/* harmony default export */ var scene_system = (SceneSystem);
// CONCATENATED MODULE: ./src/sync-engine-server.js





var sync_engine_server_SyncEngineServer = function SyncEngineServer() {
  var _this = this;

  this.entities = new entities_system();
  this.loop = new loop();
  this.network = new network_system_server();
  this.scene = new scene_system();

  this.loop.onStep = function () {
    if (_this.scene.current) {
      if (_this.scene.mustCreate) {
        _this.scene.current.create(_this);

        _this.scene.requestUpdate();
      }

      if (_this.scene.mustUpdate) {
        _this.scene.current.update(_this);
      }
    }

    if (_this.scene.mustSwitch) {
      _this.scene.current = _this.scene.requested;

      _this.scene.requestCreate();
    }
  };
};

sync_engine_server_SyncEngineServer.prototype.start = function () {
  this.loop.run();
};

/* harmony default export */ var sync_engine_server = __webpack_exports__["default"] = (sync_engine_server_SyncEngineServer);

/***/ })
/******/ ])["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9TeW5jRW5naW5lU2VydmVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL1N5bmNFbmdpbmVTZXJ2ZXIvLi9zcmMvZW50aXRpZXMtc3lzdGVtL2VudGl0eS5qcyIsIndlYnBhY2s6Ly9TeW5jRW5naW5lU2VydmVyLy4vc3JjL2VudGl0aWVzLXN5c3RlbS9lbnRpdGllcy1zeXN0ZW0uanMiLCJ3ZWJwYWNrOi8vU3luY0VuZ2luZVNlcnZlci8uL3NyYy9sb29wL2xvb3AuanMiLCJ3ZWJwYWNrOi8vU3luY0VuZ2luZVNlcnZlci8uL3NyYy9uZXR3b3JrLXN5c3RlbS9uZXR3b3JrLXN5c3RlbS1zZXJ2ZXIuanMiLCJ3ZWJwYWNrOi8vU3luY0VuZ2luZVNlcnZlci8uL3NyYy9zY2VuZS1zeXN0ZW0vc2NlbmUuanMiLCJ3ZWJwYWNrOi8vU3luY0VuZ2luZVNlcnZlci8uL3NyYy9zY2VuZS1zeXN0ZW0vc2NlbmUtc3lzdGVtLmpzIiwid2VicGFjazovL1N5bmNFbmdpbmVTZXJ2ZXIvLi9zcmMvc3luYy1lbmdpbmUtc2VydmVyLmpzIl0sIm5hbWVzIjpbIkVudGl0eSIsInBhcmFtcyIsImNvbmZpZyIsIk9iamVjdCIsImFzc2lnbiIsInV1aWQiLCJ4IiwieSIsIkVudGl0aWVzU3lzdGVtIiwiY2FjaGUiLCJwcm90b3R5cGUiLCJjcmVhdGUiLCJlbnRpdHkiLCJyZXBsYWNlIiwiYyIsInIiLCJNYXRoIiwicmFuZG9tIiwidiIsInRvU3RyaW5nIiwiTG9vcCIsImZwcyIsImZyYW1lIiwicnVuIiwic2V0SW50ZXJ2YWwiLCJzdGVwIiwib25TdGVwIiwiTmV0d29yayIsInN5bmMiLCJTY2VuZSIsInVwZGF0ZSIsIlNjZW5lU3lzdGVtIiwiY3VycmVudCIsInJlcXVlc3RlZCIsIm11c3RDcmVhdGUiLCJtdXN0VXBkYXRlIiwibXVzdFN3aXRjaCIsInNjZW5lIiwicmVxdWVzdFN3aXRjaCIsInJlcXVlc3RDcmVhdGUiLCJyZXF1ZXN0VXBkYXRlIiwiU3luY0VuZ2luZVNlcnZlciIsImVudGl0aWVzIiwiRW50aXRpZXMiLCJsb29wIiwibmV0d29yayIsInN0YXJ0Il0sIm1hcHBpbmdzIjoiOztRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBLElBQU1BLE1BQU0sR0FBRyxTQUFUQSxNQUFTLENBQVVDLE1BQVYsRUFBa0I7QUFDL0IsTUFBTUMsTUFBTSxHQUFHQyxNQUFNLENBQUNDLE1BQVAsQ0FBYztBQUMzQkMsUUFBSSxFQUFFLEVBRHFCO0FBRTNCQyxLQUFDLEVBQUUsQ0FGd0I7QUFHM0JDLEtBQUMsRUFBRTtBQUh3QixHQUFkLEVBSVpOLE1BSlksQ0FBZjtBQU1BLE9BQUtLLENBQUwsR0FBU0osTUFBTSxDQUFDSSxDQUFoQjtBQUNBLE9BQUtDLENBQUwsR0FBU0wsTUFBTSxDQUFDSyxDQUFoQjtBQUNELENBVEQ7O0FBV2VQLGlFQUFmLEU7O0FDWEE7O0FBRUEsSUFBTVEsY0FBYyxHQUFHLFNBQWpCQSxjQUFpQixHQUFZ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QzBCLEtBQUwsQ0FBV0csYUFBWDtBQUNEOztBQUNELFVBQUksS0FBSSxDQUFDSCxLQUFMLENBQVdGLFVBQWYsRUFBMkI7QUFDekIsYUFBSSxDQUFDRSxLQUFMLENBQVdMLE9BQVgsQ0FBbUJGLE1BQW5CLENBQTBCLEtBQTFCO0FBQ0Q7QUFDRjs7QUFDRCxRQUFJLEtBQUksQ0FBQ08sS0FBTCxDQUFXRCxVQUFmLEVBQTJCO0FBQ3pCLFdBQUksQ0FBQ0MsS0FBTCxDQUFXTCxPQUFYLEdBQXFCLEtBQUksQ0FBQ0ssS0FBTCxDQUFXSixTQUFoQzs7QUFDQSxXQUFJLENBQUNJLEtBQUwsQ0FBV0UsYUFBWDtBQUNEO0FBQ0YsR0FkRDtBQWVELENBckJEOztBQXVCQUUsbUNBQWdCLENBQUMvQixTQUFqQixDQUEyQm9DLEtBQTNCLEdBQW1DLFlBQVk7QUFDN0MsT0FBS0YsSUFBTCxDQUFVckIsR0FBVjtBQUNELENBRkQ7O0FBSWVrQiwySEFBZixFIiwiZmlsZSI6InN5bmMtZW5naW5lLXNlcnZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsImNvbnN0IEVudGl0eSA9IGZ1bmN0aW9uIChwYXJhbXMpIHtcclxuICBjb25zdCBjb25maWcgPSBPYmplY3QuYXNzaWduKHtcclxuICAgIHV1aWQ6ICcnLFxyXG4gICAgeDogMCxcclxuICAgIHk6IDBcclxuICB9LCBwYXJhbXMpXHJcblxyXG4gIHRoaXMueCA9IGNvbmZpZy54XHJcbiAgdGhpcy55ID0gY29uZmlnLnlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRW50aXR5XHJcbiIsImltcG9ydCBFbnRpdHkgZnJvbSAnLi9lbnRpdHknXHJcblxyXG5jb25zdCBFbnRpdGllc1N5c3RlbSA9IGZ1bmN0aW9uICgpIHtcclxuICB0aGlzLmNhY2hlID0ge31cclxufVxyXG5cclxuRW50aXRpZXNTeXN0ZW0ucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uIChjb25maWcpIHtcclxuICBjb25maWcudXVpZCA9IHRoaXMudXVpZCgpXHJcbiAgY29uc3QgZW50aXR5ID0gbmV3IEVudGl0eShjb25maWcpXHJcbiAgdGhpcy5jYWNoZVtjb25maWcudXVpZF0gPSBlbnRpdHlcclxuICByZXR1cm4gZW50aXR5XHJcbn1cclxuXHJcbkVudGl0aWVzU3lzdGVtLnByb3RvdHlwZS51dWlkID0gZnVuY3Rpb24gKCkge1xyXG4gIHJldHVybiAneHh4eHh4eHgteHh4eC00eHh4LXl4eHgteHh4eHh4eHh4eHh4Jy5yZXBsYWNlKC9beHldL2csIGZ1bmN0aW9uIChjKSB7XHJcbiAgICBjb25zdCByID0gTWF0aC5yYW5kb20oKSAqIDE2IHwgMFxyXG4gICAgY29uc3QgdiA9IGMgPT09ICd4JyA/IHIgOiAociAmIDB4MyB8IDB4OClcclxuICAgIHJldHVybiB2LnRvU3RyaW5nKDE2KVxyXG4gIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEVudGl0aWVzU3lzdGVtXHJcbiIsImNvbnN0IExvb3AgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuZnBzID0gMVxuICB0aGlzLmZyYW1lID0gMFxufVxuXG5Mb29wLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gIHNldEludGVydmFsKCgpID0+IHtcbiAgICB0aGlzLnN0ZXAoKVxuICB9LCAxMDAwIC8gdGhpcy5mcHMpXG59XG5cbkxvb3AucHJvdG90eXBlLnN0ZXAgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuZnJhbWUrK1xuICB0aGlzLm9uU3RlcCgpXG59XG5cbkxvb3AucHJvdG90eXBlLm9uU3RlcCA9IGZ1bmN0aW9uICgpIHt9XG5cbmV4cG9ydCBkZWZhdWx0IExvb3BcbiIsImNvbnN0IE5ldHdvcmsgPSBmdW5jdGlvbiAoKSB7fVxyXG5cclxuTmV0d29yay5wcm90b3R5cGUuc3luYyA9IGZ1bmN0aW9uICgpIHt9XHJcblxyXG5leHBvcnQgZGVmYXVsdCBOZXR3b3JrXHJcbiIsImNvbnN0IFNjZW5lID0gZnVuY3Rpb24gKHBhcmFtcykge1xyXG4gIGNvbnN0IGNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe1xyXG4gICAgY3JlYXRlOiAoKSA9PiB7fSxcclxuICAgIHVwZGF0ZTogKCkgPT4ge31cclxuICB9LCBwYXJhbXMpXHJcblxyXG4gIHRoaXMuY3JlYXRlID0gY29uZmlnLmNyZWF0ZVxyXG4gIHRoaXMudXBkYXRlID0gY29uZmlnLnVwZGF0ZVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTY2VuZVxyXG4iLCJpbXBvcnQgU2NlbmUgZnJvbSAnLi9zY2VuZSdcclxuXHJcbmNvbnN0IFNjZW5lU3lzdGVtID0gZnVuY3Rpb24gKCkge1xyXG4gIHRoaXMuY3VycmVudCA9IG51bGxcclxuICB0aGlzLnJlcXVlc3RlZCA9IG51bGxcclxuICB0aGlzLm11c3RDcmVhdGUgPSBmYWxzZVxyXG4gIHRoaXMubXVzdFVwZGF0ZSA9IGZhbHNlXHJcbiAgdGhpcy5tdXN0U3dpdGNoID0gZmFsc2VcclxufVxyXG5cclxuU2NlbmVTeXN0ZW0ucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uIChjb25maWcpIHtcclxuICByZXR1cm4gbmV3IFNjZW5lKGNvbmZpZylcclxufVxyXG5cclxuU2NlbmVTeXN0ZW0ucHJvdG90eXBlLnN3aXRjaCA9IGZ1bmN0aW9uIChzY2VuZSkge1xyXG4gIHRoaXMucmVxdWVzdGVkID0gc2NlbmVcclxuICB0aGlzLnJlcXVlc3RTd2l0Y2goKVxyXG59XHJcblxyXG5TY2VuZVN5c3RlbS5wcm90b3R5cGUucmVxdWVzdENyZWF0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICB0aGlzLm11c3RDcmVhdGUgPSB0cnVlXHJcbiAgdGhpcy5tdXN0VXBkYXRlID0gZmFsc2VcclxuICB0aGlzLm11c3RTd2l0Y2ggPSBmYWxzZVxyXG59XHJcblxyXG5TY2VuZVN5c3RlbS5wcm90b3R5cGUucmVxdWVzdFVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICB0aGlzLm11c3RDcmVhdGUgPSBmYWxzZVxyXG4gIHRoaXMubXVzdFVwZGF0ZSA9IHRydWVcclxuICB0aGlzLm11c3RTd2l0Y2ggPSBmYWxzZVxyXG59XHJcblxyXG5TY2VuZVN5c3RlbS5wcm90b3R5cGUucmVxdWVzdFN3aXRjaCA9IGZ1bmN0aW9uICgpIHtcclxuICB0aGlzLm11c3RDcmVhdGUgPSBmYWxzZVxyXG4gIHRoaXMubXVzdFVwZGF0ZSA9IGZhbHNlXHJcbiAgdGhpcy5tdXN0U3dpdGNoID0gdHJ1ZVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTY2VuZVN5c3RlbVxyXG4iLCJpbXBvcnQgRW50aXRpZXMgZnJvbSAnLi9lbnRpdGllcy1zeXN0ZW0vZW50aXRpZXMtc3lzdGVtJ1xyXG5pbXBvcnQgTG9vcCBmcm9tICcuL2xvb3AvbG9vcCdcclxuaW1wb3J0IE5ldHdvcmsgZnJvbSAnLi9uZXR3b3JrLXN5c3RlbS9uZXR3b3JrLXN5c3RlbS1zZXJ2ZXInXHJcbmltcG9ydCBTY2VuZSBmcm9tICcuL3NjZW5lLXN5c3RlbS9zY2VuZS1zeXN0ZW0nXHJcblxyXG5jb25zdCBTeW5jRW5naW5lU2VydmVyID0gZnVuY3Rpb24gKCkge1xyXG4gIHRoaXMuZW50aXRpZXMgPSBuZXcgRW50aXRpZXMoKVxyXG4gIHRoaXMubG9vcCA9IG5ldyBMb29wKClcclxuICB0aGlzLm5ldHdvcmsgPSBuZXcgTmV0d29yaygpXHJcbiAgdGhpcy5zY2VuZSA9IG5ldyBTY2VuZSgpXHJcblxyXG4gIHRoaXMubG9vcC5vblN0ZXAgPSAoKSA9PiB7XHJcbiAgICBpZiAodGhpcy5zY2VuZS5jdXJyZW50KSB7XHJcbiAgICAgIGlmICh0aGlzLnNjZW5lLm11c3RDcmVhdGUpIHtcclxuICAgICAgICB0aGlzLnNjZW5lLmN1cnJlbnQuY3JlYXRlKHRoaXMpXHJcbiAgICAgICAgdGhpcy5zY2VuZS5yZXF1ZXN0VXBkYXRlKClcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5zY2VuZS5tdXN0VXBkYXRlKSB7XHJcbiAgICAgICAgdGhpcy5zY2VuZS5jdXJyZW50LnVwZGF0ZSh0aGlzKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5zY2VuZS5tdXN0U3dpdGNoKSB7XHJcbiAgICAgIHRoaXMuc2NlbmUuY3VycmVudCA9IHRoaXMuc2NlbmUucmVxdWVzdGVkXHJcbiAgICAgIHRoaXMuc2NlbmUucmVxdWVzdENyZWF0ZSgpXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5TeW5jRW5naW5lU2VydmVyLnByb3RvdHlwZS5zdGFydCA9IGZ1bmN0aW9uICgpIHtcclxuICB0aGlzLmxvb3AucnVuKClcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3luY0VuZ2luZVNlcnZlclxyXG4iXSwic291cmNlUm9vdCI6IiJ9