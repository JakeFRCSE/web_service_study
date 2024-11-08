## Request

### URL Parameter

- `id` (int): 불러올 메세지의 id

## Response

### `200`

```json
{
	"id": 423, // int 1~
	"reviewContents": "dskafnsdklafnksdalf", // string, 1~?, 길이 확인 필요
	"modelRatings": 3 // int, 1~5 
}
```

### `204`

```json
{
	"message": "등록되지 않은 메세지 id입니다"
}
```