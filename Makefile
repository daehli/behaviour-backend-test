migrate: # make migrate name=Somethings
	node node_modules/knex/bin/cli.js migrate:make $(name)

migration:
	node node_modules/knex/bin/cli.js migrate:latest

migration_rollback:
	node node_modules/knex/bin/cli.js migrate:rollback

mysql:
	mysql -u root -p #