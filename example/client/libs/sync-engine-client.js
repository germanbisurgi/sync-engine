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
// CONCATENATED MODULE: ./src/network-system/network-system-client.js
/* global io */
var Network = function Network() {
  var _this = this;

  this.socket = io();
  this.serverEntities = {};
  this.socket.on('server-update', function (serverEntities) {
    _this.serverEntities = serverEntities;
  });
};

Network.prototype.sync = function (clientEntities, serverEntities) {
  console.log('networc sync');

  for (var i in serverEntities) {
    if (Object.prototype.hasOwnProperty.call(serverEntities, i)) {
      var entity = serverEntities[i];
      console.log('sync', entity);
    }
  }
};

/* harmony default export */ var network_system_client = (Network);
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
  this.network = new network_system_client();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9TeW5jRW5naW5lQ2xpZW50L3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9TeW5jRW5naW5lQ2xpZW50L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL1N5bmNFbmdpbmVDbGllbnQvLi9zcmMvZW50aXRpZXMtc3lzdGVtL2VudGl0eS5qcyIsIndlYnBhY2s6Ly9TeW5jRW5naW5lQ2xpZW50Ly4vc3JjL2VudGl0aWVzLXN5c3RlbS9lbnRpdGllcy1zeXN0ZW0uanMiLCJ3ZWJwYWNrOi8vU3luY0VuZ2luZUNsaWVudC8uL3NyYy9sb29wL2xvb3AuanMiLCJ3ZWJwYWNrOi8vU3luY0VuZ2luZUNsaWVudC8uL3NyYy9uZXR3b3JrLXN5c3RlbS9uZXR3b3JrLXN5c3RlbS1jbGllbnQuanMiLCJ3ZWJwYWNrOi8vU3luY0VuZ2luZUNsaWVudC8uL3NyYy9yZW5kZXIvcmVuZGVyLmpzIiwid2VicGFjazovL1N5bmNFbmdpbmVDbGllbnQvLi9zcmMvc2NlbmUtc3lzdGVtL3NjZW5lLmpzIiwid2VicGFjazovL1N5bmNFbmdpbmVDbGllbnQvLi9zcmMvc2NlbmUtc3lzdGVtL3NjZW5lLXN5c3RlbS5qcyIsIndlYnBhY2s6Ly9TeW5jRW5naW5lQ2xpZW50Ly4vc3JjL3N5bmMtZW5naW5lLWNsaWVudC5qcyJdLCJuYW1lcyI6WyJFbnRpdHkiLCJwYXJhbXMiLCJjb25maWciLCJPYmplY3QiLCJhc3NpZ24iLCJ1dWlkIiwieCIsInkiLCJFbnRpdGllc1N5c3RlbSIsImNhY2hlIiwicHJvdG90eXBlIiwiY3JlYXRlIiwiZW50aXR5IiwicmVwbGFjZSIsImMiLCJyIiwiTWF0aCIsInJhbmRvbSIsInYiLCJ0b1N0cmluZyIsIkxvb3AiLCJmcHMiLCJmcmFtZSIsInJ1biIsInNldEludGVydmFsIiwic3RlcCIsIm9uU3RlcCIsIk5ldHdvcmsiLCJzb2NrZXQiLCJpbyIsInNlcnZlckVudGl0aWVzIiwib24iLCJzeW5jIiwiY2xpZW50RW50aXRpZXMiLCJjb25zb2xlIiwibG9nIiwiaSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsIlJlbmRlciIsIm9uUmVuZGVyIiwid2luZG93IiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiYmluZCIsIlNjZW5lIiwidXBkYXRlIiwiU2NlbmVTeXN0ZW0iLCJjdXJyZW50IiwicmVxdWVzdGVkIiwibXVzdENyZWF0ZSIsIm11c3RVcGRhdGUiLCJtdXN0U3dpdGNoIiwic2NlbmUiLCJyZXF1ZXN0U3dpdGNoIiwicmVxdWVzdENyZWF0ZSIsInJlcXVlc3RVcGRhdGUiLCJTeW5jRW5naW5lQ2xpZW50IiwiZW50aXRpZXMiLCJFbnRpdGllcyIsImxvb3AiLCJuZXR3b3JrIiwicmVuZGVyIiwic3RhcnQiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO1FDVkE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7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QUFMLEdBQWEsSUFBSVIsWUFBSixFQUFiOztBQUVBLE9BQUtlLElBQUwsQ0FBVWpDLE1BQVYsR0FBbUIsWUFBTTtBQUN2QixRQUFJLEtBQUksQ0FBQzBCLEtBQUwsQ0FBV0wsT0FBZixFQUF3QjtBQUN0QixVQUFJLEtBQUksQ0FBQ0ssS0FBTCxDQUFXSCxVQUFmLEVBQTJCO0FBQ3pCLGFBQUksQ0FBQ0csS0FBTCxDQUFXTCxPQUFYLENBQW1CcEMsTUFBbkIsQ0FBMEIsS0FBMUI7O0FBQ0EsYUFBSSxDQUFDeUMsS0FBTCxDQUFXRyxhQUFYO0FBQ0Q7O0FBQ0QsVUFBSSxLQUFJLENBQUNILEtBQUwsQ0FBV0YsVUFBZixFQUEyQjtBQUN6QixhQUFJLENBQUNFLEtBQUwsQ0FBV0wsT0FBWCxDQUFtQkYsTUFBbkIsQ0FBMEIsS0FBMUI7QUFDRDtBQUNGOztBQUNELFFBQUksS0FBSSxDQUFDTyxLQUFMLENBQVdELFVBQWYsRUFBMkI7QUFDekIsV0FBSSxDQUFDQyxLQUFMLENBQVdMLE9BQVgsR0FBcUIsS0FBSSxDQUFDSyxLQUFMLENBQVdKLFNBQWhDOztBQUNBLFdBQUksQ0FBQ0ksS0FBTCxDQUFXRSxhQUFYO0FBQ0Q7QUFDRixHQWREO0FBZUQsQ0F0QkQ7O0FBd0JBRSxtQ0FBZ0IsQ0FBQzlDLFNBQWpCLENBQTJCb0QsS0FBM0IsR0FBbUMsWUFBWTtBQUM3QyxPQUFLRCxNQUFMLENBQVl0QyxHQUFaO0FBQ0EsT0FBS29DLElBQUwsQ0FBVXBDLEdBQVY7QUFDRCxDQUhEOztBQUtlaUMsMkhBQWYsRSIsImZpbGUiOiJzeW5jLWVuZ2luZS1jbGllbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJTeW5jRW5naW5lQ2xpZW50XCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIlN5bmNFbmdpbmVDbGllbnRcIl0gPSBmYWN0b3J5KCk7XG59KSh3aW5kb3csIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsImNvbnN0IEVudGl0eSA9IGZ1bmN0aW9uIChwYXJhbXMpIHtcclxuICBjb25zdCBjb25maWcgPSBPYmplY3QuYXNzaWduKHtcclxuICAgIHV1aWQ6ICcnLFxyXG4gICAgeDogMCxcclxuICAgIHk6IDBcclxuICB9LCBwYXJhbXMpXHJcblxyXG4gIHRoaXMueCA9IGNvbmZpZy54XHJcbiAgdGhpcy55ID0gY29uZmlnLnlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRW50aXR5XHJcbiIsImltcG9ydCBFbnRpdHkgZnJvbSAnLi9lbnRpdHknXHJcblxyXG5jb25zdCBFbnRpdGllc1N5c3RlbSA9IGZ1bmN0aW9uICgpIHtcclxuICB0aGlzLmNhY2hlID0ge31cclxufVxyXG5cclxuRW50aXRpZXNTeXN0ZW0ucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uIChjb25maWcpIHtcclxuICBjb25maWcudXVpZCA9IHRoaXMudXVpZCgpXHJcbiAgY29uc3QgZW50aXR5ID0gbmV3IEVudGl0eShjb25maWcpXHJcbiAgdGhpcy5jYWNoZVtjb25maWcudXVpZF0gPSBlbnRpdHlcclxuICByZXR1cm4gZW50aXR5XHJcbn1cclxuXHJcbkVudGl0aWVzU3lzdGVtLnByb3RvdHlwZS51dWlkID0gZnVuY3Rpb24gKCkge1xyXG4gIHJldHVybiAneHh4eHh4eHgteHh4eC00eHh4LXl4eHgteHh4eHh4eHh4eHh4Jy5yZXBsYWNlKC9beHldL2csIGZ1bmN0aW9uIChjKSB7XHJcbiAgICBjb25zdCByID0gTWF0aC5yYW5kb20oKSAqIDE2IHwgMFxyXG4gICAgY29uc3QgdiA9IGMgPT09ICd4JyA/IHIgOiAociAmIDB4MyB8IDB4OClcclxuICAgIHJldHVybiB2LnRvU3RyaW5nKDE2KVxyXG4gIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEVudGl0aWVzU3lzdGVtXHJcbiIsImNvbnN0IExvb3AgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuZnBzID0gMVxuICB0aGlzLmZyYW1lID0gMFxufVxuXG5Mb29wLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gIHNldEludGVydmFsKCgpID0+IHtcbiAgICB0aGlzLnN0ZXAoKVxuICB9LCAxMDAwIC8gdGhpcy5mcHMpXG59XG5cbkxvb3AucHJvdG90eXBlLnN0ZXAgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuZnJhbWUrK1xuICB0aGlzLm9uU3RlcCgpXG59XG5cbkxvb3AucHJvdG90eXBlLm9uU3RlcCA9IGZ1bmN0aW9uICgpIHt9XG5cbmV4cG9ydCBkZWZhdWx0IExvb3BcbiIsIi8qIGdsb2JhbCBpbyAqL1xyXG5cclxuY29uc3QgTmV0d29yayA9IGZ1bmN0aW9uICgpIHtcclxuICB0aGlzLnNvY2tldCA9IGlvKClcclxuICB0aGlzLnNlcnZlckVudGl0aWVzID0ge31cclxuXHJcbiAgdGhpcy5zb2NrZXQub24oJ3NlcnZlci11cGRhdGUnLCAoc2VydmVyRW50aXRpZXMpID0+IHtcclxuICAgIHRoaXMuc2VydmVyRW50aXRpZXMgPSBzZXJ2ZXJFbnRpdGllc1xyXG4gIH0pXHJcbn1cclxuXHJcbk5ldHdvcmsucHJvdG90eXBlLnN5bmMgPSBmdW5jdGlvbiAoY2xpZW50RW50aXRpZXMsIHNlcnZlckVudGl0aWVzKSB7XHJcbiAgY29uc29sZS5sb2coJ25ldHdvcmMgc3luYycpXHJcbiAgZm9yIChjb25zdCBpIGluIHNlcnZlckVudGl0aWVzKSB7XHJcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNlcnZlckVudGl0aWVzLCBpKSkge1xyXG4gICAgICBjb25zdCBlbnRpdHkgPSBzZXJ2ZXJFbnRpdGllc1tpXVxyXG4gICAgICBjb25zb2xlLmxvZygnc3luYycsIGVudGl0eSlcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE5ldHdvcmtcclxuIiwiY29uc3QgUmVuZGVyID0gZnVuY3Rpb24gKCkge31cclxuXHJcblJlbmRlci5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xyXG4gIHRoaXMub25SZW5kZXIoKVxyXG4gIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5ydW4uYmluZCh0aGlzKSlcclxufVxyXG5cclxuUmVuZGVyLnByb3RvdHlwZS5vblJlbmRlciA9IGZ1bmN0aW9uICgpIHt9XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSZW5kZXJcclxuIiwiY29uc3QgU2NlbmUgPSBmdW5jdGlvbiAocGFyYW1zKSB7XHJcbiAgY29uc3QgY29uZmlnID0gT2JqZWN0LmFzc2lnbih7XHJcbiAgICBjcmVhdGU6ICgpID0+IHt9LFxyXG4gICAgdXBkYXRlOiAoKSA9PiB7fVxyXG4gIH0sIHBhcmFtcylcclxuXHJcbiAgdGhpcy5jcmVhdGUgPSBjb25maWcuY3JlYXRlXHJcbiAgdGhpcy51cGRhdGUgPSBjb25maWcudXBkYXRlXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNjZW5lXHJcbiIsImltcG9ydCBTY2VuZSBmcm9tICcuL3NjZW5lJ1xyXG5cclxuY29uc3QgU2NlbmVTeXN0ZW0gPSBmdW5jdGlvbiAoKSB7XHJcbiAgdGhpcy5jdXJyZW50ID0gbnVsbFxyXG4gIHRoaXMucmVxdWVzdGVkID0gbnVsbFxyXG4gIHRoaXMubXVzdENyZWF0ZSA9IGZhbHNlXHJcbiAgdGhpcy5tdXN0VXBkYXRlID0gZmFsc2VcclxuICB0aGlzLm11c3RTd2l0Y2ggPSBmYWxzZVxyXG59XHJcblxyXG5TY2VuZVN5c3RlbS5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKGNvbmZpZykge1xyXG4gIHJldHVybiBuZXcgU2NlbmUoY29uZmlnKVxyXG59XHJcblxyXG5TY2VuZVN5c3RlbS5wcm90b3R5cGUuc3dpdGNoID0gZnVuY3Rpb24gKHNjZW5lKSB7XHJcbiAgdGhpcy5yZXF1ZXN0ZWQgPSBzY2VuZVxyXG4gIHRoaXMucmVxdWVzdFN3aXRjaCgpXHJcbn1cclxuXHJcblNjZW5lU3lzdGVtLnByb3RvdHlwZS5yZXF1ZXN0Q3JlYXRlID0gZnVuY3Rpb24gKCkge1xyXG4gIHRoaXMubXVzdENyZWF0ZSA9IHRydWVcclxuICB0aGlzLm11c3RVcGRhdGUgPSBmYWxzZVxyXG4gIHRoaXMubXVzdFN3aXRjaCA9IGZhbHNlXHJcbn1cclxuXHJcblNjZW5lU3lzdGVtLnByb3RvdHlwZS5yZXF1ZXN0VXBkYXRlID0gZnVuY3Rpb24gKCkge1xyXG4gIHRoaXMubXVzdENyZWF0ZSA9IGZhbHNlXHJcbiAgdGhpcy5tdXN0VXBkYXRlID0gdHJ1ZVxyXG4gIHRoaXMubXVzdFN3aXRjaCA9IGZhbHNlXHJcbn1cclxuXHJcblNjZW5lU3lzdGVtLnByb3RvdHlwZS5yZXF1ZXN0U3dpdGNoID0gZnVuY3Rpb24gKCkge1xyXG4gIHRoaXMubXVzdENyZWF0ZSA9IGZhbHNlXHJcbiAgdGhpcy5tdXN0VXBkYXRlID0gZmFsc2VcclxuICB0aGlzLm11c3RTd2l0Y2ggPSB0cnVlXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNjZW5lU3lzdGVtXHJcbiIsImltcG9ydCBFbnRpdGllcyBmcm9tICcuL2VudGl0aWVzLXN5c3RlbS9lbnRpdGllcy1zeXN0ZW0nXHJcbmltcG9ydCBMb29wIGZyb20gJy4vbG9vcC9sb29wJ1xyXG5pbXBvcnQgTmV0d29yayBmcm9tICcuL25ldHdvcmstc3lzdGVtL25ldHdvcmstc3lzdGVtLWNsaWVudCdcclxuaW1wb3J0IFJlbmRlciBmcm9tICcuL3JlbmRlci9yZW5kZXInXHJcbmltcG9ydCBTY2VuZSBmcm9tICcuL3NjZW5lLXN5c3RlbS9zY2VuZS1zeXN0ZW0nXHJcblxyXG5jb25zdCBTeW5jRW5naW5lQ2xpZW50ID0gZnVuY3Rpb24gKCkge1xyXG4gIHRoaXMuZW50aXRpZXMgPSBuZXcgRW50aXRpZXMoKVxyXG4gIHRoaXMubG9vcCA9IG5ldyBMb29wKClcclxuICB0aGlzLm5ldHdvcmsgPSBuZXcgTmV0d29yaygpXHJcbiAgdGhpcy5yZW5kZXIgPSBuZXcgUmVuZGVyKClcclxuICB0aGlzLnNjZW5lID0gbmV3IFNjZW5lKClcclxuXHJcbiAgdGhpcy5sb29wLm9uU3RlcCA9ICgpID0+IHtcclxuICAgIGlmICh0aGlzLnNjZW5lLmN1cnJlbnQpIHtcclxuICAgICAgaWYgKHRoaXMuc2NlbmUubXVzdENyZWF0ZSkge1xyXG4gICAgICAgIHRoaXMuc2NlbmUuY3VycmVudC5jcmVhdGUodGhpcylcclxuICAgICAgICB0aGlzLnNjZW5lLnJlcXVlc3RVcGRhdGUoKVxyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLnNjZW5lLm11c3RVcGRhdGUpIHtcclxuICAgICAgICB0aGlzLnNjZW5lLmN1cnJlbnQudXBkYXRlKHRoaXMpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICh0aGlzLnNjZW5lLm11c3RTd2l0Y2gpIHtcclxuICAgICAgdGhpcy5zY2VuZS5jdXJyZW50ID0gdGhpcy5zY2VuZS5yZXF1ZXN0ZWRcclxuICAgICAgdGhpcy5zY2VuZS5yZXF1ZXN0Q3JlYXRlKClcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcblN5bmNFbmdpbmVDbGllbnQucHJvdG90eXBlLnN0YXJ0ID0gZnVuY3Rpb24gKCkge1xyXG4gIHRoaXMucmVuZGVyLnJ1bigpXHJcbiAgdGhpcy5sb29wLnJ1bigpXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFN5bmNFbmdpbmVDbGllbnRcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==