# Documentation for Customer Panel API

### MAIN_URL = http://localhost:4000/api

<hr />

#### Routes for Categories : 

Get all Categories : MAIN_URL/categories <br />
Returns array of objects
```
[
  {
    "_id": "626ae58b81fc1ac13d93ec38",
    "name": "Tiles & Stone",
    "category_image": "",
    "createdAt": "2022-04-28T19:05:47.877Z",
    "updatedAt": "2022-04-28T19:05:47.877Z",
    "__v": 0
  }
]
```
<br />
Get Categories by id : MAIN_URL/categories/:categoryID <br />
Returns object with category <br />

```
{
    "_id": "626ae58b81fc1ac13d93ec38",
    "name": "Tiles & Stone",
    "category_image": "",
    "createdAt": "2022-04-28T19:05:47.877Z",
    "updatedAt": "2022-04-28T19:05:47.877Z",
    "__v": 0
}
```
#### Routes for Sub Categories : 

Get all Sub Categories : MAIN_URL/subcategories <br />
Returns array of objects
```
[
  {
    "_id": "626ae5aa81fc1ac13d93ec3b",
    "Sub_Category_name": "tile",
    "Sub_Category_image": "",
    "Category": "626ae58b81fc1ac13d93ec38",
    "createdAt": "2022-04-28T19:06:18.580Z",
    "updatedAt": "2022-04-28T19:06:18.580Z",
    "__v": 0
  },
  {
    "_id": "626ae5c481fc1ac13d93ec3d",
    "Sub_Category_name": "stone",
    "Sub_Category_image": "",
    "Category": "626ae58b81fc1ac13d93ec38",
    "createdAt": "2022-04-28T19:06:44.711Z",
    "updatedAt": "2022-04-28T19:06:44.711Z",
    "__v": 0
  }
]
```
<br />
Get Sub Categories by id : MAIN_URL/subcategories/:subcategoryID <br />
Returns object with sub category <br />

```
{
    "_id": "626ae5c481fc1ac13d93ec3d",
    "Sub_Category_name": "stone",
    "Sub_Category_image": "",
    "Category": "626ae58b81fc1ac13d93ec38",
    "createdAt": "2022-04-28T19:06:44.711Z",
    "updatedAt": "2022-04-28T19:06:44.711Z",
    "__v": 0
}
```
#### Routes for Groups : 

Get all groups : MAIN_URL/groups <br />
Returns array of objects
```
[
  {
    "_id": "626ae9cb81fc1ac13d93ec41",
    "Group_name": "floor tile",
    "Sub_Category": "626ae5aa81fc1ac13d93ec3b",
    "Category": "626ae58b81fc1ac13d93ec38",
    "createdAt": "2022-04-28T19:23:55.188Z",
    "updatedAt": "2022-04-28T19:23:55.188Z",
    "__v": 0
  },
  {
    "_id": "626ae9d081fc1ac13d93ec43",
    "Group_name": "floor tile",
    "Sub_Category": "626ae5aa81fc1ac13d93ec3b",
    "Category": "626ae58b81fc1ac13d93ec38",
    "createdAt": "2022-04-28T19:24:00.673Z",
    "updatedAt": "2022-04-28T19:24:00.673Z",
    "__v": 0
  }
]
```

Get groups by id : MAIN_URL/groups/:groupID <br />
Returns object with group <br />
```
{
    "_id": "626ae9cb81fc1ac13d93ec41",
    "Group_name": "floor tile",
    "Sub_Category": "626ae5aa81fc1ac13d93ec3b",
    "Category": "626ae58b81fc1ac13d93ec38",
    "createdAt": "2022-04-28T19:23:55.188Z",
    "updatedAt": "2022-04-28T19:23:55.188Z",
    "__v": 0
}
```

#### All Routes of sub Groups : 

Get all sub groups : MAIN_URL/subgroups <br />
Returns array of objects
```

```

Get sub groups by id : MAIN_URL/subgroups/:subGroupID <br />
Returns object
```

```

#### All Routes of Brands : 

Get all brands : MAIN_URL/brand <br />
Returns array of objects
```
[
  {
    "_id": "626aeb8281fc1ac13d93ec55",
    "Category": "626ae58b81fc1ac13d93ec38",
    "Brand_name": "nitco",
    "Brand_image": "",
    "createdAt": "2022-04-28T19:31:14.974Z",
    "updatedAt": "2022-04-28T19:31:14.974Z",
    "__v": 0
  },
  {
    "_id": "626aebba81fc1ac13d93ec57",
    "Category": "626ae58b81fc1ac13d93ec38",
    "Brand_name": "Somany",
    "Brand_image": "",
    "createdAt": "2022-04-28T19:32:10.635Z",
    "updatedAt": "2022-04-28T19:32:10.635Z",
    "__v": 0
  }
]
```

Get brands by id : MAIN_URL/brand/:brandID <br />
Returns object with brand
```
{
"_id": "626aeb8281fc1ac13d93ec55",
"Category": "626ae58b81fc1ac13d93ec38",
"Brand_name": "nitco",
"Brand_image": "",
"createdAt": "2022-04-28T19:31:14.974Z",
"updatedAt": "2022-04-28T19:31:14.974Z",
"__v": 0
}
```