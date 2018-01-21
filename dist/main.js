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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ImageViewer__ = __webpack_require__(1);

window.ImageViewer = __WEBPACK_IMPORTED_MODULE_0__ImageViewer__["a" /* ImageViewer */];

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

class ImageViewer {
  /**
   * @param {string|HTMLCanvasElement} element an element that will be canvas displayed.
   * @param {number} width canvas width.
   * @param {number} height canvas height.
   * @param {?Array.<string>} images image url, that you want to display.
   * @param {?String} backgroundColor color.
   */
  constructor(element, width, height, images, backgroundColor) {
    this.el = typeof element === "string" ? document.querySelector(element) : element;
    this.images = images || [];
    this.canvas = document.createElement("canvas");
    this.canvas.width = width;
    this.canvas.height = height;
    this.context = this.canvas.getContext("2d");
    this.backgroundColor = backgroundColor || "#FFFFFF";

    this.imageInstances = [];
    this.showingIndex = 1;
    this.rotation = 0;

    this.reset();
    this.bindEvents();
  }

  bindEvents() {
    this.canvas.addEventListener("touchstart", this.handleTouchStart.bind(this));
    this.canvas.addEventListener("touchmove", this.handleTouchMove.bind(this));
    this.canvas.addEventListener("touchend", this.handleTouchEnd.bind(this));
    this.canvas.addEventListener("mousedown", this.handleTouchStart.bind(this));
    this.canvas.addEventListener("mousemove", this.handleTouchMove.bind(this));
    this.canvas.addEventListener("mouseup", this.handleTouchEnd.bind(this));
  }

  /**
   * append canvas to specified element.
   */
  show() {
    this.el.appendChild(this.canvas);
    this.update();
  }

  /**
   * hide canvas.
   */
  hide() {
    this.el.innerHTML = "";
  }

  /**
   * showing image number.
   */
  set index(index) {
    this.showingIndex = index;
  }
  /**
   * showing image number.
   */
  get index() {
    return this.showingIndex;
  }

  reset() {
    this.magnification = 1;
    this.x = this.canvas.width / 2;
    this.y = this.canvas.height / 2;
    this.rotation = 0;
    this.sign = { x: 1, y: 1 };
  }

  /**
   * show next image.
   * if does not exist image, then do nothing.
   */
  next() {
    if (this.showingIndex < this.length) {
      this.showingIndex++;
      this.reset();
      this.update();
    }
  }

  /**
   * show prev image.
   * if does not exist image, then do nothing.
   */
  prev() {
    if (this.showingIndex > 1) {
      this.showingIndex--;
      this.reset();
      this.update();
    }
  }

  update() {
    const index = this.showingIndex - 1;
    const onload = (index) => {
      return () => {
        if (index === this.showingIndex - 1) {
          this.drawImage();
        }
      }
    }

    if (!this.imageInstances[index]) { // image cache not exist.
      const instance = new Image();
      this.imageInstances.push(instance);
      instance.addEventListener("load", onload(index));
      instance.src = this.images[index];
    } else {
      this.drawImage();
    }
  }

  drawImage() {
    const context = this.context;
    const index = this.showingIndex - 1;
    const image = this.imageInstances[index];
    const defaultMagnification = Math.min(this.canvas.width / image.width,
                                          this.canvas.height / image.height) * this.magnification;
    const x = ((this.rotation % 180 === 0 ? this.x : this.y) * this.sign.x) - (image.width * defaultMagnification / 2);
    const y = ((this.rotation % 180 === 0 ? this.y : this.x) * this.sign.y) - (image.height * defaultMagnification / 2);

    context.fillStyle = this.backgroundColor;
    context.strokeStyle = this.backgroundColor;
    context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    context.rotate(this.rotation * Math.PI / 180);
    context.drawImage(
      this.imageInstances[index],
      x, y,
      image.width * defaultMagnification,
      image.height * defaultMagnification);
    // context.translate();
    context.setTransform(1, 0, 0, 1, 0, 0);
  }

  /**
   * add image url.
   * @param {string} image image url.
   */
  addImage(image) {
    this.images.push(image);
  }

  /**
   * image counts.
   */
  get length() {
    return this.images.length;
  }

  /**
   * expand image. 10%.
   */
  expand() {
    this.setMagnification(this.magnification * 1.1);
  }

  /**
   * shrink image. -10%.
   */
  shrink() {
    this.setMagnification(this.magnification * 0.9);
  }

  /**
   * set image magnification.
   * @param {number} magnification
   */
  setMagnification(magnification) {
    this.magnification = magnification;
    this.update();
  }

  rotate() {
    this.setRotation((this.rotation + 90) % 360);
  }

  setRotation(rotation) {
    this.rotation = rotation;
    switch(rotation) {
      case 90:
        this.sign = { x: 1, y: -1 };
        break;
      case 180:
        this.sign = { x: -1, y: -1 };
        break;
      case 270:
        this.sign = { x: -1, y: 1 };
        break;
      default:
        this.sign = { x: 1, y: 1 };
        break;
    }
    this.update();
  }

  /**
   * move image.
   * @param {number} dx image direction x point.
   * @param {number} dy image direction y point.
   */
  move(dx, dy) {
    this.x += dx;
    this.y += dy;
    this.update();
  }

  handleTouchStart(event) {
    this.touching = true;
    const x = event.touches ? event.touches[0].pageX : event.pageX;
    const y = event.touches ? event.touches[0].pageY : event.pageY;
    this.beforePoint = { x, y };
  }

  handleTouchMove(event) {
    if (!this.touching) return;
    const x = event.touches ? event.touches[0].pageX : event.pageX;
    const y = event.touches ? event.touches[0].pageY : event.pageY;
    this.move(x - this.beforePoint.x, y - this.beforePoint.y);
    this.beforePoint = { x, y };
  }

  handleTouchEnd(event) {
    this.touching = false;
    const x = event.touches ? event.touches[0].pageX : event.pageX;
    const y = event.touches ? event.touches[0].pageY : event.pageY;
    this.move(x - this.beforePoint.x, y - this.beforePoint.y);
    this.beforePoint = null;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ImageViewer;



/***/ })
/******/ ]);