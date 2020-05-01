(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["SyncEngineClient"] = factory();
	else
		root["SyncEngineClient"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
// CONCATENATED MODULE: ./src/render/render.js
var Render = function Render() {};

Render.prototype.run = function () {
  this.onRender();
  window.requestAnimationFrame(this.run.bind(this));
};

Render.prototype.onRender = function () {};

/* harmony default export */ var render = (Render);
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
// CONCATENATED MODULE: ./src/sync-engine-client.js





var sync_engine_client_SyncEngineClient = function SyncEngineClient() {
  var _this = this;

  this.entities = new entities_system();
  this.loop = new loop();
  this.render = new render();
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

sync_engine_client_SyncEngineClient.prototype.start = function () {
  this.render.run();
  this.loop.run();
};

/* harmony default export */ var sync_engine_client = __webpack_exports__["default"] = (sync_engine_client_SyncEngineClient);

/***/ })
/******/ ])["default"];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9TeW5jRW5naW5lQ2xpZW50L3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9TeW5jRW5naW5lQ2xpZW50L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL1N5bmNFbmdpbmVDbGllbnQvLi9zcmMvZW50aXRpZXMtc3lzdGVtL2VudGl0eS5qcyIsIndlYnBhY2s6Ly9TeW5jRW5naW5lQ2xpZW50Ly4vc3JjL2VudGl0aWVzLXN5c3RlbS9lbnRpdGllcy1zeXN0ZW0uanMiLCJ3ZWJwYWNrOi8vU3luY0VuZ2luZUNsaWVudC8uL3NyYy9sb29wL2xvb3AuanMiLCJ3ZWJwYWNrOi8vU3luY0VuZ2luZUNsaWVudC8uL3NyYy9yZW5kZXIvcmVuZGVyLmpzIiwid2VicGFjazovL1N5bmNFbmdpbmVDbGllbnQvLi9zcmMvc2NlbmUtc3lzdGVtL3NjZW5lLmpzIiwid2VicGFjazovL1N5bmNFbmdpbmVDbGllbnQvLi9zcmMvc2NlbmUtc3lzdGVtL3NjZW5lLXN5c3RlbS5qcyIsIndlYnBhY2s6Ly9TeW5jRW5naW5lQ2xpZW50Ly4vc3JjL3N5bmMtZW5naW5lLWNsaWVudC5qcyJdLCJuYW1lcyI6WyJFbnRpdHkiLCJwYXJhbXMiLCJjb25maWciLCJPYmplY3QiLCJhc3NpZ24iLCJ1dWlkIiwieCIsInkiLCJFbnRpdGllc1N5c3RlbSIsImNhY2hlIiwicHJvdG90eXBlIiwiY3JlYXRlIiwiZW50aXR5IiwicmVwbGFjZSIsImMiLCJyIiwiTWF0aCIsInJhbmRvbSIsInYiLCJ0b1N0cmluZyIsIkxvb3AiLCJmcHMiLCJmcmFtZSIsInJ1biIsInNldEludGVydmFsIiwic3RlcCIsIm9uU3RlcCIsIlJlbmRlciIsIm9uUmVuZGVyIiwid2luZG93IiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiYmluZCIsIlNjZW5lIiwidXBkYXRlIiwiU2NlbmVTeXN0ZW0iLCJjdXJyZW50IiwicmVxdWVzdGVkIiwibXVzdENyZWF0ZSIsIm11c3RVcGRhdGUiLCJtdXN0U3dpdGNoIiwic2NlbmUiLCJyZXF1ZXN0U3dpdGNoIiwicmVxdWVzdENyZWF0ZSIsInJlcXVlc3RVcGRhdGUiLCJTeW5jRW5naW5lQ2xpZW50IiwiZW50aXRpZXMiLCJFbnRpdGllcyIsImxvb3AiLCJyZW5kZXIiLCJzdGFydCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87UUNWQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQSxJQUFNQSxNQUFNLEdBQUcsU0FBVEEsTUFBUyxDQUFVQyxNQUFWLEVBQWtCO0FBQy9CLE1BQU1DLE1BQU0sR0FBR0MsTUFBTSxDQUFDQyxNQUFQLENBQWM7QUFDM0JDLFFBQUksRUFBRSxFQURxQjtBQUUzQkMsS0FBQyxFQUFFLENBRndCO0FBRzNCQyxLQUFDLEVBQUU7QUFId0IsR0FBZCxFQUlaTixNQUpZLENBQWY7QUFNQSxP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LEVBQVo7QUFDQSxPQUFLNEIsTUFBTCxHQUFjLElBQUlyQixNQUFKLEVBQWQ7QUFDQSxPQUFLYSxLQUFMLEdBQWEsSUFBSVIsWUFBSixFQUFiOztBQUVBLE9BQUtlLElBQUwsQ0FBVXJCLE1BQVYsR0FBbUIsWUFBTTtBQUN2QixRQUFJLEtBQUksQ0FBQ2MsS0FBTCxDQUFXTCxPQUFmLEVBQXdCO0FBQ3RCLFVBQUksS0FBSSxDQUFDSyxLQUFMLENBQVdILFVBQWYsRUFBMkI7QUFDekIsYUFBSSxDQUFDRyxLQUFMLENBQVdMLE9BQVgsQ0FBbUJ4QixNQUFuQixDQUEwQixLQUExQjs7QUFDQSxhQUFJLENBQUM2QixLQUFMLENBQVdHLGFBQVg7QUFDRDs7QUFDRCxVQUFJLEtBQUksQ0FBQ0gsS0FBTCxDQUFXRixVQUFmLEVBQTJCO0FBQ3pCLGFBQUksQ0FBQ0UsS0FBTCxDQUFXTCxPQUFYLENBQW1CRixNQUFuQixDQUEwQixLQUExQjtBQUNEO0FBQ0Y7O0FBQ0QsUUFBSSxLQUFJLENBQUNPLEtBQUwsQ0FBV0QsVUFBZixFQUEyQjtBQUN6QixXQUFJLENBQUNDLEtBQUwsQ0FBV0wsT0FBWCxHQUFxQixLQUFJLENBQUNLLEtBQUwsQ0FBV0osU0FBaEM7O0FBQ0EsV0FBSSxDQUFDSSxLQUFMLENBQVdFLGFBQVg7QUFDRDtBQUNGLEdBZEQ7QUFlRCxDQXJCRDs7QUF1QkFFLG1DQUFnQixDQUFDbEMsU0FBakIsQ0FBMkJ1QyxLQUEzQixHQUFtQyxZQUFZO0FBQzdDLE9BQUtELE1BQUwsQ0FBWXpCLEdBQVo7QUFDQSxPQUFLd0IsSUFBTCxDQUFVeEIsR0FBVjtBQUNELENBSEQ7O0FBS2VxQiwySEFBZixFIiwiZmlsZSI6InN5bmMtZW5naW5lLWNsaWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIlN5bmNFbmdpbmVDbGllbnRcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiU3luY0VuZ2luZUNsaWVudFwiXSA9IGZhY3RvcnkoKTtcbn0pKHdpbmRvdywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiY29uc3QgRW50aXR5ID0gZnVuY3Rpb24gKHBhcmFtcykge1xyXG4gIGNvbnN0IGNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe1xyXG4gICAgdXVpZDogJycsXHJcbiAgICB4OiAwLFxyXG4gICAgeTogMFxyXG4gIH0sIHBhcmFtcylcclxuXHJcbiAgdGhpcy54ID0gY29uZmlnLnhcclxuICB0aGlzLnkgPSBjb25maWcueVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFbnRpdHlcclxuIiwiaW1wb3J0IEVudGl0eSBmcm9tICcuL2VudGl0eSdcclxuXHJcbmNvbnN0IEVudGl0aWVzU3lzdGVtID0gZnVuY3Rpb24gKCkge1xyXG4gIHRoaXMuY2FjaGUgPSB7fVxyXG59XHJcblxyXG5FbnRpdGllc1N5c3RlbS5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKGNvbmZpZykge1xyXG4gIGNvbmZpZy51dWlkID0gdGhpcy51dWlkKClcclxuICBjb25zdCBlbnRpdHkgPSBuZXcgRW50aXR5KGNvbmZpZylcclxuICB0aGlzLmNhY2hlW2NvbmZpZy51dWlkXSA9IGVudGl0eVxyXG4gIHJldHVybiBlbnRpdHlcclxufVxyXG5cclxuRW50aXRpZXNTeXN0ZW0ucHJvdG90eXBlLnV1aWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgcmV0dXJuICd4eHh4eHh4eC14eHh4LTR4eHgteXh4eC14eHh4eHh4eHh4eHgnLnJlcGxhY2UoL1t4eV0vZywgZnVuY3Rpb24gKGMpIHtcclxuICAgIGNvbnN0IHIgPSBNYXRoLnJhbmRvbSgpICogMTYgfCAwXHJcbiAgICBjb25zdCB2ID0gYyA9PT0gJ3gnID8gciA6IChyICYgMHgzIHwgMHg4KVxyXG4gICAgcmV0dXJuIHYudG9TdHJpbmcoMTYpXHJcbiAgfSlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRW50aXRpZXNTeXN0ZW1cclxuIiwiY29uc3QgTG9vcCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5mcHMgPSAxXG4gIHRoaXMuZnJhbWUgPSAwXG59XG5cbkxvb3AucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgIHRoaXMuc3RlcCgpXG4gIH0sIDEwMDAgLyB0aGlzLmZwcylcbn1cblxuTG9vcC5wcm90b3R5cGUuc3RlcCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5mcmFtZSsrXG4gIHRoaXMub25TdGVwKClcbn1cblxuTG9vcC5wcm90b3R5cGUub25TdGVwID0gZnVuY3Rpb24gKCkge31cblxuZXhwb3J0IGRlZmF1bHQgTG9vcFxuIiwiY29uc3QgUmVuZGVyID0gZnVuY3Rpb24gKCkge31cclxuXHJcblJlbmRlci5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xyXG4gIHRoaXMub25SZW5kZXIoKVxyXG4gIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5ydW4uYmluZCh0aGlzKSlcclxufVxyXG5cclxuUmVuZGVyLnByb3RvdHlwZS5vblJlbmRlciA9IGZ1bmN0aW9uICgpIHt9XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSZW5kZXJcclxuIiwiY29uc3QgU2NlbmUgPSBmdW5jdGlvbiAocGFyYW1zKSB7XHJcbiAgY29uc3QgY29uZmlnID0gT2JqZWN0LmFzc2lnbih7XHJcbiAgICBjcmVhdGU6ICgpID0+IHt9LFxyXG4gICAgdXBkYXRlOiAoKSA9PiB7fVxyXG4gIH0sIHBhcmFtcylcclxuXHJcbiAgdGhpcy5jcmVhdGUgPSBjb25maWcuY3JlYXRlXHJcbiAgdGhpcy51cGRhdGUgPSBjb25maWcudXBkYXRlXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNjZW5lXHJcbiIsImltcG9ydCBTY2VuZSBmcm9tICcuL3NjZW5lJ1xyXG5cclxuY29uc3QgU2NlbmVTeXN0ZW0gPSBmdW5jdGlvbiAoKSB7XHJcbiAgdGhpcy5jdXJyZW50ID0gbnVsbFxyXG4gIHRoaXMucmVxdWVzdGVkID0gbnVsbFxyXG4gIHRoaXMubXVzdENyZWF0ZSA9IGZhbHNlXHJcbiAgdGhpcy5tdXN0VXBkYXRlID0gZmFsc2VcclxuICB0aGlzLm11c3RTd2l0Y2ggPSBmYWxzZVxyXG59XHJcblxyXG5TY2VuZVN5c3RlbS5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKGNvbmZpZykge1xyXG4gIHJldHVybiBuZXcgU2NlbmUoY29uZmlnKVxyXG59XHJcblxyXG5TY2VuZVN5c3RlbS5wcm90b3R5cGUuc3dpdGNoID0gZnVuY3Rpb24gKHNjZW5lKSB7XHJcbiAgdGhpcy5yZXF1ZXN0ZWQgPSBzY2VuZVxyXG4gIHRoaXMucmVxdWVzdFN3aXRjaCgpXHJcbn1cclxuXHJcblNjZW5lU3lzdGVtLnByb3RvdHlwZS5yZXF1ZXN0Q3JlYXRlID0gZnVuY3Rpb24gKCkge1xyXG4gIHRoaXMubXVzdENyZWF0ZSA9IHRydWVcclxuICB0aGlzLm11c3RVcGRhdGUgPSBmYWxzZVxyXG4gIHRoaXMubXVzdFN3aXRjaCA9IGZhbHNlXHJcbn1cclxuXHJcblNjZW5lU3lzdGVtLnByb3RvdHlwZS5yZXF1ZXN0VXBkYXRlID0gZnVuY3Rpb24gKCkge1xyXG4gIHRoaXMubXVzdENyZWF0ZSA9IGZhbHNlXHJcbiAgdGhpcy5tdXN0VXBkYXRlID0gdHJ1ZVxyXG4gIHRoaXMubXVzdFN3aXRjaCA9IGZhbHNlXHJcbn1cclxuXHJcblNjZW5lU3lzdGVtLnByb3RvdHlwZS5yZXF1ZXN0U3dpdGNoID0gZnVuY3Rpb24gKCkge1xyXG4gIHRoaXMubXVzdENyZWF0ZSA9IGZhbHNlXHJcbiAgdGhpcy5tdXN0VXBkYXRlID0gZmFsc2VcclxuICB0aGlzLm11c3RTd2l0Y2ggPSB0cnVlXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNjZW5lU3lzdGVtXHJcbiIsImltcG9ydCBFbnRpdGllcyBmcm9tICcuL2VudGl0aWVzLXN5c3RlbS9lbnRpdGllcy1zeXN0ZW0nXHJcbmltcG9ydCBMb29wIGZyb20gJy4vbG9vcC9sb29wJ1xyXG5pbXBvcnQgUmVuZGVyIGZyb20gJy4vcmVuZGVyL3JlbmRlcidcclxuaW1wb3J0IFNjZW5lIGZyb20gJy4vc2NlbmUtc3lzdGVtL3NjZW5lLXN5c3RlbSdcclxuXHJcbmNvbnN0IFN5bmNFbmdpbmVDbGllbnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgdGhpcy5lbnRpdGllcyA9IG5ldyBFbnRpdGllcygpXHJcbiAgdGhpcy5sb29wID0gbmV3IExvb3AoKVxyXG4gIHRoaXMucmVuZGVyID0gbmV3IFJlbmRlcigpXHJcbiAgdGhpcy5zY2VuZSA9IG5ldyBTY2VuZSgpXHJcblxyXG4gIHRoaXMubG9vcC5vblN0ZXAgPSAoKSA9PiB7XHJcbiAgICBpZiAodGhpcy5zY2VuZS5jdXJyZW50KSB7XHJcbiAgICAgIGlmICh0aGlzLnNjZW5lLm11c3RDcmVhdGUpIHtcclxuICAgICAgICB0aGlzLnNjZW5lLmN1cnJlbnQuY3JlYXRlKHRoaXMpXHJcbiAgICAgICAgdGhpcy5zY2VuZS5yZXF1ZXN0VXBkYXRlKClcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5zY2VuZS5tdXN0VXBkYXRlKSB7XHJcbiAgICAgICAgdGhpcy5zY2VuZS5jdXJyZW50LnVwZGF0ZSh0aGlzKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5zY2VuZS5tdXN0U3dpdGNoKSB7XHJcbiAgICAgIHRoaXMuc2NlbmUuY3VycmVudCA9IHRoaXMuc2NlbmUucmVxdWVzdGVkXHJcbiAgICAgIHRoaXMuc2NlbmUucmVxdWVzdENyZWF0ZSgpXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5TeW5jRW5naW5lQ2xpZW50LnByb3RvdHlwZS5zdGFydCA9IGZ1bmN0aW9uICgpIHtcclxuICB0aGlzLnJlbmRlci5ydW4oKVxyXG4gIHRoaXMubG9vcC5ydW4oKVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTeW5jRW5naW5lQ2xpZW50XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=