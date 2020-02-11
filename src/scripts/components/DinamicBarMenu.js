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
    this.removeMenuItems = this.removeMenuItems.bind(this);
    this.addSubmenuItems = this.addSubmenuItems.bind(this);
    this.isItemAdjustable = this.isItemAdjustable.bind(this);

    this.children = [];

    window.addEventListener('resize', this.onResize);

    this.init();
  }

  init() {
    this.removeLastChild();

    if (!this.isTriggerRendered()) {
      this.renderTrigger();
      this.addSubmenuItems();
    } else {
      this.removeMenuItems();
      this.addSubmenuItems();
    }
  }

  isTriggerRendered() {
    return this.element.querySelector('.link-trigger');
  }

  removeLastChild() {
    if (!this.isParentOverflowed()) {
      return;
    }

    let linkItemCollection = this.element.querySelectorAll('.link-item');
    let linkItemIndex = !this.element.lastElementChild.classList.contains('link-trigger')
      ? linkItemCollection.length - 1
      : linkItemCollection.length - 2;

    this.children.push(linkItemCollection[linkItemIndex]);
    this.element.removeChild(linkItemCollection[linkItemIndex]);
    this.removeLastChild();
  }

  removeMenuItems() {
    this.element.querySelectorAll('.sub-link-item').forEach(child => child.remove());
  }

  addSubmenuItems() {
    this.children.map(child => {
      let subLinkItem = document.createElement('li');
      let subLinkItemAnchor = document.createElement('a');

      subLinkItem.className = 'sub-link-item';
      subLinkItemAnchor.innerText = child.innerText.replace(/(\r\n|\n|\r)/gm, '');
      subLinkItem.appendChild(subLinkItemAnchor);
      this.element.querySelector('.sub-menu').appendChild(subLinkItem);
    });
  }

  renderTrigger() {
    let trigger = document.createElement('li');
    let triggerAnchor = document.createElement('a');
    let submenu = document.createElement('ul');

    trigger.className = 'link-item link-trigger';
    submenu.className = 'sub-menu hidden';
    triggerAnchor.innerText = 'more';

    trigger.appendChild(triggerAnchor);
    trigger.appendChild(submenu);
    this.element.appendChild(trigger);

    trigger.addEventListener('click', this.toggleButton);
  }

  isItemAdjustable() {
    return this.getItemsWidth() < this.element.offsetWidth;
  }

  isParentOverflowed() {
    return (
      this.element.lastElementChild.offsetWidth > this.element.offsetWidth - this.getItemsWidth()
    );
  }

  toggleButton() {
    let button = this.element.querySelector('.sub-menu');

    button.classList.contains('hidden')
      ? button.classList.remove('hidden')
      : button.classList.add('hidden');
  }

  onResize() {
    this.init();
    if (this.isItemAdjustable()) {
      let submenuLastChild = this.element.querySelector('.sub-menu').lastElementChild;

      this.children.pop();
      submenuLastChild.classList.remove('sub-link-item')
      submenuLastChild.classList.add('link-item');

      this.element.querySelector('.sub-menu').removeChild(submenuLastChild);
      this.element.insertBefore(submenuLastChild, this.element.querySelector('.link-trigger'));
    }
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
