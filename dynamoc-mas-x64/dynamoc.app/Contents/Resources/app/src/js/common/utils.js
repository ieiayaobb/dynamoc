export var isArray = Array.isArray;

export function isString(val) {
  return typeof val === 'string';
}

export function isBoolean(val) {
  return val === true || val === false;
}

export function isFunction(val) {
  return typeof val === 'function';
}

export function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}

export function isPlainObject(obj) {
  return isObject(obj) && Object.getPrototypeOf(obj) == Object.prototype;
}

export function isBlob(obj) {
  return typeof Blob !== 'undefined' && obj instanceof Blob;
}

export function isFormData(obj) {
  return typeof FormData !== 'undefined' && obj instanceof FormData;
}

export function isEmptyObject(obj) {
  return isPlainObject(obj) && Object.keys(obj).length === 0;
}

export function each(obj, iterator) {

  var i, key;

  if (obj && typeof obj.length == 'number') {
    for (i = 0; i < obj.length; i++) {
      iterator.call(obj[i], obj[i], i);
    }
} else if (isObject(obj)) {
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        iterator.call(obj[key], obj[key], key);
      }
    }
}

return obj;
}

export function serialize(params, obj, scope) {

  var array = isArray(obj),
    plain = isPlainObject(obj),
    hash;

  each(obj, function (value, key) {

    hash = isObject(value) || isArray(value);

    if (scope) {
      key = scope + '[' + (plain || hash ? key : '') + ']';
    }

    if (!scope && array) {
      params.add(value.name, value.value);
    } else if (hash) {
      serialize(params, value, key);
    } else {
      params.add(key, value);
    }
  });
}

export class URL {
  static params(obj) {
    var params = [],
        escape = encodeURIComponent;

    params.add = function (key, value) {

      if (isFunction(value)) {
        value = value();
      }

      if (value === null) {
        value = '';
      }

      this.push(escape(key) + '=' + escape(value));
    };

    serialize(params, obj);

    return params.join('&').replace(/%20/g, '+');
  }
}
