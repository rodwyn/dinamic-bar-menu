class DinamicBarMenu {
  constructor(element) {
    this.element = element;
    this.toggleButton = this.toggleButton.bind(this);
    this.onResize = this.onResize.bind(this);
    this.getItemsWidth = this.getItemsWidth.bind(this);
    this.init = this.init.bind(this);
    this.isParentOverflowed = this.isParentOverflowed.bind(this);
    this.removeLastChild = this.removeLastChild.bind(this);
    this.renderTrigger = this.renderTrigger.bind(this);
    this.isTriggerRendered = this.isTriggerRendered.bind(this);
    this.removeMenuChildren = this.removeMenuChildren.bind(this);

    this.children = [];

    window.addEventListener('resize', this.onResize);

    this.init();
  }

  init() {
    this.removeLastChild();

    if (!this.isTriggerRendered()) {
      this.renderTrigger();
    }
  }

  isTriggerRendered() {
    return this.element.querySelector('.link-trigger');
  }

  removeLastChild() {
    if (!this.isParentOverflowed()) {
      return;
    }

    this.children.push(this.element.lastElementChild);
    this.element.removeChild(this.element.lastElementChild);
    this.removeLastChild();
  }

  removeMenuChildren() {
    this.element.querySelectorAll('.sub-link-item').forEach(child => child.remove());
  }

  renderTrigger() {
    let trigger = document.createElement('li');
    let triggerAnchor = document.createElement('a');
    let submenu = document.createElement('ul');

    trigger.className = 'link-trigger';
    submenu.className = 'sub-menu hidden';
    triggerAnchor.innerText = 'more';

    this.removeMenuChildren();

    this.children.map(child => {
      let subLinkItem = document.createElement('li');
      let subLinkItemAnchor = document.createElement('a');

      subLinkItem.className = 'sub-link-item';
      subLinkItemAnchor.innerText = child.innerText.replace(/(\r\n|\n|\r)/gm, '');
      subLinkItem.appendChild(subLinkItemAnchor);
      submenu.appendChild(subLinkItem);
    });

    trigger.appendChild(triggerAnchor);
    trigger.appendChild(submenu);
    this.element.appendChild(trigger);

    trigger.addEventListener('click', this.toggleButton);
  }

  isButtonAdjustable() {

  }

  isParentOverflowed() {
    return this.element.lastElementChild.offsetWidth > (this.element.offsetWidth - this.getItemsWidth());
  }

  toggleButton() {
    let button = this.element.querySelector('.sub-menu');

    button.classList.contains('hidden') ? button.classList.remove('hidden') : button.classList.add('hidden');
  }

  onResize() {
    this.init();
  }

  getItemsWidth() {
    return Array.from(this.element.querySelectorAll('.link-item'))
    .map(item => {
      let itemStyles = item.currentStyle || window.getComputedStyle(item);

      return parseFloat(item.offsetWidth) + parseFloat(itemStyles.marginRight);
    })
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  }
}

export default DinamicBarMenu;
