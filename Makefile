PROJECT := pwa-demo

.PHONY: upgrade
upgrade: install_tools doctor

.PHONY: doctor
doctor:
	bin/check-tools

.PHONY: install_tools
install_tools:
	bin/development_environment_upgrade

.PHONY: bundle
bundle:
	bundle

.PHONY: db_migrate
db_migrate:
	bundle exec rake db:migrate
	RAILS_ENV=test bundle exec rake db:migrate:reset