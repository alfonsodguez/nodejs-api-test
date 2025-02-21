start-cleanup:
	docker compose -f ./test/helpers/docker/docker-compose.yml down -v

end-cleanup:
	docker compose -f ./test/helpers/docker/docker-compose.yml down -v

docker-test-start: start-cleanup
	docker compose -f ./test/helpers/docker/docker-compose.yml up -d

docker-test-stop: end-cleanup