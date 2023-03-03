// vos scripts
/**
 * @file Scripts pour le devoir JavaScript du circuit touristique
 * @copyright Benoit Dubuc 2022
 */

// Dictionnaire de pages utilisé pour l'alternative linguistique
var pagesDictionary = {
    "suggerer-lieu": {
      fr: "../fr/suggerer-lieu.html",
      en: "../en/suggest-location.html",
    },
    presentation: {
      fr: "../fr/presentation.html",
      en: "../en/presentation.html",
    },
    "page-principale": {
      fr: "../fr/index.html",
      en: "../en/index.html",
    },
  };
  
  // Dictionnaire de traduction
  var translations = {
    fr: {
      montre_detail: "Montrer les détails",
      cache_detail: "Cacher les détails"
    },
    en: {
      montre_detail: "Show détails",
      cache_detail: "Hide détails"
    }
  }
  
  // Pour le traducteur
  var _L;
  
  // Langues supportées et langue par défaut
  var supportedLanguages = ['fr','en'], defaultLanguage = 'fr';
  
  /** Pour décorer les étiquettes des champs de formulaires obligatoires */
  function decorateLabels() {
    var elements = document.getElementsByTagName("label");
    var i, el, id, target;
    for (i = 0; i < elements.length; i++) {
      el = elements.item(i);
      id = el.htmlFor;
      target = document.getElementById(id);
      if (target && target.required) {
        el.classList.add("required");
      }
    }
  }
  
  /** Pour mettre l'URL de l'alternative linguistique */ 
  function setAltLanguageLink() {
    var element = document.getElementById("alt-linguistique");
    var target = element.dataset.locationId;
    var language = document.querySelector("html").lang;
    var altLanguage = language === "fr" ? "en" : "fr";
    element.href = pagesDictionary[target][altLanguage];
    return 1;
  }
  
  /** Initialiser le gestionnaire d'événement pour l'ouverture/fermeture de la description */ 
  function initEvents() {
    var language = document.querySelector("html").lang;
    if (!supportedLanguages.includes(language)) language = defaultLanguage;
    _L = translations[language];
  
    var elements = document.getElementsByClassName("toggler");
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      element.addEventListener("click", descriptionOpener);
    }
  }
  
  /** Fermer toutes les descriptions */
  function descriptionCloseAll() {
    var elements = document.getElementsByClassName("toggler");
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      var id = element.hash.substring(1);
      var target = document.getElementById(id);
      if (element.classList.contains("opened")) {
        element.innerHTML = _L["montre_detail"];
        element.classList.remove("opened");
        target.classList.add("cache");
      }
    }
  }
  
  /** Ouvrir une description */
  function descriptionOpener(event) {
    var element = event.target;
    var id = element.hash.substring(1);
    var target = document.getElementById(id);
  
  
    if (element.classList.contains("opened")) {
      element.innerHTML = _L["montre_detail"];
      element.classList.remove("opened");
      target.classList.add("cache");
    } else {
      descriptionCloseAll();
      element.innerHTML = _L["cache_detail"];
      element.classList.add("opened");
      target.classList.remove("cache");
    }
  }
  
  /**
   * Retourner un nombre aléatoire entre bMin et bMax inclusivement
   * @param {number} bMin - Borne minimale
   * @param {number} bMax - Borne maximale
   * @returns {number}
   */
  function aleaEntreBornes(bMin, bMax) {
    return bMin + Math.floor((bMax - bMin + 1) * Math.random());
  }
  
  /** Activer le carrousel Cycle2 */
  function putJCycleCarrousel() {
    var nItems = $('#carrousel > div.item').length;
    var startHere = aleaEntreBornes(0, nItems-1);
    $('#carrousel').cycle({
      startingSlide: startHere,
      slides: "> div.item",
      fx: "fade",
      speed: 500,
      timeout: 0,
      next: '#nav > .next',
      prev: '#nav > .prev'
    });
  }
  