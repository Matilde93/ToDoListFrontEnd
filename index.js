const baseUri = "https://todolistapi20240125133605.azurewebsites.net/api/items"

Vue.createApp({
    data() {
      return {
        id: 0,
        name: "",
        items: [],
        error: "",
        popupVisible: false,
        nameUpdate: "",
        updatedName: "",
        itemById: {}
      };
    },
    async created() {
      console.log("created method called");
      this.GetAll();
    },
    methods: {
      async GetAll() {
        try {
          const response = await axios.get(baseUri);
          this.items = await response.data;
          this.error = null;
        } catch (e) {
          this.items = [];
          this.error = e.message;
        }
      },
      async AddItem(name) {
        id = 0;
        const newItem = { id: id, name: name};
        try {
          response = await axios.post(baseUri, newItem);
          console.log("Item: " + name +  " added")
          this.items = await response.data;
          this.GetAll();
          this.name = "";
        } catch (ex) {
          alert(ex.message);
        }
      },
      async DeleteItem(id) {
        try {
          response = await axios.delete(baseUri + "/" + id);
          console.log("Item with id: " + id +  " deleted")
          this.items = await response.data;
          this.GetAll();
        } catch (ex) {
          alert(ex.message);
        }
      },
      async UpdateItem(name) {
        id = this.itemById.id
        const updatedItem = {id: id, name: name};
        try {
          response = await axios.put(baseUri + "/" + id, updatedItem);
          console.log("Item with id: " + id +  " updated")
          this.items = await response.data;
          this.updatedName = ""
          this.GetAll();
          this.closePopup()
        } catch (ex) {
          alert(ex.message);
        }
      },
      async GetById(id){
        const result = this.items.find((item) => item.id === id);
        this.itemById = result
        console.log("The chosen id is: " + result.id)
      },
      SortByName() {
        this.items.sort((item1, item2) => item1.name.localeCompare(item2.name));
      },
      openPopup(id){
        this.GetById(id)
        this.nameUpdate = this.itemById.name
        this.popupVisible = true;
        console.log("popup opened")
      },
      closePopup(){
        this.popupVisible = false;
        console.log("popup closed")
      }
    },
   
  }).mount("#app");
