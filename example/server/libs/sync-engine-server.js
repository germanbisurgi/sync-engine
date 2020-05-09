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
    id: '',
    x: 0,
    y: 0,
    a: 0,
    image: '',
    sx: 0,
    sy: 0,
    sw: 0,
    sh: 0,
    w: 50,
    h: 50,
    ax: 0.5,
    ay: 0.5,
    s: 1
  }, params); // todo: bodyId

  this.id = config.id;
  this.x = config.x;
  this.y = config.y;
  this.a = config.a;
  this.image = config.image;
  this.sx = config.sx;
  this.sy = config.sy;
  this.sw = config.sw;
  this.sh = config.sh;
  this.w = config.w;
  this.h = config.h;
  this.ax = config.ax;
  this.ay = config.ay;
  this.s = config.s;
};

/* harmony default export */ var entities_entity = (Entity);
// CONCATENATED MODULE: ./src/entities/entities-system.js


var EntitiesSystem = function EntitiesSystem() {
  this.cache = {};
};

EntitiesSystem.prototype.create = function (params) {
  var config = Object.assign({
    id: this.createId(),
    x: 0,
    y: 0
  }, params);
  var entity = new entities_entity(config);
  this.cache[config.id] = entity;
  return entity;
};

EntitiesSystem.prototype.createId = function () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0;
    var v = c === 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
};

/* harmony default export */ var entities_system = (EntitiesSystem);
// CONCATENATED MODULE: ./src/loop/loop.js
var Loop = function Loop(params) {
  var config = Object.assign({
    fps: 50
  }, params);
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
var Network = function Network(params, engine) {
  var _this = this;

  var config = Object.assign({
    ups: 30,
    socket: null
  }, params);
  this.engine = engine;
  this.ups = config.ups;
  this.socket = config.socket;
  this.clients = {};
  this.interval = setInterval(function () {
    _this.serverUpdate();
  }, 1000 / this.ups);
  this.socket.on('connection', function (client) {
    // add client to the client list
    client.inputs = [];
    _this.clients[client.id] = client; // send the client its id

    client.emit('connection', client.id); // do custom stuff when client connects

    _this.onConnection(client.id); // when client disconnects remove it from the clients list


    client.on('disconnect', function () {
      _this.onDisconnect(client.id);

      delete _this.clients[client.id];
    }); // when client send its inputs

    client.on('client-inputs', function (data) {
      client.inputs.push(data.inputs);
    });
  });
};

Network.prototype.onConnection = function () {};

Network.prototype.onDisconnect = function () {};

Network.prototype.serverUpdate = function () {
  this.socket.emit('server-update', {
    timestamp: Date.now(),
    entities: this.engine.entities.cache
  });
};

Network.prototype.update = function (entities) {};

/* harmony default export */ var network_system_server = (Network);
// CONCATENATED MODULE: ./src/scene/scene.js
var Scene = function Scene(params) {
  var config = Object.assign({
    preload: function preload() {},
    create: function create() {},
    update: function update() {}
  }, params);
  this.preload = config.preload;
  this.create = config.create;
  this.update = config.update;
};

/* harmony default export */ var scene = (Scene);
// CONCATENATED MODULE: ./src/scene/scene-system.js


var SceneSystem = function SceneSystem() {
  this.current = null;
  this.requested = null;
  this.mustPreload = false;
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

SceneSystem.prototype.requestPreload = function () {
  this.mustPreload = true;
  this.mustCreate = false;
  this.mustUpdate = false;
  this.mustSwitch = false;
};

SceneSystem.prototype.requestCreate = function () {
  this.mustPreload = false;
  this.mustCreate = true;
  this.mustUpdate = false;
  this.mustSwitch = false;
};

SceneSystem.prototype.requestUpdate = function () {
  this.mustPreload = false;
  this.mustCreate = false;
  this.mustUpdate = true;
  this.mustSwitch = false;
};

SceneSystem.prototype.requestSwitch = function () {
  this.mustPreload = false;
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
  this.network = new network_system_server(config.network, this);
  this.scene = new scene_system();

  this.loop.onStep = function () {
    if (_this.scene.current) {
      if (_this.scene.mustCreate) {
        _this.scene.current.create(_this);

        _this.scene.requestUpdate();
      }

      if (_this.scene.mustUpdate) {
        console.log('traffic', JSON.stringify(_this.entities.cache).split('').length);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9TeW5jRW5naW5lU2VydmVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL1N5bmNFbmdpbmVTZXJ2ZXIvLi9zcmMvZW50aXRpZXMvZW50aXR5LmpzIiwid2VicGFjazovL1N5bmNFbmdpbmVTZXJ2ZXIvLi9zcmMvZW50aXRpZXMvZW50aXRpZXMtc3lzdGVtLmpzIiwid2VicGFjazovL1N5bmNFbmdpbmVTZXJ2ZXIvLi9zcmMvbG9vcC9sb29wLmpzIiwid2VicGFjazovL1N5bmNFbmdpbmVTZXJ2ZXIvLi9zcmMvbmV0d29yay9uZXR3b3JrLXN5c3RlbS1zZXJ2ZXIuanMiLCJ3ZWJwYWNrOi8vU3luY0VuZ2luZVNlcnZlci8uL3NyYy9zY2VuZS9zY2VuZS5qcyIsIndlYnBhY2s6Ly9TeW5jRW5naW5lU2VydmVyLy4vc3JjL3NjZW5lL3NjZW5lLXN5c3RlbS5qcyIsIndlYnBhY2s6Ly9TeW5jRW5naW5lU2VydmVyLy4vc3JjL3N5bmMtZW5naW5lLXNlcnZlci5qcyJdLCJuYW1lcyI6WyJFbnRpdHkiLCJwYXJhbXMiLCJjb25maWciLCJPYmplY3QiLCJhc3NpZ24iLCJpZCIsIngiLCJ5IiwiYSIsImltYWdlIiwic3giLCJzeSIsInN3Iiwic2giLCJ3IiwiaCIsImF4IiwiYXkiLCJzIiwiRW50aXRpZXNTeXN0ZW0iLCJjYWNoZSIsInByb3RvdHlwZSIsImNyZWF0ZSIsImNyZWF0ZUlkIiwiZW50aXR5IiwicmVwbGFjZSIsImMiLCJyIiwiTWF0aCIsInJhbmRvbSIsInYiLCJ0b1N0cmluZyIsIkxvb3AiLCJmcHMiLCJmcmFtZSIsInJ1biIsInNldEludGVydmFsIiwic3RlcCIsIm9uU3RlcCIsIk5ldHdvcmsiLCJlbmdpbmUiLCJ1cHMiLCJzb2NrZXQiLCJjbGllbnRzIiwiaW50ZXJ2YWwiLCJzZXJ2ZXJVcGRhdGUiLCJvbiIsImNsaWVudCIsImlucHV0cyIsImVtaXQiLCJvbkNvbm5lY3Rpb24iLCJvbkRpc2Nvbm5lY3QiLCJkYXRhIiwicHVzaCIsInRpbWVzdGFtcCIsIkRhdGUiLCJub3ciLCJlbnRpdGllcyIsInVwZGF0ZSIsIlNjZW5lIiwicHJlbG9hZCIsIlNjZW5lU3lzdGVtIiwiY3VycmVudCIsInJlcXVlc3RlZCIsIm11c3RQcmVsb2FkIiwibXVzdENyZWF0ZSIsIm11c3RVcGRhdGUiLCJtdXN0U3dpdGNoIiwic2NlbmUiLCJyZXF1ZXN0U3dpdGNoIiwicmVxdWVzdFByZWxvYWQiLCJyZXF1ZXN0Q3JlYXRlIiwicmVxdWVzdFVwZGF0ZSIsIlN5bmNFbmdpbmVTZXJ2ZXIiLCJFbnRpdGllcyIsImxvb3AiLCJuZXR3b3JrIiwiY29uc29sZSIsImxvZyIsIkpTT04iLCJzdHJpbmdpZnkiLCJzcGxpdCIsImxlbmd0aCIsInN0YXJ0Il0sIm1hcHBpbmdzIjoiOztRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBLElBQU1BLE1BQU0sR0FBRyxTQUFUQSxNQUFTLENBQVVDLE1BQVYsRUFBa0I7QUFDL0IsTUFB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dXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsImNvbnN0IEVudGl0eSA9IGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgY29uc3QgY29uZmlnID0gT2JqZWN0LmFzc2lnbih7XG4gICAgaWQ6ICcnLFxuICAgIHg6IDAsXG4gICAgeTogMCxcbiAgICBhOiAwLFxuICAgIGltYWdlOiAnJyxcbiAgICBzeDogMCxcbiAgICBzeTogMCxcbiAgICBzdzogMCxcbiAgICBzaDogMCxcbiAgICB3OiA1MCxcbiAgICBoOiA1MCxcbiAgICBheDogMC41LFxuICAgIGF5OiAwLjUsXG4gICAgczogMVxuICB9LCBwYXJhbXMpXG5cbiAgLy8gdG9kbzogYm9keUlkXG5cbiAgdGhpcy5pZCA9IGNvbmZpZy5pZFxuICB0aGlzLnggPSBjb25maWcueFxuICB0aGlzLnkgPSBjb25maWcueVxuICB0aGlzLmEgPSBjb25maWcuYVxuICB0aGlzLmltYWdlID0gY29uZmlnLmltYWdlXG4gIHRoaXMuc3ggPSBjb25maWcuc3hcbiAgdGhpcy5zeSA9IGNvbmZpZy5zeVxuICB0aGlzLnN3ID0gY29uZmlnLnN3XG4gIHRoaXMuc2ggPSBjb25maWcuc2hcbiAgdGhpcy53ID0gY29uZmlnLndcbiAgdGhpcy5oID0gY29uZmlnLmhcbiAgdGhpcy5heCA9IGNvbmZpZy5heFxuICB0aGlzLmF5ID0gY29uZmlnLmF5XG4gIHRoaXMucyA9IGNvbmZpZy5zXG59XG5cbmV4cG9ydCBkZWZhdWx0IEVudGl0eVxuIiwiaW1wb3J0IEVudGl0eSBmcm9tICcuL2VudGl0eSdcblxuY29uc3QgRW50aXRpZXNTeXN0ZW0gPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuY2FjaGUgPSB7fVxufVxuXG5FbnRpdGllc1N5c3RlbS5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKHBhcmFtcykge1xuICBjb25zdCBjb25maWcgPSBPYmplY3QuYXNzaWduKHtcbiAgICBpZDogdGhpcy5jcmVhdGVJZCgpLFxuICAgIHg6IDAsXG4gICAgeTogMFxuICB9LCBwYXJhbXMpXG4gIGNvbnN0IGVudGl0eSA9IG5ldyBFbnRpdHkoY29uZmlnKVxuICB0aGlzLmNhY2hlW2NvbmZpZy5pZF0gPSBlbnRpdHlcbiAgcmV0dXJuIGVudGl0eVxufVxuXG5FbnRpdGllc1N5c3RlbS5wcm90b3R5cGUuY3JlYXRlSWQgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiAneHh4eHh4eHgteHh4eC00eHh4LXl4eHgteHh4eHh4eHh4eHh4Jy5yZXBsYWNlKC9beHldL2csIGZ1bmN0aW9uIChjKSB7XG4gICAgY29uc3QgciA9IE1hdGgucmFuZG9tKCkgKiAxNiB8IDBcbiAgICBjb25zdCB2ID0gYyA9PT0gJ3gnID8gciA6IChyICYgMHgzIHwgMHg4KVxuICAgIHJldHVybiB2LnRvU3RyaW5nKDE2KVxuICB9KVxufVxuXG5leHBvcnQgZGVmYXVsdCBFbnRpdGllc1N5c3RlbVxuIiwiY29uc3QgTG9vcCA9IGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgY29uc3QgY29uZmlnID0gT2JqZWN0LmFzc2lnbih7XG4gICAgZnBzOiA1MFxuICB9LCBwYXJhbXMpXG4gIHRoaXMuZnBzID0gY29uZmlnLmZwc1xuICB0aGlzLmZyYW1lID0gMFxufVxuXG5Mb29wLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gIHNldEludGVydmFsKCgpID0+IHtcbiAgICB0aGlzLnN0ZXAoKVxuICB9LCAxMDAwIC8gdGhpcy5mcHMpXG59XG5cbkxvb3AucHJvdG90eXBlLnN0ZXAgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuZnJhbWUrK1xuICB0aGlzLm9uU3RlcCgpXG59XG5cbkxvb3AucHJvdG90eXBlLm9uU3RlcCA9IGZ1bmN0aW9uICgpIHt9XG5cbmV4cG9ydCBkZWZhdWx0IExvb3BcbiIsImNvbnN0IE5ldHdvcmsgPSBmdW5jdGlvbiAocGFyYW1zLCBlbmdpbmUpIHtcbiAgY29uc3QgY29uZmlnID0gT2JqZWN0LmFzc2lnbih7XG4gICAgdXBzOiAzMCxcbiAgICBzb2NrZXQ6IG51bGxcbiAgfSwgcGFyYW1zKVxuICB0aGlzLmVuZ2luZSA9IGVuZ2luZVxuICB0aGlzLnVwcyA9IGNvbmZpZy51cHNcbiAgdGhpcy5zb2NrZXQgPSBjb25maWcuc29ja2V0XG4gIHRoaXMuY2xpZW50cyA9IHt9XG4gIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgdGhpcy5zZXJ2ZXJVcGRhdGUoKVxuICB9LCAxMDAwIC8gdGhpcy51cHMpXG5cbiAgdGhpcy5zb2NrZXQub24oJ2Nvbm5lY3Rpb24nLCAoY2xpZW50KSA9PiB7XG4gICAgLy8gYWRkIGNsaWVudCB0byB0aGUgY2xpZW50IGxpc3RcbiAgICBjbGllbnQuaW5wdXRzID0gW11cbiAgICB0aGlzLmNsaWVudHNbY2xpZW50LmlkXSA9IGNsaWVudFxuXG4gICAgLy8gc2VuZCB0aGUgY2xpZW50IGl0cyBpZFxuICAgIGNsaWVudC5lbWl0KCdjb25uZWN0aW9uJywgY2xpZW50LmlkKVxuXG4gICAgLy8gZG8gY3VzdG9tIHN0dWZmIHdoZW4gY2xpZW50IGNvbm5lY3RzXG4gICAgdGhpcy5vbkNvbm5lY3Rpb24oY2xpZW50LmlkKVxuXG4gICAgLy8gd2hlbiBjbGllbnQgZGlzY29ubmVjdHMgcmVtb3ZlIGl0IGZyb20gdGhlIGNsaWVudHMgbGlzdFxuICAgIGNsaWVudC5vbignZGlzY29ubmVjdCcsICgpID0+IHtcbiAgICAgIHRoaXMub25EaXNjb25uZWN0KGNsaWVudC5pZClcbiAgICAgIGRlbGV0ZSB0aGlzLmNsaWVudHNbY2xpZW50LmlkXVxuICAgIH0pXG5cbiAgICAvLyB3aGVuIGNsaWVudCBzZW5kIGl0cyBpbnB1dHNcbiAgICBjbGllbnQub24oJ2NsaWVudC1pbnB1dHMnLCAoZGF0YSkgPT4ge1xuICAgICAgY2xpZW50LmlucHV0cy5wdXNoKGRhdGEuaW5wdXRzKVxuICAgIH0pXG4gIH0pXG59XG5cbk5ldHdvcmsucHJvdG90eXBlLm9uQ29ubmVjdGlvbiA9IGZ1bmN0aW9uICgpIHt9XG5cbk5ldHdvcmsucHJvdG90eXBlLm9uRGlzY29ubmVjdCA9IGZ1bmN0aW9uICgpIHt9XG5cbk5ldHdvcmsucHJvdG90eXBlLnNlcnZlclVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5zb2NrZXQuZW1pdCgnc2VydmVyLXVwZGF0ZScsIHtcbiAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgZW50aXRpZXM6IHRoaXMuZW5naW5lLmVudGl0aWVzLmNhY2hlXG4gIH0pXG59XG5cbk5ldHdvcmsucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChlbnRpdGllcykge1xufVxuXG5leHBvcnQgZGVmYXVsdCBOZXR3b3JrXG4iLCJjb25zdCBTY2VuZSA9IGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgY29uc3QgY29uZmlnID0gT2JqZWN0LmFzc2lnbih7XG4gICAgcHJlbG9hZDogKCkgPT4ge30sXG4gICAgY3JlYXRlOiAoKSA9PiB7fSxcbiAgICB1cGRhdGU6ICgpID0+IHt9XG4gIH0sIHBhcmFtcylcblxuICB0aGlzLnByZWxvYWQgPSBjb25maWcucHJlbG9hZFxuICB0aGlzLmNyZWF0ZSA9IGNvbmZpZy5jcmVhdGVcbiAgdGhpcy51cGRhdGUgPSBjb25maWcudXBkYXRlXG59XG5cbmV4cG9ydCBkZWZhdWx0IFNjZW5lXG4iLCJpbXBvcnQgU2NlbmUgZnJvbSAnLi9zY2VuZSdcblxuY29uc3QgU2NlbmVTeXN0ZW0gPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuY3VycmVudCA9IG51bGxcbiAgdGhpcy5yZXF1ZXN0ZWQgPSBudWxsXG4gIHRoaXMubXVzdFByZWxvYWQgPSBmYWxzZVxuICB0aGlzLm11c3RDcmVhdGUgPSBmYWxzZVxuICB0aGlzLm11c3RVcGRhdGUgPSBmYWxzZVxuICB0aGlzLm11c3RTd2l0Y2ggPSBmYWxzZVxufVxuXG5TY2VuZVN5c3RlbS5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKGNvbmZpZykge1xuICByZXR1cm4gbmV3IFNjZW5lKGNvbmZpZylcbn1cblxuU2NlbmVTeXN0ZW0ucHJvdG90eXBlLnN3aXRjaCA9IGZ1bmN0aW9uIChzY2VuZSkge1xuICB0aGlzLnJlcXVlc3RlZCA9IHNjZW5lXG4gIHRoaXMucmVxdWVzdFN3aXRjaCgpXG59XG5cblNjZW5lU3lzdGVtLnByb3RvdHlwZS5yZXF1ZXN0UHJlbG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5tdXN0UHJlbG9hZCA9IHRydWVcbiAgdGhpcy5tdXN0Q3JlYXRlID0gZmFsc2VcbiAgdGhpcy5tdXN0VXBkYXRlID0gZmFsc2VcbiAgdGhpcy5tdXN0U3dpdGNoID0gZmFsc2Vcbn1cblxuU2NlbmVTeXN0ZW0ucHJvdG90eXBlLnJlcXVlc3RDcmVhdGUgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMubXVzdFByZWxvYWQgPSBmYWxzZVxuICB0aGlzLm11c3RDcmVhdGUgPSB0cnVlXG4gIHRoaXMubXVzdFVwZGF0ZSA9IGZhbHNlXG4gIHRoaXMubXVzdFN3aXRjaCA9IGZhbHNlXG59XG5cblNjZW5lU3lzdGVtLnByb3RvdHlwZS5yZXF1ZXN0VXBkYXRlID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLm11c3RQcmVsb2FkID0gZmFsc2VcbiAgdGhpcy5tdXN0Q3JlYXRlID0gZmFsc2VcbiAgdGhpcy5tdXN0VXBkYXRlID0gdHJ1ZVxuICB0aGlzLm11c3RTd2l0Y2ggPSBmYWxzZVxufVxuXG5TY2VuZVN5c3RlbS5wcm90b3R5cGUucmVxdWVzdFN3aXRjaCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5tdXN0UHJlbG9hZCA9IGZhbHNlXG4gIHRoaXMubXVzdENyZWF0ZSA9IGZhbHNlXG4gIHRoaXMubXVzdFVwZGF0ZSA9IGZhbHNlXG4gIHRoaXMubXVzdFN3aXRjaCA9IHRydWVcbn1cblxuZXhwb3J0IGRlZmF1bHQgU2NlbmVTeXN0ZW1cbiIsImltcG9ydCBFbnRpdGllcyBmcm9tICcuL2VudGl0aWVzL2VudGl0aWVzLXN5c3RlbSdcbmltcG9ydCBMb29wIGZyb20gJy4vbG9vcC9sb29wJ1xuaW1wb3J0IE5ldHdvcmsgZnJvbSAnLi9uZXR3b3JrL25ldHdvcmstc3lzdGVtLXNlcnZlcidcbmltcG9ydCBTY2VuZSBmcm9tICcuL3NjZW5lL3NjZW5lLXN5c3RlbSdcblxuY29uc3QgU3luY0VuZ2luZVNlcnZlciA9IGZ1bmN0aW9uIChjb25maWcpIHtcbiAgdGhpcy5lbnRpdGllcyA9IG5ldyBFbnRpdGllcygpXG4gIHRoaXMubG9vcCA9IG5ldyBMb29wKGNvbmZpZy5sb29wKVxuICB0aGlzLm5ldHdvcmsgPSBuZXcgTmV0d29yayhjb25maWcubmV0d29yaywgdGhpcylcbiAgdGhpcy5zY2VuZSA9IG5ldyBTY2VuZSgpXG5cbiAgdGhpcy5sb29wLm9uU3RlcCA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5zY2VuZS5jdXJyZW50KSB7XG4gICAgICBpZiAodGhpcy5zY2VuZS5tdXN0Q3JlYXRlKSB7XG4gICAgICAgIHRoaXMuc2NlbmUuY3VycmVudC5jcmVhdGUodGhpcylcbiAgICAgICAgdGhpcy5zY2VuZS5yZXF1ZXN0VXBkYXRlKClcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnNjZW5lLm11c3RVcGRhdGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3RyYWZmaWMnLCBKU09OLnN0cmluZ2lmeSh0aGlzLmVudGl0aWVzLmNhY2hlKS5zcGxpdCgnJykubGVuZ3RoKVxuICAgICAgICB0aGlzLnNjZW5lLmN1cnJlbnQudXBkYXRlKHRoaXMpXG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLnNjZW5lLm11c3RTd2l0Y2gpIHtcbiAgICAgIHRoaXMuc2NlbmUuY3VycmVudCA9IHRoaXMuc2NlbmUucmVxdWVzdGVkXG4gICAgICB0aGlzLnNjZW5lLnJlcXVlc3RDcmVhdGUoKVxuICAgIH1cbiAgfVxufVxuXG5TeW5jRW5naW5lU2VydmVyLnByb3RvdHlwZS5zdGFydCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5sb29wLnJ1bigpXG59XG5cbmV4cG9ydCBkZWZhdWx0IFN5bmNFbmdpbmVTZXJ2ZXJcbiJdLCJzb3VyY2VSb290IjoiIn0=