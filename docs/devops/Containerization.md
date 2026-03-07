---
title: Containerization & Docker
---

# Containerization & Docker

## What Is Containerization?

A method of packaging:

- application
- dependencies
- runtime
- configs
into a **single portable unit** called a **container**.
Containers run on a shared OS kernel instead of having their own full OS.

---

### Why It Exists

Before containers:

- dependency conflicts
- different OS environments
- manual setup errors
- hard deployments

Containers solve:

- environment consistency
- portability
- fast deployments
- easy scaling

---

### Core Components

**Image** → Blueprint (read-only template)  
**Container** → Running instance of image  
**Registry** → Storage for images (Docker Hub, ECR)  
**Runtime** → Engine that runs containers

---

### How It Works (Concept Flow)

```bash
Code → Image → Container → Deploy Anywhere
```

Build once → Run anywhere.

---

### When to Use Containers

Use when:

- Microservices
- APIs
- Background workers
- CI/CD pipelines
- Cloud deployments

Avoid when:

- heavy GUI apps
- kernel-level modifications
- strict security isolation required

---

## What is Docker?

**Docker** is a tool that **packages your entire application** into a standardized unit called a **container**.

### The Problem Docker Solves

```bash
Developer A:  "It works on my machine!"
Developer B:  "Not on mine..."
DevOps:       "Why isn't it working on the server?"

Reason: Different OS, different Python versions, different dependencies,
        different configurations

Solution: Docker packages EVERYTHING together
```

---

### Docker Architecture

```bash
┌─────────────────────────────────────────────────────┐
│                  Your Computer                      │
│  ┌───────────────────────────────────────────────┐  │
│  │        Docker Engine (Background)             │  │
│  │  ┌─────────────┐  ┌─────────────────────┐     │  │
│  │  │   Docker    │  │   Running Container │     │  │
│  │  │   Image     │  │  ┌────────────────┐ │     │  │
│  │  │  (Recipe)   │→ │  │  Your App      │ │     │  │
│  │  └─────────────┘  │  │  + Libraries   │ │     │  │
│  │                   │  │  + OS files    │ │     │  │
│  │                   │  └────────────────┘ │     │  │
│  │                   └─────────────────────┘     │  │
│  └───────────────────────────────────────────────┘  │
│                                                     │
│  You interact via: Docker CLI commands              │
│  (docker run, docker build, docker ps, etc.)        │
└─────────────────────────────────────────────────────┘

```

---

### DockerFile Syntax

Here is a concise cheat sheet for common Dockerfile syntax, based on the knowledge base:

| Instruction | Description                                                             | Example                                                                |
| ----------- | ----------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| FROM        | Sets the base image for subsequent instructions.                        | `FROM ubuntu:22.04`                                                    |
| RUN         | Executes commands in a new layer and commits the results.               | `RUN apt-get update && apt-get install -y curl`                        |
| CMD         | Sets the default command to run when the container starts.              | `CMD ["echo", "Hello World"]`                                          |
| LABEL       | Adds metadata to an image.                                              | `LABEL maintainer="you@example.com"`                                   |
| EXPOSE      | Documents the port(s) the container listens on.                         | `EXPOSE 80`                                                            |
| ENV         | Sets environment variables.                                             | `ENV NODE_ENV=production`                                              |
| ADD         | Copies files/directories and can extract archives.                      | `ADD localfile.txt /app/`                                              |
| COPY        | Copies files/directories from source to destination.                    | `COPY . /app/`                                                         |
| ENTRYPOINT  | Configures a container to run as an executable.                         | `ENTRYPOINT ["python", "app.py"]`                                      |
| VOLUME      | Creates a mount point for persistent or shared data.                    | `VOLUME /data`                                                         |
| USER        | Sets the user name or UID to use when running the image.                | `USER appuser`                                                         |
| WORKDIR     | Sets the working directory for instructions that follow.                | `WORKDIR /app`                                                         |
| ARG         | Defines a variable that users can pass at build-time.                   | `ARG VERSION=1.0`                                                      |
| ONBUILD     | Adds a trigger instruction to be executed later.                        | `ONBUILD COPY . /app/src`                                              |
| STOPSIGNAL  | Sets the system call signal for stopping the container.                 | `STOPSIGNAL SIGKILL`                                                   |
| HEALTHCHECK | Tells Docker how to test a container to check that it is still working. | `HEALTHCHECK CMD curl --fail [http://localhost:80](http://localhost/)` |
| SHELL       | Overrides the default shell used by RUN instructions.                   | `SHELL ["/bin/bash", "-c"]`                                            |

### Special Syntax

- **Here-Documents**: Use EOT syntax in RUN to write multi-line scripts or create inline files.

    ```dockerfile
    RUN <<EOT
    echo "Hello, world"
    EOT
    ```

- **Shebang in Here-Documents**: Use a shebang (e.g., #!/usr/bin/env python) to specify an interpreter for the here-document.
- **Multi-file Here-Documents**: You can use multiple here-documents in a single RUN instruction to create several files.

---

### Docker HUB

DOCKER HUB Docker Hub is a service provided by Docker for finding and sharing container images with your team. Learn more and find images at [https://hub.docker.com](https://hub.docker.com)

- Login into Docker
  - `docker login -u <username>`
- Publish an image to Docker Hub
  - `docker push <username>/<image_name>`
- Search Hub for an image
  - `docker search <image_name>`
- Pull an image from a Docker Hub
  - `docker pull <image_name>`

---

### General commands

- Start the docker demon
  - `docker -d`
- Get help with docker. Can also use -help on all subcommands
  - `docker --help`
- Display system-wide information
  - `docker info`
- Get current installed docker version
  - `docker --version`

---

### Images

Docker images are a lightweight, standalone, executable package of software that includes everything needed to run an application: code, runtime, system tools, system libraries and settings.

- Build an image for a DockerFile
  - `docker build -t <image_name> .`
- Build an Image from a Dockerfile without the cache
  - `docker build -t <image_name> . –no-cache`
- List local images
  - `docker images`
- Delete an Image
  - `docker rmi <image_name>`
- Delete all images
  - `docker rmi -f $(docker images -q)`
  - `sudo docker rmi -f $(sudo docker images -q)` with force
- Remove all unused images
  - `docker image prune`

---

### Containers

A container is a runtime instance of a docker image.
A container will always run the same, regardless of the infrastructure.
Containers isolate software from its environment and ensure that it works uniformly despite differences for instance between development and staging.

- Create and run a container from an image, with a custom name:
  - `docker run --name <container_name> <image_name>`
- Run a container with and publish a container’s port(s) to the host.
  - `docker run -p <host_port>:<container_port> <image_name>`
- Run a container in the background
  - `docker run -d <image_name>`
- Start or stop an existing container:
  - `docker start|stop <container_name> (or <container_id>)`
- Remove a stopped container:
  - `docker rm <container_name>`
- Remove all containers even the stopped one.
  - `docker container rm -f $(docker container ls -aq)`
  - `sudo docker rm -f $(sudo docker ps -aq)` with force
- Open a shell inside a running container:
  - `docker exec -it <container_name> sh`
- Fetch and follow the logs of a container:
  - `docker logs <container_name>`
  - `docker logs -f <container_name>`
- To inspect a running container:
  - `docker inspect <container_name> (or <container_id>)`
- To list currently running containers:
  - `docker ps`
- List all docker containers (running and stopped):
  - `docker ps --all`
- View resource usage stats
  - `docker container stats`

---

### Docker compose

| Key/Section      | Meaning                                                                                   | Example Usage                                 |
|------------------|------------------------------------------------------------------------------------------|-----------------------------------------------|
| version          | Compose file format version                                                               | `version: "3.8"`                              |
| services         | Defines the containers (services) to run                                                  | `services:`                                   |
| image            | Image to use for the service                                                              | `image: nginx:latest`                         |
| build            | Build options for creating an image from a Dockerfile                                     | `build: .` or `build: { context: . }`         |
| ports            | Maps host ports to container ports                                                        | `ports: ["8080:80"]`                          |
| environment      | Environment variables for the service                                                     | `environment: ["VAR=value"]`                  |
| volumes          | Mounts host paths or named volumes                                                        | `volumes: ["data:/data"]`                     |
| networks         | Connects services to custom networks                                                      | `networks: ["mynet"]`                         |
| depends_on       | Specifies service startup order                                                           | `depends_on: ["db"]`                          |
| command          | Overrides the default command                                                             | `command: ["npm", "start"]`                   |
| container_name   | Sets a custom container name                                                              | `container_name: myapp`                       |
| hostname         | Sets a custom hostname                                                                    | `hostname: myhost`                            |
| deploy           | Deployment configuration (for Swarm mode)                                                 | `deploy: { restart_policy: { condition: on-failure } }` |
| restart          | Restart policy for containers                                                             | `restart: always`                             |

**Docker Compose** is an orchestration tool used to define and run multi-container applications. This used for project specific.

- Get current version
  - `docker compose version`
- Start all services
  - docker compose up
- Run started services in background
  - docker compose up -d
- Stop all services
  - docker compose down
- Rebuild all images, use after code or dependency changes
  - docker compose up --build
- Execute a command in running docker compose service
  - `docker compose exec [OPTIONS] SERVICE COMMAND [ARGS...]`
- List all containers in your project
  - `docker compose ps`
- Display logs output from all services
  - `docker compose logs`
  - `docker compose logs -f` to follow
- Display the running processes for each service container.
  - `docker compose top`
- List all images used by current project's containers.
  - `docker compose images`
- Prints the public port mapping for a specific service
  - `docker compose port [SERVICE] [PRIVATE_PORT]`
- Validates your YAML file and renders the final configuration
  - `docker compose config`
- Lists all running compose projects on your system
  - `docker compose ls`
- Stops|Start|Restarts|Temporarily freezes services (without stooping) containers.
  - `docker compose stop|start|restart|pause|unpause <container_name>`
- Runs a one-off command by creating a new, temporary container for a service
  - `docker compose run [SERVICE] [COMMAND]`
- Copies files or folders between a service container and your local file-system.
  - `docker compose cp`
- Pulls the latest versions of image defined in your compose file without starting services
  - `docker compose pull`

Yes, you can create a cheat sheet for Docker Compose YAML file syntax, meanings, and examples. Here’s a concise guide based on the knowledge base, including a sample file and explanations for common keys:

---

### Example: Simple Compose File

```yaml
version: "3.8"

services:
  web:
    image: nginx:latest
    ports:
      - "8080:80"
  db:
    image: postgres:18
    environment:
      POSTGRES_USER: example
      POSTGRES_DB: exampledb
```

This file defines two services:  

- **web**: Runs Nginx and maps port 8080 on the host to port 80 in the container.  
- **db**: Runs PostgreSQL with environment variables for user and database.

---

### Example: Advanced Compose File

```yaml
version: "3.8"

services:
  app:
    build:
      context: .
    container_name: rest-server
    hostname: rest-server
    networks:
      - mynet
    ports:
      - "80:8080"
    environment:
      - PGUSER=${PGUSER:-totoro}
      - PGPASSWORD=${PGPASSWORD:?database password not set}
      - PGHOST=${PGHOST:-db}
      - PGPORT=${PGPORT:-26257}
      - PGDATABASE=${PGDATABASE:-mydb}
    depends_on:
      - db
    deploy:
      restart_policy:
        condition: on-failure

  db:
    image: cockroachdb/cockroach:latest-v25.4
    container_name: roach
    hostname: db
    networks:
      - mynet
    ports:
      - "26257:26257"
      - "8080:8080"
    volumes:
      - roach:/cockroach/cockroach-data
    command: start-single-node --insecure

volumes:
  roach:

networks:
  mynet:
    driver: bridge
```

This file demonstrates:

- Multiple services with custom names and hostnames
- Build context for building images
- Environment variables with defaults and required values
- Persistent storage with named volumes
- Custom networks
- Service dependencies and restart policies
