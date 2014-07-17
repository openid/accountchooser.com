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
 * Checks whether two accounts loosely match each other, which means they have
 * the same email address and their provider IDs don't conflict.
 * @param {accountchooser.Account} account1 The first account.
 * @param {accountchooser.Account} account2 The second account.
 * @return {boolean} {@code true} if they loosely match.
 */
accountchooser.util.checkAccountsLooselyMatch = function(account1, account2) {
  return account1.email == account2.email &&
      (!account1.providerId ||
       !account2.providerId ||
       account1.providerId == account2.providerId);
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

