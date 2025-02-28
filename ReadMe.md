# WeddingWire

## getUsers
**Method**: `GET`

**URL**: `http://localhost:7000/weddingwire/api/users/`

## getUser
**Method**: `GET`

**URL**: `http://localhost:7000/weddingwire/api/users/2`

## postUser
**Method**: `POST`

**URL**: `http://localhost:7000/weddingwire/api/users`

**Body**:
```json
{
  "name": "Hermano Davinci",
  "email": "davici@example.com",
  "password": "1234", 
  "role":0
}
```

## deleteUser
**Method**: `DELETE`

**URL**: `http://localhost:7000/weddingwire/api/users/1`

## patchBio
**Method**: `PATCH`

**URL**: `http://localhost:7000/weddingwire/api/users/bio`

**Body**:
```json
{
  "vendorId": "2",
  "newBio": "Stan the man"
}
```

## post Service
**Method**: `POST`

**URL**: `http://localhost:7000/weddingwire/api/users/services`

**Body**:
```json
{
  "vendorId": "2",
  "category": "Attire",
  "description": "my new service",
  "price_range": [1000, 4000],
  "availability": ["Mon 12 - 14","Fri"],
  "locations": ["jhb", "pretoria", "soweto"],
  "images": ["img1.png", "img2.png"]
}
```

## delete service
**Method**: `DELETE`

**URL**: `http://localhost:7000/weddingwire/api/services`

**Body**:
```json
{
  "vendorID": "2", 
  "category": "Venue"
}
```

## postImage
**Method**: `POST`

**URL**: `http://localhost:7000/weddingwire/upload`

## post Review
**Method**: `POST`

**URL**: `http://localhost:7000/weddingwire/api/review`

**Body**:
```json
{
  "userId": "1",
  "vendorId": "2",
  "category": "Venue",
  "comment": "What a friend we have in Jesus",
  "rating": 3
}
```

## patch review
**Method**: `PATCH`

**URL**: `http://localhost:7000/weddingwire/api/review`

**Body**:
```json
{
  "userId": "1",
  "vendorId": "2",
  "category": "Photography",
  "comment": "Booooo",
  "rating": 0
}
```

## delete review
**Method**: `DELETE`

**URL**: `http://localhost:7000/weddingwire/api/review`

**Body**:
```json
{
  "userId": "1",
  "vendorId": "2",
  "category": "Photography"
}
```

