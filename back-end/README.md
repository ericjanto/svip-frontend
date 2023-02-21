## Back-End Requirements (Front-End Integration)
1. The back-end must expose an HTTP GET endpoint, accepting a URI-encoded query parameter:
```
GET url.com/query?=this%20is%20query%20text
```
2. An API-call to the back-end must return `JSON`-structured data:

```json
[
	{
	docId: int,
	url: string,
	title: string,
	excerpt: string
	}
]
```
3. The back-end must handle pagination by accepting a `page` and `limit` parameter:
```
GET url.com/query?=...&page=1&limit=15
```

If `limit` goes beyond items available on the last page, the endpoint must return the maximum amount of available items for that page.


Webscrape
---
The webscrape will currently dump a scrape of AO3 to a JSON file. This can be called directly and left to the schedule that scrapes once a day at 12 Noon.
