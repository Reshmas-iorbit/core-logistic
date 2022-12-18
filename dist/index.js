"use strict";

require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.json.stringify.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.symbol.description.js");
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class SmartConnect extends _react.Component {
  constructor(props) {
    super(props);
    _defineProperty(this, "handleClick", () => {
      this.postMethod({
        "dType": "Event",
        "flow": "Monitor",
        "FlowAdmin": {
          "___smart_action___": "lookup",
          "___smart_value___": "AdminSmartFlow"
        }
      }, 'http://', 'localhost:9082/', 'apptest/', 'AdminSmartFlow', 'ListDeployments');
    });
    this.urlbuilder = this.urlbuilder.bind(this);
    this.postMethod = this.postMethod.bind(this);
    this.authenticate = this.authenticate.bind(this);
  }
  urlbuilder(protocol, domain, tenant, object, endpoint) {
    var url = protocol + domain + tenant + object + "/" + endpoint;
    console.log(url);
    return url;
  }
  postMethod(payload, protocol, domain, tenant, object, endpoint) {
    var url = this.urlbuilder(protocol, domain, tenant, object, endpoint);
    //call authenticate function
    var fun = this.authenticate('http://', 'localhost:9082/', 'apptest/', 'Security', 'Authenticate');
    //localstorage getitem - store the session in a variable
    var id = localStorage.getItem('session', fun);
    //Pass the variable in the header
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Session-Id': id
      },
      body: JSON.stringify(payload)
    };
    fetch(url, req).then(res => console.log(res.json())).catch(err => {
      console.log(err);
    });
  }
  authenticate(protocol, domain, tenant, object, endpoint) {
    var url = this.urlbuilder(protocol, domain, tenant, object, endpoint);
    var pay = {
      "identity": "apptestadmin",
      "password": "apptestadmin",
      "type": "custom",
      "FlowAdmin": {
        "___smart_action___": "lookup",
        "___smart_value___": "Security"
      }
    };
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pay)
    };
    fetch(url, req).then(res => res.json().then(resp => {
      var id = resp.responses[0].sessionId;
      console.log(id);
      localStorage.setItem('session', id);
    }));
  }
  render() {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("h1", null, "get Method"), /*#__PURE__*/_react.default.createElement("button", {
      onClick: this.handleClick
    }, "Post Method"));
  }
}
exports.default = SmartConnect;