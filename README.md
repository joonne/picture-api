# Picture API

`GET /api/images`

Returns file names as an array. A filename can be used as an URL by appending it to '/images/<filename>.jpg'.

If there are no files in the public/images folder, empty array will be returned.

`POST /api/images`

Can be used to post new images to the server. Returns 201.
