# TypeORM subscriber investigation

## About

This repo answers a simple question about [TypeORM event subscribers](https://typeorm.io/decorator-reference#eventsubscriber): What happens if there are multiple servers running with event subscribers for the same entity?

Using the example of [after insert](https://github.com/typeorm/typeorm/blob/e7649d2746f907ff36b1efb600402dedd5f5a499/src/subscriber/Broadcaster.ts#L368) we can see for the code an our testing that event subscribers are essentially observers from the observer pattern. As such they only listen for events in the same memory space.

This is fundamentally different from how [channels in Postgres](https://www.postgresql.org/docs/current/sql-listen.html) work.

## Getting started

Use correct version of node

```sh
nvm use
```

Install dependencies

```sh
npm i
```

Start docker containers and 2 instances of the server using VS Code tasks:

- Open the command pallette `CMD + SHIFT + P`
- Type `Tasks: Run Task`
- Select the `start` task
- Select `Continue without scanning the task output`

### new_users.sh

There is a script `new_users.sh` that you can run to create new users in your DB. It works by making a `curl` request to the server with a random first name and last name. By default the request goes to port `8080` but you can specify one or more ports to use like so:

```sh
./new_users.sh 8080 8081
```

### Docker

Don't forget to run `docker compose down` when you're done.

### Tasks

You can learn more about tasks in VS Code [here](https://code.visualstudio.com/docs/editor/tasks).
