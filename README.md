# vue2-init

> A vue2 init project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```


# ajax 使用简述

有以下三种方式使用：

```
Vue.axios.get(api).then((response) => {
  console.log(response.data)
})

this.axios.get(api).then((response) => {
  console.log(response.data)
})

this.$http.get(api).then((response) => {
  console.log(response.data)
})
```

更多信息：
[axios](https://github.com/mzabriskie/axios)
[vue-axios](https://github.com/imcvampire/vue-axios)


# websocket 使用简述

在组件中使用:

```
Vue.use(VueWebsocket, "ws://otherserver:8080", {
	reconnection: false
});
```

```
<script>
	export default {

		methods: {
			add() {
		  		// Emit the server side
		  		this.$socket.emit("add", { a: 5, b: 3 });
			},

			get() {
		  		this.$socket.emit("get", { id: 12 }, (response) => {
					...
				});
			}
		},

		socket: {
			// Prefix for event names
			// prefix: "/counter/",

			// If you set `namespace`, it will create a new socket connection to the namespace instead of `/`
			// namespace: "/counter",

			events: {

				// Similar as this.$socket.on("changed", (msg) => { ... });
				// If you set `prefix` to `/counter/`, the event name will be `/counter/changed`
				//
				changed(msg) {
					console.log("Something changed: " + msg);
				}

				/* common socket.io events
				connect() {
					console.log("Websocket connected to " + this.$socket.nsp);
				},

				disconnect() {
					console.log("Websocket disconnected from " + this.$socket.nsp);
				},

				error(err) {
					console.error("Websocket error!", err);
				}
				*/

			}
		}
	};

</script>
```

更多信息：
[vue-websocket](https://github.com/icebob/vue-websocket)