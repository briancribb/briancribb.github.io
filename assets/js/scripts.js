/*! For license information please see scripts.js.LICENSE.txt */
!function(modules){var installedModules={};function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={i:moduleId,l:!1,exports:{}};return modules[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.l=!0,module.exports}__webpack_require__.m=modules,__webpack_require__.c=installedModules,__webpack_require__.d=function(exports,name,getter){__webpack_require__.o(exports,name)||Object.defineProperty(exports,name,{enumerable:!0,get:getter})},__webpack_require__.r=function(exports){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(exports,"__esModule",{value:!0})},__webpack_require__.t=function(value,mode){if(1&mode&&(value=__webpack_require__(value)),8&mode)return value;if(4&mode&&"object"==typeof value&&value&&value.__esModule)return value;var ns=Object.create(null);if(__webpack_require__.r(ns),Object.defineProperty(ns,"default",{enumerable:!0,value:value}),2&mode&&"string"!=typeof value)for(var key in value)__webpack_require__.d(ns,key,function(key){return value[key]}.bind(null,key));return ns},__webpack_require__.n=function(module){var getter=module&&module.__esModule?function getDefault(){return module.default}:function getModuleExports(){return module};return __webpack_require__.d(getter,"a",getter),getter},__webpack_require__.o=function(object,property){return Object.prototype.hasOwnProperty.call(object,property)},__webpack_require__.p="",__webpack_require__(__webpack_require__.s=0)}({"./_vendor/tmc/tmc-utils.js":function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tmc_transEnd", function() { return tmc_transEnd; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tmc_documentHidden", function() { return tmc_documentHidden; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tmc_RAF", function() { return tmc_RAF; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tmc_throttle", function() { return tmc_throttle; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tmc_debounce", function() { return tmc_debounce; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "encodeHtmlEntities", function() { return encodeHtmlEntities; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decodeHtmlEntities", function() { return decodeHtmlEntities; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tmc_splitOnTags", function() { return tmc_splitOnTags; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tmc_groupBy", function() { return tmc_groupBy; });\nfunction _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }\n\n/*\n============================================================\n============================================================\n\nThese will be pure utility functions.\n\nhttps://javascript.info/import-export\n\n============================================================\n============================================================\n*/\nfunction tmc_transEnd() {\n  // This function gets the browser\'s name for "transitionend" and saves it to a prop which \n  // may then be used by other functions to detect the end of a CSS3 transition.\n  var end;\n  var st = document.body.style;\n\n  if (st.transition !== undefined) {\n    end = \'transitionend\';\n  } else if (st.OTransition !== undefined) {\n    end = \'oTransitionEnd\';\n  } else if (st.MozTransition !== undefined) {\n    end = \'transitionend\';\n  } else if (st.WebkitTransition !== undefined) {\n    end = \'webkitTransitionEnd\';\n  }\n\n  return end; // Returns the name of the event for when a transition ends.\n\n  /*\n  EXAMPLE LISTENER FUNCTION\n  =========================\n  This was originally meant for a navigation menu that would be visible only on larger sizes.\n  For smaller sizes it would slide in from the side when a button was clicked. I didn\'t want it \n  to slide when the browser window was resized by the user, so the transition class was added \n  on the click and then removed when the transition was done. The result is that it would just \n  appear or disappear as needed on a window resize, but slide in when called by that button at \n  smaller sizes.\n  \tFirst a click that changes that adds a transition class and changes the position of our element.\n  Then this listener removes that class.\n  \tlet trans_end = tmc_transEnd();\n  element.addEventListener(trans_end, function(evt) {\n  \tconsole.log(\'Transition complete!\');\n  \tevt.target.removeClass(\'trans-right\');\n  });\n  */\n}\nfunction tmc_documentHidden() {\n  /*\n  Setting strings to match vendor visibility names. This will normalize the following strings \n  as module properties: \n  \ttmc.hidden\n  tmc.visibilityChange\n  tmc.visibilityState\n  \tWe can ask for tmc.hidden and we\'ll get whatever the browser uses for that. Not as necessary \n  these days, but it will help just in case you ask for "hidden" and the browser is actually \n  using "webkitHidden".\n  */\n  var tmc = {};\n\n  if (typeof document.hidden !== "undefined") {\n    tmc.hidden = "hidden", tmc.visibilityChange = "visibilitychange", tmc.visibilityState = "visibilityState";\n  } else if (typeof document.mozHidden !== "undefined") {\n    tmc.hidden = "mozHidden", tmc.visibilityChange = "mozvisibilitychange", tmc.visibilityState = "mozVisibilityState";\n  } else if (typeof document.msHidden !== "undefined") {\n    tmc.hidden = "msHidden", tmc.visibilityChange = "msvisibilitychange", tmc.visibilityState = "msVisibilityState";\n  } else if (typeof document.webkitHidden !== "undefined") {\n    tmc.hidden = "webkitHidden", tmc.visibilityChange = "webkitvisibilitychange", tmc.visibilityState = "webkitVisibilityState";\n  } // Boolean so the module knows whether the tab is hidden.\n\n\n  tmc.document_hidden = document[tmc.hidden];\n  return tmc; // You can use Object.assign to add these results to wherever you want.\n\n  /*\n  EXAMPLE LISTENER FUNCTION\n  =========================\n  Using the local tmc object, but you can put this data wherever.\n  \tdocument.addEventListener(tmc.visibilityChange, function() {\n  \t// If the document\'s hidden state is different from our value then there\'s been a change.\n  \tif(tmc.document_hidden !== document[tmc.hidden]) {\n  \t\tif(document[tmc.hidden]) {\n  \t\t\t// The tab is now hidden. Maybe stop some stuff or pause it.\n  \t\t} else {\n  \t\t\t// The tab is now visible. The browser window might be a different size now, \n  \t\t\t// so take that into account.\n  \t\t}\n  \t\t// Set the module\'s value to match the browser\'s current value.\n  \t\ttmc.document_hidden = document[tmc.hidden];\n  \t}\n  });\n  */\n}\nfunction tmc_RAF() {\n  /*\n  Generic polifills that update the window object or something similar\n  */\n  // Polyfill for HTML5 canvas.\n  window.requestAnimFrame = function () {\n    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {\n      window.setTimeout(callback, 1000 / 60);\n    };\n  }();\n}\nfunction tmc_throttle(delay, fn) {\n  var lastCall = 0;\n  return function () {\n    var now = new Date().getTime();\n\n    if (now - lastCall < delay) {\n      return;\n    }\n\n    lastCall = now;\n    return fn.apply(void 0, arguments);\n  };\n  /*\n  EXAMPLE OF USE:\n  let myHandler = (event) => { console.log(\'event\', event); }\n  let tHandler = util.throttled(1000, myHandler);\n  document.body.addEventListener("mousemove", tHandler);\n  */\n}\nfunction tmc_debounce(delay, fn) {\n  var timerId;\n  return function () {\n    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    if (timerId) {\n      clearTimeout(timerId);\n    }\n\n    timerId = setTimeout(function () {\n      fn.apply(void 0, args);\n      timerId = null;\n    }, delay);\n  };\n  /*\n  EXAMPLE OF USE:\n  let myHandler = (event) => { console.log(\'event\', event); }\n  let tHandler = util.debounced(1000, myHandler);\n  document.body.addEventListener("mousemove", tHandler);\n  */\n}\n/*\nThanks to Chiyu Zhong (CatTail) for these next two functions\nhttps://gist.github.com/CatTail/4174511\n*/\n\nfunction encodeHtmlEntities(str) {\n  var buf = [];\n\n  for (var i = str.length - 1; i >= 0; i--) {\n    buf.unshift([\'&#\', str[i].charCodeAt(), \';\'].join(\'\'));\n  }\n\n  return buf.join(\'\');\n}\nfunction decodeHtmlEntities(str) {\n  var full = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;\n  // First, replace bad entities with the proper codes.\n  str = str.replace(/&amp;/g, \'&#38;\').replace(/&quot;/g, \'&#34;\').replace(/&lt;/g, \'&#60;\').replace(/&gt;/g, \'&#62;\').replace(/&#8217;/g, \'&#39;\'); // Light decoding just replaces bad entities with proper ones.\n  // Full decoding goes the rest of the way.\n\n  if (!full) return str;\n  return str.replace(/&#(\\d+);/g, function (match, dec) {\n    return String.fromCharCode(dec);\n  });\n}\n/*\nReact has trouble with dynamic HTML content. It escapes stuff for safety reasons.\nThis means that HTML entities in the string don\'t render. Instead of something \nbeing bold, you\'ll just see "<strong>my strong words</strong>" on the page.\n\nThere are a few ways around this, listed here:\nhttps://shripadk.github.io/react/docs/jsx-gotchas.html\n\nThis comes up when I use Jekyll to spit out some JSON for blog posts that I\'m using \nin a front-end search feature. Jekyll escapes stuff, then that shows up pre-escaped \nin React, but then React escapes it too.\n\nOne solution is to turn stuff into an mixed array and just dump that into JSX, like so:\n\n<div>{[\'First \', <span>Second</span>, \' Third\']}</div>\n\nThis function assumes that the string is not escaped. First decode the entities and \nthen use this, because it\'s looking for stuff like "<em>" and "</strong>" and we don\'t \nwant it to bork.\n*/\n\nfunction tmc_splitOnTags(str) {\n  var isEscaped = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;\n  // https://www.regextester.com/106009\n  var patOpen = /((<)\\w+(>))/g,\n      patClose = /((<\\/)\\w+(>))/g,\n      strSplit = \'|*|\';\n\n  if (isEscaped) {\n    // If the string is already fully escaped then we look for entities.\n    // I\'ll fix this RegEx later...\n    patOpen = /((&#60;)\\w+(&#62;))/g;\n    patClose = /((&#60;\\/)\\w+(&#62;))/g;\n  }\n\n  return str.replace(patOpen, function (match, dec) {\n    return strSplit + match;\n  }).replace(patClose, function (match, dec) {\n    return match + strSplit;\n  }).split(strSplit);\n}\nfunction tmc_groupBy(arrSource, target) {\n  /*\n  Accepts an array of objects and creates an object of arrays grouped \n  by one of an object key. You might need this if you want to group \n  a bunch of post objects by category. You would end up with an object \n  key for each category. \n  \tTWO WAYS: Target is normally a string, but if it\'s not then it\'s assumed \n  to be an iterator function that will run on the source array. Then things \n  are grouped by the result.\n  \tEXAMPLE OF USE:\n  let arr = [{ one: "stuff", two: "things" }, { one: "whatnot", two: "doodads" }];\n  tmc_groupBy(arr, "two");\n  returns {\n  \tthings: { one: "stuff", two" "things" },\n  \tdoodads: { one: "whatnot", two" "doodads" }\n  }\n  \tlet arr = ["one", "two", "three", "four"];\n  tmc_groupBy(arr, (item) => item.length);\n  returns {\n  \t3: ["one", "two"],\n  \t5: ["three"],\n  \t4: ["four"]\t\n  }\n  */\n  // First see if the target is a string or a function.\n  switch (_typeof(target)) {\n    case "string":\n      //console.log(\'string\');\n      return byProperty(arrSource, target);\n      break;\n\n    case "function":\n      //console.log(\'function\');\n      return byIterator(arrSource, target);\n      break;\n\n    default:\n      throw "To group, you must pass in a string or an iterator function along with the source array.";\n      return false;\n  }\n\n  function byProperty(arr, key) {\n    //console.log(\'byProperty\', arguments);\n    var objResults = {};\n    arr.forEach(function (item) {\n      // If the key doesn\'t exist then toss this item into the "other" array.\n      if (!item[key]) {\n        if (!objResults.other) objResults.other = [];\n        objResults.other.push(item);\n      } else {\n        var propValue = item[key];\n        if (!objResults[propValue]) objResults[propValue] = [];\n        objResults[propValue].push(item);\n      }\n    });\n    return objResults;\n  }\n\n  ;\n\n  function byIterator(arr, iterator) {\n    //console.log(\'byIterator\', arguments);\n\n    /*\n    NOTE: The iterator must return a string that can be used as an object key.\n    */\n    var objResults = {};\n    arr.forEach(function (item) {\n      // Run the iterator on this item.\n      var result = iterator(item); // If the result is falsey then push the item into the "other" array.\n\n      if (!result) {\n        if (!objResults.other) objResults.other = [];\n        objResults.other.push(item);\n        return;\n      } else {\n        // Use the iterator\'s return value as the object key.\n        if (!objResults[result]) objResults[result] = [];\n        objResults[result].push(item);\n      }\n    });\n    return objResults;\n  }\n\n  ;\n}\n\n//# sourceURL=webpack:///./_vendor/tmc/tmc-utils.js?')},"./tmc-source/webpack/index.js":function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _vendor_tmc_tmc_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../_vendor/tmc/tmc-utils */ "./_vendor/tmc/tmc-utils.js");\n/* harmony import */ var _search__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./search */ "./tmc-source/webpack/search.js");\n/*\nTwo terminal tabs.\n1. cd into site folder: "jekyll serve"\n2. cd from Sites like normal: "yarn build" or "yarn dev"\n\nWhen webpack tosses the new JS into the jekyll assets folder, Jekyll picks it up and builds.\n\nAaaaand... everything in this repo will not be present in the actual repo. I have a set of \nutilities that I don\'t want to write a bunch of times. So I\'m importing a utils file from \nsomewhere in the depths of my hard drive.\n\nThere\'s no need to put all of this into a closure here because webpack will put the entire \npile of stuff into a closure when it compiles the pile of stuff.\n*/\n\n // Doing this through a function so we don\'t ask for this stuff before it exists.\n\nvar utils = function () {\n  Object(_vendor_tmc_tmc_utils__WEBPACK_IMPORTED_MODULE_0__["tmc_RAF"])(); // Polyfills the window.requestAnimationFrame object.\n\n  var ut = Object(_vendor_tmc_tmc_utils__WEBPACK_IMPORTED_MODULE_0__["tmc_documentHidden"])(); // returns several settings in an object\n\n  ut.trans_end = Object(_vendor_tmc_tmc_utils__WEBPACK_IMPORTED_MODULE_0__["tmc_transEnd"])(); // returns the name of the transition end event\n\n  ut.throttle = _vendor_tmc_tmc_utils__WEBPACK_IMPORTED_MODULE_0__["tmc_throttle"];\n  ut.debounce = _vendor_tmc_tmc_utils__WEBPACK_IMPORTED_MODULE_0__["tmc_debounce"];\n  ut.groupBy = _vendor_tmc_tmc_utils__WEBPACK_IMPORTED_MODULE_0__["tmc_groupBy"];\n  ut.encodeHtmlEntities = _vendor_tmc_tmc_utils__WEBPACK_IMPORTED_MODULE_0__["encodeHtmlEntities"];\n  ut.decodeHtmlEntities = _vendor_tmc_tmc_utils__WEBPACK_IMPORTED_MODULE_0__["decodeHtmlEntities"];\n  ut.splitOnTags = _vendor_tmc_tmc_utils__WEBPACK_IMPORTED_MODULE_0__["tmc_splitOnTags"];\n  return ut;\n}();\n\nvar TMC = {\n  eventTasks: {\n    click: [],\n    keyup: []\n  },\n  init: function init() {\n    this.addListeners();\n    this.search.init(this);\n  },\n  addListeners: function addListeners() {\n    var _this = this;\n\n    $(\'body\').on({\n      click: function click(evt) {\n        _this.eventTasks.click.forEach(function (task) {\n          task.apply(_this, [evt]);\n        }); //if (evt.target.id === \'tmc-search-button\') {\n        //\tthis.search.run();\n        //}\n\n      },\n      keyup: function keyup(evt) {\n        //if (evt.target.id === \'tmc-search-input\' && evt.keyCode === 13) {\n        //\tthis.search.run();\n        //}\n        _this.eventTasks.keyup.forEach(function (task) {\n          task.apply(_this, [evt]);\n        });\n      }\n    });\n    /*\n    this.manageResize();// Once after page load.\n    const tHandler = utils.debounce(250, this.manageResize);\n    window.addEventListener("resize", tHandler);\n    */\n  },\n  manageResize: function manageResize() {\n    var footerHeight = $(\'#main-footer\').outerHeight(true);\n    $(\'body\').css(\'padding-bottom\', footerHeight + \'px\');\n  },\n  utils: utils,\n  search: _search__WEBPACK_IMPORTED_MODULE_1__["default"]\n};\n$(document).ready(function () {\n  TMC.init(); //console.log(\'TMC\', TMC);\n});\n\n//# sourceURL=webpack:///./tmc-source/webpack/index.js?')},"./tmc-source/webpack/search.js":function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\nfunction _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn\'t been initialised - super() hasn\'t been called"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\n/*\n=======================================================================\n=======================================================================\n\nAll of the site search functionality lives here.\n1. Stuff is entered into the search form.\n2. The handler function filters that down to valid terms\n3. Redirect to the search page with query parameters.\n4. If on the search page, pull the query params and run the search.\n5. Build the markup for the search results.\n\n=======================================================================\n=======================================================================\n*/\nvar search = {\n  init: function init(TMC) {\n    var _this = this;\n\n    TMC.eventTasks.click.push(this.handleSearch);\n    TMC.eventTasks.keyup.push(this.handleSearch);\n    fetch(window.location.origin + \'/search.json\', {\n      credentials: \'same-origin\',\n      headers: {\n        \'Content-Type\': \'application/json\',\n        \'Accept\': \'application/json\'\n      }\n    }).then(function (response) {\n      return response.json();\n    }).then(function (data) {\n      // After we get the JSON, we\'re going to enable the search form.\n      document.querySelectorAll(\'#tmc-search-input, #tmc-search-button\').forEach(function (el) {\n        el.disabled = false;\n      });\n      data.posts.forEach(function (post, index) {\n        post.key = index;\n\n        if (post.excerpt) {\n          /*\n          Sigh. Running this twice on purpose. Jekyll is escaping a single quote \n          (used as an apostrophe) as "&amp;#8217;" instead of "&#8217;". So the \n          first pass just changes it to "&#8217;" as a string in the final display \n          code. Running it twice solves this. Fortunately, we\'re just doing this \n          one big time as the data first comes in.\n          */\n          post.title = TMC.utils.decodeHtmlEntities(post.title.trim());\n          post.title = TMC.utils.decodeHtmlEntities(post.title.trim());\n          post.excerpt = TMC.utils.decodeHtmlEntities(post.excerpt.trim());\n          post.excerpt = TMC.utils.decodeHtmlEntities(post.excerpt.trim());\n          post.arrExcerpt = TMC.utils.splitOnTags(post.excerpt);\n        }\n\n        if (post.categories) post.categories = post.categories.split(\',\');\n        post.tags = post.tags ? post.tags.split(\',\') : [];\n      });\n      _this.data = data;\n      if (document.body.classList.contains(\'search\')) _this.buildSearchPage(_this.getMatches(_this.getQueryParams(), _this.data));\n    });\n  },\n  handleSearch: function handleSearch(evt) {\n    /*\n    NOTE: Handler functions are called from one delegated listener in the main module, so \n    the context of "this" is the TMC object. Within this handler, this modules functions \n    are called with "this.search.myMethod()".\n    */\n    // Gotta be click on the button or keyup on the Enter key.\n    if (evt.type !== "click" && evt.type !== "keyup") return;\n    if (evt.type === "keyup" && evt.keyCode !== 13) return;\n    if (!evt.target.classList.contains(\'tmc-search\')) return;\n    var str = null;\n\n    if (evt.type === "click" && evt.target.id === \'tmc-search-button\' || evt.type === "keyup" && evt.target.id === \'tmc-search-input\') {\n      // Search input from the button or the Enter key.\n      str = document.getElementById(\'tmc-search-input\').value;\n    } else if (evt.type === "click" && evt.target.id !== \'tmc-search-input\') {\n      // Links or buttons that will trigger a search.\n      if (evt.target.dataset.terms) str = evt.target.dataset.terms;\n    }\n\n    if (!str) return;\n    var arrTerms = this.search.getSearchTerms(str);\n    if (arrTerms.length) window.location = window.location.origin + \'/search/?terms=\' + this.search.getSearchTerms(str).join(\'+\');\n  },\n  getSearchTerms: function getSearchTerms(str) {\n    /*\n    Accepts a string from the search input and returns an array of search terms.\n    */\n    var invalidTerms = [\'the\', \'and\', \'from\', \'with\'],\n        arrTerms = [];\n    str = str.replace(\',\', \' \');\n    str.split(\' \').forEach(function (term) {\n      if (term.length > 1 && !invalidTerms.includes(term.toLowerCase()) && !arrTerms.includes(term.toLowerCase())) arrTerms.push(term.toLowerCase());\n    });\n    /*\n    Strip out weird stuff like commas and colons and things.\n    https://stackoverflow.com/questions/32106243/regex-to-remove-all-non-alpha-numeric-and-replace-spaces-with/32106277\n    */\n\n    arrTerms.forEach(function (term) {\n      term = term.replace(/[^a-z0-9+]+/gi, \'+\');\n    });\n    return arrTerms;\n  },\n  getQueryParams: function getQueryParams() {\n    /*\n    Get search terms from query string parameters.\n     Parameters should be one query string parameter called "terms" with a string separated by a \n    plus sign. But just in case, for come crazy reason, the query string parameters end up as \n    "?terms=stuff+things&terms=blah" then we need to prepare for it. Such a string would come \n    out as ["stuff+things", "blah"] so we joing that on the plus to make "stuff+things+blah".\n    Then we can split the whole thing on the plus and we\'re good to go.\n     NOTE: the plus sign in a query string signifies a space, so URLSearchParams will turn any \n    plus signs into spaces before returning its array.\n    */\n    var params = new URLSearchParams(window.location.search.slice(1));\n    var terms = params.getAll(\'terms\').join(\' \').toLowerCase().split(\' \');\n    return terms;\n  },\n  getMatches: function getMatches(terms, data) {\n    /*\n    A post must match all terms in order to pass. Adding more terms will narrow the results.\n    */\n    var posts = data.posts.filter(function (post) {\n      var match = true;\n      terms.forEach(function (term) {\n        if (!post.title.toLowerCase().includes(term) && !post.url.toLowerCase().includes(term) && !(post.excerpt && post.excerpt.toLowerCase().includes(term)) && !post.tags.filter(function (tag) {\n          return tag.toLowerCase() === term.toLowerCase();\n        }).length) match = false;\n      });\n      return match;\n    });\n    var tags = data.tags.filter(function (tag) {\n      return terms.includes(tag.label);\n    });\n    return {\n      terms: terms,\n      posts: posts,\n      tags: tags\n    };\n  },\n  buildSearchPage: function buildSearchPage(objMatches) {\n    document.getElementById(\'tmc-search-input\').value = objMatches.terms.join(\' \');\n\n    var Results = /*#__PURE__*/function (_React$Component) {\n      _inherits(Results, _React$Component);\n\n      var _super = _createSuper(Results);\n\n      function Results(props) {\n        var _this2;\n\n        _classCallCheck(this, Results);\n\n        _this2 = _super.call(this, props);\n        _this2.state = objMatches; //this._myMethod  = this._myMethod.bind(this);\n\n        return _this2;\n      }\n\n      _createClass(Results, [{\n        key: "_getMatches",\n        value: function _getMatches() {\n          return this.props.matches.posts.map(function (post) {\n            //let excerpt = <div className="post-excerpt">{post.excerpt}</div> || null;\n            var excerpt = /*#__PURE__*/React.createElement("div", {\n              dangerouslySetInnerHTML: {\n                __html: post.excerpt\n              }\n            }) || null;\n            var categories = null;\n            var tags = null;\n\n            if (post.categories && post.categories.length) {\n              categories = /*#__PURE__*/React.createElement("div", {\n                className: "post-category"\n              }, /*#__PURE__*/React.createElement("strong", null, "Category:"), " ", post.categories.join(\', \'));\n            }\n\n            if (post.tags && post.tags.length) {\n              tags = /*#__PURE__*/React.createElement("div", {\n                className: "post-tags mt-1"\n              }, /*#__PURE__*/React.createElement("strong", {\n                className: "me-1"\n              }, "Tags:"), post.tags.map(function (tag, index) {\n                var link = location.origin + "/search/?terms=" + tag;\n                return /*#__PURE__*/React.createElement("span", {\n                  key: index\n                }, /*#__PURE__*/React.createElement("a", {\n                  role: "button",\n                  href: link\n                }, tag), index < post.tags.length - 1 && \', \');\n              }));\n            } //let tags = <div className="post-tags"><small><strong>Tags:</strong> {post.tags.join(\', \')}</small></div> || null;\n\n\n            var url = location.origin + post.url;\n            return /*#__PURE__*/React.createElement("li", {\n              key: post.key,\n              className: "mb-3"\n            }, /*#__PURE__*/React.createElement("h2", {\n              className: "post-title"\n            }, /*#__PURE__*/React.createElement("a", {\n              title: post.title,\n              href: url\n            }, post.title)), /*#__PURE__*/React.createElement("time", {\n              className: "d-block text-muted mb-2",\n              dateTime: "{post.date}"\n            }, /*#__PURE__*/React.createElement("small", null, post.dateString)), excerpt, categories, tags);\n          });\n        }\n      }, {\n        key: "render",\n        value: function render() {\n          var matches = this._getMatches(),\n              matchMarkup = null,\n              matchTitleText = "Sorry, no matches for: ";\n\n          if (matches.length) {\n            matchTitleText = "Matches for: ";\n            matchMarkup = /*#__PURE__*/React.createElement("ul", {\n              className: "post-list d-flex flex-column list-unstyled p-0 m-0"\n            }, matches);\n          }\n\n          return /*#__PURE__*/React.createElement("div", {\n            className: "matches"\n          }, /*#__PURE__*/React.createElement("h1", {\n            className: "mb-3"\n          }, matchTitleText, this.props.matches.terms.join(\', \')), matchMarkup);\n        }\n      }]);\n\n      return Results;\n    }(React.Component);\n\n    ReactDOM.render( /*#__PURE__*/React.createElement(Results, {\n      matches: objMatches\n    }), document.getElementById(\'search-results-container\'));\n  }\n}; // https://codeburst.io/throttling-and-debouncing-in-javascript-646d076d0a44\n\n/* harmony default export */ __webpack_exports__["default"] = (search);\n\n//# sourceURL=webpack:///./tmc-source/webpack/search.js?')},0:function(module,exports,__webpack_require__){eval('module.exports = __webpack_require__(/*! ./tmc-source/webpack/index.js */"./tmc-source/webpack/index.js");\n\n\n//# sourceURL=webpack:///multi_./tmc-source/webpack/index.js?')}});