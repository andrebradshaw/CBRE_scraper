function cleanup(elm) {
  return elm.replace(/,|\?|\#/g, '').replace(/&/g, 'and').replace(/\n|\r/g, ' _ ');
}

function splitName(str) {
  var first = group(/(.+?),\s(\S+)/.exec(str), 2);
  var last = group(/(.+?),\s(\S+)/.exec(str), 1);
  return new Array(first, last);
}

function group(el, n) {
  if (el != null) {
    return el[n].toString();
  } else {
    return '';
  }
}

function validate(elm, n, type) {
  if (elm[n] != null) {
    if (type == "text") {
      return elm[n].innerText;
    }
    if (type == "href") {
      return elm[n].href;
    }
  } else {
    return '';
  }

}

var containArr = [];
var numberOfPages = parseInt(/\d+$/.exec(document.getElementsByClassName("pagination__inner")[0].innerText)[0]);

function getDataFromHTML() {
  var leads = document.getElementsByClassName("profile-block vcard");

  for (i = 0; i < leads.length; i++) {

    var fullname = leads[i].getElementsByClassName("profile-block__name")[0].innerText;
    var firstname = splitName(fullname)[0];
    var lastname = splitName(fullname)[1];


    var title = cleanup(validate(leads[i].getElementsByClassName("profile-block__group-title"), 0, "text"));

    var city = cleanup(validate(leads[i].getElementsByClassName("profile-block__area"), 0, "text"));

    var phone = cleanup(validate(leads[i].getElementsByClassName("numbers-wrapper__numbers"), 0, "text").replace(/\+1/, '').replace(/\D+/g, ''));

    var email = cleanup(validate(leads[i].getElementsByClassName("icon-link email"), 0, "href").replace(/mailto:/, ''));


    containArr.push(new Array(firstname, lastname, title, city, phone, email))
  }
}

//now we need to build a function to loop through the pages.


function pager() {

  var pagination = document.getElementsByClassName("pagination__arrow");
  if (pagination.length == 1) {
    pagination[0].click();
  } else {
    for (p = 0; p < pagination.length; p++) {
      var pageType = /pageUp/.test(pagination[p].href);
      if (pageType === true) {
        pagination[p].click();
      }
    }
  }
}

pager()
