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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9TeW5jRW5naW5lU2VydmVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL1N5bmNFbmdpbmVTZXJ2ZXIvLi9zcmMvZW50aXRpZXMtc3lzdGVtL2VudGl0eS5qcyIsIndlYnBhY2s6Ly9TeW5jRW5naW5lU2VydmVyLy4vc3JjL2VudGl0aWVzLXN5c3RlbS9lbnRpdGllcy1zeXN0ZW0uanMiLCJ3ZWJwYWNrOi8vU3luY0VuZ2luZVNlcnZlci8uL3NyYy9sb29wL2xvb3AuanMiLCJ3ZWJwYWNrOi8vU3luY0VuZ2luZVNlcnZlci8uL3NyYy9zY2VuZS1zeXN0ZW0vc2NlbmUuanMiLCJ3ZWJwYWNrOi8vU3luY0VuZ2luZVNlcnZlci8uL3NyYy9zY2VuZS1zeXN0ZW0vc2NlbmUtc3lzdGVtLmpzIiwid2VicGFjazovL1N5bmNFbmdpbmVTZXJ2ZXIvLi9zcmMvc3luYy1lbmdpbmUtc2VydmVyLmpzIl0sIm5hbWVzIjpbIkVudGl0eSIsInBhcmFtcyIsImNvbmZpZyIsIk9iamVjdCIsImFzc2lnbiIsInV1aWQiLCJ4IiwieSIsIkVudGl0aWVzU3lzdGVtIiwiY2FjaGUiLCJwcm90b3R5cGUiLCJjcmVhdGUiLCJlbnRpdHkiLCJyZXBsYWNlIiwiYyIsInIiLCJNYXRoIiwicmFuZG9tIiwidiIsInRvU3RyaW5nIiwiTG9vcCIsImZwcyIsImZyYW1lIiwicnVuIiwic2V0SW50ZXJ2YWwiLCJzdGVwIiwib25TdGVwIiwiU2NlbmUiLCJ1cGRhdGUiLCJTY2VuZVN5c3RlbSIsImN1cnJlbnQiLCJyZXF1ZXN0ZWQiLCJtdXN0Q3JlYXRlIiwibXVzdFVwZGF0ZSIsIm11c3RTd2l0Y2giLCJzY2VuZSIsInJlcXVlc3RTd2l0Y2giLCJyZXF1ZXN0Q3JlYXRlIiwicmVxdWVzdFVwZGF0ZSIsIlN5bmNFbmdpbmVTZXJ2ZXIiLCJlbnRpdGllcyIsIkVudGl0aWVzIiwibG9vcCIsInN0YXJ0Il0sIm1hcHBpbmdzIjoiOztRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7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QUFXRSxhQUFYO0FBQ0Q7QUFDRixHQWREO0FBZUQsQ0FwQkQ7O0FBc0JBRSxtQ0FBZ0IsQ0FBQzdCLFNBQWpCLENBQTJCaUMsS0FBM0IsR0FBbUMsWUFBWTtBQUM3QyxPQUFLRCxJQUFMLENBQVVuQixHQUFWO0FBQ0QsQ0FGRDs7QUFJZWdCLDJIQUFmLEUiLCJmaWxlIjoic3luYy1lbmdpbmUtc2VydmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiY29uc3QgRW50aXR5ID0gZnVuY3Rpb24gKHBhcmFtcykge1xyXG4gIGNvbnN0IGNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe1xyXG4gICAgdXVpZDogJycsXHJcbiAgICB4OiAwLFxyXG4gICAgeTogMFxyXG4gIH0sIHBhcmFtcylcclxuXHJcbiAgdGhpcy54ID0gY29uZmlnLnhcclxuICB0aGlzLnkgPSBjb25maWcueVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFbnRpdHlcclxuIiwiaW1wb3J0IEVudGl0eSBmcm9tICcuL2VudGl0eSdcclxuXHJcbmNvbnN0IEVudGl0aWVzU3lzdGVtID0gZnVuY3Rpb24gKCkge1xyXG4gIHRoaXMuY2FjaGUgPSB7fVxyXG59XHJcblxyXG5FbnRpdGllc1N5c3RlbS5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKGNvbmZpZykge1xyXG4gIGNvbmZpZy51dWlkID0gdGhpcy51dWlkKClcclxuICBjb25zdCBlbnRpdHkgPSBuZXcgRW50aXR5KGNvbmZpZylcclxuICB0aGlzLmNhY2hlW2NvbmZpZy51dWlkXSA9IGVudGl0eVxyXG4gIHJldHVybiBlbnRpdHlcclxufVxyXG5cclxuRW50aXRpZXNTeXN0ZW0ucHJvdG90eXBlLnV1aWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgcmV0dXJuICd4eHh4eHh4eC14eHh4LTR4eHgteXh4eC14eHh4eHh4eHh4eHgnLnJlcGxhY2UoL1t4eV0vZywgZnVuY3Rpb24gKGMpIHtcclxuICAgIGNvbnN0IHIgPSBNYXRoLnJhbmRvbSgpICogMTYgfCAwXHJcbiAgICBjb25zdCB2ID0gYyA9PT0gJ3gnID8gciA6IChyICYgMHgzIHwgMHg4KVxyXG4gICAgcmV0dXJuIHYudG9TdHJpbmcoMTYpXHJcbiAgfSlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRW50aXRpZXNTeXN0ZW1cclxuIiwiY29uc3QgTG9vcCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5mcHMgPSAxXG4gIHRoaXMuZnJhbWUgPSAwXG59XG5cbkxvb3AucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgIHRoaXMuc3RlcCgpXG4gIH0sIDEwMDAgLyB0aGlzLmZwcylcbn1cblxuTG9vcC5wcm90b3R5cGUuc3RlcCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5mcmFtZSsrXG4gIHRoaXMub25TdGVwKClcbn1cblxuTG9vcC5wcm90b3R5cGUub25TdGVwID0gZnVuY3Rpb24gKCkge31cblxuZXhwb3J0IGRlZmF1bHQgTG9vcFxuIiwiY29uc3QgU2NlbmUgPSBmdW5jdGlvbiAocGFyYW1zKSB7XHJcbiAgY29uc3QgY29uZmlnID0gT2JqZWN0LmFzc2lnbih7XHJcbiAgICBjcmVhdGU6ICgpID0+IHt9LFxyXG4gICAgdXBkYXRlOiAoKSA9PiB7fVxyXG4gIH0sIHBhcmFtcylcclxuXHJcbiAgdGhpcy5jcmVhdGUgPSBjb25maWcuY3JlYXRlXHJcbiAgdGhpcy51cGRhdGUgPSBjb25maWcudXBkYXRlXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNjZW5lXHJcbiIsImltcG9ydCBTY2VuZSBmcm9tICcuL3NjZW5lJ1xyXG5cclxuY29uc3QgU2NlbmVTeXN0ZW0gPSBmdW5jdGlvbiAoKSB7XHJcbiAgdGhpcy5jdXJyZW50ID0gbnVsbFxyXG4gIHRoaXMucmVxdWVzdGVkID0gbnVsbFxyXG4gIHRoaXMubXVzdENyZWF0ZSA9IGZhbHNlXHJcbiAgdGhpcy5tdXN0VXBkYXRlID0gZmFsc2VcclxuICB0aGlzLm11c3RTd2l0Y2ggPSBmYWxzZVxyXG59XHJcblxyXG5TY2VuZVN5c3RlbS5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKGNvbmZpZykge1xyXG4gIHJldHVybiBuZXcgU2NlbmUoY29uZmlnKVxyXG59XHJcblxyXG5TY2VuZVN5c3RlbS5wcm90b3R5cGUuc3dpdGNoID0gZnVuY3Rpb24gKHNjZW5lKSB7XHJcbiAgdGhpcy5yZXF1ZXN0ZWQgPSBzY2VuZVxyXG4gIHRoaXMucmVxdWVzdFN3aXRjaCgpXHJcbn1cclxuXHJcblNjZW5lU3lzdGVtLnByb3RvdHlwZS5yZXF1ZXN0Q3JlYXRlID0gZnVuY3Rpb24gKCkge1xyXG4gIHRoaXMubXVzdENyZWF0ZSA9IHRydWVcclxuICB0aGlzLm11c3RVcGRhdGUgPSBmYWxzZVxyXG4gIHRoaXMubXVzdFN3aXRjaCA9IGZhbHNlXHJcbn1cclxuXHJcblNjZW5lU3lzdGVtLnByb3RvdHlwZS5yZXF1ZXN0VXBkYXRlID0gZnVuY3Rpb24gKCkge1xyXG4gIHRoaXMubXVzdENyZWF0ZSA9IGZhbHNlXHJcbiAgdGhpcy5tdXN0VXBkYXRlID0gdHJ1ZVxyXG4gIHRoaXMubXVzdFN3aXRjaCA9IGZhbHNlXHJcbn1cclxuXHJcblNjZW5lU3lzdGVtLnByb3RvdHlwZS5yZXF1ZXN0U3dpdGNoID0gZnVuY3Rpb24gKCkge1xyXG4gIHRoaXMubXVzdENyZWF0ZSA9IGZhbHNlXHJcbiAgdGhpcy5tdXN0VXBkYXRlID0gZmFsc2VcclxuICB0aGlzLm11c3RTd2l0Y2ggPSB0cnVlXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNjZW5lU3lzdGVtXHJcbiIsImltcG9ydCBFbnRpdGllcyBmcm9tICcuL2VudGl0aWVzLXN5c3RlbS9lbnRpdGllcy1zeXN0ZW0nXHJcbmltcG9ydCBMb29wIGZyb20gJy4vbG9vcC9sb29wJ1xyXG5pbXBvcnQgU2NlbmUgZnJvbSAnLi9zY2VuZS1zeXN0ZW0vc2NlbmUtc3lzdGVtJ1xyXG5cclxuY29uc3QgU3luY0VuZ2luZVNlcnZlciA9IGZ1bmN0aW9uICgpIHtcclxuICB0aGlzLmVudGl0aWVzID0gbmV3IEVudGl0aWVzKClcclxuICB0aGlzLmxvb3AgPSBuZXcgTG9vcCgpXHJcbiAgdGhpcy5zY2VuZSA9IG5ldyBTY2VuZSgpXHJcblxyXG4gIHRoaXMubG9vcC5vblN0ZXAgPSAoKSA9PiB7XHJcbiAgICBpZiAodGhpcy5zY2VuZS5jdXJyZW50KSB7XHJcbiAgICAgIGlmICh0aGlzLnNjZW5lLm11c3RDcmVhdGUpIHtcclxuICAgICAgICB0aGlzLnNjZW5lLmN1cnJlbnQuY3JlYXRlKHRoaXMpXHJcbiAgICAgICAgdGhpcy5zY2VuZS5yZXF1ZXN0VXBkYXRlKClcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5zY2VuZS5tdXN0VXBkYXRlKSB7XHJcbiAgICAgICAgdGhpcy5zY2VuZS5jdXJyZW50LnVwZGF0ZSh0aGlzKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5zY2VuZS5tdXN0U3dpdGNoKSB7XHJcbiAgICAgIHRoaXMuc2NlbmUuY3VycmVudCA9IHRoaXMuc2NlbmUucmVxdWVzdGVkXHJcbiAgICAgIHRoaXMuc2NlbmUucmVxdWVzdENyZWF0ZSgpXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5TeW5jRW5naW5lU2VydmVyLnByb3RvdHlwZS5zdGFydCA9IGZ1bmN0aW9uICgpIHtcclxuICB0aGlzLmxvb3AucnVuKClcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3luY0VuZ2luZVNlcnZlclxyXG4iXSwic291cmNlUm9vdCI6IiJ9