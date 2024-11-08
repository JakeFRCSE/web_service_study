## Request

### URL Parameter

- `id` (int): 상태를 확인할 메세지의 id

## Response

### `200`

```json
{
	"status": true // or false, boolean, true가 예측 완료된 상태
}
```

### `204`

```json
{
	"message": "등록되지 않은 메세지 id입니다"
}
```