---
sidebar_position: 90
title: JWT Authentication (JWT)
description: Protect your APIs and services by validating JSON Web Tokens (JWT). The plugin supports multiple token delivery methods, signing algorithms, and can transform backend authentication logic into stateless JWT tokens.
---

# JWT Authentication (JWT) Plugin

The `jwt` plugin is a powerful authentication plugin that protects your upstream services by validating **JSON Web Tokens (JWT)**, providing a modern, stateless, and scalable authentication solution for your APIs.

## Feature Introduction

This plugin has a dual role: **Token Validation** and **Token Generation**.

#### 1. Token Validation
For all requests except those to the login endpoint, the plugin automatically extracts a JWT from a specified location (HTTP Header, Cookie, or Query parameter) and performs a series of strict checks:
* **Signature Verification**: Uses a preset secret key to verify the token's signature, ensuring the token has not been tampered with. It supports **HS256** and **HS512** algorithms.
* **Expiration Verification**: Checks the `exp` claim in the token, rejecting any that have expired.
* **Format Verification**: Ensures the token follows the standard three-part structure.

#### 2. Token Generation
When a request is made to your specified **authentication path** (e.g., `/api/login`), the plugin does not perform validation. Instead, it intercepts a **successful response** from the upstream service at that path. It then takes the response body (usually a JSON object containing user information) as the JWT's `payload`, signs it with your secret key, and generates a brand new JWT. Finally, it returns this JWT to the client in JSON format.

This design allows you to seamlessly convert traditional, stateful authentication logic (like username/password validation) into a modern, stateless JWT authentication model.

## Use Cases

* **Protecting Stateless APIs**: This is the most typical use case for JWT. After logging in, a client receives a JWT and includes it in all subsequent requests. The server can then verify the user's identity without querying a database or session store.
* **Microservices Authentication**: In a microservices architecture, one service (like a user authentication service) can issue JWTs, and all other services can verify them using the same secret key, achieving decoupling between services.
* **Single Page Application (SPA) Authentication**: A frontend application (React, Vue, etc.) stores the JWT locally (e.g., in Local Storage) after login and includes it in the `Authorization` header of subsequent API requests.

## Configuration Parameters

Configuration is done in the `plugin.jwt.toml` file.

| Parameter                     | Type   | Required                   | Default   | Description                                                                                                                                      |
| :---------------------------- | :----- | :------------------------- | :-------- | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| `secret`                      | String | **Yes**                    | -         | **(Required)** The **top-secret** key for HMAC signing. Must be sufficiently complex and random, and all Pingap instances must use the same key. |
| `header` / `query` / `cookie` | String | **Yes** (one of the three) | -         | **(Required)** Specifies where to extract the JWT from. `header`: request header name; `query`: URL query parameter name; `cookie`: cookie name. |
| `auth_path`                   | String | No                         | *(empty)* | The **token generation path**. If configured, requests to this path will trigger the **token generation** process.                               |
| `algorithm`                   | String | No                         | `"HS256"` | The signing algorithm. Possible values are `"HS256"` or `"HS512"`. HS512 is more secure but has slightly more computational overhead.            |
| `delay`                       | String | No                         | -         | Introduces a delay for requests with **failed validation**, for example, `"100ms"`. This is an effective defense against **timing attacks**.     |

---

## Complete Example

**Goal**: We have a traditional login endpoint at `auth-server` that accepts a username and password and returns user JSON information upon successful validation. We want to convert this to use JWT authentication with Pingap.

* **Login Endpoint**: `POST /api/auth/login`
* **Protected Endpoint**: `/api/me`

#### 1. Authentication Flow Design
1.  The client sends a username and password to Pingap at `/api/auth/login`.
2.  Pingap forwards the request to the backend `auth-server`.
3.  `auth-server` validates the credentials. On success, it returns `200 OK` with user info JSON (e.g., `{"userId": 123, "role": "admin", "exp": 1757751000}`).
4.  Pingap's JWT plugin intercepts this successful response, uses it as the `payload`, signs it, and generates a JWT.
5.  Pingap returns `{"token": "xxx.yyy.zzz"}` to the client.
6.  For subsequent requests to `/api/me`, the client includes `Authorization: Bearer xxx.yyy.zzz` in the request header.
7.  The JWT plugin validates this token and, on success, forwards the request to the backend.

#### 2. Configure the plugin (`plugin.jwt-main.toml`)

```toml
# The secret key used for signing
secret = "MySuperSecretKeyThatIsVeryLongAndSecure"

# The token generation path
auth_path = "/api/auth/login"

# Extract the token from the Authorization header during validation
header = "Authorization"

# Use the stronger HS512 algorithm
algorithm = "HS512"

#### 3. Apply the plugin in a Location (location.toml)

```toml
# ...
[locations.route-for-my-app]
# Match all API requests, including login and protected endpoints
path = "/api/"
upstream = "api-backend" # Assuming all APIs are on the same backend
plugins = [
    "jwt-main",
]
# ...
```

## Access Effects

- Login:
  - POST `/api/auth/login` with the correct username and password.
  - The backend `api-backend` returns `200 OK` with `{"userId": 123, "role": "admin", "exp": ...}`.
  - The client ultimately receives `200 OK` from Pingap with `{"token": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywicm9sZSI6ImFkbWluIiwiZXhwIjoxNzU3NzUxMDAwfQ.xxxxxxxx"}`.

- Accessing a Protected Resource (Success):
  - GET `/api/me` with the header `Authorization: Bearer eyJ....`
  - The plugin successfully validates the token, and the request is forwarded to `api-backend`.

- Accessing a Protected Resource (Failure):
  - GET `/api/me` without an `Authorization` header, or with a tampered/expired token.
  - The plugin immediately returns a `401 Unauthorized` response, and the request never reaches `api-backend`.
