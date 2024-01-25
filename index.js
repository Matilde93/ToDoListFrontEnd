const baseUri = "https://todolistapi20240125133605.azurewebsites.net/api/items"

Vue.createApp({
    data() {
      return {
        id: "",
        name: "",
        items: [],
        error: "",
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
          this.items = await response.data;
          this.GetAll();
        } catch (ex) {
          alert(ex.message);
        }
      },
      SortByName() {
        this.items.sort((item1, item2) => item1.name.localeCompare(item2.name));
      }
    }
  }).mount("#app");