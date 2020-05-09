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

Network.prototype.serverUpdate = function (entities) {
  this.socket.emit('server-update', {
    timestamp: Date.now(),
    entities: entities
  });
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

        _this.network.serverUpdate(_this.entities.cache);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9TeW5jRW5naW5lU2VydmVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL1N5bmNFbmdpbmVTZXJ2ZXIvLi9zcmMvZW50aXRpZXMvZW50aXR5LmpzIiwid2VicGFjazovL1N5bmNFbmdpbmVTZXJ2ZXIvLi9zcmMvZW50aXRpZXMvZW50aXRpZXMtc3lzdGVtLmpzIiwid2VicGFjazovL1N5bmNFbmdpbmVTZXJ2ZXIvLi9zcmMvbG9vcC9sb29wLmpzIiwid2VicGFjazovL1N5bmNFbmdpbmVTZXJ2ZXIvLi9zcmMvbmV0d29yay9uZXR3b3JrLXN5c3RlbS1zZXJ2ZXIuanMiLCJ3ZWJwYWNrOi8vU3luY0VuZ2luZVNlcnZlci8uL3NyYy9zY2VuZS9zY2VuZS5qcyIsIndlYnBhY2s6Ly9TeW5jRW5naW5lU2VydmVyLy4vc3JjL3NjZW5lL3NjZW5lLXN5c3RlbS5qcyIsIndlYnBhY2s6Ly9TeW5jRW5naW5lU2VydmVyLy4vc3JjL3N5bmMtZW5naW5lLXNlcnZlci5qcyJdLCJuYW1lcyI6WyJFbnRpdHkiLCJwYXJhbXMiLCJjb25maWciLCJPYmplY3QiLCJhc3NpZ24iLCJpZCIsIngiLCJ5IiwiRW50aXRpZXNTeXN0ZW0iLCJjYWNoZSIsInByb3RvdHlwZSIsImNyZWF0ZSIsImNyZWF0ZUlkIiwiZW50aXR5IiwicmVwbGFjZSIsImMiLCJyIiwiTWF0aCIsInJhbmRvbSIsInYiLCJ0b1N0cmluZyIsIkxvb3AiLCJmcHMiLCJmcmFtZSIsInJ1biIsInNldEludGVydmFsIiwic3RlcCIsIm9uU3RlcCIsIk5ldHdvcmsiLCJzb2NrZXQiLCJjbGllbnRzIiwib24iLCJjbGllbnQiLCJpbnB1dHMiLCJlbWl0Iiwib25Db25uZWN0aW9uIiwib25EaXNjb25uZWN0IiwiZGF0YSIsInB1c2giLCJzZXJ2ZXJVcGRhdGUiLCJlbnRpdGllcyIsInRpbWVzdGFtcCIsIkRhdGUiLCJub3ciLCJ1cGRhdGUiLCJTY2VuZSIsIlNjZW5lU3lzdGVtIiwiY3VycmVudCIsInJlcXVlc3RlZCIsIm11c3RDcmVhdGUiLCJtdXN0VXBkYXRlIiwibXVzdFN3aXRjaCIsInNjZW5lIiwicmVxdWVzdFN3aXRjaCIsInJlcXVlc3RDcmVhdGUiLCJyZXF1ZXN0VXBkYXRlIiwiU3luY0VuZ2luZVNlcnZlciIsIkVudGl0aWVzIiwibG9vcCIsIm5ldHdvcmsiLCJjb25zb2xlIiwibG9nIiwic3RhcnQiXSwibWFwcGluZ3MiOiI7O1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7QUNsRkEsSUFBTUEsTUFBTSxHQUFHLFNBQVRBLE1BQVMsQ0FBVUMsTUFBVixFQUFrQjtBQUMvQixNQUFNQyxNQUFNLEdBQUdDLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjO0FBQzNCQyxNQUFFLEVBQUUsRUFEdUI7QUFFM0JDLEtBQUMsRUFBRSxDQUZ3QjtBQUczQkMsS0FBQyxFQUFFO0FBSHdCLEdBQWQsRUFJWk4sTUFKWSxDQUFmO0FBTUEsT0FBS0ssQ0FBTCxHQUFTSixNQUFNLENBQUNJ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MkJvRCxLQUEzQixHQUFtQyxZQUFZO0FBQzdDLE9BQUtKLElBQUwsQ0FBVWxDLEdBQVY7QUFDRCxDQUZEOztBQUllZ0MsMkhBQWYsRSIsImZpbGUiOiJzeW5jLWVuZ2luZS1zZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCJjb25zdCBFbnRpdHkgPSBmdW5jdGlvbiAocGFyYW1zKSB7XG4gIGNvbnN0IGNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe1xuICAgIGlkOiAnJyxcbiAgICB4OiAwLFxuICAgIHk6IDBcbiAgfSwgcGFyYW1zKVxuXG4gIHRoaXMueCA9IGNvbmZpZy54XG4gIHRoaXMueSA9IGNvbmZpZy55XG59XG5cbmV4cG9ydCBkZWZhdWx0IEVudGl0eVxuIiwiaW1wb3J0IEVudGl0eSBmcm9tICcuL2VudGl0eSdcblxuY29uc3QgRW50aXRpZXNTeXN0ZW0gPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuY2FjaGUgPSB7fVxufVxuXG5FbnRpdGllc1N5c3RlbS5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKHBhcmFtcykge1xuICBjb25zdCBjb25maWcgPSBPYmplY3QuYXNzaWduKHtcbiAgICBpZDogdGhpcy5jcmVhdGVJZCgpLFxuICAgIHg6IDAsXG4gICAgeTogMFxuICB9LCBwYXJhbXMpXG4gIGNvbnN0IGVudGl0eSA9IG5ldyBFbnRpdHkoY29uZmlnKVxuICB0aGlzLmNhY2hlW2NvbmZpZy5pZF0gPSBlbnRpdHlcbiAgcmV0dXJuIGVudGl0eVxufVxuXG5FbnRpdGllc1N5c3RlbS5wcm90b3R5cGUuY3JlYXRlSWQgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiAneHh4eHh4eHgteHh4eC00eHh4LXl4eHgteHh4eHh4eHh4eHh4Jy5yZXBsYWNlKC9beHldL2csIGZ1bmN0aW9uIChjKSB7XG4gICAgY29uc3QgciA9IE1hdGgucmFuZG9tKCkgKiAxNiB8IDBcbiAgICBjb25zdCB2ID0gYyA9PT0gJ3gnID8gciA6IChyICYgMHgzIHwgMHg4KVxuICAgIHJldHVybiB2LnRvU3RyaW5nKDE2KVxuICB9KVxufVxuXG5leHBvcnQgZGVmYXVsdCBFbnRpdGllc1N5c3RlbVxuIiwiY29uc3QgTG9vcCA9IGZ1bmN0aW9uIChjb25maWcpIHtcbiAgdGhpcy5mcHMgPSBjb25maWcuZnBzXG4gIHRoaXMuZnJhbWUgPSAwXG59XG5cbkxvb3AucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgIHRoaXMuc3RlcCgpXG4gIH0sIDEwMDAgLyB0aGlzLmZwcylcbn1cblxuTG9vcC5wcm90b3R5cGUuc3RlcCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5mcmFtZSsrXG4gIHRoaXMub25TdGVwKClcbn1cblxuTG9vcC5wcm90b3R5cGUub25TdGVwID0gZnVuY3Rpb24gKCkge31cblxuZXhwb3J0IGRlZmF1bHQgTG9vcFxuIiwiY29uc3QgTmV0d29yayA9IGZ1bmN0aW9uIChjb25maWcpIHtcbiAgdGhpcy5zb2NrZXQgPSBjb25maWcuc29ja2V0XG4gIHRoaXMuY2xpZW50cyA9IHt9XG5cbiAgdGhpcy5zb2NrZXQub24oJ2Nvbm5lY3Rpb24nLCAoY2xpZW50KSA9PiB7XG4gICAgLy8gYWRkIGNsaWVudCB0byB0aGUgY2xpZW50IGxpc3RcbiAgICBjbGllbnQuaW5wdXRzID0gW11cbiAgICB0aGlzLmNsaWVudHNbY2xpZW50LmlkXSA9IGNsaWVudFxuXG4gICAgLy8gc2VuZCB0aGUgY2xpZW50IGl0cyBpZFxuICAgIGNsaWVudC5lbWl0KCdjb25uZWN0aW9uJywgY2xpZW50LmlkKVxuXG4gICAgLy8gZG8gY3VzdG9tIHN0dWZmIHdoZW4gY2xpZW50IGNvbm5lY3RzXG4gICAgdGhpcy5vbkNvbm5lY3Rpb24oY2xpZW50LmlkKVxuXG4gICAgLy8gd2hlbiBjbGllbnQgZGlzY29ubmVjdHMgcmVtb3ZlIGl0IGZyb20gdGhlIGNsaWVudHMgbGlzdFxuICAgIGNsaWVudC5vbignZGlzY29ubmVjdCcsICgpID0+IHtcbiAgICAgIHRoaXMub25EaXNjb25uZWN0KGNsaWVudC5pZClcbiAgICAgIGRlbGV0ZSB0aGlzLmNsaWVudHNbY2xpZW50LmlkXVxuICAgIH0pXG5cbiAgICAvLyB3aGVuIGNsaWVudCBzZW5kIGl0cyBpbnB1dHNcbiAgICBjbGllbnQub24oJ2NsaWVudC1pbnB1dHMnLCAoZGF0YSkgPT4ge1xuICAgICAgY2xpZW50LmlucHV0cy5wdXNoKGRhdGEuaW5wdXRzKVxuICAgIH0pXG4gIH0pXG59XG5cbk5ldHdvcmsucHJvdG90eXBlLm9uQ29ubmVjdGlvbiA9IGZ1bmN0aW9uICgpIHt9XG5cbk5ldHdvcmsucHJvdG90eXBlLm9uRGlzY29ubmVjdCA9IGZ1bmN0aW9uICgpIHt9XG5cbk5ldHdvcmsucHJvdG90eXBlLnNlcnZlclVwZGF0ZSA9IGZ1bmN0aW9uIChlbnRpdGllcykge1xuICB0aGlzLnNvY2tldC5lbWl0KCdzZXJ2ZXItdXBkYXRlJywge1xuICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICBlbnRpdGllczogZW50aXRpZXNcbiAgfSlcbn1cblxuTmV0d29yay5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGVudGl0aWVzKSB7XG59XG5cbmV4cG9ydCBkZWZhdWx0IE5ldHdvcmtcbiIsImNvbnN0IFNjZW5lID0gZnVuY3Rpb24gKHBhcmFtcykge1xuICBjb25zdCBjb25maWcgPSBPYmplY3QuYXNzaWduKHtcbiAgICBjcmVhdGU6ICgpID0+IHt9LFxuICAgIHVwZGF0ZTogKCkgPT4ge31cbiAgfSwgcGFyYW1zKVxuXG4gIHRoaXMuY3JlYXRlID0gY29uZmlnLmNyZWF0ZVxuICB0aGlzLnVwZGF0ZSA9IGNvbmZpZy51cGRhdGVcbn1cblxuZXhwb3J0IGRlZmF1bHQgU2NlbmVcbiIsImltcG9ydCBTY2VuZSBmcm9tICcuL3NjZW5lJ1xuXG5jb25zdCBTY2VuZVN5c3RlbSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5jdXJyZW50ID0gbnVsbFxuICB0aGlzLnJlcXVlc3RlZCA9IG51bGxcbiAgdGhpcy5tdXN0Q3JlYXRlID0gZmFsc2VcbiAgdGhpcy5tdXN0VXBkYXRlID0gZmFsc2VcbiAgdGhpcy5tdXN0U3dpdGNoID0gZmFsc2Vcbn1cblxuU2NlbmVTeXN0ZW0ucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uIChjb25maWcpIHtcbiAgcmV0dXJuIG5ldyBTY2VuZShjb25maWcpXG59XG5cblNjZW5lU3lzdGVtLnByb3RvdHlwZS5zd2l0Y2ggPSBmdW5jdGlvbiAoc2NlbmUpIHtcbiAgdGhpcy5yZXF1ZXN0ZWQgPSBzY2VuZVxuICB0aGlzLnJlcXVlc3RTd2l0Y2goKVxufVxuXG5TY2VuZVN5c3RlbS5wcm90b3R5cGUucmVxdWVzdENyZWF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5tdXN0Q3JlYXRlID0gdHJ1ZVxuICB0aGlzLm11c3RVcGRhdGUgPSBmYWxzZVxuICB0aGlzLm11c3RTd2l0Y2ggPSBmYWxzZVxufVxuXG5TY2VuZVN5c3RlbS5wcm90b3R5cGUucmVxdWVzdFVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5tdXN0Q3JlYXRlID0gZmFsc2VcbiAgdGhpcy5tdXN0VXBkYXRlID0gdHJ1ZVxuICB0aGlzLm11c3RTd2l0Y2ggPSBmYWxzZVxufVxuXG5TY2VuZVN5c3RlbS5wcm90b3R5cGUucmVxdWVzdFN3aXRjaCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5tdXN0Q3JlYXRlID0gZmFsc2VcbiAgdGhpcy5tdXN0VXBkYXRlID0gZmFsc2VcbiAgdGhpcy5tdXN0U3dpdGNoID0gdHJ1ZVxufVxuXG5leHBvcnQgZGVmYXVsdCBTY2VuZVN5c3RlbVxuIiwiaW1wb3J0IEVudGl0aWVzIGZyb20gJy4vZW50aXRpZXMvZW50aXRpZXMtc3lzdGVtJ1xuaW1wb3J0IExvb3AgZnJvbSAnLi9sb29wL2xvb3AnXG5pbXBvcnQgTmV0d29yayBmcm9tICcuL25ldHdvcmsvbmV0d29yay1zeXN0ZW0tc2VydmVyJ1xuaW1wb3J0IFNjZW5lIGZyb20gJy4vc2NlbmUvc2NlbmUtc3lzdGVtJ1xuXG5jb25zdCBTeW5jRW5naW5lU2VydmVyID0gZnVuY3Rpb24gKGNvbmZpZykge1xuICB0aGlzLmVudGl0aWVzID0gbmV3IEVudGl0aWVzKClcbiAgdGhpcy5sb29wID0gbmV3IExvb3AoY29uZmlnLmxvb3ApXG4gIHRoaXMubmV0d29yayA9IG5ldyBOZXR3b3JrKGNvbmZpZy5uZXR3b3JrKVxuICB0aGlzLnNjZW5lID0gbmV3IFNjZW5lKClcblxuICB0aGlzLmxvb3Aub25TdGVwID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnNjZW5lLmN1cnJlbnQpIHtcbiAgICAgIGlmICh0aGlzLnNjZW5lLm11c3RDcmVhdGUpIHtcbiAgICAgICAgdGhpcy5zY2VuZS5jdXJyZW50LmNyZWF0ZSh0aGlzKVxuICAgICAgICB0aGlzLnNjZW5lLnJlcXVlc3RVcGRhdGUoKVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMuc2NlbmUubXVzdFVwZGF0ZSkge1xuICAgICAgICB0aGlzLnNjZW5lLmN1cnJlbnQudXBkYXRlKHRoaXMpXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZW50aXRpZXMuY2FjaGUpXG4gICAgICAgIHRoaXMubmV0d29yay5zZXJ2ZXJVcGRhdGUodGhpcy5lbnRpdGllcy5jYWNoZSlcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMuc2NlbmUubXVzdFN3aXRjaCkge1xuICAgICAgdGhpcy5zY2VuZS5jdXJyZW50ID0gdGhpcy5zY2VuZS5yZXF1ZXN0ZWRcbiAgICAgIHRoaXMuc2NlbmUucmVxdWVzdENyZWF0ZSgpXG4gICAgfVxuICB9XG59XG5cblN5bmNFbmdpbmVTZXJ2ZXIucHJvdG90eXBlLnN0YXJ0ID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmxvb3AucnVuKClcbn1cblxuZXhwb3J0IGRlZmF1bHQgU3luY0VuZ2luZVNlcnZlclxuIl0sInNvdXJjZVJvb3QiOiIifQ==