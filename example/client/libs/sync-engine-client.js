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
// CONCATENATED MODULE: ./src/inputs/key.js
var Key = function Key(key) {
  this.delta = 0;
  this.key = key;
  this.start = false;
  this.end = false;
  this.hold = false;
  this.holdTime = 0;
  this.startFrame = 0;
  this.endFrame = 0;
};

/* harmony default export */ var inputs_key = (Key);
// CONCATENATED MODULE: ./src/inputs/key-system.js


var KeySystem = function KeySystem() {
  this.enabled = true;
  this.cache = {};
  this.delta = 0;
  this.now = 0;
  this.then = 0;
  this.frame = 0;
  document.addEventListener('keydown', this.handleKeyDown.bind(this), false);
  document.addEventListener('keyup', this.handleKeyUp.bind(this), false);
};

KeySystem.prototype.handleKeyDown = function (event) {
  if (typeof this.cache[event.key] !== 'undefined') {
    this.cache[event.key].hold = true;
  }
};

KeySystem.prototype.handleKeyUp = function (event) {
  if (typeof this.cache[event.key] !== 'undefined') {
    this.cache[event.key].hold = false;
  }
};

KeySystem.prototype.enable = function (key) {
  if (typeof this.cache[key] === 'undefined') {
    this.cache[key] = new inputs_key(key);
  }

  return this.cache[key];
};

KeySystem.prototype.get = function (key) {
  return this.cache[key];
};

KeySystem.prototype.update = function () {
  if (this.enabled) {
    this.frame++;
    this.now = window.performance.now();
    this.delta = this.now - this.then;
    this.then = this.now;

    for (var i in this.cache) {
      if (!Object.prototype.hasOwnProperty.call(this.cache, i)) {
        continue;
      }

      var key = this.cache[i];

      if (key.hold) {
        key.holdTime += this.delta;
        key.endFrame = -1;

        if (key.startFrame === -1) {
          key.startFrame = this.frame;
        }
      } else {
        key.holdTime = 0;
        key.startFrame = -1;

        if (key.endFrame === -1) {
          key.endFrame = this.frame;
        }
      }

      key.start = key.startFrame === this.frame;
      key.end = key.endFrame === this.frame;
      key.delta = this.delta;
    }
  }
};

KeySystem.prototype.destroy = function () {
  this.cache = {};
};

/* harmony default export */ var key_system = (KeySystem);
// CONCATENATED MODULE: ./src/inputs/pointer.js
var Pointer = function Pointer() {
  this.delta = 0;
  this.active = false;
  this.hold = false;
  this.start = false;
  this.end = false;
  this.holdTime = 0;
  this.startFrame = 0;
  this.endFrame = 0;
  this.id = 0;
  this.type = null;
  this.startX = 0;
  this.startY = 0;
  this.offsetX = 0;
  this.offsetY = 0;
  this.x = 0;
  this.y = 0;
};

/* harmony default export */ var inputs_pointer = (Pointer);
// CONCATENATED MODULE: ./src/inputs/pointer-system.js


var PointerSystem = function PointerSystem() {
  this.enabled = true;
  this.cache = {};
  this.delta = 0;
  this.now = 0;
  this.then = 0;
  this.frame = 0;
  this.canvas = document.querySelector('#render-canvas');
  this.enablePointers();
};

PointerSystem.prototype.enable = function (pointer) {
  if (typeof this.cache[pointer] === 'undefined') {
    this.cache[pointer] = new inputs_pointer(pointer);
  }

  return this.cache[pointer];
};

PointerSystem.prototype.get = function (pointer) {
  return this.cache[pointer];
};

PointerSystem.prototype.enablePointers = function () {
  this.canvas.style.touchAction = 'none'; // needed for mobile

  this.canvas.style.userSelect = 'none'; // needed for mobile

  this.canvas.addEventListener('pointerdown', this.handlePointerDown.bind(this), false);
  this.canvas.addEventListener('pointermove', this.handlePointerMove.bind(this), false);
  this.canvas.addEventListener('pointerup', this.handlePointerUpAndCancel.bind(this), false);
  this.canvas.addEventListener('pointercancel', this.handlePointerUpAndCancel.bind(this), false);
  this.canvas.addEventListener('pointerleave', this.handlePointerUpAndCancel.bind(this), false);
  window.addEventListener('contextmenu', this.handleContextMenu.bind(this), false);
};

PointerSystem.prototype.getPointerByID = function (id) {
  var output = false;

  for (var i in this.cache) {
    if (Object.hasOwnProperty.call(this.cache, i)) {
      var pointer = this.cache[i];

      if (pointer.id === id) {
        output = pointer;
      }
    }
  }

  return output;
};

PointerSystem.prototype.getInactivePointer = function () {
  var output = false;

  for (var i in this.cache) {
    if (Object.hasOwnProperty.call(this.cache, i)) {
      var pointer = this.cache[i];

      if (pointer.active === false) {
        output = pointer;
      }
    }
  }

  return output;
};

PointerSystem.prototype.handlePointerDown = function (event) {
  event.preventDefault();
  var pointer = this.getPointerByID(event.pointerId) || this.getInactivePointer();

  if (pointer) {
    pointer.active = true;
    pointer.id = event.pointerId;
    pointer.type = event.pointerType; // 'mouse', 'pen', 'touch'

    pointer.hold = true;
    pointer.startX = event.clientX - event.target.offsetLeft;
    pointer.startY = event.clientY - event.target.offsetTop;
    pointer.x = event.clientX - event.target.offsetLeft;
    pointer.y = event.clientY - event.target.offsetTop;
  }
};

PointerSystem.prototype.handlePointerMove = function (event) {
  event.preventDefault();
  var pointer = this.getPointerByID(event.pointerId) || this.getInactivePointer();

  if (pointer) {
    pointer.id = event.pointerId;
    pointer.x = event.clientX - event.target.offsetLeft;
    pointer.y = event.clientY - event.target.offsetTop;
  }
};

PointerSystem.prototype.handlePointerUpAndCancel = function (event) {
  event.preventDefault();
  var pointer = this.getPointerByID(event.pointerId);

  if (pointer) {
    pointer.active = false;
    pointer.hold = false;
  }
};

PointerSystem.prototype.handleContextMenu = function (event) {
  event.preventDefault();
  event.stopPropagation();
  return false;
};

PointerSystem.prototype.update = function () {
  if (this.enabled) {
    this.frame++;
    this.now = window.performance.now();
    this.delta = this.now - this.then;
    this.then = this.now;

    for (var i in this.cache) {
      if (Object.hasOwnProperty.call(this.cache, i)) {
        var pointer = this.cache[i];

        if (pointer.hold) {
          pointer.offsetX = pointer.x - pointer.startX;
          pointer.offsetY = pointer.y - pointer.startY;
          pointer.holdTime += this.delta;
          pointer.endFrame = -1;

          if (pointer.startFrame === -1) {
            pointer.startFrame = this.frame;
          }
        } else {
          pointer.offsetX = 0;
          pointer.offsetY = 0;
          pointer.holdTime = 0;
          pointer.startFrame = -1;

          if (pointer.endFrame === -1) {
            pointer.endFrame = this.frame;
          }
        }

        pointer.start = pointer.startFrame === this.frame;
        pointer.end = pointer.endFrame === this.frame;
        pointer.delta = this.delta;
      }
    }
  }
};

PointerSystem.prototype.destroy = function () {
  this.cache = {};
};

/* harmony default export */ var pointer_system = (PointerSystem);
// CONCATENATED MODULE: ./src/inputs/inputs-client.js



var inputs_client_Inputs = function Inputs() {
  this.cache = {};
  this.keys = new key_system();
  this.pointers = new pointer_system();
};

inputs_client_Inputs.prototype.enableKey = function (key) {
  return this.keys.enable(key);
};

inputs_client_Inputs.prototype.getKey = function (key) {
  return this.keys.get(key);
};

inputs_client_Inputs.prototype.enablePointer = function (pointer) {
  return this.pointers.enable(pointer);
};

inputs_client_Inputs.prototype.getPointer = function (pointer) {
  return this.pointers.get(pointer);
};

inputs_client_Inputs.prototype.update = function () {
  this.keys.update();
  this.pointers.update();
  this.cache.keys = this.keys.cache;
  this.cache.pointers = this.pointers.cache;
};

/* harmony default export */ var inputs_client = (inputs_client_Inputs);
// CONCATENATED MODULE: ./src/network/network-system-client.js
var Network = function Network(config) {
  var _this = this;

  this.socket = config.socket;
  this.clientId = '';
  this.entities = {};
  this.serverUpdates = [];
  this.renderDelay = 50;
  this.firstServerTimestamp = 0;
  this.firstClientTimestamp = 0;
  this.socket.on('connection', function (clientId) {
    _this.clientId = clientId;
  });
  this.socket.on('server-update', function (data) {
    _this.processGameUpdate(data);
  });
};

Network.prototype.processGameUpdate = function (data) {
  if (this.firstServerTimestamp === 0) {
    this.firstServerTimestamp = data.timestamp;
    this.firstClientTimestamp = Date.now();
  }

  this.serverUpdates.push(data); // todo: Keep only one game update before the current server time

  var base = this.getBaseUpdate();

  if (base > 0) {
    this.serverUpdates.splice(0, base);
  }
};

Network.prototype.getCurrentState = function () {
  if (!this.firstServerTimestamp) {
    return {};
  }

  var base = this.getBaseUpdate();
  var serverTime = this.currentServerTime(); // If base is the most recent update we have, use its state.
  // Else, interpolate between its state and the state of (base + 1).

  if (base < 0) {
    return this.serverUpdates[this.serverUpdates.length - 1].entities;
  } else if (base === this.serverUpdates.length - 1) {
    return this.serverUpdates[base].entities;
  } else {
    var baseUpdate = this.serverUpdates[base];
    var next = this.serverUpdates[base + 1];
    var r = (serverTime - baseUpdate.timestamp) / (next.timestamp - baseUpdate.timestamp); // console.log(this.serverUpdates.length)
    // todo: interpolate entities

    var interpolated = {};

    for (var i in baseUpdate.entities) {
      if (!Object.prototype.hasOwnProperty.call(baseUpdate.entities, i)) {
        continue;
      }

      var entity1 = baseUpdate.entities[i];
      var entity2 = next.entities[i];
      interpolated[i] = {
        x: this.interpolate(entity1.x, entity2.x, r),
        y: this.interpolate(entity1.y, entity2.y, r)
      };
    } // console.log(interpolated)


    return interpolated;
  }
};

Network.prototype.interpolate = function (older, newer, ratio) {
  if (!newer) {
    return older;
  }

  return older + (newer - older) * ratio;
};

Network.prototype.currentServerTime = function () {
  return this.firstServerTimestamp + (Date.now() - this.firstClientTimestamp) - this.renderDelay;
};

Network.prototype.getBaseUpdate = function () {
  var serverTime = this.currentServerTime();

  for (var i = this.serverUpdates.length - 1; i >= 0; i--) {
    if (this.serverUpdates[i].timestamp <= serverTime) {
      return i;
    }
  }

  return -1;
};

Network.prototype.getCurrentServerTimestamp = function (inputs) {
  return this.firstServerTimestamp + (Date.now() - this.firstClientTimestamp) - this.renderDelay;
};

Network.prototype.sendInputs = function (inputs) {
  this.socket.emit('client-inputs', {
    clientId: this.clientId,
    inputs: inputs
  });
};

/* harmony default export */ var network_system_client = (Network);
// CONCATENATED MODULE: ./src/render/render.js
var Render = function Render() {
  this.canvas = document.querySelector('#render-canvas');
  this.context = this.canvas.getContext('2d');
  this.canvas.height = window.innerHeight;
  this.canvas.width = window.innerWidth;
  this.entities = {};
};

Render.prototype.clear = function () {
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Render.prototype.run = function () {
  this.draw();
  window.requestAnimationFrame(this.run.bind(this));
};

Render.prototype.draw = function () {
  this.clear();

  for (var i in this.entities) {
    if (Object.prototype.hasOwnProperty.call(this.entities, i)) {
      var entity = this.entities[i];
      this.context.save(); // circle

      this.context.lineWidth = '1';
      this.context.strokeStyle = '#00ff00';
      this.context.beginPath();
      this.context.arc(entity.x, entity.y, 30, 0, 2 * Math.PI);
      this.context.stroke();
      this.context.restore();
    }
  }
};

Render.prototype.update = function (entities) {
  this.entities = entities;
};

/* harmony default export */ var render = (Render);
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
// CONCATENATED MODULE: ./src/sync-engine-client.js







var sync_engine_client_SyncEngineClient = function SyncEngineClient(config) {
  var _this = this;

  this.entities = new entities_system();
  this.loop = new loop(config.loop);
  this.inputs = new inputs_client();
  this.network = new network_system_client(config.network);
  this.render = new render();
  this.scene = new scene_system();

  this.loop.onStep = function () {
    if (_this.scene.current) {
      if (_this.scene.mustCreate) {
        _this.scene.current.create(_this);

        _this.scene.requestUpdate();
      }

      if (_this.scene.mustUpdate) {
        _this.entities.cache = _this.network.getCurrentState();

        _this.inputs.update();

        _this.network.sendInputs(_this.inputs.cache);

        _this.render.update(_this.entities.cache);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9TeW5jRW5naW5lQ2xpZW50L3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9TeW5jRW5naW5lQ2xpZW50L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL1N5bmNFbmdpbmVDbGllbnQvLi9zcmMvZW50aXRpZXMvZW50aXR5LmpzIiwid2VicGFjazovL1N5bmNFbmdpbmVDbGllbnQvLi9zcmMvZW50aXRpZXMvZW50aXRpZXMtc3lzdGVtLmpzIiwid2VicGFjazovL1N5bmNFbmdpbmVDbGllbnQvLi9zcmMvbG9vcC9sb29wLmpzIiwid2VicGFjazovL1N5bmNFbmdpbmVDbGllbnQvLi9zcmMvaW5wdXRzL2tleS5qcyIsIndlYnBhY2s6Ly9TeW5jRW5naW5lQ2xpZW50Ly4vc3JjL2lucHV0cy9rZXktc3lzdGVtLmpzIiwid2VicGFjazovL1N5bmNFbmdpbmVDbGllbnQvLi9zcmMvaW5wdXRzL3BvaW50ZXIuanMiLCJ3ZWJwYWNrOi8vU3luY0VuZ2luZUNsaWVudC8uL3NyYy9pbnB1dHMvcG9pbnRlci1zeXN0ZW0uanMiLCJ3ZWJwYWNrOi8vU3luY0VuZ2luZUNsaWVudC8uL3NyYy9pbnB1dHMvaW5wdXRzLWNsaWVudC5qcyIsIndlYnBhY2s6Ly9TeW5jRW5naW5lQ2xpZW50Ly4vc3JjL25ldHdvcmsvbmV0d29yay1zeXN0ZW0tY2xpZW50LmpzIiwid2VicGFjazovL1N5bmNFbmdpbmVDbGllbnQvLi9zcmMvcmVuZGVyL3JlbmRlci5qcyIsIndlYnBhY2s6Ly9TeW5jRW5naW5lQ2xpZW50Ly4vc3JjL3NjZW5lL3NjZW5lLmpzIiwid2VicGFjazovL1N5bmNFbmdpbmVDbGllbnQvLi9zcmMvc2NlbmUvc2NlbmUtc3lzdGVtLmpzIiwid2VicGFjazovL1N5bmNFbmdpbmVDbGllbnQvLi9zcmMvc3luYy1lbmdpbmUtY2xpZW50LmpzIl0sIm5hbWVzIjpbIkVudGl0eSIsInBhcmFtcyIsImNvbmZpZyIsIk9iamVjdCIsImFzc2lnbiIsImlkIiwieCIsInkiLCJFbnRpdGllc1N5c3RlbSIsImNhY2hlIiwicHJvdG90eXBlIiwiY3JlYXRlIiwiY3JlYXRlSWQiLCJlbnRpdHkiLCJyZXBsYWNlIiwiYyIsInIiLCJNYXRoIiwicmFuZG9tIiwidiIsInRvU3RyaW5nIiwiTG9vcCIsImZwcyIsImZyYW1lIiwicnVuIiwic2V0SW50ZXJ2YWwiLCJzdGVwIiwib25TdGVwIiwiS2V5Iiwia2V5IiwiZGVsdGEiLCJzdGFydCIsImVuZCIsImhvbGQiLCJob2xkVGltZSIsInN0YXJ0RnJhbWUiLCJlbmRGcmFtZSIsIktleVN5c3RlbSIsImVuYWJsZWQiLCJub3ciLCJ0aGVuIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiaGFuZGxlS2V5RG93biIsImJpbmQiLCJoYW5kbGVLZXlVcCIsImV2ZW50IiwiZW5hYmxlIiwiZ2V0IiwidXBkYXRlIiwid2luZG93IiwicGVyZm9ybWFuY2UiLCJpIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwiZGVzdHJveSIsIlBvaW50ZXIiLCJhY3RpdmUiLCJ0eXBlIiwic3RhcnRYIiwic3RhcnRZIiwib2Zmc2V0WCIsIm9mZnNldFkiLCJQb2ludGVyU3lzdGVtIiwiY2FudmFzIiwicXVlcnlTZWxlY3RvciIsImVuYWJsZVBvaW50ZXJzIiwicG9pbnRlciIsInN0eWxlIiwidG91Y2hBY3Rpb24iLCJ1c2VyU2VsZWN0IiwiaGFuZGxlUG9pbnRlckRvd24iLCJoYW5kbGVQb2ludGVyTW92ZSIsImhhbmRsZVBvaW50ZXJVcEFuZENhbmNlbCIsImhhbmRsZUNvbnRleHRNZW51IiwiZ2V0UG9pbnRlckJ5SUQiLCJvdXRwdXQiLCJnZXRJbmFjdGl2ZVBvaW50ZXIiLCJwcmV2ZW50RGVmYXVsdCIsInBvaW50ZXJJZCIsInBvaW50ZXJUeXBlIiwiY2xpZW50WCIsInRhcmdldCIsIm9mZnNldExlZnQiLCJjbGllbnRZIiwib2Zmc2V0VG9wIiwic3RvcFByb3BhZ2F0aW9uIiwiSW5wdXRzIiwia2V5cyIsIktleXMiLCJwb2ludGVycyIsIlBvaW50ZXJzIiwiZW5hYmxlS2V5IiwiZ2V0S2V5IiwiZW5hYmxlUG9pbnRlciIsImdldFBvaW50ZXIiLCJOZXR3b3JrIiwic29ja2V0IiwiY2xpZW50SWQiLCJlbnRpdGllcyIsInNlcnZlclVwZGF0ZXMiLCJyZW5kZXJEZWxheSIsImZpcnN0U2VydmVyVGltZXN0YW1wIiwiZmlyc3RDbGllbnRUaW1lc3RhbXAiLCJvbiIsImRhdGEiLCJwcm9jZXNzR2FtZVVwZGF0ZSIsInRpbWVzdGFtcCIsIkRhdGUiLCJwdXNoIiwiYmFzZSIsImdldEJhc2VVcGRhdGUiLCJzcGxpY2UiLCJnZXRDdXJyZW50U3RhdGUiLCJzZXJ2ZXJUaW1lIiwiY3VycmVudFNlcnZlclRpbWUiLCJsZW5ndGgiLCJiYXNlVXBkYXRlIiwibmV4dCIsImludGVycG9sYXRlZCIsImVudGl0eTEiLCJlbnRpdHkyIiwiaW50ZXJwb2xhdGUiLCJvbGRlciIsIm5ld2VyIiwicmF0aW8iLCJnZXRDdXJyZW50U2VydmVyVGltZXN0YW1wIiwiaW5wdXRzIiwic2VuZElucHV0cyIsImVtaXQiLCJSZW5kZXIiLCJjb250ZXh0IiwiZ2V0Q29udGV4dCIsImhlaWdodCIsImlubmVySGVpZ2h0Iiwid2lkdGgiLCJpbm5lcldpZHRoIiwiY2xlYXIiLCJjbGVhclJlY3QiLCJkcmF3IiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwic2F2ZSIsImxpbmVXaWR0aCIsInN0cm9rZVN0eWxlIiwiYmVnaW5QYXRoIiwiYXJjIiwiUEkiLCJzdHJva2UiLCJyZXN0b3JlIiwiU2NlbmUiLCJTY2VuZVN5c3RlbSIsImN1cnJlbnQiLCJyZXF1ZXN0ZWQiLCJtdXN0Q3JlYXRlIiwibXVzdFVwZGF0ZSIsIm11c3RTd2l0Y2giLCJzY2VuZSIsInJlcXVlc3RTd2l0Y2giLCJyZXF1ZXN0Q3JlYXRlIiwicmVxdWVzdFVwZGF0ZSIsIlN5bmNFbmdpbmVDbGllbnQiLCJFbnRpdGllcyIsImxvb3AiLCJuZXR3b3JrIiwicmVuZGVyIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztRQ1ZBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBLElBQU1BLE1BQU0sR0FBRyxTQUFUQSxNQUFTLENBQVVDLE1BQVYsRUFBa0I7QUFDL0IsTUFBTUMsTUFBTSxHQUFHQyxNQUFNLENBQUNDLE1BQVAsQ0FBYztBQUMzQkMsTUFBRSxFQUFFLEVBRHVCO0FBRTNCQyxLQUFDLEVBQUUsQ0FGd0I7QUFHM0JDLEtBQUMsRUFBRTtBQUh3QixHQUFkLEVBSVpOLE1BSlksQ0FBZjtBQU1BLE9BQUtLLENBQUwsR0FBU0osTUFBTSxDQUFDSSxDQUFoQjtBQUNBLE9BQUtDLENBQUwsR0FBU0wsTUFBTSxDQUFDSyxDQUFoQjtBQUNELENBVEQ7O0FBV2VQLDBEQUFmLEU7O0FDWEE7O0FBRUEsSUFBTVEsY0FBYyxHQUFHLFNBQWpCQSxjQUFpQixHQUFZO0FBQ2pDLE9BQUtDLEtBQUwsR0FBYSxFQUFiO0FBQ0QsQ0FGRDs7QUFJQUQsY0FBYyxDQUFDRSxTQUFmLENBQXlCQyxNQUF6QixHQUFrQyxVQUFVVixNQUFWLEVBQWtCO0FBQ2xELE1BQU1DLE1BQU0sR0FBR0MsTUFBTSxDQUFDQyxNQUFQLENBQWM7QUFDM0JDLE1BQUUsRUFBRSxLQUFLTyxRQUFMLEVBRHVCO0FBRTNCTixLQUFDLEVBQUUsQ0FGd0I7QUFHM0JDLEtBQUMsRUFBRTtBQUh3QixHQUFkLEVBSVpOLE1BSlksQ0FBZjtBQUtBLE1BQU1ZLE1BQU0sR0FBRyxJQUFJYixlQUFKLENBQVdFLE1BQVgsQ0FBZjtBQUNBLE9BQUtPLEtBQUwsQ0FBV1AsTUFBTSxDQUFDRyxFQUFsQixJQUF3QlEsTUFBeEI7QUFDQSxTQUFPQSxNQUFQO0FBQ0QsQ0FURDs7QUFXQUwsY0FBYyxDQUFDRSxTQUFmLENBQXlCRSxRQUF6QixHQUFvQyxZQUFZO0FBQzlDLFNBQU8sdUNBQXVDRSxPQUF2QyxDQUErQyxPQUEvQyxFQUF3RCxVQUFVQyxDQUFWLEVBQWE7QUFDMUUsUUFBTUMsQ0FBQyxHQUFHQyxJQUFJLENBQUNDLE1BQUwsS0FBZ0IsRUFBaEIsR0FBcUIsQ0FBL0I7QUFDQSxRQUFNQyxDQUFDLEdBQUdKLENBQUMsS0FBSyxHQUFOLEdBQVlDLENBQVosR0FBaUJBLENBQUMsR0FBRyxHQUFKLEdBQVUsR0FBckM7QUFDQSxXQUFPRyxDQUFDLENBQUNDLFFBQUYsQ0FBVyxFQUFYLENBQVA7QUFDRCxHQUpNLENBQVA7QUFLRCxDQU5EOztBQVFlWixrRUFBZixFOztBQ3pCQSxJQUFNYSxJQUFJLEdBQUcsU0FBUEEsSUFBTyxDQUFVbkIsTUFBVixFQUFrQjtBQUM3QixPQUFLb0IsR0FBTCxHQUFXcEIsTUFBTSxDQUFDb0IsR0FBbEI7QUFDQSxPQUFLQyxLQUFMLEdBQWEsQ0FBYjtBQUNELENBSEQ7O0FBS0FGLElBQUksQ0FBQ1gsU0FBTCxDQUFlYyxHQUFmLEdBQXFCLFlBQVk7QUFBQTs7QUFDL0JDLGFBQVcsQ0FBQyxZQUFNO0FBQ2hCLFNBQUksQ0FBQ0MsSUFBTDtBQUNELEdBRlUsRUFFUixPQUFPLEtBQUtKLEdBRkosQ0FBWDtBQUdELENBSkQ7O0FBTUFELElBQUksQ0FBQ1gsU0FBTCxDQUFlZ0IsSUFBZixHQUFzQixZQUFZO0FBQ2hDLE9BQUtILEtBQUw7QUFDQSxPQUFLSSxNQUFMO0FBQ0QsQ0FIRDs7QUFLQU4sSUFBSSxDQUFDWCxTQUFMLENBQWVpQixNQUFmLEdBQXdCLFlBQVksQ0FBRSxDQUF0Qzs7QUFFZU4sNkNBQWYsRTs7QUNsQkEsSUFBTU8sR0FBRyxHQUFHLFNBQU5BLEdBQU0sQ0FBVUMsR0FBVixFQUFlO0FBQ3pCLE9BQUtDLEtBQUwsR0FBYSxDQUFiO0FBQ0EsT0FBS0QsR0FBTCxHQUFXQSxHQUFYO0FBQ0EsT0FBS0UsS0FBTCxHQUFhLEtBQWI7QUFDQSxPQUFLQyxHQUFMLEdBQVcsS0FBWDtBQUNBLE9BQUtDLElBQUwsR0FBWSxLQUFaO0FBQ0EsT0FBS0MsUUFBTCxHQUFnQixDQUFoQjtBQUNBLE9BQUtDLFVBQUwsR0FBa0IsQ0FBbEI7QUFDQSxPQUFLQyxRQUFMLEdBQWdCLENBQWhCO0FBQ0QsQ0FURDs7QUFXZVIsa0RBQWYsRTs7QUNYQTs7QUFFQSxJQUFNUyxTQUFTLEdBQUcsU0FBWkEsU0FBWSxHQUFZO0FBQzVCLE9BQUtDLE9BQUwsR0FBZSxJQUFmO0FBQ0EsT0FBSzdCLEtBQUwsR0FBYSxFQUFiO0FBQ0EsT0FBS3FCLEtBQUwsR0FBYSxDQUFiO0FBQ0EsT0FBS1MsR0FBTCxHQUFXLENBQVg7QUFDQSxPQUFLQyxJQUFMLEdBQVksQ0FBWjtBQUNBLE9BQUtqQixLQUFMLEdBQWEsQ0FBYjtBQUNBa0IsVUFBUSxDQUFDQyxnQkFBVCxDQUEwQixTQUExQixFQUFxQyxLQUFLQyxhQUFMLENBQW1CQyxJQUFuQixDQUF3QixJQUF4QixDQUFyQyxFQUFvRSxLQUFwRTtBQUNBSCxVQUFRLENBQUNDLGdCQUFULENBQTBCLE9BQTFCLEVBQW1DLEtBQUtHLFdBQUwsQ0FBaUJELElBQWpCLENBQXNCLElBQXRCLENBQW5DLEVBQWdFLEtBQWhFO0FBQ0QsQ0FURDs7QUFXQVAsU0FBUyxDQUFDM0IsU0FBVixDQUFvQmlDLGFBQXBCLEdBQW9DLFVBQVVHLEtBQVYsRUFBaUI7QUFDbkQsTUFBSSxPQUFPLEtBQUtyQyxLQUFMLENBQVdxQyxLQUFLLENBQUNqQixHQUFqQixDQUFQLEtBQWlDLFdBQXJDLEVBQWtEO0FBQ2hELFNBQUtwQixLQUFMLENBQVdxQyxLQUFLLENBQUNqQixHQUFqQixFQUFzQkksSUFBdEIsR0FBNkIsSUFBN0I7QUFDRDtBQUNGLENBSkQ7O0FBTUFJLFNBQVMsQ0FBQzNCLFNBQVYsQ0FBb0JtQyxXQUFwQixHQUFrQyxVQUFVQyxLQUFWLEVBQWlCO0FBQ2pELE1BQUksT0FBTyxLQUFLckMsS0FBTCxDQUFXcUMsS0FBSyxDQUFDakIsR0FBakIsQ0FBUCxLQUFpQyxXQUFyQyxFQUFrRDtBQUNoRCxTQUFLcEIsS0FBTCxDQUFXcUMsS0FBSyxDQUFDakIsR0FBakIsRUFBc0JJLElBQXRCLEdBQTZCLEtBQTdCO0FBQ0Q7QUFDRixDQUpEOztBQU1BSSxTQUFTLENBQUMzQixTQUFWLENBQW9CcUMsTUFBcEIsR0FBNkIsVUFBVWxCLEdBQVYsRUFBZTtBQUMxQyxNQUFJLE9BQU8sS0FBS3BCLEtBQUwsQ0FBV29CLEdBQVgsQ0FBUCxLQUEyQixXQUEvQixFQUE0QztBQUMxQyxTQUFLcEIsS0FBTCxDQUFXb0IsR0FBWCxJQUFrQixJQUFJRCxVQUFKLENBQVFDLEdBQVIsQ0FBbEI7QUFDRDs7QUFDRCxTQUFPLEtBQUtwQixLQUFMLENBQVdvQixHQUFYLENBQVA7QUFDRCxDQUxEOztBQU9BUSxTQUFTLENBQUMzQixTQUFWLENBQW9Cc0MsR0FBcEIsR0FBMEIsVUFBVW5CLEdBQVYsRUFBZTtBQUN2QyxTQUFPLEtBQUtwQixLQUFMLENBQVdvQixHQUFYLENBQVA7QUFDRCxDQUZEOztBQUlBUSxTQUFTLENBQUMzQixTQUFWLENBQW9CdUMsTUFBcEIsR0FBNkIsWUFBWTtBQUN2QyxNQUFJLEtBQUtYLE9BQVQsRUFBa0I7QUFDaEIsU0FBS2YsS0FBTDtBQUNBLFNBQUtnQixHQUFMLEdBQVdXLE1BQU0sQ0FBQ0MsV0FBUCxDQUFtQlosR0FBbkIsRUFBWDtBQUNBLFNBQUtULEtBQUwsR0FBYSxLQUFLUyxHQUFMLEdBQVcsS0FBS0MsSUFBN0I7QUFDQSxTQUFLQSxJQUFMLEdBQVksS0FBS0QsR0FBakI7O0FBQ0EsU0FBSyxJQUFNYSxDQUFYLElBQWdCLEtBQUszQyxLQUFyQixFQUE0QjtBQUMxQixVQUFJLENBQUNOLE1BQU0sQ0FBQ08sU0FBUCxDQUFpQjJDLGNBQWpCLENBQWdDQyxJQUFoQyxDQUFxQyxLQUFLN0MsS0FBMUMsRUFBaUQyQyxDQUFqRCxDQUFMLEVBQTBEO0FBQ3hEO0FBQ0Q7O0FBQ0QsVUFBTXZCLEdBQUcsR0FBRyxLQUFLcEIsS0FBTCxDQUFXMkMsQ0FBWCxDQUFaOztBQUNBLFVBQUl2QixHQUFHLENBQUNJLElBQVIsRUFBYztBQUNaSixXQUFHLENBQUNLLFFBQUosSUFBZ0IsS0FBS0osS0FBckI7QUFDQUQsV0FBRyxDQUFDTyxRQUFKLEdBQWUsQ0FBQyxDQUFoQjs7QUFDQSxZQUFJUCxHQUFHLENBQUNNLFVBQUosS0FBbUIsQ0FBQyxDQUF4QixFQUEyQjtBQUN6Qk4sYUFBRyxDQUFDTSxVQUFKLEdBQWlCLEtBQUtaLEtBQXRCO0FBQ0Q7QUFDRixPQU5ELE1BTU87QUFDTE0sV0FBRyxDQUFDSyxRQUFKLEdBQWUsQ0FBZjtBQUNBTCxXQUFHLENBQUNNLFVBQUosR0FBaUIsQ0FBQyxDQUFsQjs7QUFDQSxZQUFJTixHQUFHLENBQUNPLFFBQUosS0FBaUIsQ0FBQyxDQUF0QixFQUF5QjtBQUN2QlAsYUFBRyxDQUFDTyxRQUFKLEdBQWUsS0FBS2IsS0FBcEI7QUFDRDtBQUNGOztBQUNETSxTQUFHLENBQUNFLEtBQUosR0FBYUYsR0FBRyxDQUFDTSxVQUFKLEtBQW1CLEtBQUtaLEtBQXJDO0FBQ0FNLFNBQUcsQ0FBQ0csR0FBSixHQUFXSCxHQUFHLENBQUNPLFFBQUosS0FBaUIsS0FBS2IsS0FBakM7QUFDQU0sU0FBRyxDQUFDQyxLQUFKLEdBQVksS0FBS0EsS0FBakI7QUFDRDtBQUNGO0FBQ0YsQ0E3QkQ7O0FBK0JBTyxTQUFTLENBQUMzQixTQUFWLENBQW9CNkMsT0FBcEIsR0FBOEIsWUFBWTtBQUN4QyxPQUFLOUMsS0FBTCxHQUFhLEVBQWI7QUFDRCxDQUZEOztBQUllNEIsd0RBQWYsRTs7QUN2RUEsSUFBTW1CLE9BQU8sR0FBRyxTQUFWQSxPQUFVLEdBQVk7QUFDMUIsT0FBSzFCLEtBQUwsR0FBYSxDQUFiO0FBQ0EsT0FBSzJCLE1BQUwsR0FBYyxLQUFkO0FBQ0EsT0FBS3hCLElBQUwsR0FBWSxLQUFaO0FBQ0EsT0FBS0YsS0FBTCxHQUFhLEtBQWI7QUFDQSxPQUFLQyxHQUFMLEdBQVcsS0FBWDtBQUNBLE9BQUtFLFFBQUwsR0FBZ0IsQ0FBaEI7QUFDQSxPQUFLQyxVQUFMLEdBQWtCLENBQWxCO0FBQ0EsT0FBS0MsUUFBTCxHQUFnQixDQUFoQjtBQUNBLE9BQUsvQixFQUFMLEdBQVUsQ0FBVjtBQUNBLE9BQUtxRCxJQUFMLEdBQVksSUFBWjtBQUNBLE9BQUtDLE1BQUwsR0FBYyxDQUFkO0FBQ0EsT0FBS0MsTUFBTCxHQUFjLENBQWQ7QUFDQSxPQUFLQyxPQUFMLEdBQWUsQ0FBZjtBQUNBLE9BQUtDLE9BQUwsR0FBZSxDQUFmO0FBQ0EsT0FBS3hELENBQUwsR0FBUyxDQUFUO0FBQ0EsT0FBS0MsQ0FBTCxHQUFTLENBQVQ7QUFDRCxDQWpCRDs7QUFtQmVpRCwwREFBZixFOztBQ25CQTs7QUFFQSxJQUFNTyxhQUFhLEdBQUcsU0FBaEJBLGFBQWdCLEdBQVk7QUFDaEMsT0FBS3pCLE9BQUwsR0FBZSxJQUFmO0FBQ0EsT0FBSzdCLEtBQUwsR0FBYSxFQUFiO0FBQ0EsT0FBS3FCLEtBQUwsR0FBYSxDQUFiO0FBQ0EsT0FBS1MsR0FBTCxHQUFXLENBQVg7QUFDQSxPQUFLQyxJQUFMLEdBQVksQ0FBWjtBQUNBLE9BQUtqQixLQUFMLEdBQWEsQ0FBYjtBQUNBLE9BQUt5QyxNQUFMLEdBQWN2QixRQUFRLENBQUN3QixhQUFULENBQXVCLGdCQUF2QixDQUFkO0FBQ0EsT0FBS0MsY0FBTDtBQUNELENBVEQ7O0FBV0FILGFBQWEsQ0FBQ3JELFNBQWQsQ0FBd0JxQyxNQUF4QixHQUFpQyxVQUFVb0IsT0FBVixFQUFtQjtBQUNsRCxNQUFJLE9BQU8sS0FBSzFELEtBQUwsQ0FBVzBELE9BQVgsQ0FBUCxLQUErQixXQUFuQyxFQUFnRDtBQUM5QyxTQUFLMUQsS0FBTCxDQUFXMEQsT0FBWCxJQUFzQixJQUFJWCxjQUFKLENBQVlXLE9BQVosQ0FBdEI7QUFDRDs7QUFDRCxTQUFPLEtBQUsxRCxLQUFMLENBQVcwRCxPQUFYLENBQVA7QUFDRCxDQUxEOztBQU9BSixhQUFhLENBQUNyRCxTQUFkLENBQXdCc0MsR0FBeEIsR0FBOEIsVUFBVW1CLE9BQVYsRUFBbUI7QUFDL0MsU0FBTyxLQUFLMUQsS0FBTCxDQUFXMEQsT0FBWCxDQUFQO0FBQ0QsQ0FGRDs7QUFJQUosYUFBYSxDQUFDckQsU0FBZCxDQUF3QndELGNBQXhCLEdBQXlDLFlBQVk7QUFDbkQsT0FBS0YsTUFBTCxDQUFZSSxLQUFaLENBQWtCQyxXQUFsQixHQUFnQyxNQUFoQyxDQURtRCxDQUNaOztBQUN2QyxPQUFLTCxNQUFMLENBQVlJLEtBQVosQ0FBa0JFLFVBQWxCLEdBQStCLE1BQS9CLENBRm1ELENBRWI7O0FBQ3RDLE9BQUtOLE1BQUwsQ0FBWXRCLGdCQUFaLENBQTZCLGFBQTdCLEVBQTRDLEtBQUs2QixpQkFBTCxDQUF1QjNCLElBQXZCLENBQTRCLElBQTVCLENBQTVDLEVBQStFLEtBQS9FO0FBQ0EsT0FBS29CLE1BQUwsQ0FBWXRCLGdCQUFaLENBQTZCLGFBQTdCLEVBQTRDLEtBQUs4QixpQkFBTCxDQUF1QjVCLElBQXZCLENBQTRCLElBQTVCLENBQTVDLEVBQStFLEtBQS9FO0FBQ0EsT0FBS29CLE1BQUwsQ0FBWXRCLGdCQUFaLENBQTZCLFdBQTdCLEVBQTBDLEtBQUsrQix3QkFBTCxDQUE4QjdCLElBQTlCLENBQW1DLElBQW5DLENBQTFDLEVBQW9GLEtBQXBGO0FBQ0EsT0FBS29CLE1BQUwsQ0FBWXRCLGdCQUFaLENBQTZCLGVBQTdCLEVBQThDLEtBQUsrQix3QkFBTCxDQUE4QjdCLElBQTlCLENBQW1DLElBQW5DLENBQTlDLEVBQXdGLEtBQXhGO0FBQ0EsT0FBS29CLE1BQUwsQ0FBWXRCLGdCQUFaLENBQTZCLGNBQTdCLEVBQTZDLEtBQUsrQix3QkFBTCxDQUE4QjdCLElBQTlCLENBQW1DLElBQW5DLENBQTdDLEVBQXVGLEtBQXZGO0FBQ0FNLFFBQU0sQ0FBQ1IsZ0JBQVAsQ0FBd0IsYUFBeEIsRUFBdUMsS0FBS2dDLGlCQUFMLENBQXVCOUIsSUFBdkIsQ0FBNEIsSUFBNUIsQ0FBdkMsRUFBMEUsS0FBMUU7QUFDRCxDQVREOztBQVdBbUIsYUFBYSxDQUFDckQsU0FBZCxDQUF3QmlFLGNBQXhCLEdBQXlDLFVBQVV0RSxFQUFWLEVBQWM7QUFDckQsTUFBSXVFLE1BQU0sR0FBRyxLQUFiOztBQUNBLE9BQUssSUFBTXhCLENBQVgsSUFBZ0IsS0FBSzNDLEtBQXJCLEVBQTRCO0FBQzFCLFFBQUlOLE1BQU0sQ0FBQ2tELGNBQVAsQ0FBc0JDLElBQXRCLENBQTJCLEtBQUs3QyxLQUFoQyxFQUF1QzJDLENBQXZDLENBQUosRUFBK0M7QUFDN0MsVUFBTWUsT0FBTyxHQUFHLEtBQUsxRCxLQUFMLENBQVcyQyxDQUFYLENBQWhCOztBQUNBLFVBQUllLE9BQU8sQ0FBQzlELEVBQVIsS0FBZUEsRUFBbkIsRUFBdUI7QUFDckJ1RSxjQUFNLEdBQUdULE9BQVQ7QUFDRDtBQUNGO0FBQ0Y7O0FBQ0QsU0FBT1MsTUFBUDtBQUNELENBWEQ7O0FBYUFiLGFBQWEsQ0FBQ3JELFNBQWQsQ0FBd0JtRSxrQkFBeEIsR0FBNkMsWUFBWTtBQUN2RCxNQUFJRCxNQUFNLEdBQUcsS0FBYjs7QUFDQSxPQUFLLElBQU14QixDQUFYLElBQWdCLEtBQUszQyxLQUFyQixFQUE0QjtBQUMxQixRQUFJTixNQUFNLENBQUNrRCxjQUFQLENBQXNCQyxJQUF0QixDQUEyQixLQUFLN0MsS0FBaEMsRUFBdUMyQyxDQUF2QyxDQUFKLEVBQStDO0FBQzdDLFVBQU1lLE9BQU8sR0FBRyxLQUFLMUQsS0FBTCxDQUFXMkMsQ0FBWCxDQUFoQjs7QUFDQSxVQUFJZSxPQUFPLENBQUNWLE1BQVIsS0FBbUIsS0FBdkIsRUFBOEI7QUFDNUJtQixjQUFNLEdBQUdULE9BQVQ7QUFDRDtBQUNGO0FBQ0Y7O0FBQ0QsU0FBT1MsTUFBUDtBQUNELENBWEQ7O0FBYUFiLGFBQWEsQ0FBQ3JELFNBQWQsQ0FBd0I2RCxpQkFBeEIsR0FBNEMsVUFBVXpCLEtBQVYsRUFBaUI7QUFDM0RBLE9BQUssQ0FBQ2dDLGNBQU47QUFDQSxNQUFNWCxPQUFPLEdBQUcsS0FBS1EsY0FBTCxDQUFvQjdCLEtBQUssQ0FBQ2lDLFNBQTFCLEtBQXdDLEtBQUtGLGtCQUFMLEVBQXhEOztBQUNBLE1BQUlWLE9BQUosRUFBYTtBQUNYQSxXQUFPLENBQUNWLE1BQVIsR0FBaUIsSUFBakI7QUFDQVUsV0FBTyxDQUFDOUQsRUFBUixHQUFheUMsS0FBSyxDQUFDaUMsU0FBbkI7QUFDQVosV0FBTyxDQUFDVCxJQUFSLEdBQWVaLEtBQUssQ0FBQ2tDLFdBQXJCLENBSFcsQ0FHc0I7O0FBQ2pDYixXQUFPLENBQUNsQyxJQUFSLEdBQWUsSUFBZjtBQUNBa0MsV0FBTyxDQUFDUixNQUFSLEdBQWlCYixLQUFLLENBQUNtQyxPQUFOLEdBQWdCbkMsS0FBSyxDQUFDb0MsTUFBTixDQUFhQyxVQUE5QztBQUNBaEIsV0FBTyxDQUFDUCxNQUFSLEdBQWlCZCxLQUFLLENBQUNzQyxPQUFOLEdBQWdCdEMsS0FBSyxDQUFDb0MsTUFBTixDQUFhRyxTQUE5QztBQUNBbEIsV0FBTyxDQUFDN0QsQ0FBUixHQUFZd0MsS0FBSyxDQUFDbUMsT0FBTixHQUFnQm5DLEtBQUssQ0FBQ29DLE1BQU4sQ0FBYUMsVUFBekM7QUFDQWhCLFdBQU8sQ0FBQzVELENBQVIsR0FBWXVDLEtBQUssQ0FBQ3NDLE9BQU4sR0FBZ0J0QyxLQUFLLENBQUNvQyxNQUFOLENBQWFHLFNBQXpDO0FBQ0Q7QUFDRixDQWJEOztBQWVBdEIsYUFBYSxDQUFDckQsU0FBZCxDQUF3QjhELGlCQUF4QixHQUE0QyxVQUFVMUIsS0FBVixFQUFpQjtBQUMzREEsT0FBSyxDQUFDZ0MsY0FBTjtBQUNBLE1BQU1YLE9BQU8sR0FBRyxLQUFLUSxjQUFMLENBQW9CN0IsS0FBSyxDQUFDaUMsU0FBMUIsS0FBd0MsS0FBS0Ysa0JBQUwsRUFBeEQ7O0FBQ0EsTUFBSVYsT0FBSixFQUFhO0FBQ1hBLFdBQU8sQ0FBQzlELEVBQVIsR0FBYXlDLEtBQUssQ0FBQ2lDLFNBQW5CO0FBQ0FaLFdBQU8sQ0FBQzdELENBQVIsR0FBWXdDLEtBQUssQ0FBQ21DLE9BQU4sR0FBZ0JuQyxLQUFLLENBQUNvQyxNQUFOLENBQWFDLFVBQXpDO0FBQ0FoQixXQUFPLENBQUM1RCxDQUFSLEdBQVl1QyxLQUFLLENBQUNzQyxPQUFOLEdBQWdCdEMsS0FBSyxDQUFDb0MsTUFBTixDQUFhRyxTQUF6QztBQUNEO0FBQ0YsQ0FSRDs7QUFVQXRCLGFBQWEsQ0FBQ3JELFNBQWQsQ0FBd0IrRCx3QkFBeEIsR0FBbUQsVUFBVTNCLEtBQVYsRUFBaUI7QUFDbEVBLE9BQUssQ0FBQ2dDLGNBQU47QUFDQSxNQUFNWCxPQUFPLEdBQUcsS0FBS1EsY0FBTCxDQUFvQjdCLEtBQUssQ0FBQ2lDLFNBQTFCLENBQWhCOztBQUNBLE1BQUlaLE9BQUosRUFBYTtBQUNYQSxXQUFPLENBQUNWLE1BQVIsR0FBaUIsS0FBakI7QUFDQVUsV0FBTyxDQUFDbEMsSUFBUixHQUFlLEtBQWY7QUFDRDtBQUNGLENBUEQ7O0FBU0E4QixhQUFhLENBQUNyRCxTQUFkLENBQXdCZ0UsaUJBQXhCLEdBQTRDLFVBQVU1QixLQUFWLEVBQWlCO0FBQzNEQSxPQUFLLENBQUNnQyxjQUFOO0FBQ0FoQyxPQUFLLENBQUN3QyxlQUFOO0FBQ0EsU0FBTyxLQUFQO0FBQ0QsQ0FKRDs7QUFNQXZCLGFBQWEsQ0FBQ3JELFNBQWQsQ0FBd0J1QyxNQUF4QixHQUFpQyxZQUFZO0FBQzNDLE1BQUksS0FBS1gsT0FBVCxFQUFrQjtBQUNoQixTQUFLZixLQUFMO0FBQ0EsU0FBS2dCLEdBQUwsR0FBV1csTUFBTSxDQUFDQyxXQUFQLENBQW1CWixHQUFuQixFQUFYO0FBQ0EsU0FBS1QsS0FBTCxHQUFhLEtBQUtTLEdBQUwsR0FBVyxLQUFLQyxJQUE3QjtBQUNBLFNBQUtBLElBQUwsR0FBWSxLQUFLRCxHQUFqQjs7QUFDQSxTQUFLLElBQU1hLENBQVgsSUFBZ0IsS0FBSzNDLEtBQXJCLEVBQTRCO0FBQzFCLFVBQUlOLE1BQU0sQ0FBQ2tELGNBQVAsQ0FBc0JDLElBQXRCLENBQTJCLEtBQUs3QyxLQUFoQyxFQUF1QzJDLENBQXZDLENBQUosRUFBK0M7QUFDN0MsWUFBTWUsT0FBTyxHQUFHLEtBQUsxRCxLQUFMLENBQVcyQyxDQUFYLENBQWhCOztBQUNBLFlBQUllLE9BQU8sQ0FBQ2xDLElBQVosRUFBa0I7QUFDaEJrQyxpQkFBTyxDQUFDTixPQUFSLEdBQW1CTSxPQUFPLENBQUM3RCxDQUFSLEdBQVk2RCxPQUFPLENBQUNSLE1BQXZDO0FBQ0FRLGlCQUFPLENBQUNMLE9BQVIsR0FBbUJLLE9BQU8sQ0FBQzVELENBQVIsR0FBWTRELE9BQU8sQ0FBQ1AsTUFBdkM7QUFDQU8saUJBQU8sQ0FBQ2pDLFFBQVIsSUFBb0IsS0FBS0osS0FBekI7QUFDQXFDLGlCQUFPLENBQUMvQixRQUFSLEdBQW1CLENBQUMsQ0FBcEI7O0FBQ0EsY0FBSStCLE9BQU8sQ0FBQ2hDLFVBQVIsS0FBdUIsQ0FBQyxDQUE1QixFQUErQjtBQUM3QmdDLG1CQUFPLENBQUNoQyxVQUFSLEdBQXFCLEtBQUtaLEtBQTFCO0FBQ0Q7QUFDRixTQVJELE1BUU87QUFDTDRDLGlCQUFPLENBQUNOLE9BQVIsR0FBa0IsQ0FBbEI7QUFDQU0saUJBQU8sQ0FBQ0wsT0FBUixHQUFrQixDQUFsQjtBQUNBSyxpQkFBTyxDQUFDakMsUUFBUixHQUFtQixDQUFuQjtBQUNBaUMsaUJBQU8sQ0FBQ2hDLFVBQVIsR0FBcUIsQ0FBQyxDQUF0Qjs7QUFDQSxjQUFJZ0MsT0FBTyxDQUFDL0IsUUFBUixLQUFxQixDQUFDLENBQTFCLEVBQTZCO0FBQzNCK0IsbUJBQU8sQ0FBQy9CLFFBQVIsR0FBbUIsS0FBS2IsS0FBeEI7QUFDRDtBQUNGOztBQUNENEMsZUFBTyxDQUFDcEMsS0FBUixHQUFpQm9DLE9BQU8sQ0FBQ2hDLFVBQVIsS0FBdUIsS0FBS1osS0FBN0M7QUFDQTRDLGVBQU8sQ0FBQ25DLEdBQVIsR0FBZW1DLE9BQU8sQ0FBQy9CLFFBQVIsS0FBcUIsS0FBS2IsS0FBekM7QUFDQTRDLGVBQU8sQ0FBQ3JDLEtBQVIsR0FBZ0IsS0FBS0EsS0FBckI7QUFDRDtBQUNGO0FBQ0Y7QUFDRixDQWhDRDs7QUFrQ0FpQyxhQUFhLENBQUNyRCxTQUFkLENBQXdCNkMsT0FBeEIsR0FBa0MsWUFBWTtBQUM1QyxPQUFLOUMsS0FBTCxHQUFhLEVBQWI7QUFDRCxDQUZEOztBQUllc0QsZ0VBQWYsRTs7QUMzSUE7QUFDQTs7QUFFQSxJQUFNd0Isb0JBQU0sR0FBRyxTQUFUQSxNQUFTLEdBQVk7QUFDekIsT0FBSzlFLEtBQUwsR0FBYSxFQUFiO0FBQ0EsT0FBSytFLElBQUwsR0FBWSxJQUFJQyxVQUFKLEVBQVo7QUFDQSxPQUFLQyxRQUFMLEdBQWdCLElBQUlDLGNBQUosRUFBaEI7QUFDRCxDQUpEOztBQU1BSixvQkFBTSxDQUFDN0UsU0FBUCxDQUFpQmtGLFNBQWpCLEdBQTZCLFVBQVUvRCxHQUFWLEVBQWU7QUFDMUMsU0FBTyxLQUFLMkQsSUFBTCxDQUFVekMsTUFBVixDQUFpQmxCLEdBQWpCLENBQVA7QUFDRCxDQUZEOztBQUlBMEQsb0JBQU0sQ0FBQzdFLFNBQVAsQ0FBaUJtRixNQUFqQixHQUEwQixVQUFVaEUsR0FBVixFQUFlO0FBQ3ZDLFNBQU8sS0FBSzJELElBQUwsQ0FBVXhDLEdBQVYsQ0FBY25CLEdBQWQsQ0FBUDtBQUNELENBRkQ7O0FBSUEwRCxvQkFBTSxDQUFDN0UsU0FBUCxDQUFpQm9GLGFBQWpCLEdBQWlDLFVBQVUzQixPQUFWLEVBQW1CO0FBQ2xELFNBQU8sS0FBS3VCLFFBQUwsQ0FBYzNDLE1BQWQsQ0FBcUJvQixPQUFyQixDQUFQO0FBQ0QsQ0FGRDs7QUFJQW9CLG9CQUFNLENBQUM3RSxTQUFQLENBQWlCcUYsVUFBakIsR0FBOEIsVUFBVTVCLE9BQVYsRUFBbUI7QUFDL0MsU0FBTyxLQUFLdUIsUUFBTCxDQUFjMUMsR0FBZCxDQUFrQm1CLE9BQWxCLENBQVA7QUFDRCxDQUZEOztBQUlBb0Isb0JBQU0sQ0FBQzdFLFNBQVAsQ0FBaUJ1QyxNQUFqQixHQUEwQixZQUFZO0FBQ3BDLE9BQUt1QyxJQUFMLENBQVV2QyxNQUFWO0FBQ0EsT0FBS3lDLFFBQUwsQ0FBY3pDLE1BQWQ7QUFDQSxPQUFLeEMsS0FBTCxDQUFXK0UsSUFBWCxHQUFrQixLQUFLQSxJQUFMLENBQVUvRSxLQUE1QjtBQUNBLE9BQUtBLEtBQUwsQ0FBV2lGLFFBQVgsR0FBc0IsS0FBS0EsUUFBTCxDQUFjakYsS0FBcEM7QUFDRCxDQUxEOztBQU9lOEUsc0VBQWYsRTs7QUNoQ0EsSUFBTVMsT0FBTyxHQUFHLFNBQVZBLE9BQVUsQ0FBVTlGLE1BQVYsRUFBa0I7QUFBQTs7QUFDaEMsT0FBSytGLE1BQUwsR0FBYy9GLE1BQU0sQ0FBQytGLE1BQXJCO0FBQ0EsT0FBS0MsUUFBTCxHQUFnQixFQUFoQjtBQUNBLE9BQUtDLFFBQUwsR0FBZ0IsRUFBaEI7QUFDQSxPQUFLQyxhQUFMLEdBQXFCLEVBQXJCO0FBQ0EsT0FBS0MsV0FBTCxHQUFtQixFQUFuQjtBQUNBLE9BQUtDLG9CQUFMLEdBQTRCLENBQTVCO0FBQ0EsT0FBS0Msb0JBQUwsR0FBNEIsQ0FBNUI7QUFFQSxPQUFLTixNQUFMLENBQVlPLEVBQVosQ0FBZSxZQUFmLEVBQTZCLFVBQUNOLFFBQUQsRUFBYztBQUN6QyxTQUFJLENBQUNBLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0QsR0FGRDtBQUlBLE9BQUtELE1BQUwsQ0FBWU8sRUFBWixDQUFlLGVBQWYsRUFBZ0MsVUFBQ0MsSUFBRCxFQUFVO0FBQ3hDLFNBQUksQ0FBQ0MsaUJBQUwsQ0FBdUJELElBQXZCO0FBQ0QsR0FGRDtBQUdELENBaEJEOztBQWtCQVQsT0FBTyxDQUFDdEYsU0FBUixDQUFrQmdHLGlCQUFsQixHQUFzQyxVQUFVRCxJQUFWLEVBQWdCO0FBQ3BELE1BQUksS0FBS0gsb0JBQUwsS0FBOEIsQ0FBbEMsRUFBcUM7QUFDbkMsU0FBS0Esb0JBQUwsR0FBNEJHLElBQUksQ0FBQ0UsU0FBakM7QUFDQSxTQUFLSixvQkFBTCxHQUE0QkssSUFBSSxDQUFDckUsR0FBTCxFQUE1QjtBQUNEOztBQUVELE9BQUs2RCxhQUFMLENBQW1CUyxJQUFuQixDQUF3QkosSUFBeEIsRUFOb0QsQ0FRcEQ7O0FBQ0EsTUFBTUssSUFBSSxHQUFHLEtBQUtDLGFBQUwsRUFBYjs7QUFDQSxNQUFJRCxJQUFJLEdBQUcsQ0FBWCxFQUFjO0FBQ1osU0FBS1YsYUFBTCxDQUFtQlksTUFBbkIsQ0FBMEIsQ0FBMUIsRUFBNkJGLElBQTdCO0FBQ0Q7QUFDRixDQWJEOztBQWVBZCxPQUFPLENBQUN0RixTQUFSLENBQWtCdUcsZUFBbEIsR0FBb0MsWUFBWTtBQUM5QyxNQUFJLENBQUMsS0FBS1gsb0JBQVYsRUFBZ0M7QUFDOUIsV0FBTyxFQUFQO0FBQ0Q7O0FBRUQsTUFBTVEsSUFBSSxHQUFHLEtBQUtDLGFBQUwsRUFBYjtBQUNBLE1BQU1HLFVBQVUsR0FBRyxLQUFLQyxpQkFBTCxFQUFuQixDQU44QyxDQVE5QztBQUNBOztBQUNBLE1BQUlMLElBQUksR0FBRyxDQUFYLEVBQWM7QUFDWixXQUFPLEtBQUtWLGFBQUwsQ0FBbUIsS0FBS0EsYUFBTCxDQUFtQmdCLE1BQW5CLEdBQTRCLENBQS9DLEVBQWtEakIsUUFBekQ7QUFDRCxHQUZELE1BRU8sSUFBSVcsSUFBSSxLQUFLLEtBQUtWLGFBQUwsQ0FBbUJnQixNQUFuQixHQUE0QixDQUF6QyxFQUE0QztBQUNqRCxXQUFPLEtBQUtoQixhQUFMLENBQW1CVSxJQUFuQixFQUF5QlgsUUFBaEM7QUFDRCxHQUZNLE1BRUE7QUFDTCxRQUFNa0IsVUFBVSxHQUFHLEtBQUtqQixhQUFMLENBQW1CVSxJQUFuQixDQUFuQjtBQUNBLFFBQU1RLElBQUksR0FBRyxLQUFLbEIsYUFBTCxDQUFtQlUsSUFBSSxHQUFHLENBQTFCLENBQWI7QUFDQSxRQUFNOUYsQ0FBQyxHQUFHLENBQUNrRyxVQUFVLEdBQUdHLFVBQVUsQ0FBQ1YsU0FBekIsS0FBdUNXLElBQUksQ0FBQ1gsU0FBTCxHQUFpQlUsVUFBVSxDQUFDVixTQUFuRSxDQUFWLENBSEssQ0FJTDtBQUNBOztBQUNBLFFBQU1ZLFlBQVksR0FBRyxFQUFyQjs7QUFFQSxTQUFLLElBQU1uRSxDQUFYLElBQWdCaUUsVUFBVSxDQUFDbEIsUUFBM0IsRUFBcUM7QUFDbkMsVUFBSSxDQUFDaEcsTUFBTSxDQUFDTyxTQUFQLENBQWlCMkMsY0FBakIsQ0FBZ0NDLElBQWhDLENBQXFDK0QsVUFBVSxDQUFDbEIsUUFBaEQsRUFBMEQvQyxDQUExRCxDQUFMLEVBQW1FO0FBQ2pFO0FBQ0Q7O0FBRUQsVUFBTW9FLE9BQU8sR0FBR0gsVUFBVSxDQUFDbEIsUUFBWCxDQUFvQi9DLENBQXBCLENBQWhCO0FBQ0EsVUFBTXFFLE9BQU8sR0FBR0gsSUFBSSxDQUFDbkIsUUFBTCxDQUFjL0MsQ0FBZCxDQUFoQjtBQUNBbUUsa0JBQVksQ0FBQ25FLENBQUQsQ0FBWixHQUFrQjtBQUNoQjlDLFNBQUMsRUFBRSxLQUFLb0gsV0FBTCxDQUFpQkYsT0FBTyxDQUFDbEgsQ0FBekIsRUFBNEJtSCxPQUFPLENBQUNuSCxDQUFwQyxFQUF1Q1UsQ0FBdkMsQ0FEYTtBQUVoQlQsU0FBQyxFQUFFLEtBQUttSCxXQUFMLENBQWlCRixPQUFPLENBQUNqSCxDQUF6QixFQUE0QmtILE9BQU8sQ0FBQ2xILENBQXBDLEVBQXVDUyxDQUF2QztBQUZhLE9BQWxCO0FBSUQsS0FuQkksQ0FvQkw7OztBQUNBLFdBQU91RyxZQUFQO0FBQ0Q7QUFDRixDQXJDRDs7QUF1Q0F2QixPQUFPLENBQUN0RixTQUFSLENBQWtCZ0gsV0FBbEIsR0FBZ0MsVUFBVUMsS0FBVixFQUFpQkMsS0FBakIsRUFBd0JDLEtBQXhCLEVBQStCO0FBQzdELE1BQUksQ0FBQ0QsS0FBTCxFQUFZO0FBQ1YsV0FBT0QsS0FBUDtBQUNEOztBQUNELFNBQU9BLEtBQUssR0FBRyxDQUFDQyxLQUFLLEdBQUdELEtBQVQsSUFBa0JFLEtBQWpDO0FBQ0QsQ0FMRDs7QUFPQTdCLE9BQU8sQ0FBQ3RGLFNBQVIsQ0FBa0J5RyxpQkFBbEIsR0FBc0MsWUFBWTtBQUNoRCxTQUFPLEtBQUtiLG9CQUFMLElBQTZCTSxJQUFJLENBQUNyRSxHQUFMLEtBQWEsS0FBS2dFLG9CQUEvQyxJQUF1RSxLQUFLRixXQUFuRjtBQUNELENBRkQ7O0FBSUFMLE9BQU8sQ0FBQ3RGLFNBQVIsQ0FBa0JxRyxhQUFsQixHQUFrQyxZQUFZO0FBQzVDLE1BQU1HLFVBQVUsR0FBRyxLQUFLQyxpQkFBTCxFQUFuQjs7QUFDQSxPQUFLLElBQUkvRCxDQUFDLEdBQUcsS0FBS2dELGFBQUwsQ0FBbUJnQixNQUFuQixHQUE0QixDQUF6QyxFQUE0Q2hFLENBQUMsSUFBSSxDQUFqRCxFQUFvREEsQ0FBQyxFQUFyRCxFQUF5RDtBQUN2RCxRQUFJLEtBQUtnRCxhQUFMLENBQW1CaEQsQ0FBbkIsRUFBc0J1RCxTQUF0QixJQUFtQ08sVUFBdkMsRUFBbUQ7QUFDakQsYUFBTzlELENBQVA7QUFDRDtBQUNGOztBQUNELFNBQU8sQ0FBQyxDQUFSO0FBQ0QsQ0FSRDs7QUFVQTRDLE9BQU8sQ0FBQ3RGLFNBQVIsQ0FBa0JvSCx5QkFBbEIsR0FBOEMsVUFBVUMsTUFBVixFQUFrQjtBQUM5RCxTQUFPLEtBQUt6QixvQkFBTCxJQUE2Qk0sSUFBSSxDQUFDckUsR0FBTCxLQUFhLEtBQUtnRSxvQkFBL0MsSUFBdUUsS0FBS0YsV0FBbkY7QUFDRCxDQUZEOztBQUlBTCxPQUFPLENBQUN0RixTQUFSLENBQWtCc0gsVUFBbEIsR0FBK0IsVUFBVUQsTUFBVixFQUFrQjtBQUMvQyxPQUFLOUIsTUFBTCxDQUFZZ0MsSUFBWixDQUFpQixlQUFqQixFQUFrQztBQUNoQy9CLFlBQVEsRUFBRSxLQUFLQSxRQURpQjtBQUVoQzZCLFVBQU0sRUFBRUE7QUFGd0IsR0FBbEM7QUFJRCxDQUxEOztBQU9lL0IsaUVBQWYsRTs7QUN4R0EsSUFBTWtDLE1BQU0sR0FBRyxTQUFUQSxNQUFTLEdBQVk7QUFDekIsT0FBS2xFLE1BQUwsR0FBY3ZCLFFBQVEsQ0FBQ3dCLGFBQVQsQ0FBdUIsZ0JBQXZCLENBQWQ7QUFDQSxPQUFLa0UsT0FBTCxHQUFlLEtBQUtuRSxNQUFMLENBQVlvRSxVQUFaLENBQXVCLElBQXZCLENBQWY7QUFDQSxPQUFLcEUsTUFBTCxDQUFZcUUsTUFBWixHQUFxQm5GLE1BQU0sQ0FBQ29GLFdBQTVCO0FBQ0EsT0FBS3RFLE1BQUwsQ0FBWXVFLEtBQVosR0FBb0JyRixNQUFNLENBQUNzRixVQUEzQjtBQUNBLE9BQUtyQyxRQUFMLEdBQWdCLEVBQWhCO0FBQ0QsQ0FORDs7QUFRQStCLE1BQU0sQ0FBQ3hILFNBQVAsQ0FBaUIrSCxLQUFqQixHQUF5QixZQUFZO0FBQ25DLE9BQUtOLE9BQUwsQ0FBYU8sU0FBYixDQUF1QixDQUF2QixFQUEwQixDQUExQixFQUE2QixLQUFLMUUsTUFBTCxDQUFZdUUsS0FBekMsRUFBZ0QsS0FBS3ZFLE1BQUwsQ0FBWXFFLE1BQTVEO0FBQ0QsQ0FGRDs7QUFJQUgsTUFBTSxDQUFDeEgsU0FBUCxDQUFpQmMsR0FBakIsR0FBdUIsWUFBWTtBQUNqQyxPQUFLbUgsSUFBTDtBQUNBekYsUUFBTSxDQUFDMEYscUJBQVAsQ0FBNkIsS0FBS3BILEdBQUwsQ0FBU29CLElBQVQsQ0FBYyxJQUFkLENBQTdCO0FBQ0QsQ0FIRDs7QUFLQXNGLE1BQU0sQ0FBQ3hILFNBQVAsQ0FBaUJpSSxJQUFqQixHQUF3QixZQUFZO0FBQ2xDLE9BQUtGLEtBQUw7O0FBQ0EsT0FBSyxJQUFNckYsQ0FBWCxJQUFnQixLQUFLK0MsUUFBckIsRUFBK0I7QUFDN0IsUUFBSWhHLE1BQU0sQ0FBQ08sU0FBUCxDQUFpQjJDLGNBQWpCLENBQWdDQyxJQUFoQyxDQUFxQyxLQUFLNkMsUUFBMUMsRUFBb0QvQyxDQUFwRCxDQUFKLEVBQTREO0FBQzFELFVBQU12QyxNQUFNLEdBQUcsS0FBS3NGLFFBQUwsQ0FBYy9DLENBQWQsQ0FBZjtBQUNBLFdBQUsrRSxPQUFMLENBQWFVLElBQWIsR0FGMEQsQ0FHMUQ7O0FBQ0EsV0FBS1YsT0FBTCxDQUFhVyxTQUFiLEdBQXlCLEdBQXpCO0FBQ0EsV0FBS1gsT0FBTCxDQUFhWSxXQUFiLEdBQTJCLFNBQTNCO0FBQ0EsV0FBS1osT0FBTCxDQUFhYSxTQUFiO0FBQ0EsV0FBS2IsT0FBTCxDQUFhYyxHQUFiLENBQWlCcEksTUFBTSxDQUFDUCxDQUF4QixFQUEyQk8sTUFBTSxDQUFDTixDQUFsQyxFQUFxQyxFQUFyQyxFQUF5QyxDQUF6QyxFQUE0QyxJQUFJVSxJQUFJLENBQUNpSSxFQUFyRDtBQUNBLFdBQUtmLE9BQUwsQ0FBYWdCLE1BQWI7QUFDQSxXQUFLaEIsT0FBTCxDQUFhaUIsT0FBYjtBQUNEO0FBQ0Y7QUFDRixDQWZEOztBQWlCQWxCLE1BQU0sQ0FBQ3hILFNBQVAsQ0FBaUJ1QyxNQUFqQixHQUEwQixVQUFVa0QsUUFBVixFQUFvQjtBQUM1QyxPQUFLQSxRQUFMLEdBQWdCQSxRQUFoQjtBQUNELENBRkQ7O0FBSWUrQixpREFBZixFOztBQ3RDQSxJQUFNbUIsS0FBSyxHQUFHLFNBQVJBLEtBQVEsQ0FBVXBKLE1BQVYsRUFBa0I7QUFDOUIsTUFBTUMsTUFBTSxHQUFHQyxNQUFNLENBQUNDLE1BQVAsQ0FBYztBQUMzQk8sVUFBTSxFQUFFLGtCQUFNLENBQUUsQ0FEVztBQUUzQnNDLFVBQU0sRUFBRSxrQkFBTSxDQUFFO0FBRlcsR0FBZCxFQUdaaEQsTUFIWSxDQUFmO0FBS0EsT0FBS1UsTUFBTCxHQUFjVCxNQUFNLENBQUNTLE1BQXJCO0FBQ0EsT0FBS3NDLE1BQUwsR0FBYy9DLE1BQU0sQ0FBQytDLE1BQXJCO0FBQ0QsQ0FSRDs7QUFVZW9HLCtDQUFmLEU7O0FDVkE7O0FBRUEsSUFBTUMsV0FBVyxHQUFHLFNBQWRBLFdBQWMsR0FBWTtBQUM5QixPQUFLQyxPQUFMLEdBQWUsSUFBZjtBQUNBLE9BQUtDLFNBQUwsR0FBaUIsSUFBakI7QUFDQSxPQUFLQyxVQUFMLEdBQWtCLEtBQWxCO0FBQ0EsT0FBS0MsVUFBTCxHQUFrQixLQUFsQjtBQUNBLE9BQUtDLFVBQUwsR0FBa0IsS0FBbEI7QUFDRCxDQU5EOztBQVFBTCxXQUFXLENBQUM1SSxTQUFaLENBQXNCQyxNQUF0QixHQUErQixVQUFVVCxNQUFWLEVBQWtCO0FBQy9DLFNBQU8sSUFBSW1KLEtBQUosQ0FBVW5KLE1BQVYsQ0FBUDtBQUNELENBRkQ7O0FBSUFvSixXQUFXLENBQUM1SSxTQUFaLGFBQStCLFVBQVVrSixLQUFWLEVBQWlCO0FBQzlDLE9BQUtKLFNBQUwsR0FBaUJJLEtBQWpCO0FBQ0EsT0FBS0MsYUFBTDtBQUNELENBSEQ7O0FBS0FQLFdBQVcsQ0FBQzVJLFNBQVosQ0FBc0JvSixhQUF0QixHQUFzQyxZQUFZO0FBQ2hELE9BQUtMLFVBQUwsR0FBa0IsSUFBbEI7QUFDQSxPQUFLQyxVQUFMLEdBQWtCLEtBQWxCO0FBQ0EsT0FBS0MsVUFBTCxHQUFrQixLQUFsQjtBQUNELENBSkQ7O0FBTUFMLFdBQVcsQ0FBQzVJLFNBQVosQ0FBc0JxSixhQUF0QixHQUFzQyxZQUFZO0FBQ2hELE9BQUtOLFVBQUwsR0FBa0IsS0FBbEI7QUFDQSxPQUFLQyxVQUFMLEdBQWtCLElBQWxCO0FBQ0EsT0FBS0MsVUFBTCxHQUFrQixLQUFsQjtBQUNELENBSkQ7O0FBTUFMLFdBQVcsQ0FBQzVJLFNBQVosQ0FBc0JtSixhQUF0QixHQUFzQyxZQUFZO0FBQ2hELE9BQUtKLFVBQUwsR0FBa0IsS0FBbEI7QUFDQSxPQUFLQyxVQUFMLEdBQWtCLEtBQWxCO0FBQ0EsT0FBS0MsVUFBTCxHQUFrQixJQUFsQjtBQUNELENBSkQ7O0FBTWVMLDREQUFmLEU7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFNVSxtQ0FBZ0IsR0FBRyxTQUFuQkEsZ0JBQW1CLENBQVU5SixNQUFWLEVBQWtCO0FBQUE7O0FBQ3pDLE9BQUtpRyxRQUFMLEdBQWdCLElBQUk4RCxlQUFKLEVBQWhCO0FBQ0EsT0FBS0MsSUFBTCxHQUFZLElBQUk3SSxJQUFKLENBQVNuQixNQUFNLENBQUNnSyxJQUFoQixDQUFaO0FBQ0EsT0FBS25DLE1BQUwsR0FBYyxJQUFJeEMsYUFBSixFQUFkO0FBQ0EsT0FBSzRFLE9BQUwsR0FBZSxJQUFJbkUscUJBQUosQ0FBWTlGLE1BQU0sQ0FBQ2lLLE9BQW5CLENBQWY7QUFDQSxPQUFLQyxNQUFMLEdBQWMsSUFBSWxDLE1BQUosRUFBZDtBQUNBLE9BQUswQixLQUFMLEdBQWEsSUFBSVAsWUFBSixFQUFiOztBQUVBLE9BQUthLElBQUwsQ0FBVXZJLE1BQVYsR0FBbUIsWUFBTTtBQUN2QixRQUFJLEtBQUksQ0FBQ2lJLEtBQUwsQ0FBV0wsT0FBZixFQUF3QjtBQUN0QixVQUFJLEtBQUksQ0FBQ0ssS0FBTCxDQUFXSCxVQUFmLEVBQTJCO0FBQ3pCLGFBQUksQ0FBQ0csS0FBTCxDQUFXTCxPQUFYLENBQW1CNUksTUFBbkIsQ0FBMEIsS0FBMUI7O0FBQ0EsYUFBSSxDQUFDaUosS0FBTCxDQUFXRyxhQUFYO0FBQ0Q7O0FBQ0QsVUFBSSxLQUFJLENBQUNILEtBQUwsQ0FBV0YsVUFBZixFQUEyQjtBQUN6QixhQUFJLENBQUN2RCxRQUFMLENBQWMxRixLQUFkLEdBQXNCLEtBQUksQ0FBQzBKLE9BQUwsQ0FBYWxELGVBQWIsRUFBdEI7O0FBQ0EsYUFBSSxDQUFDYyxNQUFMLENBQVk5RSxNQUFaOztBQUNBLGFBQUksQ0FBQ2tILE9BQUwsQ0FBYW5DLFVBQWIsQ0FBd0IsS0FBSSxDQUFDRCxNQUFMLENBQVl0SCxLQUFwQzs7QUFDQSxhQUFJLENBQUMySixNQUFMLENBQVluSCxNQUFaLENBQW1CLEtBQUksQ0FBQ2tELFFBQUwsQ0FBYzFGLEtBQWpDOztBQUNBLGFBQUksQ0FBQ21KLEtBQUwsQ0FBV0wsT0FBWCxDQUFtQnRHLE1BQW5CLENBQTBCLEtBQTFCO0FBQ0Q7QUFDRjs7QUFDRCxRQUFJLEtBQUksQ0FBQzJHLEtBQUwsQ0FBV0QsVUFBZixFQUEyQjtBQUN6QixXQUFJLENBQUNDLEtBQUwsQ0FBV0wsT0FBWCxHQUFxQixLQUFJLENBQUNLLEtBQUwsQ0FBV0osU0FBaEM7O0FBQ0EsV0FBSSxDQUFDSSxLQUFMLENBQVdFLGFBQVg7QUFDRDtBQUNGLEdBbEJEO0FBbUJELENBM0JEOztBQTZCQUUsbUNBQWdCLENBQUN0SixTQUFqQixDQUEyQnFCLEtBQTNCLEdBQW1DLFlBQVk7QUFDN0MsT0FBS3FJLE1BQUwsQ0FBWTVJLEdBQVo7QUFDQSxPQUFLMEksSUFBTCxDQUFVMUksR0FBVjtBQUNELENBSEQ7O0FBS2V3SSwySEFBZixFIiwiZmlsZSI6InN5bmMtZW5naW5lLWNsaWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIlN5bmNFbmdpbmVDbGllbnRcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiU3luY0VuZ2luZUNsaWVudFwiXSA9IGZhY3RvcnkoKTtcbn0pKHdpbmRvdywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiY29uc3QgRW50aXR5ID0gZnVuY3Rpb24gKHBhcmFtcykge1xuICBjb25zdCBjb25maWcgPSBPYmplY3QuYXNzaWduKHtcbiAgICBpZDogJycsXG4gICAgeDogMCxcbiAgICB5OiAwXG4gIH0sIHBhcmFtcylcblxuICB0aGlzLnggPSBjb25maWcueFxuICB0aGlzLnkgPSBjb25maWcueVxufVxuXG5leHBvcnQgZGVmYXVsdCBFbnRpdHlcbiIsImltcG9ydCBFbnRpdHkgZnJvbSAnLi9lbnRpdHknXG5cbmNvbnN0IEVudGl0aWVzU3lzdGVtID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmNhY2hlID0ge31cbn1cblxuRW50aXRpZXNTeXN0ZW0ucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgY29uc3QgY29uZmlnID0gT2JqZWN0LmFzc2lnbih7XG4gICAgaWQ6IHRoaXMuY3JlYXRlSWQoKSxcbiAgICB4OiAwLFxuICAgIHk6IDBcbiAgfSwgcGFyYW1zKVxuICBjb25zdCBlbnRpdHkgPSBuZXcgRW50aXR5KGNvbmZpZylcbiAgdGhpcy5jYWNoZVtjb25maWcuaWRdID0gZW50aXR5XG4gIHJldHVybiBlbnRpdHlcbn1cblxuRW50aXRpZXNTeXN0ZW0ucHJvdG90eXBlLmNyZWF0ZUlkID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gJ3h4eHh4eHh4LXh4eHgtNHh4eC15eHh4LXh4eHh4eHh4eHh4eCcucmVwbGFjZSgvW3h5XS9nLCBmdW5jdGlvbiAoYykge1xuICAgIGNvbnN0IHIgPSBNYXRoLnJhbmRvbSgpICogMTYgfCAwXG4gICAgY29uc3QgdiA9IGMgPT09ICd4JyA/IHIgOiAociAmIDB4MyB8IDB4OClcbiAgICByZXR1cm4gdi50b1N0cmluZygxNilcbiAgfSlcbn1cblxuZXhwb3J0IGRlZmF1bHQgRW50aXRpZXNTeXN0ZW1cbiIsImNvbnN0IExvb3AgPSBmdW5jdGlvbiAoY29uZmlnKSB7XG4gIHRoaXMuZnBzID0gY29uZmlnLmZwc1xuICB0aGlzLmZyYW1lID0gMFxufVxuXG5Mb29wLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gIHNldEludGVydmFsKCgpID0+IHtcbiAgICB0aGlzLnN0ZXAoKVxuICB9LCAxMDAwIC8gdGhpcy5mcHMpXG59XG5cbkxvb3AucHJvdG90eXBlLnN0ZXAgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuZnJhbWUrK1xuICB0aGlzLm9uU3RlcCgpXG59XG5cbkxvb3AucHJvdG90eXBlLm9uU3RlcCA9IGZ1bmN0aW9uICgpIHt9XG5cbmV4cG9ydCBkZWZhdWx0IExvb3BcbiIsImNvbnN0IEtleSA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgdGhpcy5kZWx0YSA9IDBcbiAgdGhpcy5rZXkgPSBrZXlcbiAgdGhpcy5zdGFydCA9IGZhbHNlXG4gIHRoaXMuZW5kID0gZmFsc2VcbiAgdGhpcy5ob2xkID0gZmFsc2VcbiAgdGhpcy5ob2xkVGltZSA9IDBcbiAgdGhpcy5zdGFydEZyYW1lID0gMFxuICB0aGlzLmVuZEZyYW1lID0gMFxufVxuXG5leHBvcnQgZGVmYXVsdCBLZXlcbiIsImltcG9ydCBLZXkgZnJvbSAnLi9rZXknXG5cbmNvbnN0IEtleVN5c3RlbSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5lbmFibGVkID0gdHJ1ZVxuICB0aGlzLmNhY2hlID0ge31cbiAgdGhpcy5kZWx0YSA9IDBcbiAgdGhpcy5ub3cgPSAwXG4gIHRoaXMudGhlbiA9IDBcbiAgdGhpcy5mcmFtZSA9IDBcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuaGFuZGxlS2V5RG93bi5iaW5kKHRoaXMpLCBmYWxzZSlcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB0aGlzLmhhbmRsZUtleVVwLmJpbmQodGhpcyksIGZhbHNlKVxufVxuXG5LZXlTeXN0ZW0ucHJvdG90eXBlLmhhbmRsZUtleURvd24gPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgaWYgKHR5cGVvZiB0aGlzLmNhY2hlW2V2ZW50LmtleV0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgdGhpcy5jYWNoZVtldmVudC5rZXldLmhvbGQgPSB0cnVlXG4gIH1cbn1cblxuS2V5U3lzdGVtLnByb3RvdHlwZS5oYW5kbGVLZXlVcCA9IGZ1bmN0aW9uIChldmVudCkge1xuICBpZiAodHlwZW9mIHRoaXMuY2FjaGVbZXZlbnQua2V5XSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB0aGlzLmNhY2hlW2V2ZW50LmtleV0uaG9sZCA9IGZhbHNlXG4gIH1cbn1cblxuS2V5U3lzdGVtLnByb3RvdHlwZS5lbmFibGUgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIGlmICh0eXBlb2YgdGhpcy5jYWNoZVtrZXldID09PSAndW5kZWZpbmVkJykge1xuICAgIHRoaXMuY2FjaGVba2V5XSA9IG5ldyBLZXkoa2V5KVxuICB9XG4gIHJldHVybiB0aGlzLmNhY2hlW2tleV1cbn1cblxuS2V5U3lzdGVtLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiB0aGlzLmNhY2hlW2tleV1cbn1cblxuS2V5U3lzdGVtLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLmVuYWJsZWQpIHtcbiAgICB0aGlzLmZyYW1lKytcbiAgICB0aGlzLm5vdyA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKVxuICAgIHRoaXMuZGVsdGEgPSB0aGlzLm5vdyAtIHRoaXMudGhlblxuICAgIHRoaXMudGhlbiA9IHRoaXMubm93XG4gICAgZm9yIChjb25zdCBpIGluIHRoaXMuY2FjaGUpIHtcbiAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMuY2FjaGUsIGkpKSB7XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG4gICAgICBjb25zdCBrZXkgPSB0aGlzLmNhY2hlW2ldXG4gICAgICBpZiAoa2V5LmhvbGQpIHtcbiAgICAgICAga2V5LmhvbGRUaW1lICs9IHRoaXMuZGVsdGFcbiAgICAgICAga2V5LmVuZEZyYW1lID0gLTFcbiAgICAgICAgaWYgKGtleS5zdGFydEZyYW1lID09PSAtMSkge1xuICAgICAgICAgIGtleS5zdGFydEZyYW1lID0gdGhpcy5mcmFtZVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBrZXkuaG9sZFRpbWUgPSAwXG4gICAgICAgIGtleS5zdGFydEZyYW1lID0gLTFcbiAgICAgICAgaWYgKGtleS5lbmRGcmFtZSA9PT0gLTEpIHtcbiAgICAgICAgICBrZXkuZW5kRnJhbWUgPSB0aGlzLmZyYW1lXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGtleS5zdGFydCA9IChrZXkuc3RhcnRGcmFtZSA9PT0gdGhpcy5mcmFtZSlcbiAgICAgIGtleS5lbmQgPSAoa2V5LmVuZEZyYW1lID09PSB0aGlzLmZyYW1lKVxuICAgICAga2V5LmRlbHRhID0gdGhpcy5kZWx0YVxuICAgIH1cbiAgfVxufVxuXG5LZXlTeXN0ZW0ucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuY2FjaGUgPSB7fVxufVxuXG5leHBvcnQgZGVmYXVsdCBLZXlTeXN0ZW1cbiIsImNvbnN0IFBvaW50ZXIgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuZGVsdGEgPSAwXG4gIHRoaXMuYWN0aXZlID0gZmFsc2VcbiAgdGhpcy5ob2xkID0gZmFsc2VcbiAgdGhpcy5zdGFydCA9IGZhbHNlXG4gIHRoaXMuZW5kID0gZmFsc2VcbiAgdGhpcy5ob2xkVGltZSA9IDBcbiAgdGhpcy5zdGFydEZyYW1lID0gMFxuICB0aGlzLmVuZEZyYW1lID0gMFxuICB0aGlzLmlkID0gMFxuICB0aGlzLnR5cGUgPSBudWxsXG4gIHRoaXMuc3RhcnRYID0gMFxuICB0aGlzLnN0YXJ0WSA9IDBcbiAgdGhpcy5vZmZzZXRYID0gMFxuICB0aGlzLm9mZnNldFkgPSAwXG4gIHRoaXMueCA9IDBcbiAgdGhpcy55ID0gMFxufVxuXG5leHBvcnQgZGVmYXVsdCBQb2ludGVyXG4iLCJpbXBvcnQgUG9pbnRlciBmcm9tICcuL3BvaW50ZXInXG5cbmNvbnN0IFBvaW50ZXJTeXN0ZW0gPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuZW5hYmxlZCA9IHRydWVcbiAgdGhpcy5jYWNoZSA9IHt9XG4gIHRoaXMuZGVsdGEgPSAwXG4gIHRoaXMubm93ID0gMFxuICB0aGlzLnRoZW4gPSAwXG4gIHRoaXMuZnJhbWUgPSAwXG4gIHRoaXMuY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3JlbmRlci1jYW52YXMnKVxuICB0aGlzLmVuYWJsZVBvaW50ZXJzKClcbn1cblxuUG9pbnRlclN5c3RlbS5wcm90b3R5cGUuZW5hYmxlID0gZnVuY3Rpb24gKHBvaW50ZXIpIHtcbiAgaWYgKHR5cGVvZiB0aGlzLmNhY2hlW3BvaW50ZXJdID09PSAndW5kZWZpbmVkJykge1xuICAgIHRoaXMuY2FjaGVbcG9pbnRlcl0gPSBuZXcgUG9pbnRlcihwb2ludGVyKVxuICB9XG4gIHJldHVybiB0aGlzLmNhY2hlW3BvaW50ZXJdXG59XG5cblBvaW50ZXJTeXN0ZW0ucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChwb2ludGVyKSB7XG4gIHJldHVybiB0aGlzLmNhY2hlW3BvaW50ZXJdXG59XG5cblBvaW50ZXJTeXN0ZW0ucHJvdG90eXBlLmVuYWJsZVBvaW50ZXJzID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmNhbnZhcy5zdHlsZS50b3VjaEFjdGlvbiA9ICdub25lJyAvLyBuZWVkZWQgZm9yIG1vYmlsZVxuICB0aGlzLmNhbnZhcy5zdHlsZS51c2VyU2VsZWN0ID0gJ25vbmUnIC8vIG5lZWRlZCBmb3IgbW9iaWxlXG4gIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJkb3duJywgdGhpcy5oYW5kbGVQb2ludGVyRG93bi5iaW5kKHRoaXMpLCBmYWxzZSlcbiAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCB0aGlzLmhhbmRsZVBvaW50ZXJNb3ZlLmJpbmQodGhpcyksIGZhbHNlKVxuICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVydXAnLCB0aGlzLmhhbmRsZVBvaW50ZXJVcEFuZENhbmNlbC5iaW5kKHRoaXMpLCBmYWxzZSlcbiAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcmNhbmNlbCcsIHRoaXMuaGFuZGxlUG9pbnRlclVwQW5kQ2FuY2VsLmJpbmQodGhpcyksIGZhbHNlKVxuICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVybGVhdmUnLCB0aGlzLmhhbmRsZVBvaW50ZXJVcEFuZENhbmNlbC5iaW5kKHRoaXMpLCBmYWxzZSlcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgdGhpcy5oYW5kbGVDb250ZXh0TWVudS5iaW5kKHRoaXMpLCBmYWxzZSlcbn1cblxuUG9pbnRlclN5c3RlbS5wcm90b3R5cGUuZ2V0UG9pbnRlckJ5SUQgPSBmdW5jdGlvbiAoaWQpIHtcbiAgbGV0IG91dHB1dCA9IGZhbHNlXG4gIGZvciAoY29uc3QgaSBpbiB0aGlzLmNhY2hlKSB7XG4gICAgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMuY2FjaGUsIGkpKSB7XG4gICAgICBjb25zdCBwb2ludGVyID0gdGhpcy5jYWNoZVtpXVxuICAgICAgaWYgKHBvaW50ZXIuaWQgPT09IGlkKSB7XG4gICAgICAgIG91dHB1dCA9IHBvaW50ZXJcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIG91dHB1dFxufVxuXG5Qb2ludGVyU3lzdGVtLnByb3RvdHlwZS5nZXRJbmFjdGl2ZVBvaW50ZXIgPSBmdW5jdGlvbiAoKSB7XG4gIGxldCBvdXRwdXQgPSBmYWxzZVxuICBmb3IgKGNvbnN0IGkgaW4gdGhpcy5jYWNoZSkge1xuICAgIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbCh0aGlzLmNhY2hlLCBpKSkge1xuICAgICAgY29uc3QgcG9pbnRlciA9IHRoaXMuY2FjaGVbaV1cbiAgICAgIGlmIChwb2ludGVyLmFjdGl2ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgb3V0cHV0ID0gcG9pbnRlclxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gb3V0cHV0XG59XG5cblBvaW50ZXJTeXN0ZW0ucHJvdG90eXBlLmhhbmRsZVBvaW50ZXJEb3duID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgY29uc3QgcG9pbnRlciA9IHRoaXMuZ2V0UG9pbnRlckJ5SUQoZXZlbnQucG9pbnRlcklkKSB8fCB0aGlzLmdldEluYWN0aXZlUG9pbnRlcigpXG4gIGlmIChwb2ludGVyKSB7XG4gICAgcG9pbnRlci5hY3RpdmUgPSB0cnVlXG4gICAgcG9pbnRlci5pZCA9IGV2ZW50LnBvaW50ZXJJZFxuICAgIHBvaW50ZXIudHlwZSA9IGV2ZW50LnBvaW50ZXJUeXBlIC8vICdtb3VzZScsICdwZW4nLCAndG91Y2gnXG4gICAgcG9pbnRlci5ob2xkID0gdHJ1ZVxuICAgIHBvaW50ZXIuc3RhcnRYID0gZXZlbnQuY2xpZW50WCAtIGV2ZW50LnRhcmdldC5vZmZzZXRMZWZ0XG4gICAgcG9pbnRlci5zdGFydFkgPSBldmVudC5jbGllbnRZIC0gZXZlbnQudGFyZ2V0Lm9mZnNldFRvcFxuICAgIHBvaW50ZXIueCA9IGV2ZW50LmNsaWVudFggLSBldmVudC50YXJnZXQub2Zmc2V0TGVmdFxuICAgIHBvaW50ZXIueSA9IGV2ZW50LmNsaWVudFkgLSBldmVudC50YXJnZXQub2Zmc2V0VG9wXG4gIH1cbn1cblxuUG9pbnRlclN5c3RlbS5wcm90b3R5cGUuaGFuZGxlUG9pbnRlck1vdmUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICBjb25zdCBwb2ludGVyID0gdGhpcy5nZXRQb2ludGVyQnlJRChldmVudC5wb2ludGVySWQpIHx8IHRoaXMuZ2V0SW5hY3RpdmVQb2ludGVyKClcbiAgaWYgKHBvaW50ZXIpIHtcbiAgICBwb2ludGVyLmlkID0gZXZlbnQucG9pbnRlcklkXG4gICAgcG9pbnRlci54ID0gZXZlbnQuY2xpZW50WCAtIGV2ZW50LnRhcmdldC5vZmZzZXRMZWZ0XG4gICAgcG9pbnRlci55ID0gZXZlbnQuY2xpZW50WSAtIGV2ZW50LnRhcmdldC5vZmZzZXRUb3BcbiAgfVxufVxuXG5Qb2ludGVyU3lzdGVtLnByb3RvdHlwZS5oYW5kbGVQb2ludGVyVXBBbmRDYW5jZWwgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICBjb25zdCBwb2ludGVyID0gdGhpcy5nZXRQb2ludGVyQnlJRChldmVudC5wb2ludGVySWQpXG4gIGlmIChwb2ludGVyKSB7XG4gICAgcG9pbnRlci5hY3RpdmUgPSBmYWxzZVxuICAgIHBvaW50ZXIuaG9sZCA9IGZhbHNlXG4gIH1cbn1cblxuUG9pbnRlclN5c3RlbS5wcm90b3R5cGUuaGFuZGxlQ29udGV4dE1lbnUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICByZXR1cm4gZmFsc2Vcbn1cblxuUG9pbnRlclN5c3RlbS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5lbmFibGVkKSB7XG4gICAgdGhpcy5mcmFtZSsrXG4gICAgdGhpcy5ub3cgPSB3aW5kb3cucGVyZm9ybWFuY2Uubm93KClcbiAgICB0aGlzLmRlbHRhID0gdGhpcy5ub3cgLSB0aGlzLnRoZW5cbiAgICB0aGlzLnRoZW4gPSB0aGlzLm5vd1xuICAgIGZvciAoY29uc3QgaSBpbiB0aGlzLmNhY2hlKSB7XG4gICAgICBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwodGhpcy5jYWNoZSwgaSkpIHtcbiAgICAgICAgY29uc3QgcG9pbnRlciA9IHRoaXMuY2FjaGVbaV1cbiAgICAgICAgaWYgKHBvaW50ZXIuaG9sZCkge1xuICAgICAgICAgIHBvaW50ZXIub2Zmc2V0WCA9IChwb2ludGVyLnggLSBwb2ludGVyLnN0YXJ0WClcbiAgICAgICAgICBwb2ludGVyLm9mZnNldFkgPSAocG9pbnRlci55IC0gcG9pbnRlci5zdGFydFkpXG4gICAgICAgICAgcG9pbnRlci5ob2xkVGltZSArPSB0aGlzLmRlbHRhXG4gICAgICAgICAgcG9pbnRlci5lbmRGcmFtZSA9IC0xXG4gICAgICAgICAgaWYgKHBvaW50ZXIuc3RhcnRGcmFtZSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHBvaW50ZXIuc3RhcnRGcmFtZSA9IHRoaXMuZnJhbWVcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcG9pbnRlci5vZmZzZXRYID0gMFxuICAgICAgICAgIHBvaW50ZXIub2Zmc2V0WSA9IDBcbiAgICAgICAgICBwb2ludGVyLmhvbGRUaW1lID0gMFxuICAgICAgICAgIHBvaW50ZXIuc3RhcnRGcmFtZSA9IC0xXG4gICAgICAgICAgaWYgKHBvaW50ZXIuZW5kRnJhbWUgPT09IC0xKSB7XG4gICAgICAgICAgICBwb2ludGVyLmVuZEZyYW1lID0gdGhpcy5mcmFtZVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBwb2ludGVyLnN0YXJ0ID0gKHBvaW50ZXIuc3RhcnRGcmFtZSA9PT0gdGhpcy5mcmFtZSlcbiAgICAgICAgcG9pbnRlci5lbmQgPSAocG9pbnRlci5lbmRGcmFtZSA9PT0gdGhpcy5mcmFtZSlcbiAgICAgICAgcG9pbnRlci5kZWx0YSA9IHRoaXMuZGVsdGFcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuUG9pbnRlclN5c3RlbS5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5jYWNoZSA9IHt9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBvaW50ZXJTeXN0ZW1cbiIsImltcG9ydCBLZXlzIGZyb20gJy4va2V5LXN5c3RlbSdcbmltcG9ydCBQb2ludGVycyBmcm9tICcuL3BvaW50ZXItc3lzdGVtJ1xuXG5jb25zdCBJbnB1dHMgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuY2FjaGUgPSB7fVxuICB0aGlzLmtleXMgPSBuZXcgS2V5cygpXG4gIHRoaXMucG9pbnRlcnMgPSBuZXcgUG9pbnRlcnMoKVxufVxuXG5JbnB1dHMucHJvdG90eXBlLmVuYWJsZUtleSA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuIHRoaXMua2V5cy5lbmFibGUoa2V5KVxufVxuXG5JbnB1dHMucHJvdG90eXBlLmdldEtleSA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuIHRoaXMua2V5cy5nZXQoa2V5KVxufVxuXG5JbnB1dHMucHJvdG90eXBlLmVuYWJsZVBvaW50ZXIgPSBmdW5jdGlvbiAocG9pbnRlcikge1xuICByZXR1cm4gdGhpcy5wb2ludGVycy5lbmFibGUocG9pbnRlcilcbn1cblxuSW5wdXRzLnByb3RvdHlwZS5nZXRQb2ludGVyID0gZnVuY3Rpb24gKHBvaW50ZXIpIHtcbiAgcmV0dXJuIHRoaXMucG9pbnRlcnMuZ2V0KHBvaW50ZXIpXG59XG5cbklucHV0cy5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmtleXMudXBkYXRlKClcbiAgdGhpcy5wb2ludGVycy51cGRhdGUoKVxuICB0aGlzLmNhY2hlLmtleXMgPSB0aGlzLmtleXMuY2FjaGVcbiAgdGhpcy5jYWNoZS5wb2ludGVycyA9IHRoaXMucG9pbnRlcnMuY2FjaGVcbn1cblxuZXhwb3J0IGRlZmF1bHQgSW5wdXRzXG4iLCJjb25zdCBOZXR3b3JrID0gZnVuY3Rpb24gKGNvbmZpZykge1xuICB0aGlzLnNvY2tldCA9IGNvbmZpZy5zb2NrZXRcbiAgdGhpcy5jbGllbnRJZCA9ICcnXG4gIHRoaXMuZW50aXRpZXMgPSB7fVxuICB0aGlzLnNlcnZlclVwZGF0ZXMgPSBbXVxuICB0aGlzLnJlbmRlckRlbGF5ID0gNTBcbiAgdGhpcy5maXJzdFNlcnZlclRpbWVzdGFtcCA9IDBcbiAgdGhpcy5maXJzdENsaWVudFRpbWVzdGFtcCA9IDBcblxuICB0aGlzLnNvY2tldC5vbignY29ubmVjdGlvbicsIChjbGllbnRJZCkgPT4ge1xuICAgIHRoaXMuY2xpZW50SWQgPSBjbGllbnRJZFxuICB9KVxuXG4gIHRoaXMuc29ja2V0Lm9uKCdzZXJ2ZXItdXBkYXRlJywgKGRhdGEpID0+IHtcbiAgICB0aGlzLnByb2Nlc3NHYW1lVXBkYXRlKGRhdGEpXG4gIH0pXG59XG5cbk5ldHdvcmsucHJvdG90eXBlLnByb2Nlc3NHYW1lVXBkYXRlID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgaWYgKHRoaXMuZmlyc3RTZXJ2ZXJUaW1lc3RhbXAgPT09IDApIHtcbiAgICB0aGlzLmZpcnN0U2VydmVyVGltZXN0YW1wID0gZGF0YS50aW1lc3RhbXBcbiAgICB0aGlzLmZpcnN0Q2xpZW50VGltZXN0YW1wID0gRGF0ZS5ub3coKVxuICB9XG5cbiAgdGhpcy5zZXJ2ZXJVcGRhdGVzLnB1c2goZGF0YSlcblxuICAvLyB0b2RvOiBLZWVwIG9ubHkgb25lIGdhbWUgdXBkYXRlIGJlZm9yZSB0aGUgY3VycmVudCBzZXJ2ZXIgdGltZVxuICBjb25zdCBiYXNlID0gdGhpcy5nZXRCYXNlVXBkYXRlKClcbiAgaWYgKGJhc2UgPiAwKSB7XG4gICAgdGhpcy5zZXJ2ZXJVcGRhdGVzLnNwbGljZSgwLCBiYXNlKVxuICB9XG59XG5cbk5ldHdvcmsucHJvdG90eXBlLmdldEN1cnJlbnRTdGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKCF0aGlzLmZpcnN0U2VydmVyVGltZXN0YW1wKSB7XG4gICAgcmV0dXJuIHt9XG4gIH1cblxuICBjb25zdCBiYXNlID0gdGhpcy5nZXRCYXNlVXBkYXRlKClcbiAgY29uc3Qgc2VydmVyVGltZSA9IHRoaXMuY3VycmVudFNlcnZlclRpbWUoKVxuXG4gIC8vIElmIGJhc2UgaXMgdGhlIG1vc3QgcmVjZW50IHVwZGF0ZSB3ZSBoYXZlLCB1c2UgaXRzIHN0YXRlLlxuICAvLyBFbHNlLCBpbnRlcnBvbGF0ZSBiZXR3ZWVuIGl0cyBzdGF0ZSBhbmQgdGhlIHN0YXRlIG9mIChiYXNlICsgMSkuXG4gIGlmIChiYXNlIDwgMCkge1xuICAgIHJldHVybiB0aGlzLnNlcnZlclVwZGF0ZXNbdGhpcy5zZXJ2ZXJVcGRhdGVzLmxlbmd0aCAtIDFdLmVudGl0aWVzXG4gIH0gZWxzZSBpZiAoYmFzZSA9PT0gdGhpcy5zZXJ2ZXJVcGRhdGVzLmxlbmd0aCAtIDEpIHtcbiAgICByZXR1cm4gdGhpcy5zZXJ2ZXJVcGRhdGVzW2Jhc2VdLmVudGl0aWVzXG4gIH0gZWxzZSB7XG4gICAgY29uc3QgYmFzZVVwZGF0ZSA9IHRoaXMuc2VydmVyVXBkYXRlc1tiYXNlXVxuICAgIGNvbnN0IG5leHQgPSB0aGlzLnNlcnZlclVwZGF0ZXNbYmFzZSArIDFdXG4gICAgY29uc3QgciA9IChzZXJ2ZXJUaW1lIC0gYmFzZVVwZGF0ZS50aW1lc3RhbXApIC8gKG5leHQudGltZXN0YW1wIC0gYmFzZVVwZGF0ZS50aW1lc3RhbXApXG4gICAgLy8gY29uc29sZS5sb2codGhpcy5zZXJ2ZXJVcGRhdGVzLmxlbmd0aClcbiAgICAvLyB0b2RvOiBpbnRlcnBvbGF0ZSBlbnRpdGllc1xuICAgIGNvbnN0IGludGVycG9sYXRlZCA9IHt9XG5cbiAgICBmb3IgKGNvbnN0IGkgaW4gYmFzZVVwZGF0ZS5lbnRpdGllcykge1xuICAgICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYmFzZVVwZGF0ZS5lbnRpdGllcywgaSkpIHtcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgY29uc3QgZW50aXR5MSA9IGJhc2VVcGRhdGUuZW50aXRpZXNbaV1cbiAgICAgIGNvbnN0IGVudGl0eTIgPSBuZXh0LmVudGl0aWVzW2ldXG4gICAgICBpbnRlcnBvbGF0ZWRbaV0gPSB7XG4gICAgICAgIHg6IHRoaXMuaW50ZXJwb2xhdGUoZW50aXR5MS54LCBlbnRpdHkyLngsIHIpLFxuICAgICAgICB5OiB0aGlzLmludGVycG9sYXRlKGVudGl0eTEueSwgZW50aXR5Mi55LCByKVxuICAgICAgfVxuICAgIH1cbiAgICAvLyBjb25zb2xlLmxvZyhpbnRlcnBvbGF0ZWQpXG4gICAgcmV0dXJuIGludGVycG9sYXRlZFxuICB9XG59XG5cbk5ldHdvcmsucHJvdG90eXBlLmludGVycG9sYXRlID0gZnVuY3Rpb24gKG9sZGVyLCBuZXdlciwgcmF0aW8pIHtcbiAgaWYgKCFuZXdlcikge1xuICAgIHJldHVybiBvbGRlclxuICB9XG4gIHJldHVybiBvbGRlciArIChuZXdlciAtIG9sZGVyKSAqIHJhdGlvXG59XG5cbk5ldHdvcmsucHJvdG90eXBlLmN1cnJlbnRTZXJ2ZXJUaW1lID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5maXJzdFNlcnZlclRpbWVzdGFtcCArIChEYXRlLm5vdygpIC0gdGhpcy5maXJzdENsaWVudFRpbWVzdGFtcCkgLSB0aGlzLnJlbmRlckRlbGF5XG59XG5cbk5ldHdvcmsucHJvdG90eXBlLmdldEJhc2VVcGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHNlcnZlclRpbWUgPSB0aGlzLmN1cnJlbnRTZXJ2ZXJUaW1lKClcbiAgZm9yIChsZXQgaSA9IHRoaXMuc2VydmVyVXBkYXRlcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGlmICh0aGlzLnNlcnZlclVwZGF0ZXNbaV0udGltZXN0YW1wIDw9IHNlcnZlclRpbWUpIHtcbiAgICAgIHJldHVybiBpXG4gICAgfVxuICB9XG4gIHJldHVybiAtMVxufVxuXG5OZXR3b3JrLnByb3RvdHlwZS5nZXRDdXJyZW50U2VydmVyVGltZXN0YW1wID0gZnVuY3Rpb24gKGlucHV0cykge1xuICByZXR1cm4gdGhpcy5maXJzdFNlcnZlclRpbWVzdGFtcCArIChEYXRlLm5vdygpIC0gdGhpcy5maXJzdENsaWVudFRpbWVzdGFtcCkgLSB0aGlzLnJlbmRlckRlbGF5XG59XG5cbk5ldHdvcmsucHJvdG90eXBlLnNlbmRJbnB1dHMgPSBmdW5jdGlvbiAoaW5wdXRzKSB7XG4gIHRoaXMuc29ja2V0LmVtaXQoJ2NsaWVudC1pbnB1dHMnLCB7XG4gICAgY2xpZW50SWQ6IHRoaXMuY2xpZW50SWQsXG4gICAgaW5wdXRzOiBpbnB1dHNcbiAgfSlcbn1cblxuZXhwb3J0IGRlZmF1bHQgTmV0d29ya1xuIiwiY29uc3QgUmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZW5kZXItY2FudmFzJylcbiAgdGhpcy5jb250ZXh0ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKVxuICB0aGlzLmNhbnZhcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHRcbiAgdGhpcy5jYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aFxuICB0aGlzLmVudGl0aWVzID0ge31cbn1cblxuUmVuZGVyLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KVxufVxuXG5SZW5kZXIucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5kcmF3KClcbiAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnJ1bi5iaW5kKHRoaXMpKVxufVxuXG5SZW5kZXIucHJvdG90eXBlLmRyYXcgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuY2xlYXIoKVxuICBmb3IgKGNvbnN0IGkgaW4gdGhpcy5lbnRpdGllcykge1xuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodGhpcy5lbnRpdGllcywgaSkpIHtcbiAgICAgIGNvbnN0IGVudGl0eSA9IHRoaXMuZW50aXRpZXNbaV1cbiAgICAgIHRoaXMuY29udGV4dC5zYXZlKClcbiAgICAgIC8vIGNpcmNsZVxuICAgICAgdGhpcy5jb250ZXh0LmxpbmVXaWR0aCA9ICcxJ1xuICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZVN0eWxlID0gJyMwMGZmMDAnXG4gICAgICB0aGlzLmNvbnRleHQuYmVnaW5QYXRoKClcbiAgICAgIHRoaXMuY29udGV4dC5hcmMoZW50aXR5LngsIGVudGl0eS55LCAzMCwgMCwgMiAqIE1hdGguUEkpXG4gICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlKClcbiAgICAgIHRoaXMuY29udGV4dC5yZXN0b3JlKClcbiAgICB9XG4gIH1cbn1cblxuUmVuZGVyLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZW50aXRpZXMpIHtcbiAgdGhpcy5lbnRpdGllcyA9IGVudGl0aWVzXG59XG5cbmV4cG9ydCBkZWZhdWx0IFJlbmRlclxuIiwiY29uc3QgU2NlbmUgPSBmdW5jdGlvbiAocGFyYW1zKSB7XG4gIGNvbnN0IGNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe1xuICAgIGNyZWF0ZTogKCkgPT4ge30sXG4gICAgdXBkYXRlOiAoKSA9PiB7fVxuICB9LCBwYXJhbXMpXG5cbiAgdGhpcy5jcmVhdGUgPSBjb25maWcuY3JlYXRlXG4gIHRoaXMudXBkYXRlID0gY29uZmlnLnVwZGF0ZVxufVxuXG5leHBvcnQgZGVmYXVsdCBTY2VuZVxuIiwiaW1wb3J0IFNjZW5lIGZyb20gJy4vc2NlbmUnXG5cbmNvbnN0IFNjZW5lU3lzdGVtID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmN1cnJlbnQgPSBudWxsXG4gIHRoaXMucmVxdWVzdGVkID0gbnVsbFxuICB0aGlzLm11c3RDcmVhdGUgPSBmYWxzZVxuICB0aGlzLm11c3RVcGRhdGUgPSBmYWxzZVxuICB0aGlzLm11c3RTd2l0Y2ggPSBmYWxzZVxufVxuXG5TY2VuZVN5c3RlbS5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKGNvbmZpZykge1xuICByZXR1cm4gbmV3IFNjZW5lKGNvbmZpZylcbn1cblxuU2NlbmVTeXN0ZW0ucHJvdG90eXBlLnN3aXRjaCA9IGZ1bmN0aW9uIChzY2VuZSkge1xuICB0aGlzLnJlcXVlc3RlZCA9IHNjZW5lXG4gIHRoaXMucmVxdWVzdFN3aXRjaCgpXG59XG5cblNjZW5lU3lzdGVtLnByb3RvdHlwZS5yZXF1ZXN0Q3JlYXRlID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLm11c3RDcmVhdGUgPSB0cnVlXG4gIHRoaXMubXVzdFVwZGF0ZSA9IGZhbHNlXG4gIHRoaXMubXVzdFN3aXRjaCA9IGZhbHNlXG59XG5cblNjZW5lU3lzdGVtLnByb3RvdHlwZS5yZXF1ZXN0VXBkYXRlID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLm11c3RDcmVhdGUgPSBmYWxzZVxuICB0aGlzLm11c3RVcGRhdGUgPSB0cnVlXG4gIHRoaXMubXVzdFN3aXRjaCA9IGZhbHNlXG59XG5cblNjZW5lU3lzdGVtLnByb3RvdHlwZS5yZXF1ZXN0U3dpdGNoID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLm11c3RDcmVhdGUgPSBmYWxzZVxuICB0aGlzLm11c3RVcGRhdGUgPSBmYWxzZVxuICB0aGlzLm11c3RTd2l0Y2ggPSB0cnVlXG59XG5cbmV4cG9ydCBkZWZhdWx0IFNjZW5lU3lzdGVtXG4iLCJpbXBvcnQgRW50aXRpZXMgZnJvbSAnLi9lbnRpdGllcy9lbnRpdGllcy1zeXN0ZW0nXG5pbXBvcnQgTG9vcCBmcm9tICcuL2xvb3AvbG9vcCdcbmltcG9ydCBJbnB1dHMgZnJvbSAnLi9pbnB1dHMvaW5wdXRzLWNsaWVudCdcbmltcG9ydCBOZXR3b3JrIGZyb20gJy4vbmV0d29yay9uZXR3b3JrLXN5c3RlbS1jbGllbnQnXG5pbXBvcnQgUmVuZGVyIGZyb20gJy4vcmVuZGVyL3JlbmRlcidcbmltcG9ydCBTY2VuZSBmcm9tICcuL3NjZW5lL3NjZW5lLXN5c3RlbSdcblxuY29uc3QgU3luY0VuZ2luZUNsaWVudCA9IGZ1bmN0aW9uIChjb25maWcpIHtcbiAgdGhpcy5lbnRpdGllcyA9IG5ldyBFbnRpdGllcygpXG4gIHRoaXMubG9vcCA9IG5ldyBMb29wKGNvbmZpZy5sb29wKVxuICB0aGlzLmlucHV0cyA9IG5ldyBJbnB1dHMoKVxuICB0aGlzLm5ldHdvcmsgPSBuZXcgTmV0d29yayhjb25maWcubmV0d29yaylcbiAgdGhpcy5yZW5kZXIgPSBuZXcgUmVuZGVyKClcbiAgdGhpcy5zY2VuZSA9IG5ldyBTY2VuZSgpXG5cbiAgdGhpcy5sb29wLm9uU3RlcCA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5zY2VuZS5jdXJyZW50KSB7XG4gICAgICBpZiAodGhpcy5zY2VuZS5tdXN0Q3JlYXRlKSB7XG4gICAgICAgIHRoaXMuc2NlbmUuY3VycmVudC5jcmVhdGUodGhpcylcbiAgICAgICAgdGhpcy5zY2VuZS5yZXF1ZXN0VXBkYXRlKClcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnNjZW5lLm11c3RVcGRhdGUpIHtcbiAgICAgICAgdGhpcy5lbnRpdGllcy5jYWNoZSA9IHRoaXMubmV0d29yay5nZXRDdXJyZW50U3RhdGUoKVxuICAgICAgICB0aGlzLmlucHV0cy51cGRhdGUoKVxuICAgICAgICB0aGlzLm5ldHdvcmsuc2VuZElucHV0cyh0aGlzLmlucHV0cy5jYWNoZSlcbiAgICAgICAgdGhpcy5yZW5kZXIudXBkYXRlKHRoaXMuZW50aXRpZXMuY2FjaGUpXG4gICAgICAgIHRoaXMuc2NlbmUuY3VycmVudC51cGRhdGUodGhpcylcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMuc2NlbmUubXVzdFN3aXRjaCkge1xuICAgICAgdGhpcy5zY2VuZS5jdXJyZW50ID0gdGhpcy5zY2VuZS5yZXF1ZXN0ZWRcbiAgICAgIHRoaXMuc2NlbmUucmVxdWVzdENyZWF0ZSgpXG4gICAgfVxuICB9XG59XG5cblN5bmNFbmdpbmVDbGllbnQucHJvdG90eXBlLnN0YXJ0ID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLnJlbmRlci5ydW4oKVxuICB0aGlzLmxvb3AucnVuKClcbn1cblxuZXhwb3J0IGRlZmF1bHQgU3luY0VuZ2luZUNsaWVudFxuIl0sInNvdXJjZVJvb3QiOiIifQ==