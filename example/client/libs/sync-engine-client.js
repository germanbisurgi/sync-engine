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
  this.entities = {};
  this.clientInputs = [];
  this.socket.on('connection', function (id) {
    console.log('connection', id);
  });
  this.socket.on('entities', function (entities) {
    _this.entities = entities;
  });
};

Network.prototype.sendInputs = function (inputs) {
  this.socket.emit('client-inputs', inputs);
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
        _this.entities.cache = _this.network.entities;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9TeW5jRW5naW5lQ2xpZW50L3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9TeW5jRW5naW5lQ2xpZW50L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL1N5bmNFbmdpbmVDbGllbnQvLi9zcmMvZW50aXRpZXMvZW50aXR5LmpzIiwid2VicGFjazovL1N5bmNFbmdpbmVDbGllbnQvLi9zcmMvZW50aXRpZXMvZW50aXRpZXMtc3lzdGVtLmpzIiwid2VicGFjazovL1N5bmNFbmdpbmVDbGllbnQvLi9zcmMvbG9vcC9sb29wLmpzIiwid2VicGFjazovL1N5bmNFbmdpbmVDbGllbnQvLi9zcmMvaW5wdXRzL2tleS5qcyIsIndlYnBhY2s6Ly9TeW5jRW5naW5lQ2xpZW50Ly4vc3JjL2lucHV0cy9rZXktc3lzdGVtLmpzIiwid2VicGFjazovL1N5bmNFbmdpbmVDbGllbnQvLi9zcmMvaW5wdXRzL3BvaW50ZXIuanMiLCJ3ZWJwYWNrOi8vU3luY0VuZ2luZUNsaWVudC8uL3NyYy9pbnB1dHMvcG9pbnRlci1zeXN0ZW0uanMiLCJ3ZWJwYWNrOi8vU3luY0VuZ2luZUNsaWVudC8uL3NyYy9pbnB1dHMvaW5wdXRzLWNsaWVudC5qcyIsIndlYnBhY2s6Ly9TeW5jRW5naW5lQ2xpZW50Ly4vc3JjL25ldHdvcmsvbmV0d29yay1zeXN0ZW0tY2xpZW50LmpzIiwid2VicGFjazovL1N5bmNFbmdpbmVDbGllbnQvLi9zcmMvcmVuZGVyL3JlbmRlci5qcyIsIndlYnBhY2s6Ly9TeW5jRW5naW5lQ2xpZW50Ly4vc3JjL3NjZW5lL3NjZW5lLmpzIiwid2VicGFjazovL1N5bmNFbmdpbmVDbGllbnQvLi9zcmMvc2NlbmUvc2NlbmUtc3lzdGVtLmpzIiwid2VicGFjazovL1N5bmNFbmdpbmVDbGllbnQvLi9zcmMvc3luYy1lbmdpbmUtY2xpZW50LmpzIl0sIm5hbWVzIjpbIkVudGl0eSIsInBhcmFtcyIsImNvbmZpZyIsIk9iamVjdCIsImFzc2lnbiIsInV1aWQiLCJ4IiwieSIsIkVudGl0aWVzU3lzdGVtIiwiY2FjaGUiLCJwcm90b3R5cGUiLCJjcmVhdGUiLCJlbnRpdHkiLCJyZXBsYWNlIiwiYyIsInIiLCJNYXRoIiwicmFuZG9tIiwidiIsInRvU3RyaW5nIiwiTG9vcCIsImZwcyIsImZyYW1lIiwicnVuIiwic2V0SW50ZXJ2YWwiLCJzdGVwIiwib25TdGVwIiwiS2V5Iiwia2V5IiwiZGVsdGEiLCJzdGFydCIsImVuZCIsImhvbGQiLCJob2xkVGltZSIsInN0YXJ0RnJhbWUiLCJlbmRGcmFtZSIsIktleVN5c3RlbSIsImVuYWJsZWQiLCJub3ciLCJ0aGVuIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiaGFuZGxlS2V5RG93biIsImJpbmQiLCJoYW5kbGVLZXlVcCIsImV2ZW50IiwiZW5hYmxlIiwiZ2V0IiwidXBkYXRlIiwid2luZG93IiwicGVyZm9ybWFuY2UiLCJpIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwiZGVzdHJveSIsIlBvaW50ZXIiLCJhY3RpdmUiLCJpZCIsInR5cGUiLCJzdGFydFgiLCJzdGFydFkiLCJvZmZzZXRYIiwib2Zmc2V0WSIsIlBvaW50ZXJTeXN0ZW0iLCJjYW52YXMiLCJxdWVyeVNlbGVjdG9yIiwiZW5hYmxlUG9pbnRlcnMiLCJwb2ludGVyIiwic3R5bGUiLCJ0b3VjaEFjdGlvbiIsInVzZXJTZWxlY3QiLCJoYW5kbGVQb2ludGVyRG93biIsImhhbmRsZVBvaW50ZXJNb3ZlIiwiaGFuZGxlUG9pbnRlclVwQW5kQ2FuY2VsIiwiaGFuZGxlQ29udGV4dE1lbnUiLCJnZXRQb2ludGVyQnlJRCIsIm91dHB1dCIsImdldEluYWN0aXZlUG9pbnRlciIsInByZXZlbnREZWZhdWx0IiwicG9pbnRlcklkIiwicG9pbnRlclR5cGUiLCJjbGllbnRYIiwidGFyZ2V0Iiwib2Zmc2V0TGVmdCIsImNsaWVudFkiLCJvZmZzZXRUb3AiLCJzdG9wUHJvcGFnYXRpb24iLCJJbnB1dHMiLCJrZXlzIiwiS2V5cyIsInBvaW50ZXJzIiwiUG9pbnRlcnMiLCJlbmFibGVLZXkiLCJnZXRLZXkiLCJlbmFibGVQb2ludGVyIiwiZ2V0UG9pbnRlciIsIk5ldHdvcmsiLCJzb2NrZXQiLCJlbnRpdGllcyIsImNsaWVudElucHV0cyIsIm9uIiwiY29uc29sZSIsImxvZyIsInNlbmRJbnB1dHMiLCJpbnB1dHMiLCJlbWl0IiwiUmVuZGVyIiwiY29udGV4dCIsImdldENvbnRleHQiLCJoZWlnaHQiLCJpbm5lckhlaWdodCIsIndpZHRoIiwiaW5uZXJXaWR0aCIsImNsZWFyIiwiY2xlYXJSZWN0IiwiZHJhdyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInNhdmUiLCJsaW5lV2lkdGgiLCJzdHJva2VTdHlsZSIsImJlZ2luUGF0aCIsImFyYyIsIlBJIiwic3Ryb2tlIiwicmVzdG9yZSIsIlNjZW5lIiwiU2NlbmVTeXN0ZW0iLCJjdXJyZW50IiwicmVxdWVzdGVkIiwibXVzdENyZWF0ZSIsIm11c3RVcGRhdGUiLCJtdXN0U3dpdGNoIiwic2NlbmUiLCJyZXF1ZXN0U3dpdGNoIiwicmVxdWVzdENyZWF0ZSIsInJlcXVlc3RVcGRhdGUiLCJTeW5jRW5naW5lQ2xpZW50IiwiRW50aXRpZXMiLCJsb29wIiwibmV0d29yayIsInJlbmRlciJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87UUNWQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtR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Q0FBV0csYUFBWDtBQUNEOztBQUNELFVBQUksS0FBSSxDQUFDSCxLQUFMLENBQVdGLFVBQWYsRUFBMkI7QUFDekIsYUFBSSxDQUFDaEMsUUFBTCxDQUFjekYsS0FBZCxHQUFzQixLQUFJLENBQUNrSSxPQUFMLENBQWF6QyxRQUFuQzs7QUFDQSxhQUFJLENBQUNNLE1BQUwsQ0FBWXhELE1BQVo7O0FBQ0EsYUFBSSxDQUFDMkYsT0FBTCxDQUFhcEMsVUFBYixDQUF3QixLQUFJLENBQUNDLE1BQUwsQ0FBWS9GLEtBQXBDOztBQUNBLGFBQUksQ0FBQ21JLE1BQUwsQ0FBWTVGLE1BQVosQ0FBbUIsS0FBSSxDQUFDa0QsUUFBTCxDQUFjekYsS0FBakM7O0FBQ0EsYUFBSSxDQUFDMkgsS0FBTCxDQUFXTCxPQUFYLENBQW1CL0UsTUFBbkIsQ0FBMEIsS0FBMUI7QUFDRDtBQUNGOztBQUNELFFBQUksS0FBSSxDQUFDb0YsS0FBTCxDQUFXRCxVQUFmLEVBQTJCO0FBQ3pCLFdBQUksQ0FBQ0MsS0FBTCxDQUFXTCxPQUFYLEdBQXFCLEtBQUksQ0FBQ0ssS0FBTCxDQUFXSixTQUFoQzs7QUFDQSxXQUFJLENBQUNJLEtBQUwsQ0FBV0UsYUFBWDtBQUNEO0FBQ0YsR0FsQkQ7QUFtQkQsQ0EzQkQ7O0FBNkJBRSxtQ0FBZ0IsQ0FBQzlILFNBQWpCLENBQTJCb0IsS0FBM0IsR0FBbUMsWUFBWTtBQUM3QyxPQUFLOEcsTUFBTCxDQUFZckgsR0FBWjtBQUNBLE9BQUttSCxJQUFMLENBQVVuSCxHQUFWO0FBQ0QsQ0FIRDs7QUFLZWlILDJIQUFmLEUiLCJmaWxlIjoic3luYy1lbmdpbmUtY2xpZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiU3luY0VuZ2luZUNsaWVudFwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJTeW5jRW5naW5lQ2xpZW50XCJdID0gZmFjdG9yeSgpO1xufSkod2luZG93LCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCJjb25zdCBFbnRpdHkgPSBmdW5jdGlvbiAocGFyYW1zKSB7XG4gIGNvbnN0IGNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe1xuICAgIHV1aWQ6ICcnLFxuICAgIHg6IDAsXG4gICAgeTogMFxuICB9LCBwYXJhbXMpXG5cbiAgdGhpcy54ID0gY29uZmlnLnhcbiAgdGhpcy55ID0gY29uZmlnLnlcbn1cblxuZXhwb3J0IGRlZmF1bHQgRW50aXR5XG4iLCJpbXBvcnQgRW50aXR5IGZyb20gJy4vZW50aXR5J1xuXG5jb25zdCBFbnRpdGllc1N5c3RlbSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5jYWNoZSA9IHt9XG59XG5cbkVudGl0aWVzU3lzdGVtLnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAoY29uZmlnKSB7XG4gIGNvbmZpZy51dWlkID0gdGhpcy51dWlkKClcbiAgY29uc3QgZW50aXR5ID0gbmV3IEVudGl0eShjb25maWcpXG4gIHRoaXMuY2FjaGVbY29uZmlnLnV1aWRdID0gZW50aXR5XG4gIHJldHVybiBlbnRpdHlcbn1cblxuRW50aXRpZXNTeXN0ZW0ucHJvdG90eXBlLnV1aWQgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiAneHh4eHh4eHgteHh4eC00eHh4LXl4eHgteHh4eHh4eHh4eHh4Jy5yZXBsYWNlKC9beHldL2csIGZ1bmN0aW9uIChjKSB7XG4gICAgY29uc3QgciA9IE1hdGgucmFuZG9tKCkgKiAxNiB8IDBcbiAgICBjb25zdCB2ID0gYyA9PT0gJ3gnID8gciA6IChyICYgMHgzIHwgMHg4KVxuICAgIHJldHVybiB2LnRvU3RyaW5nKDE2KVxuICB9KVxufVxuXG5leHBvcnQgZGVmYXVsdCBFbnRpdGllc1N5c3RlbVxuIiwiY29uc3QgTG9vcCA9IGZ1bmN0aW9uIChjb25maWcpIHtcbiAgdGhpcy5mcHMgPSBjb25maWcuZnBzXG4gIHRoaXMuZnJhbWUgPSAwXG59XG5cbkxvb3AucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgIHRoaXMuc3RlcCgpXG4gIH0sIDEwMDAgLyB0aGlzLmZwcylcbn1cblxuTG9vcC5wcm90b3R5cGUuc3RlcCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5mcmFtZSsrXG4gIHRoaXMub25TdGVwKClcbn1cblxuTG9vcC5wcm90b3R5cGUub25TdGVwID0gZnVuY3Rpb24gKCkge31cblxuZXhwb3J0IGRlZmF1bHQgTG9vcFxuIiwiY29uc3QgS2V5ID0gZnVuY3Rpb24gKGtleSkge1xuICB0aGlzLmRlbHRhID0gMFxuICB0aGlzLmtleSA9IGtleVxuICB0aGlzLnN0YXJ0ID0gZmFsc2VcbiAgdGhpcy5lbmQgPSBmYWxzZVxuICB0aGlzLmhvbGQgPSBmYWxzZVxuICB0aGlzLmhvbGRUaW1lID0gMFxuICB0aGlzLnN0YXJ0RnJhbWUgPSAwXG4gIHRoaXMuZW5kRnJhbWUgPSAwXG59XG5cbmV4cG9ydCBkZWZhdWx0IEtleVxuIiwiaW1wb3J0IEtleSBmcm9tICcuL2tleSdcblxuY29uc3QgS2V5U3lzdGVtID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmVuYWJsZWQgPSB0cnVlXG4gIHRoaXMuY2FjaGUgPSB7fVxuICB0aGlzLmRlbHRhID0gMFxuICB0aGlzLm5vdyA9IDBcbiAgdGhpcy50aGVuID0gMFxuICB0aGlzLmZyYW1lID0gMFxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5oYW5kbGVLZXlEb3duLmJpbmQodGhpcyksIGZhbHNlKVxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHRoaXMuaGFuZGxlS2V5VXAuYmluZCh0aGlzKSwgZmFsc2UpXG59XG5cbktleVN5c3RlbS5wcm90b3R5cGUuaGFuZGxlS2V5RG93biA9IGZ1bmN0aW9uIChldmVudCkge1xuICBpZiAodHlwZW9mIHRoaXMuY2FjaGVbZXZlbnQua2V5XSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB0aGlzLmNhY2hlW2V2ZW50LmtleV0uaG9sZCA9IHRydWVcbiAgfVxufVxuXG5LZXlTeXN0ZW0ucHJvdG90eXBlLmhhbmRsZUtleVVwID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIGlmICh0eXBlb2YgdGhpcy5jYWNoZVtldmVudC5rZXldICE9PSAndW5kZWZpbmVkJykge1xuICAgIHRoaXMuY2FjaGVbZXZlbnQua2V5XS5ob2xkID0gZmFsc2VcbiAgfVxufVxuXG5LZXlTeXN0ZW0ucHJvdG90eXBlLmVuYWJsZSA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgaWYgKHR5cGVvZiB0aGlzLmNhY2hlW2tleV0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgdGhpcy5jYWNoZVtrZXldID0gbmV3IEtleShrZXkpXG4gIH1cbiAgcmV0dXJuIHRoaXMuY2FjaGVba2V5XVxufVxuXG5LZXlTeXN0ZW0ucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuIHRoaXMuY2FjaGVba2V5XVxufVxuXG5LZXlTeXN0ZW0ucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMuZW5hYmxlZCkge1xuICAgIHRoaXMuZnJhbWUrK1xuICAgIHRoaXMubm93ID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpXG4gICAgdGhpcy5kZWx0YSA9IHRoaXMubm93IC0gdGhpcy50aGVuXG4gICAgdGhpcy50aGVuID0gdGhpcy5ub3dcbiAgICBmb3IgKGNvbnN0IGkgaW4gdGhpcy5jYWNoZSkge1xuICAgICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodGhpcy5jYWNoZSwgaSkpIHtcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cbiAgICAgIGNvbnN0IGtleSA9IHRoaXMuY2FjaGVbaV1cbiAgICAgIGlmIChrZXkuaG9sZCkge1xuICAgICAgICBrZXkuaG9sZFRpbWUgKz0gdGhpcy5kZWx0YVxuICAgICAgICBrZXkuZW5kRnJhbWUgPSAtMVxuICAgICAgICBpZiAoa2V5LnN0YXJ0RnJhbWUgPT09IC0xKSB7XG4gICAgICAgICAga2V5LnN0YXJ0RnJhbWUgPSB0aGlzLmZyYW1lXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGtleS5ob2xkVGltZSA9IDBcbiAgICAgICAga2V5LnN0YXJ0RnJhbWUgPSAtMVxuICAgICAgICBpZiAoa2V5LmVuZEZyYW1lID09PSAtMSkge1xuICAgICAgICAgIGtleS5lbmRGcmFtZSA9IHRoaXMuZnJhbWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAga2V5LnN0YXJ0ID0gKGtleS5zdGFydEZyYW1lID09PSB0aGlzLmZyYW1lKVxuICAgICAga2V5LmVuZCA9IChrZXkuZW5kRnJhbWUgPT09IHRoaXMuZnJhbWUpXG4gICAgICBrZXkuZGVsdGEgPSB0aGlzLmRlbHRhXG4gICAgfVxuICB9XG59XG5cbktleVN5c3RlbS5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5jYWNoZSA9IHt9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEtleVN5c3RlbVxuIiwiY29uc3QgUG9pbnRlciA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5kZWx0YSA9IDBcbiAgdGhpcy5hY3RpdmUgPSBmYWxzZVxuICB0aGlzLmhvbGQgPSBmYWxzZVxuICB0aGlzLnN0YXJ0ID0gZmFsc2VcbiAgdGhpcy5lbmQgPSBmYWxzZVxuICB0aGlzLmhvbGRUaW1lID0gMFxuICB0aGlzLnN0YXJ0RnJhbWUgPSAwXG4gIHRoaXMuZW5kRnJhbWUgPSAwXG4gIHRoaXMuaWQgPSAwXG4gIHRoaXMudHlwZSA9IG51bGxcbiAgdGhpcy5zdGFydFggPSAwXG4gIHRoaXMuc3RhcnRZID0gMFxuICB0aGlzLm9mZnNldFggPSAwXG4gIHRoaXMub2Zmc2V0WSA9IDBcbiAgdGhpcy54ID0gMFxuICB0aGlzLnkgPSAwXG59XG5cbmV4cG9ydCBkZWZhdWx0IFBvaW50ZXJcbiIsImltcG9ydCBQb2ludGVyIGZyb20gJy4vcG9pbnRlcidcblxuY29uc3QgUG9pbnRlclN5c3RlbSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5lbmFibGVkID0gdHJ1ZVxuICB0aGlzLmNhY2hlID0ge31cbiAgdGhpcy5kZWx0YSA9IDBcbiAgdGhpcy5ub3cgPSAwXG4gIHRoaXMudGhlbiA9IDBcbiAgdGhpcy5mcmFtZSA9IDBcbiAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVuZGVyLWNhbnZhcycpXG4gIHRoaXMuZW5hYmxlUG9pbnRlcnMoKVxufVxuXG5Qb2ludGVyU3lzdGVtLnByb3RvdHlwZS5lbmFibGUgPSBmdW5jdGlvbiAocG9pbnRlcikge1xuICBpZiAodHlwZW9mIHRoaXMuY2FjaGVbcG9pbnRlcl0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgdGhpcy5jYWNoZVtwb2ludGVyXSA9IG5ldyBQb2ludGVyKHBvaW50ZXIpXG4gIH1cbiAgcmV0dXJuIHRoaXMuY2FjaGVbcG9pbnRlcl1cbn1cblxuUG9pbnRlclN5c3RlbS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKHBvaW50ZXIpIHtcbiAgcmV0dXJuIHRoaXMuY2FjaGVbcG9pbnRlcl1cbn1cblxuUG9pbnRlclN5c3RlbS5wcm90b3R5cGUuZW5hYmxlUG9pbnRlcnMgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuY2FudmFzLnN0eWxlLnRvdWNoQWN0aW9uID0gJ25vbmUnIC8vIG5lZWRlZCBmb3IgbW9iaWxlXG4gIHRoaXMuY2FudmFzLnN0eWxlLnVzZXJTZWxlY3QgPSAnbm9uZScgLy8gbmVlZGVkIGZvciBtb2JpbGVcbiAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCB0aGlzLmhhbmRsZVBvaW50ZXJEb3duLmJpbmQodGhpcyksIGZhbHNlKVxuICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVybW92ZScsIHRoaXMuaGFuZGxlUG9pbnRlck1vdmUuYmluZCh0aGlzKSwgZmFsc2UpXG4gIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJ1cCcsIHRoaXMuaGFuZGxlUG9pbnRlclVwQW5kQ2FuY2VsLmJpbmQodGhpcyksIGZhbHNlKVxuICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVyY2FuY2VsJywgdGhpcy5oYW5kbGVQb2ludGVyVXBBbmRDYW5jZWwuYmluZCh0aGlzKSwgZmFsc2UpXG4gIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJsZWF2ZScsIHRoaXMuaGFuZGxlUG9pbnRlclVwQW5kQ2FuY2VsLmJpbmQodGhpcyksIGZhbHNlKVxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCB0aGlzLmhhbmRsZUNvbnRleHRNZW51LmJpbmQodGhpcyksIGZhbHNlKVxufVxuXG5Qb2ludGVyU3lzdGVtLnByb3RvdHlwZS5nZXRQb2ludGVyQnlJRCA9IGZ1bmN0aW9uIChpZCkge1xuICBsZXQgb3V0cHV0ID0gZmFsc2VcbiAgZm9yIChjb25zdCBpIGluIHRoaXMuY2FjaGUpIHtcbiAgICBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwodGhpcy5jYWNoZSwgaSkpIHtcbiAgICAgIGNvbnN0IHBvaW50ZXIgPSB0aGlzLmNhY2hlW2ldXG4gICAgICBpZiAocG9pbnRlci5pZCA9PT0gaWQpIHtcbiAgICAgICAgb3V0cHV0ID0gcG9pbnRlclxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gb3V0cHV0XG59XG5cblBvaW50ZXJTeXN0ZW0ucHJvdG90eXBlLmdldEluYWN0aXZlUG9pbnRlciA9IGZ1bmN0aW9uICgpIHtcbiAgbGV0IG91dHB1dCA9IGZhbHNlXG4gIGZvciAoY29uc3QgaSBpbiB0aGlzLmNhY2hlKSB7XG4gICAgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMuY2FjaGUsIGkpKSB7XG4gICAgICBjb25zdCBwb2ludGVyID0gdGhpcy5jYWNoZVtpXVxuICAgICAgaWYgKHBvaW50ZXIuYWN0aXZlID09PSBmYWxzZSkge1xuICAgICAgICBvdXRwdXQgPSBwb2ludGVyXG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBvdXRwdXRcbn1cblxuUG9pbnRlclN5c3RlbS5wcm90b3R5cGUuaGFuZGxlUG9pbnRlckRvd24gPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICBjb25zdCBwb2ludGVyID0gdGhpcy5nZXRQb2ludGVyQnlJRChldmVudC5wb2ludGVySWQpIHx8IHRoaXMuZ2V0SW5hY3RpdmVQb2ludGVyKClcbiAgaWYgKHBvaW50ZXIpIHtcbiAgICBwb2ludGVyLmFjdGl2ZSA9IHRydWVcbiAgICBwb2ludGVyLmlkID0gZXZlbnQucG9pbnRlcklkXG4gICAgcG9pbnRlci50eXBlID0gZXZlbnQucG9pbnRlclR5cGUgLy8gJ21vdXNlJywgJ3BlbicsICd0b3VjaCdcbiAgICBwb2ludGVyLmhvbGQgPSB0cnVlXG4gICAgcG9pbnRlci5zdGFydFggPSBldmVudC5jbGllbnRYIC0gZXZlbnQudGFyZ2V0Lm9mZnNldExlZnRcbiAgICBwb2ludGVyLnN0YXJ0WSA9IGV2ZW50LmNsaWVudFkgLSBldmVudC50YXJnZXQub2Zmc2V0VG9wXG4gICAgcG9pbnRlci54ID0gZXZlbnQuY2xpZW50WCAtIGV2ZW50LnRhcmdldC5vZmZzZXRMZWZ0XG4gICAgcG9pbnRlci55ID0gZXZlbnQuY2xpZW50WSAtIGV2ZW50LnRhcmdldC5vZmZzZXRUb3BcbiAgfVxufVxuXG5Qb2ludGVyU3lzdGVtLnByb3RvdHlwZS5oYW5kbGVQb2ludGVyTW92ZSA9IGZ1bmN0aW9uIChldmVudCkge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gIGNvbnN0IHBvaW50ZXIgPSB0aGlzLmdldFBvaW50ZXJCeUlEKGV2ZW50LnBvaW50ZXJJZCkgfHwgdGhpcy5nZXRJbmFjdGl2ZVBvaW50ZXIoKVxuICBpZiAocG9pbnRlcikge1xuICAgIHBvaW50ZXIuaWQgPSBldmVudC5wb2ludGVySWRcbiAgICBwb2ludGVyLnggPSBldmVudC5jbGllbnRYIC0gZXZlbnQudGFyZ2V0Lm9mZnNldExlZnRcbiAgICBwb2ludGVyLnkgPSBldmVudC5jbGllbnRZIC0gZXZlbnQudGFyZ2V0Lm9mZnNldFRvcFxuICB9XG59XG5cblBvaW50ZXJTeXN0ZW0ucHJvdG90eXBlLmhhbmRsZVBvaW50ZXJVcEFuZENhbmNlbCA9IGZ1bmN0aW9uIChldmVudCkge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gIGNvbnN0IHBvaW50ZXIgPSB0aGlzLmdldFBvaW50ZXJCeUlEKGV2ZW50LnBvaW50ZXJJZClcbiAgaWYgKHBvaW50ZXIpIHtcbiAgICBwb2ludGVyLmFjdGl2ZSA9IGZhbHNlXG4gICAgcG9pbnRlci5ob2xkID0gZmFsc2VcbiAgfVxufVxuXG5Qb2ludGVyU3lzdGVtLnByb3RvdHlwZS5oYW5kbGVDb250ZXh0TWVudSA9IGZ1bmN0aW9uIChldmVudCkge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gIHJldHVybiBmYWxzZVxufVxuXG5Qb2ludGVyU3lzdGVtLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLmVuYWJsZWQpIHtcbiAgICB0aGlzLmZyYW1lKytcbiAgICB0aGlzLm5vdyA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKVxuICAgIHRoaXMuZGVsdGEgPSB0aGlzLm5vdyAtIHRoaXMudGhlblxuICAgIHRoaXMudGhlbiA9IHRoaXMubm93XG4gICAgZm9yIChjb25zdCBpIGluIHRoaXMuY2FjaGUpIHtcbiAgICAgIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbCh0aGlzLmNhY2hlLCBpKSkge1xuICAgICAgICBjb25zdCBwb2ludGVyID0gdGhpcy5jYWNoZVtpXVxuICAgICAgICBpZiAocG9pbnRlci5ob2xkKSB7XG4gICAgICAgICAgcG9pbnRlci5vZmZzZXRYID0gKHBvaW50ZXIueCAtIHBvaW50ZXIuc3RhcnRYKVxuICAgICAgICAgIHBvaW50ZXIub2Zmc2V0WSA9IChwb2ludGVyLnkgLSBwb2ludGVyLnN0YXJ0WSlcbiAgICAgICAgICBwb2ludGVyLmhvbGRUaW1lICs9IHRoaXMuZGVsdGFcbiAgICAgICAgICBwb2ludGVyLmVuZEZyYW1lID0gLTFcbiAgICAgICAgICBpZiAocG9pbnRlci5zdGFydEZyYW1lID09PSAtMSkge1xuICAgICAgICAgICAgcG9pbnRlci5zdGFydEZyYW1lID0gdGhpcy5mcmFtZVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwb2ludGVyLm9mZnNldFggPSAwXG4gICAgICAgICAgcG9pbnRlci5vZmZzZXRZID0gMFxuICAgICAgICAgIHBvaW50ZXIuaG9sZFRpbWUgPSAwXG4gICAgICAgICAgcG9pbnRlci5zdGFydEZyYW1lID0gLTFcbiAgICAgICAgICBpZiAocG9pbnRlci5lbmRGcmFtZSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHBvaW50ZXIuZW5kRnJhbWUgPSB0aGlzLmZyYW1lXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHBvaW50ZXIuc3RhcnQgPSAocG9pbnRlci5zdGFydEZyYW1lID09PSB0aGlzLmZyYW1lKVxuICAgICAgICBwb2ludGVyLmVuZCA9IChwb2ludGVyLmVuZEZyYW1lID09PSB0aGlzLmZyYW1lKVxuICAgICAgICBwb2ludGVyLmRlbHRhID0gdGhpcy5kZWx0YVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5Qb2ludGVyU3lzdGVtLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmNhY2hlID0ge31cbn1cblxuZXhwb3J0IGRlZmF1bHQgUG9pbnRlclN5c3RlbVxuIiwiaW1wb3J0IEtleXMgZnJvbSAnLi9rZXktc3lzdGVtJ1xuaW1wb3J0IFBvaW50ZXJzIGZyb20gJy4vcG9pbnRlci1zeXN0ZW0nXG5cbmNvbnN0IElucHV0cyA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5jYWNoZSA9IHt9XG4gIHRoaXMua2V5cyA9IG5ldyBLZXlzKClcbiAgdGhpcy5wb2ludGVycyA9IG5ldyBQb2ludGVycygpXG59XG5cbklucHV0cy5wcm90b3R5cGUuZW5hYmxlS2V5ID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gdGhpcy5rZXlzLmVuYWJsZShrZXkpXG59XG5cbklucHV0cy5wcm90b3R5cGUuZ2V0S2V5ID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gdGhpcy5rZXlzLmdldChrZXkpXG59XG5cbklucHV0cy5wcm90b3R5cGUuZW5hYmxlUG9pbnRlciA9IGZ1bmN0aW9uIChwb2ludGVyKSB7XG4gIHJldHVybiB0aGlzLnBvaW50ZXJzLmVuYWJsZShwb2ludGVyKVxufVxuXG5JbnB1dHMucHJvdG90eXBlLmdldFBvaW50ZXIgPSBmdW5jdGlvbiAocG9pbnRlcikge1xuICByZXR1cm4gdGhpcy5wb2ludGVycy5nZXQocG9pbnRlcilcbn1cblxuSW5wdXRzLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMua2V5cy51cGRhdGUoKVxuICB0aGlzLnBvaW50ZXJzLnVwZGF0ZSgpXG4gIHRoaXMuY2FjaGUua2V5cyA9IHRoaXMua2V5cy5jYWNoZVxuICB0aGlzLmNhY2hlLnBvaW50ZXJzID0gdGhpcy5wb2ludGVycy5jYWNoZVxufVxuXG5leHBvcnQgZGVmYXVsdCBJbnB1dHNcbiIsImNvbnN0IE5ldHdvcmsgPSBmdW5jdGlvbiAoY29uZmlnKSB7XG4gIHRoaXMuc29ja2V0ID0gY29uZmlnLnNvY2tldFxuICB0aGlzLmVudGl0aWVzID0ge31cbiAgdGhpcy5jbGllbnRJbnB1dHMgPSBbXVxuXG4gIHRoaXMuc29ja2V0Lm9uKCdjb25uZWN0aW9uJywgKGlkKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ2Nvbm5lY3Rpb24nLCBpZClcbiAgfSlcblxuICB0aGlzLnNvY2tldC5vbignZW50aXRpZXMnLCAoZW50aXRpZXMpID0+IHtcbiAgICB0aGlzLmVudGl0aWVzID0gZW50aXRpZXNcbiAgfSlcbn1cblxuTmV0d29yay5wcm90b3R5cGUuc2VuZElucHV0cyA9IGZ1bmN0aW9uIChpbnB1dHMpIHtcbiAgdGhpcy5zb2NrZXQuZW1pdCgnY2xpZW50LWlucHV0cycsIGlucHV0cylcbn1cblxuZXhwb3J0IGRlZmF1bHQgTmV0d29ya1xuIiwiY29uc3QgUmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZW5kZXItY2FudmFzJylcbiAgdGhpcy5jb250ZXh0ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKVxuICB0aGlzLmNhbnZhcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHRcbiAgdGhpcy5jYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aFxuICB0aGlzLmVudGl0aWVzID0ge31cbn1cblxuUmVuZGVyLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KVxufVxuXG5SZW5kZXIucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5kcmF3KClcbiAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnJ1bi5iaW5kKHRoaXMpKVxufVxuXG5SZW5kZXIucHJvdG90eXBlLmRyYXcgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuY2xlYXIoKVxuICBmb3IgKGNvbnN0IGkgaW4gdGhpcy5lbnRpdGllcykge1xuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodGhpcy5lbnRpdGllcywgaSkpIHtcbiAgICAgIGNvbnN0IGVudGl0eSA9IHRoaXMuZW50aXRpZXNbaV1cbiAgICAgIHRoaXMuY29udGV4dC5zYXZlKClcbiAgICAgIC8vIGNpcmNsZVxuICAgICAgdGhpcy5jb250ZXh0LmxpbmVXaWR0aCA9ICcxJ1xuICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZVN0eWxlID0gJyMwMGZmMDAnXG4gICAgICB0aGlzLmNvbnRleHQuYmVnaW5QYXRoKClcbiAgICAgIHRoaXMuY29udGV4dC5hcmMoZW50aXR5LngsIGVudGl0eS55LCAzMCwgMCwgMiAqIE1hdGguUEkpXG4gICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlKClcbiAgICAgIHRoaXMuY29udGV4dC5yZXN0b3JlKClcbiAgICB9XG4gIH1cbn1cblxuUmVuZGVyLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZW50aXRpZXMpIHtcbiAgdGhpcy5lbnRpdGllcyA9IGVudGl0aWVzXG59XG5cbmV4cG9ydCBkZWZhdWx0IFJlbmRlclxuIiwiY29uc3QgU2NlbmUgPSBmdW5jdGlvbiAocGFyYW1zKSB7XG4gIGNvbnN0IGNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe1xuICAgIGNyZWF0ZTogKCkgPT4ge30sXG4gICAgdXBkYXRlOiAoKSA9PiB7fVxuICB9LCBwYXJhbXMpXG5cbiAgdGhpcy5jcmVhdGUgPSBjb25maWcuY3JlYXRlXG4gIHRoaXMudXBkYXRlID0gY29uZmlnLnVwZGF0ZVxufVxuXG5leHBvcnQgZGVmYXVsdCBTY2VuZVxuIiwiaW1wb3J0IFNjZW5lIGZyb20gJy4vc2NlbmUnXG5cbmNvbnN0IFNjZW5lU3lzdGVtID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmN1cnJlbnQgPSBudWxsXG4gIHRoaXMucmVxdWVzdGVkID0gbnVsbFxuICB0aGlzLm11c3RDcmVhdGUgPSBmYWxzZVxuICB0aGlzLm11c3RVcGRhdGUgPSBmYWxzZVxuICB0aGlzLm11c3RTd2l0Y2ggPSBmYWxzZVxufVxuXG5TY2VuZVN5c3RlbS5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKGNvbmZpZykge1xuICByZXR1cm4gbmV3IFNjZW5lKGNvbmZpZylcbn1cblxuU2NlbmVTeXN0ZW0ucHJvdG90eXBlLnN3aXRjaCA9IGZ1bmN0aW9uIChzY2VuZSkge1xuICB0aGlzLnJlcXVlc3RlZCA9IHNjZW5lXG4gIHRoaXMucmVxdWVzdFN3aXRjaCgpXG59XG5cblNjZW5lU3lzdGVtLnByb3RvdHlwZS5yZXF1ZXN0Q3JlYXRlID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLm11c3RDcmVhdGUgPSB0cnVlXG4gIHRoaXMubXVzdFVwZGF0ZSA9IGZhbHNlXG4gIHRoaXMubXVzdFN3aXRjaCA9IGZhbHNlXG59XG5cblNjZW5lU3lzdGVtLnByb3RvdHlwZS5yZXF1ZXN0VXBkYXRlID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLm11c3RDcmVhdGUgPSBmYWxzZVxuICB0aGlzLm11c3RVcGRhdGUgPSB0cnVlXG4gIHRoaXMubXVzdFN3aXRjaCA9IGZhbHNlXG59XG5cblNjZW5lU3lzdGVtLnByb3RvdHlwZS5yZXF1ZXN0U3dpdGNoID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLm11c3RDcmVhdGUgPSBmYWxzZVxuICB0aGlzLm11c3RVcGRhdGUgPSBmYWxzZVxuICB0aGlzLm11c3RTd2l0Y2ggPSB0cnVlXG59XG5cbmV4cG9ydCBkZWZhdWx0IFNjZW5lU3lzdGVtXG4iLCJpbXBvcnQgRW50aXRpZXMgZnJvbSAnLi9lbnRpdGllcy9lbnRpdGllcy1zeXN0ZW0nXG5pbXBvcnQgTG9vcCBmcm9tICcuL2xvb3AvbG9vcCdcbmltcG9ydCBJbnB1dHMgZnJvbSAnLi9pbnB1dHMvaW5wdXRzLWNsaWVudCdcbmltcG9ydCBOZXR3b3JrIGZyb20gJy4vbmV0d29yay9uZXR3b3JrLXN5c3RlbS1jbGllbnQnXG5pbXBvcnQgUmVuZGVyIGZyb20gJy4vcmVuZGVyL3JlbmRlcidcbmltcG9ydCBTY2VuZSBmcm9tICcuL3NjZW5lL3NjZW5lLXN5c3RlbSdcblxuY29uc3QgU3luY0VuZ2luZUNsaWVudCA9IGZ1bmN0aW9uIChjb25maWcpIHtcbiAgdGhpcy5lbnRpdGllcyA9IG5ldyBFbnRpdGllcygpXG4gIHRoaXMubG9vcCA9IG5ldyBMb29wKGNvbmZpZy5sb29wKVxuICB0aGlzLmlucHV0cyA9IG5ldyBJbnB1dHMoKVxuICB0aGlzLm5ldHdvcmsgPSBuZXcgTmV0d29yayhjb25maWcubmV0d29yaylcbiAgdGhpcy5yZW5kZXIgPSBuZXcgUmVuZGVyKClcbiAgdGhpcy5zY2VuZSA9IG5ldyBTY2VuZSgpXG5cbiAgdGhpcy5sb29wLm9uU3RlcCA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5zY2VuZS5jdXJyZW50KSB7XG4gICAgICBpZiAodGhpcy5zY2VuZS5tdXN0Q3JlYXRlKSB7XG4gICAgICAgIHRoaXMuc2NlbmUuY3VycmVudC5jcmVhdGUodGhpcylcbiAgICAgICAgdGhpcy5zY2VuZS5yZXF1ZXN0VXBkYXRlKClcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnNjZW5lLm11c3RVcGRhdGUpIHtcbiAgICAgICAgdGhpcy5lbnRpdGllcy5jYWNoZSA9IHRoaXMubmV0d29yay5lbnRpdGllc1xuICAgICAgICB0aGlzLmlucHV0cy51cGRhdGUoKVxuICAgICAgICB0aGlzLm5ldHdvcmsuc2VuZElucHV0cyh0aGlzLmlucHV0cy5jYWNoZSlcbiAgICAgICAgdGhpcy5yZW5kZXIudXBkYXRlKHRoaXMuZW50aXRpZXMuY2FjaGUpXG4gICAgICAgIHRoaXMuc2NlbmUuY3VycmVudC51cGRhdGUodGhpcylcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMuc2NlbmUubXVzdFN3aXRjaCkge1xuICAgICAgdGhpcy5zY2VuZS5jdXJyZW50ID0gdGhpcy5zY2VuZS5yZXF1ZXN0ZWRcbiAgICAgIHRoaXMuc2NlbmUucmVxdWVzdENyZWF0ZSgpXG4gICAgfVxuICB9XG59XG5cblN5bmNFbmdpbmVDbGllbnQucHJvdG90eXBlLnN0YXJ0ID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLnJlbmRlci5ydW4oKVxuICB0aGlzLmxvb3AucnVuKClcbn1cblxuZXhwb3J0IGRlZmF1bHQgU3luY0VuZ2luZUNsaWVudFxuIl0sInNvdXJjZVJvb3QiOiIifQ==