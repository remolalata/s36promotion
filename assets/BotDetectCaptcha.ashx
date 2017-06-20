if (typeof(BotDetect) == "undefined") { // start single inclusion guard

  BotDetect = function(captchaId, inputId, autoFocusInput, autoClearInput, autoLowercaseInput, autoReloadExpiredImage, autoReloadPeriod, autoReloadTimeout) {
    this.Id = captchaId;

    // Captcha image properties
    var imageId = captchaId + "_CaptchaImage";
    this.Image = document.getElementById(imageId);
    this.ImagePlaceholder = this.Image.parentNode;

    // show Captcha Reload icon
    var reloadLinkId = captchaId + "_ReloadLink";
    var reloadLink = document.getElementById(reloadLinkId);
    reloadLink.style.cssText = 'display: inline-block !important';
    
    // init reloading elements
    this.NewImage = null;
    this.ProgressIndicator = null;
    this.ReloadTimer = null;
    this.ReloadTimerTicks = 0;

    // Captcha image auto-reloading
    this.AutoReloadPeriod = (autoReloadPeriod - 10) * 1000;
    this.AutoReloadTimeout = autoReloadTimeout * 1000;
    this.AutoReloadExpiredImage = autoReloadExpiredImage;
    this.AutoReloadPeriodSum = 0;
    this.AutoReloading = false;
    if (autoReloadExpiredImage) {
      var self = this;
      this.AutoReloadTimer = setTimeout(
        function() {
          clearTimeout(self.AutoReloadTimer);
          if (self.AutoReloadPeriodSum >= self.AutoReloadTimeout) return;
          self.AutoReloading = true;
          self.ReloadImage();
          self.AutoReloading = false;
          self.AutoReloadPeriodSum += self.AutoReloadPeriod;
        },
        self.AutoReloadPeriod
      );
    }

    // Captcha sound properties
    this.SoundUrl = this.Image.src.replace('get=image', 'get=sound');
    var soundPlaceholderId = captchaId + "_AudioPlaceholder";
    this.SoundPlaceholder = document.getElementById(soundPlaceholderId);

    // Captcha input textbox properties
    this.ValidationUrl = this.Image.src.replace('get=image', 'get=validationResult');

    // Captcha help link properties
    this.FollowHelpLink = true;
    
    if (!inputId) return;
    this.InputId = inputId;
    var input = document.getElementById(inputId);

    if (!input) return;
    this.InputElement = input;
    this.AutoFocusInput = autoFocusInput;
    this.AutoClearInput = autoClearInput;
    this.ValidationResult = false;

    if (!autoLowercaseInput) return;
    BotDetect.RegisterHandler(input, 'keyup', BotDetect.LowercaseInput, false);
  }

  BotDetect.Init = function(captchaId, inputId, autoFocusInput, autoClearInput, autoLowercaseInput, autoReloadExpiredImage, autoReloadPeriod, autoReloadTimeout) {
    var inputIdString = null;
    if (inputId) {
      inputIdString = "'" + inputId + "'";
    }

    var actualInitialization = new Function("if (document.getElementById('" + captchaId + "_CaptchaImage')) { window['" + captchaId + "'] = new BotDetect('" + captchaId + "'," + inputIdString + "," + autoFocusInput + "," + autoClearInput + "," + autoLowercaseInput + "," + autoReloadExpiredImage + "," + autoReloadPeriod + "," + autoReloadTimeout + "); window['" + captchaId + "'].PostInit(); }");

    if ( (typeof(Sys) != "undefined") && (typeof(Sys.Application) != "undefined") ) {
      // ASP.NET Ajax initialization
      Sys.Application.add_load(actualInitialization);
    } else {
      // regular initialization
      BotDetect.RegisterHandler(window, 'domready', actualInitialization, false);
    }
  }

  BotDetect.ReloadTimerMaxTicks = 100;
  BotDetect.ReloadTimerDelay = 250;
  BotDetect.MillisecondsInAMinute = 60000;
  BotDetect.AjaxTimeout = 10000;
  BotDetect.InputsToLowercase = [];

  BotDetect.UpdateTimestamp = function(url) {
    var i = url.indexOf('&d=');
    if (-1 !== i) {
      url = url.substring(0, i);
    }
    return url + '&d=' + BotDetect.GetTimestamp();
  }

  BotDetect.GetTimestamp = function() {
    var d = new Date();
    var t = d.getTime() + (d.getTimezoneOffset() * BotDetect.MillisecondsInAMinute);
    return t;
  };

  BotDetect.DetectSsl = function(url) {
    var i = url.indexOf('&e=');
    if(-1 !== i) {
      var len = url.length;
      url = url.substring(0, i) + url.substring(i+4, len);
    }
    if (document.location.protocol === "https:") {
      url = url + '&e=1';
    }
    return url;
  }

  BotDetect.GetMimeType = function() {
    var mimeType = "audio/x-wav";
    return mimeType;
  };

  BotDetect.DetectIncompetentBrowsers = function() {
    return BotDetect.DetectFirefox3() || BotDetect.DetectSafariSsl();
  };

  BotDetect.DetectFirefox3 = function() {
    var detected = false;
    if (navigator && navigator.userAgent) {
      var matches = navigator.userAgent.match(/(Firefox)\/(3\.6\.[^;\+,\/\s]+)/);
      if (matches) {
        detected = true;
      }
    }
    return detected;
  };

  BotDetect.DetectSafariSsl = function() {
    var detected = false;
    if (navigator && navigator.userAgent) {
      var matches = navigator.userAgent.match(/Safari/);
      if (matches) {
        matches = navigator.userAgent.match(/Chrome/);
        if (!matches && document.location.protocol === "https:") {
          detected = true;
        }
      }
    }
    return detected;
  };

  // CAPTCHA sound playing
  BotDetect.prototype.PlaySound = function() {
    if (document.getElementById) {
      var soundUrl = this.SoundUrl;
      soundUrl = BotDetect.UpdateTimestamp(soundUrl);
      soundUrl = BotDetect.DetectSsl(soundUrl);

      this.SoundPlaceholder.innerHTML = '';
      this.PrePlaySound();

      document.body.style.cursor = 'wait';
      var html5SoundPlayed = false;
      var browserCompatibilityCheck = document.createElement('audio');
      if (!!(browserCompatibilityCheck.canPlayType) &&
          !!(browserCompatibilityCheck.canPlayType("audio/wav")) &&
          !BotDetect.DetectIncompetentBrowsers()) {
        sound = new Audio(soundUrl);
        sound.id = 'LBD_CaptchaSoundAudio';
        sound.autoplay = true;
        sound.controls = false;
        sound.autobuffer = false;
        sound.loop = false;

        this.SoundPlaceholder.appendChild(sound);
        html5SoundPlayed = true;
      }

      if (!html5SoundPlayed) {
        var objectSrc = "<object id='LBD_CaptchaSoundObject' classid='clsid:22D6F312-B0F6-11D0-94AB-0080C74C7E95' height='0' width='0' style='width:0; height:0;'><param name='AutoStart' value='1' /><param name='Volume' value='0' /><param name='PlayCount' value='1' /><param name='FileName' value='" + soundUrl + "' /><embed id='LBD_CaptchaSoundEmbed' src='" + soundUrl + "' autoplay='true' hidden='true' volume='100' type='" + BotDetect.GetMimeType() + "' style='display:inline;' /></object>";

        this.SoundPlaceholder.innerHTML = objectSrc;
      }

      document.body.style.cursor = 'default';
    }
  };


  // CAPTCHA image reloading
  BotDetect.prototype.ReloadImage = function() {
    if (this.Image && !this.ReloadInProgress) {
      this.ReloadInProgress = true;
      this.ProgressIndicator = document.createElement('span');
      this.ProgressIndicator.appendChild(document.createTextNode('.'));
      this.PreReloadImage();

      var imageUrl = BotDetect.UpdateTimestamp(this.Image.src);
      this.InitNewImage(imageUrl);

      this.ImagePlaceholder.innerHTML = '';
      this.ImagePlaceholder.appendChild(this.ProgressIndicator);

      this.ShowProgress();
    }
  };

  BotDetect.prototype.InitNewImage = function(imageUrl) {
    this.NewImage = document.createElement('img');
    var self = this;
    this.NewImage.onload = function() {
      if(self.NewImage && self.ImagePlaceholder && self.ProgressIndicator) {
        self.ImagePlaceholder.innerHTML = '';
        self.ImagePlaceholder.appendChild(self.NewImage);
        self.Image = self.NewImage;
        self.ProgressIndicator = null;
        self.PostReloadImage();
      }
    };
    this.NewImage.id = this.Image.id;
    this.NewImage.alt = this.Image.alt;
    this.NewImage.src = imageUrl;
  }

  BotDetect.prototype.ShowProgress = function() {
    if (this.ProgressIndicator && (this.ReloadTimerTicks < BotDetect.ReloadTimerMaxTicks)) {
      this.ReloadTimerTicks = this.ReloadTimerTicks + 1;
      this.UpdateProgressIndicator();
      var self = this;
      this.ReloadTimer = setTimeout(function() { self.ShowProgress(); }, BotDetect.ReloadTimerDelay);
    } else {
      clearTimeout(this.ReloadTimer);
      this.ReloadTimerTicks = 0;
      this.ReloadInProgress = false;
    }
  };

  BotDetect.prototype.UpdateProgressIndicator = function() {
    if (0 == this.ProgressIndicator.childNodes.length) {
      this.ProgressIndicator.appendChild(document.createTextNode('.'));
      return;
    }
    if (0 === this.ReloadTimerTicks % 5) {
      this.ProgressIndicator.firstChild.nodeValue = '.';
    } else {
      this.ProgressIndicator.firstChild.nodeValue = this.ProgressIndicator.firstChild.nodeValue + '.';
    }
  }

  // CAPTCHA Ajax validation
  BotDetect.prototype.Validate = function() {
    if(BotDetect.AjaxError) { return true; } // temporary to allow full form post
    if (!this.InputElement || !this.InputElement.value || this.InputElement.value.length < 0) {
      this.AjaxValidationFailed();
      return false;
    }
    if (!this.ValidationResult) {
      this.PreAjaxValidate();
      this.StartValidation();
    }
    return this.ValidationResult;
  }

  BotDetect.prototype.StartValidation = function() {
    var url = this.ValidationUrl + '&i=' + this.InputElement.value;
    var self = this;
    var callback = function(y) {
      clearTimeout(self.AjaxTimer);
      if (200 != y.status) { self.AjaxValidationError(); return; }
      var validationResult = false;
      var parsed = BotDetect.ParseJson(y.responseText);
      if (parsed && parsed.result) {
        validationResult = parsed.result;
      }
      self.EndValidation(validationResult);
    }
    this.AjaxTimer = setTimeout(self.AjaxValidationError, BotDetect.AjaxTimeout);
    BotDetect.Get(url, callback);
  }

  BotDetect.prototype.EndValidation = function(result) {
    if (result) {
      this.ValidationResult = true;
      this.AjaxValidationPassed();
    } else {
      this.AjaxValidationFailed();
    }
  }

  BotDetect.ParseJson = function(jsonString) {
    var resultObj = null;
    if ("undefined" != typeof(JSON) && "function" == typeof(JSON.parse)) {
      resultObj = JSON.parse(jsonString);
    }
    if (!resultObj) {
      resultObj = eval('(' + jsonString + ')');
    }
    return resultObj;
  }

  // custom CAPTCHA events

  BotDetect.prototype.PostInit = function() {
  };

  BotDetect.prototype.PreReloadImage = function() {
    this.ClearInput();
    this.FocusInput();
  };
  
  BotDetect.prototype.PostReloadImage = function() {
    this.SoundUrl = this.Image.src.replace('get=image', 'get=sound');
    this.ValidationUrl = this.Image.src.replace('get=image', 'get=validationResult');
    if (this.AutoReloadExpiredImage) {
      var self = this;
      this.AutoReloadTimer = setTimeout(
        function() {
          clearTimeout(self.AutoReloadTimer);
          if (self.AutoReloadPeriodSum >= self.AutoReloadTimeout) return;
          self.AutoReloading = true;
          self.ReloadImage();
          self.AutoReloading = false;
          self.AutoReloadPeriodSum += self.AutoReloadPeriod;
        },
        self.AutoReloadPeriod
      );
    }
  };
  
  BotDetect.prototype.PrePlaySound = function() {
    this.FocusInput();
  };
  
  BotDetect.prototype.OnHelpLinkClick = function() {
  };

  BotDetect.prototype.PreAjaxValidate = function() {
  };

  BotDetect.prototype.AjaxValidationFailed = function() {
    this.ReloadImage();
  };

  BotDetect.prototype.AjaxValidationPassed = function() {
  };

  BotDetect.prototype.AjaxValidationError = function() {
    BotDetect.Xhr().abort();
    BotDetect.AjaxError = true;
  };

  BotDetect.RegisterCustomHandler = function(eventName, userHandler) {
    var oldHandler = BotDetect.prototype[eventName];
    BotDetect.prototype[eventName] = function() {
      oldHandler.call(this);
      userHandler.call(this);
    }
  }

  // input processing
  BotDetect.prototype.FocusInput = function() {
    if (!this.AutoFocusInput || !this.InputElement) return;
    if (this.AutoReloading) return;
    this.InputElement.focus();
  }

  BotDetect.prototype.ClearInput = function() {
    if (!this.AutoClearInput || !this.InputElement) return;
    this.InputElement.value = '';
  }

  BotDetect.LowercaseInput = function(event) {
    event = event || window.event;
    var keyCode = event.keyCode;

    if (keyCode < 37 || keyCode > 40) {
      this.value = this.value.toLowerCase();
    }
  }

  // standard events & handlers
  BotDetect.RegisterHandler = function(target, eventType, functionRef, capture) {
    // special case
    if (eventType == "domready") {
      BotDetect.RegisterDomReadyHandler(functionRef);
    return;
    }
    // normal event registration
    if (typeof target.addEventListener != "undefined") {
      target.addEventListener(eventType, functionRef, capture);
    } else if (typeof target.attachEvent != "undefined") {
      var functionString = eventType + functionRef;
      target["e" + functionString] = functionRef;
      target[functionString] = function(event) {
        if (typeof event == "undefined") {
          event = window.event;
        }
        target["e" + functionString](event);
      };
      target.attachEvent("on" + eventType, target[functionString]);
    } else {
      eventType = "on" + eventType;
      if (typeof target[eventType] == "function") {
        var oldListener = target[eventType];
        target[eventType] = function() {
          oldListener();
          return functionRef();
        };
      } else {
        target[eventType] = functionRef;
      }
    }
  }

  // earlier than window.load, if possible
  BotDetect.RegisterDomReadyHandler = function(functionRef) {
    if (document.addEventListener) {
      document.addEventListener("DOMContentLoaded", 
        function(){
          document.removeEventListener("DOMContentLoaded", arguments.callee, false);
          functionRef();
        }, 
        false
      );
      return;
    }
    else if (document.attachEvent) {
      var called = false;
      document.attachEvent("onreadystatechange", 
        function(){
          if (document.readyState === "complete") {
            document.detachEvent("onreadystatechange", arguments.callee);
            functionRef();
            called = true;
          }
        }
      );
      if (document.documentElement.doScroll && window == window.top) {
        (function() {
          if (called) return;
          try {
            document.documentElement.doScroll("left");
          } catch (error) {
            setTimeout(arguments.callee, 1);
            return;
          }
          functionRef();
          called = true;
        })();
      }
      return;
    } else {
      BotDetect.RegisterHandler(window, 'load', functionRef, false);
    }
  }


  // Ajax helper
  BotDetect.Xhr = function() {
    var x = null;
    try { x = new XMLHttpRequest(); return x; } catch (e) {}
    try { x = new ActiveXObject('MSXML2.XMLHTTP.5.0'); return x; } catch (e) {}
    try { x = new ActiveXObject('MSXML2.XMLHTTP.4.0'); return x; } catch (e) {}
    try { x = new ActiveXObject('MSXML2.XMLHTTP.3.0'); return x; } catch (e) {}
    try { x = new ActiveXObject('MSXML2.XMLHTTP'); return x; } catch (e) {}
    try { x = new ActiveXObject('Microsoft.XMLHTTP'); return x; } catch (e) {}
    return x;
  }

  BotDetect.Get = function(url, callback) {
    BotDetect.AjaxError = false;
    var x = BotDetect.Xhr();
    if (x && 0 == x.readyState) {
      x.onreadystatechange = function() {
        if(4 == x.readyState) {
          callback(x);
        }
      }
      x.open('GET', url, true);
      x.send();
    }
  }

} // end single inclusion guard

// required for ASP.NET Ajax compatibility
if ( (typeof(Sys) != "undefined") && (typeof(Sys.Application) != "undefined") ) {
  Sys.Application.notifyScriptLoaded();
}
