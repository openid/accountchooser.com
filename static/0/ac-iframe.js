/* Copyright 2013 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



/**
 * Namespace for accountchooser.
 */
var accountchooser = accountchooser || {};

/**
 * Export the namespace to global.
 */
window.accountchooser = accountchooser;

/**
 * Namespace for accountchooser experiments.
 */
accountchooser.experiments = accountchooser.experiments || {};

/**
 * Namespace for accountchooser configurations.
 */
accountchooser.config = accountchooser.config || {};

/**
 * @typedef {{
 *   email: string,
 *   displayName: (?string|undefined),
 *   providerId: (?string|undefined),
 *   photoUrl: (?string|undefined)
 * }}
 */
accountchooser.Account;

/**
 * @typedef {Array.<accountchooser.Account>}
 */
accountchooser.AccountList;

/**
 * @typedef {Array.<string>}
 */
accountchooser.IdpList;

/**
 * @typedef {{
 *   title: (?string|undefined),
 *   favicon: (?string|undefined),
 *   branding: (?string|undefined)
 * }}
 */
accountchooser.CustomUiOptions;



/**
 * Extends a parent class.
 * @param {Function} parentClass The parent class to be extended.
 */
Function.prototype.inheritsFrom = function(parentClass) {
  accountchooser.param.notEmptyFunction(parentClass, 'parentClass');

  /** @constructor */
  function tempClass() {};
  tempClass.prototype = parentClass.prototype;
  this.prototype = new tempClass();
  this.prototype.parentClass = parentClass.prototype;
  /** @override */
  this.prototype.constructor = this;
};

/**
 * Namespcae for parameter validators.
 */
accountchooser.param = accountchooser.param || {};

/**
 * Checks a parameter value is not null or undefined.
 * @param {*} value The value of a parameter.
 * @param {string=} opt_paramName An optional name of the parameter.
 */
accountchooser.param.notNull = function(value, opt_paramName) {
  if (value === undefined || value === null) {
    accountchooser.param.throwError_(
        'Parameter %%param%% cannot be null.', opt_paramName);
  }
};

/**
 * Checks a parameter value is not empty. That is, the value must evaluate to
 * true.
 * @param {*} value The value of a parameter.
 * @param {string=} opt_paramName An optional name of the parameter.
 */
accountchooser.param.notEmpty = function(value, opt_paramName) {
  if (!value) {
    accountchooser.param.throwError_(
        'Parameter %%param%% cannot be empty.', opt_paramName);
  }
};

/**
 * Checks a parameter value must be a non-empty array.
 * @param {Object} value The value of a parameter.
 * @param {string=} opt_paramName An optional name of the parameter.
 */
accountchooser.param.notEmptyArray = function(value, opt_paramName) {
  if (!value) {
    accountchooser.param.throwError_(
        'Parameter %%param%% cannot be empty.', opt_paramName);
  }
  if (!accountchooser.util.isArray(value)) {
    accountchooser.param.throwError_(
        'Parameter %%param%% is not an array.', opt_paramName);
  }
  if (!value.length) {
    accountchooser.param.throwError_(
        'Parameter %%param%% cannot be an empty array.', opt_paramName);
  }
};

/**
 * Checks a parameter value must be a non-empty array.
 * @param {Object} value The value of a parameter.
 * @param {string=} opt_paramName An optional name of the parameter.
 */
accountchooser.param.notEmptyFunction = function(value,
    opt_paramName) {
  if (!value) {
    accountchooser.param.throwError_(
        'Parameter %%param%% cannot be empty.', opt_paramName);
  }
  if (!accountchooser.util.isFunction(value)) {
    accountchooser.param.throwError_(
        'Parameter %%param%% is not a function.', opt_paramName);
  }
};

/**
 * Throws an error to indicate a failed parameter validation.
 * @param {string} message The error message.
 * @param {string=} opt_paramName An optional name of the parameter.
 * @private
 */
accountchooser.param.throwError_ = function(message, opt_paramName) {
  try {
    if (console && console.trace) {
      console.trace();
    }
  } catch (e) {
  }
  var param = opt_paramName ? ' \'' + opt_paramName + '\'' : '';
  throw message.replace(/\%\%param\%\%/g, param);
};

/**
 * Namespace for utility functions.
 */
accountchooser.util = accountchooser.util || {};

/**
 * Logs a message to the console of the browser for debugging.
 * @param {string} message The message to log.
 */
accountchooser.util.log = function(message) {
  try {
    if (window.console && window.console.log) {
      window.console.log(message);
    }
  } catch (ex) {
    // Ignore if cannot log to console.
  }
};

/**
 * Checks whether an experiment is on.
 * @param {string} experiment The name of the experiment.
 * @return {boolean} {@code true} if the experiment is on.
 */
accountchooser.util.isExperimentOn = function(experiment) {
  return !!accountchooser.experiments[experiment];
};

// Utility functions which are to substitute for jQuery ones.
/**
 * Checks whether the value is an array or not.
 * Try to use jQuery.isArray if possible.
 * @param {Object} value The value to be checked.
 * @return {boolean} True if it's an array, false otherwise.
 */
accountchooser.util.isArray = function(value) {
  if (typeof jQuery !== 'undefined') {
    return jQuery.isArray(value);
  } else {
    return Object.prototype.toString.call(value) === '[object Array]';
  }
};

/**
 * Checks whether the value is a function or not.
 * Try to use jQuery.isFunction if possible.
 * @param {Object} value The value to be checked.
 * @return {boolean} True if it's a function, false otherwise.
 */
accountchooser.util.isFunction = function(value) {
  if (typeof jQuery !== 'undefined') {
    return jQuery.isFunction(value);
  } else {
    return Object.prototype.toString.call(value) === '[object Function]';
  }
};

/**
 * Checks whether the elements is in the array and returns the index of it.
 * Try to use jQuery.inArray if possible.
 * @param {*} element The element to be checked.
 * @param {Array.<*>} array The array to be searched.
 * @return {number} The index of the element in the array. If the element is not
 *     in the array, -1 is returned.
 */
accountchooser.util.indexOf = function(element, array) {
  if (array) {
    if (typeof jQuery !== 'undefined') {
      return jQuery.inArray(element, array);
    }
    if (array.indexOf) {
      return array.indexOf(element);
    }
    var length = array.length;
    for (var i = 0; i < length; i++) {
      if (i in array && array[i] === element) {
        return i;
      }
    }
  }
  return -1;
};

/**
 * Trims the leading and trailing space characters.
 * Try to use jQuery.trim if possible.
 * @param {string} str The string to be trimmed.
 * @return {string} The trimmed string.
 */
accountchooser.util.trim = function(str) {
  if (typeof jQuery !== 'undefined') {
    return jQuery.trim(str);
  }
  if (str == null) {
    return '';
  } else if (String.prototype.trim) {
    return String.prototype.trim.call(str);
  } else {
    return str.replace(/^[\s\xa0]+/, '').replace(/[\s\xa0]+$/, '');
  }
};

/**
 * Merges several objects into the first object.
 * Try to use jQuery.extend if possible.
 * @param {boolean} deep Whether to performe deep copy or not.
 * @param {Object} target The object to receive the properties from other ones.
 * @param {...Object} var_objects A set of objects to merge in.
 * @return {Object} The merged object.
 */
accountchooser.util.extend = function(deep, target, var_objects) {
  // If no target provided, return {}. If no other objects to merge in, return
  // target unmodifed..
  if (arguments.length < 3) {
    return target || {};
  }
  if (typeof jQuery !== 'undefined') {
    // If deep == false, don't pass it to jQuery.extend since it'll be treated
    // as the target.
    var args = Array.prototype.slice.call(arguments, deep ? 0 : 1);
    return jQuery.extend.apply(jQuery, args);
  }
  if (typeof target !== 'object' || target == null) {
    target = {};
  }
  for (var i = 2, num = arguments.length; i < num; i++) {
    var obj = arguments[i];
    if (obj == null) {
      continue;
    }
    for (var name in obj) {
      // Skip undefined properties and itself.
      if (obj[name] === undefined || target === obj[name]) {
        continue;
      }
      if (deep && typeof obj[name] == 'object') {
        // Make sure target property is array if the source property is array.
        if (accountchooser.util.isArray(obj[name]) &&
            !accountchooser.util.isArray(target[name])) {
          target[name] = [];
        }
        target[name] =
            accountchooser.util.extend(true, target[name], obj[name]);
      } else {
        target[name] = obj[name];
      }
    }
  }
  return target;
};


/**
 * @return {string} A random token.
 */
accountchooser.util.generateRandomToken = function() {
  if (window.crypto &&
      accountchooser.util.isFunction(window.crypto.getRandomValues)) {
    var array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return String(array[0]);
  } else {
    return String(Math.floor(0xffffffff * Math.random()));
  }
};

/**
 * Compares two strings in constant time to avoid timing attacks.
 * The time needed is only related to the length of input strings.
 * @param {?string=} str1 The first string to compare.
 * @param {?string=} str2 The second string to compare.
 * @return {boolean} {@code true} if the two strings are equal.
 */
accountchooser.util.compareInConstantTime = function(str1, str2) {
  if (!str1 || !str2) {
    return str1 == str2;
  }
  if (str1.length != str2.length) {
    return false;
  }
  var diff = 0;
  for (var i = 0; i < str1.length; i++) {
    diff |= str1.charCodeAt(i) ^ str2.charCodeAt(i);
  }
  return diff === 0;
};



/**
 * Local or session data storage class.
 * @param {string} storageKey The key under which the data is stored in
 *     HTML5 localStorage.
 * @param {boolean=} opt_sessionStorage Whether to use sessionStorage (instead
 *     of localStorage).
 * @constructor
 */
accountchooser.Storage = function(storageKey, opt_sessionStorage) {
  accountchooser.param.notEmpty(storageKey, 'storageKey');
  this.storage_ = null;
  if (opt_sessionStorage) {
    if (accountchooser.Storage.isSessionStorageAvailable()) {
      this.storage_ = window.sessionStorage;
    }
  } else {
    if (accountchooser.Storage.isLocalStorageAvailable()) {
      this.storage_ = window.localStorage;
    }
  }
  this.storageKey_ = storageKey;
};

/**
 * Checks whether the HTML5 localStorage is available or not.
 * @return {boolean} {@code true} if localStorage is available.
 */
accountchooser.Storage.isLocalStorageAvailable = function() {
  return accountchooser.Storage.isAvailable_('localStorage');
};

/**
 * Checks whether the HTML5 sessionStorage is available or not.
 * @return {boolean} {@code true} if sessionStorage is available.
 */
accountchooser.Storage.isSessionStorageAvailable = function() {
  return accountchooser.Storage.isAvailable_('sessionStorage');
};

/**
 * The key used to check if the storage is available.
 * @const {string}
 * @private
 */
accountchooser.Storage.STORAGE_AVAILABLE_KEY_ = '__sak';

/**
 * Checks whether the specified HTML5 web storage is available or not.
 * @param {string} storageInstance The instance of the web storage. Either
 *     'localStorage' or 'sessionStorage'.
 * @return {boolean} {@code true} if the HTML5 web storage is available.
 * @private
 */
accountchooser.Storage.isAvailable_ = function(storageInstance) {
  try {
    var storage = window[storageInstance];
    storage.setItem(accountchooser.Storage.STORAGE_AVAILABLE_KEY_, '1');
    storage.removeItem(accountchooser.Storage.STORAGE_AVAILABLE_KEY_);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Checkes whether the storage instance is available or not.
 * @return {boolean} {@code true} if the storage instance is available.
 */
accountchooser.Storage.prototype.isAvailable = function() {
  return !!this.storage_;
};

/**
 * Reads data from storage.
 * @return {*} The previously saved data.
 */
accountchooser.Storage.prototype.read = function() {
  if (this.isAvailable()) {
    try {
      var data = this.storage_.getItem(this.storageKey_);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      accountchooser.util.log('Failed to read from web storage: ' + e);
    }
  }
};

/**
 * Writes data to storage.
 * @param {*} data The data to be stored.
 */
accountchooser.Storage.prototype.write = function(data) {
  if (this.isAvailable()) {
    try {
      var jsonData = JSON.stringify(data);
      this.storage_.setItem(this.storageKey_, jsonData);
    } catch (e) {
      accountchooser.util.log('Failed to write to web storage: ' + e);
    }
  }
};

/**
 * Clears data from storage.
 */
accountchooser.Storage.prototype.clear = function() {
  if (this.isAvailable()) {
    try {
      this.storage_.removeItem(this.storageKey_);
    } catch (e) {
      accountchooser.util.log('Failed to clear from web storage: ' + e);
    }
  }
};


/**
 * Checks whether two accounts match each other. If two accounts match, they
 * have the same email and providerId.
 * @param {accountchooser.Account} account1 The first account.
 * @param {accountchooser.Account} account2 The second account.
 * @return {boolean} {@code true} if they match.
 */
accountchooser.util.checkAccountsMatch = function(account1, account2) {
  return account1.email == account2.email &&
      (account1.providerId || '') == (account2.providerId || '');
};

/**
 * Checks whether two accounts are compatible. If two accounts are compatible,
 * they have the same email and providerId. Also their displayNames and
 * photoUrls don't conflict.
 * @param {accountchooser.Account} account1 The first account.
 * @param {accountchooser.Account} account2 The second account.
 * @return {boolean} {@code true} if they are compatible.
 */
accountchooser.util.checkAccountsCompatible = function(account1, account2) {
  if (!accountchooser.util.checkAccountsMatch(account1, account2)) {
    return false;
  }
  var merged = {
    displayName: account1.displayName || account2.displayName,
    photoUrl: account1.photoUrl || account2.photoUrl
  };
  return (
      (!account1.displayName || account1.displayName == merged.displayName) &&
      (!account1.photoUrl || account1.photoUrl == merged.photoUrl) &&
      (!account2.displayName || account2.displayName == merged.displayName) &&
      (!account2.photoUrl || account2.photoUrl == merged.photoUrl));
};

/**
 * Gets the index of the account in the list.
 * @param {accountchooser.Account} account the account to be checked.
 * @param {accountchooser.AccountList} accounts the account list.
 * @return {number} the index of the account in the list. If it's not in the
 *     list, -1 is returned.
 */
accountchooser.util.inAccountList = function(account, accounts) {
  for (var i = 0, length = accounts.length; i < length; i++) {
    if (accountchooser.util.checkAccountsMatch(account, accounts[i])) {
      return i;
    }
  }
  return -1;
};



/**
 * Name space for chooser storage.
 */
accountchooser.accountstorage = {};

/**
 * The key for stored accounts in the local storage.
 * @const {string}
 * @private
 */
accountchooser.accountstorage.ACCOUNTS_KEY_ = 'chooserAccounts';

/**
 * The underlying storage instance.
 * @type {accountchooser.Storage}
 * @private
 */
accountchooser.accountstorage.storage_ = new accountchooser.Storage(
        accountchooser.accountstorage.ACCOUNTS_KEY_);

/**
 * @return {boolean} {@code true} if the account storage is available.
 */
accountchooser.accountstorage.isAvailable = function() {
  return accountchooser.accountstorage.storage_.isAvailable();
};

/**
 * Reads accounts from the storage.
 * @return {accountchooser.AccountList} An array of accounts.
 */
accountchooser.accountstorage.readAccounts = function() {
  var savedAccounts =
      /** @type {accountchooser.AccountList} */
      (accountchooser.accountstorage.storage_.read() || []);
  accountchooser.util.log(
      'Read saved accounts from storage: ' + JSON.stringify(savedAccounts));
  return savedAccounts;
};

/**
 * Writes an array of accounts to the storage.
 * @param {accountchooser.AccountList} accounts The array of accounts.
 * @private
 */
accountchooser.accountstorage.write_ = function(accounts) {
  accountchooser.util.log(
      'Save accounts to storage: ' + JSON.stringify(accounts));
  accountchooser.accountstorage.storage_.write(accounts);
};

/**
 * Saves an account to the storage. If the account exists, it is updated and
 * moved to the head. Otherwise, it is added to the head.
 * @param {accountchooser.Account} account The account to be saved.
 */
accountchooser.accountstorage.addAccount = function(account) {
  if (!account || !account.email) {
    return;
  }
  var accounts = accountchooser.accountstorage.readAccounts();
  var index = accountchooser.util.inAccountList(account, accounts);
  if (index >= 0) {
    var oldAccount = accounts[index];
    account.displayName = account.displayName || oldAccount.displayName;
    account.photoUrl = account.photoUrl || oldAccount.photoUrl;
    accounts.splice(index, 1);
  }
  accounts.unshift(account);
  accountchooser.accountstorage.write_(accounts);
};

/**
 * Removes an account from the storage.
 * @param {accountchooser.Account} account The account to be removed.
 */
accountchooser.accountstorage.removeAccount = function(account) {
  if (!account || !account.email) {
    return;
  }
  var accounts = accountchooser.accountstorage.readAccounts();
  var index = accountchooser.util.inAccountList(account, accounts);
  if (index >= 0) {
    accounts.splice(index, 1);
  }
  accountchooser.accountstorage.write_(accounts);
};

/**
 * Removes all accounts from the storage.
 */
accountchooser.accountstorage.clearAccounts = function() {
  accountchooser.accountstorage.storage_.clear();
};

/**
 * Updates an account. It's a no-op if no matching account is found.
 * @param {accountchooser.Account} account The new account.
 */
accountchooser.accountstorage.refreshAccount = function(account) {
  if (!account || !account.email) {
    return;
  }
  var accounts = accountchooser.accountstorage.readAccounts();
  var index = accountchooser.util.inAccountList(account, accounts);
  if (index >= 0) {
    var oldAccount = accounts[index];
    account.displayName = account.displayName || oldAccount.displayName;
    account.photoUrl = account.photoUrl || oldAccount.photoUrl;
    accounts[index] = account;
  }
  accountchooser.accountstorage.write_(accounts);
};



/**
 * Name space for browser-specific configuration.
 */
accountchooser.browserconfig = {};

/**
 * The key for browser-specific configuration stored in the local storage.
 * @const {string}
 * @private
 */
accountchooser.browserconfig.SETTINGS_KEY_ = 'cdsSettings';

/**
 * The underlying storage instance.
 * @private
 */
accountchooser.browserconfig.storage_ = new accountchooser.Storage(
      accountchooser.browserconfig.SETTINGS_KEY_);

/**
 * Gets all configuration.
 * @return {Object} The configuration object.
 */
accountchooser.browserconfig.getAll = function() {
  var config = /** @type {Object} */
      (accountchooser.browserconfig.storage_.read() || {});
  accountchooser.util.log(
      'Get accountchooser browser config: ' + JSON.stringify(config));
  return config;
};

/**
 * Sets all configuration.
 * @param {Object} config The configuration object.
 */
accountchooser.browserconfig.setAll = function(config) {
  accountchooser.util.log(
      'Set accountchooser browser config: ' + JSON.stringify(config));
  accountchooser.browserconfig.storage_.write(config);
};

/**
 * Clears all configuration.
 */
accountchooser.browserconfig.clearAll = function() {
  accountchooser.util.log('Clear accountchooser browser config.');
  accountchooser.browserconfig.storage_.clear();
};

/**
 * Gets a configuration value.
 * @param {string} key The key of the configuration.
 * @return {*} The configuration value.
 */
accountchooser.browserconfig.get = function(key) {
  var config = accountchooser.browserconfig.getAll();
  return config[key];
};

/**
 * Sets a configuration value.
 * @param {string} key The key of the configuration.
 * @param {*} value The configuration value.
 */
accountchooser.browserconfig.set = function(key, value) {
  var config = accountchooser.browserconfig.getAll();
  config[key] = value;
  accountchooser.browserconfig.setAll(config);
};

/**
 * Clears a configuration.
 * @param {string} key The key of the configuration.
 */
accountchooser.browserconfig.clear = function(key) {
  var config = accountchooser.browserconfig.getAll();
  delete config[key];
  accountchooser.browserconfig.setAll(config);
};

/**
 * The key for the disabled configuration.
 * @const {string}
 * @private
 */
accountchooser.browserconfig.DISABLED_KEY_ = 'disabled';
/**
 * Checks whether the accountchooser is disabled.
 * @return {boolean} {@code true} if the accountchooser is disabled.
 */
accountchooser.browserconfig.isDisabled = function() {
  return !!accountchooser.browserconfig.get(
      accountchooser.browserconfig.DISABLED_KEY_);
};

/**
 * Sets whether the accountchooser is disabled.
 * @param {boolean} disabled Whether the accountchooser is disabled.
 */
accountchooser.browserconfig.setDisabled = function(disabled) {
  accountchooser.browserconfig.set(
      accountchooser.browserconfig.DISABLED_KEY_, !!disabled);
};

/**
 * The key for the bootstrap domain configuration.
 * @const {string}
 * @private
 */
accountchooser.browserconfig.BOOTSTRAP_DOMAIN_KEY_ = 'bootstrap_domain';

/**
 * @return {string|undefined} the bootstrap domain.
 */
accountchooser.browserconfig.getBootstrapDomain = function() {
  var key = accountchooser.browserconfig.BOOTSTRAP_DOMAIN_KEY_;
  var domain = /** @type {string|undefined} */
      (accountchooser.browserconfig.get(key));
  return domain;
};

/**
 * Sets the bootstrap domain.
 * @param {string} domain The boostrap domain.
 */
accountchooser.browserconfig.setBootstrapDomain = function(domain) {
  var key = accountchooser.browserconfig.BOOTSTRAP_DOMAIN_KEY_;
  accountchooser.browserconfig.set(key, domain);
};



/**
 * Namespace for accountchooser RPC.
 */
accountchooser.rpc = accountchooser.rpc || {};

/**
 * Base class for all RPC objects (Request, Response, and Notification).
 * @constructor
 */
accountchooser.rpc.RpcObject = function() {};

/**
 * Sets the timestamp for the RpcObject. If the timestamp is not provided, the
 * current time is used.
 * @param {number=} opt_timestamp The timestamp for this RpcObject.
 */
accountchooser.rpc.RpcObject.prototype.setTimestamp = function(opt_timestamp) {
  this.timestamp_ = opt_timestamp || new Date().getTime();
};

/**
 * Converts the RPC object to a normal object and sets the storage timestamp.
 * @return {Object} The normal object represents the RPC object.
 */
accountchooser.rpc.RpcObject.prototype.toJSON = function() {
  var json = {jsonrpc: '2.0'};
  if (this.timestamp_ != null) {
    json.timestamp = this.timestamp_;
  }
  if (this.rpcToken_ != null) {
    json.rpcToken = this.rpcToken_;
  }
  if (this.build_) {
    json.build = this.build_;
  }
  return json;
};

/**
 * Returns the JSON String format of the RPC object.
 * @return {string} The JSON String format.
 */
accountchooser.rpc.RpcObject.prototype.toString = function() {
  return JSON.stringify(this.toJSON());
};

/**
 * Sets the API build number for the RpcObject.
 * @param {number} build The API build number.
 */
accountchooser.rpc.RpcObject.prototype.setBuildNumber = function(build) {
  this.build_ = build;
};

/**
 * Sets the RPC token associated with the object.
 * @param {string} rpcToken An RPC token.
 */
accountchooser.rpc.RpcObject.prototype.setRpcToken = function(rpcToken) {
  this.rpcToken_ = rpcToken;
};

/**
 * Removes the RPC token if it's present.
 */
accountchooser.rpc.RpcObject.prototype.removeRpcToken = function() {
  delete this.rpcToken_;
};

/**
 * Base class for ClientRequest and Notification.
 * @param {string} method The name of the method to be invoked.
 * @param {Object=} opt_params The parameter values to be used during the
 *     invocation of the method.
 * @constructor
 * @extends {accountchooser.rpc.RpcObject}
 */
accountchooser.rpc.Request = function(method, opt_params) {
  accountchooser.param.notEmpty(method, 'method');
  this.method_ = method;
  this.params_ = opt_params;
};
accountchooser.rpc.Request.inheritsFrom(accountchooser.rpc.RpcObject);

/**
 * Returns the name of the method to be invoked.
 * @return {string} The name of the method to be invoked.
 */
accountchooser.rpc.Request.prototype.getMethod = function() {
  return this.method_;
};

/**
 * Returns the parameter values to be used during the invocation of the method.
 * @return {Object|undefined} The parameter values to be used during the
 *     invocation of the method.
 */
accountchooser.rpc.Request.prototype.getParameters = function() {
  return this.params_;
};

/**
 * Returns the value of the parameter with the given name.
 * @param {string} name The name of the parameter.
 * @return {*} The parameter value.
 */
accountchooser.rpc.Request.prototype.getParameter = function(name) {
  return this.params_ && this.params_[name];
};

/**
 * @override
 */
accountchooser.rpc.Request.prototype.toJSON = function() {
  var json = accountchooser.rpc.RpcObject.prototype.toJSON.call(this);
  if (this.method_ != null) {
    json.method = this.method_;
  }
  if (this.params_ != null) {
    json.params = this.params_;
  }
  return json;
};

/**
 * Notification class, which is a request without a response.
 * @param {string} method The name of the method to be invoked.
 * @param {Object=} opt_params The parameter values to be used during the
 *     invocation of the method.
 * @constructor
 * @extends {accountchooser.rpc.Request}
 */
accountchooser.rpc.Notification = function(method, opt_params) {
  accountchooser.rpc.Request.call(this, method, opt_params);
};
accountchooser.rpc.Notification.inheritsFrom(accountchooser.rpc.Request);

/**
 * ClientRequest class, which is sent from client side and requires a response.
 * @param {string} id The id of the request.
 * @param {string} method The name of the method to be invoked.
 * @param {Object=} opt_params The parameter values to be used during the
 *     invocation of the method.
 * @constructor
 * @extends {accountchooser.rpc.Request}
 */
accountchooser.rpc.ClientRequest = function(id, method, opt_params) {
  accountchooser.param.notEmpty(id, 'id');
  accountchooser.rpc.Request.call(this, method, opt_params);
  this.id_ = id;
};
accountchooser.rpc.ClientRequest.inheritsFrom(accountchooser.rpc.Request);

/**
 * Returns the request id.
 * @return {string} The id of the request.
 */
accountchooser.rpc.ClientRequest.prototype.getId = function() {
  return this.id_;
};

/**
 * @override
 */
accountchooser.rpc.ClientRequest.prototype.toJSON = function() {
  var json = accountchooser.rpc.Request.prototype.toJSON.call(this);
  if (this.id_ != null) {
    json.id = this.id_;
  }
  return json;
};

/**
 * Gets the value of the client config with the given key. If the key is not
 * specified, then the whole config object is returned.
 * @param {string} opt_key The client config key.
 * @return {*} The value of the client config.
 */
accountchooser.rpc.ClientRequest.prototype.getClientConfig = function(opt_key) {
  var clientConfig =
      /** @type {Object|undefined} */ (this.getParameter('clientConfig'));
  if (opt_key) {
    return clientConfig && clientConfig[opt_key];
  } else {
    return clientConfig;
  }
};

/**
 * Validates the request.
 * @param {accountchooser.util.Validator} validator The validator used to
 *     validate the request.
 */
accountchooser.rpc.ClientRequest.prototype.validate = function(validator) {
  validator.validate(this.getParameters());
};

/**
 * Response class, which represents an RPC response for a request. It must have
 * either a result or an error.
 * @param {string} id The id of the request object.
 * @param {*=} opt_result The result of the RPC request.
 * @param {Object=} opt_error The error information.
 * @constructor
 * @extends {accountchooser.rpc.RpcObject}
 */
accountchooser.rpc.Response = function(id, opt_result, opt_error) {
  accountchooser.param.notEmpty(id, 'id');
  if (opt_result != null && opt_error != null) {
    throw 'opt_result and opt_error can not be both set.';
  }
  if (opt_result == null && opt_error == null) {
    throw 'Either opt_result or opt_error should be set.';
  }
  this.id_ = id;
  this.result_ = opt_result;
  this.error_ = opt_error;
};
accountchooser.rpc.Response.inheritsFrom(accountchooser.rpc.RpcObject);

/**
 * Parses a plain object into a Response.
 * @param {Object} object The plain object.
 * @return {accountchooser.rpc.Response} A Response if possible.
 */
accountchooser.rpc.Response.parse = function(object) {
  if (object.id &&
      ((object.result != null && object.error == null) ||
       (object.result == null && object.error != null))) {
    return new accountchooser.rpc.Response(object.id, object.result,
        object.error);
  } else {
    return null;
  }
};

/**
 * Returns the result of the Response.
 * @return {*} the result of the Response.
 */
accountchooser.rpc.Response.prototype.getResult = function() {
  return this.result_;
};

/**
 * Returns the error of the Response.
 * @return {Object|undefined} the error of the Response.
 */
accountchooser.rpc.Response.prototype.getError = function() {
  return this.error_;
};

/**
 * Returns the request id.
 * @return {string} the id of the request.
 */
accountchooser.rpc.Response.prototype.getId = function() {
  return this.id_;
};

/**
 * @override
 */
accountchooser.rpc.Response.prototype.toJSON = function() {
  var json = accountchooser.rpc.RpcObject.prototype.toJSON.call(this);
  json.id = this.id_;
  if (this.result_ != null) {
    json.result = this.result_;
  } else if (this.error_ != null) {
    json.error = this.error_;
  }
  return json;
};



/**
 * RequestAckNotification class, which is a Notification to indicate that a
 * Request is received.
 * @param {string} requestId The id of the Request.
 * @constructor
 * @extends {accountchooser.rpc.Notification}
 */
accountchooser.rpc.RequestAckNotification = function(requestId) {
  accountchooser.param.notEmpty(requestId, 'requestId');
  accountchooser.rpc.Notification.call(this,
      accountchooser.rpc.RequestAckNotification.METHOD,
      {requestId: requestId});
};
accountchooser.rpc.RequestAckNotification.inheritsFrom(
   accountchooser.rpc.Notification);

/** The method name of the RequestAckNotification */
accountchooser.rpc.RequestAckNotification.METHOD = 'requestAckNotification';

/**
 * Parses a plain object into a RequestAckNotification.
 * @param {Object} object The plain object.
 * @return {accountchooser.rpc.RequestAckNotification} A RequestAckNotification
 *     if possible.
 */
accountchooser.rpc.RequestAckNotification.parse = function(object) {
  if (object.method == accountchooser.rpc.RequestAckNotification.METHOD &&
      object.params && object.params.requestId) {
    return new accountchooser.rpc.RequestAckNotification(
        object.params.requestId);
  } else {
    return null;
  }
};

/**
 * @return {string} The id of the Request to be acknowledged.
 */
accountchooser.rpc.RequestAckNotification.prototype.getRequestId = function() {
  return /** @type {string} */ (this.getParameter('requestId'));
};

/**
 * ServerReadyNotification class, which is a Notification to indicate that
 * accountchooser page is loaded and initialized.
 * @constructor
 * @extends {accountchooser.rpc.Notification}
 */
accountchooser.rpc.ServerReadyNotification = function() {
  accountchooser.rpc.Notification.call(this,
      accountchooser.rpc.ServerReadyNotification.METHOD);
};
accountchooser.rpc.ServerReadyNotification.inheritsFrom(
   accountchooser.rpc.Notification);

/** The method name of the ServerReadyNotification */
accountchooser.rpc.ServerReadyNotification.METHOD = 'serverReadyNotification';

/**
 * Parses a plain object into a ServerReadyNotification.
 * @param {Object} object The plain object.
 * @return {accountchooser.rpc.ServerReadyNotification} A
 *     ServerReadyNotification if possible.
 */
accountchooser.rpc.ServerReadyNotification.parse = function(object) {
  if (object.method == accountchooser.rpc.ServerReadyNotification.METHOD) {
    return new accountchooser.rpc.ServerReadyNotification();
  } else {
    return null;
  }
};

/**
 * ClientReadyNotification class, which is a Notification to indicate that
 * the client page is loaded and initialized.
 * @constructor
 * @extends {accountchooser.rpc.Notification}
 */
accountchooser.rpc.ClientReadyNotification = function() {
  accountchooser.rpc.Notification.call(this,
      accountchooser.rpc.ClientReadyNotification.METHOD);
};
accountchooser.rpc.ClientReadyNotification.inheritsFrom(
   accountchooser.rpc.Notification);

/** The method name of the ClientReadyNotification */
accountchooser.rpc.ClientReadyNotification.METHOD = 'clientReadyNotification';

/**
 * Parses a plain object into a ClientReadyNotification.
 * @param {Object} object The plain object.
 * @return {accountchooser.rpc.ClientReadyNotification} A
 *     ClientReadyNotification if possible.
 */
accountchooser.rpc.ClientReadyNotification.parse = function(object) {
  if (object.method == accountchooser.rpc.ClientReadyNotification.METHOD) {
    return new accountchooser.rpc.ClientReadyNotification();
  } else {
    return null;
  }
};

/**
 * EmptyResponseNotification class, which is a Notification to indicate that
 * there's no saved Response for the client.
 * @constructor
 * @extends {accountchooser.rpc.Notification}
 */
accountchooser.rpc.EmptyResponseNotification = function() {
  accountchooser.rpc.Notification.call(this,
      accountchooser.rpc.EmptyResponseNotification.METHOD);
};
accountchooser.rpc.EmptyResponseNotification.inheritsFrom(
    accountchooser.rpc.Notification);

/** The method name of the EmptyResponseNotification */
accountchooser.rpc.EmptyResponseNotification.METHOD =
    'emptyResponseNotification';

/**
 * Parses a plain object into an EmptyResponseNotification.
 * @param {Object} object The plain object.
 * @return {accountchooser.rpc.EmptyResponseNotification} An
 *     EmptyResponseNotification if possible.
 */
accountchooser.rpc.EmptyResponseNotification.parse = function(object) {
  if (object.method == accountchooser.rpc.EmptyResponseNotification.METHOD) {
    return new accountchooser.rpc.EmptyResponseNotification();
  } else {
    return null;
  }
};

/**
 * StoreRequest class, which requests to store some accounts in accountchooser.
 * @param {string} id the id of the Request.
 * @param {accountchooser.AccountList} accounts the list of accounts to be
 *     stored.
 * @param {Object} clientConfig the configuration parameters of current client.
 * @constructor
 * @extends {accountchooser.rpc.ClientRequest}
 */
accountchooser.rpc.StoreRequest = function(id, accounts, clientConfig) {
  accountchooser.param.notEmptyArray(accounts, 'accounts');
  var params = {
    accounts: accounts,
    clientConfig: clientConfig
  };
  accountchooser.rpc.ClientRequest.call(this, id,
      accountchooser.rpc.StoreRequest.METHOD, params);
};
accountchooser.rpc.StoreRequest.inheritsFrom(accountchooser.rpc.ClientRequest);

/** The method name of the StoreRequest */
accountchooser.rpc.StoreRequest.METHOD = 'store';

/**
 * Parses a plain object into a StoreRequest.
 * @param {Object} object The plain object.
 * @return {accountchooser.rpc.StoreRequest} A StoreRequest if possible.
 */
accountchooser.rpc.StoreRequest.parse = function(object) {
  if (object.method == accountchooser.rpc.StoreRequest.METHOD &&
      object.id &&
      object.params &&
      accountchooser.util.isArray(object.params.accounts) &&
      object.params.accounts.length > 0) {
    return new accountchooser.rpc.StoreRequest(object.id,
        object.params.accounts, object.params.clientConfig);
  } else {
    return null;
  }
};

/**
 * @return {accountchooser.AccountList} The accounts to be stored.
 */
accountchooser.rpc.StoreRequest.prototype.getAccounts = function() {
  var accounts =
      /** @type {accountchooser.AccountList} */ (this.getParameter('accounts'));
  return accounts;
};

/**
 * SelectRequest class, which requests to select an account from accountchooser.
 * @param {string} id the id of the Request.
 * @param {accountchooser.AccountList} localAccounts the list of local accounts
 *     to be shown in accountchooser.
 * @param {Object} clientConfig the configuration parameters of current client.
 * @constructor
 * @extends {accountchooser.rpc.ClientRequest}
 */
accountchooser.rpc.SelectRequest = function(id, localAccounts, clientConfig) {
  var params = {
    localAccounts: localAccounts,
    clientConfig: clientConfig
  };
  accountchooser.rpc.ClientRequest.call(this, id,
      accountchooser.rpc.SelectRequest.METHOD, params);
};
accountchooser.rpc.SelectRequest.inheritsFrom(accountchooser.rpc.ClientRequest);

/** The method name of the SelectRequest */
accountchooser.rpc.SelectRequest.METHOD = 'select';

/**
 * Parses a plain object into a SelectRequest.
 * @param {Object} object The plain object.
 * @return {accountchooser.rpc.SelectRequest} A SelectRequest if possible.
 */
accountchooser.rpc.SelectRequest.parse = function(object) {
  if (object.method == accountchooser.rpc.SelectRequest.METHOD && object.id) {
    return new accountchooser.rpc.SelectRequest(object.id,
        object.params && object.params.localAccounts,
        object.params && object.params.clientConfig);
  } else {
    return null;
  }
};

/**
 * @return {accountchooser.AccountList} The local accounts.
 */
accountchooser.rpc.SelectRequest.prototype.getLocalAccounts = function() {
  var localAccounts =
      /** @type {accountchooser.AccountList} */
      (this.getParameter('localAccounts') || []);
  return localAccounts;
};

/**
 * UpdateRequest class, which requests to update an account in accountchooser.
 * @param {string} id the id of the Request.
 * @param {accountchooser.Account} account the account to be updated.
 * @param {Object} clientConfig the configuration parameters of current client.
 * @constructor
 * @extends {accountchooser.rpc.ClientRequest}
 */
accountchooser.rpc.UpdateRequest = function(id, account, clientConfig) {
  accountchooser.param.notEmpty(account, 'account');
  var params = {
    account: account,
    clientConfig: clientConfig
  };
  accountchooser.rpc.ClientRequest.call(this, id,
      accountchooser.rpc.UpdateRequest.METHOD, params);
};
accountchooser.rpc.UpdateRequest.inheritsFrom(accountchooser.rpc.ClientRequest);

/** The method name of the UpdateRequest */
accountchooser.rpc.UpdateRequest.METHOD = 'update';

/**
 * Parses a plain object into an UpdateRequest.
 * @param {Object} object The plain object.
 * @return {accountchooser.rpc.UpdateRequest} An UpdateRequest if possible.
 */
accountchooser.rpc.UpdateRequest.parse = function(object) {
  if (object.method == accountchooser.rpc.UpdateRequest.METHOD &&
      object.id && object.params && object.params.account) {
    return new accountchooser.rpc.UpdateRequest(object.id,
        object.params.account, object.params.clientConfig);
  } else {
    return null;
  }
};

/**
 * @return {accountchooser.Account} The account to be updated.
 */
accountchooser.rpc.UpdateRequest.prototype.getAccount = function() {
  var account =
      /** @type {accountchooser.Account} */ (this.getParameter('account'));
  return account;
};

/**
 * ManageRequest class, which requests to show accountchooser manage page.
 * @param {string} id the id of the Request.
 * @param {Object} clientConfig the configuration parameters of current client.
 * @constructor
 * @extends {accountchooser.rpc.ClientRequest}
 */
accountchooser.rpc.ManageRequest = function(id, clientConfig) {
  var params = {clientConfig: clientConfig};
  accountchooser.rpc.ClientRequest.call(this, id,
      accountchooser.rpc.ManageRequest.METHOD, params);
};
accountchooser.rpc.ManageRequest.inheritsFrom(accountchooser.rpc.ClientRequest);

/** The method name of the ManageRequest */
accountchooser.rpc.ManageRequest.METHOD = 'manage';

/**
 * Parses a plain object into a ManageRequest.
 * @param {Object} object The plain object.
 * @return {accountchooser.rpc.ManageRequest} A ManageRequest if possible.
 */
accountchooser.rpc.ManageRequest.parse = function(object) {
  if (object.method == accountchooser.rpc.ManageRequest.METHOD && object.id) {
    return new accountchooser.rpc.ManageRequest(object.id,
        object.params && object.params.clientConfig);
  } else {
    return null;
  }
};

/**
 * AboutRequest class, which requests to show accountchooser about page.
 * @param {string} id the id of the Request.
 * @param {Object} clientConfig the configuration parameters of current client.
 * @constructor
 * @extends {accountchooser.rpc.ClientRequest}
 */
accountchooser.rpc.AboutRequest = function(id, clientConfig) {
  var params = {clientConfig: clientConfig};
  accountchooser.rpc.ClientRequest.call(this, id,
      accountchooser.rpc.AboutRequest.METHOD, params);
};
accountchooser.rpc.AboutRequest.inheritsFrom(accountchooser.rpc.ClientRequest);

/** The method name of the AboutRequest */
accountchooser.rpc.AboutRequest.METHOD = 'about';

/**
 * Parses a plain object into an AboutRequest.
 * @param {Object} object The plain object.
 * @return {accountchooser.rpc.AboutRequest} An AboutRequest if possible.
 */
accountchooser.rpc.AboutRequest.parse = function(object) {
  if (object.method == accountchooser.rpc.AboutRequest.METHOD && object.id) {
    return new accountchooser.rpc.AboutRequest(object.id,
        object.params && object.params.clientConfig);
  } else {
    return null;
  }
};

/**
 * BootstrapRequest class, which requests to set the client to be the default
 * account bootstrapping domain.
 * @param {string} id the id of the Request.
 * @param {string} origin account bootstrapping domain to be set.
 * @param {accountchooser.AccountList} accounts the accounts to be stored.
 * @param {Object} clientConfig the configuration parameters of current client.
 * @constructor
 * @extends {accountchooser.rpc.ClientRequest}
 */
accountchooser.rpc.BootstrapRequest = function(id, origin, accounts,
    clientConfig) {
  accountchooser.param.notEmpty(origin, 'origin');
  var params = {
    origin: origin,
    accounts: accounts,
    clientConfig: clientConfig
  };
  accountchooser.rpc.ClientRequest.call(this, id,
      accountchooser.rpc.BootstrapRequest.METHOD, params);
};
accountchooser.rpc.BootstrapRequest.inheritsFrom(
    accountchooser.rpc.ClientRequest);

/** The method name of the BootstrapRequest */
accountchooser.rpc.BootstrapRequest.METHOD = 'bootstrap';

/**
 * Parses a plain object into a BootstrapRequest.
 * @param {Object} object The plain object.
 * @return {accountchooser.rpc.BootstrapRequest} A BootstrapRequest if possible.
 */
accountchooser.rpc.BootstrapRequest.parse = function(object) {
  if (object.method == accountchooser.rpc.BootstrapRequest.METHOD &&
      object.id && object.params && object.params.origin) {
    return new accountchooser.rpc.BootstrapRequest(object.id,
        object.params.origin, object.params.accounts,
        object.params.clientConfig);
  } else {
    return null;
  }
};

/**
 * @return {string} The origin of the client.
 */
accountchooser.rpc.BootstrapRequest.prototype.getOrigin = function() {
  return /** @type {string} */ (this.getParameter('origin'));
};

/**
 * @return {accountchooser.AccountList} The accounts to be stored.
 */
accountchooser.rpc.BootstrapRequest.prototype.getAccounts = function() {
  var accounts =
      /** @type {accountchooser.AccountList} */
      (this.getParameter('accounts') || []);
  return accounts;
};

/**
 * QueryRequest class, which represents a query from the client.
 * @param {string} id the id of the Request.
 * @param {accountchooser.rpc.Queries} query the inquiry from the client.
 * @param {?accountchooser.Account} account the account associated with this
 *     query.
 * @constructor
 * @extends {accountchooser.rpc.ClientRequest}
 */
accountchooser.rpc.QueryRequest = function(id, query, account) {
  accountchooser.param.notEmpty(query, 'query');
  var params = {
    query: query,
    account: account
  };
  accountchooser.rpc.ClientRequest.call(this, id,
      accountchooser.rpc.QueryRequest.METHOD, params);
};
accountchooser.rpc.QueryRequest.inheritsFrom(accountchooser.rpc.ClientRequest);

/** The method name of the QueryRequest */
accountchooser.rpc.QueryRequest.METHOD = 'query';

/**
 * Parses a plain object into a QueryRequest.
 * @param {Object} object The plain object.
 * @return {accountchooser.rpc.QueryRequest} A QueryRequest if possible.
 */
accountchooser.rpc.QueryRequest.parse = function(object) {
  if (object.method == accountchooser.rpc.QueryRequest.METHOD &&
      object.id && object.params && object.params.query) {
    return new accountchooser.rpc.QueryRequest(object.id,
        object.params.query, object.params.account);
  } else {
    return null;
  }
};

/**
 * @return {accountchooser.rpc.Queries} The query of the request.
 */
accountchooser.rpc.QueryRequest.prototype.getQuery = function() {
  return /** @type {accountchooser.rpc.Queries} */ (this.getParameter('query'));
};

/**
 * @return {?accountchooser.Account} The account to be inquiried.
 */
accountchooser.rpc.QueryRequest.prototype.getAccount = function() {
  var account =
      /** @type {?accountchooser.Account} */ (this.getParameter('account'));
  return account;
};

/**
 * Enums for accountchooser queries.
 * @enum {string}
 */
accountchooser.rpc.Queries = {
  AC_DISABLED: 'acDisabled',
  AC_EMPTY: 'acEmpty',
  ACCOUNT_EXIST: 'accountExist',
  SHOULD_UPDATE: 'shouldUpdate'
};


/**
 * Request sent to IDP to get the accounts.
 * @param {string} id the id of the request.
 * @constructor
 * @extends {accountchooser.rpc.ClientRequest}
 */
accountchooser.rpc.GetIdpAccountsRequest = function(id) {
  accountchooser.rpc.ClientRequest.call(this, id,
      accountchooser.rpc.GetIdpAccountsRequest.METHOD);
};
accountchooser.rpc.GetIdpAccountsRequest.inheritsFrom(
    accountchooser.rpc.ClientRequest);

/** The method name of the GetIdpAccountsRequest */
accountchooser.rpc.GetIdpAccountsRequest.METHOD = 'getAccounts';


/**
 * Parses a JavaScript object into a RpcObject.
 * @param {Object} jsonObject A RPC object in plain JavaScript .
 * @param {Array.<Function>} acceptable A list of acceptable RpcObject classes.
 * @return {accountchooser.rpc.RpcObject} A valid RpcObject, of null otherwise.
 */
accountchooser.rpc.parseRpcObject = function(jsonObject, acceptable) {
  accountchooser.param.notEmpty(jsonObject, 'jsonObject');
  accountchooser.param.notEmptyArray(acceptable, 'acceptable');

  if (!jsonObject || jsonObject.jsonrpc != '2.0') {
    accountchooser.util.log('"jsonrpc" field should be "2.0".');
    return null;
  }

  var result = null;
  var acceptResponse =
      accountchooser.util.indexOf(accountchooser.rpc.Response, acceptable) > -1;
  if (jsonObject.method) {
    // It should be a Request.
    for (var i = 0; i < acceptable.length; i++) {
      if (jsonObject.method == acceptable[i].METHOD) {
        var parse =
            /** @type {function(Object): accountchooser.rpc.RpcObject} */
            (acceptable[i].parse);
        result = parse(jsonObject);
        break;
      }
    }
  } else if (acceptResponse) {
    // No method field, it should be a Response.
    result = accountchooser.rpc.Response.parse(jsonObject);
  }

  if (!result) {
    accountchooser.util.log('Unrecoginzied JSON-RPC object.');
    return null;
  }

  if (jsonObject.rpcToken) {
    result.setRpcToken(jsonObject.rpcToken);
  }

  if (jsonObject.build) {
    result.setBuildNumber(jsonObject.build);
  }
  return result;
};

accountchooser.rpc.BUILD_NUMBER_ = 20140418;



/**
 * List of supported language which is denoted by its normalized code.
 * @const {Array.<string>}
 * @private
 */
accountchooser.util.SUPPORTED_LANGUAGE_ = [
  'af', // Afrikaans
  'am', // Amharic
  'ar', // Arabic (Modern Standard)
  'az', // Azerbaijani
  'bg', // Bulgarian
  'bn', // Bengali
  'ca', // Catalan
  'cs', // Czech
  'da', // Danish
  'de', // German
  'el', // Greek
  'en', // English (American)
  'en_gb', // English (British)
  'es', // Spanish (European)
  'es_419', // Spanish (Latin American)
  'et', // Estonian
  'fa', // Persian
  'fi', // Finnish
  'fil', // Filipino
  'fr', // French (European)
  'gu', // Gujarati
  'hi', // Hindi
  'hr', // Croatian
  'hu', // Hungarian
  'hy', // Armenian
  'id', // Indonesian
  'is', // Icelandic
  'it', // Italian
  'iw', // Hebrew
  'ja', // Japanese
  'ka', // Georgian
  'km', // Khmer
  'kn', // Kannada
  'ko', // Korean
  'lo', // Lao
  'lt', // Lithuanian
  'lv', // Latvian
  'ml', // Malayalam
  'mn', // Mongolian
  'mr', // Marathi
  'ms', // Malay
  'ne', // Nepali
  'nl', // Dutch
  'no', // Norwegian
  'pl', // Polish
  'pt', // Portuguese (Brazilian)
  'pt_pt', // Portuguese (European)
  'ro', // Romanian
  'ru', // Russian
  'si', // Sinhala
  'sk', // Slovak
  'sl', // Slovenian
  'sr', // Serbian (Cyrillic)
  'sv', // Swedish
  'sw', // Swahili
  'ta', // Tamil
  'te', // Telugu
  'th', // Thai
  'tr', // Turkish
  'uk', // Ukrainian
  'ur', // Urdu
  'vi', // Vietnamese
  'zh_cn', // Chinese (Simplified, Mandarin)
  'zh_tw' // Chinese (Traditional, Mandarin)
];

/**
 * Language codes map which maps the alternative code to the normolized code in
 * the list of supported language.
 * @const {Object.<string, string>}
 * @private
 */
accountchooser.util.ALTERNATIVE_CODES_MAP_ = {
  // Hebrew
  'he': 'iw',
  // Indonesian
  'in': 'id',
  // Romanian
  'mo': 'ro',
  // Norwegian
  'nb': 'no',
  // Filipino
  'tl': 'fil',
  // Chinese (Simplified, Mandarin)
  'zh': 'zh_cn',
  'zh_hans': 'zh_cn',
  'zh_hans_cn': 'zh_cn',
  // Chinese (Traditional, Mandarin)
  'zh_hant': 'zh_tw',
  'zh_hant_tw': 'zh_tw'
};

/**
 * Finds the normalized code in the supported language list for a given one. If
 * there's no exactly matched one, try to match the higer level. i.e., 'zh-HK'
 * will get 'zh' as result, which is eventually mapped to 'zh_cn'. If no code is
 * found, {@code undefined} is returned.
 * @param {string} language The language code.
 * @return {string|undefined} The normalized language code.
 */
accountchooser.util.findLanguageCode = function(language) {
  // Normalize language code
  var lang = language && language.replace(/-/g, '_').toLowerCase();
  var code;
  while (lang) {
    if (accountchooser.util.indexOf(lang,
        accountchooser.util.SUPPORTED_LANGUAGE_) > -1) {
      code = lang;
      break;
    } else if (accountchooser.util.ALTERNATIVE_CODES_MAP_[lang]) {
      code = accountchooser.util.ALTERNATIVE_CODES_MAP_[lang];
      break;
    }
    var parts = lang.split('_');
    parts.pop();
    lang = parts.join('_');
  }
  return code;
};

/**
 * Checks if the language is right-to-left or not.
 * @param {string} language The language code.
 * @return {boolean} {@code true} if the language is rtl.
 */
accountchooser.util.isRightToLeft = function(language) {
  var lang = accountchooser.util.findLanguageCode(language);
  // Arabic, Hebrew, Persian and Urdu.
  return lang == 'ar' || lang == 'iw' || lang == 'fa' || lang == 'ur';
};



/**
 * Checks if the url scheme is http or https.
 * @param {string} url The url to be checked.
 * @return {boolean} {@code true} if it is http or https scheme.
 */
accountchooser.util.isHttpOrHttpsUrl = function(url) {
  return /^https?:\/\//i.test(url);
};

/**
 * Checks if the url scheme is https.
 * @param {string} url The url to be checked.
 * @return {boolean} {@code true} if it is https scheme.
 */
accountchooser.util.isHttpsUrl = function(url) {
  return /^https:\/\//i.test(url);
};

/**
 * Parses a URL string into a Url object. If the URL is a path other than an
 * absolute URL, the current location is used to compute the absolute URL.
 * @param {string} url The URL string.
 * @return {accountchooser.util.Url} The Url object.
 */
accountchooser.util.parseUrl = function(url) {
  var a = document.createElement('a');
  a.href = url;
  // IE fix: IE doesn't set the protocol/host for relative URL but sets the
  // 'href' to the converted absolute URL. We set the 'href' again with the
  // absolute URL so that it returns the correct protocol and host.
  a.href = a.href;
  var protocol = a.protocol;
  if (!/^https?:$/i.test(protocol)) {
    return null;
  }
  var host = a.host;
  var path = a.pathname;
  // Safari 4 fix: use hostname instead of host
  if (a.hostname.length > a.host.length) {
    host = a.hostname;
  }
  // IE fix: remove port if it is 80/443 for http/https and add leading '/'
  // for pathname.
  if (protocol == 'http:' && host.slice(-3) == ':80') {
    host = host.slice(0, -3);
  } else if (protocol == 'https:' && host.slice(-4) == ':443') {
    host = host.slice(0, -4);
  }
  if (!path) {
    path = '/';
  } else if (path[0] != '/') {
    path = '/' + path;
  }
  var query = a.search;
  var fragment = a.hash;
  return new accountchooser.util.Url(protocol, host, path, query, fragment);
};

/**
 * Creates a Url object from the given parts. Only http or https URLs are
 * supported.
 * @param {string} protocol The protocol of the URL. e.g., "http:".
 * @param {string} host The host of the URL, including the port if any.
 * @param {string} path The path of the URL, starting with "/".
 * @param {string=} opt_query The query of the URL, starting with "?" if any..
 * @param {string=} opt_fragment The fragment of the URL, starting with "#" if
 *     any.
 * @constructor
 */
accountchooser.util.Url = function(protocol, host, path, opt_query,
    opt_fragment) {
  this.protocol_ = protocol;
  this.host_ = host;
  this.path_ = path;
  this.query_ = opt_query || '';
  this.fragment_ = opt_fragment || '';
  /**
   * @type {Object.<string>}
   * @private
   */
  this.queryParameters_ = null;
  /**
   * @type {Object.<string>}
   * @private
   */
  this.fragmentParameters_ = null;
  this.validate_();
};

/**
 * Validates the Url object.
 * @private
 */
accountchooser.util.Url.prototype.validate_ = function() {
  if (!/^https?:$/i.test(this.protocol_)) {
    throw 'Invalid URL protocol: ' + this.protocol_;
  }
  if (!this.host_) {
    throw 'Invalid URL host: ' + this.host_;
  }
  if (!this.path_ || this.path_[0] != '/') {
    throw 'Invalid URL path: ' + this.path_;
  }
  if (this.query_ && this.query_[0] != '?') {
    throw 'Invalid URL query: ' + this.query_;
  }
  if (this.fragment_ && this.fragment_[0] != '#') {
    throw 'Invalid URL fragment: ' + this.fragment_;
  }
};

/**
 * @return {string} The protocol of the URL.
 */
accountchooser.util.Url.prototype.getProtocol = function() {
  return this.protocol_;
};

/**
 * @return {string} The host of the URL.
 */
accountchooser.util.Url.prototype.getHost = function() {
  return this.host_;
};

/**
 * @return {string} The path of the URL.
 */
accountchooser.util.Url.prototype.getPath = function() {
  return this.path_;
};

/**
 * @return {string} The query of the URL.
 */
accountchooser.util.Url.prototype.getQuery = function() {
  return this.query_;
};

/**
 * @return {string} The fragment of the URL.
 */
accountchooser.util.Url.prototype.getFragment = function() {
  return this.fragment_;
};

/**
 * @return {string} The protocol and host of the URL.
 */
accountchooser.util.Url.prototype.getProtocolAndHost = function() {
  return this.protocol_ + '//' + this.host_;
};

/**
 * @return {string} The base URL string which contains the protocol, host and
 *     path.
 */
accountchooser.util.Url.prototype.getBaseString = function() {
  return this.protocol_ + '//' + this.host_ + this.path_;
};

/**
 * @return {Object.<string>} The key-value pairs of the query paraments.
 */
accountchooser.util.Url.prototype.getQueryParameters = function() {
  if (!this.queryParameters_) {
    this.queryParameters_ = this.parseParameters_(this.query_, true);
  }
  return this.queryParameters_;
};

/**
 * @param {string} name The query parameter name.
 * @return {string|undefined} The query parameter value with the given name.
 */
accountchooser.util.Url.prototype.getQueryParameter = function(name) {
  return this.getQueryParameters()[name];
};

/**
 * @return {Object.<string>} The key-value pairs of the fragment paraments.
 */
accountchooser.util.Url.prototype.getFragmentParameters = function() {
  if (!this.fragmentParameters_) {
    this.fragmentParameters_ = this.parseParameters_(this.fragment_, false);
  }
  return this.fragmentParameters_;
};

/**
 * @param {string} name The query parameter name.
 * @return {string|undefined} The query parameter value with the given name.
 */
accountchooser.util.Url.prototype.getFragmentParameter = function(name) {
  return this.getFragmentParameters()[name];
};

/**
 * Parses the parameters string into a key-value pairs. If it has repeated
 * parameter, the first value is used.
 * @param {string} paramString The parameters string.
 * @param {boolean} forQuery Indicate that the parameters string is from query
 *     or fragment.
 * @return {Object.<string>} The key-value pairs of the parameters.
 * @private
 */
accountchooser.util.Url.prototype.parseParameters_ = function(paramString,
    forQuery) {
  var params = {};
  var prefix = forQuery ? '?' : '#';
  if (paramString) {
    if (paramString[0] == prefix) {
      paramString = paramString.substr(1);
    }
    var pairs = paramString.split('&');
    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i].split('=');
      var name = pair[0];
      var value = pair[1];
      if (!params[name]) {
        params[name] = value;
      }
    }
  }
  return params;
};

/**
 * Appends query parameters.
 * @param {Object} params The key-value parameters to be added.
 */
accountchooser.util.Url.prototype.addQueryParameters = function(params) {
  this.appendParameters_(params, true);
};

/**
 * Appends one parameter with the given name and value to the query.
 * @param {string} name The name of the parameter.
 * @param {*} opt_value The value of the parameter.
 */
accountchooser.util.Url.prototype.addQueryParameter = function(
    name, opt_value) {
  var params = {};
  params[name] = opt_value;
  this.addQueryParameters(params);
};

/**
 * Appends fragment parameters.
 * @param {Object} params The key-value parameters to be added.
 */
accountchooser.util.Url.prototype.addFragmentParameters = function(params) {
  this.appendParameters_(params, false);
};

/**
 * Appends one parameter with the given name and value to the fragment.
 * @param {string} name The name of the parameter.
 * @param {*} opt_value The value of the parameter.
 */
accountchooser.util.Url.prototype.addFragmentParameter = function(
    name, opt_value) {
  var params = {};
  params[name] = opt_value;
  this.addFragmentParameters(params);
};

/**
 * Appends the parameters to the URL.
 * @param {Object} params The key-value parameters to be added.
 * @param {boolean} forQuery Whether to add the parameters to the query or the
 *    fragment.
 * @private
 */
accountchooser.util.Url.prototype.appendParameters_ = function(params,
    forQuery) {
  var temp = [];
  for (var name in params) {
    var value = params[name];
    if (value == null) {
      temp.push(name);
    } else {
      temp.push(name + '=' + value);
    }
  }
  var paramString = temp.join('&');
  if (paramString) {
    if (forQuery) {
      if (this.query_) {
        this.query_ += '&' + paramString;
      } else {
        this.query_ = '?' + paramString;
      }
      this.queryParameters_ = null;
    } else {
      if (this.fragment_) {
        this.fragment_ += '&' + paramString;
      } else {
        this.fragment_ = '#' + paramString;
      }
      this.fragmentParameters_ = null;
    }
  }
};

/**
 * Replaces a query parameter with the given value. If the value is not
 * specified or null, the parameter is removed. If the parameter doesn't exist,
 * it is added.
 * @param {string} name The name of the parameter.
 * @param {*=} opt_value The value of the parameter.
 */
accountchooser.util.Url.prototype.replaceQueryParameter = function(name,
    opt_value) {
  var params = /** @type {Object} */ (this.getQueryParameters());
  if (opt_value == null) {
    delete params[name];
  } else {
    params[name] = opt_value;
  }
  this.query_ = '';
  this.addQueryParameters(params);
};

/**
 * Replaces a fragment parameter with the given value. If the value is not
 * specified or null, the parameter is removed. If the parameter doesn't exist,
 * it is added.
 * @param {string} name The name of the parameter.
 * @param {*=} opt_value The value of the parameter.
 */
accountchooser.util.Url.prototype.replaceFragmentParameter = function(name,
    opt_value) {
  var params = /** @type {Object} */ (this.getFragmentParameters());
  if (opt_value == null) {
    delete params[name];
  } else {
    params[name] = opt_value;
  }
  this.fragment_ = '';
  this.addFragmentParameters(params);
};

/**
 * @return {string} The string URL.
 */
accountchooser.util.Url.prototype.toString = function() {
  return this.protocol_ + '//' + this.host_ + this.path_ + this.query_ +
      this.fragment_;
};

/**
 * Checks if it matches the other URL. The query and fragment parts are ignored.
 * @param {accountchooser.util.Url|string} other The other URL.
 * @return {boolean} {@code true} if the two match.
 */
accountchooser.util.Url.prototype.match = function(other) {
  if (typeof other == 'string') {
    other = accountchooser.util.parseUrl(other);
  }
  if (!(other instanceof accountchooser.util.Url)) {
    return false;
  } else {
    return this.protocol_ == other.protocol_ &&
        this.host_ == other.host_ &&
        this.path_ == other.path_;
  }
};

/**
 * Creates a new Url object by using the current one as the base. If the new url
 * is not specified, the current one is cloned. If it is an absolute URL, itself
 * is returned.
 * @param {string=} opt_url The new url. It can be an absolute URL, or an
 *     absolute path, or an relative path.
 * @return {accountchooser.util.Url} The new Url object.
 */
accountchooser.util.Url.prototype.asBase = function(opt_url) {
  if (!opt_url) {
    // return a copy of current one.
    return new accountchooser.util.Url(this.protocol_, this.host_, this.path_,
        this.query_, this.fragment_);
  } else if (accountchooser.util.isHttpOrHttpsUrl(opt_url)) {
    // return the absolute URL itself.
    return accountchooser.util.parseUrl(opt_url);
  } else if (opt_url[0] == '/') {
    // absolute path.
    return accountchooser.util.parseUrl(
        this.protocol_ + '//' + this.host_ + opt_url);
  } else {
    // relative path.
    var components = this.path_.split('/');
    components[components.length - 1] = opt_url;
    return accountchooser.util.parseUrl(
        this.protocol_ + '//' + this.host_ + components.join('/'));
  }
};


/**
 * Base validator.
 * @constructor
 */
accountchooser.util.Validator = function() {
  this.exceptionHandler_ = null;
};

/**
 * Sets the exception handler.
 * @param {function(?, Error)} handler The exception handler.
 * @return {accountchooser.util.Validator} The validator itself.
 */
accountchooser.util.Validator.prototype.setExceptionHandler = function(
    handler) {
  this.exceptionHandler_ = handler;
  return this;
};

/**
 * Validates the value.
 * @param {?} value The value to be validated.
 * @return {?} The validated value.
 */
accountchooser.util.Validator.prototype.validate = function(value) {
  try {
    return this.execute(value);
  } catch (e) {
    if (this.exceptionHandler_) {
      return this.exceptionHandler_(value, e);
    } else {
      // re-throw
      throw e;
    }
  }
};

/**
 * Validates the value. If it's invalid, an error is thrown.
 * @param {?} value The value to be validated.
 * @return {?} The validated value.
 * @protected
 */
accountchooser.util.Validator.prototype.execute = function(value) {
  throw new Error('Not implemented');
};

/**
 * A validator that validates nothing.
 * @constructor
 * @extends {accountchooser.util.Validator}
 */
accountchooser.util.NoopValidator = function() {};
accountchooser.util.NoopValidator.inheritsFrom(accountchooser.util.Validator);

/**
 * @override
 * @protected
 */
accountchooser.util.NoopValidator.prototype.execute = function(value) {
  return value;
};

/**
 * A validator that validates a boolean value.
 * @constructor
 * @extends {accountchooser.util.Validator}
 */
accountchooser.util.BooleanValidator = function() {};
accountchooser.util.BooleanValidator.inheritsFrom(
    accountchooser.util.Validator);

/**
 * @override
 * @param {?} value The value to be validated.
 * @return {boolean} The validated value.
 * @protected
 */
accountchooser.util.BooleanValidator.prototype.execute = function(value) {
  return !!value;
};

/**
 * A validator that validates a language code.
 * @constructor
 * @extends {accountchooser.util.Validator}
 */
accountchooser.util.LanguageValidator = function() {};
accountchooser.util.LanguageValidator.inheritsFrom(
    accountchooser.util.Validator);

/**
 * @override
 * @param {string} language The language code to be validated.
 * @return {string|undefined} The validated language code.
 * @protected
 */
accountchooser.util.LanguageValidator.prototype.execute = function(language) {
  return accountchooser.util.findLanguageCode(language);
};

/**
 * A validator that validates a value belongs to an Enum.
 * @param {Object} enums The enum set.
 * @constructor
 * @extends {accountchooser.util.Validator}
 */
accountchooser.util.EnumValidator = function(enums) {
  this.enums_ = enums;
};
accountchooser.util.EnumValidator.inheritsFrom(
    accountchooser.util.Validator);

/**
 * @override
 */
accountchooser.util.EnumValidator.prototype.execute = function(value) {
  for (var name in this.enums_) {
    if (value == this.enums_[name]) {
      return value;
    }
  }
  throw new Error(value + ' is not a valid enum');
};

/**
 * A validator that validates text.
 * @param {number} maxLength The maximum length for the text. 0 means no maximum
 *     length.
 * @param {boolean} truncate Whether to truncate the text or throw an error when
 *     the text exceeds the maximum length.
 * @constructor
 * @extends {accountchooser.util.Validator}
 */
accountchooser.util.TextValidator = function(maxLength, truncate) {
  this.maxLength_ = maxLength;
  this.truncate_ = truncate;
};
accountchooser.util.TextValidator.inheritsFrom(accountchooser.util.Validator);

/**
 * @override
 * @param {string} text The text to be validated.
 * @return {string} The validated text.
 * @protected
 */
accountchooser.util.TextValidator.prototype.execute = function(text) {
  if (this.maxLength_ && text.length > this.maxLength_) {
    if (this.truncate_) {
      text = text.substr(0, this.maxLength_);
    } else {
      throw new Error('Text is too long. MaxLen: ' + this.maxLength_);
    }
  }
  return text;
};

/**
 * A validator that sanitizes and validates text.
 * @param {number} maxLength The maximum length for the text.
 * @param {boolean} truncate Whether to truncate the text or throw an error when
 *     the text exceeds the maximum length.
 * @constructor
 * @extends {accountchooser.util.TextValidator}
 */
accountchooser.util.TextSanitizer = function(maxLength, truncate) {
  accountchooser.util.TextValidator.call(this, maxLength, truncate);
};
accountchooser.util.TextSanitizer.inheritsFrom(
    accountchooser.util.TextValidator);

/**
 * @override
 * @param {string} text The text to be validated.
 * @return {string} The validated text.
 * @protected
 */
accountchooser.util.TextSanitizer.prototype.execute = function(text) {
  // Use html-css-sanitizer to sanitze the text. All HTML tags are removed.
  // In some environments which don't load html-css-sanitizer, just skip the
  // sanitization.
  if (typeof html != 'undefined' && html && html.sanitizeWithPolicy) {
    text = html.sanitizeWithPolicy(text, function() {});
  }
  return accountchooser.util.TextValidator.prototype.execute.call(this, text);
};

/**
 * A validator that validates a URL.
 * @param {number} maxLength The maximum length for the URL.
 * @param {string=} opt_origin The allowed origin for the URL.
 * @param {boolean=} opt_httpsOnly If {@code true}, only HTTPS URL is allowed.
 * @constructor
 * @extends {accountchooser.util.Validator}
 */
accountchooser.util.UrlValidator = function(maxLength, opt_origin,
    opt_httpsOnly) {
  this.maxLength_ = maxLength;
  this.origin_ = (opt_origin && opt_origin.replace(/^https?:\/\//, '')) || '';
  this.httpsOnly = !!opt_httpsOnly;
};
accountchooser.util.UrlValidator.inheritsFrom(accountchooser.util.Validator);

/**
 * @override
 * @param {string} url The URL to be validated.
 * @return {string} The validated URL.
 * @protected
 */
accountchooser.util.UrlValidator.prototype.execute = function(url) {
  if (url.length > this.maxLength_) {
    throw new Error('URL is too long. MaxLen: ' + this.maxLength_);
  }
  if ((!this.httpsOnly && !accountchooser.util.isHttpOrHttpsUrl(url)) ||
      (this.httpsOnly && !accountchooser.util.isHttpsUrl(url))) {
    throw new Error('Invalid scheme: ' + url);
  }
  if (this.origin_ &&
      accountchooser.util.parseUrl(url).getHost() != this.origin_) {
    throw new Error('Invalid domain: ' + url);
  }
  return url;
};

/**
 * A validator that validates each element in an arry.
 * @param {accountchooser.util.Validator} validator The validator used to
 *     validate each element of an array.
 * @constructor
 * @extends {accountchooser.util.Validator}
 */
accountchooser.util.ArrayValidator = function(validator) {
  this.validator_ = validator;
};
accountchooser.util.ArrayValidator.inheritsFrom(accountchooser.util.Validator);

/**
 * @override
 * @param {Array} array The array to be validated.
 * @return {Array} The validated array.
 * @protected
 */
accountchooser.util.ArrayValidator.prototype.execute = function(array) {
  if (!accountchooser.util.isArray(array)) {
    throw new Error('Not an array');
  }
  for (var i = 0; i < array.length; i++) {
    array[i] = this.validator_.validate(array[i]);
  }
  return array;
};

/**
 * A validator that validates each field in an object.
 * @param {boolean} failOnUnrecognized Whether to throw an error or delete it
 *     for an unrecognized field in the object.
 * @constructor
 * @extends {accountchooser.util.Validator}
 */
accountchooser.util.ObjectValidator = function(failOnUnrecognized) {
  this.failOnUnrecognized_ = failOnUnrecognized;
  this.required_ = {};
  this.optional_ = {};
};
accountchooser.util.ObjectValidator.inheritsFrom(
    accountchooser.util.Validator);

/**
 * @override
 * @param {Object} object The object to be validated.
 * @return {Object} The validated object.
 * @protected
 */
accountchooser.util.ObjectValidator.prototype.execute = function(object) {
  for (var name in object) {
    // Find the corresponding validator.
    var validator = this.required_[name] || this.optional_[name];
    if (validator) {
      // Validate the property if it's not null.
      if (object[name] != null) {
        object[name] = validator.validate(object[name]);
      }
    } else if (this.failOnUnrecognized_) {
      // Fail on unrecognized field.
      throw new Error('Unrecognized field: ' + name);
    } else {
      // Remove the unrecognized field.
      delete object[name];
    }
    // If the property value is null after validation, remove it.
    if (object[name] == null) {
      delete object[name];
    }
  }
  this.checkRequired_(object);
  return object;
};

/**
 * Adds an validator for a required field.
 * @param {string} name The name for the field.
 * @param {accountchooser.util.Validator} validator The validator for the field.
 * @return {accountchooser.util.ObjectValidator} The validator itself.
 */
accountchooser.util.ObjectValidator.prototype.addRequired = function(name,
    validator) {
  if (name in this.optional_) {
    throw new Error(name + ' can not be both required and optional.');
  }
  this.required_[name] = validator;
  return this;
};

/**
 * Adds an validator for an optional field.
 * @param {string} name The name for the field.
 * @param {accountchooser.util.Validator} validator The validator for the field.
 * @return {accountchooser.util.ObjectValidator} The validator itself.
 */
accountchooser.util.ObjectValidator.prototype.addOptional = function(name,
    validator) {
  if (name in this.required_) {
    throw new Error(name + ' can not be both required and optional.');
  }
  this.optional_[name] = validator;
  return this;
};

/**
 * Checks if the object contains all the required fields. If not, an er
 * @param {Object} object The object to be validated.
 * @private
 */
accountchooser.util.ObjectValidator.prototype.checkRequired_ = function(
    object) {
  for (var name in this.required_) {
    if (object[name] == null) {
      throw new Error(name + ' is required.');
    }
  }
};

// Predefined validators.

/** @const {accountchooser.util.NoopValidator} */
accountchooser.util.V_NOOP = new accountchooser.util.NoopValidator();

/** @const {accountchooser.util.BooleanValidator} */
accountchooser.util.V_BOOLEAN = new accountchooser.util.BooleanValidator();

/** @const {accountchooser.util.LanguageValidator} */
accountchooser.util.V_LANGUAGE = new accountchooser.util.LanguageValidator();

/** @const {accountchooser.util.TextSanitizer} */
accountchooser.util.V_ACCOUNT_EMAIL =
    new accountchooser.util.TextSanitizer(128, true);

/** @const {accountchooser.util.TextSanitizer} */
accountchooser.util.V_ACCOUNT_DISPLAY_NAME =
    new accountchooser.util.TextSanitizer(128, true);

/**
 * For account photoUrl, we don't fail on invalid photoUrl. Just discard it.
 * @const {accountchooser.util.UrlValidator}
 */
accountchooser.util.V_ACCOUNT_PHOTO_URL =
    /** @type {accountchooser.util.UrlValidator} */
    (new accountchooser.util.UrlValidator(2048, undefined, true).
        setExceptionHandler(function(value, ex) {}));

/** @const {accountchooser.util.TextSanitizer} */
accountchooser.util.V_ACCOUNT_PROVIDER_ID =
    new accountchooser.util.TextSanitizer(128, true);

/** @const {accountchooser.util.Validator} */
accountchooser.util.V_PROVIDER_LIST = new accountchooser.util.ArrayValidator(
    accountchooser.util.V_ACCOUNT_PROVIDER_ID);

/** @const {accountchooser.util.ObjectValidator} */
accountchooser.util.V_ACCOUNT = new accountchooser.util.ObjectValidator(true).
    addRequired('email', accountchooser.util.V_ACCOUNT_EMAIL).
    addOptional('displayName', accountchooser.util.V_ACCOUNT_DISPLAY_NAME).
    addOptional('photoUrl', accountchooser.util.V_ACCOUNT_PHOTO_URL).
    addOptional('providerId', accountchooser.util.V_ACCOUNT_PROVIDER_ID);

/** @const {accountchooser.util.ArrayValidator} */
accountchooser.util.V_ACCOUNT_LIST = new accountchooser.util.ArrayValidator(
    accountchooser.util.V_ACCOUNT);


/**
 * @param {string} origin The origin of the client.
 * @return {accountchooser.util.Validator} A validator for StoreRequest.
 * @private
 */
accountchooser.rpc.getStoreRequestValidator_ = function(origin) {
  var urlValidator = new accountchooser.util.UrlValidator(2048, origin);
  var clientConfigValidator = new accountchooser.util.ObjectValidator(false).
      addOptional('clientCallbackUrl', urlValidator).
      addOptional('positiveCallbackUrl', urlValidator).
      addOptional('negativeCallbackUrl', urlValidator).
      addOptional('silent', accountchooser.util.V_BOOLEAN).
      addOptional('keepPopup', accountchooser.util.V_BOOLEAN).
      addOptional('language', accountchooser.util.V_LANGUAGE);
  var paramsValidator = new accountchooser.util.ObjectValidator(false).
      addRequired('accounts', accountchooser.util.V_ACCOUNT_LIST).
      addRequired('clientConfig', clientConfigValidator);
  return paramsValidator;
};

/**
 * @param {string} origin The origin of the client.
 * @return {accountchooser.util.Validator} A validator for SelectRequest.
 * @private
 */
accountchooser.rpc.getSelectRequestValidator_ = function(origin) {
  var urlValidator = new accountchooser.util.UrlValidator(2048, origin);
  var uiValidator = new accountchooser.util.ObjectValidator(false).
      addOptional('title', new accountchooser.util.TextValidator(64, true)).
      addOptional('favicon', urlValidator).
      addOptional('branding', urlValidator);
  var clientConfigValidator = new accountchooser.util.ObjectValidator(false).
      addOptional('clientCallbackUrl', urlValidator).
      addOptional('providers', accountchooser.util.V_PROVIDER_LIST).
      addOptional('showAll', accountchooser.util.V_BOOLEAN).
      addOptional('ui', uiValidator).
      addOptional('keepPopup', accountchooser.util.V_BOOLEAN).
      addOptional('language', accountchooser.util.V_LANGUAGE);
  var paramsValidator = new accountchooser.util.ObjectValidator(false).
      addOptional('localAccounts', accountchooser.util.V_ACCOUNT_LIST).
      addRequired('clientConfig', clientConfigValidator);
  return paramsValidator;
};

/**
 * @param {string} origin The origin of the client.
 * @return {accountchooser.util.Validator} A validator for UpdateRequest.
 * @private
 */
accountchooser.rpc.getUpdateRequestValidator_ = function(origin) {
  var urlValidator = new accountchooser.util.UrlValidator(2048, origin);
  var clientConfigValidator = new accountchooser.util.ObjectValidator(false).
      addOptional('clientCallbackUrl', urlValidator).
      addOptional('positiveCallbackUrl', urlValidator).
      addOptional('negativeCallbackUrl', urlValidator).
      addOptional('keepPopup', accountchooser.util.V_BOOLEAN).
      addOptional('language', accountchooser.util.V_LANGUAGE);
  var paramsValidator = new accountchooser.util.ObjectValidator(false).
      addRequired('account', accountchooser.util.V_ACCOUNT).
      addRequired('clientConfig', clientConfigValidator);
  return paramsValidator;
};

/**
 * @param {string} origin The origin of the client.
 * @return {accountchooser.util.Validator} A validator for BootstrapRequest.
 * @private
 */
accountchooser.rpc.getBootstrapRequestValidator_ = function(origin) {
  var urlValidator = new accountchooser.util.UrlValidator(2048, origin);
  var clientConfigValidator = new accountchooser.util.ObjectValidator(false).
      addOptional('clientCallbackUrl', urlValidator).
      addOptional('positiveCallbackUrl', urlValidator).
      addOptional('negativeCallbackUrl', urlValidator).
      addOptional('keepPopup', accountchooser.util.V_BOOLEAN).
      addOptional('language', accountchooser.util.V_LANGUAGE);
  var paramsValidator = new accountchooser.util.ObjectValidator(false).
      addRequired('origin', urlValidator).
      addOptional('accounts', accountchooser.util.V_ACCOUNT_LIST).
      addRequired('clientConfig', clientConfigValidator);
  return paramsValidator;
};

/**
 * @return {accountchooser.util.Validator} A validator for QueryRequest.
 * @private
 */
accountchooser.rpc.getQueryRequestValidator_ = function() {
  var queryValidator =
      new accountchooser.util.EnumValidator(accountchooser.rpc.Queries);
  var paramsValidator = new accountchooser.util.ObjectValidator(false).
      addRequired('query', queryValidator).
      addOptional('account', accountchooser.util.V_ACCOUNT);
  return paramsValidator;
};

/**
 * Builds validators for the request. Each acceptable request type must be
 * listed here, even if it doesn't need any validators. Otherwise an error will
 * be thrown.
 * Throws {@code Error} when validation fails.
 *
 * @param {accountchooser.rpc.Request} request A request object.
 * @param {string} origin The origin of the request.
 * @return {Array.<accountchooser.util.Validator>} Validators for the request.
 * @private
 */
accountchooser.rpc.getValidatorsForRequest_ = function(request, origin) {
  var validators = [];
  if (request instanceof accountchooser.rpc.BootstrapRequest) {
    validators.push(accountchooser.rpc.getBootstrapRequestValidator_(origin));
  } else if (request instanceof accountchooser.rpc.ClientReadyNotification) {
    // Must explicity delcare validators for each acceptable Request.
  } else if (request instanceof accountchooser.rpc.QueryRequest) {
    validators.push(accountchooser.rpc.getQueryRequestValidator_());
  } else if (request instanceof accountchooser.rpc.SelectRequest) {
    validators.push(accountchooser.rpc.getSelectRequestValidator_(origin));
  } else if (request instanceof accountchooser.rpc.StoreRequest) {
    validators.push(accountchooser.rpc.getStoreRequestValidator_(origin));
  } else if (request instanceof accountchooser.rpc.UpdateRequest) {
    validators.push(accountchooser.rpc.getUpdateRequestValidator_(origin));
  } else {
    throw new Error('Failed to find validators for the request.');
  }
  return validators;
};

/**
 * Invokes all the validators for the request.
 * Throws {@code Error} when validation fails.
 *
 * @param {accountchooser.rpc.Request} request A request object.
 * @param {string} origin The origin of the request.
 */
accountchooser.rpc.validateRequest = function(request, origin) {
  var validators = accountchooser.rpc.getValidatorsForRequest_(
      request, origin);
  var parameters = request.getParameters();
  for (var i = 0; i < validators.length; i++) {
    validators[i].validate(parameters);
  }
};



/**
 * Declare the accountchooser BUILD_NUMBER_ which is dynamically generated.
 * @private
 */
accountchooser.rpc.BUILD_NUMBER_ = accountchooser.rpc.BUILD_NUMBER_ || 0;

/**
 * Calls an RPC service registered in another window.
 * @param {Window} targetWindow The target window object.
 * @param {accountchooser.rpc.RpcObject|Object} object The RpcObject or its
 *     serializable plain object counterpart.
 * @param {string=} opt_domain The domain of the target window.
 * @param {string=} opt_rpcToken The token associated with the RPC.
 */
accountchooser.rpc.call = function(targetWindow, object, opt_domain,
    opt_rpcToken) {
  accountchooser.param.notEmpty(targetWindow, 'targetWindow');
  var json;
  if (object instanceof accountchooser.rpc.RpcObject) {
    if (opt_rpcToken) {
      object.setRpcToken(opt_rpcToken);
    }
    if (accountchooser.rpc.BUILD_NUMBER_) {
      object.setBuildNumber(accountchooser.rpc.BUILD_NUMBER_);
    }
    json = object.toString();
  } else {
    if (opt_rpcToken) {
      object.rpcToken = opt_rpcToken;
    }
    if (accountchooser.rpc.BUILD_NUMBER_) {
      object.build = accountchooser.rpc.BUILD_NUMBER_;
    }
    json = JSON.stringify(object);
  }
  accountchooser.util.log('Send message: ' + json);
  targetWindow.postMessage(json, opt_domain || '*');
};

/**
 * Adds event listener for the target.
 * @param {EventTarget} target The target of the event.
 * @param {string} type The event type.
 * @param {function(Event, ...)} listener The event listener.
 */
accountchooser.rpc.addEventListener = function(target, type, listener) {
  if (target.addEventListener) {
    target.addEventListener(type, listener, false);
  } else if (target.attachEvent) {
    target.attachEvent('on' + type, listener);
  } else {
    throw 'Add event listener for ' + type + ' failed.';
  }
};

/**
 * Registers the message handler for postMessage.
 * @param {function(Event, ...)} messageHandler The message handler for
 *     postMessage.
 */
accountchooser.rpc.registerMessageHandler = function(messageHandler) {
  accountchooser.rpc.addEventListener(window, 'message', messageHandler);
};

/**
 * Loads a hidden iframe with the given url.
 * @param {string} url The URL of the iframe.
 * @param {function()=} opt_onload The onload callback.
 * @return {Element} The iframe element.
 */
accountchooser.rpc.loadHiddenIFrame = function(url, opt_onload) {
  var iframe = document.createElement('iframe');
  iframe.setAttribute('style', 'position: absolute; width: 1px; ' +
      'height: 1px; left: -9999px;');
  iframe.setAttribute('id', 'accountchooser-iframe');
  iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');
  document.body.appendChild(iframe);
  if (opt_onload) {
    accountchooser.rpc.addEventListener(iframe, 'load', opt_onload);
  }
  iframe.setAttribute('src', url);
  return iframe;
};

/**
 * A wrapper for window.location.replace(), to be easily mocked in unit tests.
 * @param {string} url The target URL.
 */
accountchooser.rpc.redirectWindowTo = function(url) {
  window.location.assign(url);
};

/**
 * A wrapper for window.close(), to be easily mocked in unit tests.
 */
accountchooser.rpc.closeWindow = function() {
  window.close();
};


/**
 * @typedef {{
 *   acceptableWindow: Window,
 *   validRpcTypes: Array.<Function>,
 *   rpcHandler: function(?, string),
 *   validRpcToken: (string|undefined),
 *   validOrigin: (string|undefined)
 * }}
 */
accountchooser.rpc.SecurityPolicy;

/**
 * Registers a message handler to receive and handle valid message from target
 * window.
 *
 * @param {Window} acceptableWindow The window whose message can be accepted.
 * @param {Array.<Function>} validRpcTypes Acceptable RPC types.
 * @param {function(?, string)} rpcHandler Callback to handle valid RPC object.
 * @param {string=} opt_rpcToken An optional RPC token for validating the
 *     message.
 * @param {string=} opt_origin An optional origin for validating the message.
 * @return {accountchooser.rpc.SecurityPolicy} The security policy.
 */
accountchooser.rpc.registerRpcHandlerWithPolicy = function(
    acceptableWindow, validRpcTypes, rpcHandler, opt_rpcToken, opt_origin) {
  accountchooser.param.notEmpty(acceptableWindow, 'acceptableWindow');
  accountchooser.param.notEmptyArray(validRpcTypes, 'validRpcTypes');
  accountchooser.param.notEmptyFunction(rpcHandler, 'rpcHandler');
  var policy = {
    acceptableWindow: acceptableWindow,
    validRpcTypes: validRpcTypes,
    rpcHandler: rpcHandler,
    validRpcToken: opt_rpcToken,
    validOrigin: opt_origin
  };

  accountchooser.rpc.requireHtmlSanitizer_();
  accountchooser.rpc.registerMessageHandler(function(e) {
      accountchooser.rpc.receiveMessageAndEnforceSecurityPolicies_(e, policy);
  });
  return policy;
};

/**
 * Requires the html-sanitizer is present. If not, an error is thrown.
 * @private
 */
accountchooser.rpc.requireHtmlSanitizer_ = function() {
  if (typeof html == 'undefined' || !html || !html.sanitizeWithPolicy) {
    throw 'html-sanitizer is required.';
  }
};

/**
 * Enforces security/integrity checking on the received request which is wrapped
 * in the postMessage event.
 * Throws {@code Error} when validation fails.
 * @param {Event} e The message event object.
 * @param {accountchooser.rpc.SecurityPolicy} policy The security policy.
 * @private
 */
accountchooser.rpc.receiveMessageAndEnforceSecurityPolicies_ = function(
    e, policy) {
  if (e.source !== policy.acceptableWindow) {
    return;
  }
  if (policy.validOrigin && policy.validOrigin != e.origin) {
    accountchooser.util.log('Invalid message received: mismatched origin.');
    return;
  }
  try {
    var jsonObject = /** @type {Object} */ (JSON.parse(e.data));
  } catch (ex) {
    accountchooser.util.log('Invalid JSON object.');
    return;
  }
  if (policy.validRpcToken &&
      !accountchooser.util.compareInConstantTime(
          policy.validRpcToken, jsonObject.rpcToken)) {
    accountchooser.util.log('Invalid RPC received: mismatched RPC token.');
    return;
  }

  // Converts to an acceptable request object.
  var rpcObject = accountchooser.rpc.parseRpcObject(
      jsonObject, policy.validRpcTypes);
  if (!rpcObject) {
    accountchooser.util.log('Invalid RPC received: unacceptable RPC type.');
    return;
  }
  if (rpcObject instanceof accountchooser.rpc.Request) {
    // Validate the request.
    accountchooser.rpc.validateRequest(rpcObject, e.origin);
  }
  // This is a valid message. Send to rpcHandler.
  policy.rpcHandler(rpcObject, e.origin);
};


/**
 * The timeout for IDP iframe loading and request processing, in milliseconds.
 * @const {number}
 * @private
 */
accountchooser.rpc.IDP_TIMEOUT_ = 500;

/**
 * @typedef {{
 *   endpoint: accountchooser.util.Url,
 *   iframe: Element,
 *   rpcToken: string
 * }}
 */
accountchooser.rpc.IdpStatus;

/**
 * @type {Array.<accountchooser.rpc.IdpStatus>}
 * @private
 */
accountchooser.rpc.idps_ = [];

/**
 * Buffer that holds all accounts returned from IDPs.
 * @type {accountchooser.AccountList}
 * @private
 */
accountchooser.rpc.idpAccounts_ = [];

/**
 * Flag that indicates IDP ss timeout.
 * @type {boolean}
 * @private
 */
accountchooser.rpc.idpTimedOut_ = false;

/**
 * The waiting queue used for buffering request callbacks when IDP iframes are
 * not ready.
 * @type {Array.<function(accountchooser.AccountList)>}
 * @private
 */
accountchooser.rpc.waitingQueue_ = [];

/**
 * The pending IDP requests.
 * @type {Array.<string>}
 * @private
 */
accountchooser.rpc.pendingIdpRequestIds_ = [];

/**
 * Invokes all callbacks in the waiting queue.
 * @private
 */
accountchooser.rpc.invokeWaitingCallbacks_ = function() {
  for (var i = 0; i < accountchooser.rpc.waitingQueue_.length; i++) {
    var accounts = accountchooser.rpc.idpAccounts_.slice(0);
    accountchooser.rpc.waitingQueue_[i](accounts);
  }
  accountchooser.rpc.waitingQueue_.length = 0;
};

/**
 * Processes the response from IDPs.
 * @param {accountchooser.rpc.Response} response The response from IDP.
 * @param {string} origin The origin of the response.
 * @private
 */
accountchooser.rpc.processIdpResponse_ = function(response, origin) {
  var id = response.getId();
  var index = accountchooser.util.indexOf(
      id, accountchooser.rpc.pendingIdpRequestIds_);
  // Ignore all responses that are not initiated by us.
  if (index < 0) {
    return;
  }

  // Remove the pending request ID.
  accountchooser.rpc.pendingIdpRequestIds_.splice(index, 1);
  var result = /** @type {Object} */ (response.getResult());
  if (!accountchooser.util.isArray(result)) {
    accountchooser.util.log('Received bad response from: ' + origin);
    return;
  }
  Array.prototype.push.apply(accountchooser.rpc.idpAccounts_, result);
  if (accountchooser.rpc.pendingIdpRequestIds_.length == 0) {
    accountchooser.rpc.invokeWaitingCallbacks_();
  }
};

/**
 * Generates the IDP bootstrapping endpoint iframe URL, which includes the
 * account chooser origin in the query and RPC token in the fragment.
 * @param {accountchooser.rpc.IdpStatus} idp The IDP to initialize.
 * @return {string} the IDP bootstrapping endpoint iframe URL.
 * @private
 */
accountchooser.rpc.getIdpIFrameUrl_ = function(idp) {
  var origin = window.location.protocol + '//' + window.location.host;
  // copy the endpoint URL.
  var url = idp.endpoint.asBase();
  url.replaceQueryParameter('origin', origin);
  url.replaceFragmentParameter('rpcToken', idp.rpcToken);
  return url.toString();
};

/**
 * Loads IDP iframe.
 * @param {accountchooser.rpc.IdpStatus} idp The IDP to initialize.
 * @private
 */
accountchooser.rpc.initIdp_ = function(idp) {
  var origin = idp.endpoint.getProtocolAndHost();
  var request = new accountchooser.rpc.GetIdpAccountsRequest(
      accountchooser.util.generateRandomToken());
  accountchooser.rpc.pendingIdpRequestIds_.push(request.getId());
  idp.iframe = accountchooser.rpc.loadHiddenIFrame(
      accountchooser.rpc.getIdpIFrameUrl_(idp),
      function() {
        // On iframe loaded, send the request.
        accountchooser.rpc.call(
            idp.iframe.contentWindow, request, origin, idp.rpcToken);
      });
  // Register handler.
  accountchooser.rpc.registerRpcHandlerWithPolicy(
      idp.iframe.contentWindow,
      [accountchooser.rpc.Response],
      accountchooser.rpc.processIdpResponse_,
      idp.rpcToken,
      origin);
};

/**
 * Sends a get request to IDPs.
 * @param {function(accountchooser.AccountList)} callback
 *     The callback invoked on the IDP results.
 */
accountchooser.rpc.getIdpAccounts = function(callback) {
  if (accountchooser.rpc.pendingIdpRequestIds_.length == 0 ||
      accountchooser.rpc.idpTimedOut_) {
    // If all IDPs are ready or time out, send the current account list back.
    callback(accountchooser.rpc.idpAccounts_.slice(0));
  } else {
    // Otherwise, wait for IDPs to be ready.
    accountchooser.rpc.waitingQueue_.push(callback);
  }
};

/**
 * Initializes IDP iframes.
 */
accountchooser.rpc.initIdps = function() {
  var httpsOnly = !accountchooser.config['ALLOW_NON_HTTPS_IDP'];
  var validator =
      new accountchooser.util.UrlValidator(2048, undefined, httpsOnly);
  var urls = accountchooser.config['ACCOUNT_BOOTSTRAP_IDP_ENDPOINTS'] || [];
  for (var i = 0; i < urls.length; i++) {
    try {
      validator.validate(urls[i]);
      var idp = {
        endpoint: accountchooser.util.parseUrl(urls[i]),
        iframe: null,
        rpcToken: accountchooser.util.generateRandomToken()
      };
      accountchooser.rpc.idps_.push(idp);
    } catch (e) {
      accountchooser.util.log('Invalid endpoints: ' + urls[i]);
    }
  }
  // Wait for the HTML body is loaded. Due to Content-Security-Policy, we can
  // not execute javascript in HTML body. We have to call the initIdps method in
  // head, in which case the body is not loaded and we can't insert the iframe.
  accountchooser.rpc.addEventListener(window, 'load', function() {
    for (var i = 0; i < accountchooser.rpc.idps_.length; i++) {
      accountchooser.rpc.initIdp_(accountchooser.rpc.idps_[i]);
    }
  });
  // Set global timeout for IDP iframe loading and request processing.
  window.setTimeout(function() {
    accountchooser.rpc.idpTimedOut_ = true;
    accountchooser.rpc.invokeWaitingCallbacks_();
  }, accountchooser.rpc.IDP_TIMEOUT_);
};



/**
 * DomainStorage storage class.
 * @param {boolean} deleteOnRead Whether to delete an object once it is read.
 * @param {string} opt_prefix An optional prefix for the key in sessionStorage.
 * @constructor
 */
accountchooser.DomainStorage = function(deleteOnRead, opt_prefix) {
  this.available_ = accountchooser.Storage.isSessionStorageAvailable();
  this.deleteOnRead_ = deleteOnRead;
  this.prefix_ = opt_prefix ? opt_prefix : '';
};

/**
 * @return {boolean} {@code true} if the domain storage instance is available.
 */
accountchooser.DomainStorage.prototype.isAvailable = function() {
  return this.available_;
};

/**
 * Reads data from storage.
 * @param {string} domain Current site domain.
 * @return {Array.<Object>|undefined} The previously
 *     saved data.
 */
accountchooser.DomainStorage.prototype.read = function(domain) {
  accountchooser.param.notEmpty(domain, 'domain');
  if (this.isAvailable()) {
    try {
      var data = window.sessionStorage.getItem(this.prefix_ + domain);
      if (this.deleteOnRead_) {
        window.sessionStorage.removeItem(this.prefix_ + domain);
      }
      if (data) {
        var rpcs = /** @type {Array.<Object>|undefined} */
            (JSON.parse(data));
        return rpcs;
      }
    } catch (e) {
      accountchooser.util.log('Failed to read from session storage: ' + e);
    }
  }
};

/**
 * Writes data to storage.
 * @param {string} domain Current site domain.
 * @param {Array.<accountchooser.rpc.RpcObject>} data The data to be stored.
 */
accountchooser.DomainStorage.prototype.write = function(domain, data) {
  accountchooser.param.notEmpty(domain, 'domain');
  if (this.isAvailable()) {
    try {
      var jsonData = JSON.stringify(data);
      window.sessionStorage.setItem(this.prefix_ + domain, jsonData);
    } catch (e) {
      accountchooser.util.log('Failed to write to session storage: ' + e);
    }
  }
};

/**
 * Clears data from storage.
 * @param {string} domain Current site domain.
 */
accountchooser.DomainStorage.prototype.clear = function(domain) {
  accountchooser.param.notEmpty(domain, 'domain');
  if (this.isAvailable()) {
    try {
      window.sessionStorage.removeItem(this.prefix_ + domain);
    } catch (e) {
      accountchooser.util.log('Failed to clear from session storage: ' + e);
    }
  }
};



/**
 * Namespace for rpcstorage.
 */
accountchooser.rpcstorage = accountchooser.rpcstorage || {};

/**
 * The prefix for saved incoming (from client to accountchooser) RPC objects
 * @const {string}
 * @private
 */
accountchooser.rpcstorage.SAVED_IN_RPC_PREFIX_ = 'IN_RPC_';

/**
 * The prefix for saved outgoing (from accountchooser to client) RPC objects
 * @const {string}
 * @private
 */
accountchooser.rpcstorage.SAVED_OUT_RPC_PREFIX_ = 'OUT_RPC_';

/**
 * The life time of an RPC object, in milliseconds. Default to 5 minutes.
 * @const {number}
 * @private
 */
accountchooser.rpcstorage.RPC_TIMEOUT_ = 5 * 60 * 1000;

/**
 * The storage for incoming (from client to accountchooser) RPC objects
 * @type {accountchooser.DomainStorage}
 * @private
 */
accountchooser.rpcstorage.incomingStorage_ = new accountchooser.DomainStorage(
    true, accountchooser.rpcstorage.SAVED_IN_RPC_PREFIX_);

/**
 * The storage for outgoing (from accountchooser to client) RPC objects
 * @type {accountchooser.DomainStorage}
 * @private
 */
accountchooser.rpcstorage.outgoingStorage_ = new accountchooser.DomainStorage(
    true, accountchooser.rpcstorage.SAVED_OUT_RPC_PREFIX_);

/**
 * Reads saved RPC objects from sessionStorage.
 * @param {string} clientDomain the domain of the client.
 * @param {boolean} incoming Whether to read incoming (from client to
 *     accountchooser) or outgoing (from accountchooser to client) storage.
 * @return {Array.<Object>} An array of RPC JSON objects.
 */
accountchooser.rpcstorage.readSavedRpcObjects = function(
    clientDomain, incoming) {
  var storage = incoming ? accountchooser.rpcstorage.incomingStorage_ :
      accountchooser.rpcstorage.outgoingStorage_;
  var domain = clientDomain.replace(/^https?:\/\//, '');
  var result = [];
  var data = /** @type {Array.<Object>|undefined} */ (storage.read(domain));
  if (data) {
    var now = new Date().getTime();
    if (data.length) {
      // Only process the latest request.
      var rpc = data[data.length - 1];
      if (rpc && rpc.timestamp &&
          now - rpc.timestamp < accountchooser.rpcstorage.RPC_TIMEOUT_) {
        result.push(rpc);
        if (incoming) {
          // Keeps incoming request for accountchooser page reloading.
          storage.write(domain, result);
        }
      } else {
        accountchooser.util.log(
            'Ignore expired JSON-RPC object: [' + JSON.stringify(rpc) + ']');
      }
    }
  }
  return result;
};

/**
 * Saves an RpcObject into sessionStorage.
 * @param {string} clientDomain the domain of the client.
 * @param {accountchooser.rpc.RpcObject} rpcObject the RpcObject to be saved.
 * @param {boolean} incoming Whether to read incoming (from client to
 *     accountchooser) or outgoing (from accountchooser to client) storage.
 */
accountchooser.rpcstorage.saveRpcObject = function(
    clientDomain, rpcObject, incoming) {
  var domain = clientDomain.replace(/^https?:\/\//, '');
  // Delete the out-dated request/response before saving a new one.
  accountchooser.rpcstorage.incomingStorage_.clear(domain);
  accountchooser.rpcstorage.outgoingStorage_.clear(domain);
  // Save the new one.
  // Uses an array for future extensibility, currently at most 1 element.
  var rpcs = [];
  rpcObject.setTimestamp();
  rpcs.push(rpcObject);
  if (incoming) {
    accountchooser.rpcstorage.incomingStorage_.write(domain, rpcs);
  } else {
    accountchooser.rpcstorage.outgoingStorage_.write(domain, rpcs);
  }
};

/**
 * @return {boolean} if the RPC storage is available.
 */
accountchooser.rpcstorage.isAvailable = function() {
  return accountchooser.rpcstorage.incomingStorage_.isAvailable() &&
      accountchooser.rpcstorage.outgoingStorage_.isAvailable();
};


// TODO: add support for other browsers.
/**
 * Enums for browser names.
 * @enum {string}
 */
accountchooser.util.BrowserName = {
  CHROME: 'chrome',
  UNKNOWN: 'unknown'
};

/**
 * Gets the browser name from the user agent string.
 * @param {string} userAgent The browser user-agent string.
 * @return {accountchooser.util.BrowserName} the name of the browser.
 */
accountchooser.util.getBrowserName = function(userAgent) {
  if (userAgent.indexOf('Chrome') >= 0 || userAgent.indexOf('CriOS') >= 0) {
    return accountchooser.util.BrowserName.CHROME;
  } else {
    return accountchooser.util.BrowserName.UNKNOWN;
  }
};

/**
 * Regex for mobile user agent.
 * @const {RegExp}
 * @private
 */
accountchooser.util.MOBILE_REGEX_ =
    /iphone|ipad|ipod|android|blackberry|mini|mobi|iemobile|mobile/i;

/**
 * Checks whether it is a mobile user agent.
 * @param {string} userAgent The browser user-agent string.
 * @return {boolean} Whether an agent is a mobile user agent.
 */
accountchooser.util.isMobileAgent = function(userAgent) {
  return accountchooser.util.MOBILE_REGEX_.test(userAgent);
};



/**
 * Triggers saved RpcObjects to the client.
 * @param {string} origin The domain of the client.
 * @private
 */
accountchooser.rpc.triggerSavedRpcs_ = function(origin) {
  if (!window.parent) {
    return;
  }
  var rpcs = accountchooser.rpcstorage.readSavedRpcObjects(origin, false);
  var rpcToken = accountchooser.rpc.rpcToken_;
  if (rpcs && rpcs.length) {
    for (var i = 0; i < rpcs.length; i++) {
      accountchooser.rpc.call(window.parent, rpcs[i], origin, rpcToken);
    }
  } else {
    accountchooser.rpc.call(window.parent,
        new accountchooser.rpc.EmptyResponseNotification, origin, rpcToken);
  }
};

/**
 * Saves the request and sends ack back to the client.
 * @param {accountchooser.rpc.ClientRequest} request The request sent from the
 *     client.
 * @param {string} origin The origin of the client.
 * @private
 */
accountchooser.rpc.saveAndAckRequest_ = function(request, origin) {
  request.removeRpcToken();
  accountchooser.rpcstorage.saveRpcObject(origin, request, true);
  var ack = new accountchooser.rpc.RequestAckNotification(request.getId());
  accountchooser.rpc.call(window.parent, ack, origin,
      accountchooser.rpc.rpcToken_);
};

/**
 * Handles the inquiry and returns the result.
 * @param {accountchooser.rpc.QueryRequest} request The query request.
 * @param {string} origin The origin of the client.
 * @private
 */
accountchooser.rpc.handleQuery_ = function(request, origin) {
  var valid = true;
  var result = false;
  var account = request.getAccount();
  switch (request.getQuery()) {
    case accountchooser.rpc.Queries.AC_DISABLED:
      result = accountchooser.rpc.checkDisabled_();
      break;
    case accountchooser.rpc.Queries.AC_EMPTY:
      result = accountchooser.rpc.checkEmpty_();
      // Try to pull accounts from IDP.
      // If account storage is unavailable, e.g., 3rd party data is blocked by
      // the user, don't pull the IDPs since the iframe needs to save the
      // accounts returned from IDPs to the storage.
      if (result && accountchooser.accountstorage.isAvailable()) {
        accountchooser.rpc.checkIdpsEmpty_(request, origin);
        // Return early. Let the IDP callback send the response.
        return;
      }
      break;
    case accountchooser.rpc.Queries.ACCOUNT_EXIST:
      if (account) {
        result = accountchooser.rpc.checkAccountExist_(account);
      } else {
        valid = false;
      }
      break;
    case accountchooser.rpc.Queries.SHOULD_UPDATE:
      if (account) {
        result = accountchooser.rpc.checkShouldUpdate_(account);
      } else {
        valid = false;
      }
      break;
    default:
      valid = false;
      break;
  }
  if (valid) {
    var response = new accountchooser.rpc.Response(request.getId(), result);
    accountchooser.rpc.call(window.parent, response, origin,
        accountchooser.rpc.rpcToken_);
  } else {
    accountchooser.rpc.sendInvalidQueryResponse_(request, origin);
  }
};

/**
 * Checks whether the requesting domain is one of the account bootstrap domains.
 * @param {string} origin The origin of the site.
 * @return {boolean} {@code true} if the site is an account bootstrap domain.
 * @private
 */
accountchooser.rpc.isAccountBootstrapDomain_ = function(origin) {
  var domains = accountchooser.config['ACCOUNT_BOOTSTRAP_DOMAINS'];
  return accountchooser.util.isArray(domains) &&
      accountchooser.util.indexOf(origin, domains) >= 0;
};

/**
 * Handles the silent store request.
 * @param {accountchooser.rpc.StoreRequest} request The store request.
 * @param {string} origin The origin of the client.
 * @private
 */
accountchooser.rpc.handleSilentStore_ = function(request, origin) {
  var accounts = request.getAccounts();
  if (accountchooser.rpc.isAccountBootstrapDomain_(origin)) {
    // If the origin matches the the bootstrapping domain, save the accounts
    // silently.
    for (var i = 0; i < accounts.length; i++) {
      accountchooser.accountstorage.addAccount(accounts[i]);
    }
    var response = new accountchooser.rpc.Response(
        request.getId(), {stored: true});
    accountchooser.rpc.call(window.parent, response, origin,
        accountchooser.rpc.rpcToken_);
  } else {
    // Otherwise, return the error response.
    accountchooser.rpc.sendInvalidStoreResponse_(request, origin);
  }
};

/**
 * Checks if accountchooser is disabled.
 * @return {boolean} {@code true} if accountchooser is disabled.
 * @private
 */
accountchooser.rpc.checkDisabled_ = function() {
  // If RPC storage is unavailble, e.g., 3rd party data is blocked by the user,
  // accountchooser is also considered disabled since there's no way for
  // the iframe to save the RPC request.
  return !accountchooser.rpcstorage.isAvailable() ||
      accountchooser.browserconfig.isDisabled();
};

/**
 * Checks if accountchooser is empty.
 * @return {boolean} {@code true} if accountchooser has no accounts.
 * @private
 */
accountchooser.rpc.checkEmpty_ = function() {
  var accounts = accountchooser.accountstorage.readAccounts();
  return !accounts.length;
};

/**
 * Checks if IDPs have accounts to bootstrap accountchooser.
 * TODO(mengcheng): Currently accountchooser silently saves all the accounts
 * returned by IDPs. We might change the strategy later and revisit the logic.
 * @param {accountchooser.rpc.QueryRequest} request The query request.
 * @param {string} origin The origin of the client.
 * @private
 */
accountchooser.rpc.checkIdpsEmpty_ = function(request, origin) {
  accountchooser.rpc.getIdpAccounts(function(accounts) {
    for (var i = 0; i < accounts.length; i++) {
      accountchooser.accountstorage.addAccount(accounts[i]);
    }
    var response = new accountchooser.rpc.Response(
        request.getId(), !accounts.length);
    accountchooser.rpc.call(window.parent, response, origin,
      accountchooser.rpc.rpcToken_);
  });
};


/**
 * Checks if the account exists in accountchooser.
 * @param {accountchooser.Account} account The account to be checked.
 * @return {boolean} {@code true} if the account exists.
 * @private
 */
accountchooser.rpc.checkAccountExist_ = function(account) {
  var accounts = accountchooser.accountstorage.readAccounts();
  return accountchooser.util.inAccountList(account, accounts) >= 0;
};

/**
 * Checks if the account should be updated. If it has displayName/photoUrl and
 * the stored one has no displayName/photoUrl, then it should be updated.
 * @param {accountchooser.Account} account The account to be checked.
 * @return {boolean} {@code true} if the account should be updated.
 * @private
 */
accountchooser.rpc.checkShouldUpdate_ = function(account) {
  var accounts = accountchooser.accountstorage.readAccounts();
  for (var i = 0, length = accounts.length; i < length; i++) {
    var other = accounts[i];
    if (accountchooser.util.checkAccountsCompatible(account, other) &&
        ((account.displayName && account.displayName != other.displayName) ||
         (account.photoUrl && account.photoUrl != other.photoUrl))) {
      return true;
    }
  }
  return false;
};

/**
 * Sends an error Response to the client.
 * @param {Object} error The error sent to the client.
 * @param {accountchooser.rpc.ClientRequest} request The request sent from the
 *     client.
 * @param {string} origin The origin of the client.
 * @private
 */
accountchooser.rpc.sendErrorResponse_ = function(error, request, origin) {
  var response = new accountchooser.rpc.Response(
      request.getId(), undefined, error);
  accountchooser.rpc.call(window.parent, response, origin,
      accountchooser.rpc.rpcToken_);
};

/**
 * Sends an error Response to the client to indicate the service is disabled.
 * @param {accountchooser.rpc.ClientRequest} request The request sent from the
 *     client.
 * @param {string} origin The origin of the client.
 * @private
 */
accountchooser.rpc.sendDisableResponse_ = function(request, origin) {
  var error = {
    code: -32000,
    message: 'Service unavailable',
    data: 'Service is unavailable.'
  };
  accountchooser.rpc.sendErrorResponse_(error, request, origin);
};

/**
 * Sends an error Response to the client to indicate the query is invalid.
 * @param {accountchooser.rpc.ClientRequest} request The request sent from the
 *     client.
 * @param {string} origin The origin of the client.
 * @private
 */
accountchooser.rpc.sendInvalidQueryResponse_ = function(request, origin) {
  var error = {
    code: -32602,
    message: 'Invalid parameter',
    data: 'The query "' + request.getId() + '" is invalid.'
  };
  accountchooser.rpc.sendErrorResponse_(error, request, origin);
};

/**
 * Sends an error Resposne to the client to indicate the store request is
 * invalid.
 * @param {accountchooser.rpc.ClientRequest} request The request sent from the
 *     client.
 * @param {string} origin The origin of the client.
 * @private
 */
accountchooser.rpc.sendInvalidStoreResponse_ = function(request, origin) {
  var error = {
    code: -32602,
    message: 'Invalid parameter',
    data: origin + ' is not allowed to store accounts silently.'
  };
  accountchooser.rpc.sendErrorResponse_(error, request, origin);
};

/**
 * Valid RpcObject types for iframe side.
 * @type {Array.<Function>}
 * @const
 * @private
 */
accountchooser.rpc.VALID_RPC_TYPES_ = [
  accountchooser.rpc.StoreRequest,
  accountchooser.rpc.SelectRequest,
  accountchooser.rpc.UpdateRequest,
  accountchooser.rpc.QueryRequest,
  accountchooser.rpc.ClientReadyNotification
];

/**
 * Handler for postMessage event.
 * @param {accountchooser.rpc.Request} request  A valid request.
 * @param {string} origin The origin of the request.
 * @private
 */
accountchooser.rpc.process_ = function(request, origin) {
  var disabled = accountchooser.rpc.checkDisabled_();
  if (request instanceof accountchooser.rpc.ClientReadyNotification) {
    accountchooser.rpc.triggerSavedRpcs_(origin);
  } else if (request instanceof accountchooser.rpc.ClientRequest) {
    if (request instanceof accountchooser.rpc.QueryRequest) {
      // Only allow checking disabled when accountchooser is disabled.
      if (disabled &&
          request.getQuery() != accountchooser.rpc.Queries.AC_DISABLED) {
        accountchooser.rpc.sendDisableResponse_(request, origin);
      } else {
        accountchooser.rpc.handleQuery_(request, origin);
      }
    } else if (request instanceof accountchooser.rpc.StoreRequest &&
        request.getClientConfig('silent') &&
        accountchooser.util.isExperimentOn('ACCOUNT_BOOTSTRAP')) {
      if (disabled) {
        accountchooser.rpc.sendDisableResponse_(request, origin);
      } else {
        accountchooser.rpc.handleSilentStore_(request, origin);
      }
    } else if (!accountchooser.rpcstorage.isAvailable()) {
      // RPC storage is not avaialbe. We have to return disable error here
      // even if the client specifies a different callback URL since there's no
      // way for the iframe to save the RPC request.
      accountchooser.rpc.sendDisableResponse_(request, origin);
    } else {
      // It must be a request.
      // We can not send disabled error back to the client since it may specify
      // a different callback URL other than current page. Let's still proceed
      // to accountchooser, where the disabled error is generated and sent to
      // the correct callback URL.
      accountchooser.rpc.saveAndAckRequest_(request, origin);
    }
  } else {
    // This should never happen since accountchooser.rpc.parseRpcObject rejects
    // all unrecognized rpc.
    throw 'Unrecognized rpc object.';
  }
};

/**
 * The RPC token for communcation between this iframe and the client.
 * @type {string}
 * @private
 */
accountchooser.rpc.rpcToken_;

/**
 * @return {string} The RPC token from the iframe URL parameter.
 * @private
 */
accountchooser.rpc.retrieveRpcToken_ = function() {
  var hash = window.location.hash;
  if (hash) {
    if (hash[0] == '#') {
      hash = hash.substring(1);
    }
  }
  if (!hash) {
    throw new Error('Cannot find RPC token.');
  }
  // Remove the RPC token from the URL to prevent from being stolen.
  window.location.hash = '';

  return hash;
};

/**
 * Initializes the iframe.
 */
accountchooser.rpc.initIFrame = function() {
  accountchooser.rpc.rpcToken_ = accountchooser.rpc.retrieveRpcToken_();
  accountchooser.rpc.registerRpcHandlerWithPolicy(
      window.parent,
      accountchooser.rpc.VALID_RPC_TYPES_,
      accountchooser.rpc.process_,
      accountchooser.rpc.rpcToken_);
  if (accountchooser.rpc.checkEmpty_()) {
    accountchooser.rpc.initIdps();
  }
};


/**
 * Domains that need to www redirect.
 * @type {Array.<string>}
 * @private
 */
accountchooser.util.WWW_REDIRECT_DOMAINS_ = [
    'accountchooser.com',
    'accountchooser.biz'
];

/**
 * Checks whether redirecting is needed for current Account Chooser page URL.
 * If a string returned, the page need to redirect to that URL. If undefined
 * returned, no redirection needed.
 * <p>HTML5 web storage treats below domains as different domains:
 * <ol>
 * <li>http://accountchooser.com</li>
 * <li>http://www.accountchooser.com</li>
 * <li>https://accountchooser.com</li>
 * <li>https://www.accountchooser.com</li>
 * </ol>
 * The last one, https://www.accountchooser.com, is selected as the right domain
 * to use. The other three domains should be redirect to the last one.
 * <p>The fix is only applied to accountchooser.com and accountchooser.biz so it
 * won't affect any other test instances.
 *
 * @param {Location} windowLocation The location object of the window.
 * @return {string|undefined} The URL that should redirect to, or undefined
 *     if not need to redirect.
 */
accountchooser.util.fixAccountChooserUrl = function(windowLocation) {
  var skipRedirect = true;
  var hostname = windowLocation.hostname;
  for (var i = 0; i < accountchooser.util.WWW_REDIRECT_DOMAINS_.length; i++) {
    if (hostname.indexOf(accountchooser.util.WWW_REDIRECT_DOMAINS_[i]) >= 0) {
      skipRedirect = false;
      break;
    }
  }
  if (skipRedirect) {
    return;
  }
  var needRedirect = false;
  if (hostname.substring(0, 4).toLowerCase() != 'www.') {
    needRedirect = true;
    hostname = 'www.' + hostname;
  }
  if (windowLocation.protocol.toLowerCase() != 'https:') {
    needRedirect = true;
  }
  if (needRedirect) {
    var oldPrefix = windowLocation.protocol + '//' + windowLocation.host;
    var suffix = windowLocation.href.substring(oldPrefix.length);
    return 'https://' + hostname + suffix;
  }
};

/**
 * Makes sure current page in right Account Chooser domain.
 */
accountchooser.util.checkAccountChooserDomain = function() {
  var acUrl = accountchooser.util.fixAccountChooserUrl(window.location);
  if (acUrl) {
    window.location.replace(acUrl);
  }
};

