const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');
// my try out got it to work!
const articles = document.querySelectorAll('.destination-info');
const articlesH2 = document.querySelectorAll('.destination-info > h2');
const pictures = document.querySelectorAll('picture');

let tabFocus = 0;

tabList.addEventListener('keydown', changeTabFocus);
// got this 1 to work my example
// tabs.forEach((tab, index) => {
//   tab.addEventListener('click', () => {
//     for (const article of articlesH2) {
//       if (article.innerText.toUpperCase() === tab.innerText) {
//         articles[index].removeAttribute('hidden');
//         tabs[index].setAttribute('aria-selected', true);
//         pictures[index].removeAttribute('hidden');
//       } else {
//         [...articles].map((arti, i) => {
//           if (i !== index) {
//             arti.setAttribute('hidden', true);
//           }
//         });
//         [...tabs].map((tab, i) => {
//           if (i !== index) {
//             tab.setAttribute('aria-selected', false);
//           }
//         });
//         [...pictures].map((img, i) => {
//           if (i !== index) {
//             img.setAttribute('hidden', true)
//           }
//         })
//       }
//     }
//   })
// })

// kevin's example is better than my example
tabs.forEach((tab) => {
  tab.addEventListener('click', changeTabPanel)
});


function changeTabFocus(e) {
  const left = 37;
  const right = 39;
  // change the tabindex of current one to -1
  if (e.keyCode === left || e.keyCode === right) {
    tabs[tabFocus].setAttribute('tabindex', -1);

    if (e.keyCode === right) {
      tabFocus++
      if (tabFocus >= tabs.length) {
        tabFocus = 0;
      }

    } else if (e.keyCode === left) {
      tabFocus--;
      if (tabFocus < 0) {
        tabFocus = tabs.length -1;
      }
    }
  }

  tabs[tabFocus].setAttribute('tabindex', 0);
  tabs[tabFocus].focus();
}


function changeTabPanel(e) {
  const targetTab = e.target;
  const targetPanel = targetTab.getAttribute('aria-controls');
  const targetImage = targetTab.getAttribute('data-image');

  const tabContainer = targetTab.parentNode;
  const mainContainer = tabContainer.parentNode;

  tabContainer
    .querySelector('[aria-selected="true"]')
    .setAttribute('aria-selected', false);
  
  targetTab.setAttribute('aria-selected', true);

  hideContent(mainContainer, '[role="tabpanel"]');
  showContent(mainContainer, [`#${targetPanel}`]);

  hideContent(mainContainer, 'picture');
  showContent(mainContainer, [`#${targetImage}`]);

};


function hideContent(parent, content) {
  parent
    .querySelectorAll(content)
    .forEach(item => item.setAttribute('hidden', true));
}

function showContent(parent, content) {
  parent.querySelector(content).removeAttribute('hidden'); 
}