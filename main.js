(()=>{"use strict";var t=document.querySelector("#profile-overlay"),e=t.querySelector("#form__name"),n=t.querySelector("#form__nickname"),o=document.querySelector(".profile__name"),r=document.querySelector(".profile__nickname"),c=document.querySelector(".profile__avatar"),a=document.querySelector("#add-overlay"),i=a.querySelector("#add__image-name"),s=a.querySelector("#add__image-url"),u=document.querySelector(".cards"),l=document.querySelector(".profile__edit-button"),d=document.querySelector(".profile__add-button"),f=t.querySelector(".popup-wrapper__close"),m=a.querySelector(".popup-wrapper__close"),v=document.querySelector("#image-overlay"),_=v.querySelector(".popup__image"),p=v.querySelector(".popup__title"),h=v.querySelector(".popup-wrapper__close"),y=document.forms.editForm,S=y.querySelector(".form__submit"),L=document.forms.addForm,b=L.querySelector(".form__submit"),k=document.forms.avatarForm,q=k.querySelector(".form__submit"),E=(y.querySelector(".form__element"),L.querySelector(".form__element"),k.querySelector(".form__element")),C=document.querySelector("#avatar-overlay"),g=C.querySelector(".popup-wrapper__close");function x(t){Array.from(document.querySelectorAll(t.formListSelector)).forEach((function(e){e.addEventListener("submit",(function(t){t.preventDefault()})),function(t,e){var n=Array.from(t.querySelectorAll(e.inputListSelector)),o=t.querySelector(e.submitButtonSelector);j(n,o,e),n.forEach((function(r){r.addEventListener("input",(function(){!function(t,e,n){e.validity.valid?function(t,e,n){var o=t.querySelector(".".concat(e.id,"-error"));e.classList.remove(n.inputErrorClass),o.classList.remove(n.textErrorClass),o.textContent=""}(t,e,n):function(t,e,n,o){var r=t.querySelector(".".concat(e.id,"-error"));e.classList.add(o.inputErrorClass),r.textContent=n,r.classList.add(o.textErrorClass)}(t,e,e.validationMessage,n)}(t,r,e),j(n,o,e)}))}))}(e,t)}))}function j(t,e,n){!function(t){return t.some((function(t){return!t.validity.valid}))}(t)?e.classList.remove(n.disabledButtonClass):e.classList.add(n.disabledButtonClass)}function A(t,e){t?(e.removeAttribute("disabled"),e.classList.remove(x.disabledButtonClass)):(e.setAttribute("disabled",!0),e.classList.add(x.disabledButtonClass))}function P(t){t.classList.add("overlay"),t.classList.remove("overlay_hidden"),editForm.addEventListener("input",(function(){A(e.value.length>=2&&n.value.length>=2,S)})),addForm.addEventListener("input",(function(){A(i.value.length>=2&&s.value.includes("https://"),b)})),document.addEventListener("keydown",B)}function T(t){t.classList.add("overlay_hidden")}function w(t,e){t?e.textContent=e.textContent+"...":e.textContent}function z(t,e,n){t.composedPath().includes(n)||T(e)}function B(t){var e=document.querySelector(".overlay");"Escape"===t.key&&T(e),document.removeEventListener("keydown",B)}var D=function(){return fetch("https://nomoreparties.co/v1/cohort-55/users/me",{headers:{authorization:"4a077796-6e98-44e5-9c13-60ffdba9f31a"}}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))})).catch((function(t){console.log("Ошибка: ".concat(t.status))}))};function F(t,e,n){var o=document.querySelector(".card-template").content.querySelector(".card").cloneNode(!0),r=o.querySelector(".card__mask"),c=o.querySelector(".card__like-count");return r.setAttribute("src","".concat(t)),r.setAttribute("alt","".concat(e)),o.querySelector(".card__title").textContent=e,c.textContent=n.length,o.addEventListener("click",(function(t){var e,n;t.target.classList.contains("card__mask")&&(e=t.target,n=o.querySelector(".card__title"),e.addEventListener("click",(function(){_.setAttribute("src","".concat(e.getAttribute("src"))),_.setAttribute("alt","".concat(e.getAttribute("alt"))),p.textContent=n.textContent,P(v)})))})),o}fetch("https://nomoreparties.co/v1/cohort-55/cards",{headers:{authorization:"4a077796-6e98-44e5-9c13-60ffdba9f31a"}}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))})).catch((function(t){console.log("Ошибка: ".concat(t.status))})).then((function(t){console.log(t),t.forEach((function(t){var e=F(t.link,t.name,t.likes),n=e.querySelector(".card__trash");"5d05e97582a44e0e5de2165a"!==t.owner._id&&n.remove(),e.addEventListener("click",(function(e){var n;e.target.classList.contains("card__trash")&&"5d05e97582a44e0e5de2165a"===t.owner._id&&(e.currentTarget.remove(),n=t._id,fetch("https://nomoreparties.co/v1/cohort-55/cards/".concat(n),{method:"DELETE",headers:{authorization:"4a077796-6e98-44e5-9c13-60ffdba9f31a","Content-type":"application/json"}}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))})).catch((function(t){console.log("Ошибка: ".concat(t.status))})))}));var o=e.querySelector(".card__like-count");e.addEventListener("click",(function(e){var n;e.target.classList.contains("card__like")&&(e.target.classList.contains("card__like_active")?(n=t._id,fetch("https://nomoreparties.co/v1/cohort-55/cards/likes/".concat(n),{method:"DELETE",headers:{authorization:"4a077796-6e98-44e5-9c13-60ffdba9f31a","Content-Type":"application/json"}}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))})).catch((function(t){console.log("Ошибка: ".concat(t.status))})),e.target.classList.remove("card__like_active"),o.textContent--):(e.target.classList.add("card__like_active"),function(t){fetch("https://nomoreparties.co/v1/cohort-55/cards/likes/".concat(t),{method:"PUT",headers:{authorization:"4a077796-6e98-44e5-9c13-60ffdba9f31a","Content-Type":"application/json"}}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))})).catch((function(t){console.log("Ошибка: ".concat(t.status))}))}(t._id),o.textContent++))})),u.append(e)}))})),D().then((function(t){c.setAttribute("src","".concat(t.avatar)),o.textContent=t.name,r.textContent=t.about,console.log(t.avatar)})),l.addEventListener("click",(function(){P(t),e.value=o.textContent,n.value=r.textContent,A(!0,S)})),f.addEventListener("click",(function(){T(t)})),d.addEventListener("click",(function(){P(a),A(!1,b)})),m.addEventListener("click",(function(){T(a)})),h.addEventListener("click",(function(){T(v)})),c.addEventListener("click",(function(){P(C),A(!0,q)})),g.addEventListener("click",(function(){T(C)})),t.addEventListener("click",(function(e){z(e,t,y)})),a.addEventListener("click",(function(t){z(t,a,L)})),C.addEventListener("click",(function(t){z(t,C,k)})),v.addEventListener("click",(function(t){z(t,v,_)})),y.addEventListener("submit",(function(c){var a,i;c.preventDefault(),o.textContent=e.value,r.textContent=n.value,w(!0,S),console.log(w(!0,S)),(a=o,i=r,fetch("https://nomoreparties.co/v1/cohort-55/users/me",{method:"PATCH",headers:{authorization:"4a077796-6e98-44e5-9c13-60ffdba9f31a","Content-Type":"application/json"},body:JSON.stringify({name:"".concat(a.textContent),about:"".concat(i.textContent)})}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))})).then(D).catch((function(t){console.log("Ошибка: ".concat(t.status))}))).finally((function(){T(t),w(!1,S)}))})),L.addEventListener("submit",(function(t){var e,n;t.preventDefault(),w(!0,b),function(t,e){var n=document.querySelector(".card__like-count");n.textContent="0";var o=F(t,e,n);u.prepend(o)}(s.value,i.value),(e=i.value,n=s.value,fetch("https://nomoreparties.co/v1/cohort-55/cards",{method:"POST",headers:{authorization:"4a077796-6e98-44e5-9c13-60ffdba9f31a","Content-Type":"application/json"},body:JSON.stringify({name:"".concat(e),link:"".concat(n)})}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))})).catch((function(t){console.log("Ошибка: ".concat(t.status))}))).finally((function(){w(!1,b),T(a)})),t.target.reset()})),k.addEventListener("submit",(function(t){var e;t.preventDefault(),w(!0,q),c.setAttribute("src","".concat(E.value)),console.log(c.getAttribute("src")),(e=c.getAttribute("src"),fetch("https://nomoreparties.co/v1/cohort-55/users/me/avatar",{method:"PATCH",headers:{authorization:"4a077796-6e98-44e5-9c13-60ffdba9f31a","Content-Type":"application/json"},body:JSON.stringify({avatar:"".concat(e)})}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))})).then(D).catch((function(t){console.log("Ошибка: ".concat(t.status))}))).finally((function(){w(!1,b),T(C)})),t.target.reset()})),x({inputListSelector:".form__element",submitButtonSelector:".form__submit",formListSelector:".form",inputErrorClass:"form__input_type_error",textErrorClass:"form__input-error_active",disabledButtonClass:"form__submit_disabled"})})();