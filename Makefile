createdb:
	docker exec -it mydb createdb --username=postgres 

startdb: 
docker run --name some_postgres -p 5432:5432 -d -e POSTGRES_USER=vasyl-kovalenko -e POSTGRES_PASSWORD=root -e POSTGRES_DB=mydb postgres

startservice:
docker run -p 8080:8080 comment-service