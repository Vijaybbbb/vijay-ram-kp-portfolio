document.getElementById('year').textContent = new Date().getFullYear();

const caseTabs = [...document.querySelectorAll('.case-tab')];

function selectCase(nextTab, shouldFocus = false) {
  caseTabs.forEach((tab) => {
    const active = tab === nextTab;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
    document.getElementById(tab.getAttribute('aria-controls')).hidden = !active;
  });
  if (shouldFocus) nextTab.focus();
}

caseTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectCase(tab));
  tab.addEventListener('keydown', (event) => {
    let nextIndex;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % caseTabs.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + caseTabs.length) % caseTabs.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = caseTabs.length - 1;
    else return;
    event.preventDefault();
    selectCase(caseTabs[nextIndex], true);
  });
});

const chatDialog = document.getElementById('chat-dialog');
document.getElementById('open-chat-preview').addEventListener('click', () => chatDialog.showModal());
document.getElementById('close-chat-preview').addEventListener('click', () => chatDialog.close());
chatDialog.addEventListener('click', (event) => {
  if (event.target === chatDialog) chatDialog.close();
});
