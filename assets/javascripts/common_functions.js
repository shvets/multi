function CommonFunctionsLibrary() {}

CommonFunctionsLibrary.prototype.ensureFalse = function(myFunction) {
  try {
    myFunction();
  }
  catch(e) {
    alert(e);
  }
  finally {}

  return false;
};

CommonFunctionsLibrary.prototype.ensureResult = function(myFunction) {
  var result;
  try {
    result = myFunction();
  }
  catch(e) {
    alert(e);
  }
  finally {
    result = false;
  }

  return result;
};

CommonFunctionsLibrary.prototype.createClass = function(definitions) {
  var klass = function() {
    this.initialize.apply(this, arguments);
  };

  jQuery.extend(klass.prototype, definitions);

  return klass;
};

CommonFunctionsLibrary.prototype.extendClass = function(baseClass, methods) {
  var klass = function() {
    this.initialize.apply(this, arguments);
  };

  jQuery.extend(klass.prototype, baseClass.prototype);
  jQuery.extend(klass.prototype, methods);

  return klass;
};

var CommonFunctions = new CommonFunctionsLibrary();

