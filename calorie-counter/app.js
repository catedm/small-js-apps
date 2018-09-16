// Storage Controller
const StorageCtrl = (function(){

  // public methods
  return {
    storeItem: function(item) {
      let items;
      // check if any items in local storage
      if(localStorage.getItem('items') === null) {
        items = [];
        // push new item
        items.push(item);
        // Set ls
        localStorage.setItem('items', JSON.stringify(items));
      } else {
        // get what is already in local storage
        items = JSON.parse(localStorage.getItem('items'));
        // push the new item
        items.push(item);
        // reset local storage
        localStorage.setItem('items', JSON.stringify(items));
      }
    },
    getItemsFromStorage: function() {
      let items;
      if(localStorage.getItem('items') === null) {
        items = [];
      } else {
        items = JSON.parse(localStorage.getItem('items'));
      }

      return items;
    },
    updateItemStorage: function(updatedItem) {
      let items = JSON.parse(localStorage.getItem('items'));

      items.forEach((item, index) => {
        if (updatedItem.id === item.id) {
          items.splice(index, 1, updatedItem);
        }
      });

      localStorage.setItem('items', JSON.stringify(items));
    },
    deleteItemFromStorage: function(id) {
      let items = JSON.parse(localStorage.getItem('items'));

      items.forEach((item, index) => {
        if (id === item.id) {
          items.splice(index, 1);
        }
      });

      localStorage.setItem('items', JSON.stringify(items));
    },
    clearItemsFromStorage: function() {
      localStorage.removeItem('items');
    }
  }
}());

// Item Controller
const ItemCtrl = (function() {
  // Item constructor
  const Item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

  // Create data structure / state
  const data = {
    items: StorageCtrl.getItemsFromStorage(),
    currentItem: null,
    totalCalories: 0
  }

  // Public methods
  return {
    logData: function() {
      return data;
    },
    getItems: function() {
      return data.items;
    },
    addItem(name, calories) {
      let ID;

      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      const newItem = new Item(ID, name, calories);
      data.items.push(newItem);

      return newItem;
    },
    deleteItem: function(id) {
      data.items = data.items.filter(item => item.id !== id);
    },
    clearAllItems: function() {
      data.items = [];
    },
    getItemById: function(id) {
      let found = null;
      // loop thru the items
      data.items.forEach(item => {
        if (item.id === id) {
          found = item;
        }
      });

      return found;
    },
    updateItem: function(name, calories) {
      // Calories to number
      calories = parseInt(calories);

      let found = null;

      data.items.forEach(item => {
        if (item.id === data.currentItem.id) {
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });

      return found;
    },
    setCurrentItem: function(item) {
      data.currentItem = item;
    },
    getCurrentItem: function() {
      return data.currentItem;
    },
    getTotalCalories: function() {
      let total = 0;

      data.items.forEach(item => {
        total += item.calories;
      });

      data.totalCalories = total;

      return data.totalCalories;
    }
  }
}());

// UI Controller
const UICtrl = (function() {
  const UISelectors = {
    itemList: '#item-list',
    listItems: "#item-list li",
    addMealBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    clearBtn: '.clear-btn',
    backBtn: '.back-btn',
    addMealInput: '#item-name',
    addCaloriesInput: '#item-calories',
    totalCaloriesElement: '.total-calories'
  }

  // Public methods
  return {
    populateItems: function(items) {
      items.forEach(item => {
        document.querySelector(UISelectors.itemList).innerHTML += `
        <li class="collection-item" id="item-${item.id}">
          <strong>${item.name}: </strong> <em>${item.calories}</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>
        </li>
        `;
      });
    },
    getSelectors: function() {
      return UISelectors;
    },
    getFormInput: function() {
      return {
        name: document.querySelector(UISelectors.addMealInput).value,
        calories: parseInt(document.querySelector(UISelectors.addCaloriesInput).value)
      }
    },
    addListItem: function(item) {
      // Show the list
      document.querySelector(UISelectors.itemList).style.display = 'block';
      // Create li element
      const li = document.createElement('li');
      li.className = 'collection-item';
      // Add id
      li.id = `item-${item.id}`;
      // Add HTML
      li.innerHTML = `
      <strong>${item.name}: </strong> <em>${item.calories}</em>
      <a href="#" class="secondary-content">
        <i class="edit-item fa fa-pencil"></i>
      </a>
      `;
      // insert item
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);

      // An Alternative way to do this

      // document.querySelector(UISelectors.itemList).style.display = 'block';
      // document.querySelector(UISelectors.itemList).innerHTML = '';
      // this.populateItems(ItemCtrl.getItems());
    },
    updateListItem: function(item) {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      // Turn nodelist into array
      listItems = Array.from(listItems);

      listItems.forEach(listItem => {
        const itemID = listItem.getAttribute('id');
        if (itemID === `item-${item.id}`) {

          document.querySelector(`#${itemID}`).innerHTML = `
          <strong>${item.name}: </strong> <em>${item.calories}</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>
          `;

        }
      });
    },
    deleteListItem: function(id) {
      const itemID = `#item-${id}`;
      const item = document.querySelector(itemID);
      item.remove();
    },
    clearInput: function() {
      document.querySelector(UISelectors.addMealInput).value = '';
      document.querySelector(UISelectors.addCaloriesInput).value = '';
    },
    addItemToForm: function() {
      document.querySelector(UISelectors.addMealInput).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(UISelectors.addCaloriesInput).value = ItemCtrl.getCurrentItem().calories;

      UICtrl.showEditState();
    },
    removeItems: function() {
      let listItems = document.querySelectorAll(UISelectors.listItems);
      // Turn nodelist into an array
      listItems = Array.from(listItems);

      listItems.forEach(item => item.remove());
    },
    hideList: function() {
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },
    updateCalories: function(totalCalories) {
      document.querySelector(UISelectors.totalCaloriesElement).textContent = totalCalories;
    },
    clearEditState() {
      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
      document.querySelector(UISelectors.addMealBtn).style.display = 'inline';
    },
    showEditState() {
      document.querySelector(UISelectors.updateBtn).style.display = 'inline';
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
      document.querySelector(UISelectors.backBtn).style.display = 'inline';
      document.querySelector(UISelectors.addMealBtn).style.display = 'none';
    }
  }
}());

// App Controller
const App = (function(ItemCtrl, StorageCtrl, UICtrl) {

  const loadEventListeners = function() {
    // Load UI UISelectors
    const UISelectors = UICtrl.getSelectors();

    // Add item event
    document.querySelector(UISelectors.addMealBtn).addEventListener('click', addItemSubmit);

    // Disable submit on enter
    document.addEventListener('keypress', function(e) {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    });

    // Edit icon click event
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

    // update item submit
    document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

    // delete item event
    document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

    // back button event / clear edit state
    document.querySelector(UISelectors.backBtn).addEventListener('click', backBtnClick);

    // clear items event
    document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);
  };

  const clearAllItemsClick = function(e) {
    // Delete all items from data structure
    ItemCtrl.clearAllItems();

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    // Update calories in the UI
    UICtrl.updateCalories(totalCalories);

    // Remove all items from the UI
    UICtrl.removeItems();

    // Clear from local storage
    StorageCtrl.clearItemsFromStorage();

    // Hide the ul
    UICtrl.hideList();

  };

  const itemDeleteSubmit = function(e) {
    // get current item
    const currentItem = ItemCtrl.getCurrentItem();

    // If there is only 1 item in the data structure, then hide the list on deletion
    if (ItemCtrl.getItems().length === 1) {
      UICtrl.hideList();
    }

    // delete from data structure
    const deletedItem = ItemCtrl.deleteItem(currentItem.id);
    // Delete from UI
    UICtrl.deleteListItem(currentItem.id);
    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();

    // Delete from local storage
    StorageCtrl.deleteItemFromStorage(currentItem.id);

    // Update calories in the UI
    UICtrl.updateCalories(totalCalories);
    UICtrl.clearEditState();
  };

  const backBtnClick = function(e) {
    UICtrl.clearEditState();
  };

  const addItemSubmit = function(e) {
    e.preventDefault();

    const formInput = UICtrl.getFormInput(),
          name = formInput.name,
          calories = formInput.calories

    if (name !== '' && calories !== '') {
      const newItem = ItemCtrl.addItem(name, calories);

      // Add item to the UI
      UICtrl.addListItem(newItem);

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      // Update calories in the UI
      UICtrl.updateCalories(totalCalories);

      // Store in local storage
      StorageCtrl.storeItem(newItem);

      // Clear fields
      UICtrl.clearInput();
    }
  };

  // Click edit item
  const itemEditClick = function(e) {
    if (e.target.classList.contains('edit-item')) {
      // get the list item id
      const listId = e.target.parentNode.parentNode.id;
      // break into an array
      const listIdArr = listId.split('-');
      // get the actual id
      const id = parseInt(listIdArr[1]);
      // get item
      const itemToEdit = ItemCtrl.getItemById(id);
      // set that as current item
      ItemCtrl.setCurrentItem(itemToEdit);
      // add item to form
      UICtrl.addItemToForm();
    }
  };

  const itemUpdateSubmit = function(e) {
    // get item input
    const input = UICtrl.getFormInput();

    // update item
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

    // update item in the UI
    UICtrl.updateListItem(updatedItem);

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    // Update calories in the UI
    UICtrl.updateCalories(totalCalories);

    // Update local storage
    StorageCtrl.updateItemStorage(updatedItem);

    UICtrl.clearEditState();

    e.preventDefault();
  }

  // Pulbic methods
  return {
    init: function() {
      // clear edit state / set initial state
      UICtrl.clearEditState();

      const items = ItemCtrl.getItems();

      // check if any items
      if (items.length === 0) {
        UICtrl.hideList();
      } else {
        UICtrl.populateItems(items);
      }

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      // Update calories in the UI
      UICtrl.updateCalories(totalCalories);

      loadEventListeners();
    }
  }
}(ItemCtrl, StorageCtrl, UICtrl));

// Init app
App.init();
