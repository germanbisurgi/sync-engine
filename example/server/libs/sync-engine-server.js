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

// CONCATENATED MODULE: ./src/entities/entity.js
var Entity = function Entity(params) {
  var config = Object.assign({
    uuid: '',
    x: 0,
    y: 0
  }, params);
  this.x = config.x;
  this.y = config.y;
};

/* harmony default export */ var entities_entity = (Entity);
// CONCATENATED MODULE: ./src/entities/entities-system.js


var EntitiesSystem = function EntitiesSystem() {
  this.cache = {};
};

EntitiesSystem.prototype.create = function (config) {
  config.uuid = this.uuid();
  var entity = new entities_entity(config);
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
var Loop = function Loop(config) {
  this.fps = config.fps;
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
// CONCATENATED MODULE: ./src/network/network-system-server.js
var Network = function Network(config) {
  var _this = this;

  this.socket = config.socket;
  this.clients = {};
  this.inputsBuffer = [];
  this.socket.on('connection', function (client) {
    _this.clients[client.id] = client;
    client.emit('connection', client.id);
    client.on('client-inputs', function (inputs) {
      _this.inputsBuffer.push(inputs);
    });

    _this.onConnect(client);
  });
};

Network.prototype.onConnect = function () {};

Network.prototype.sendEntities = function (entities) {
  this.socket.emit('entities', entities);
};

Network.prototype.update = function (entities) {};

/* harmony default export */ var network_system_server = (Network);
// CONCATENATED MODULE: ./src/scene/scene.js
var Scene = function Scene(params) {
  var config = Object.assign({
    create: function create() {},
    update: function update() {}
  }, params);
  this.create = config.create;
  this.update = config.update;
};

/* harmony default export */ var scene = (Scene);
// CONCATENATED MODULE: ./src/scene/scene-system.js


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





var sync_engine_server_SyncEngineServer = function SyncEngineServer(config) {
  var _this = this;

  this.entities = new entities_system();
  this.loop = new loop(config.loop);
  this.network = new network_system_server(config.network);
  this.scene = new scene_system();

  this.loop.onStep = function () {
    if (_this.scene.current) {
      if (_this.scene.mustCreate) {
        _this.scene.current.create(_this);

        _this.scene.requestUpdate();
      }

      if (_this.scene.mustUpdate) {
        _this.scene.current.update(_this);

        console.log(_this.entities.cache);

        _this.network.sendEntities(_this.entities.cache);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9TeW5jRW5naW5lU2VydmVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL1N5bmNFbmdpbmVTZXJ2ZXIvLi9zcmMvZW50aXRpZXMvZW50aXR5LmpzIiwid2VicGFjazovL1N5bmNFbmdpbmVTZXJ2ZXIvLi9zcmMvZW50aXRpZXMvZW50aXRpZXMtc3lzdGVtLmpzIiwid2VicGFjazovL1N5bmNFbmdpbmVTZXJ2ZXIvLi9zcmMvbG9vcC9sb29wLmpzIiwid2VicGFjazovL1N5bmNFbmdpbmVTZXJ2ZXIvLi9zcmMvbmV0d29yay9uZXR3b3JrLXN5c3RlbS1zZXJ2ZXIuanMiLCJ3ZWJwYWNrOi8vU3luY0VuZ2luZVNlcnZlci8uL3NyYy9zY2VuZS9zY2VuZS5qcyIsIndlYnBhY2s6Ly9TeW5jRW5naW5lU2VydmVyLy4vc3JjL3NjZW5lL3NjZW5lLXN5c3RlbS5qcyIsIndlYnBhY2s6Ly9TeW5jRW5naW5lU2VydmVyLy4vc3JjL3N5bmMtZW5naW5lLXNlcnZlci5qcyJdLCJuYW1lcyI6WyJFbnRpdHkiLCJwYXJhbXMiLCJjb25maWciLCJPYmplY3QiLCJhc3NpZ24iLCJ1dWlkIiwieCIsInkiLCJFbnRpdGllc1N5c3RlbSIsImNhY2hlIiwicHJvdG90eXBlIiwiY3JlYXRlIiwiZW50aXR5IiwicmVwbGFjZSIsImMiLCJyIiwiTWF0aCIsInJhbmRvbSIsInYiLCJ0b1N0cmluZyIsIkxvb3AiLCJmcHMiLCJmcmFtZSIsInJ1biIsInNldEludGVydmFsIiwic3RlcCIsIm9uU3RlcCIsIk5ldHdvcmsiLCJzb2NrZXQiLCJjbGllbnRzIiwiaW5wdXRzQnVmZmVyIiwib24iLCJjbGllbnQiLCJpZCIsImVtaXQiLCJpbnB1dHMiLCJwdXNoIiwib25Db25uZWN0Iiwic2VuZEVudGl0aWVzIiwiZW50aXRpZXMiLCJ1cGRhdGUiLCJTY2VuZSIsIlNjZW5lU3lzdGVtIiwiY3VycmVudCIsInJlcXVlc3RlZCIsIm11c3RDcmVhdGUiLCJtdXN0VXBkYXRlIiwibXVzdFN3aXRjaCIsInNjZW5lIiwicmVxdWVzdFN3aXRjaCIsInJlcXVlc3RDcmVhdGUiLCJyZXF1ZXN0VXBkYXRlIiwiU3luY0VuZ2luZVNlcnZlciIsIkVudGl0aWVzIiwibG9vcCIsIm5ldHdvcmsiLCJjb25zb2xlIiwibG9nIiwic3RhcnQiXSwibWFwcGluZ3MiOiI7O1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7QUNsRkEsSUFBTUEsTUFBTSxHQUFHLFNBQVRBLE1BQVMsQ0FBVUMsTUFBVixFQUFrQjtBQUMvQixNQUFNQyxNQUFNLEdBQUdDLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjO0FBQzNCQyxRQUFJLEVBQUUsRUFEcUI7QUFFM0JDLEtBQUMsRUFBRSxDQUZ3QjtBQUczQkMsS0FBQyxFQUFFO0FBSHdCLEdBQWQsRUFJWk4sTUFKWSxDQUFmO0FBTUEsT0FBS0ssQ0FBTCxHQUFTSixNQUFNLENBQUNJLENBQWhCO0FBQ0EsT0FBS0MsQ0FBTCxHQUFTTCxNQUFNLENBQUNL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Q0FBV0wsT0FBWCxDQUFtQkgsTUFBbkIsQ0FBMEIsS0FBMUI7O0FBQ0FnQixlQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFJLENBQUNsQixRQUFMLENBQWM5QixLQUExQjs7QUFDQSxhQUFJLENBQUM4QyxPQUFMLENBQWFqQixZQUFiLENBQTBCLEtBQUksQ0FBQ0MsUUFBTCxDQUFjOUIsS0FBeEM7QUFDRDtBQUNGOztBQUNELFFBQUksS0FBSSxDQUFDdUMsS0FBTCxDQUFXRCxVQUFmLEVBQTJCO0FBQ3pCLFdBQUksQ0FBQ0MsS0FBTCxDQUFXTCxPQUFYLEdBQXFCLEtBQUksQ0FBQ0ssS0FBTCxDQUFXSixTQUFoQzs7QUFDQSxXQUFJLENBQUNJLEtBQUwsQ0FBV0UsYUFBWDtBQUNEO0FBQ0YsR0FoQkQ7QUFpQkQsQ0F2QkQ7O0FBeUJBRSxtQ0FBZ0IsQ0FBQzFDLFNBQWpCLENBQTJCZ0QsS0FBM0IsR0FBbUMsWUFBWTtBQUM3QyxPQUFLSixJQUFMLENBQVUvQixHQUFWO0FBQ0QsQ0FGRDs7QUFJZTZCLDJIQUFmLEUiLCJmaWxlIjoic3luYy1lbmdpbmUtc2VydmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiY29uc3QgRW50aXR5ID0gZnVuY3Rpb24gKHBhcmFtcykge1xuICBjb25zdCBjb25maWcgPSBPYmplY3QuYXNzaWduKHtcbiAgICB1dWlkOiAnJyxcbiAgICB4OiAwLFxuICAgIHk6IDBcbiAgfSwgcGFyYW1zKVxuXG4gIHRoaXMueCA9IGNvbmZpZy54XG4gIHRoaXMueSA9IGNvbmZpZy55XG59XG5cbmV4cG9ydCBkZWZhdWx0IEVudGl0eVxuIiwiaW1wb3J0IEVudGl0eSBmcm9tICcuL2VudGl0eSdcblxuY29uc3QgRW50aXRpZXNTeXN0ZW0gPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuY2FjaGUgPSB7fVxufVxuXG5FbnRpdGllc1N5c3RlbS5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKGNvbmZpZykge1xuICBjb25maWcudXVpZCA9IHRoaXMudXVpZCgpXG4gIGNvbnN0IGVudGl0eSA9IG5ldyBFbnRpdHkoY29uZmlnKVxuICB0aGlzLmNhY2hlW2NvbmZpZy51dWlkXSA9IGVudGl0eVxuICByZXR1cm4gZW50aXR5XG59XG5cbkVudGl0aWVzU3lzdGVtLnByb3RvdHlwZS51dWlkID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gJ3h4eHh4eHh4LXh4eHgtNHh4eC15eHh4LXh4eHh4eHh4eHh4eCcucmVwbGFjZSgvW3h5XS9nLCBmdW5jdGlvbiAoYykge1xuICAgIGNvbnN0IHIgPSBNYXRoLnJhbmRvbSgpICogMTYgfCAwXG4gICAgY29uc3QgdiA9IGMgPT09ICd4JyA/IHIgOiAociAmIDB4MyB8IDB4OClcbiAgICByZXR1cm4gdi50b1N0cmluZygxNilcbiAgfSlcbn1cblxuZXhwb3J0IGRlZmF1bHQgRW50aXRpZXNTeXN0ZW1cbiIsImNvbnN0IExvb3AgPSBmdW5jdGlvbiAoY29uZmlnKSB7XG4gIHRoaXMuZnBzID0gY29uZmlnLmZwc1xuICB0aGlzLmZyYW1lID0gMFxufVxuXG5Mb29wLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gIHNldEludGVydmFsKCgpID0+IHtcbiAgICB0aGlzLnN0ZXAoKVxuICB9LCAxMDAwIC8gdGhpcy5mcHMpXG59XG5cbkxvb3AucHJvdG90eXBlLnN0ZXAgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuZnJhbWUrK1xuICB0aGlzLm9uU3RlcCgpXG59XG5cbkxvb3AucHJvdG90eXBlLm9uU3RlcCA9IGZ1bmN0aW9uICgpIHt9XG5cbmV4cG9ydCBkZWZhdWx0IExvb3BcbiIsImNvbnN0IE5ldHdvcmsgPSBmdW5jdGlvbiAoY29uZmlnKSB7XG4gIHRoaXMuc29ja2V0ID0gY29uZmlnLnNvY2tldFxuICB0aGlzLmNsaWVudHMgPSB7fVxuICB0aGlzLmlucHV0c0J1ZmZlciA9IFtdXG5cbiAgdGhpcy5zb2NrZXQub24oJ2Nvbm5lY3Rpb24nLCAoY2xpZW50KSA9PiB7XG4gICAgdGhpcy5jbGllbnRzW2NsaWVudC5pZF0gPSBjbGllbnRcbiAgICBjbGllbnQuZW1pdCgnY29ubmVjdGlvbicsIGNsaWVudC5pZClcbiAgICBjbGllbnQub24oJ2NsaWVudC1pbnB1dHMnLCAoaW5wdXRzKSA9PiB7XG4gICAgICB0aGlzLmlucHV0c0J1ZmZlci5wdXNoKGlucHV0cylcbiAgICB9KVxuICAgIHRoaXMub25Db25uZWN0KGNsaWVudClcbiAgfSlcbn1cblxuTmV0d29yay5wcm90b3R5cGUub25Db25uZWN0ID0gZnVuY3Rpb24gKCkge31cblxuTmV0d29yay5wcm90b3R5cGUuc2VuZEVudGl0aWVzID0gZnVuY3Rpb24gKGVudGl0aWVzKSB7XG4gIHRoaXMuc29ja2V0LmVtaXQoJ2VudGl0aWVzJywgZW50aXRpZXMpXG59XG5cbk5ldHdvcmsucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChlbnRpdGllcykge1xufVxuXG5leHBvcnQgZGVmYXVsdCBOZXR3b3JrXG4iLCJjb25zdCBTY2VuZSA9IGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgY29uc3QgY29uZmlnID0gT2JqZWN0LmFzc2lnbih7XG4gICAgY3JlYXRlOiAoKSA9PiB7fSxcbiAgICB1cGRhdGU6ICgpID0+IHt9XG4gIH0sIHBhcmFtcylcblxuICB0aGlzLmNyZWF0ZSA9IGNvbmZpZy5jcmVhdGVcbiAgdGhpcy51cGRhdGUgPSBjb25maWcudXBkYXRlXG59XG5cbmV4cG9ydCBkZWZhdWx0IFNjZW5lXG4iLCJpbXBvcnQgU2NlbmUgZnJvbSAnLi9zY2VuZSdcblxuY29uc3QgU2NlbmVTeXN0ZW0gPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuY3VycmVudCA9IG51bGxcbiAgdGhpcy5yZXF1ZXN0ZWQgPSBudWxsXG4gIHRoaXMubXVzdENyZWF0ZSA9IGZhbHNlXG4gIHRoaXMubXVzdFVwZGF0ZSA9IGZhbHNlXG4gIHRoaXMubXVzdFN3aXRjaCA9IGZhbHNlXG59XG5cblNjZW5lU3lzdGVtLnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAoY29uZmlnKSB7XG4gIHJldHVybiBuZXcgU2NlbmUoY29uZmlnKVxufVxuXG5TY2VuZVN5c3RlbS5wcm90b3R5cGUuc3dpdGNoID0gZnVuY3Rpb24gKHNjZW5lKSB7XG4gIHRoaXMucmVxdWVzdGVkID0gc2NlbmVcbiAgdGhpcy5yZXF1ZXN0U3dpdGNoKClcbn1cblxuU2NlbmVTeXN0ZW0ucHJvdG90eXBlLnJlcXVlc3RDcmVhdGUgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMubXVzdENyZWF0ZSA9IHRydWVcbiAgdGhpcy5tdXN0VXBkYXRlID0gZmFsc2VcbiAgdGhpcy5tdXN0U3dpdGNoID0gZmFsc2Vcbn1cblxuU2NlbmVTeXN0ZW0ucHJvdG90eXBlLnJlcXVlc3RVcGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMubXVzdENyZWF0ZSA9IGZhbHNlXG4gIHRoaXMubXVzdFVwZGF0ZSA9IHRydWVcbiAgdGhpcy5tdXN0U3dpdGNoID0gZmFsc2Vcbn1cblxuU2NlbmVTeXN0ZW0ucHJvdG90eXBlLnJlcXVlc3RTd2l0Y2ggPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMubXVzdENyZWF0ZSA9IGZhbHNlXG4gIHRoaXMubXVzdFVwZGF0ZSA9IGZhbHNlXG4gIHRoaXMubXVzdFN3aXRjaCA9IHRydWVcbn1cblxuZXhwb3J0IGRlZmF1bHQgU2NlbmVTeXN0ZW1cbiIsImltcG9ydCBFbnRpdGllcyBmcm9tICcuL2VudGl0aWVzL2VudGl0aWVzLXN5c3RlbSdcbmltcG9ydCBMb29wIGZyb20gJy4vbG9vcC9sb29wJ1xuaW1wb3J0IE5ldHdvcmsgZnJvbSAnLi9uZXR3b3JrL25ldHdvcmstc3lzdGVtLXNlcnZlcidcbmltcG9ydCBTY2VuZSBmcm9tICcuL3NjZW5lL3NjZW5lLXN5c3RlbSdcblxuY29uc3QgU3luY0VuZ2luZVNlcnZlciA9IGZ1bmN0aW9uIChjb25maWcpIHtcbiAgdGhpcy5lbnRpdGllcyA9IG5ldyBFbnRpdGllcygpXG4gIHRoaXMubG9vcCA9IG5ldyBMb29wKGNvbmZpZy5sb29wKVxuICB0aGlzLm5ldHdvcmsgPSBuZXcgTmV0d29yayhjb25maWcubmV0d29yaylcbiAgdGhpcy5zY2VuZSA9IG5ldyBTY2VuZSgpXG5cbiAgdGhpcy5sb29wLm9uU3RlcCA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5zY2VuZS5jdXJyZW50KSB7XG4gICAgICBpZiAodGhpcy5zY2VuZS5tdXN0Q3JlYXRlKSB7XG4gICAgICAgIHRoaXMuc2NlbmUuY3VycmVudC5jcmVhdGUodGhpcylcbiAgICAgICAgdGhpcy5zY2VuZS5yZXF1ZXN0VXBkYXRlKClcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnNjZW5lLm11c3RVcGRhdGUpIHtcbiAgICAgICAgdGhpcy5zY2VuZS5jdXJyZW50LnVwZGF0ZSh0aGlzKVxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmVudGl0aWVzLmNhY2hlKVxuICAgICAgICB0aGlzLm5ldHdvcmsuc2VuZEVudGl0aWVzKHRoaXMuZW50aXRpZXMuY2FjaGUpXG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLnNjZW5lLm11c3RTd2l0Y2gpIHtcbiAgICAgIHRoaXMuc2NlbmUuY3VycmVudCA9IHRoaXMuc2NlbmUucmVxdWVzdGVkXG4gICAgICB0aGlzLnNjZW5lLnJlcXVlc3RDcmVhdGUoKVxuICAgIH1cbiAgfVxufVxuXG5TeW5jRW5naW5lU2VydmVyLnByb3RvdHlwZS5zdGFydCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5sb29wLnJ1bigpXG59XG5cbmV4cG9ydCBkZWZhdWx0IFN5bmNFbmdpbmVTZXJ2ZXJcbiJdLCJzb3VyY2VSb290IjoiIn0=