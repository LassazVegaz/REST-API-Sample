import Koa from "koa";
import KoaRouter from "koa-router";
import bodyParser from "koa-bodyparser";

// port the API will listen on
const port = 3000;
// hard coded data
const users = [
	{
		id: 1,
		name: "John Doe",
		age: 30,
	},
	{
		id: 2,
		name: "Emma Watson",
		age: 25,
	},
	{
		id: 3,
		name: "Emilia Clarke",
		age: 30,
	},
];
const app = new Koa();

// add middlewares
app.use(bodyParser());

// create a router to handle users routes
const router = new KoaRouter({
	prefix: "/api/users",
});

// get users
router.get("/", (ctx) => {
	ctx.body = users; // attach all users to the body of the response
});

// create user
router.post("/", (ctx) => {
	const user = ctx.request.body;
	user.id = users.length + 1; // a simple way to generate an id
	users.push(user);
	ctx.body = user; // return the new user
});

// get user by id
router.get("/:id", (ctx) => {
	const id = Number(ctx.params.id);
	const user = users.find((user) => user.id === id);
	ctx.body = user;
});

// update user
router.put("/:id", (ctx) => {
	const id = Number(ctx.params.id);
	const user = users.find((user) => user.id === id);
	const updatedUser = ctx.request.body;
	user.name = updatedUser.name;
	user.age = updatedUser.age;
	ctx.body = user;
});

// delete user
router.delete("/:id", (ctx) => {
	const id = Number(ctx.params.id);
	const user = users.find((user) => user.id === id);
	users.splice(users.indexOf(user), 1);
	ctx.body = user;
});

// add the router to the app
app.use(router.routes());

// start listening to requests
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
