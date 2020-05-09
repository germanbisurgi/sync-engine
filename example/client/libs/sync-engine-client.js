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
// CONCATENATED MODULE: ./src/loader/loader.js
/* global Image */
var Loader = function Loader() {
  this.imagesCache = {};
  this.audioCache = {};
  this.start = false;
  this.loading = false;
  this.complete = false;
  this.errors = 0;
  this.success = 0;
  this.queued = 0;
};

Loader.prototype.loadImage = function (config) {
  var _this = this;

  this.queued++;
  return new Promise(function (resolve, reject) {
    var image = new Image();

    image.onload = function () {
      _this.success++;
      _this.imagesCache[config.name] = image;

      _this.onSuccess(config);

      resolve(image);
    };

    image.onerror = function (reason) {
      _this.errors++;

      _this.onError(config);

      reject(reason);
    };

    image.src = config.url;
  });
};

Loader.prototype.loadAudio = function (config) {
  var _this2 = this;

  this.queued++;
  return new Promise(function (resolve, reject) {
    var xhr = new window.XMLHttpRequest();
    var AudioContext = new (window.AudioContext || window.webkitAudioContext)();
    xhr.open('GET', config.url, true);
    xhr.responseType = 'arraybuffer';

    xhr.onload = function () {
      AudioContext.decodeAudioData(xhr.response, function (buffer) {
        _this2.success++;
        _this2.audioCache[config.name] = buffer;

        _this2.onSuccess(config);

        resolve(buffer);
      }, function (reason) {
        _this2.errors++;

        _this2.onError(config);

        reject(reason);
      });
    };

    xhr.onerror = function (reason) {
      _this2.errors++;

      _this2.onError(config);

      reject(reason);
    };

    xhr.send();
  });
};

Loader.prototype.onStart = function () {};

Loader.prototype.onSuccess = function () {};

Loader.prototype.onError = function () {};

Loader.prototype.onProgress = function () {};

Loader.prototype.onComplete = function () {};

Loader.prototype.update = function () {
  if (this.queued > 0) {
    if (!this.start) {
      this.start = true;
      this.onStart();
    }

    if (this.queued === this.success + this.errors) {
      this.queued = 0;
      this.success = 0;
      this.errors = 0;
      this.loading = false;
      this.complete = true;
      this.start = false;
      this.onComplete();
    } else {
      this.loading = true;
      this.complete = false;
    }

    var progress = Math.floor((this.success + this.errors) / this.queued * 100);

    if (isNaN(progress)) {
      progress = 100;
    }

    this.onProgress(progress);
  }
};

/* harmony default export */ var loader = (Loader);
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
var Network = function Network(params) {
  var _this = this;

  var config = Object.assign({
    socket: null,
    interpolationDelay: 100
  }, params);
  this.socket = config.socket;
  this.interpolationDelay = config.interpolationDelay;
  this.clientId = '';
  this.entities = {};
  this.serverUpdates = [];
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
    var r = (serverTime - baseUpdate.timestamp) / (next.timestamp - baseUpdate.timestamp);
    var interpolated = {};

    for (var i in baseUpdate.entities) {
      if (!Object.prototype.hasOwnProperty.call(baseUpdate.entities, i)) {
        continue;
      }

      var olderEntity = baseUpdate.entities[i];
      var newerEntity = typeof next.entities[i] !== 'undefined' ? next.entities[i] : olderEntity;
      interpolated[i] = {
        id: newerEntity.id,
        x: this.interpolate(olderEntity.x, newerEntity.x, r),
        y: this.interpolate(olderEntity.y, newerEntity.y, r),
        a: this.interpolate(olderEntity.a, newerEntity.a, r),
        image: newerEntity.image,
        sx: newerEntity.sx,
        sy: newerEntity.sy,
        sw: newerEntity.sw,
        sh: newerEntity.sh,
        w: newerEntity.w,
        h: newerEntity.h,
        ax: newerEntity.ax,
        ay: newerEntity.ay,
        s: newerEntity.s
      };
    }

    return interpolated;
  }
};

Network.prototype.interpolate = function (older, newer, ratio) {
  return older + (newer - older) * ratio;
};

Network.prototype.currentServerTime = function () {
  return this.firstServerTimestamp + (Date.now() - this.firstClientTimestamp) - this.interpolationDelay;
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
  return this.firstServerTimestamp + (Date.now() - this.firstClientTimestamp) - this.interpolationDelay;
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
  this.imagesCache = {};
  this.entities = {};
};

Render.prototype.getImage = function (image) {
  return this.imagesCache[image];
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
      this.context.save();
      this.context.translate(entity.x + entity.w * 0.5 * entity.s - entity.w * entity.ax * entity.s, entity.y + entity.h * 0.5 * entity.s - entity.h * entity.ay * entity.s);
      this.context.rotate(entity.a);
      this.context.scale(entity.s, entity.s);
      var image = this.getImage(entity.image);

      if (entity.sw === 0) {
        entity.sw = image.width;
      }

      if (entity.sh === 0) {
        entity.sh = image.height;
      }

      this.context.drawImage(image, entity.sx, entity.sy, entity.sw, entity.sh, entity.w * -0.5, // do not touch this
      entity.h * -0.5, // do not touch this
      entity.w, // do not touch this
      entity.h // do not touch this
      ); // circle
      // this.context.lineWidth = '1'
      // this.context.strokeStyle = '#00ff00'
      // this.context.beginPath()
      // this.context.arc(entity.x, entity.y, 30, 0, 2 * Math.PI)
      // this.context.stroke()

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
// CONCATENATED MODULE: ./src/sync-engine-client.js








var sync_engine_client_SyncEngineClient = function SyncEngineClient(config) {
  var _this = this;

  this.entities = new entities_system();
  this.loader = new loader();
  this.loop = new loop(config.loop);
  this.inputs = new inputs_client();
  this.network = new network_system_client(config.network);
  this.render = new render();
  this.scene = new scene_system();

  this.loop.onStep = function () {
    if (_this.scene.current) {
      if (_this.scene.mustPreload) {
        if (!_this.loader.loading) {
          _this.scene.current.preload(_this);
        }

        _this.loader.update();

        if (_this.loader.complete) {
          _this.render.imagesCache = _this.loader.imagesCache;

          _this.scene.requestCreate();
        }
      }

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

      _this.scene.requestPreload();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9TeW5jRW5naW5lQ2xpZW50L3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9TeW5jRW5naW5lQ2xpZW50L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL1N5bmNFbmdpbmVDbGllbnQvLi9zcmMvZW50aXRpZXMvZW50aXR5LmpzIiwid2VicGFjazovL1N5bmNFbmdpbmVDbGllbnQvLi9zcmMvZW50aXRpZXMvZW50aXRpZXMtc3lzdGVtLmpzIiwid2VicGFjazovL1N5bmNFbmdpbmVDbGllbnQvLi9zcmMvbG9hZGVyL2xvYWRlci5qcyIsIndlYnBhY2s6Ly9TeW5jRW5naW5lQ2xpZW50Ly4vc3JjL2xvb3AvbG9vcC5qcyIsIndlYnBhY2s6Ly9TeW5jRW5naW5lQ2xpZW50Ly4vc3JjL2lucHV0cy9rZXkuanMiLCJ3ZWJwYWNrOi8vU3luY0VuZ2luZUNsaWVudC8uL3NyYy9pbnB1dHMva2V5LXN5c3RlbS5qcyIsIndlYnBhY2s6Ly9TeW5jRW5naW5lQ2xpZW50Ly4vc3JjL2lucHV0cy9wb2ludGVyLmpzIiwid2VicGFjazovL1N5bmNFbmdpbmVDbGllbnQvLi9zcmMvaW5wdXRzL3BvaW50ZXItc3lzdGVtLmpzIiwid2VicGFjazovL1N5bmNFbmdpbmVDbGllbnQvLi9zcmMvaW5wdXRzL2lucHV0cy1jbGllbnQuanMiLCJ3ZWJwYWNrOi8vU3luY0VuZ2luZUNsaWVudC8uL3NyYy9uZXR3b3JrL25ldHdvcmstc3lzdGVtLWNsaWVudC5qcyIsIndlYnBhY2s6Ly9TeW5jRW5naW5lQ2xpZW50Ly4vc3JjL3JlbmRlci9yZW5kZXIuanMiLCJ3ZWJwYWNrOi8vU3luY0VuZ2luZUNsaWVudC8uL3NyYy9zY2VuZS9zY2VuZS5qcyIsIndlYnBhY2s6Ly9TeW5jRW5naW5lQ2xpZW50Ly4vc3JjL3NjZW5lL3NjZW5lLXN5c3RlbS5qcyIsIndlYnBhY2s6Ly9TeW5jRW5naW5lQ2xpZW50Ly4vc3JjL3N5bmMtZW5naW5lLWNsaWVudC5qcyJdLCJuYW1lcyI6WyJFbnRpdHkiLCJwYXJhbXMiLCJjb25maWciLCJPYmplY3QiLCJhc3NpZ24iLCJpZCIsIngiLCJ5IiwiYSIsImltYWdlIiwic3giLCJzeSIsInN3Iiwic2giLCJ3IiwiaCIsImF4IiwiYXkiLCJzIiwiRW50aXRpZXNTeXN0ZW0iLCJjYWNoZSIsInByb3RvdHlwZSIsImNyZWF0ZSIsImNyZWF0ZUlkIiwiZW50aXR5IiwicmVwbGFjZSIsImMiLCJyIiwiTWF0aCIsInJhbmRvbSIsInYiLCJ0b1N0cmluZyIsIkxvYWRlciIsImltYWdlc0NhY2hlIiwiYXVkaW9DYWNoZSIsInN0YXJ0IiwibG9hZGluZyIsImNvbXBsZXRlIiwiZXJyb3JzIiwic3VjY2VzcyIsInF1ZXVlZCIsImxvYWRJbWFnZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiSW1hZ2UiLCJvbmxvYWQiLCJuYW1lIiwib25TdWNjZXNzIiwib25lcnJvciIsInJlYXNvbiIsIm9uRXJyb3IiLCJzcmMiLCJ1cmwiLCJsb2FkQXVkaW8iLCJ4aHIiLCJ3aW5kb3ciLCJYTUxIdHRwUmVxdWVzdCIsIkF1ZGlvQ29udGV4dCIsIndlYmtpdEF1ZGlvQ29udGV4dCIsIm9wZW4iLCJyZXNwb25zZVR5cGUiLCJkZWNvZGVBdWRpb0RhdGEiLCJyZXNwb25zZSIsImJ1ZmZlciIsInNlbmQiLCJvblN0YXJ0Iiwib25Qcm9ncmVzcyIsIm9uQ29tcGxldGUiLCJ1cGRhdGUiLCJwcm9ncmVzcyIsImZsb29yIiwiaXNOYU4iLCJMb29wIiwiZnBzIiwiZnJhbWUiLCJydW4iLCJzZXRJbnRlcnZhbCIsInN0ZXAiLCJvblN0ZXAiLCJLZXkiLCJrZXkiLCJkZWx0YSIsImVuZCIsImhvbGQiLCJob2xkVGltZSIsInN0YXJ0RnJhbWUiLCJlbmRGcmFtZSIsIktleVN5c3RlbSIsImVuYWJsZWQiLCJub3ciLCJ0aGVuIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiaGFuZGxlS2V5RG93biIsImJpbmQiLCJoYW5kbGVLZXlVcCIsImV2ZW50IiwiZW5hYmxlIiwiZ2V0IiwicGVyZm9ybWFuY2UiLCJpIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwiZGVzdHJveSIsIlBvaW50ZXIiLCJhY3RpdmUiLCJ0eXBlIiwic3RhcnRYIiwic3RhcnRZIiwib2Zmc2V0WCIsIm9mZnNldFkiLCJQb2ludGVyU3lzdGVtIiwiY2FudmFzIiwicXVlcnlTZWxlY3RvciIsImVuYWJsZVBvaW50ZXJzIiwicG9pbnRlciIsInN0eWxlIiwidG91Y2hBY3Rpb24iLCJ1c2VyU2VsZWN0IiwiaGFuZGxlUG9pbnRlckRvd24iLCJoYW5kbGVQb2ludGVyTW92ZSIsImhhbmRsZVBvaW50ZXJVcEFuZENhbmNlbCIsImhhbmRsZUNvbnRleHRNZW51IiwiZ2V0UG9pbnRlckJ5SUQiLCJvdXRwdXQiLCJnZXRJbmFjdGl2ZVBvaW50ZXIiLCJwcmV2ZW50RGVmYXVsdCIsInBvaW50ZXJJZCIsInBvaW50ZXJUeXBlIiwiY2xpZW50WCIsInRhcmdldCIsIm9mZnNldExlZnQiLCJjbGllbnRZIiwib2Zmc2V0VG9wIiwic3RvcFByb3BhZ2F0aW9uIiwiSW5wdXRzIiwia2V5cyIsIktleXMiLCJwb2ludGVycyIsIlBvaW50ZXJzIiwiZW5hYmxlS2V5IiwiZ2V0S2V5IiwiZW5hYmxlUG9pbnRlciIsImdldFBvaW50ZXIiLCJOZXR3b3JrIiwic29ja2V0IiwiaW50ZXJwb2xhdGlvbkRlbGF5IiwiY2xpZW50SWQiLCJlbnRpdGllcyIsInNlcnZlclVwZGF0ZXMiLCJmaXJzdFNlcnZlclRpbWVzdGFtcCIsImZpcnN0Q2xpZW50VGltZXN0YW1wIiwib24iLCJkYXRhIiwicHJvY2Vzc0dhbWVVcGRhdGUiLCJ0aW1lc3RhbXAiLCJEYXRlIiwicHVzaCIsImJhc2UiLCJnZXRCYXNlVXBkYXRlIiwic3BsaWNlIiwiZ2V0Q3VycmVudFN0YXRlIiwic2VydmVyVGltZSIsImN1cnJlbnRTZXJ2ZXJUaW1lIiwibGVuZ3RoIiwiYmFzZVVwZGF0ZSIsIm5leHQiLCJpbnRlcnBvbGF0ZWQiLCJvbGRlckVudGl0eSIsIm5ld2VyRW50aXR5IiwiaW50ZXJwb2xhdGUiLCJvbGRlciIsIm5ld2VyIiwicmF0aW8iLCJnZXRDdXJyZW50U2VydmVyVGltZXN0YW1wIiwiaW5wdXRzIiwic2VuZElucHV0cyIsImVtaXQiLCJSZW5kZXIiLCJjb250ZXh0IiwiZ2V0Q29udGV4dCIsImhlaWdodCIsImlubmVySGVpZ2h0Iiwid2lkdGgiLCJpbm5lcldpZHRoIiwiZ2V0SW1hZ2UiLCJjbGVhciIsImNsZWFyUmVjdCIsImRyYXciLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJzYXZlIiwidHJhbnNsYXRlIiwicm90YXRlIiwic2NhbGUiLCJkcmF3SW1hZ2UiLCJyZXN0b3JlIiwiU2NlbmUiLCJwcmVsb2FkIiwiU2NlbmVTeXN0ZW0iLCJjdXJyZW50IiwicmVxdWVzdGVkIiwibXVzdFByZWxvYWQiLCJtdXN0Q3JlYXRlIiwibXVzdFVwZGF0ZSIsIm11c3RTd2l0Y2giLCJzY2VuZSIsInJlcXVlc3RTd2l0Y2giLCJyZXF1ZXN0UHJlbG9hZCIsInJlcXVlc3RDcmVhdGUiLCJyZXF1ZXN0VXBkYXRlIiwiU3luY0VuZ2luZUNsaWVudCIsIkVudGl0aWVzIiwibG9hZGVyIiwibG9vcCIsIm5ldHdvcmsiLCJyZW5kZXIiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO1FDVkE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtR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LENBQVk1SixLQUFwQzs7QUFDQSxhQUFJLENBQUNvTSxNQUFMLENBQVluSixNQUFaLENBQW1CLEtBQUksQ0FBQ2dGLFFBQUwsQ0FBY2pJLEtBQWpDOztBQUNBLGFBQUksQ0FBQzBMLEtBQUwsQ0FBV04sT0FBWCxDQUFtQm5JLE1BQW5CLENBQTBCLEtBQTFCO0FBQ0Q7QUFDRjs7QUFDRCxRQUFJLEtBQUksQ0FBQ3lJLEtBQUwsQ0FBV0QsVUFBZixFQUEyQjtBQUN6QixXQUFJLENBQUNDLEtBQUwsQ0FBV04sT0FBWCxHQUFxQixLQUFJLENBQUNNLEtBQUwsQ0FBV0wsU0FBaEM7O0FBQ0EsV0FBSSxDQUFDSyxLQUFMLENBQVdFLGNBQVg7QUFDRDtBQUNGLEdBNUJEO0FBNkJELENBdENEOztBQXdDQUcsbUNBQWdCLENBQUM5TCxTQUFqQixDQUEyQmMsS0FBM0IsR0FBbUMsWUFBWTtBQUM3QyxPQUFLcUwsTUFBTCxDQUFZNUksR0FBWjtBQUNBLE9BQUswSSxJQUFMLENBQVUxSSxHQUFWO0FBQ0QsQ0FIRDs7QUFLZXVJLDJIQUFmLEUiLCJmaWxlIjoic3luYy1lbmdpbmUtY2xpZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiU3luY0VuZ2luZUNsaWVudFwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJTeW5jRW5naW5lQ2xpZW50XCJdID0gZmFjdG9yeSgpO1xufSkod2luZG93LCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCJjb25zdCBFbnRpdHkgPSBmdW5jdGlvbiAocGFyYW1zKSB7XG4gIGNvbnN0IGNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe1xuICAgIGlkOiAnJyxcbiAgICB4OiAwLFxuICAgIHk6IDAsXG4gICAgYTogMCxcbiAgICBpbWFnZTogJycsXG4gICAgc3g6IDAsXG4gICAgc3k6IDAsXG4gICAgc3c6IDAsXG4gICAgc2g6IDAsXG4gICAgdzogNTAsXG4gICAgaDogNTAsXG4gICAgYXg6IDAuNSxcbiAgICBheTogMC41LFxuICAgIHM6IDFcbiAgfSwgcGFyYW1zKVxuXG4gIC8vIHRvZG86IGJvZHlJZFxuXG4gIHRoaXMuaWQgPSBjb25maWcuaWRcbiAgdGhpcy54ID0gY29uZmlnLnhcbiAgdGhpcy55ID0gY29uZmlnLnlcbiAgdGhpcy5hID0gY29uZmlnLmFcbiAgdGhpcy5pbWFnZSA9IGNvbmZpZy5pbWFnZVxuICB0aGlzLnN4ID0gY29uZmlnLnN4XG4gIHRoaXMuc3kgPSBjb25maWcuc3lcbiAgdGhpcy5zdyA9IGNvbmZpZy5zd1xuICB0aGlzLnNoID0gY29uZmlnLnNoXG4gIHRoaXMudyA9IGNvbmZpZy53XG4gIHRoaXMuaCA9IGNvbmZpZy5oXG4gIHRoaXMuYXggPSBjb25maWcuYXhcbiAgdGhpcy5heSA9IGNvbmZpZy5heVxuICB0aGlzLnMgPSBjb25maWcuc1xufVxuXG5leHBvcnQgZGVmYXVsdCBFbnRpdHlcbiIsImltcG9ydCBFbnRpdHkgZnJvbSAnLi9lbnRpdHknXG5cbmNvbnN0IEVudGl0aWVzU3lzdGVtID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmNhY2hlID0ge31cbn1cblxuRW50aXRpZXNTeXN0ZW0ucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgY29uc3QgY29uZmlnID0gT2JqZWN0LmFzc2lnbih7XG4gICAgaWQ6IHRoaXMuY3JlYXRlSWQoKSxcbiAgICB4OiAwLFxuICAgIHk6IDBcbiAgfSwgcGFyYW1zKVxuICBjb25zdCBlbnRpdHkgPSBuZXcgRW50aXR5KGNvbmZpZylcbiAgdGhpcy5jYWNoZVtjb25maWcuaWRdID0gZW50aXR5XG4gIHJldHVybiBlbnRpdHlcbn1cblxuRW50aXRpZXNTeXN0ZW0ucHJvdG90eXBlLmNyZWF0ZUlkID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gJ3h4eHh4eHh4LXh4eHgtNHh4eC15eHh4LXh4eHh4eHh4eHh4eCcucmVwbGFjZSgvW3h5XS9nLCBmdW5jdGlvbiAoYykge1xuICAgIGNvbnN0IHIgPSBNYXRoLnJhbmRvbSgpICogMTYgfCAwXG4gICAgY29uc3QgdiA9IGMgPT09ICd4JyA/IHIgOiAociAmIDB4MyB8IDB4OClcbiAgICByZXR1cm4gdi50b1N0cmluZygxNilcbiAgfSlcbn1cblxuZXhwb3J0IGRlZmF1bHQgRW50aXRpZXNTeXN0ZW1cbiIsIi8qIGdsb2JhbCBJbWFnZSAqL1xuXG5jb25zdCBMb2FkZXIgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuaW1hZ2VzQ2FjaGUgPSB7fVxuICB0aGlzLmF1ZGlvQ2FjaGUgPSB7fVxuICB0aGlzLnN0YXJ0ID0gZmFsc2VcbiAgdGhpcy5sb2FkaW5nID0gZmFsc2VcbiAgdGhpcy5jb21wbGV0ZSA9IGZhbHNlXG4gIHRoaXMuZXJyb3JzID0gMFxuICB0aGlzLnN1Y2Nlc3MgPSAwXG4gIHRoaXMucXVldWVkID0gMFxufVxuXG5Mb2FkZXIucHJvdG90eXBlLmxvYWRJbWFnZSA9IGZ1bmN0aW9uIChjb25maWcpIHtcbiAgdGhpcy5xdWV1ZWQrK1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IGltYWdlID0gbmV3IEltYWdlKClcbiAgICBpbWFnZS5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICB0aGlzLnN1Y2Nlc3MrK1xuICAgICAgdGhpcy5pbWFnZXNDYWNoZVtjb25maWcubmFtZV0gPSBpbWFnZVxuICAgICAgdGhpcy5vblN1Y2Nlc3MoY29uZmlnKVxuICAgICAgcmVzb2x2ZShpbWFnZSlcbiAgICB9XG4gICAgaW1hZ2Uub25lcnJvciA9IChyZWFzb24pID0+IHtcbiAgICAgIHRoaXMuZXJyb3JzKytcbiAgICAgIHRoaXMub25FcnJvcihjb25maWcpXG4gICAgICByZWplY3QocmVhc29uKVxuICAgIH1cbiAgICBpbWFnZS5zcmMgPSBjb25maWcudXJsXG4gIH0pXG59XG5cbkxvYWRlci5wcm90b3R5cGUubG9hZEF1ZGlvID0gZnVuY3Rpb24gKGNvbmZpZykge1xuICB0aGlzLnF1ZXVlZCsrXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY29uc3QgeGhyID0gbmV3IHdpbmRvdy5YTUxIdHRwUmVxdWVzdCgpXG4gICAgY29uc3QgQXVkaW9Db250ZXh0ID0gbmV3ICh3aW5kb3cuQXVkaW9Db250ZXh0IHx8IHdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHQpKClcbiAgICB4aHIub3BlbignR0VUJywgY29uZmlnLnVybCwgdHJ1ZSlcbiAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2FycmF5YnVmZmVyJ1xuICAgIHhoci5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICBBdWRpb0NvbnRleHQuZGVjb2RlQXVkaW9EYXRhKHhoci5yZXNwb25zZSwgKGJ1ZmZlcikgPT4ge1xuICAgICAgICB0aGlzLnN1Y2Nlc3MrK1xuICAgICAgICB0aGlzLmF1ZGlvQ2FjaGVbY29uZmlnLm5hbWVdID0gYnVmZmVyXG4gICAgICAgIHRoaXMub25TdWNjZXNzKGNvbmZpZylcbiAgICAgICAgcmVzb2x2ZShidWZmZXIpXG4gICAgICB9LCAocmVhc29uKSA9PiB7XG4gICAgICAgIHRoaXMuZXJyb3JzKytcbiAgICAgICAgdGhpcy5vbkVycm9yKGNvbmZpZylcbiAgICAgICAgcmVqZWN0KHJlYXNvbilcbiAgICAgIH0pXG4gICAgfVxuICAgIHhoci5vbmVycm9yID0gKHJlYXNvbikgPT4ge1xuICAgICAgdGhpcy5lcnJvcnMrK1xuICAgICAgdGhpcy5vbkVycm9yKGNvbmZpZylcbiAgICAgIHJlamVjdChyZWFzb24pXG4gICAgfVxuICAgIHhoci5zZW5kKClcbiAgfSlcbn1cblxuTG9hZGVyLnByb3RvdHlwZS5vblN0YXJ0ID0gZnVuY3Rpb24gKCkge31cblxuTG9hZGVyLnByb3RvdHlwZS5vblN1Y2Nlc3MgPSBmdW5jdGlvbiAoKSB7fVxuXG5Mb2FkZXIucHJvdG90eXBlLm9uRXJyb3IgPSBmdW5jdGlvbiAoKSB7fVxuXG5Mb2FkZXIucHJvdG90eXBlLm9uUHJvZ3Jlc3MgPSBmdW5jdGlvbiAoKSB7fVxuXG5Mb2FkZXIucHJvdG90eXBlLm9uQ29tcGxldGUgPSBmdW5jdGlvbiAoKSB7fVxuXG5Mb2FkZXIucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMucXVldWVkID4gMCkge1xuICAgIGlmICghdGhpcy5zdGFydCkge1xuICAgICAgdGhpcy5zdGFydCA9IHRydWVcbiAgICAgIHRoaXMub25TdGFydCgpXG4gICAgfVxuICAgIGlmICh0aGlzLnF1ZXVlZCA9PT0gdGhpcy5zdWNjZXNzICsgdGhpcy5lcnJvcnMpIHtcbiAgICAgIHRoaXMucXVldWVkID0gMFxuICAgICAgdGhpcy5zdWNjZXNzID0gMFxuICAgICAgdGhpcy5lcnJvcnMgPSAwXG4gICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZVxuICAgICAgdGhpcy5jb21wbGV0ZSA9IHRydWVcbiAgICAgIHRoaXMuc3RhcnQgPSBmYWxzZVxuICAgICAgdGhpcy5vbkNvbXBsZXRlKClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZVxuICAgICAgdGhpcy5jb21wbGV0ZSA9IGZhbHNlXG4gICAgfVxuICAgIGxldCBwcm9ncmVzcyA9IE1hdGguZmxvb3IoKHRoaXMuc3VjY2VzcyArIHRoaXMuZXJyb3JzKSAvIHRoaXMucXVldWVkICogMTAwKVxuICAgIGlmIChpc05hTihwcm9ncmVzcykpIHtcbiAgICAgIHByb2dyZXNzID0gMTAwXG4gICAgfVxuICAgIHRoaXMub25Qcm9ncmVzcyhwcm9ncmVzcylcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgTG9hZGVyXG4iLCJjb25zdCBMb29wID0gZnVuY3Rpb24gKHBhcmFtcykge1xuICBjb25zdCBjb25maWcgPSBPYmplY3QuYXNzaWduKHtcbiAgICBmcHM6IDUwXG4gIH0sIHBhcmFtcylcbiAgdGhpcy5mcHMgPSBjb25maWcuZnBzXG4gIHRoaXMuZnJhbWUgPSAwXG59XG5cbkxvb3AucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgIHRoaXMuc3RlcCgpXG4gIH0sIDEwMDAgLyB0aGlzLmZwcylcbn1cblxuTG9vcC5wcm90b3R5cGUuc3RlcCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5mcmFtZSsrXG4gIHRoaXMub25TdGVwKClcbn1cblxuTG9vcC5wcm90b3R5cGUub25TdGVwID0gZnVuY3Rpb24gKCkge31cblxuZXhwb3J0IGRlZmF1bHQgTG9vcFxuIiwiY29uc3QgS2V5ID0gZnVuY3Rpb24gKGtleSkge1xuICB0aGlzLmRlbHRhID0gMFxuICB0aGlzLmtleSA9IGtleVxuICB0aGlzLnN0YXJ0ID0gZmFsc2VcbiAgdGhpcy5lbmQgPSBmYWxzZVxuICB0aGlzLmhvbGQgPSBmYWxzZVxuICB0aGlzLmhvbGRUaW1lID0gMFxuICB0aGlzLnN0YXJ0RnJhbWUgPSAwXG4gIHRoaXMuZW5kRnJhbWUgPSAwXG59XG5cbmV4cG9ydCBkZWZhdWx0IEtleVxuIiwiaW1wb3J0IEtleSBmcm9tICcuL2tleSdcblxuY29uc3QgS2V5U3lzdGVtID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmVuYWJsZWQgPSB0cnVlXG4gIHRoaXMuY2FjaGUgPSB7fVxuICB0aGlzLmRlbHRhID0gMFxuICB0aGlzLm5vdyA9IDBcbiAgdGhpcy50aGVuID0gMFxuICB0aGlzLmZyYW1lID0gMFxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5oYW5kbGVLZXlEb3duLmJpbmQodGhpcyksIGZhbHNlKVxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHRoaXMuaGFuZGxlS2V5VXAuYmluZCh0aGlzKSwgZmFsc2UpXG59XG5cbktleVN5c3RlbS5wcm90b3R5cGUuaGFuZGxlS2V5RG93biA9IGZ1bmN0aW9uIChldmVudCkge1xuICBpZiAodHlwZW9mIHRoaXMuY2FjaGVbZXZlbnQua2V5XSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB0aGlzLmNhY2hlW2V2ZW50LmtleV0uaG9sZCA9IHRydWVcbiAgfVxufVxuXG5LZXlTeXN0ZW0ucHJvdG90eXBlLmhhbmRsZUtleVVwID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIGlmICh0eXBlb2YgdGhpcy5jYWNoZVtldmVudC5rZXldICE9PSAndW5kZWZpbmVkJykge1xuICAgIHRoaXMuY2FjaGVbZXZlbnQua2V5XS5ob2xkID0gZmFsc2VcbiAgfVxufVxuXG5LZXlTeXN0ZW0ucHJvdG90eXBlLmVuYWJsZSA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgaWYgKHR5cGVvZiB0aGlzLmNhY2hlW2tleV0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgdGhpcy5jYWNoZVtrZXldID0gbmV3IEtleShrZXkpXG4gIH1cbiAgcmV0dXJuIHRoaXMuY2FjaGVba2V5XVxufVxuXG5LZXlTeXN0ZW0ucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuIHRoaXMuY2FjaGVba2V5XVxufVxuXG5LZXlTeXN0ZW0ucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMuZW5hYmxlZCkge1xuICAgIHRoaXMuZnJhbWUrK1xuICAgIHRoaXMubm93ID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpXG4gICAgdGhpcy5kZWx0YSA9IHRoaXMubm93IC0gdGhpcy50aGVuXG4gICAgdGhpcy50aGVuID0gdGhpcy5ub3dcbiAgICBmb3IgKGNvbnN0IGkgaW4gdGhpcy5jYWNoZSkge1xuICAgICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodGhpcy5jYWNoZSwgaSkpIHtcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cbiAgICAgIGNvbnN0IGtleSA9IHRoaXMuY2FjaGVbaV1cbiAgICAgIGlmIChrZXkuaG9sZCkge1xuICAgICAgICBrZXkuaG9sZFRpbWUgKz0gdGhpcy5kZWx0YVxuICAgICAgICBrZXkuZW5kRnJhbWUgPSAtMVxuICAgICAgICBpZiAoa2V5LnN0YXJ0RnJhbWUgPT09IC0xKSB7XG4gICAgICAgICAga2V5LnN0YXJ0RnJhbWUgPSB0aGlzLmZyYW1lXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGtleS5ob2xkVGltZSA9IDBcbiAgICAgICAga2V5LnN0YXJ0RnJhbWUgPSAtMVxuICAgICAgICBpZiAoa2V5LmVuZEZyYW1lID09PSAtMSkge1xuICAgICAgICAgIGtleS5lbmRGcmFtZSA9IHRoaXMuZnJhbWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAga2V5LnN0YXJ0ID0gKGtleS5zdGFydEZyYW1lID09PSB0aGlzLmZyYW1lKVxuICAgICAga2V5LmVuZCA9IChrZXkuZW5kRnJhbWUgPT09IHRoaXMuZnJhbWUpXG4gICAgICBrZXkuZGVsdGEgPSB0aGlzLmRlbHRhXG4gICAgfVxuICB9XG59XG5cbktleVN5c3RlbS5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5jYWNoZSA9IHt9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEtleVN5c3RlbVxuIiwiY29uc3QgUG9pbnRlciA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5kZWx0YSA9IDBcbiAgdGhpcy5hY3RpdmUgPSBmYWxzZVxuICB0aGlzLmhvbGQgPSBmYWxzZVxuICB0aGlzLnN0YXJ0ID0gZmFsc2VcbiAgdGhpcy5lbmQgPSBmYWxzZVxuICB0aGlzLmhvbGRUaW1lID0gMFxuICB0aGlzLnN0YXJ0RnJhbWUgPSAwXG4gIHRoaXMuZW5kRnJhbWUgPSAwXG4gIHRoaXMuaWQgPSAwXG4gIHRoaXMudHlwZSA9IG51bGxcbiAgdGhpcy5zdGFydFggPSAwXG4gIHRoaXMuc3RhcnRZID0gMFxuICB0aGlzLm9mZnNldFggPSAwXG4gIHRoaXMub2Zmc2V0WSA9IDBcbiAgdGhpcy54ID0gMFxuICB0aGlzLnkgPSAwXG59XG5cbmV4cG9ydCBkZWZhdWx0IFBvaW50ZXJcbiIsImltcG9ydCBQb2ludGVyIGZyb20gJy4vcG9pbnRlcidcblxuY29uc3QgUG9pbnRlclN5c3RlbSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5lbmFibGVkID0gdHJ1ZVxuICB0aGlzLmNhY2hlID0ge31cbiAgdGhpcy5kZWx0YSA9IDBcbiAgdGhpcy5ub3cgPSAwXG4gIHRoaXMudGhlbiA9IDBcbiAgdGhpcy5mcmFtZSA9IDBcbiAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVuZGVyLWNhbnZhcycpXG4gIHRoaXMuZW5hYmxlUG9pbnRlcnMoKVxufVxuXG5Qb2ludGVyU3lzdGVtLnByb3RvdHlwZS5lbmFibGUgPSBmdW5jdGlvbiAocG9pbnRlcikge1xuICBpZiAodHlwZW9mIHRoaXMuY2FjaGVbcG9pbnRlcl0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgdGhpcy5jYWNoZVtwb2ludGVyXSA9IG5ldyBQb2ludGVyKHBvaW50ZXIpXG4gIH1cbiAgcmV0dXJuIHRoaXMuY2FjaGVbcG9pbnRlcl1cbn1cblxuUG9pbnRlclN5c3RlbS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKHBvaW50ZXIpIHtcbiAgcmV0dXJuIHRoaXMuY2FjaGVbcG9pbnRlcl1cbn1cblxuUG9pbnRlclN5c3RlbS5wcm90b3R5cGUuZW5hYmxlUG9pbnRlcnMgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuY2FudmFzLnN0eWxlLnRvdWNoQWN0aW9uID0gJ25vbmUnIC8vIG5lZWRlZCBmb3IgbW9iaWxlXG4gIHRoaXMuY2FudmFzLnN0eWxlLnVzZXJTZWxlY3QgPSAnbm9uZScgLy8gbmVlZGVkIGZvciBtb2JpbGVcbiAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCB0aGlzLmhhbmRsZVBvaW50ZXJEb3duLmJpbmQodGhpcyksIGZhbHNlKVxuICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVybW92ZScsIHRoaXMuaGFuZGxlUG9pbnRlck1vdmUuYmluZCh0aGlzKSwgZmFsc2UpXG4gIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJ1cCcsIHRoaXMuaGFuZGxlUG9pbnRlclVwQW5kQ2FuY2VsLmJpbmQodGhpcyksIGZhbHNlKVxuICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVyY2FuY2VsJywgdGhpcy5oYW5kbGVQb2ludGVyVXBBbmRDYW5jZWwuYmluZCh0aGlzKSwgZmFsc2UpXG4gIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJsZWF2ZScsIHRoaXMuaGFuZGxlUG9pbnRlclVwQW5kQ2FuY2VsLmJpbmQodGhpcyksIGZhbHNlKVxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCB0aGlzLmhhbmRsZUNvbnRleHRNZW51LmJpbmQodGhpcyksIGZhbHNlKVxufVxuXG5Qb2ludGVyU3lzdGVtLnByb3RvdHlwZS5nZXRQb2ludGVyQnlJRCA9IGZ1bmN0aW9uIChpZCkge1xuICBsZXQgb3V0cHV0ID0gZmFsc2VcbiAgZm9yIChjb25zdCBpIGluIHRoaXMuY2FjaGUpIHtcbiAgICBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwodGhpcy5jYWNoZSwgaSkpIHtcbiAgICAgIGNvbnN0IHBvaW50ZXIgPSB0aGlzLmNhY2hlW2ldXG4gICAgICBpZiAocG9pbnRlci5pZCA9PT0gaWQpIHtcbiAgICAgICAgb3V0cHV0ID0gcG9pbnRlclxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gb3V0cHV0XG59XG5cblBvaW50ZXJTeXN0ZW0ucHJvdG90eXBlLmdldEluYWN0aXZlUG9pbnRlciA9IGZ1bmN0aW9uICgpIHtcbiAgbGV0IG91dHB1dCA9IGZhbHNlXG4gIGZvciAoY29uc3QgaSBpbiB0aGlzLmNhY2hlKSB7XG4gICAgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMuY2FjaGUsIGkpKSB7XG4gICAgICBjb25zdCBwb2ludGVyID0gdGhpcy5jYWNoZVtpXVxuICAgICAgaWYgKHBvaW50ZXIuYWN0aXZlID09PSBmYWxzZSkge1xuICAgICAgICBvdXRwdXQgPSBwb2ludGVyXG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBvdXRwdXRcbn1cblxuUG9pbnRlclN5c3RlbS5wcm90b3R5cGUuaGFuZGxlUG9pbnRlckRvd24gPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICBjb25zdCBwb2ludGVyID0gdGhpcy5nZXRQb2ludGVyQnlJRChldmVudC5wb2ludGVySWQpIHx8IHRoaXMuZ2V0SW5hY3RpdmVQb2ludGVyKClcbiAgaWYgKHBvaW50ZXIpIHtcbiAgICBwb2ludGVyLmFjdGl2ZSA9IHRydWVcbiAgICBwb2ludGVyLmlkID0gZXZlbnQucG9pbnRlcklkXG4gICAgcG9pbnRlci50eXBlID0gZXZlbnQucG9pbnRlclR5cGUgLy8gJ21vdXNlJywgJ3BlbicsICd0b3VjaCdcbiAgICBwb2ludGVyLmhvbGQgPSB0cnVlXG4gICAgcG9pbnRlci5zdGFydFggPSBldmVudC5jbGllbnRYIC0gZXZlbnQudGFyZ2V0Lm9mZnNldExlZnRcbiAgICBwb2ludGVyLnN0YXJ0WSA9IGV2ZW50LmNsaWVudFkgLSBldmVudC50YXJnZXQub2Zmc2V0VG9wXG4gICAgcG9pbnRlci54ID0gZXZlbnQuY2xpZW50WCAtIGV2ZW50LnRhcmdldC5vZmZzZXRMZWZ0XG4gICAgcG9pbnRlci55ID0gZXZlbnQuY2xpZW50WSAtIGV2ZW50LnRhcmdldC5vZmZzZXRUb3BcbiAgfVxufVxuXG5Qb2ludGVyU3lzdGVtLnByb3RvdHlwZS5oYW5kbGVQb2ludGVyTW92ZSA9IGZ1bmN0aW9uIChldmVudCkge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gIGNvbnN0IHBvaW50ZXIgPSB0aGlzLmdldFBvaW50ZXJCeUlEKGV2ZW50LnBvaW50ZXJJZCkgfHwgdGhpcy5nZXRJbmFjdGl2ZVBvaW50ZXIoKVxuICBpZiAocG9pbnRlcikge1xuICAgIHBvaW50ZXIuaWQgPSBldmVudC5wb2ludGVySWRcbiAgICBwb2ludGVyLnggPSBldmVudC5jbGllbnRYIC0gZXZlbnQudGFyZ2V0Lm9mZnNldExlZnRcbiAgICBwb2ludGVyLnkgPSBldmVudC5jbGllbnRZIC0gZXZlbnQudGFyZ2V0Lm9mZnNldFRvcFxuICB9XG59XG5cblBvaW50ZXJTeXN0ZW0ucHJvdG90eXBlLmhhbmRsZVBvaW50ZXJVcEFuZENhbmNlbCA9IGZ1bmN0aW9uIChldmVudCkge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gIGNvbnN0IHBvaW50ZXIgPSB0aGlzLmdldFBvaW50ZXJCeUlEKGV2ZW50LnBvaW50ZXJJZClcbiAgaWYgKHBvaW50ZXIpIHtcbiAgICBwb2ludGVyLmFjdGl2ZSA9IGZhbHNlXG4gICAgcG9pbnRlci5ob2xkID0gZmFsc2VcbiAgfVxufVxuXG5Qb2ludGVyU3lzdGVtLnByb3RvdHlwZS5oYW5kbGVDb250ZXh0TWVudSA9IGZ1bmN0aW9uIChldmVudCkge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gIHJldHVybiBmYWxzZVxufVxuXG5Qb2ludGVyU3lzdGVtLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLmVuYWJsZWQpIHtcbiAgICB0aGlzLmZyYW1lKytcbiAgICB0aGlzLm5vdyA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKVxuICAgIHRoaXMuZGVsdGEgPSB0aGlzLm5vdyAtIHRoaXMudGhlblxuICAgIHRoaXMudGhlbiA9IHRoaXMubm93XG4gICAgZm9yIChjb25zdCBpIGluIHRoaXMuY2FjaGUpIHtcbiAgICAgIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbCh0aGlzLmNhY2hlLCBpKSkge1xuICAgICAgICBjb25zdCBwb2ludGVyID0gdGhpcy5jYWNoZVtpXVxuICAgICAgICBpZiAocG9pbnRlci5ob2xkKSB7XG4gICAgICAgICAgcG9pbnRlci5vZmZzZXRYID0gKHBvaW50ZXIueCAtIHBvaW50ZXIuc3RhcnRYKVxuICAgICAgICAgIHBvaW50ZXIub2Zmc2V0WSA9IChwb2ludGVyLnkgLSBwb2ludGVyLnN0YXJ0WSlcbiAgICAgICAgICBwb2ludGVyLmhvbGRUaW1lICs9IHRoaXMuZGVsdGFcbiAgICAgICAgICBwb2ludGVyLmVuZEZyYW1lID0gLTFcbiAgICAgICAgICBpZiAocG9pbnRlci5zdGFydEZyYW1lID09PSAtMSkge1xuICAgICAgICAgICAgcG9pbnRlci5zdGFydEZyYW1lID0gdGhpcy5mcmFtZVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwb2ludGVyLm9mZnNldFggPSAwXG4gICAgICAgICAgcG9pbnRlci5vZmZzZXRZID0gMFxuICAgICAgICAgIHBvaW50ZXIuaG9sZFRpbWUgPSAwXG4gICAgICAgICAgcG9pbnRlci5zdGFydEZyYW1lID0gLTFcbiAgICAgICAgICBpZiAocG9pbnRlci5lbmRGcmFtZSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHBvaW50ZXIuZW5kRnJhbWUgPSB0aGlzLmZyYW1lXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHBvaW50ZXIuc3RhcnQgPSAocG9pbnRlci5zdGFydEZyYW1lID09PSB0aGlzLmZyYW1lKVxuICAgICAgICBwb2ludGVyLmVuZCA9IChwb2ludGVyLmVuZEZyYW1lID09PSB0aGlzLmZyYW1lKVxuICAgICAgICBwb2ludGVyLmRlbHRhID0gdGhpcy5kZWx0YVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5Qb2ludGVyU3lzdGVtLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmNhY2hlID0ge31cbn1cblxuZXhwb3J0IGRlZmF1bHQgUG9pbnRlclN5c3RlbVxuIiwiaW1wb3J0IEtleXMgZnJvbSAnLi9rZXktc3lzdGVtJ1xuaW1wb3J0IFBvaW50ZXJzIGZyb20gJy4vcG9pbnRlci1zeXN0ZW0nXG5cbmNvbnN0IElucHV0cyA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5jYWNoZSA9IHt9XG4gIHRoaXMua2V5cyA9IG5ldyBLZXlzKClcbiAgdGhpcy5wb2ludGVycyA9IG5ldyBQb2ludGVycygpXG59XG5cbklucHV0cy5wcm90b3R5cGUuZW5hYmxlS2V5ID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gdGhpcy5rZXlzLmVuYWJsZShrZXkpXG59XG5cbklucHV0cy5wcm90b3R5cGUuZ2V0S2V5ID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gdGhpcy5rZXlzLmdldChrZXkpXG59XG5cbklucHV0cy5wcm90b3R5cGUuZW5hYmxlUG9pbnRlciA9IGZ1bmN0aW9uIChwb2ludGVyKSB7XG4gIHJldHVybiB0aGlzLnBvaW50ZXJzLmVuYWJsZShwb2ludGVyKVxufVxuXG5JbnB1dHMucHJvdG90eXBlLmdldFBvaW50ZXIgPSBmdW5jdGlvbiAocG9pbnRlcikge1xuICByZXR1cm4gdGhpcy5wb2ludGVycy5nZXQocG9pbnRlcilcbn1cblxuSW5wdXRzLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMua2V5cy51cGRhdGUoKVxuICB0aGlzLnBvaW50ZXJzLnVwZGF0ZSgpXG4gIHRoaXMuY2FjaGUua2V5cyA9IHRoaXMua2V5cy5jYWNoZVxuICB0aGlzLmNhY2hlLnBvaW50ZXJzID0gdGhpcy5wb2ludGVycy5jYWNoZVxufVxuXG5leHBvcnQgZGVmYXVsdCBJbnB1dHNcbiIsImNvbnN0IE5ldHdvcmsgPSBmdW5jdGlvbiAocGFyYW1zKSB7XG4gIGNvbnN0IGNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe1xuICAgIHNvY2tldDogbnVsbCxcbiAgICBpbnRlcnBvbGF0aW9uRGVsYXk6IDEwMFxuICB9LCBwYXJhbXMpXG4gIHRoaXMuc29ja2V0ID0gY29uZmlnLnNvY2tldFxuICB0aGlzLmludGVycG9sYXRpb25EZWxheSA9IGNvbmZpZy5pbnRlcnBvbGF0aW9uRGVsYXlcbiAgdGhpcy5jbGllbnRJZCA9ICcnXG4gIHRoaXMuZW50aXRpZXMgPSB7fVxuICB0aGlzLnNlcnZlclVwZGF0ZXMgPSBbXVxuICB0aGlzLmZpcnN0U2VydmVyVGltZXN0YW1wID0gMFxuICB0aGlzLmZpcnN0Q2xpZW50VGltZXN0YW1wID0gMFxuXG4gIHRoaXMuc29ja2V0Lm9uKCdjb25uZWN0aW9uJywgKGNsaWVudElkKSA9PiB7XG4gICAgdGhpcy5jbGllbnRJZCA9IGNsaWVudElkXG4gIH0pXG5cbiAgdGhpcy5zb2NrZXQub24oJ3NlcnZlci11cGRhdGUnLCAoZGF0YSkgPT4ge1xuICAgIHRoaXMucHJvY2Vzc0dhbWVVcGRhdGUoZGF0YSlcbiAgfSlcbn1cblxuTmV0d29yay5wcm90b3R5cGUucHJvY2Vzc0dhbWVVcGRhdGUgPSBmdW5jdGlvbiAoZGF0YSkge1xuICBpZiAodGhpcy5maXJzdFNlcnZlclRpbWVzdGFtcCA9PT0gMCkge1xuICAgIHRoaXMuZmlyc3RTZXJ2ZXJUaW1lc3RhbXAgPSBkYXRhLnRpbWVzdGFtcFxuICAgIHRoaXMuZmlyc3RDbGllbnRUaW1lc3RhbXAgPSBEYXRlLm5vdygpXG4gIH1cblxuICB0aGlzLnNlcnZlclVwZGF0ZXMucHVzaChkYXRhKVxuXG4gIC8vIHRvZG86IEtlZXAgb25seSBvbmUgZ2FtZSB1cGRhdGUgYmVmb3JlIHRoZSBjdXJyZW50IHNlcnZlciB0aW1lXG4gIGNvbnN0IGJhc2UgPSB0aGlzLmdldEJhc2VVcGRhdGUoKVxuICBpZiAoYmFzZSA+IDApIHtcbiAgICB0aGlzLnNlcnZlclVwZGF0ZXMuc3BsaWNlKDAsIGJhc2UpXG4gIH1cbn1cblxuTmV0d29yay5wcm90b3R5cGUuZ2V0Q3VycmVudFN0YXRlID0gZnVuY3Rpb24gKCkge1xuICBpZiAoIXRoaXMuZmlyc3RTZXJ2ZXJUaW1lc3RhbXApIHtcbiAgICByZXR1cm4ge31cbiAgfVxuXG4gIGNvbnN0IGJhc2UgPSB0aGlzLmdldEJhc2VVcGRhdGUoKVxuICBjb25zdCBzZXJ2ZXJUaW1lID0gdGhpcy5jdXJyZW50U2VydmVyVGltZSgpXG5cbiAgLy8gSWYgYmFzZSBpcyB0aGUgbW9zdCByZWNlbnQgdXBkYXRlIHdlIGhhdmUsIHVzZSBpdHMgc3RhdGUuXG4gIC8vIEVsc2UsIGludGVycG9sYXRlIGJldHdlZW4gaXRzIHN0YXRlIGFuZCB0aGUgc3RhdGUgb2YgKGJhc2UgKyAxKS5cbiAgaWYgKGJhc2UgPCAwKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VydmVyVXBkYXRlc1t0aGlzLnNlcnZlclVwZGF0ZXMubGVuZ3RoIC0gMV0uZW50aXRpZXNcbiAgfSBlbHNlIGlmIChiYXNlID09PSB0aGlzLnNlcnZlclVwZGF0ZXMubGVuZ3RoIC0gMSkge1xuICAgIHJldHVybiB0aGlzLnNlcnZlclVwZGF0ZXNbYmFzZV0uZW50aXRpZXNcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBiYXNlVXBkYXRlID0gdGhpcy5zZXJ2ZXJVcGRhdGVzW2Jhc2VdXG4gICAgY29uc3QgbmV4dCA9IHRoaXMuc2VydmVyVXBkYXRlc1tiYXNlICsgMV1cbiAgICBjb25zdCByID0gKHNlcnZlclRpbWUgLSBiYXNlVXBkYXRlLnRpbWVzdGFtcCkgLyAobmV4dC50aW1lc3RhbXAgLSBiYXNlVXBkYXRlLnRpbWVzdGFtcClcbiAgICBjb25zdCBpbnRlcnBvbGF0ZWQgPSB7fVxuXG4gICAgZm9yIChjb25zdCBpIGluIGJhc2VVcGRhdGUuZW50aXRpZXMpIHtcbiAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGJhc2VVcGRhdGUuZW50aXRpZXMsIGkpKSB7XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG9sZGVyRW50aXR5ID0gYmFzZVVwZGF0ZS5lbnRpdGllc1tpXVxuICAgICAgY29uc3QgbmV3ZXJFbnRpdHkgPSB0eXBlb2YgbmV4dC5lbnRpdGllc1tpXSAhPT0gJ3VuZGVmaW5lZCcgPyBuZXh0LmVudGl0aWVzW2ldIDogb2xkZXJFbnRpdHlcbiAgICAgIGludGVycG9sYXRlZFtpXSA9IHtcbiAgICAgICAgaWQ6IG5ld2VyRW50aXR5LmlkLFxuICAgICAgICB4OiB0aGlzLmludGVycG9sYXRlKG9sZGVyRW50aXR5LngsIG5ld2VyRW50aXR5LngsIHIpLFxuICAgICAgICB5OiB0aGlzLmludGVycG9sYXRlKG9sZGVyRW50aXR5LnksIG5ld2VyRW50aXR5LnksIHIpLFxuICAgICAgICBhOiB0aGlzLmludGVycG9sYXRlKG9sZGVyRW50aXR5LmEsIG5ld2VyRW50aXR5LmEsIHIpLFxuICAgICAgICBpbWFnZTogbmV3ZXJFbnRpdHkuaW1hZ2UsXG4gICAgICAgIHN4OiBuZXdlckVudGl0eS5zeCxcbiAgICAgICAgc3k6IG5ld2VyRW50aXR5LnN5LFxuICAgICAgICBzdzogbmV3ZXJFbnRpdHkuc3csXG4gICAgICAgIHNoOiBuZXdlckVudGl0eS5zaCxcbiAgICAgICAgdzogbmV3ZXJFbnRpdHkudyxcbiAgICAgICAgaDogbmV3ZXJFbnRpdHkuaCxcbiAgICAgICAgYXg6IG5ld2VyRW50aXR5LmF4LFxuICAgICAgICBheTogbmV3ZXJFbnRpdHkuYXksXG4gICAgICAgIHM6IG5ld2VyRW50aXR5LnNcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGludGVycG9sYXRlZFxuICB9XG59XG5cbk5ldHdvcmsucHJvdG90eXBlLmludGVycG9sYXRlID0gZnVuY3Rpb24gKG9sZGVyLCBuZXdlciwgcmF0aW8pIHtcbiAgcmV0dXJuIG9sZGVyICsgKG5ld2VyIC0gb2xkZXIpICogcmF0aW9cbn1cblxuTmV0d29yay5wcm90b3R5cGUuY3VycmVudFNlcnZlclRpbWUgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLmZpcnN0U2VydmVyVGltZXN0YW1wICsgKERhdGUubm93KCkgLSB0aGlzLmZpcnN0Q2xpZW50VGltZXN0YW1wKSAtIHRoaXMuaW50ZXJwb2xhdGlvbkRlbGF5XG59XG5cbk5ldHdvcmsucHJvdG90eXBlLmdldEJhc2VVcGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHNlcnZlclRpbWUgPSB0aGlzLmN1cnJlbnRTZXJ2ZXJUaW1lKClcbiAgZm9yIChsZXQgaSA9IHRoaXMuc2VydmVyVXBkYXRlcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGlmICh0aGlzLnNlcnZlclVwZGF0ZXNbaV0udGltZXN0YW1wIDw9IHNlcnZlclRpbWUpIHtcbiAgICAgIHJldHVybiBpXG4gICAgfVxuICB9XG4gIHJldHVybiAtMVxufVxuXG5OZXR3b3JrLnByb3RvdHlwZS5nZXRDdXJyZW50U2VydmVyVGltZXN0YW1wID0gZnVuY3Rpb24gKGlucHV0cykge1xuICByZXR1cm4gdGhpcy5maXJzdFNlcnZlclRpbWVzdGFtcCArIChEYXRlLm5vdygpIC0gdGhpcy5maXJzdENsaWVudFRpbWVzdGFtcCkgLSB0aGlzLmludGVycG9sYXRpb25EZWxheVxufVxuXG5OZXR3b3JrLnByb3RvdHlwZS5zZW5kSW5wdXRzID0gZnVuY3Rpb24gKGlucHV0cykge1xuICB0aGlzLnNvY2tldC5lbWl0KCdjbGllbnQtaW5wdXRzJywge1xuICAgIGNsaWVudElkOiB0aGlzLmNsaWVudElkLFxuICAgIGlucHV0czogaW5wdXRzXG4gIH0pXG59XG5cbmV4cG9ydCBkZWZhdWx0IE5ldHdvcmtcbiIsImNvbnN0IFJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVuZGVyLWNhbnZhcycpXG4gIHRoaXMuY29udGV4dCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJylcbiAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0XG4gIHRoaXMuY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGhcbiAgdGhpcy5pbWFnZXNDYWNoZSA9IHt9XG4gIHRoaXMuZW50aXRpZXMgPSB7fVxufVxuXG5SZW5kZXIucHJvdG90eXBlLmdldEltYWdlID0gZnVuY3Rpb24gKGltYWdlKSB7XG4gIHJldHVybiB0aGlzLmltYWdlc0NhY2hlW2ltYWdlXVxufVxuXG5SZW5kZXIucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpXG59XG5cblJlbmRlci5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmRyYXcoKVxuICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMucnVuLmJpbmQodGhpcykpXG59XG5cblJlbmRlci5wcm90b3R5cGUuZHJhdyA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5jbGVhcigpXG4gIGZvciAoY29uc3QgaSBpbiB0aGlzLmVudGl0aWVzKSB7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0aGlzLmVudGl0aWVzLCBpKSkge1xuICAgICAgY29uc3QgZW50aXR5ID0gdGhpcy5lbnRpdGllc1tpXVxuICAgICAgdGhpcy5jb250ZXh0LnNhdmUoKVxuXG4gICAgICB0aGlzLmNvbnRleHQudHJhbnNsYXRlKFxuICAgICAgICBlbnRpdHkueCArIGVudGl0eS53ICogMC41ICogZW50aXR5LnMgLSBlbnRpdHkudyAqIGVudGl0eS5heCAqIGVudGl0eS5zLFxuICAgICAgICBlbnRpdHkueSArIGVudGl0eS5oICogMC41ICogZW50aXR5LnMgLSBlbnRpdHkuaCAqIGVudGl0eS5heSAqIGVudGl0eS5zXG4gICAgICApXG4gICAgICB0aGlzLmNvbnRleHQucm90YXRlKGVudGl0eS5hKVxuXG4gICAgICB0aGlzLmNvbnRleHQuc2NhbGUoXG4gICAgICAgIGVudGl0eS5zLFxuICAgICAgICBlbnRpdHkuc1xuICAgICAgKVxuXG4gICAgICBjb25zdCBpbWFnZSA9IHRoaXMuZ2V0SW1hZ2UoZW50aXR5LmltYWdlKVxuXG4gICAgICBpZiAoZW50aXR5LnN3ID09PSAwKSB7XG4gICAgICAgIGVudGl0eS5zdyA9IGltYWdlLndpZHRoXG4gICAgICB9XG5cbiAgICAgIGlmIChlbnRpdHkuc2ggPT09IDApIHtcbiAgICAgICAgZW50aXR5LnNoID0gaW1hZ2UuaGVpZ2h0XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UoXG4gICAgICAgIGltYWdlLFxuICAgICAgICBlbnRpdHkuc3gsXG4gICAgICAgIGVudGl0eS5zeSxcbiAgICAgICAgZW50aXR5LnN3LFxuICAgICAgICBlbnRpdHkuc2gsXG4gICAgICAgIGVudGl0eS53ICogLTAuNSwgLy8gZG8gbm90IHRvdWNoIHRoaXNcbiAgICAgICAgZW50aXR5LmggKiAtMC41LCAvLyBkbyBub3QgdG91Y2ggdGhpc1xuICAgICAgICBlbnRpdHkudywgLy8gZG8gbm90IHRvdWNoIHRoaXNcbiAgICAgICAgZW50aXR5LmggLy8gZG8gbm90IHRvdWNoIHRoaXNcbiAgICAgIClcbiAgICAgIC8vIGNpcmNsZVxuICAgICAgLy8gdGhpcy5jb250ZXh0LmxpbmVXaWR0aCA9ICcxJ1xuICAgICAgLy8gdGhpcy5jb250ZXh0LnN0cm9rZVN0eWxlID0gJyMwMGZmMDAnXG4gICAgICAvLyB0aGlzLmNvbnRleHQuYmVnaW5QYXRoKClcbiAgICAgIC8vIHRoaXMuY29udGV4dC5hcmMoZW50aXR5LngsIGVudGl0eS55LCAzMCwgMCwgMiAqIE1hdGguUEkpXG4gICAgICAvLyB0aGlzLmNvbnRleHQuc3Ryb2tlKClcblxuICAgICAgdGhpcy5jb250ZXh0LnJlc3RvcmUoKVxuICAgIH1cbiAgfVxufVxuXG5SZW5kZXIucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChlbnRpdGllcykge1xuICB0aGlzLmVudGl0aWVzID0gZW50aXRpZXNcbn1cblxuZXhwb3J0IGRlZmF1bHQgUmVuZGVyXG4iLCJjb25zdCBTY2VuZSA9IGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgY29uc3QgY29uZmlnID0gT2JqZWN0LmFzc2lnbih7XG4gICAgcHJlbG9hZDogKCkgPT4ge30sXG4gICAgY3JlYXRlOiAoKSA9PiB7fSxcbiAgICB1cGRhdGU6ICgpID0+IHt9XG4gIH0sIHBhcmFtcylcblxuICB0aGlzLnByZWxvYWQgPSBjb25maWcucHJlbG9hZFxuICB0aGlzLmNyZWF0ZSA9IGNvbmZpZy5jcmVhdGVcbiAgdGhpcy51cGRhdGUgPSBjb25maWcudXBkYXRlXG59XG5cbmV4cG9ydCBkZWZhdWx0IFNjZW5lXG4iLCJpbXBvcnQgU2NlbmUgZnJvbSAnLi9zY2VuZSdcblxuY29uc3QgU2NlbmVTeXN0ZW0gPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuY3VycmVudCA9IG51bGxcbiAgdGhpcy5yZXF1ZXN0ZWQgPSBudWxsXG4gIHRoaXMubXVzdFByZWxvYWQgPSBmYWxzZVxuICB0aGlzLm11c3RDcmVhdGUgPSBmYWxzZVxuICB0aGlzLm11c3RVcGRhdGUgPSBmYWxzZVxuICB0aGlzLm11c3RTd2l0Y2ggPSBmYWxzZVxufVxuXG5TY2VuZVN5c3RlbS5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKGNvbmZpZykge1xuICByZXR1cm4gbmV3IFNjZW5lKGNvbmZpZylcbn1cblxuU2NlbmVTeXN0ZW0ucHJvdG90eXBlLnN3aXRjaCA9IGZ1bmN0aW9uIChzY2VuZSkge1xuICB0aGlzLnJlcXVlc3RlZCA9IHNjZW5lXG4gIHRoaXMucmVxdWVzdFN3aXRjaCgpXG59XG5cblNjZW5lU3lzdGVtLnByb3RvdHlwZS5yZXF1ZXN0UHJlbG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5tdXN0UHJlbG9hZCA9IHRydWVcbiAgdGhpcy5tdXN0Q3JlYXRlID0gZmFsc2VcbiAgdGhpcy5tdXN0VXBkYXRlID0gZmFsc2VcbiAgdGhpcy5tdXN0U3dpdGNoID0gZmFsc2Vcbn1cblxuU2NlbmVTeXN0ZW0ucHJvdG90eXBlLnJlcXVlc3RDcmVhdGUgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMubXVzdFByZWxvYWQgPSBmYWxzZVxuICB0aGlzLm11c3RDcmVhdGUgPSB0cnVlXG4gIHRoaXMubXVzdFVwZGF0ZSA9IGZhbHNlXG4gIHRoaXMubXVzdFN3aXRjaCA9IGZhbHNlXG59XG5cblNjZW5lU3lzdGVtLnByb3RvdHlwZS5yZXF1ZXN0VXBkYXRlID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLm11c3RQcmVsb2FkID0gZmFsc2VcbiAgdGhpcy5tdXN0Q3JlYXRlID0gZmFsc2VcbiAgdGhpcy5tdXN0VXBkYXRlID0gdHJ1ZVxuICB0aGlzLm11c3RTd2l0Y2ggPSBmYWxzZVxufVxuXG5TY2VuZVN5c3RlbS5wcm90b3R5cGUucmVxdWVzdFN3aXRjaCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5tdXN0UHJlbG9hZCA9IGZhbHNlXG4gIHRoaXMubXVzdENyZWF0ZSA9IGZhbHNlXG4gIHRoaXMubXVzdFVwZGF0ZSA9IGZhbHNlXG4gIHRoaXMubXVzdFN3aXRjaCA9IHRydWVcbn1cblxuZXhwb3J0IGRlZmF1bHQgU2NlbmVTeXN0ZW1cbiIsImltcG9ydCBFbnRpdGllcyBmcm9tICcuL2VudGl0aWVzL2VudGl0aWVzLXN5c3RlbSdcbmltcG9ydCBMb2FkZXIgZnJvbSAnLi9sb2FkZXIvbG9hZGVyJ1xuaW1wb3J0IExvb3AgZnJvbSAnLi9sb29wL2xvb3AnXG5pbXBvcnQgSW5wdXRzIGZyb20gJy4vaW5wdXRzL2lucHV0cy1jbGllbnQnXG5pbXBvcnQgTmV0d29yayBmcm9tICcuL25ldHdvcmsvbmV0d29yay1zeXN0ZW0tY2xpZW50J1xuaW1wb3J0IFJlbmRlciBmcm9tICcuL3JlbmRlci9yZW5kZXInXG5pbXBvcnQgU2NlbmUgZnJvbSAnLi9zY2VuZS9zY2VuZS1zeXN0ZW0nXG5cbmNvbnN0IFN5bmNFbmdpbmVDbGllbnQgPSBmdW5jdGlvbiAoY29uZmlnKSB7XG4gIHRoaXMuZW50aXRpZXMgPSBuZXcgRW50aXRpZXMoKVxuICB0aGlzLmxvYWRlciA9IG5ldyBMb2FkZXIoKVxuICB0aGlzLmxvb3AgPSBuZXcgTG9vcChjb25maWcubG9vcClcbiAgdGhpcy5pbnB1dHMgPSBuZXcgSW5wdXRzKClcbiAgdGhpcy5uZXR3b3JrID0gbmV3IE5ldHdvcmsoY29uZmlnLm5ldHdvcmspXG4gIHRoaXMucmVuZGVyID0gbmV3IFJlbmRlcigpXG4gIHRoaXMuc2NlbmUgPSBuZXcgU2NlbmUoKVxuXG4gIHRoaXMubG9vcC5vblN0ZXAgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuc2NlbmUuY3VycmVudCkge1xuICAgICAgaWYgKHRoaXMuc2NlbmUubXVzdFByZWxvYWQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmxvYWRlci5sb2FkaW5nKSB7XG4gICAgICAgICAgdGhpcy5zY2VuZS5jdXJyZW50LnByZWxvYWQodGhpcylcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxvYWRlci51cGRhdGUoKVxuICAgICAgICBpZiAodGhpcy5sb2FkZXIuY29tcGxldGUpIHtcbiAgICAgICAgICB0aGlzLnJlbmRlci5pbWFnZXNDYWNoZSA9IHRoaXMubG9hZGVyLmltYWdlc0NhY2hlXG4gICAgICAgICAgdGhpcy5zY2VuZS5yZXF1ZXN0Q3JlYXRlKClcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMuc2NlbmUubXVzdENyZWF0ZSkge1xuICAgICAgICB0aGlzLnNjZW5lLmN1cnJlbnQuY3JlYXRlKHRoaXMpXG4gICAgICAgIHRoaXMuc2NlbmUucmVxdWVzdFVwZGF0ZSgpXG4gICAgICB9XG4gICAgICBpZiAodGhpcy5zY2VuZS5tdXN0VXBkYXRlKSB7XG4gICAgICAgIHRoaXMuZW50aXRpZXMuY2FjaGUgPSB0aGlzLm5ldHdvcmsuZ2V0Q3VycmVudFN0YXRlKClcbiAgICAgICAgdGhpcy5pbnB1dHMudXBkYXRlKClcbiAgICAgICAgdGhpcy5uZXR3b3JrLnNlbmRJbnB1dHModGhpcy5pbnB1dHMuY2FjaGUpXG4gICAgICAgIHRoaXMucmVuZGVyLnVwZGF0ZSh0aGlzLmVudGl0aWVzLmNhY2hlKVxuICAgICAgICB0aGlzLnNjZW5lLmN1cnJlbnQudXBkYXRlKHRoaXMpXG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLnNjZW5lLm11c3RTd2l0Y2gpIHtcbiAgICAgIHRoaXMuc2NlbmUuY3VycmVudCA9IHRoaXMuc2NlbmUucmVxdWVzdGVkXG4gICAgICB0aGlzLnNjZW5lLnJlcXVlc3RQcmVsb2FkKClcbiAgICB9XG4gIH1cbn1cblxuU3luY0VuZ2luZUNsaWVudC5wcm90b3R5cGUuc3RhcnQgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMucmVuZGVyLnJ1bigpXG4gIHRoaXMubG9vcC5ydW4oKVxufVxuXG5leHBvcnQgZGVmYXVsdCBTeW5jRW5naW5lQ2xpZW50XG4iXSwic291cmNlUm9vdCI6IiJ9